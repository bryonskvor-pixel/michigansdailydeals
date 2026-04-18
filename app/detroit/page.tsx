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

// SPOTLIGHT DISPENSARY — update weekly
const SPOTLIGHT = {
  name: 'High Club Cannabis',
  tagline: "Detroit's premium experience on Wyoming Ave — 4.9 stars and 2,700+ reviews don't lie.",
  description: "High Club brings an elevated experience to the Detroit market — curated selection, presentation that respects the product, and staff that actually take the conversation seriously. With nearly 3,000 customer reviews averaging 4.9 stars, High Club is the rare dispensary where the consensus is as loud as the claim. For the Detroit consumer who wants more than a transaction.",
  address: '14325 Wyoming Ave, Detroit, MI',
  hours: 'Open until 10 PM',
  phone: '(313) 397-2738',
  url: 'https://highclubcannabis.com/',
};

// FEATURED DISPENSARIES — 3 remaining after High Club promoted to Spotlight
const FEATURED_DISPENSARIES = [
  {
    name: 'Simply Loud',
    address: 'Detroit, MI',
    hours: '9am–10pm daily',
    url: 'https://simplyloud.com/',
    note: "Simply Loud lives up to the name — a bold, quality-forward menu and a team that knows what's on it. One of Detroit's standout independent dispensaries. The kind of place that earns a loyal local following fast.",
  },
  {
    name: 'Green Genie Cannabis',
    address: 'Detroit, MI',
    hours: '9am–10pm daily',
    url: 'https://greengeniecannabis.com/',
    note: "Green Genie has been part of Detroit's cannabis story since early days. Deep roots, strong menu, and the institutional knowledge that comes from years in a competitive market. A Detroit original worth knowing.",
  },
  {
    name: 'Leaf & Bud',
    address: 'Detroit, MI',
    hours: '9am–10pm daily',
    url: 'https://leafandbud.com/',
    note: "Leaf & Bud keeps it focused — quality product, fair prices, and a no-nonsense approach that Detroit appreciates. The menu leans into craft producers and the staff actually knows why. Worth having on your list.",
  },
];

// FEATURED BRANDS — 4 Michigan makers tuned to Detroit's sophisticated concentrate-forward market
const FEATURED_BRANDS = [
  {
    name: 'Cannalicious',
    description: "Michigan-born concentrate legend. Partnered with Trinity Cannabis for small-batch craft cultivation, Cannalicious has won Zalympix honors for their live rosin and built a statewide reputation that serious dabbers measure everything else against. A Detroit shelf anchor.",
    url: 'https://cannaliciouslabs.com',
    lookFor: [
      { product: 'Live Rosin 1g', category: 'Concentrate', note: 'Solventless, fresh-frozen, trichome-isolated. What rosin is supposed to taste like.' },
      { product: 'RSO Syringe', category: 'Concentrate', note: 'Broad-spectrum full-plant extract. Medicinal, potent, and the benchmark RSO in Michigan.' },
      { product: 'Live Resin Gummies', category: 'Edible', note: 'Nano-tech encapsulated full-spectrum oil. The edible that actually tastes like the plant it came from.' },
      { product: 'Live Rosin Disposable', category: 'Vape', note: 'Their solventless extract in a disposable. All the flavor, none of the setup.' },
    ],
  },
  {
    name: '710 Labs',
    description: "The national benchmark for solventless concentrate. Their water hash and Persy Rosin are what serious connoisseurs measure everything else against. In Detroit, they earn the premium shelf slot not by marketing — by product.",
    url: 'https://710labs.com/michigan',
    lookFor: [
      { product: 'Persy Water Hash 1g', category: 'Concentrate', note: "90-micron trichome heads, ice-and-water only. Old-world hash perfection." },
      { product: 'Persy Rosin Badder 1g', category: 'Concentrate', note: 'Single-origin, single-pressing, cold-cured. The top of the rosin pyramid.' },
      { product: 'First Press Live Rosin 1g', category: 'Concentrate', note: 'Full-spectrum live rosin from fresh-frozen flower. Entry point to the 710 experience.' },
      { product: 'Live Rosin Vape 1g', category: 'Vape', note: 'True solventless rosin in a cart. The discreet version of the dab.' },
    ],
  },
  {
    name: 'Element',
    description: "Michigan-made, no-compromise live concentrate. Element runs zero distillate, zero botanical terpenes, zero additives — 100% live concentrate sourced from Michigan's finest cultivators. Detroit's quiet favorite among purists, and the live rosin disposable that reviewers call the best in the state.",
    url: 'https://elementextractions.com',
    lookFor: [
      { product: 'Pure Live Resin Cart 0.5g', category: 'Vape', note: "100% live concentrate — no distillate, no additives, no botanical cuts." },
      { product: 'Live Rosin Disposable 0.5g', category: 'Vape', note: 'The best live rosin disposable in Michigan according to reviewers who tried them all.' },
      { product: 'Live Infused Joint', category: 'Pre-Roll', note: 'Award-winning. 50% top-shelf flower, 50% live concentrate, 40%+ total THC.' },
      { product: 'Live THCA 1g', category: 'Concentrate', note: 'Isolated from their live resin, fine crystalline, mid-to-high 90s THCA. The purist option.' },
    ],
  },
  {
    name: "Mary's Medicinals",
    description: "Award-winning transdermal patches, tinctures, and topicals — the brand that brought precision-dose cannabis delivery to the category. Their Relief 1:1 patch won the 2023 Michigan High Times Cup. The wellness anchor for Detroit's most discerning buyer.",
    url: 'https://marysmedicinals.com',
    lookFor: [
      { product: 'Relief 1:1 Transdermal Patch', category: 'Topical', note: '2023 Michigan High Times Cup winner. 8–12 hour systemic relief, discreet, cuttable for microdosing.' },
      { product: 'Indica Transdermal Patch', category: 'Topical', note: 'Evening relaxation in a patch. For chronic discomfort or sleep support.' },
      { product: 'CBN Transdermal Patch', category: 'Topical', note: 'Sleep-focused cannabinoid delivered gradually through the night.' },
      { product: 'THC Tincture', category: 'Tincture', note: 'Full-spectrum, lemon-lime flavor, precise sublingual dosing. The calm-and-measured option.' },
    ],
  },
];

const NEIGHBORHOODS = [
  {
    name: 'Downtown',
    desc: "The energy center. Campus Martius, the Detroit Riverwalk, Comerica Park, Little Caesars Arena, and Ford Field are all here or adjacent. Art Deco skyscrapers, the Guardian Building, the Spirit of Detroit. Start here on any first visit.",
  },
  {
    name: 'Corktown',
    desc: "Detroit's oldest neighborhood and its most creative right now. Michigan Central Station — a century-old train depot — reopened in 2024 as a Ford innovation campus. Victorian homes, craft cocktail bars, folk restaurants, and Third Man Records pressing plant.",
  },
  {
    name: 'Midtown',
    desc: "The cultural heart. Detroit Institute of Arts, the Motown Museum, Charles H. Wright Museum of African American History. Wayne State University energy. Trendy cafés and galleries on every block. The neighborhood that surprises people most.",
  },
  {
    name: 'Eastern Market',
    desc: "America's largest historic public market. Saturday mornings are a Detroit institution — fresh produce, flowers, vendors, murals, and energy that nowhere else in the city matches. Come hungry. Leave with something you didn't plan to buy.",
  },
];

const MUSIC = [
  {
    name: 'Third Man Records — Cass Corridor',
    address: '441 W Canfield St',
    note: "Jack White was raised in Southwest Detroit. He launched Third Man Records here in 2001. The Cass Corridor location has a record store, novelties lounge, in-store performance stage, and a working vinyl pressing plant you can watch through viewing windows. You can record a 2.5-minute song on the spot and leave with a 6-inch vinyl record. This is one of the coolest things you can do in any American city.",
    url: 'https://thirdmanrecords.com/pages/detroit-store',
  },
  {
    name: 'Motown Museum',
    address: '2648 W Grand Blvd',
    note: "Hitsville U.S.A. — the house where Berry Gordy built Motown Records and where Stevie Wonder, Marvin Gaye, Diana Ross, and The Temptations recorded some of the most important music in American history. Studio A is preserved exactly as it was. This is a pilgrimage.",
    url: 'https://www.motownmuseum.org/',
  },
  {
    name: 'The Fox Theatre',
    address: '2211 Woodward Ave',
    note: "One of the most beautifully preserved theaters in America. Opened in 1928, restored to its full opulent glory. If anything worth seeing is playing here while you're in Detroit, see it. The building alone is worth the ticket.",
    url: 'https://www.313presents.com/venues/fox-theatre',
  },
  {
    name: 'Saint Andrew\'s Hall',
    address: '431 E Congress St',
    note: "The basement — The Shelter — is where Eminem famously choked during one of his first performances. The main hall has hosted everyone worth hosting for thirty years. Detroit's most storied small venue. Check the calendar before you come.",
    url: 'https://www.saintandrewsdetroit.com/',
  },
  {
    name: 'The Fillmore Detroit',
    address: '2115 Woodward Ave',
    note: "Part of the legendary Fillmore family, housed in a stunning 1925 building. Mid-size national acts, impeccable sound, one of the best concert experiences in the Midwest. Right on Woodward Avenue with everything else.",
    url: 'https://www.313presents.com/venues/the-fillmore-detroit',
  },
];

const FOOD = [
  {
    name: "Lafayette Coney Island",
    address: '118 W Lafayette Blvd (Downtown)',
    hours: '24 hours',
    note: "Detroit's most argued-about institution. A Coney dog is a natural-casing hot dog in a steamed bun, topped with chili sauce, yellow mustard, and raw onion. Lafayette versus American Coney Island next door has been a Detroit debate for a century. Go to Lafayette. Order two.",
  },
  {
    name: "Buddy's Pizza",
    address: 'Multiple Detroit locations',
    hours: 'Daily',
    note: "Buddy's invented Detroit-style pizza in 1946. Square pan, crispy caramelized cheese crust, sauce on top. Everything called Detroit-style pizza in the rest of the country is trying to be this. The original is on Conant Street. Get the pepperoni.",
  },
  {
    name: 'Eastern Market — Saturday',
    address: '2934 Russell St',
    hours: 'Saturdays 6am–4pm',
    note: "America's largest historic public market running since 1891. Fresh produce, flowers, local vendors, street food, craft beer from Eastern Market Brewing. The murals on the surrounding buildings are some of the best public art in the city. A Detroit Saturday morning ritual.",
  },
  {
    name: 'Leila',
    address: 'Downtown Detroit',
    hours: 'Dinner daily',
    note: "Contemporary Lebanese cuisine that has become one of Detroit's most celebrated dining destinations. The mezze spreads, the lamb dishes, the atmosphere. Reservations recommended. The kind of restaurant that makes you realize Detroit's food scene is genuinely serious.",
  },
];

const EXPLORE = [
  {
    name: 'Henry Ford Museum of American Innovation',
    address: '20900 Oakwood Blvd, Dearborn',
    desc: "20 minutes from downtown. One of the greatest museums in America — the Rosa Parks bus, the Lincoln Continental JFK was shot in, the Wright Brothers' bicycle shop, Edison's Menlo Park laboratory. You need a full day. Plan for it.",
    tip: "Greenfield Village next door is a separate ticket and worth it — 80 historic structures including Henry Ford's birthplace and the house where the Wright Brothers grew up.",
    url: 'https://www.thehenryford.org/',
  },
  {
    name: 'Detroit Riverwalk',
    desc: "3.5 miles of waterfront path along the Detroit River with views of Windsor, Canada directly across. One of the best urban waterfront walks in the Midwest. Rent a bike, find a bench, watch the freighters pass. Free and always worth it.",
    tip: "The view of the Ambassador Bridge from the Riverwalk at dusk is genuinely stunning.",
    url: 'https://www.detroitriverfront.org/',
  },
  {
    name: 'Detroit Institute of Arts',
    address: '5200 Woodward Ave (Midtown)',
    desc: "One of the top six art museums in the country. Diego Rivera's Detroit Industry Murals alone are worth the visit — 27 panels painted in 1932-33 depicting Ford's River Rouge plant. The collection spans 5,000 years. Free for Wayne, Oakland, and Macomb County residents.",
    tip: "Spend an hour minimum with the Rivera murals. They're in the central courtyard and they're extraordinary.",
    url: 'https://www.dia.org/',
  },
  {
    name: 'Michigan Central Station — Corktown',
    address: '2001 15th St (Corktown)',
    desc: "The legendary train station that sat abandoned for thirty years reopened in 2024 as a Ford Motor Company innovation campus. The restoration is stunning. Shops, cafés, and events in one of Detroit's most architecturally significant buildings.",
    tip: "Walk the full building. The main hall restoration is breathtaking — it rivals Grand Central.",
    url: 'https://www.michigancentral.com/',
  },
];

const SPORTS = [
  { name: 'Detroit Tigers', venue: 'Comerica Park', note: 'Baseball downtown. One of the most beautiful ballparks in the AL. The giant tiger sculptures and Ferris wheel in center field. Summer nights here are a Detroit institution.', url: 'https://www.mlb.com/tigers' },
  { name: 'Detroit Lions', venue: 'Ford Field', note: "NFL football in an indoor stadium connected to a historic warehouse. The Lions are relevant again and the city knows it. Game day energy in Detroit is real.", url: 'https://www.detroitlions.com/' },
  { name: 'Detroit Red Wings', venue: 'Little Caesars Arena', note: "Hockey in Hockeytown. The Red Wings have one of the most passionate fanbases in professional sports. LCA is a world-class arena shared with the Pistons. A Red Wings game is a Detroit rite of passage.", url: 'https://www.nhl.com/redwings' },
  { name: 'Detroit Pistons', venue: 'Little Caesars Arena', note: "NBA basketball sharing Little Caesars Arena with the Wings. The Bad Boys legacy lives here. Check the schedule — a Pistons game is a good time and tickets are accessible.", url: 'https://www.nba.com/pistons' },
];

export default function DetroitPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weather, setWeather] = useState<{ temp: string; condition: string; icon: string } | null>(null);

  useEffect(() => {
    fetch('https://wttr.in/Detroit,MI?format=j1')
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
          .page-hero h1 { font-size: 32px !important; }
          .content-section { padding: 40px 24px !important; }
          .content-section h2 { font-size: 26px !important; }
          .card-grid { grid-template-columns: 1fr !important; }
          .hero-image { height: 220px !important; }
          .section-patch { width: 100px !important; height: 100px !important; }
          .neighborhood-grid { grid-template-columns: 1fr !important; }
          .sports-grid { grid-template-columns: 1fr !important; }
          .brand-card { padding: 24px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Header — v2 unified nav */}
      <header className="header-outer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', borderBottom: '1px solid rgba(181,135,58,0.15)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/photi-emblem.png" alt="Photi" width={40} height={40} style={{ borderRadius: '50%' }} />
          <span style={{ color: COLORS.gold, fontSize: '20px', fontWeight: 'bold' }}>MiQuest</span>
        </Link>
        <nav className="desktop-nav" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <Link href="/about" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Who is Photi?</Link>
          <Link href="/cities" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Cities</Link>
          <Link href="/dispensaries" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Dispensaries</Link>
          <Link href="/terpenes" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Terpenes</Link>
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
        <Link href="/dispensaries" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Dispensaries</Link>
        <Link href="/terpenes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Terpenes</Link>
        <Link href="/chat" style={{ color: COLORS.green, backgroundColor: COLORS.gold, fontSize: '16px', fontWeight: 'bold', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }}>Talk to Photi</Link>
      </div>

      {/* Hero */}
      <section className="page-hero" style={{ padding: '64px 48px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto 36px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 60px rgba(181,135,58,0.25)' }}>
          <img
            className="hero-image"
            src="/city/detroit.jpg"
            alt="Detroit Michigan — skyline from the river"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>The Motor City</p>
        <h1 style={{ color: COLORS.cream, fontSize: '52px', fontWeight: 'bold', lineHeight: '1.15', maxWidth: '760px', margin: '0 auto 16px' }}>
          Welcome to Detroit.
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '18px', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 20px' }}>
          Birthplace of Motown. Home of techno. The city that built the American automobile and never stopped creating. Detroit doesn&apos;t need to be discovered — it needs to be experienced.
        </p>

        {weather && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(181,135,58,0.1)', border: '1px solid rgba(181,135,58,0.25)', borderRadius: '50px', padding: '8px 20px', marginBottom: '32px' }}>
            <span style={{ fontSize: '18px' }}>{weather.icon}</span>
            <span style={{ color: COLORS.gold, fontSize: '15px' }}>Detroit right now: {weather.temp} · {weather.condition}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: weather ? '0' : '32px' }}>
          <Link href="/chat" style={{ backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '17px', fontWeight: 'bold', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none' }}>
            Talk to Photi — Plan Your Day
          </Link>
          <a href="#spotlight" style={{ backgroundColor: 'transparent', color: COLORS.gold, fontSize: '17px', fontWeight: 'bold', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', border: '2px solid rgba(181,135,58,0.5)' }}>
            See the Dispensaries
          </a>
        </div>
      </section>

      {/* SECTION 1: This Week's Spotlight Dispensary */}
      <section id="spotlight" className="content-section" style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/patches/spotlight.png"
              alt="Spotlight patch"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 24px rgba(181,135,58,0.4)', marginBottom: '16px' }}
            />
            <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px', textAlign: 'center' }}>This Week&apos;s Spotlight Dispensary</p>
            <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0, textAlign: 'center' }}>Featured Pick of the Week</h2>
          </div>

          <div style={{ backgroundColor: 'rgba(181,135,58,0.08)', border: '1px solid rgba(181,135,58,0.3)', borderRadius: '14px', padding: '36px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '16px', flexWrap: 'wrap' }}>
              <h3 style={{ color: COLORS.gold, fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{SPOTLIGHT.name}</h3>
              <span style={{ backgroundColor: 'rgba(181,135,58,0.15)', color: COLORS.gold, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(181,135,58,0.4)', whiteSpace: 'nowrap' }}>Spotlight</span>
            </div>
            <p style={{ color: COLORS.cream, fontSize: '16px', fontStyle: 'italic', marginBottom: '18px', opacity: 0.9 }}>{SPOTLIGHT.tagline}</p>
            <p style={{ color: COLORS.sage, fontSize: '15px', lineHeight: '1.75', marginBottom: '22px' }}>{SPOTLIGHT.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(181,135,58,0.15)' }}>
              <span style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.8 }}>📍 {SPOTLIGHT.address}</span>
              <span style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.8 }}>🕘 {SPOTLIGHT.hours}</span>
              <span style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.8 }}>📞 {SPOTLIGHT.phone}</span>
            </div>
            <a href={SPOTLIGHT.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '15px', fontWeight: 'bold', padding: '12px 32px', borderRadius: '50px', textDecoration: 'none' }}>
              See the Menu →
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: Featured Dispensaries */}
      <section id="dispensaries" className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/patches/dispensary.png"
              alt="Dispensary patch"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.25)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Detroit Cannabis</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Featured Dispensaries</h2>
            </div>
          </div>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '680px' }}>
            Detroit has one of Michigan&apos;s most competitive cannabis markets. These dispensaries represent the range and quality the city has to offer.
          </p>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '36px' }}>
            {FEATURED_DISPENSARIES.map((d) => (
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
            Detroit has many more dispensaries across its neighborhoods.{' '}
            <Link href="/dispensaries/detroit" style={{ color: COLORS.green, fontWeight: 'bold', textDecoration: 'none', borderBottom: `1px solid ${COLORS.gold}` }}>
              See the full Detroit dispensary directory →
            </Link>
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

      {/* SECTION 3: Featured Brands (Makers) */}
      <section id="brands" className="content-section" style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/patches/makers.png"
              alt="Makers patch"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 24px rgba(181,135,58,0.4)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>This Week&apos;s Brands</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Featured Makers</h2>
            </div>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '720px' }}>
            Detroit has the most sophisticated cannabis buyer in Michigan — and the brand shelf reflects it. These are four Michigan makers whose products deserve a place on your list this week. Craft concentrate at the top, precision wellness at the side, and the live-only purists in between.
          </p>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {FEATURED_BRANDS.map((b) => (
              <div key={b.name} className="brand-card" style={{ backgroundColor: 'rgba(181,135,58,0.07)', borderRadius: '12px', padding: '28px', border: '1px solid rgba(181,135,58,0.25)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
                  <h3 style={{ color: COLORS.gold, fontSize: '22px', fontWeight: 'bold', margin: 0 }}>{b.name}</h3>
                  <span style={{ backgroundColor: 'rgba(181,135,58,0.15)', color: COLORS.gold, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(181,135,58,0.35)', whiteSpace: 'nowrap' }}>Featured</span>
                </div>
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75', marginBottom: '20px' }}>{b.description}</p>

                <p style={{ color: COLORS.gold, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.85 }}>Look For</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {b.lookFor.map((p) => (
                    <div key={p.product} style={{ borderLeft: `2px solid ${COLORS.gold}`, paddingLeft: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '3px' }}>
                        <span style={{ color: COLORS.cream, fontSize: '14px', fontWeight: 'bold' }}>{p.product}</span>
                        <span style={{ color: COLORS.sage, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.7, whiteSpace: 'nowrap' }}>{p.category}</span>
                      </div>
                      <p style={{ color: COLORS.sage, fontSize: '13px', lineHeight: '1.6', margin: 0, opacity: 0.85 }}>{p.note}</p>
                    </div>
                  ))}
                </div>
                {b.url && <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.gold, fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>Visit {b.name} →</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section style={{ backgroundColor: COLORS.green, padding: '64px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>Know the City</p>
          <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>Detroit by Neighborhood</h2>
          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '620px', margin: '0 auto 36px', textAlign: 'center' }}>
            Detroit is a collection of distinct neighborhoods each with their own energy. Here&apos;s how to orient yourself.
          </p>
          <div className="neighborhood-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {NEIGHBORHOODS.map((n) => (
              <div key={n.name} style={{ backgroundColor: 'rgba(181,135,58,0.07)', borderRadius: '10px', padding: '24px', border: '1px solid rgba(181,135,58,0.2)' }}>
                <h3 style={{ color: COLORS.gold, fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{n.name}</h3>
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75', margin: 0 }}>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music */}
      <section id="music" className="content-section" style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
            <img
              className="section-patch"
              src="/monroe/music.jpg"
              alt="The Motor City"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 24px rgba(181,135,58,0.4)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Motown. Techno. Rock. The whole story.</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>The Sound of Detroit</h2>
            </div>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '720px' }}>
            No American city has contributed more to music per square mile than Detroit. Motown. Techno. Punk. Garage rock. Hip-hop. The White Stripes recorded in a house here. Eminem grew up here. Berry Gordy built an empire here. The music is not background — it is the city.
          </p>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {MUSIC.map((m) => (
              <div key={m.name} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '24px', border: '1px solid rgba(181,135,58,0.2)' }}>
                <h3 style={{ color: COLORS.gold, fontSize: '17px', fontWeight: 'bold', marginBottom: '6px' }}>{m.name}</h3>
                <p style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.65, marginBottom: '10px' }}>{m.address}</p>
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75', marginBottom: '14px' }}>{m.note}</p>
                {m.url && <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.gold, fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>Visit →</a>}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', backgroundColor: 'rgba(181,135,58,0.08)', border: '1px solid rgba(181,135,58,0.3)', borderRadius: '12px', padding: '28px 32px' }}>
            <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>Photi&apos;s Pick</p>
            <p style={{ color: COLORS.cream, fontSize: '17px', lineHeight: '1.8', margin: 0 }}>
              If you do one thing in Detroit that has nothing to do with cannabis — go to Third Man Records on Canfield Street. Watch records being pressed through the viewing window. Record your own 6-inch vinyl on the spot. Buy something you&apos;ve never heard of. Jack White built something genuinely extraordinary here and it is open to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Food */}
      <section id="food" className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/food.jpg"
              alt="Eat"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.2)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Eat Detroit</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>The Food You Came For</h2>
            </div>
          </div>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {FOOD.map((f) => (
              <div key={f.name} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '24px', border: '1px solid rgba(30,77,53,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 style={{ color: COLORS.green, fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>{f.name}</h3>
                <p style={{ color: '#999', fontSize: '12px', marginBottom: '10px' }}>{f.address} · {f.hours}</p>
                <p style={{ color: COLORS.text, fontSize: '14px', lineHeight: '1.75' }}>{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section id="explore" className="content-section" style={{ backgroundColor: COLORS.green, padding: '64px 48px', scrollMarginTop: '80px' }}>
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
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Detroit Worth Seeing</h2>
            </div>
          </div>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {EXPLORE.map((e) => (
              <div key={e.name} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '24px', border: '1px solid rgba(181,135,58,0.15)' }}>
                <h3 style={{ color: COLORS.gold, fontSize: '17px', fontWeight: 'bold', marginBottom: '6px' }}>{e.name}</h3>
                {e.address && <p style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.65, marginBottom: '10px' }}>{e.address}</p>}
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75', marginBottom: '12px' }}>{e.desc}</p>
                <p style={{ color: COLORS.sage, fontSize: '13px', fontStyle: 'italic', opacity: 0.75, borderLeft: '2px solid rgba(181,135,58,0.4)', paddingLeft: '12px', marginBottom: '12px' }}>{e.tip}</p>
                {e.url && <a href={e.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.gold, fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>Learn more →</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports */}
      <section className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
            <img
              className="section-patch"
              src="/monroe/events.jpg"
              alt="Sports"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.2)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Before the Game</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Four Teams. One City.</h2>
            </div>
          </div>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '680px' }}>
            Detroit is one of a handful of American cities with all four major professional sports teams. Comerica Park, Ford Field, and Little Caesars Arena are all downtown or adjacent — walkable from each other. If there&apos;s a game while you&apos;re here, go. Talk to Photi first about what to bring.
          </p>
          <div className="sports-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {SPORTS.map((s) => (
              <div key={s.name} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '24px', border: '1px solid rgba(30,77,53,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h3 style={{ color: COLORS.green, fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{s.name}</h3>
                  <span style={{ color: COLORS.gold, fontSize: '12px', opacity: 0.8 }}>{s.venue}</span>
                </div>
                <p style={{ color: COLORS.text, fontSize: '14px', lineHeight: '1.75', marginBottom: '12px' }}>{s.note}</p>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.green, fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>Schedule →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee */}
      <section className="content-section" style={{ backgroundColor: COLORS.green, padding: '64px 48px' }}>
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
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Detroit Coffee</h2>
            </div>
          </div>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {[
              { name: 'Café d\'Mongos Speakeasy', address: 'Downtown Detroit', note: "Old Detroit through vintage decor, classic cocktails, and occasional live piano. The laid-back blues ambiance is something you won't find in tourism brochures. A genuine local institution that also does exceptional coffee." },
              { name: 'Folk', address: 'Michigan Ave, Corktown', note: "A Corktown anchor on Michigan Avenue. Excellent coffee, seasonal food, the kind of warm neighborhood café that makes you understand why people moved to Corktown. Right around the corner from Third Man Records." },
              { name: 'Anthology Coffee', address: 'Midtown Detroit', note: "Serious third-wave coffee in Midtown. Single-origin, carefully sourced, beautifully made. The kind of place that takes the craft as seriously as you take yours. A fifteen-minute walk from the DIA." },
              { name: 'Great Lakes Coffee', address: 'Midtown Detroit', note: "A Detroit institution with deep roots in the Midtown community. Multiple locations, consistently excellent, the coffee shop that anchors countless Detroit mornings. Reliable, warm, and genuinely good." },
            ].map((c) => (
              <div key={c.name} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '24px', border: '1px solid rgba(181,135,58,0.15)' }}>
                <h3 style={{ color: COLORS.gold, fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>{c.name}</h3>
                <p style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.65, marginBottom: '10px' }}>{c.address}</p>
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75' }}>{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <img src="/photi-emblem.png" alt="Photi" width={80} height={80} style={{ marginBottom: '24px', borderRadius: '50%' }} />
          <h2 style={{ color: COLORS.gold, fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Ready to find what&apos;s right for Detroit today?</h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', marginBottom: '36px' }}>
            Talk to Photi before you walk in the door. The right product, the right dispensary, the right headspace for whatever Detroit has planned for you tonight.
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
            <span style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents detroitdailydeals.com</span>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '13px' }}>Photi powered by MiQuest · hello@michigansdailydeals.com</p>
          <p style={{ color: COLORS.sage, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>For adults 21 and older. Please consume responsibly.</p>
        </div>
      </footer>
    </main>
  );
}
