/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Voice input/output utilities using browser Web Speech API.
 * No external API keys required — uses built-in browser capabilities.
 */

interface SpeechRecognizerOptions {
  lang?: string;
}

interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );
}

export function createSpeechRecognizer(
  options: SpeechRecognizerOptions = {},
): any | null {
  if (!isSpeechRecognitionSupported()) return null;

  const SR =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  const recognizer = new SR();
  recognizer.continuous = false;
  recognizer.interimResults = true;
  recognizer.lang = options.lang || 'en-GB';
  recognizer.maxAlternatives = 1;

  return recognizer;
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return !!window.speechSynthesis;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')        // code blocks
    .replace(/`[^`]*`/g, '')               // inline code
    .replace(/\*\*([^*]+)\*\*/g, '$1')     // bold
    .replace(/\*([^*]+)\*/g, '$1')         // italic
    .replace(/#{1,6}\s*/g, '')             // headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links — keep text
    .replace(/https?:\/\/[^\s]+/g, '')     // bare URLs
    .replace(/~~([^~]+)~~/g, '$1')         // strikethrough
    .replace(/>\s*/g, '')                  // blockquotes
    .replace(/[-*+]\s+/g, '')             // list markers
    .replace(/\n{2,}/g, '. ')             // paragraph breaks → pause
    .replace(/\n/g, ' ')                  // single newlines
    .trim();
}

export function speakText(text: string, options: SpeakOptions = {}): void {
  if (!isSpeechSynthesisSupported()) return;

  try {
    window.speechSynthesis.cancel();

    const cleaned = stripMarkdown(text);
    if (!cleaned) return;

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.rate = options.rate ?? 1;
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 0.8;
    if (options.lang) utterance.lang = options.lang;

    window.speechSynthesis.speak(utterance);
  } catch {
    /* silent */
  }
}

export function stopSpeaking(): void {
  if (!isSpeechSynthesisSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* silent */
  }
}

export function detectLanguageForSpeech(text: string): string {
  // Urdu-specific range (check before Arabic since Urdu also uses Arabic script)
  if (/[\u0750-\u077F]/.test(text)) return 'ur-PK';
  // Arabic script
  if (/[\u0600-\u06FF]/.test(text)) return 'ar-SA';
  return 'en-GB';
}
