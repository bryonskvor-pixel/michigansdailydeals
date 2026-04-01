"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const COLORS = {
  green: '#1E4D35',
  darkGreen: '#163829',
  gold: '#B5873A',
  cream: '#F5F0E8',
  sage: '#9DC4B0',
  text: '#3D3D3A',
};

const S = { font: 'Georgia, serif' };

type Message = {
  role: 'assistant' | 'user';
  content: string;
};

const WELCOME: Message = {
  role: 'assistant',
  content: "Hey, I'm Photi. Michigan's got some incredible products out there today and I want to help you find what's right for you. What should I call you?",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || "Something went wrong on my end — try again?";
      setMessages([...updated, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...updated, { role: 'assistant', content: "Something went wrong — try that again?" }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: S.font, overflow: 'hidden' }}>

      <style>{`
        @media (max-width: 768px) {
          .chat-left-panel { display: none !important; }
          .chat-right-panel { width: 100% !important; }
          .chat-header { display: none !important; }
          .chat-messages { padding: 16px 16px 12px !important; padding-top: 72px !important; }
          .chat-input-area { padding: 10px 16px 20px !important; }
          .chat-bubble { max-width: 88% !important; font-size: 14px !important; }
          .chat-mobile-header { display: flex !important; }
        }
        @media (min-width: 769px) {
          .chat-mobile-header { display: none !important; }
        }
      `}</style>

      {/* Mobile top bar — shows on phone only */}
      <div className="chat-mobile-header" style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: COLORS.darkGreen,
        padding: '12px 16px',
        alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(181,135,58,0.2)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Image src="/photi-emblem.png" alt="Photi" width={28} height={28} />
          <span style={{ color: COLORS.gold, fontFamily: S.font, fontSize: '14px', fontWeight: 'bold' }}>
            michigansdailydeals.com
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#4CAF50' }} />
          <span style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '12px' }}>Photi</span>
        </div>
      </div>

      {/* LEFT PANEL */}
      <div className="chat-left-panel" style={{
        width: '42%', backgroundColor: COLORS.darkGreen,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 52px', overflowY: 'auto',
      }}>
        {/* Back link */}
        <div>
          <Link href="/" style={{
            color: COLORS.sage, fontSize: '13px', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '48px',
            opacity: 0.8,
          }}>
            ← michigansdailydeals.com
          </Link>

          {/* Logo + brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
            <Image src="/photi-emblem.png" alt="Photi" width={52} height={52} />
            <div>
              <div style={{ color: COLORS.gold, fontSize: '22px', fontWeight: 'bold' }}>Photi</div>
              <div style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.8 }}>by MiQuest</div>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            color: COLORS.cream, fontSize: '38px', fontWeight: 'bold',
            lineHeight: '1.2', marginBottom: '20px',
          }}>
            Michigan&apos;s cannabis market,{' '}
            <span style={{ color: COLORS.gold, fontStyle: 'italic' }}>navigated for you.</span>
          </h1>

          <p style={{
            color: COLORS.sage, fontSize: '16px', lineHeight: '1.8',
            marginBottom: '36px',
          }}>
            Stop scrolling menus. Photi asks a few real questions about your headspace
            and what you&apos;re after — then points you to the right product at the
            right dispensary today. Fast enough for a red light. Useful enough to remember.
          </p>

          {/* Bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '48px' }}>
            {[
              { bold: 'A real conversation.', rest: ' Not a quiz. Not a filter. Photi actually wants to know who you are before telling you what to buy.' },
              { bold: 'Terpene-matched.', rest: ' The science behind which product is right for your specific headspace today.' },
              { bold: 'The Daily Dose.', rest: " Your recommendations and dispensary links delivered to your inbox. Don't forget, you promised Photi." },
            ].map(({ bold, rest }, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: COLORS.gold, marginTop: '7px', flexShrink: 0,
                }} />
                <p style={{ color: COLORS.sage, fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                  <span style={{ color: COLORS.cream, fontWeight: 'bold' }}>{bold}</span>
                  {rest}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p style={{ color: COLORS.sage, fontSize: '12px', opacity: 0.5, lineHeight: '1.6' }}>
          Free. No account needed. For adults 21 and older.
        </p>
      </div>

      {/* RIGHT PANEL — Chat */}
      <div className="chat-right-panel" style={{
        flex: 1, backgroundColor: COLORS.cream,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Spacer for mobile fixed header */}
        <div style={{ height: 0 }} className="chat-mobile-spacer" />

        {/* Chat header — hidden on mobile, replaced by fixed top bar */}
        <div className="chat-header" style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '20px 28px',
          borderBottom: `1px solid rgba(30,77,53,0.12)`,
          backgroundColor: '#FDFAF4',
        }}>
          <Image src="/photi-emblem.png" alt="Photi" width={44} height={44} />
          <div>
            <div style={{ color: COLORS.text, fontWeight: 'bold', fontSize: '16px' }}>Photi</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }} />
              <span style={{ color: COLORS.text, fontSize: '12px', opacity: 0.6 }}>Ready to talk</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages" style={{
          flex: 1, overflowY: 'auto',
          padding: '28px 28px 16px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start', gap: '10px',
            }}>
              {msg.role === 'assistant' && (
                <Image src="/photi-emblem.png" alt="Photi" width={32} height={32}
                  style={{ marginTop: '4px', flexShrink: 0 }} />
              )}
              <div className="chat-bubble" style={{
                maxWidth: '72%',
                backgroundColor: msg.role === 'assistant' ? '#FFFFFF' : COLORS.green,
                color: msg.role === 'assistant' ? COLORS.text : COLORS.cream,
                padding: '14px 18px',
                borderRadius: msg.role === 'assistant' ? '4px 18px 18px 18px' : '18px 18px 4px 18px',
                fontSize: '15px', lineHeight: '1.7',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Image src="/photi-emblem.png" alt="Photi" width={32} height={32}
                style={{ marginTop: '4px' }} />
              <div style={{
                backgroundColor: '#FFFFFF', padding: '14px 18px',
                borderRadius: '4px 18px 18px 18px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      backgroundColor: COLORS.gold, opacity: 0.6,
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area" style={{
          padding: '16px 28px 24px',
          borderTop: `1px solid rgba(30,77,53,0.1)`,
          backgroundColor: '#FDFAF4',
        }}>
          <div style={{
            display: 'flex', gap: '12px', alignItems: 'flex-end',
            backgroundColor: '#FFFFFF',
            border: `1.5px solid rgba(30,77,53,0.2)`,
            borderRadius: '16px', padding: '10px 10px 10px 18px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Say something to Photi..."
              rows={1}
              style={{
                flex: 1, border: 'none', outline: 'none', resize: 'none',
                fontFamily: S.font, fontSize: '15px', color: COLORS.text,
                backgroundColor: 'transparent', lineHeight: '1.5',
                maxHeight: '120px', overflowY: 'auto',
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                backgroundColor: input.trim() && !loading ? COLORS.green : 'rgba(30,77,53,0.2)',
                color: COLORS.cream,
                border: 'none', borderRadius: '10px',
                width: '40px', height: '40px',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', transition: 'background-color 0.2s',
                flexShrink: 0,
              }}>
              ↑
            </button>
          </div>
          <p style={{
            color: COLORS.text, fontSize: '11px', opacity: 0.4,
            textAlign: 'center', marginTop: '10px',
          }}>
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        * { box-sizing: border-box; }
        textarea { min-height: 24px; }
      `}</style>
    </div>
  );
}
