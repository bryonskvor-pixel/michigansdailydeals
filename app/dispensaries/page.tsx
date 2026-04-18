"use client";
import { useState } from "react";
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

const LIVE_CITIES = [
  { name: 'Monroe', slug: '/dispensaries/monroe', cityPath: '/monroe', image: '/city/monroe.jpg', eyebrow: 'Ohio Border', tagline: '25+ dispensaries. Lake Erie.' },
  { name: 'New Buffalo', slug: '/dispensaries/newbuffalo', cityPath: '/newbuffalo', image: '/city/newbuffalo.jpg', eyebrow: 'Indiana & Illinois Border', tagline: 'Lake Michigan. 70 miles from Chicago.' },
  { name: 'Detroit', slug: '/dispensaries/detroit', cityPath: '/detroit', image: '/city/detroit.jpg', eyebrow: 'The Motor City', tagline: "Motown. Techno. Michigan's biggest market." },
  { name: 'Traverse City', slug: '/dispensaries/traversecity', cityPath: '/traversecity', image: '/city/traversecity.jpg', eyebrow: 'Northern Michigan', tagline: 'Wine trail. Sleeping Bear Dunes.' },
];

const COMING_SOON = [
  { name: 'Bay City', eyebrow: 'Saginaw Bay' },
  { name: 'Muskegon', eyebrow: 'West Michigan' },
  { name: 'Ann Arbor', eyebrow: 'University Town' },
  { name: 'Grand Rapids', eyebrow: 'Beer City USA' },
];

export default function DispensariesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main style={{ backgroundColor: COLORS.green, minHeight: '100vh', fontFamily: S.font }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: ${menuOpen ? 'flex' : 'none'} !important; }
          .header-outer { padding: 16px 24px !important; }
          .page-hero { padding: 40px 24px !important; }
          .page-hero h1 { font-size: 36px !important; }
          .cities-grid { grid-template-columns: 1fr !important; }
          .content-section { padding: 48px 24px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        .city-card:hover img {
          transform: scale(1.04);
        }
      `}</style>

      {/* Header — v2 unified 6-item nav */}
      <header className="header-outer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', borderBottom: '1px solid rgba(181,135,58,0.15)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/photi-emblem.png" alt="Photi" width={40} height={40} style={{ borderRadius: '50%' }} />
          <span style={{ color: COLORS.gold, fontSize: '20px', fontWeight: 'bold' }}>MiQuest</span>
        </Link>
        <nav className="desktop-nav" style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
          <Link href="/about" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Who is Photi?</Link>
          <Link href="/cities" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Cities</Link>
          <Link href="/dispensaries" style={{ color: COLORS.gold, fontSize: '15px', textDecoration: 'none', borderBottom: `1px solid ${COLORS.gold}` }}>Dispensaries</Link>
          <Link href="/terpenes" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Terpenes</Link>
          <Link href="/processes" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>The Science</Link>
          <Link href="/chat" style={{ backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '15px', fontWeight: 'bold', padding: '8px 20px', borderRadius: '20px', textDecoration: 'none' }}>Talk to Photi</Link>
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
          {[0,1,2].map(i => <div key={i} style={{ width: '24px', height: '2px', backgroundColor: COLORS.gold }} />)}
        </button>
      </header>

      <div className="mobile-menu" style={{ display: 'none', flexDirection: 'column', backgroundColor: COLORS.darkGreen, padding: '16px 24px 24px', borderBottom: '1px solid rgba(181,135,58,0.2)', gap: '16px' }}>
        <Link href="/about" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Who is Photi?</Link>
        <Link href="/cities" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Cities</Link>
        <Link href="/dispensaries" style={{ color: COLORS.gold, fontSize: '16px', textDecoration: 'none' }}>Dispensaries</Link>
        <Link href="/terpenes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Terpenes</Link>
        <Link href="/processes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>The Science</Link>
        <Link href="/chat" style={{ color: COLORS.green, backgroundColor: COLORS.gold, fontSize: '16px', fontWeight: 'bold', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }}>Talk to Photi</Link>
      </div>

      {/* Hero */}
      <section className="page-hero" style={{ padding: '80px 48px 48px', textAlign: 'center' }}>
        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Michigan&apos;s Dispensary Directory</p>
        <h1 style={{ color: COLORS.cream, fontSize: '52px', fontWeight: 'bold', lineHeight: '1.15', maxWidth: '720px', margin: '0 auto 20px' }}>
          Find your dispensary.
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '18px', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 16px' }}>
          Michigan has over 800 licensed dispensaries. Narrowing it down by city is the first step. Narrowing it down by what you actually need is where Photi comes in.
        </p>
        <p style={{ color: COLORS.sage, fontSize: '14px', marginTop: '20px', opacity: 0.7, fontStyle: 'italic' }}>
          Full directory pages coming soon. Start by exploring the cities below.
        </p>
      </section>

      {/* Live Cities */}
      <section className="content-section" style={{ backgroundColor: COLORS.darkGreen, padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>Live Now</p>
          <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>
            Four Cities Live
          </h2>
          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center' }}>
            Explore dispensaries, featured brands, and the local scene in each city. Full dispensary directories rolling out next.
          </p>

          <div className="cities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {LIVE_CITIES.map((city) => (
              <Link
                key={city.name}
                href={city.cityPath}
                className="city-card"
                style={{ textDecoration: 'none', borderRadius: '12px', overflow: 'hidden', display: 'block', boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={city.image}
                    alt={city.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '75%', background: 'linear-gradient(to top, rgba(22,56,41,0.98) 0%, transparent 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
                    <p style={{ color: COLORS.gold, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.9 }}>{city.eyebrow}</p>
                    <h3 style={{ color: COLORS.cream, fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px' }}>{city.name}</h3>
                    <p style={{ color: COLORS.sage, fontSize: '12px', lineHeight: '1.5', margin: 0, opacity: 0.85 }}>{city.tagline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="content-section" style={{ backgroundColor: COLORS.green, padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>Coming Soon</p>
          <h2 style={{ color: COLORS.cream, fontSize: '32px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>
            More Cities on the Way
          </h2>
          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center' }}>
            Every Michigan cannabis market. One at a time. These are up next.
          </p>

          <div className="cities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {COMING_SOON.map((city) => (
              <div
                key={city.name}
                style={{
                  borderRadius: '12px',
                  padding: '32px 24px',
                  backgroundColor: 'rgba(181,135,58,0.05)',
                  border: '1px dashed rgba(181,135,58,0.3)',
                  textAlign: 'center',
                  opacity: 0.75,
                }}
              >
                <p style={{ color: COLORS.gold, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{city.eyebrow}</p>
                <h3 style={{ color: COLORS.cream, fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px' }}>{city.name}</h3>
                <p style={{ color: COLORS.sage, fontSize: '12px', fontStyle: 'italic', margin: 0, opacity: 0.8 }}>Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photi CTA */}
      <section style={{ backgroundColor: COLORS.darkGreen, padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <img src="/photi-emblem.png" alt="Photi" width={80} height={80} style={{ marginBottom: '24px', borderRadius: '50%' }} />
          <h2 style={{ color: COLORS.gold, fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Skip the scroll. Talk to Photi.
          </h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', marginBottom: '36px' }}>
            Michigan&apos;s dispensaries are only as useful as the conversation you have before walking in. Photi gets to what you actually need — and points you at the right menu, deal, and product for today.
          </p>
          <Link href="/chat" style={{ backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '18px', fontWeight: 'bold', padding: '16px 48px', borderRadius: '50px', textDecoration: 'none', display: 'inline-block' }}>
            Talk to Photi
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: COLORS.green, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/photi-emblem.png" alt="Photi" width={28} height={28} style={{ borderRadius: '50%' }} />
            <span style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents michigansdailydeals.com</span>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '13px' }}>Photi powered by MiQuest · hello@michigansdailydeals.com</p>
          <p style={{ color: COLORS.sage, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>For adults 21 and older. Please consume responsibly.</p>
        </div>
      </footer>
    </main>
  );
}
