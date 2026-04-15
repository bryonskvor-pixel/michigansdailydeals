"use client";
import { useState, useEffect } from "react";
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

const DISPENSARIES = [
  {
    name: 'Bloomery Cannabis',
    address: 'New Buffalo, MI',
    hours: '9am–10pm daily',
    url: 'https://www.bloomerycannabis.com/',
    note: "Bloomery brings a craft-forward approach to the New Buffalo market. Thoughtfully curated menu, knowledgeable staff, and the kind of selection that rewards the curious shopper. A natural first stop for the discerning weekend visitor.",
  },
  {
    name: 'Herbology Cannabis Co.',
    address: 'New Buffalo, MI',
    hours: '9am–10pm daily',
    url: 'https://herbologycannabis.com/',
    note: "Herbology has built a reputation across Michigan for doing things right. Clean stores, consistent quality, and a team that actually knows the menu. The kind of dispensary you trust on a first visit and return to every trip after.",
  },
  {
    name: 'The Flower Bowl Cannabis',
    address: 'New Buffalo, MI',
    hours: '9am–10pm daily',
    url: 'https://theflowerbowl.com/',
    note: "The Flower Bowl is a Michigan original with genuine craft knowledge behind it. Premium flower selection, strong concentrate game, and daily deals worth checking. One of the best-stocked menus in the Harbor Country area.",
  },
  {
    name: 'Levels Cannabis',
    address: 'New Buffalo, MI',
    hours: '9am–10pm daily',
    url: 'https://levelscannabis.com/',
    note: "Levels keeps it straightforward — good product, fair prices, and a staff that cuts through the noise. If you know what you want and want to get in and out with something excellent, Levels delivers every time.",
  },
];

const COFFEE = [
  {
    name: 'Issa Vibe Café',
    address: 'New Buffalo, MI',
    hours: 'Daily',
    note: 'Third wave coffee from Onyx Coffee Lab. Every syrup made in-house, endless flavor combinations, interior design that stops you at the door. The coolest coffee shop in Harbor Country and it is not particularly close.',
  },
  {
    name: "David's Delicatessen & Coffee",
    address: '30 N. Whittaker St (Downtown)',
    hours: 'Morning daily',
    note: "Your morning bagel and coffee right on Whittaker Street. Come back after dark — it transforms into The False Front, a hidden cocktail bar that locals keep to themselves. Two visits, one address.",
  },
  {
    name: 'Red Arrow Roasters',
    address: 'Harbor Country area',
    hours: 'Daily',
    note: 'Nearly ten years of obsessing over roasting the best coffee for this corner of Michigan. A genuine local institution. The kind of cup that makes you think about where your coffee comes from.',
  },
  {
    name: "Zoe's Bakery",
    address: 'New Buffalo, MI',
    hours: 'Morning daily',
    note: 'Fresh-baked everything. The pastries get mentioned in every review. Excellent coffee, excellent baked goods, the kind of warm neighborhood spot that sets the tone for a perfect beach day.',
  },
];

const EAT = [
  {
    name: "Redamak's",
    address: '616 E Buffalo St',
    hours: 'Seasonal, March–Oct',
    note: "A New Buffalo landmark since 1975. Hand-ground burgers in plastic baskets lined with red-checked wax paper. Cash only, no exceptions. If there's a line, wait — the Maroney family are pros and it moves fast. Bite into a legend.",
  },
  {
    name: 'The Stray Dog Bar & Grill',
    address: '245 N Whittaker St',
    hours: 'Daily',
    note: 'Rooftop bar, marina patio, American fare done right. The most scenic dining room in New Buffalo — Lake Michigan on one side, the harbor on the other. Perfect for a long lunch after dispensary stops.',
  },
  {
    name: 'Bentwood Tavern',
    address: '600 W Water St (Marina Grand)',
    hours: 'Daily',
    note: 'Globally inspired comfort food from local ingredients. Seasonal menu, mid-century vibe, waterfront patio overlooking the marina. The wood-fired feta and olives alone are worth the reservation.',
  },
  {
    name: "Brewster's Italian Café",
    address: '11 W Merchant St',
    hours: 'Daily',
    note: 'Classic pasta and wood-fired pizza right on Whittaker Street. Outdoor patio, affordable, reliably excellent. The kind of Italian place you wish existed in your neighborhood back home.',
  },
];

const EXPLORE = [
  {
    name: 'New Buffalo Public Beach',
    desc: 'Nearly 800 feet of golden Lake Michigan sand. Swimming, sunsets, kayak rentals, lifeguards in summer. Walking distance from downtown — park once and stay all day.',
    tip: 'The sunset here is the reason people drive from Chicago on a Friday. Plan around it.',
    url: 'https://www.newbuffalo.com/',
  },
  {
    name: 'Third Coast Paddling',
    desc: 'Kayak and paddleboard rentals on the Galien River, right across from the City Beach parking lot. Lessons available for first-timers.',
    tip: 'The Galien River winds through marshland before opening into the lake. Take the longer route.',
    url: '',
  },
  {
    name: 'Oselka Marina',
    desc: 'Boat and jet ski rentals, transient slips, e-bikes and golf carts in season. The harbor buzzes all summer with sailboats and yachts. One of the most scenic strolls in town at dusk.',
    tip: 'Walk the harbor at golden hour. You will understand why people pay what they pay to live here.',
    url: '',
  },
  {
    name: 'Lake Michigan Shore Wine Trail',
    desc: 'St. Julian Winery, Round Barn Tasting Room, and Shady Creek Winery all within 20 minutes. Southwest Michigan has a genuinely world-class wine region that most people outside the Midwest have never heard of.',
    tip: 'Round Barn does a distillery tour alongside the tasting. Budget a full afternoon.',
    url: 'https://www.lakemichiganshorewinetrail.com/',
  },
];

// Weekly spotlight — update manually each week
const SPOTLIGHT = {
  name: 'Coming Soon',
  tagline: 'New Buffalo has hidden gems worth finding.',
  description: "We're curating this week's spotlight — a local business in New Buffalo that deserves your attention. Check back soon, or talk to Photi for personalized recommendations right now.",
  address: 'New Buffalo, MI',
  url: '',
  weekOf: "This Week's Spotlight",
};

export default function NewBuffaloPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weather, setWeather] = useState<{ temp: string; condition: string; icon: string } | null>(null);

  useEffect(() => {
    fetch('https://wttr.in/New+Buffalo,MI?format=j1')
      .then(r => r.json())
      .then(data => {
        const current = data.current_condition[0];
        setWeather({
          temp: current.temp_F + '°F',
          condition: current.weatherDesc[0].value,
          icon: current.temp_F > 65 ? '☀️' : current.temp_F > 40 ? '🌤️' : '❄️',
        });
      })
      .catch(() => setWeather(null));
  }, []);

  return (
    <main style={{ backgroundColor: COLORS.green, minHeight: '100vh', fontFamily: S.font }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: ${menuOpen ? 'flex' : 'none'} !important; }
          .header-outer { padding: 16px 24px !important; }
          .page-hero { padding: 40px 24px 32px !important; }
          .page-hero h1 { font-size: 34px !important; }
          .content-section { padding: 40px 24px !important; }
          .content-section h2 { font-size: 26px !important; }
          .card-grid { grid-template-columns: 1fr !important; }
          .hero-image { height: 220px !important; border-radius: 12px !important; }
          .section-patch { width: 100px !important; height: 100px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="header-outer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', borderBottom: '1px solid rgba(181,135,58,0.15)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/photi-emblem.png" alt="Photi" width={40} height={40} style={{ borderRadius: '50%' }} />
          <span style={{ color: COLORS.gold, fontSize: '20px', fontWeight: 'bold' }}>MiQuest</span>
        </Link>
        <nav className="desktop-nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="/about" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Who is Photi?</Link>
          <Link href="/terpenes" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Terpenes</Link>
          <Link href="/processes" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>The Science</Link>
          <Link href="/deals" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Today&apos;s Deals</Link>
          <Link href="/chat" style={{ backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '15px', fontWeight: 'bold', padding: '8px 20px', borderRadius: '20px', textDecoration: 'none' }}>Talk to Photi</Link>
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
          {[0,1,2].map(i => <div key={i} style={{ width: '24px', height: '2px', backgroundColor: COLORS.gold }} />)}
        </button>
      </header>

      <div className="mobile-menu" style={{ display: 'none', flexDirection: 'column', backgroundColor: COLORS.darkGreen, padding: '16px 24px 24px', borderBottom: '1px solid rgba(181,135,58,0.2)', gap: '16px' }}>
        <Link href="/about" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Who is Photi?</Link>
        <Link href="/terpenes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Terpenes</Link>
        <Link href="/processes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>The Science</Link>
        <Link href="/deals" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Today&apos;s Deals</Link>
        <Link href="/chat" style={{ color: COLORS.green, backgroundColor: COLORS.gold, fontSize: '16px', fontWeight: 'bold', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }}>Talk to Photi</Link>
      </div>

      {/* Hero */}
      <section className="page-hero" style={{ padding: '64px 48px 48px', textAlign: 'center' }}>

        {/* Hero panoramic image */}
        <div style={{ maxWidth: '900px', margin: '0 auto 36px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 60px rgba(181,135,58,0.25)' }}>
          <img
            className="hero-image"
            src="/city/newbuffalo.jpg"
            alt="New Buffalo Michigan — Lake Michigan at golden hour"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Gateway to Michigan</p>
        <h1 style={{ color: COLORS.cream, fontSize: '52px', fontWeight: 'bold', lineHeight: '1.15', maxWidth: '700px', margin: '0 auto 16px' }}>
          Welcome to New Buffalo.
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '18px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 20px' }}>
          70 miles from Chicago. Lake Michigan sunsets. Sandy dunes, a working harbor, and Michigan&apos;s cannabis market right at the border. The weekend trip that becomes an annual tradition.
        </p>

        {/* Weather */}
        {weather && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(181,135,58,0.1)', border: '1px solid rgba(181,135,58,0.25)', borderRadius: '50px', padding: '8px 20px', marginBottom: '32px' }}>
            <span style={{ fontSize: '18px' }}>{weather.icon}</span>
            <span style={{ color: COLORS.gold, fontSize: '15px' }}>New Buffalo right now: {weather.temp} · {weather.condition}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: weather ? '0' : '32px' }}>
          <Link href="/chat" style={{ backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '17px', fontWeight: 'bold', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none' }}>
            Talk to Photi — Plan Your Day
          </Link>
          <a href="#dispensaries" style={{ backgroundColor: 'transparent', color: COLORS.gold, fontSize: '17px', fontWeight: 'bold', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', border: '2px solid rgba(181,135,58,0.5)' }}>
            See the Dispensaries
          </a>
        </div>
      </section>

      {/* Weekly Spotlight */}
      <section style={{ backgroundColor: COLORS.darkGreen, padding: '48px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px', textAlign: 'center' }}>{SPOTLIGHT.weekOf}</p>
          <div style={{ backgroundColor: 'rgba(181,135,58,0.08)', border: '1px solid rgba(181,135,58,0.25)', borderRadius: '12px', padding: '32px 36px' }}>
            <h3 style={{ color: COLORS.gold, fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{SPOTLIGHT.name}</h3>
            <p style={{ color: COLORS.cream, fontSize: '15px', fontStyle: 'italic', marginBottom: '12px', opacity: 0.85 }}>{SPOTLIGHT.tagline}</p>
            <p style={{ color: COLORS.sage, fontSize: '15px', lineHeight: '1.75', marginBottom: '16px' }}>{SPOTLIGHT.description}</p>
            <p style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.7 }}>{SPOTLIGHT.address}</p>
          </div>
        </div>
      </section>

      {/* Dispensaries */}
      <section id="dispensaries" className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Harbor Country Cannabis</p>
          <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', marginBottom: '12px' }}>Where to Shop</h2>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '680px' }}>
            New Buffalo sits at the gateway of Michigan&apos;s cannabis market. These are the dispensaries worth knowing — and what makes each one different.
          </p>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '36px' }}>
            {DISPENSARIES.map((d) => (
              <div key={d.name} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '24px', border: `2px solid rgba(181,135,58,0.3)`, boxShadow: '0 2px 16px rgba(181,135,58,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ color: COLORS.green, fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{d.name}</h3>
                  <span style={{ backgroundColor: 'rgba(181,135,58,0.1)', color: COLORS.gold, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(181,135,58,0.3)', whiteSpace: 'nowrap', marginLeft: '8px' }}>Featured</span>
                </div>
                <p style={{ color: COLORS.text, fontSize: '14px', lineHeight: '1.75', marginBottom: '16px' }}>{d.note}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#999', fontSize: '12px' }}>{d.address} · {d.hours}</span>
                  {d.url && <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.green, fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>Menu →</a>}
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: COLORS.text, fontSize: '14px', fontStyle: 'italic', opacity: 0.7, textAlign: 'center', marginBottom: '24px' }}>
            New Buffalo has many other dispensaries. Soon Photi will be connecting you to the best products across town that suits you.
          </p>
          <div style={{ textAlign: 'center', padding: '28px', backgroundColor: 'rgba(30,77,53,0.05)', borderRadius: '12px', border: '1px solid rgba(30,77,53,0.1)' }}>
            <p style={{ color: COLORS.green, fontSize: '16px', marginBottom: '8px' }}>
              Not sure which dispensary is right for what you need today?
            </p>
            <p style={{ color: COLORS.text, fontSize: '14px', marginBottom: '20px', opacity: 0.75 }}>
              Are you a dispensary that wants to be featured?{' '}
              <Link href="/featured" style={{ color: COLORS.green, fontWeight: 'bold', textDecoration: 'none', borderBottom: `1px solid ${COLORS.gold}` }}>
                Learn how it works →
              </Link>
            </p>
            <Link href="/chat" style={{ backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '16px', fontWeight: 'bold', padding: '12px 32px', borderRadius: '50px', textDecoration: 'none', display: 'inline-block' }}>
              Ask Photi
            </Link>
          </div>
        </div>
      </section>

      {/* Coffee */}
      <section id="coffee" className="content-section" style={{ padding: '64px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/coffee.jpg"
              alt="Coffee"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.3)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Start Your Morning</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Coffee Worth Finding</h2>
            </div>
          </div>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {COFFEE.map((c) => (
              <div key={c.name} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '24px', border: '1px solid rgba(181,135,58,0.15)' }}>
                <h3 style={{ color: COLORS.gold, fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{c.name}</h3>
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75', marginBottom: '12px' }}>{c.note}</p>
                <p style={{ color: COLORS.sage, fontSize: '12px', opacity: 0.65 }}>{c.address} · {c.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eat */}
      <section id="eat" className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/food.jpg"
              alt="Eat"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.2)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Eat Something Good</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Local Favorites</h2>
            </div>
          </div>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {EAT.map((e) => (
              <div key={e.name} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '24px', border: '1px solid rgba(30,77,53,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 style={{ color: COLORS.green, fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{e.name}</h3>
                <p style={{ color: COLORS.text, fontSize: '14px', lineHeight: '1.75', marginBottom: '12px' }}>{e.note}</p>
                <p style={{ color: '#888', fontSize: '12px' }}>{e.address} · {e.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section id="explore" className="content-section" style={{ padding: '64px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/explore.jpg"
              alt="Explore"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.3)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>While You&apos;re Here</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>More New Buffalo</h2>
            </div>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '640px' }}>
            The beach is the reason most people come. But Harbor Country has more going on than the shoreline. Here&apos;s what&apos;s worth your afternoon.
          </p>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {EXPLORE.map((e) => (
              <div key={e.name} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '24px', border: '1px solid rgba(181,135,58,0.15)' }}>
                <h3 style={{ color: COLORS.gold, fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{e.name}</h3>
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75', marginBottom: '12px' }}>{e.desc}</p>
                <p style={{ color: COLORS.sage, fontSize: '13px', fontStyle: 'italic', opacity: 0.75, borderLeft: '2px solid rgba(181,135,58,0.4)', paddingLeft: '12px' }}>{e.tip}</p>
                {e.url && <a href={e.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.gold, fontSize: '13px', textDecoration: 'none', display: 'block', marginTop: '12px' }}>Learn more →</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px' }}>
            <img
              className="section-patch"
              src="/monroe/events.jpg"
              alt="Events"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.2)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>What&apos;s Happening</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Events in New Buffalo</h2>
            </div>
          </div>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '28px' }}>
            New Buffalo runs events year-round — from summer beach festivals and the Harbor Country Art Festival to concerts at Four Winds Casino&apos;s Silver Creek Event Center. The summer calendar fills fast. Plan ahead.
          </p>
          <a href="https://swmichigan.org/plan-and-stay/towns/new-buffalo" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', backgroundColor: COLORS.green, color: COLORS.cream, fontSize: '15px', fontWeight: 'bold', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none' }}>
            See New Buffalo Events →
          </a>
        </div>
      </section>

      {/* Arts */}
      <section className="content-section" style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px' }}>
            <img
              className="section-patch"
              src="/monroe/arts.jpg"
              alt="Arts"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.3)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Culture &amp; Arts</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Arts in Harbor Country</h2>
            </div>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '28px' }}>
            Harbor Country has an emerging arts scene that surprises people. The New Buffalo Art Gallery and Courtyard Gallery on Whittaker Street showcase regional talent year-round. Journeyman Distillery — twenty minutes away in Three Oaks — hosts live music, art shows, and is worth a full afternoon. Four Winds Casino&apos;s Silver Creek Event Center brings national acts to the lakeshore all summer.
          </p>
          <a href="https://newbuffaloexplored.com/play/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', backgroundColor: 'transparent', color: COLORS.gold, fontSize: '15px', fontWeight: 'bold', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', border: `2px solid ${COLORS.gold}` }}>
            Explore Harbor Country →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: COLORS.green, padding: '64px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <img src="/photi-emblem.png" alt="Photi" width={80} height={80} style={{ marginBottom: '24px', borderRadius: '50%' }} />
          <h2 style={{ color: COLORS.gold, fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Ready to find what&apos;s right for today?</h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', marginBottom: '36px' }}>
            Talk to Photi before you walk in the door. The right product, the right dispensary, the right price — in one quick conversation.
          </p>
          <Link href="/chat" style={{ backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '18px', fontWeight: 'bold', padding: '16px 48px', borderRadius: '50px', textDecoration: 'none', display: 'inline-block' }}>
            Talk to Photi
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: COLORS.darkGreen, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/photi-emblem.png" alt="Photi" width={28} height={28} style={{ borderRadius: '50%' }} />
            <span style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents newbuffalodailydeals.com</span>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '13px' }}>Photi powered by MiQuest · hello@michigansdailydeals.com</p>
          <p style={{ color: COLORS.sage, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>For adults 21 and older. Please consume responsibly.</p>
        </div>
      </footer>
    </main>
  );
}
