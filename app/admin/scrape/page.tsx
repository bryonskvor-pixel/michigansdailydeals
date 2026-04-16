'use client';

import { useState } from 'react';

export default function AdminScrapePage() {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);
  const [secret, setSecret] = useState('');

  async function runScraper() {
    if (!secret) {
      alert('Enter your CRON_SECRET first');
      return;
    }
    setStatus('running');
    setResult(null);

    try {
      const res = await fetch('/api/cron/scrape', {
        headers: { Authorization: `Bearer ${secret}` },
      });
      const data = await res.json();
      setResult(data);
      setStatus(data.success ? 'success' : 'error');
    } catch (err: any) {
      setResult({ error: err.message });
      setStatus('error');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Courier New', monospace",
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        border: '1px solid #1E4D35',
        padding: '2.5rem',
        background: '#0d130d',
      }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#B5873A', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
            MICHIGANSDAILYDEALS.COM
          </div>
          <h1 style={{ color: '#e8f5e8', fontSize: '1.5rem', margin: 0, fontWeight: 400 }}>
            Scraper Control
          </h1>
          <div style={{ color: '#4a7a4a', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Dutchie GraphQL → Supabase products table
          </div>
        </div>

        {/* Dispensaries */}
        <div style={{
          background: '#111811',
          border: '1px solid #1a2e1a',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.8rem',
          color: '#4a7a4a',
        }}>
          <div style={{ color: '#B5873A', marginBottom: '0.5rem', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            ACTIVE DISPENSARIES
          </div>
          <div>✓ Mint Cannabis Monroe</div>
          <div>✓ Uniq Cannabis Monroe</div>
          <div>✓ Happy Daze Monroe</div>
        </div>

        {/* Secret input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#4a7a4a', fontSize: '0.75rem', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>
            CRON_SECRET
          </label>
          <input
            type="password"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            placeholder="Enter your CRON_SECRET"
            style={{
              width: '100%',
              background: '#111811',
              border: '1px solid #1E4D35',
              color: '#e8f5e8',
              padding: '0.75rem',
              fontFamily: "'Courier New', monospace",
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Run button */}
        <button
          onClick={runScraper}
          disabled={status === 'running'}
          style={{
            width: '100%',
            padding: '1rem',
            background: status === 'running' ? '#1a2e1a' : '#1E4D35',
            color: status === 'running' ? '#4a7a4a' : '#B5873A',
            border: '1px solid #B5873A',
            fontFamily: "'Courier New', monospace",
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            cursor: status === 'running' ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {status === 'running' ? '⟳  SCRAPING...' : '▶  RUN SCRAPER NOW'}
        </button>

        {/* Results */}
        {result && (
          <div style={{
            marginTop: '1.5rem',
            background: '#111811',
            border: `1px solid ${status === 'success' ? '#1E4D35' : '#4a1515'}`,
            padding: '1.25rem',
          }}>
            <div style={{
              color: status === 'success' ? '#4CAF50' : '#ef5350',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              marginBottom: '0.75rem',
            }}>
              {status === 'success' ? '✓ SUCCESS' : '✗ ERROR'}
            </div>

            {result.scraped !== undefined && (
              <div style={{ color: '#B5873A', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {result.scraped} products saved
              </div>
            )}

            {result.summary && (
              <div style={{ marginBottom: '0.75rem' }}>
                {Object.entries(result.summary).map(([name, count]) => (
                  <div key={name} style={{ color: '#4a7a4a', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{name}</span>
                    <span style={{ color: '#e8f5e8' }}>{count as number} products</span>
                  </div>
                ))}
              </div>
            )}

            {result.errors?.length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ color: '#ef5350', fontSize: '0.75rem', marginBottom: '0.25rem' }}>ERRORS:</div>
                {result.errors.map((e: string, i: number) => (
                  <div key={i} style={{ color: '#4a7a4a', fontSize: '0.75rem' }}>{e}</div>
                ))}
              </div>
            )}

            {result.error && (
              <div style={{ color: '#ef5350', fontSize: '0.8rem' }}>{result.error}</div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '2rem', color: '#1E4D35', fontSize: '0.7rem', textAlign: 'center' }}>
          Cron runs daily at 8am ET · /api/cron/scrape
        </div>
      </div>
    </div>
  );
}
