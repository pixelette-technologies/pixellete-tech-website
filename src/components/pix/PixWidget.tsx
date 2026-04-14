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
  'I have an AI project',
  'I need blockchain',
  'Build me an app',
  'Talk to sales',
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
  const [awaitingName, setAwaitingName] = useState(false);
  const [awaitingEmail, setAwaitingEmail] = useState(false);
  const [awaitingCompany, setAwaitingCompany] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [leadFired, setLeadFired] = useState(false);
  const [showIntroForm, setShowIntroForm] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('pix_intro_done');
    }
    return true;
  });
  const [introName, setIntroName] = useState('');
  const [introEmail, setIntroEmail] = useState('');
  const [introError, setIntroError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const closedRef = useRef(false);

  // Initialize session
  useEffect(() => {
    let sid = localStorage.getItem('pix_sid');
    if (!sid) {
      const randomBytes = new Uint8Array(16);
      crypto.getRandomValues(randomBytes);
      const randomPart = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
      sid = `pix_${Date.now()}_${randomPart}`;
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

  // Load Turnstile — only if a valid site key is provided
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || siteKey === '0x4AAA_your_site_key' || siteKey.length < 10) return;

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

  // Load history on mount (when sessionId is ready) — not on open
  const welcomeShownRef = useRef(false);
  useEffect(() => {
    if (!sessionId || historyLoaded) return;

    const loadHistory = async () => {
      try {
        const res = await fetch(`/api/chat/history?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          const cleaned = data.messages.map((m: Message) => ({
            role: m.role,
            content: m.role === 'assistant' ? cleanDisplayText(m.content) : m.content,
          }));
          setMessages(cleaned);
          setMessageCount(data.messageCount || 0);
          setIsFirstMessage(false);
          setShowIntroForm(false);
          localStorage.setItem('pix_intro_done', 'true');
          if (cleaned.some((m: Message) => m.role === 'user')) setLeadFired(true);
        } else {
          setShowGreeting(true);
        }
      } catch {
        setShowGreeting(true);
      }
      setHistoryLoaded(true);
    };

    loadHistory();
  }, [sessionId, historyLoaded]);

  // Show welcome back message once when widget opens with existing history
  useEffect(() => {
    if (isOpen && historyLoaded && messages.length > 0 && !welcomeShownRef.current && !showGreeting) {
      welcomeShownRef.current = true;
      setMessages(prev => [...prev, { role: 'assistant', content: 'Welcome back. Where would you like to pick up?' }]);
    }
    // Show greeting with delay only for new visitors when they open
    if (isOpen && historyLoaded && messages.length === 0 && showGreeting) {
      // Greeting already set, just needs to render
    }
  }, [isOpen, historyLoaded, messages.length, showGreeting]);

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
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || !sessionId) return;
    const trimmed = text.trim();

    // Manual capture: awaiting name
    if (awaitingName) {
      setLead(prev => ({ ...prev, name: trimmed }));
      setMessages(prev => [...prev, { role: 'user', content: trimmed }, { role: 'assistant', content: `Thanks ${trimmed}. And the best email to reach you on?` }]);
      setAwaitingName(false);
      setAwaitingEmail(true);
      setShowPrivacyNotice(true);
      setInput('');
      return;
    }

    // Manual capture: awaiting email
    if (awaitingEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        setMessages(prev => [...prev, { role: 'user', content: trimmed }, { role: 'assistant', content: 'That does not look like a valid email. Could you check and try again?' }]);
        setInput('');
        return;
      }
      setLead(prev => ({ ...prev, email: trimmed }));
      setMessages(prev => [...prev, { role: 'user', content: trimmed }, { role: 'assistant', content: 'Got it. And which company are you with?' }]);
      setAwaitingEmail(false);
      setAwaitingCompany(true);
      setShowPrivacyNotice(false);
      setLeadFired(true);
      setInput('');
      return;
    }

    // Manual capture: awaiting company
    if (awaitingCompany) {
      setLead(prev => ({ ...prev, company: trimmed }));
      setMessages(prev => [...prev, { role: 'user', content: trimmed }, { role: 'assistant', content: `${trimmed}, great. Now, tell me more about what you are looking to build.` }]);
      setAwaitingCompany(false);
      setInput('');
      return;
    }

    // Normal message flow
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    // Show clean message in chat, send context to API only
    const userMessage: Message = { role: 'user', content: trimmed };
    const displayMessages = [...messages, userMessage];
    setMessages(displayMessages);

    // Build API messages with hidden context prepended to first message
    let apiContent = trimmed;
    if (messages.length === 0 && lead.name && lead.email) {
      apiContent = `[CONTEXT: Visitor name is ${lead.name}, email is ${lead.email}. Do NOT ask for name or email again.]\n\n${trimmed}`;
    }
    const apiMessages = [...messages, { role: 'user' as const, content: apiContent }];
    setInput('');
    setIsLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
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
        // Trigger manual capture if API says needsLeadCapture and no email yet
        if (data.meta.needsLeadCapture && !lead.email && !leadFired) {
          if (!lead.name) {
            setAwaitingName(true);
          } else {
            setAwaitingEmail(true);
            setShowPrivacyNotice(true);
          }
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
  }, [messages, sessionId, messageCount, isFirstMessage, turnstileToken, isLoading, awaitingName, awaitingEmail, awaitingCompany, lead.email, lead.name, leadFired]);

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

  const handleIntroSubmit = () => {
    setIntroError('');
    if (!introName.trim()) { setIntroError('Please enter your name.'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(introEmail.trim())) { setIntroError('Please enter a valid email.'); return; }
    const name = introName.trim();
    const email = introEmail.trim();
    setLead(prev => ({ ...prev, name, email }));
    setLeadFired(true);
    setShowIntroForm(false);
    setShowGreeting(true);
    localStorage.setItem('pix_intro_done', 'true');

    // Fire lead capture to Supabase immediately
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: `[CONTEXT: Visitor already provided their name (${name}) and email (${email}) before starting the chat. Do NOT ask for name or email again.]` }],
        sessionId,
        messageCount: 0,
        isFirstMessage: true,
      }),
    }).catch(() => {});
  };

  const showScoreBadge = lead.score > 50 && (lead.tier === 'hot' || lead.tier === 'urgent');

  return (
    <>
      <style>{`
        .pix-widget * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; }

        /* Launcher */
        .pix-launcher {
          position: fixed; bottom: 24px; right: 24px; z-index: 9999;
          width: 60px; height: 60px; border-radius: 50%;
          background: linear-gradient(135deg, #0A1628 0%, #1a0a2e 60%, #2d1b4e 100%);
          border: 2px solid rgba(167, 139, 250, 0.3);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 24px rgba(10, 22, 40, 0.5), 0 0 40px rgba(109, 40, 217, 0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pix-launcher:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 32px rgba(10, 22, 40, 0.6), 0 0 60px rgba(109, 40, 217, 0.25);
        }
        .pix-notif-dot {
          position: absolute; top: 0; right: 0;
          width: 16px; height: 16px; border-radius: 50%;
          background: #DC2626; border: 2.5px solid #0A1628;
          animation: pix-pulse 2s infinite;
        }
        @keyframes pix-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(0.9); } }

        /* Window */
        .pix-window {
          position: fixed; bottom: 96px; right: 24px; z-index: 9998;
          width: 390px; max-width: calc(100vw - 48px);
          height: 580px; max-height: calc(100vh - 120px);
          background: #0d0f14;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 80px rgba(109, 40, 217, 0.08);
          display: flex; flex-direction: column;
          overflow: hidden;
          opacity: 0; transform: translateY(16px) scale(0.97);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }
        .pix-window.pix-open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

        /* Header */
        .pix-header {
          background: linear-gradient(135deg, #0A1628 0%, #111827 100%);
          color: #fff; padding: 18px 20px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .pix-avatar {
          width: 40px; height: 40px; border-radius: 12px;
          background: linear-gradient(135deg, #6d28d9, #4f46e5);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 17px; flex-shrink: 0;
          color: #fff; letter-spacing: -0.5px;
        }
        .pix-header-info { flex: 1; }
        .pix-header-name { font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; color: #f1f5f9; }
        .pix-online-dot { width: 8px; height: 8px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 6px rgba(34, 197, 94, 0.5); }
        .pix-header-sub { font-size: 12px; color: #64748b; margin-top: 2px; }
        .pix-score-badge {
          padding: 2px 10px; border-radius: 10px; font-size: 10px;
          font-weight: 700; color: #fff; letter-spacing: 0.5px; text-transform: uppercase;
        }
        .pix-close {
          background: rgba(255, 255, 255, 0.05); border: none; cursor: pointer;
          color: #64748b; font-size: 18px; padding: 6px 10px;
          border-radius: 8px; transition: all 0.2s;
        }
        .pix-close:hover { color: #f1f5f9; background: rgba(255, 255, 255, 0.1); }

        /* Messages area */
        .pix-messages {
          flex: 1; overflow-y: auto; padding: 20px 16px; display: flex;
          flex-direction: column; gap: 10px;
          background: #0d0f14;
          scrollbar-width: thin; scrollbar-color: #1e293b #0d0f14;
        }
        .pix-messages::-webkit-scrollbar { width: 4px; }
        .pix-messages::-webkit-scrollbar-track { background: transparent; }
        .pix-messages::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }

        /* Message bubbles */
        .pix-msg {
          max-width: 80%; padding: 12px 16px; font-size: 13.5px;
          line-height: 1.6; word-wrap: break-word;
          animation: pix-fadeIn 0.2s ease;
        }
        @keyframes pix-fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .pix-msg-bot {
          background: #161b26; color: #cbd5e1;
          align-self: flex-start;
          border-radius: 2px 16px 16px 16px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .pix-msg-user {
          background: linear-gradient(135deg, #6d28d9, #4f46e5);
          color: #fff; align-self: flex-end;
          border-radius: 16px 16px 2px 16px;
          box-shadow: 0 2px 12px rgba(109, 40, 217, 0.2);
        }

        /* Typing indicator */
        .pix-typing {
          display: flex; gap: 5px; padding: 12px 16px; align-self: flex-start;
          background: #161b26; border-radius: 2px 16px 16px 16px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .pix-typing-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #6d28d9;
          animation: pix-bounce 1.4s infinite ease-in-out;
        }
        .pix-typing-dot:nth-child(2) { animation-delay: 0.16s; }
        .pix-typing-dot:nth-child(3) { animation-delay: 0.32s; }
        @keyframes pix-bounce { 0%, 80%, 100% { transform: scale(0.5); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }

        /* Input area */
        .pix-input-area {
          padding: 14px 16px; border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex; align-items: flex-end; gap: 10px;
          background: #111318;
        }
        .pix-textarea {
          flex: 1; border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px; padding: 10px 16px;
          font-size: 13.5px; resize: none; max-height: 100px;
          font-family: inherit; outline: none; line-height: 1.4;
          background: #161b26; color: #e2e8f0;
          transition: border-color 0.2s;
          overflow-y: auto; scrollbar-width: none;
        }
        .pix-textarea::-webkit-scrollbar { display: none; }
        .pix-textarea::placeholder { color: #475569; }
        .pix-textarea:focus { border-color: rgba(109, 40, 217, 0.5); }
        .pix-send {
          width: 38px; height: 38px; border-radius: 12px;
          background: linear-gradient(135deg, #6d28d9, #4f46e5);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(109, 40, 217, 0.3);
        }
        .pix-send:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(109, 40, 217, 0.4); }
        .pix-send:disabled { opacity: 0.3; cursor: not-allowed; transform: none; box-shadow: none; }

        /* Quick replies */
        .pix-quick-replies { display: flex; flex-wrap: wrap; gap: 8px; padding: 4px 16px 12px; background: #0d0f14; }
        .pix-quick-btn {
          padding: 8px 16px; border-radius: 20px;
          border: 1px solid rgba(109, 40, 217, 0.3);
          background: rgba(109, 40, 217, 0.08);
          font-size: 12.5px; cursor: pointer; color: #a78bfa;
          transition: all 0.2s; font-weight: 500;
        }
        .pix-quick-btn:hover {
          background: linear-gradient(135deg, #6d28d9, #4f46e5);
          color: #fff; border-color: transparent;
          box-shadow: 0 2px 12px rgba(109, 40, 217, 0.3);
        }

        /* Footer */
        .pix-powered {
          text-align: center; padding: 8px; font-size: 10px;
          color: #334155; background: #0d0f14;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          letter-spacing: 0.3px;
        }

        /* Rating */
        .pix-rating-card { padding: 24px; text-align: center; background: #0d0f14; }
        .pix-rating-card h4 { font-size: 15px; color: #e2e8f0; margin-bottom: 16px; font-weight: 500; }
        .pix-stars { display: flex; justify-content: center; gap: 10px; margin-bottom: 16px; }
        .pix-star {
          font-size: 32px; cursor: pointer; transition: transform 0.15s;
          background: none; border: none; padding: 0; line-height: 1;
        }
        .pix-star:hover { transform: scale(1.2); }
        .pix-rating-comment {
          width: 100%; border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px; padding: 10px 14px; font-size: 13px;
          resize: none; margin-bottom: 12px; font-family: inherit;
          background: #161b26; color: #e2e8f0; outline: none;
        }
        .pix-rating-comment::placeholder { color: #475569; }
        .pix-rating-submit {
          padding: 10px 24px; border-radius: 12px;
          background: linear-gradient(135deg, #6d28d9, #4f46e5);
          color: #fff; border: none; cursor: pointer;
          font-size: 13px; font-weight: 600; transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(109, 40, 217, 0.3);
        }
        .pix-rating-submit:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(109, 40, 217, 0.4); }
        .pix-rating-thanks { font-size: 14px; color: #22C55E; margin-top: 12px; }
        .pix-low-rating-note { font-size: 12px; color: #64748b; margin-top: 8px; line-height: 1.5; }

        /* Intro form */
        .pix-intro-form {
          flex: 1; display: flex; flex-direction: column;
          justify-content: center; padding: 32px 24px;
          background: #0d0f14; gap: 16px;
        }
        .pix-intro-form h3 {
          font-size: 18px; font-weight: 600; color: #f1f5f9;
          margin-bottom: 4px;
        }
        .pix-intro-form p {
          font-size: 13px; color: #64748b; line-height: 1.5;
          margin-bottom: 8px;
        }
        .pix-intro-input {
          width: 100%; border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px; padding: 12px 16px;
          font-size: 14px; font-family: inherit; outline: none;
          background: #161b26; color: #e2e8f0;
          transition: border-color 0.2s;
        }
        .pix-intro-input::placeholder { color: #475569; }
        .pix-intro-input:focus { border-color: rgba(109, 40, 217, 0.5); }
        .pix-intro-submit {
          width: 100%; padding: 12px; border-radius: 12px;
          background: linear-gradient(135deg, #6d28d9, #4f46e5);
          color: #fff; border: none; cursor: pointer;
          font-size: 14px; font-weight: 600; transition: all 0.2s;
          box-shadow: 0 2px 12px rgba(109, 40, 217, 0.3);
          margin-top: 4px;
        }
        .pix-intro-submit:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(109, 40, 217, 0.4); }
        .pix-intro-error {
          font-size: 12px; color: #ef4444; text-align: center;
        }
        .pix-intro-privacy {
          font-size: 11px; color: #475569; text-align: center; line-height: 1.5;
        }

        /* Privacy notice */
        .pix-privacy-notice {
          background: rgba(109, 40, 217, 0.08); padding: 8px 16px; font-size: 11px;
          color: #a78bfa; text-align: center;
          border-top: 1px solid rgba(109, 40, 217, 0.15);
        }

        /* Mobile */
        @media (max-width: 440px) {
          .pix-window { width: calc(100vw - 16px); right: 8px; bottom: 80px; height: calc(100vh - 100px); max-height: none; }
          .pix-launcher { bottom: 16px; right: 16px; width: 56px; height: 56px; }
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

          {/* Intro form — shown before chat starts */}
          {showIntroForm ? (
            <div className="pix-intro-form">
              <h3>Welcome to Pixelette</h3>
              <p>Enter your details to start chatting with Pix, our AI assistant.</p>
              {introError && <p className="pix-intro-error">{introError}</p>}
              <input
                className="pix-intro-input"
                placeholder="Your name"
                value={introName}
                onChange={e => setIntroName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleIntroSubmit()}
              />
              <input
                className="pix-intro-input"
                placeholder="Work email"
                type="email"
                value={introEmail}
                onChange={e => setIntroEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleIntroSubmit()}
              />
              <button className="pix-intro-submit" onClick={handleIntroSubmit}>
                Start Chat
              </button>
              <p className="pix-intro-privacy">
                Details shared are handled per our privacy policy and UK GDPR.
              </p>
            </div>
          ) : (
          <>
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
                    {lead.name ? `Hi ${lead.name}, I'm Pix, your AI assistant. How can I help you?` : `Hi, I'm Pix, your AI assistant. How can I help you?`}
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

          {/* Privacy notice */}
          {showPrivacyNotice && (
            <div className="pix-privacy-notice">
              Details shared are handled per our privacy policy and UK GDPR
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
          </>
          )}
        </div>
      </div>
    </>
  );
}
