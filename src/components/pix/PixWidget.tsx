'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LeadState {
  name: string;
  email: string;
  company: string;
  service: string;
  tier: string;
  score: number;
  language: string;
}

const QUICK_REPLIES = [
  'I need AI development',
  'Blockchain project',
  'Build a mobile app',
  'Custom software',
];

const TIER_COLORS: Record<string, string> = {
  hot: '#DC2626',
  urgent: '#991B1B',
};

export default function PixWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [showNotifDot, setShowNotifDot] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [lead, setLead] = useState<LeadState>({ name: '', email: '', company: '', service: '', tier: 'cold', score: 0, language: 'English' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const closedRef = useRef(false);

  // Initialize session
  useEffect(() => {
    let sid = localStorage.getItem('pix_sid');
    if (!sid) {
      sid = `pix_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem('pix_sid', sid);
    }
    setSessionId(sid);
  }, []);

  // Notification dot after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowNotifDot(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Load Turnstile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      const container = document.createElement('div');
      container.id = 'pix-turnstile';
      container.style.display = 'none';
      document.body.appendChild(container);

      if ((window as unknown as Record<string, unknown>).turnstile) {
        (window as unknown as { turnstile: { render: (id: string, opts: Record<string, unknown>) => void } }).turnstile.render('#pix-turnstile', {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
          size: 'invisible',
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Load history on open
  useEffect(() => {
    if (!isOpen || !sessionId || historyLoaded) return;

    const loadHistory = async () => {
      try {
        const res = await fetch(`/api/chat/history?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          // Filter and clean messages for display
          const cleaned = data.messages.map((m: Message) => ({
            role: m.role,
            content: m.role === 'assistant' ? cleanDisplayText(m.content) : m.content,
          }));
          setMessages(cleaned);
          setMessageCount(data.messageCount || 0);
          setIsFirstMessage(false);
        } else {
          // Show greeting after delay
          setTimeout(() => setShowGreeting(true), 400);
        }
      } catch {
        setTimeout(() => setShowGreeting(true), 400);
      }
      setHistoryLoaded(true);
    };

    loadHistory();
  }, [isOpen, sessionId, historyLoaded]);

  function cleanDisplayText(text: string): string {
    return text
      .replace(/\[PIX_FIELDS\].*?\[\/PIX_FIELDS\]/g, '')
      .replace(/\[PIX_META\].*?\[\/PIX_META\]/g, '')
      .trim();
  }

  const handleOpen = () => {
    setIsOpen(true);
    setShowNotifDot(false);
    closedRef.current = false;
  };

  const handleClose = () => {
    setIsOpen(false);
    closedRef.current = true;

    // Show rating prompt if 3+ messages and no feedback yet
    if (messageCount >= 3 && !feedbackGiven) {
      setTimeout(() => {
        if (closedRef.current) {
          setShowRating(true);
          setIsOpen(true);
        }
      }, 1200);
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || !sessionId) return;

    const newCount = messageCount + 1;
    setMessageCount(newCount);

    const userMessage: Message = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          sessionId,
          messageCount: newCount,
          isFirstMessage,
          turnstileToken: isFirstMessage ? turnstileToken : undefined,
        }),
      });

      if (res.status === 429) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || 'Too many messages. Please wait a moment.' }]);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setIsFirstMessage(false);

      if (data.meta) {
        if (data.meta.tier) setLead(prev => ({ ...prev, tier: data.meta.tier, score: data.meta.score || prev.score }));
        if (data.meta.service) setLead(prev => ({ ...prev, service: data.meta.service }));
        if (data.meta.fieldsCapture) {
          const f = data.meta.fieldsCapture;
          if (f.name) setLead(prev => ({ ...prev, name: f.name }));
          if (f.email) setLead(prev => ({ ...prev, email: f.email }));
          if (f.company) setLead(prev => ({ ...prev, company: f.company }));
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Something went wrong on my end. Please reach us at pixelettetech.com/contact-us',
      }]);
    }

    setIsLoading(false);
  }, [messages, sessionId, messageCount, isFirstMessage, turnstileToken, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px';
    }
  };

  const submitRating = async () => {
    if (selectedRating === 0) return;
    try {
      await fetch('/api/pix/rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, rating: selectedRating, comment: ratingComment }),
      });
    } catch { /* silent */ }
    setFeedbackGiven(true);
    setRatingSubmitted(true);
  };

  const showScoreBadge = lead.score > 50 && (lead.tier === 'hot' || lead.tier === 'urgent');

  return (
    <>
      <style>{`
        .pix-widget * { box-sizing: border-box; margin: 0; padding: 0; }
        .pix-launcher {
          position: fixed; bottom: 24px; right: 24px; z-index: 9999;
          width: 60px; height: 60px; border-radius: 50%;
          background: #0A1628; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transition: transform 0.2s ease;
        }
        .pix-launcher:hover { transform: scale(1.1); }
        .pix-notif-dot {
          position: absolute; top: -2px; right: -2px;
          width: 14px; height: 14px; border-radius: 50%;
          background: #DC2626; border: 2px solid #0A1628;
          animation: pix-pulse 2s infinite;
        }
        @keyframes pix-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .pix-window {
          position: fixed; bottom: 96px; right: 24px; z-index: 9999;
          width: 390px; height: 600px;
          background: #fff; border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.25);
          display: flex; flex-direction: column;
          overflow: hidden;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
        }
        .pix-window.pix-open { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .pix-header {
          background: #0A1628; color: #fff; padding: 16px 20px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid #1e3a5f;
        }
        .pix-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: #2563EB; display: flex; align-items: center;
          justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;
        }
        .pix-header-info { flex: 1; }
        .pix-header-name { font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
        .pix-online-dot { width: 8px; height: 8px; border-radius: 50%; background: #22C55E; }
        .pix-header-sub { font-size: 12px; color: #94a3b8; }
        .pix-score-badge {
          padding: 2px 8px; border-radius: 10px; font-size: 11px;
          font-weight: 700; color: #fff; margin-left: 8px;
        }
        .pix-close {
          background: none; border: none; cursor: pointer; color: #94a3b8;
          font-size: 20px; padding: 4px 8px; border-radius: 4px;
        }
        .pix-close:hover { color: #fff; background: rgba(255,255,255,0.1); }
        .pix-messages {
          flex: 1; overflow-y: auto; padding: 16px; display: flex;
          flex-direction: column; gap: 12px; background: #f8f9fb;
        }
        .pix-msg { max-width: 82%; padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.5; word-wrap: break-word; }
        .pix-msg-bot { background: #e8ecf2; color: #1a1a2e; align-self: flex-start; border-bottom-left-radius: 4px; }
        .pix-msg-user { background: #0A1628; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
        .pix-typing { display: flex; gap: 4px; padding: 10px 14px; align-self: flex-start; }
        .pix-typing-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #94a3b8;
          animation: pix-bounce 1.4s infinite ease-in-out;
        }
        .pix-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .pix-typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pix-bounce { 0%, 80%, 100% { transform: scale(0.6); } 40% { transform: scale(1); } }
        .pix-input-area {
          padding: 12px 16px; border-top: 1px solid #e5e7eb;
          display: flex; align-items: flex-end; gap: 8px; background: #fff;
        }
        .pix-textarea {
          flex: 1; border: 1px solid #d1d5db; border-radius: 12px;
          padding: 10px 14px; font-size: 14px; resize: none;
          max-height: 100px; font-family: inherit; outline: none;
          line-height: 1.4;
        }
        .pix-textarea:focus { border-color: #2563EB; }
        .pix-send {
          width: 36px; height: 36px; border-radius: 50%;
          background: #0A1628; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.2s;
        }
        .pix-send:hover { background: #1e3a5f; }
        .pix-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .pix-quick-replies { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 16px 8px; }
        .pix-quick-btn {
          padding: 6px 14px; border-radius: 20px; border: 1px solid #d1d5db;
          background: #fff; font-size: 13px; cursor: pointer; color: #374151;
          transition: all 0.2s;
        }
        .pix-quick-btn:hover { background: #0A1628; color: #fff; border-color: #0A1628; }
        .pix-powered { text-align: center; padding: 6px; font-size: 11px; color: #9ca3af; background: #fff; }
        .pix-rating-card { padding: 20px; text-align: center; }
        .pix-rating-card h4 { font-size: 15px; color: #1a1a2e; margin-bottom: 12px; }
        .pix-stars { display: flex; justify-content: center; gap: 8px; margin-bottom: 12px; }
        .pix-star {
          font-size: 28px; cursor: pointer; transition: transform 0.2s;
          background: none; border: none; padding: 0;
        }
        .pix-star:hover { transform: scale(1.2); }
        .pix-rating-comment {
          width: 100%; border: 1px solid #d1d5db; border-radius: 8px;
          padding: 8px 12px; font-size: 13px; resize: none; margin-bottom: 10px;
          font-family: inherit;
        }
        .pix-rating-submit {
          padding: 8px 20px; border-radius: 8px; background: #0A1628;
          color: #fff; border: none; cursor: pointer; font-size: 13px; font-weight: 600;
        }
        .pix-rating-thanks { font-size: 14px; color: #22C55E; margin-top: 8px; }
        .pix-low-rating-note { font-size: 12px; color: #6b7280; margin-top: 6px; }
        @media (max-width: 440px) {
          .pix-window { width: calc(100vw - 16px); right: 8px; bottom: 80px; height: calc(100vh - 100px); }
          .pix-launcher { bottom: 16px; right: 16px; }
        }
      `}</style>

      <div className="pix-widget">
        {/* Launcher */}
        {!isOpen && (
          <button className="pix-launcher" onClick={handleOpen} aria-label="Open chat">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {showNotifDot && <span className="pix-notif-dot" />}
          </button>
        )}

        {/* Chat Window */}
        <div className={`pix-window ${isOpen ? 'pix-open' : ''}`}>
          {/* Header */}
          <div className="pix-header">
            <div className="pix-avatar">P</div>
            <div className="pix-header-info">
              <div className="pix-header-name">
                Pix <span className="pix-online-dot" />
                {showScoreBadge && (
                  <span className="pix-score-badge" style={{ background: TIER_COLORS[lead.tier] || '#DC2626' }}>
                    {lead.tier.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="pix-header-sub">Pixelette Technologies AI Assistant</div>
            </div>
            <button className="pix-close" onClick={handleClose} aria-label="Close chat">&times;</button>
          </div>

          {/* Messages */}
          <div className="pix-messages">
            {/* Rating view */}
            {showRating && !ratingSubmitted ? (
              <div className="pix-rating-card">
                <h4>How was your experience with Pix?</h4>
                <div className="pix-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} className="pix-star" onClick={() => setSelectedRating(star)}>
                      {star <= selectedRating ? '★' : '☆'}
                    </button>
                  ))}
                </div>
                {selectedRating > 0 && (
                  <>
                    <textarea
                      className="pix-rating-comment"
                      placeholder="Any comments? (optional)"
                      rows={2}
                      value={ratingComment}
                      onChange={e => setRatingComment(e.target.value)}
                    />
                    <button className="pix-rating-submit" onClick={submitRating}>Submit</button>
                  </>
                )}
              </div>
            ) : showRating && ratingSubmitted ? (
              <div className="pix-rating-card">
                <p className="pix-rating-thanks">Thank you for your feedback.</p>
                {selectedRating <= 3 && (
                  <p className="pix-low-rating-note">
                    We appreciate the honest feedback. A member of our team will review this session personally.
                  </p>
                )}
              </div>
            ) : (
              <>
                {/* Greeting */}
                {showGreeting && messages.length === 0 && (
                  <div className="pix-msg pix-msg-bot">
                    Hi, I am Pix, Pixelette's AI assistant. Tell me what you are working on and I will point you in the right direction.
                  </div>
                )}

                {/* Messages */}
                {messages.map((msg, i) => (
                  <div key={i} className={`pix-msg ${msg.role === 'user' ? 'pix-msg-user' : 'pix-msg-bot'}`}>
                    {msg.content}
                  </div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <div className="pix-typing">
                    <span className="pix-typing-dot" />
                    <span className="pix-typing-dot" />
                    <span className="pix-typing-dot" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Quick replies */}
          {showGreeting && messages.length === 0 && !showRating && (
            <div className="pix-quick-replies">
              {QUICK_REPLIES.map(qr => (
                <button key={qr} className="pix-quick-btn" onClick={() => sendMessage(qr)}>
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {!showRating && (
            <div className="pix-input-area">
              <textarea
                ref={textareaRef}
                className="pix-textarea"
                placeholder="Type a message..."
                rows={1}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button className="pix-send" onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          )}

          {/* Powered by */}
          <div className="pix-powered">Powered by Pixelette Technologies</div>
        </div>
      </div>
    </>
  );
}
