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
  {
    name: 'Monroe',
    slug: '/monroe',
    image: '/city/monroe.jpg',
    eyebrow: 'Ohio Border',
    tagline: '25+ dispensaries. Lake Erie. The origin market.',
    badge: 'Live Now',
  },
  {
    name: 'New Buffalo',
    slug: '/newbuffalo',
    image: '/city/newbuffalo.jpg',
    eyebrow: 'Indiana & Illinois Border',
    tagline: 'Lake Michigan sunsets. Harbor Country. 70 miles from Chicago.',
    badge: 'Live Now',
  },
  {
    name: 'Detroit',
    slug: '/detroit',
    image: '/city/detroit.jpg',
    eyebrow: 'The Motor City',
    tagline: 'Motown. Techno. Four pro teams. Michigan\'s biggest market.',
    badge: 'Live Now',
  },
  {
    name: 'Traverse City',
    slug: '/traversecity',
    image: '/city/traversecity.jpg',
    eyebrow: 'Northern Michigan',
    tagline: 'Wine trail. Sleeping Bear Dunes. Cherry capital of the world.',
    badge: 'Live Now',
  },
  {
    name: 'Ann Arbor',
    slug: '/annarbor',
    image: '/city/annarbor.jpg',
    eyebrow: 'University City',
    tagline: 'Where America\'s cannabis conversation started in 1972. Still leading it.',
    badge: 'Live Now',
  },
  {
    name: 'Lansing',
    slug: '/lansing',
    image: '/city/lansing.jpg',
    eyebrow: 'Michigan\'s Capital City',
    tagline: 'Lansterdam. Where Michigan cannabis is made — legally and literally.',
    badge: 'Live Now',
  },
];

const COMING_CITIES = [
  {
    name: 'Grand Rapids',
    eyebrow: 'West Michigan',
    tagline: 'Craft beer capital. Art Prize. The state\'s second city done right.',
    dispensaries: '25+',
  },
  {
    name: 'Kalamazoo',
    eyebrow: 'Southwest Michigan',
    tagline: 'College town. Brewery trail. Gateway to the Lake Michigan shore.',
    dispensaries: '15+',
  },
  {
    name: 'Ferndale',
    eyebrow: 'Detroit Metro',
    tagline: 'Nine Mile Road. Independent scene. Michigan\'s most creative suburb.',
    dispensaries: '10+',
  },

  {
    name: 'Ypsilanti',
    eyebrow: 'Washtenaw County',
    tagline: 'Overlooked by Ann Arbor visitors. Beloved by everyone who finds it.',
    dispensaries: '12+',
  },
  {
    name: 'Bay City',
    eyebrow: 'Saginaw Bay',
    tagline: 'Waterfront city. Historic downtown. Northern Michigan\'s gateway.',
    dispensaries: '10+',
  },
  {
    name: 'Flint',
    eyebrow: 'Genesee County',
    tagline: 'Resilient. Creative. A cannabis market that reflects a city on the rise.',
    dispensaries: '15+',
  },
  {
    name: 'Battle Creek',
    eyebrow: 'Calhoun County',
    tagline: 'Cereal City reinvented. Kalamazoo River trail. Solid deals daily.',
    dispensaries: '10+',
  },
  {
    name: 'Berrien County',
    eyebrow: 'Harbor Country',
    tagline: 'The full southwest Michigan shore. New Buffalo\'s home county.',
    dispensaries: '15+',
  },
  {
    name: 'Burton',
    eyebrow: 'Genesee County',
    tagline: 'Flint metro. Strong local market. Deals worth knowing.',
    dispensaries: '9+',
  },
  {
    name: 'Emmett',
    eyebrow: 'St. Clair County',
    tagline: 'Blue Water region. Between Detroit and the Thumb. Growing fast.',
    dispensaries: '9+',
  },
  {
    name: 'Muskegon',
    eyebrow: 'West Michigan Shore',
    tagline: 'Lake Michigan halfway point. State parks, dunes, and a market that knows quality.',
    dispensaries: '12+',
  },
];

export default function CitiesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main style={{ backgroundColor: COLORS.green, minHeight: '100vh', fontFamily: S.font }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: ${menuOpen ? 'flex' : 'none'} !important; }
          .header-outer { padding: 16px 24px !important; }
          .cities-hero { padding: 48px 24px 40px !important; }
          .cities-hero h1 { font-size: 36px !important; }
          .live-grid { grid-template-columns: 1fr !important; }
          .coming-grid { grid-template-columns: 1fr !important; }
          .city-card-image { height: 200px !important; }
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .live-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .coming-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        .city-card:hover .city-card-overlay {
          opacity: 1 !important;
        }
        .city-card:hover .city-card-image {
          transform: scale(1.03);
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
          <Link href="/cities" style={{ color: COLORS.gold, fontSize: '15px', textDecoration: 'none', borderBottom: `1px solid ${COLORS.gold}`, paddingBottom: '2px' }}>Cities</Link>
          <Link href="/dispensaries" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Dispensaries</Link>
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
        <Link href="/cities" style={{ color: COLORS.gold, fontSize: '16px', textDecoration: 'none' }}>Cities</Link>
        <Link href="/dispensaries" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Dispensaries</Link>
        <Link href="/terpenes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Terpenes</Link>
        <Link href="/processes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>The Science</Link>
        <Link href="/chat" style={{ color: COLORS.green, backgroundColor: COLORS.gold, fontSize: '16px', fontWeight: 'bold', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }}>Talk to Photi</Link>
      </div>

      {/* Hero */}
      <section className="cities-hero" style={{ padding: '80px 48px 64px', textAlign: 'center' }}>
        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
          Michigan Cannabis — City by City
        </p>
        <h1 style={{ color: COLORS.cream, fontSize: '52px', fontWeight: 'bold', lineHeight: '1.15', maxWidth: '760px', margin: '0 auto 20px' }}>
          Every Michigan market.<br />
          <span style={{ color: COLORS.gold }}>One guide that knows them all.</span>
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '18px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 48px' }}>
          Photi covers Michigan from the Ohio border to the Sleeping Bear Dunes — 
          six cities live now, a dozen more coming. Find your city, talk to Photi, 
          walk in knowing exactly what you want.
        </p>

        {/* Michigan stat bar */}
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          {[
            { num: '17', label: 'Cities' },
            { num: '57', label: 'Dispensaries mapped' },
            { num: '6', label: 'Live now' },
            { num: '1', label: 'Photi' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ color: COLORS.gold, fontSize: '32px', fontWeight: 'bold', lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: COLORS.sage, fontSize: '13px', marginTop: '4px', opacity: 0.8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Cities */}
      <section style={{ padding: '0 48px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '32px', textAlign: 'center' }}>
            Live Now — Photi is ready in these cities
          </p>

          <div className="live-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {LIVE_CITIES.map((city) => (
              <Link
                key={city.name}
                href={city.slug}
                className="city-card"
                style={{ textDecoration: 'none', borderRadius: '16px', overflow: 'hidden', display: 'block', position: 'relative', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}
              >
                {/* Image */}
                <div style={{ overflow: 'hidden', position: 'relative' }}>
                  <img
                    className="city-card-image"
                    src={city.image}
                    alt={city.name}
                    style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                  />
                  {/* Gradient overlay always present */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'linear-gradient(to top, rgba(22,56,41,0.97) 0%, rgba(22,56,41,0.6) 60%, transparent 100%)' }} />

                  {/* Badge */}
                  <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '10px', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px' }}>
                    {city.badge}
                  </div>

                  {/* Content over image */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
                    <p style={{ color: COLORS.gold, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px', opacity: 0.9 }}>{city.eyebrow}</p>
                    <h2 style={{ color: COLORS.cream, fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px', lineHeight: 1.1 }}>{city.name}</h2>
                    <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px', opacity: 0.9 }}>{city.tagline}</p>
                    <span style={{ color: COLORS.gold, fontSize: '14px', fontWeight: 'bold', borderBottom: `1px solid rgba(181,135,58,0.5)`, paddingBottom: '2px' }}>
                      Explore {city.name} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Cities */}
      <section style={{ backgroundColor: COLORS.darkGreen, padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>
            Expanding Across Michigan
          </p>
          <h2 style={{ color: COLORS.cream, fontSize: '36px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>
            Coming Soon
          </h2>
          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '48px', maxWidth: '580px', margin: '0 auto 48px', textAlign: 'center' }}>
            Photi is building out city guides across Michigan. Every market below is in progress — dispensaries mapped, local knowledge being curated, Photi getting ready to talk.
          </p>

          <div className="coming-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {COMING_CITIES.map((city) => (
              <div key={city.name} style={{
                backgroundColor: 'rgba(181,135,58,0.06)',
                border: '1px solid rgba(181,135,58,0.15)',
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
              }}>
                {/* Coming soon badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ color: COLORS.cream, fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{city.name}</h3>
                  <span style={{ backgroundColor: 'rgba(157,196,176,0.15)', color: COLORS.sage, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(157,196,176,0.2)', whiteSpace: 'nowrap', marginLeft: '8px', flexShrink: 0 }}>
                    Soon
                  </span>
                </div>
                <p style={{ color: COLORS.gold, fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', opacity: 0.8 }}>{city.eyebrow}</p>
                <p style={{ color: COLORS.sage, fontSize: '13px', lineHeight: '1.7', marginBottom: '12px', opacity: 0.85 }}>{city.tagline}</p>
                <p style={{ color: COLORS.sage, fontSize: '12px', opacity: 0.5 }}>{city.dispensaries} dispensaries</p>
              </div>
            ))}
          </div>

          {/* Is your city missing CTA */}
          <div style={{ marginTop: '48px', textAlign: 'center', padding: '36px', backgroundColor: 'rgba(181,135,58,0.07)', borderRadius: '12px', border: '1px solid rgba(181,135,58,0.2)' }}>
            <p style={{ color: COLORS.cream, fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
              Don&apos;t see your city?
            </p>
            <p style={{ color: COLORS.sage, fontSize: '15px', lineHeight: '1.7', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
              Photi is expanding fast. If your city isn&apos;t listed, talk to Photi anyway — the cannabis knowledge translates everywhere in Michigan.
            </p>
            <Link href="/chat" style={{ backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '16px', fontWeight: 'bold', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', display: 'inline-block' }}>
              Talk to Photi
            </Link>
          </div>
        </div>
      </section>

      {/* For dispensaries */}
      <section style={{ backgroundColor: COLORS.cream, padding: '80px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            For Dispensaries & Brands
          </p>
          <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', marginBottom: '16px' }}>
            Be featured in every city Photi covers.
          </h2>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.85', marginBottom: '12px', maxWidth: '640px', margin: '0 auto 12px' }}>
            Photi is the pre-purchase conversation your dispensary never had a seat at. Featured placement means Photi recommends you first when your products match what someone needs — across every city in the Michigan network.
          </p>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.85', marginBottom: '32px', maxWidth: '640px', margin: '0 auto 32px' }}>
            Multi-city chains get multi-city placement. One conversation, every market.
          </p>
          <Link href="/featured" style={{ backgroundColor: COLORS.green, color: COLORS.cream, fontSize: '16px', fontWeight: 'bold', padding: '16px 44px', borderRadius: '50px', textDecoration: 'none', display: 'inline-block' }}>
            Learn About Featured Placement →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: COLORS.darkGreen, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px' }}>
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
