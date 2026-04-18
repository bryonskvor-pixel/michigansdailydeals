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

// SPOTLIGHT — Lume Cannabis Co.
const SPOTLIGHT = {
  name: 'Lume Cannabis Co.',
  tagline: "Michigan's largest homegrown cannabis company — and Traverse City's premium experience from seed to shelf.",
  description: "Lume is vertically integrated, which is a fancy way of saying they grow, process, and sell their own cannabis — and it shows in the consistency. Their Traverse City downtown location on West Front Street is 5.0 stars across 390+ reviews. The Munson Avenue location, close to Cherry Capital Airport, makes it easy for visitors to stop before heading north. Their Gold Label Live Rosin line is among the best solventless you'll find anywhere in the state, and their proprietary Jenny Kush strain regularly tests above 30% THC. The upscale, educational atmosphere fits Traverse City perfectly.",
  address: '401 W Front St, Traverse City, MI 49684 · Second location on Munson Ave',
  hours: '9am–9pm daily · Sunday 10am–8pm',
  phone: '(231) 221-0048',
  url: 'https://www.lume.com/stores/lume-traverse-city-dispensary',
};

// FEATURED DISPENSARIES — the 3 you specified, each representing a different TC customer
const FEATURED_DISPENSARIES = [
  {
    name: 'Olswell Cannabis Co.',
    address: '728 E Front St, Traverse City',
    hours: '10am–9pm daily',
    url: 'https://olswell.com/stores/traverse-city/',
    note: "Olswell is downtown TC's luxury cannabis boutique — a short walk from the Delamar and Hotel Indigo, steps from Grand Traverse Bay and the Boardman River. They specialize in connoisseur-grade products like RKIVE Reserve, The Limit, and PLAY. As they put it themselves: they don't sell mids. Hand-selected for the TC palate. Award-winning daily deals include $20 ounces and $20 rosin/5G.",
  },
  {
    name: 'Boss Leaf Cannabis Co.',
    address: '314 Munson Ave, Traverse City',
    hours: '8am–10pm daily',
    url: 'https://www.bossleaftc.com/',
    note: "Boss Leaf runs a deli-style menu concept — the customer is treated as the boss of their own cannabis experience. Exclusive, flavor-forward flower marketed as the 'Purest Flower' on the market. Open at 8am, which means they catch the Traverse City early-riser crowd before the wine trail opens. A strong flower-forward complement to the concentrate-heavy Olswell.",
  },
  {
    name: 'Puff Cannabis Company',
    address: '1226 S Garfield Ave, Traverse City',
    hours: '9am–9pm daily',
    url: 'https://www.shoppuff.com/stores/traverse-city/',
    note: "Puff is Michigan's value-forward dispensary chain with 9 locations statewide — and their Traverse City spot has earned 4.9 stars across 788 reviews. Price-match guarantee, daily deals, first-time customer perks, and the original home of Platinum Vape. For the customer who wants quality without paying premium pricing — which is a lot of TC visitors.",
  },
];

// FEATURED BRANDS — the 4 Michigan makers for the sophisticated TC buyer
const FEATURED_BRANDS = [
  {
    name: 'Lume',
    description: "Vertically integrated. Lume grows their own Michigan cannabis, extracts their own concentrates, bottles their own vapes, and sells them all exclusively through Lume dispensaries. Their Gold Label Live Rosin line is the brand's crown jewel and deserves the shelf space it gets. Jenny Kush is their flagship proprietary strain. A Michigan cannabis story told vertically.",
    url: 'https://www.lume.com/',
    lookFor: [
      { product: 'Gold Label Live Rosin 1g', category: 'Concentrate', note: 'Solventless, fresh-frozen, small-batch. The top of the Lume house — their own concentrate at its peak.' },
      { product: 'Jenny Kush 3.5g Flower', category: 'Flower', note: 'Proprietary Lume strain regularly testing 30%+ THC. Sativa-dominant with citrus and diesel notes. A TC favorite.' },
      { product: 'Rip Live Rosin Pods', category: 'Vape', note: 'Live rosin pod system in Lume\'s proprietary hardware. Solventless concentrate in convenient pod form.' },
      { product: 'Bubble Hash Infused Pre-Rolls', category: 'Pre-Roll', note: 'Premium flower infused with their own bubble hash. Clean-burning, high-potency, hand-crafted.' },
    ],
  },
  {
    name: '710 Labs',
    description: "The national benchmark for solventless concentrate. Their Persy Water Hash and Persy Rosin are what serious connoisseurs measure everything else against. In Traverse City, where the visitor often has tried the best of Colorado and California, 710 Labs is the brand that says Michigan isn't playing catch-up.",
    url: 'https://710labs.com/michigan',
    lookFor: [
      { product: 'Persy Water Hash 1g', category: 'Concentrate', note: "90-micron trichome heads, ice-and-water only. Old-world hash perfection." },
      { product: 'Persy Rosin Badder 1g', category: 'Concentrate', note: 'Single-origin, single-pressing, cold-cured. The top of the rosin pyramid.' },
      { product: 'First Press Live Rosin 1g', category: 'Concentrate', note: 'Full-spectrum live rosin from fresh-frozen flower. Entry point to the 710 experience.' },
      { product: 'Live Rosin Vape 1g', category: 'Vape', note: 'True solventless rosin in a cart. The discreet version of the dab.' },
    ],
  },
  {
    name: 'Pro Gro',
    description: "Founded in Lansing by Sam Usman Jr., Pro Gro is one of Michigan's most established craft cultivators — 15+ years in the game, now growing over 10,000 plants in their Martin Luther King Jr. Boulevard facility. Multiple High Times Cannabis Cup wins. Consistently ranked 4th-5th in Michigan flower statewide. The Michigan flower story at the top of the pyramid.",
    url: 'https://progrocannabis.com/',
    lookFor: [
      { product: 'Blue Nerdz 3.5g Flower', category: 'Flower', note: "Pro Gro's most widely-carried strain — found in 16+ Michigan dispensaries. Sweet candy-forward terpenes, balanced effects." },
      { product: 'Garlic Breath 3.5g Flower', category: 'Flower', note: "High Times Cannabis Cup winner. Pungent, heavy-indica-leaning, savory aroma. A cult favorite." },
      { product: 'Lunar Lemon 1g Pre-Roll', category: 'Pre-Roll', note: "Award-winning sativa from Archive Seed Bank genetics. Lemon-forward, uplifting, celebratory." },
      { product: 'Ice Cream Cake 3.5g Flower', category: 'Flower', note: "A Michigan bestseller. Creamy, sweet, sedating. The strain for the end of a long TC day." },
    ],
  },
  {
    name: 'Legit Labs',
    description: "Michigan-native concentrate processor crafting cartridges entirely from cannabis-derived terpenes — zero botanicals, zero additives. The Caramel Apple Gelato Cured Resin cart was the #1 selling vape in Michigan in January 2026. A rising Michigan brand for the TC buyer who wants purity without the premium price of 710 Labs.",
    url: 'https://www.legitlabs.com/',
    lookFor: [
      { product: 'Caramel Apple Gelato Cured Resin Cart 1g', category: 'Vape', note: "Michigan's #1 selling vape pen product in January 2026. Sweet, dessert-forward, balanced." },
      { product: 'Mac #1 Live Resin Cart 1g', category: 'Vape', note: "Full-spectrum live resin from fresh-frozen flower. Bold terpene profile, true-to-plant flavor." },
      { product: 'Blue Live Resin Disposable 1g', category: 'Vape', note: 'Post-less, no-maintenance disposable for the connoisseur. Loud flavor, balanced effects.' },
      { product: 'Terp Sugar 1g', category: 'Concentrate', note: 'Crystalline structure with heavy terpene content. For the dabber who wants aroma as much as effect.' },
    ],
  },
];

const WINE = [
  {
    name: 'Chateau Grand Traverse',
    address: 'Old Mission Peninsula',
    note: "The winery that put Michigan on the wine map. Riesling grown on Old Mission Peninsula with views of East and West Grand Traverse Bay from both sides. The tasting room overlooks the vineyard. A must-visit for anyone serious about understanding what Northern Michigan grows.",
    url: 'https://www.cgtwines.com/',
  },
  {
    name: 'Black Star Farms',
    address: 'Leelanau Peninsula',
    note: "A full agritourism destination — winery, distillery, inn, and working farm on the Leelanau Peninsula. Family-friendly, live music on weekends, animals on the property. The sparkling wines are exceptional. Budget a full afternoon and plan to stay for dinner.",
    url: 'https://www.blackstarfarms.com/',
  },
  {
    name: 'Chateau Chantal',
    address: 'Old Mission Peninsula',
    note: "Perched on the ridge of Old Mission Peninsula with 360-degree water views of both Grand Traverse bays. The Pinot Noir is worth knowing. The bed and breakfast upstairs means you can spend the night in the vineyard. One of the most beautiful properties in Michigan.",
    url: 'https://www.chateauchantal.com/',
  },
  {
    name: 'Left Foot Charley',
    address: 'Downtown Traverse City',
    note: "The only winery and cidery located in downtown TC — inside the historic asylum building at Grand Traverse Commons. The ciders are celebrated nationally. Cinnamon Girl and the dry farmhouse ciders are the ones people talk about. No reservation needed, walk right in.",
    url: 'https://www.leftfootcharley.com/',
  },
];

const HIKES = [
  {
    name: 'Empire Bluff Trail',
    level: 'Easy',
    distance: '1.5 miles round trip',
    time: '40–45 minutes',
    desc: "The best introduction to Sleeping Bear. A well-marked dirt trail through maple forest that opens suddenly onto a bluff with one of the most iconic views in Michigan's Lower Peninsula — Sleeping Bear Dune and Lake Michigan stretching to the horizon. The perfect sunset hike.",
    tip: "Arrive at the trailhead at least one hour before sunset. There's plenty of space on the bluff to sit and watch it set directly over the lake. You will not regret it.",
    url: 'https://www.nps.gov/slbe/planyourvisit/trails.htm',
  },
  {
    name: 'The Dune Climb',
    level: 'Classic',
    distance: '4.5 miles round trip',
    time: '2–4 hours',
    desc: "The iconic Sleeping Bear experience. A steep climb to the top of the dunes followed by a rugged traverse down to Lake Michigan's shore. No shade anywhere on the trail. Sand makes every step harder than it looks. One of the 25 best day hikes in America — and it earns that status completely.",
    tip: "Bring twice the water you think you need. Start early — by midday in summer the sand surface temperature can exceed 130°F. No dogs allowed on this trail.",
    url: 'https://www.nps.gov/slbe/planyourvisit/dune_climb.htm',
  },
  {
    name: 'Pyramid Point Loop',
    level: 'Epic',
    distance: '2.7 miles loop',
    time: '2–3 hours',
    desc: "The least crowded of the three and the most rewarding for serious hikers. Over 500 feet of elevation change through maple and beech forest to 270-degree views of Lake Michigan and the North and South Manitou Islands. The kind of view that reframes your sense of what Michigan is.",
    tip: "Hike the loop clockwise — the 0.6-mile climb to the overlook is steeper going up than coming back. The islands appear suddenly as you crest. Stop and let that moment land.",
    url: 'https://www.nps.gov/slbe/planyourvisit/trails.htm',
  },
];

const FOOD = [
  {
    name: 'Trattoria Stella',
    address: '30 Cottageview Dr (Grand Traverse Commons)',
    hours: 'Dinner Wed–Mon',
    note: "The best restaurant in Northern Michigan by almost every measure. Housemade pastas, whole-animal butchery, daily changing menus built entirely from Northern Michigan farms and artisans. Five-time James Beard Award semi-finalist kitchen. Reservations essential — book before you leave home.",
  },
  {
    name: 'Amical',
    address: '229 E Front St (Downtown)',
    hours: 'Dinner daily',
    note: "On Front Street since 1994. French-inspired bistro that evolved into something genuinely Mediterranean. Local mushrooms foraged daily from the forest. The menu changes with what's growing. The patio on Front Street on a summer evening is one of the great TC experiences.",
  },
  {
    name: "The Cook's House",
    address: 'Traverse City',
    hours: 'Dinner Wed–Sun',
    note: "Tiny restaurant, enormous reputation. The most locally-sourced menu in TC — relationships with specific farms, specific fishermen, specific foragers. The menu is handwritten and changes completely every few days. If you can get a reservation, take it without reading the menu first.",
  },
  {
    name: 'Apache Trout Grill',
    address: 'West Bay waterfront',
    hours: 'Lunch and dinner daily',
    note: "Fresh Great Lakes seafood on the West Bay waterfront. The whitefish is caught locally and it shows. A long patio directly over the water. The kind of place where you order a second drink because you don't want to leave the view. Perfect for a long lunch after the wine trail.",
  },
];

const HOTELS = [
  {
    name: 'Inn at Black Star Farms',
    address: 'Leelanau Peninsula',
    note: "Sleep in the vineyard. The inn sits in the middle of the Black Star Farms estate — wake up, walk to the winery, taste before breakfast. Genuinely one of the most beautiful places to stay in Michigan. Book months ahead in summer.",
    url: 'https://www.blackstarfarms.com/inn/',
  },
  {
    name: 'Chateau Chantal Bed & Breakfast',
    address: 'Old Mission Peninsula',
    note: "Eight rooms perched on the ridge of Old Mission Peninsula with water views from both sides. Fall asleep to vineyard silence. Wake up to fog over Grand Traverse Bay. If you're celebrating something, this is where you do it.",
    url: 'https://www.chateauchantal.com/stay/',
  },
  {
    name: 'Park Place Hotel',
    address: 'Downtown Traverse City',
    note: "The historic anchor of downtown TC since 1930. Fourteen stories, rooftop bar with bay views, walking distance to Front Street, the commons, and everything downtown. The reliable choice for a TC weekend that keeps you close to the action.",
    url: 'https://www.park-place-hotel.com/',
  },
  {
    name: 'West Bay Beach',
    address: 'West Grand Traverse Bay',
    note: "A full resort directly on West Bay Beach — private beach access, kayaks and paddleboards on site, pool, fire pits at the water's edge. The most complete resort experience in TC. The kind of place you check into on Friday and don't leave until Sunday reluctantly.",
    url: 'https://www.westbaybeach.com/',
  },
];

export default function TraverseCityPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weather, setWeather] = useState<{ temp: string; condition: string; icon: string } | null>(null);

  useEffect(() => {
    fetch('https://wttr.in/Traverse+City,MI?format=j1')
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
          .three-col { grid-template-columns: 1fr !important; }
          .hero-image { height: 220px !important; }
          .section-patch { width: 100px !important; height: 100px !important; }
          .hike-level { font-size: 11px !important; }
          .brand-card { padding: 24px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
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
        <Link href="/cities" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Cities</Link>
        <Link href="/dispensaries" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Dispensaries</Link>
        <Link href="/terpenes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Terpenes</Link>
        <Link href="/processes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>The Science</Link>
        <Link href="/chat" style={{ color: COLORS.green, backgroundColor: COLORS.gold, fontSize: '16px', fontWeight: 'bold', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }}>Talk to Photi</Link>
      </div>

      {/* Hero */}
      <section className="page-hero" style={{ padding: '64px 48px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto 36px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 60px rgba(181,135,58,0.25)' }}>
          <img
            className="hero-image"
            src="/city/traversecity.jpg"
            alt="Traverse City Michigan — West Grand Traverse Bay"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Northern Michigan</p>
        <h1 style={{ color: COLORS.cream, fontSize: '52px', fontWeight: 'bold', lineHeight: '1.15', maxWidth: '760px', margin: '0 auto 16px' }}>
          Welcome to Traverse City.
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '18px', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 20px' }}>
          Cherry capital of the world. Gateway to Sleeping Bear Dunes. One of America&apos;s most celebrated food and wine destinations. The lake is the reason you came. Everything else is why you&apos;ll come back.
        </p>

        {weather && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(181,135,58,0.1)', border: '1px solid rgba(181,135,58,0.25)', borderRadius: '50px', padding: '8px 20px', marginBottom: '32px' }}>
            <span style={{ fontSize: '18px' }}>{weather.icon}</span>
            <span style={{ color: COLORS.gold, fontSize: '15px' }}>Traverse City right now: {weather.temp} · {weather.condition}</span>
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
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Traverse City Cannabis</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Featured Dispensaries</h2>
            </div>
          </div>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '680px' }}>
            Traverse City draws every kind of cannabis buyer — the downtown boutique shopper, the flower-forward traditionalist, the deal-hunting weekender. These three dispensaries serve those customers well. Pick the one that fits your trip.
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
            Traverse City has many more dispensaries across the region.{' '}
            <Link href="/dispensaries/traversecity" style={{ color: COLORS.green, fontWeight: 'bold', textDecoration: 'none', borderBottom: `1px solid ${COLORS.gold}` }}>
              See the full Traverse City dispensary directory →
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
            Traverse City attracts Michigan's most curious cannabis buyer — the weekender who wants to try something they can&apos;t get in Chicago or Indianapolis. These four Michigan makers deserve a place on your list this trip. A vertical operator, a national benchmark, a craft cultivator, and a rising vape specialist.
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

      {/* Wine Trail */}
      <section className="content-section" style={{ padding: '64px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
            <img
              className="section-patch"
              src="/monroe/winetrail.jpg"
              alt="Wine Trail"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 24px rgba(181,135,58,0.4)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Old Mission & Leelanau Peninsulas</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>The Wine Trail</h2>
            </div>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '720px' }}>
            The Lake Michigan Shore Wine Trail is one of America&apos;s most unexpected wine destinations — a 40-mile stretch of micro-climates on Old Mission and Leelanau Peninsulas producing world-class Rieslings, Pinot Noirs, and sparkling wines. Most people outside Michigan have never heard of it. The ones who find it come back every year.
          </p>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {WINE.map((w) => (
              <div key={w.name} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '24px', border: '1px solid rgba(181,135,58,0.2)' }}>
                <h3 style={{ color: COLORS.gold, fontSize: '17px', fontWeight: 'bold', marginBottom: '6px' }}>{w.name}</h3>
                <p style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.65, marginBottom: '10px' }}>{w.address}</p>
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75', marginBottom: '14px' }}>{w.note}</p>
                {w.url && <a href={w.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.gold, fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>Visit →</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sleeping Bear */}
      <section id="sleeping-bear" style={{ scrollMarginTop: '80px' }}>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src="/city/sleepingbear.jpg"
            alt="Sleeping Bear Dunes National Lakeshore"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(22,56,41,0.95), transparent)' }} />
          <div style={{ position: 'absolute', bottom: '32px', left: '0', right: '0', textAlign: 'center', padding: '0 48px' }}>
            <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>National Lakeshore · 35 Miles from Traverse City</p>
            <h2 style={{ color: COLORS.cream, fontSize: '42px', fontWeight: 'bold', margin: 0, lineHeight: '1.2' }}>Sleeping Bear Dunes</h2>
          </div>
        </div>

        <div style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '48px', maxWidth: '760px' }}>
              Sleeping Bear Dunes National Lakeshore is 71,000 acres of towering sand dunes, ancient forests, crystal-clear inland lakes, and 65 miles of Lake Michigan shoreline. It was voted the most beautiful place in America by Good Morning America viewers — and it earns that. A National Park pass is required. Dogs are not allowed on most dune trails.
            </p>

            <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>The Three Hikes — Choose Your Version</p>

            <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {HIKES.map((h) => (
                <div key={h.name} style={{ backgroundColor: 'rgba(181,135,58,0.07)', borderRadius: '12px', padding: '28px', border: '1px solid rgba(181,135,58,0.2)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ color: COLORS.cream, fontSize: '18px', fontWeight: 'bold', margin: 0, flex: 1 }}>{h.name}</h3>
                    <span className="hike-level" style={{
                      backgroundColor: h.level === 'Easy' ? 'rgba(157,196,176,0.2)' : h.level === 'Classic' ? 'rgba(181,135,58,0.2)' : 'rgba(255,100,80,0.15)',
                      color: h.level === 'Easy' ? COLORS.sage : h.level === 'Classic' ? COLORS.gold : '#E8967A',
                      fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase',
                      padding: '3px 10px', borderRadius: '20px', marginLeft: '8px', whiteSpace: 'nowrap', flexShrink: 0,
                    }}>{h.level}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                    <span style={{ color: COLORS.gold, fontSize: '12px' }}>{h.distance}</span>
                    <span style={{ color: COLORS.sage, fontSize: '12px', opacity: 0.7 }}>{h.time}</span>
                  </div>
                  <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75', marginBottom: '14px', flex: 1 }}>{h.desc}</p>
                  <p style={{ color: COLORS.sage, fontSize: '13px', fontStyle: 'italic', opacity: 0.75, borderLeft: '2px solid rgba(181,135,58,0.4)', paddingLeft: '12px', marginBottom: '16px' }}>{h.tip}</p>
                  <a href={h.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.gold, fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>Trail info →</a>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '36px', backgroundColor: 'rgba(181,135,58,0.08)', border: '1px solid rgba(181,135,58,0.3)', borderRadius: '12px', padding: '28px 32px' }}>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>Photi&apos;s Take</p>
              <p style={{ color: COLORS.cream, fontSize: '17px', lineHeight: '1.8', margin: 0 }}>
                Do the Empire Bluff Trail at sunset your first time. Do the Dune Climb on your second visit when you know what you&apos;re getting into. Bring Pyramid Point to a hiker who thinks they&apos;ve already seen everything Michigan has to offer. That view of the Manitou Islands from the point changes people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/food.jpg"
              alt="Eat"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.2)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Newsweek&apos;s Best Small City for Foodies</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Eat Traverse City</h2>
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

      {/* Hotels */}
      <section className="content-section" style={{ padding: '64px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/explore.jpg"
              alt="Stay"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.3)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Where to Stay</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>TC Worth Staying For</h2>
            </div>
          </div>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {HOTELS.map((h) => (
              <div key={h.name} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '24px', border: '1px solid rgba(181,135,58,0.15)' }}>
                <h3 style={{ color: COLORS.gold, fontSize: '17px', fontWeight: 'bold', marginBottom: '6px' }}>{h.name}</h3>
                <p style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.65, marginBottom: '10px' }}>{h.address}</p>
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75', marginBottom: '14px' }}>{h.note}</p>
                {h.url && <a href={h.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.gold, fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>Learn more →</a>}
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
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>What&apos;s On</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Events in Traverse City</h2>
            </div>
          </div>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '28px' }}>
            The National Cherry Festival in July fills the city — book lodging months ahead. The Traverse City Film Festival, the TC Food & Wine Festival in August, the Sleepingbear Dunes Music Festival, and the Leelanau Peninsula Wine & Food Experience round out a calendar that runs year-round. Fall color season is October and dramatically underrated.
          </p>
          <a href="https://www.traversecity.com/events/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', backgroundColor: COLORS.green, color: COLORS.cream, fontSize: '15px', fontWeight: 'bold', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none' }}>
            See TC Events Calendar →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <img src="/photi-emblem.png" alt="Photi" width={80} height={80} style={{ marginBottom: '24px', borderRadius: '50%' }} />
          <h2 style={{ color: COLORS.gold, fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Plan your Northern Michigan trip with Photi.</h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', marginBottom: '36px' }}>
            The right product for hiking Sleeping Bear. The right vibe for a long afternoon on the wine trail. The right dispensary before a sunset dinner on the bay. One quick conversation covers all of it.
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
            <span style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents traversecitysdailydeals.com</span>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '13px' }}>Photi powered by MiQuest · hello@michigansdailydeals.com</p>
          <p style={{ color: COLORS.sage, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>For adults 21 and older. Please consume responsibly.</p>
        </div>
      </footer>
    </main>
  );
}
