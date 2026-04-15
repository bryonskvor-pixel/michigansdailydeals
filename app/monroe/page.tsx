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
    name: 'Quality Roots',
    address: '1121 S Monroe St',
    hours: '9am–10pm daily',
    url: 'https://getqualityroots.com/locations/monroe/',
    note: "Monroe's most trusted dispensary. Loyalty rewards, daily rotating deals, and staff that genuinely knows their product. Located on S Monroe St — easy to find, easy to love. The place Photi sends people first.",
  },
  {
    name: 'Joyology',
    address: 'Monroe, MI',
    hours: '9am–10pm daily',
    url: 'https://joyology.com/',
    note: "A Michigan original with deep roots in the state's cannabis story. Joyology brings real craft knowledge and a curated menu to Monroe. The kind of dispensary that earns regulars.",
  },
  {
    name: 'NAR Cannabis',
    address: 'Monroe, MI',
    hours: '9am–10pm daily',
    url: 'https://shopnarcannabis.com/pages/monroe-menu',
    note: "NAR runs a tight, quality-focused menu and a team that knows what's on it. Locals' pick for consistent quality and good value. Worth having in the rotation.",
  },
  {
    name: 'Lume Cannabis',
    address: 'Monroe, MI',
    hours: '9am–10pm daily',
    url: 'https://lume.com/',
    note: "Michigan's largest homegrown cannabis company. Lume controls their supply chain from seed to sale — which shows in the consistency. If you want to know exactly what you're getting, Lume delivers.",
  },
];

const COFFEE = [
  { name: 'Fresh Start CoffeeHouse', address: 'Just off I-75 Exit 11', hours: 'Early morning daily', note: "Voted best in Monroe. Nonprofit employing formerly incarcerated folks. Ron's Famous Biscuits & Gravy. Stuffed hashbrowns. Paula's Perfect Latte with pistachio, coconut, and cinnamon. Stop here first.", url: 'https://www.freshstartcoffee.house/' },
  { name: 'River Raisin Trading Post', address: '8 N Monroe St (Downtown)', hours: 'Mon–Sat from 7:30am', note: 'Riverfront patio. Canoe lighting fixtures. Locally sourced. Panini with rosemary garlic aioli. The most beautiful spot for a morning coffee in Monroe.', url: '' },
  { name: 'Nocturnal', address: '2 W Front St (Downtown)', hours: 'Wed–Sat from 3pm', note: 'People drive over an hour each way just to come here. Seasonal menu, emo throwbacks, magic coffee drinks. Evening only — save this for after.', url: '' },
  { name: 'Lotus Cafe', address: '602 N Monroe St', hours: 'Mon–Sat 7am, Sun 9am', note: '5.0 stars. Indian food alongside the coffee — chicken tikka masala and a mango lassi is an unexpected but perfect combination.', url: '' },
];

const EAT = [
  { name: 'Public House', address: '138 N Monroe St (Downtown)', hours: 'Wed–Sun from 8/9am', note: "The Monroe locals' pick. PB&J burger, fig and bacon flatbread, house-made chips. Dim lighting, upscale feel without the price. Closed Monday." },
  { name: 'Princess Grill', address: '15 Washington St (Downtown)', hours: 'Mon–Sat 11am–8/9pm', note: 'Family-owned Mediterranean. Chicken tikka masala, fresh shawarma, great sauces. The food is "prepared with love" per every review. Hidden gem.' },
  { name: 'The Quarry', address: '15625 Hull Rd', hours: 'Daily from 8–11am', note: 'Lobster and brie dip that gets mentioned in every review. Outdoor seating. Poutine fries. Good for a sit-down lunch after dispensary stops.' },
  { name: 'Mexico Lindo Taqueria', address: '543 N Telegraph Rd', hours: 'Daily 10am–7pm', note: 'New and already beloved. Fresh-made everything including the guac. Street tacos, tres leches, aguas frescas. Chicago expats approve.' },
];

const EXPLORE = [
  { name: 'Sterling State Park', desc: 'A mile of Lake Erie shoreline. Swimming, fishing, hiking, birdwatching. The perfect afternoon destination after your dispensary stops.', tip: 'Pair with a restful indica and find a bench by the water.', url: 'https://www2.dnr.state.mi.us/parksandtrails/Details.aspx?id=490&type=SPRK' },
  { name: 'River Raisin National Battlefield', desc: 'The only War of 1812 national battlefield in the country. Free. Genuinely moving. Interactive exhibits and ranger-led tours.', tip: 'More interesting than it sounds. One of the worst US military defeats of the era happened right here.', url: 'https://www.nps.gov/rira/' },
  { name: 'River Raisin Heritage Trail', desc: 'Scenic trail connecting Sterling State Park through downtown along the river. Great for walking or biking.', tip: 'Start downtown near the Trading Post, grab coffee, then walk the trail toward the battlefield.', url: '' },
  { name: 'Michigan Museum of Horror', desc: 'Weird, wonderful, and nobody expects it. Local legends, true crime artifacts, Michigan horror history. A conversation starter.', tip: 'Pairs well with something creative from the dispensary.', url: '' },
];

// Weekly spotlight — update this manually each week
const SPOTLIGHT = {
  name: 'River Raisin Trading Post',
  tagline: 'The riverfront coffee shop Monroe has been keeping to itself.',
  description: 'Tucked in a nearly 100-year-old building in downtown Monroe, the River Raisin Trading Post has a riverside patio, canoe lighting fixtures, and locally-sourced coffee that regulars describe as a hidden gem. The kind of place you stumble onto and then tell everyone about.',
  address: '8 N Monroe St, Monroe MI',
  url: '',
  weekOf: "This Week's Spotlight",
};

export default function MonroePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weather, setWeather] = useState<{ temp: string; condition: string; icon: string } | null>(null);

  useEffect(() => {
    fetch('https://wttr.in/Monroe,MI?format=j1')
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
          .two-col { grid-template-columns: 1fr !important; }
          .hero-image { width: 100% !important; height: 220px !important; border-radius: 12px !important; }
          .section-patch { width: 80px !important; height: 80px !important; }
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
            src="/city/monroe.jpg"
            alt="Monroe Michigan — Lake Erie at dawn"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Michigan starts here</p>
        <h1 style={{ color: COLORS.cream, fontSize: '52px', fontWeight: 'bold', lineHeight: '1.15', maxWidth: '700px', margin: '0 auto 16px' }}>
          Welcome to Monroe.
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '18px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 20px' }}>
          45 minutes from Toledo. 30 minutes from the Ohio border. Over 25 dispensaries. Great coffee, real food, Lake Erie on one side and War of 1812 history on the other.
        </p>

        {/* Weather */}
        {weather && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(181,135,58,0.1)', border: '1px solid rgba(181,135,58,0.25)', borderRadius: '50px', padding: '8px 20px', marginBottom: '32px' }}>
            <span style={{ fontSize: '18px' }}>{weather.icon}</span>
            <span style={{ color: COLORS.gold, fontSize: '15px' }}>Monroe right now: {weather.temp} · {weather.condition}</span>
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
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>25+ Dispensaries in Monroe</p>
          <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', marginBottom: '12px' }}>Where to Shop</h2>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '680px' }}>
            Monroe has more dispensaries per square mile than almost anywhere in Michigan. These are the ones worth knowing about — and what makes each one different.
          </p>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '36px' }}>
            {DISPENSARIES.map((d) => (
              <div key={d.name} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '24px', border: `2px solid rgba(181,135,58,0.3)`, boxShadow: '0 2px 16px rgba(181,135,58,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ color: COLORS.green, fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{d.name}</h3>
                  <span style={{ backgroundColor: 'rgba(181,135,58,0.1)', color: COLORS.gold, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(181,135,58,0.3)' }}>Featured</span>
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
            Monroe has 25+ dispensaries. Photi will connect directly to live deals across all of them soon.
          </p>
          <div style={{ textAlign: 'center', padding: '28px', backgroundColor: 'rgba(30,77,53,0.05)', borderRadius: '12px', border: '1px solid rgba(30,77,53,0.1)' }}>
            <p style={{ color: COLORS.green, fontSize: '16px', marginBottom: '16px' }}>
              Not sure which dispensary is right for what you need today?
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

          {/* Section header with patch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/coffee.jpg"
              alt="Coffee"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.3)' }}
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

          {/* Section header with patch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/food.jpg"
              alt="Eat"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.2)' }}
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

          {/* Section header with patch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/explore.jpg"
              alt="Explore"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.3)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>While You&apos;re Here</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>More Monroe</h2>
            </div>
          </div>

          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '640px' }}>
            Monroe has more going on than most people crossing the border realize. Here&apos;s what&apos;s worth your afternoon.
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

          {/* Section header with patch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px' }}>
            <img
              className="section-patch"
              src="/monroe/events.jpg"
              alt="Events"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.2)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>What&apos;s Happening</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Events in Monroe</h2>
            </div>
          </div>

          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '28px' }}>
            Monroe has more going on than you might expect — from the River Raisin Jazz Festival to the Monroe County Fair to live performances at the River Raisin Centre for the Arts.
          </p>
          <a href="https://www.exploremonroemi.com/events/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', backgroundColor: COLORS.green, color: COLORS.cream, fontSize: '15px', fontWeight: 'bold', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none' }}>
            See Monroe Events Calendar →
          </a>
        </div>
      </section>

      {/* Arts — separate section using arts patch */}
      <section className="content-section" style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Section header with patch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px' }}>
            <img
              className="section-patch"
              src="/monroe/arts.jpg"
              alt="Arts"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.3)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Culture &amp; Music</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Arts in Monroe</h2>
            </div>
          </div>

          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '28px' }}>
            The River Raisin Centre for the Arts hosts live music, theatre, and community events year-round. Monroe punches above its weight on culture — this is a town with real creative life in it.
          </p>
          <a href="https://www.rrcta.org/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', backgroundColor: 'transparent', color: COLORS.gold, fontSize: '15px', fontWeight: 'bold', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', border: `2px solid ${COLORS.gold}` }}>
            River Raisin Centre for the Arts →
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
            <span style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents monroesdailydeals.com</span>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '13px' }}>Photi powered by MiQuest · hello@michigansdailydeals.com</p>
          <p style={{ color: COLORS.sage, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>For adults 21 and older. Please consume responsibly.</p>
        </div>
      </footer>
    </main>
  );
}
