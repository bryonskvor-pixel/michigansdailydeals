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
    name: 'Lume Cannabis Co.',
    address: 'Traverse City, MI',
    hours: '9am–10pm daily',
    url: 'https://lume.com/',
    note: "Michigan's largest homegrown cannabis company controls their supply chain from seed to sale — which shows in the consistency. Multiple TC-area locations, extensive menu, and the kind of reliability you want when you're visiting from out of town.",
  },
  {
    name: 'Enjoy Cannabis Company',
    address: 'Traverse City, MI',
    hours: '9am–10pm daily',
    url: 'https://enjoycannabis.com/',
    note: "Enjoy has built a genuine following in Northern Michigan for a thoughtfully curated menu and staff that knows the difference between a live rosin and a distillate cart. The kind of dispensary that makes first-time Michigan visitors into repeat customers.",
  },
  {
    name: 'Pleasantrees',
    address: 'Traverse City, MI',
    hours: '9am–10pm daily',
    url: 'https://pleasantrees.com/',
    note: "Pleasantrees brings a premium, design-forward approach to the Traverse City market. Clean store, well-organized menu, and a focus on quality over volume. If you want to understand what Michigan cannabis can be at its best, start here.",
  },
  {
    name: 'Green Stem',
    address: 'Traverse City, MI',
    hours: '9am–10pm daily',
    url: 'https://greenstemcannabis.com/',
    note: "Green Stem has earned its place in the Northern Michigan market through consistent quality and a staff that genuinely engages with the products they carry. Good daily deals, strong flower selection, and the local knowledge to back it up.",
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

const SPOTLIGHT = {
  name: 'Coming Soon',
  tagline: 'Traverse City has more hidden gems per square mile than anywhere in Michigan.',
  description: "We're curating this week's TC spotlight — a local winery, restaurant, or experience worth your attention. Check back soon, or talk to Photi for personalized Northern Michigan recommendations right now.",
  address: 'Traverse City, MI',
  url: '',
  weekOf: "This Week's Spotlight",
};

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
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Northern Michigan Cannabis</p>
          <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', marginBottom: '12px' }}>Where to Shop</h2>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '680px' }}>
            Traverse City has a strong cannabis market to match its food and wine scene. These dispensaries represent the quality and range the region has to offer.
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
            Traverse City has many other dispensaries across the region. Soon Photi will be connecting you to the best products that suit you.
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

      {/* Sleeping Bear — its own full section with hero */}
      <section id="sleeping-bear" style={{ scrollMarginTop: '80px' }}>

        {/* Sleeping Bear Hero */}
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

        {/* Sleeping Bear Content */}
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

            {/* Photi callout for Sleeping Bear */}
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
