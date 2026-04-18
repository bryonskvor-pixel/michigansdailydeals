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

// SPOTLIGHT — Information Entropy
const SPOTLIGHT = {
  name: 'Information Entropy',
  tagline: "Ann Arbor's own. Family-owned, seed-to-sale, and housed in a former First Baptist church on Broadway Street.",
  description: "Founder Drew Hutton nearly lost Information Entropy during COVID — two months of runway, a family business on the brink. He pulled it through, and the experience shaped everything that followed: build quality at every step, stay close to home, treat the customer like an adult. The flagship on Broadway Street is a beautifully restored 1800s church that was once a flower shop, then a daycare. The downtown location on Miller Ave makes the brand accessible to anyone walking Main Street. Flower starts in DeTour Village in the Upper Peninsula, comes to Ann Arbor for trimming, packaging, and pressing — and lands on the shelf the kind of fresh you can smell. Education-based selling. Staff who grew up here. The Ann Arbor dispensary that most embodies what Ann Arbor is.",
  address: '1115 Broadway St, Ann Arbor, MI 48105 · Downtown location on Miller Ave',
  hours: '10am–9pm Sun–Thu · 10am–10pm Fri · 9am–10pm Sat',
  phone: '(734) 929-4207',
  url: 'https://informationentropy.com/',
};

// FEATURED DISPENSARIES — Exclusive, Arbors Wellness, Apothecare
const FEATURED_DISPENSARIES = [
  {
    name: 'Exclusive Ann Arbor',
    address: 'Ann Arbor, MI',
    hours: '9am–9pm daily',
    url: 'https://exclusivemi.com/',
    note: "Exclusive was Ann Arbor's — and the State of Michigan's — first licensed medical marijuana dispensary AND first licensed recreational cannabis facility. That's not marketing. That's history. Seven Michigan locations now, lab-tested products across the widest brand selection in the state, and a team that's been doing this longer than almost anyone. When you want the deepest menu in Ann Arbor, you go here.",
  },
  {
    name: 'Arbors Wellness',
    address: 'Downtown Ann Arbor, just off U-M central campus',
    hours: '10am–9pm daily',
    url: 'https://arborswellness.com/',
    note: "Downtown and adjacent to the University of Michigan's central campus — which makes it the Ann Arbor dispensary most likely to serve a faculty member on the way home. Medical and recreational, personalized consultations, staff that takes the conversation seriously. The kind of place you take your out-of-town sister who's curious but cautious.",
  },
  {
    name: 'Apothecare',
    address: 'Ann Arbor, MI',
    hours: '10am–9pm daily',
    url: 'https://apothecareannarbor.com/',
    note: "Apothecare makes a lot of their own products — flower, concentrates, edibles. The regulars will tell you Apothecare's house-made flower is among the best in town, and the staff are the kind who remember what you bought last time and check in on how it worked. Small-batch integrity in a category that often forgets what that means.",
  },
];

// FEATURED BRANDS — the Ann Arbor sophistication grid
const FEATURED_BRANDS = [
  {
    name: 'Information Entropy',
    description: "Ann Arbor's own brand, made in Michigan. Pheno-hunted, small-batch-pressed, meticulously labeled. Their Mandarin Z live rosin is Detroit Metro Times' pick for the cultivator's best strain. Named releases like Mackinaw Peachez, Project Z, and Rainbow Belts are inventory, not imports. When you shop Information Entropy the brand, you're shopping the most local option possible — and it happens to be genuinely great.",
    url: 'https://informationentropy.com/',
    lookFor: [
      { product: 'Mandarin Z Live Rosin 1g', category: 'Concentrate', note: "Metro Times' favorite Information Entropy strain. Sweet mandarin, grapefruit, spice — energizing and euphoric." },
      { product: 'Mackinaw Peachez Live Rosin 1g', category: 'Concentrate', note: "Hybrid with a creamy peach-blossom profile. One of the most flavorful rosins they press." },
      { product: 'Motorbreath #15 Live Rosin 1g', category: 'Concentrate', note: "Heavy indica, citrus-and-diesel aroma, deeply relaxing. The end-of-the-day strain." },
      { product: 'Hash-Forward Infused Pre-Rolls', category: 'Pre-Roll', note: "Premium flower infused with their own bubble hash. A signature expression of the house style." },
    ],
  },
  {
    name: "Mary's Medicinals",
    description: "Precision dosing. The brand that pioneered the cannabis transdermal patch and built a wellness-forward line most of the rest of Michigan hasn't caught up to. Their Relief 1:1 patch won the 2023 Michigan High Times Cup. For the Ann Arbor buyer who wants function — sleep, pain relief, focus — without recreational effects, Mary's Medicinals is the correct answer.",
    url: 'https://marysmedicinals.com',
    lookFor: [
      { product: 'Relief 1:1 Transdermal Patch', category: 'Topical', note: '2023 Michigan High Times Cup winner. 8–12 hour systemic relief. Cuttable for microdosing.' },
      { product: 'CBN Transdermal Patch', category: 'Topical', note: 'Sleep-focused cannabinoid delivered gradually through the night. Wake up without grogginess.' },
      { product: 'Formula 3:2:1 Patch', category: 'Topical', note: 'CBD:THC:CBG ratio tuned to harmonize the endocannabinoid system. Designed for balance.' },
      { product: 'THC Tincture', category: 'Tincture', note: 'Full-spectrum, lemon-lime flavor, precise sublingual dosing. The calm, measured option.' },
    ],
  },
  {
    name: 'Redbud Roots',
    description: "Craft meets design. The Strain Art Pre-Roll line — 10-packs with illustrated packaging by Michigan artist Carla Schierling, 28 collectable designs — is one of Michigan cannabis's genuinely beautiful objects. But the craft is real beyond the packaging: Michigan OG flower, Fruit Stand vape carts, Hash House gummies. The Ann Arbor buyer who cares how a product looks as much as how it works.",
    url: 'https://redbudroots.com/',
    lookFor: [
      { product: 'Strain Art Pre-Rolls 10-pack', category: 'Pre-Roll', note: 'Collectible packaging illustrated by Carla Schierling. 28 designs total. A gift to yourself.' },
      { product: 'Fruit Stand Live Resin Cart 1g', category: 'Vape', note: 'Strain-specific live resin in expressive fruit-forward profiles. Clean hardware, honest extraction.' },
      { product: 'Hash House Gummies 100mg', category: 'Edible', note: 'Hash-infused gummies — a real step up from distillate edibles. Full-spectrum effect.' },
      { product: 'Michigan OG Flower 3.5g', category: 'Flower', note: 'The house strain. Classic OG genetics grown with Redbud care. A Michigan flower anchor.' },
    ],
  },
  {
    name: '710 Labs',
    description: "The national benchmark for solventless concentrate. Persy Water Hash and Persy Rosin are the top of the pyramid — what serious connoisseurs measure everything else against. In Ann Arbor, where the buyer often has tried the best of Colorado and California, 710 Labs is the shelf that says Michigan is not playing catch-up.",
    url: 'https://710labs.com/michigan',
    lookFor: [
      { product: 'Persy Water Hash 1g', category: 'Concentrate', note: '90-micron trichome heads, ice-and-water only. Old-world hash perfection.' },
      { product: 'Persy Rosin Badder 1g', category: 'Concentrate', note: 'Single-origin, single-pressing, cold-cured. The rosin pyramid summit.' },
      { product: 'First Press Live Rosin 1g', category: 'Concentrate', note: 'Full-spectrum live rosin from fresh-frozen flower. Entry to the 710 experience.' },
      { product: 'Live Rosin Vape 1g', category: 'Vape', note: 'True solventless rosin in a cart. The discreet version of the dab.' },
    ],
  },
];

const FOOD = [
  {
    name: "Zingerman's Delicatessen",
    address: '422 Detroit St (Kerrytown)',
    hours: '7am–10pm daily',
    note: "One of the most famous delicatessens in America — and the single most studied small business in the country. Harvard Business School teaches them. Ari Weinzweig has written books about service that are required reading in hospitality programs. The Reuben is perfect. The cheese counter is a destination. But what you're really buying when you walk in is the feeling that someone cared about every detail. That's the product.",
  },
  {
    name: 'Miss Kim',
    address: '415 N 5th Ave (Kerrytown Market)',
    hours: 'Lunch and dinner Tue–Sun',
    note: "Chef Ji Hye Kim's modern Korean restaurant inside Kerrytown Market & Shops. James Beard Award nominee. Seasonal menus, deeply considered sourcing, kimchi that she makes herself. The kind of restaurant that makes Ann Arbor feel bigger than it is. Book ahead.",
  },
  {
    name: 'Frita Batidos',
    address: '117 W Washington St (Downtown)',
    hours: 'Lunch and dinner daily',
    note: "Chef Eve Aronoff's Cuban-inspired burger and shake shop in a converted downtown space. Picnic-table seating, batidos (tropical shakes), fritas (Cuban burgers) with toppings you won't forget. The most fun casual meal in town. Always busy for a reason.",
  },
  {
    name: 'Jolly Pumpkin Café & Brewery',
    address: '311 S Main St (Downtown)',
    hours: 'Lunch and dinner daily',
    note: "Ann Arbor's destination brewery — sour ales, wood-fired pizzas, a Main Street patio that fills up by 5pm on any warm evening. The Jolly Pumpkin beer program is internationally respected. The food kitchen holds its own alongside it. A Main Street institution.",
  },
];

const EXPLORE = [
  {
    name: 'University of Michigan Museum of Art (UMMA)',
    address: '525 S State St',
    desc: "Free. 20,000+ works across Western, Asian, African, and contemporary collections. The Frank Gehry-designed wing added in 2009 is itself worth the visit. Walkable from the Diag, the Michigan Theater, and Zingerman's. Plan 90 minutes minimum.",
    tip: "The contemporary exhibits rotate frequently and are often surprising. Check what's up before you go.",
    url: 'https://umma.umich.edu/',
  },
  {
    name: 'Michigan Theater',
    address: '603 E Liberty St',
    desc: "Opened in 1928 as a movie palace, saved from demolition by a community effort in the 1970s, now one of the most beloved non-profit cinemas in America. Pre-show live organ music on select nights. First-run independent film, revivals, the Ann Arbor Film Festival. The kind of movie theater that reminds you why seeing films on a big screen matters.",
    tip: "Check the calendar before you come — Ann Arbor Film Festival in March is an Ann Arbor pilgrimage.",
    url: 'https://michtheater.org/',
  },
  {
    name: 'Literati Bookstore',
    address: '124 E Washington St',
    desc: "An independent bookstore that became an Ann Arbor institution within a few years of opening. Three floors of carefully curated titles. A café on the top floor. A typewriter in the store where visitors leave anonymous messages (the messages became a book). The kind of bookstore where you meant to stop in for ten minutes and lost an hour.",
    tip: "The typewriter is on the top floor. Leave something. The staff picks shelf is the best in the Midwest.",
    url: 'https://www.literatibookstore.com/',
  },
  {
    name: 'Gallup Park & the Huron River',
    desc: "Ann Arbor's backyard. Canoe and kayak rentals, paved trails, a footbridge over the Huron, riverside picnics. In fall the color along the water is extraordinary. Thirty minutes here and you remember why people move to Ann Arbor.",
    tip: "Rent a canoe and paddle upstream toward Argo Cascades — it's a 2-hour loop and one of the best ways to spend an Ann Arbor afternoon.",
    url: 'https://www.a2gov.org/departments/Parks-Recreation/parks-places/Pages/Gallup-Park.aspx',
  },
  {
    name: 'Nichols Arboretum ("The Arb")',
    address: '1610 Washington Heights',
    desc: "123 acres of rolling hills, forests, the Huron River, and the University of Michigan's peony garden (nation's largest). Students call it The Arb. Locals picnic here, propose here, grieve here. Completely free, completely essential. Especially in October.",
    tip: "Peony Garden peaks late May to early June. If you're in town then, plan around it.",
    url: 'https://mbgna.umich.edu/nichols-arboretum/',
  },
  {
    name: 'Kerrytown',
    address: 'N 5th Ave & Kingsley',
    desc: "Ann Arbor's market district. Farmer's Market on Saturdays (year-round) and Wednesdays (seasonal). Zingerman's, Miss Kim, and independent shops and galleries in every direction. This is where Ann Arbor feels most like itself on a weekend morning.",
    tip: "Saturday Farmer's Market is genuinely one of the best in the Midwest. Arrive by 10am.",
    url: 'https://www.a2gov.org/departments/public-services/fieldops-services/farmers-market/Pages/default.aspx',
  },
];

export default function AnnArborPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weather, setWeather] = useState<{ temp: string; condition: string; icon: string } | null>(null);

  useEffect(() => {
    fetch('https://wttr.in/Ann+Arbor,MI?format=j1')
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
          .brand-card { padding: 24px !important; }
          .origin-story { padding: 40px 24px !important; }
          .origin-story h2 { font-size: 28px !important; }
          .zingermans-corner { padding: 40px 24px !important; }
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
            src="/city/annarbor.jpg"
            alt="Ann Arbor Michigan — University of Michigan Diag with tree-lined walkways"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Where It All Started</p>
        <h1 style={{ color: COLORS.cream, fontSize: '52px', fontWeight: 'bold', lineHeight: '1.15', maxWidth: '760px', margin: '0 auto 16px' }}>
          Welcome to Ann Arbor.
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '18px', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 20px' }}>
          America&apos;s cannabis origin city. Home of the Hash Bash since 1972. The first American city to decriminalize marijuana — and still the city where the conversation runs deepest fifty-four years later.
        </p>

        {weather && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(181,135,58,0.1)', border: '1px solid rgba(181,135,58,0.25)', borderRadius: '50px', padding: '8px 20px', marginBottom: '32px' }}>
            <span style={{ fontSize: '18px' }}>{weather.icon}</span>
            <span style={{ color: COLORS.gold, fontSize: '15px' }}>Ann Arbor right now: {weather.temp} · {weather.condition}</span>
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

      {/* ORIGIN STORY — unique to Ann Arbor */}
      <section className="origin-story content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>The Origin Story</p>
          <h2 style={{ color: COLORS.green, fontSize: '36px', fontWeight: 'bold', marginBottom: '28px', lineHeight: '1.25' }}>
            Cannabis&apos;s American conversation started here.
          </h2>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            In 1969, an Ann Arbor poet and activist named John Sinclair was sentenced to ten years in prison for possession of two marijuana joints. Two joints. Ten years. The sentence was so outrageous that Abbie Hoffman interrupted The Who&apos;s set at Woodstock to publicly protest it.
          </p>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            On December 10, 1971, Hoffman and Allen Ginsberg organized a Free John Sinclair rally at the University of Michigan&apos;s Crisler Arena. They pulled in friends: John Lennon and Yoko Ono, Stevie Wonder, Bob Seger, Phil Ochs, Commander Cody. Lennon wrote a new song for the occasion — just called &ldquo;John Sinclair.&rdquo; Thousands smoked cannabis openly inside Crisler Arena that night as an act of civil disobedience. Three days later, the Michigan Supreme Court freed Sinclair and ruled the state&apos;s marijuana statutes unconstitutional.
          </p>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            On April 1, 1972, during a brief window when no Michigan cannabis law was on the books, activists held the first Hash Bash on the University of Michigan Diag. A few months later, Ann Arbor&apos;s City Council reduced the penalty for possession to a $5 civil infraction — the most lenient local cannabis law in the United States. In 1974, voters enshrined that ordinance in the city charter so no future council could undo it.
          </p>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '28px' }}>
            Graham Nash called out Ann Arbor by name in his 1974 song &ldquo;Prison Song.&rdquo; The Hash Bash is now in its fifty-fourth consecutive year. And Ann Arbor has the most recreational cannabis licenses of any city in Michigan. This is a city that has been having the cannabis conversation since before almost anyone else — and it has never stopped.
          </p>

          <p style={{ color: COLORS.green, fontSize: '19px', lineHeight: '1.8', fontWeight: 'bold', fontStyle: 'italic' }}>
            When you shop cannabis in Ann Arbor, you&apos;re shopping in the city that made it possible for the rest of America to catch up.
          </p>
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
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Ann Arbor Cannabis</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Featured Dispensaries</h2>
            </div>
          </div>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '680px' }}>
            Ann Arbor has more cannabis business licenses than any city in Michigan. These three represent the range of what that depth can mean — the historical first, the faculty-adjacent consultation, and the small-batch house-made alternative.
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
            Ann Arbor has 39 licensed cannabis dispensaries — more than any other Michigan city.{' '}
            <Link href="/dispensaries/annarbor" style={{ color: COLORS.green, fontWeight: 'bold', textDecoration: 'none', borderBottom: `1px solid ${COLORS.gold}` }}>
              See the full Ann Arbor dispensary directory →
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
            Ann Arbor sophistication is not about chasing the highest THC. It&apos;s about understanding what you&apos;re buying. These four brands answer four different questions a thoughtful Ann Arbor buyer might ask — local craft, precision wellness, aesthetic integrity, and solventless purity.
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

      {/* HASH BASH */}
      <section className="content-section" style={{ backgroundColor: COLORS.green, padding: '64px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px' }}>
            <img
              className="section-patch"
              src="/patches/hashbash.png"
              alt="Hash Bash patch"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 24px rgba(181,135,58,0.4)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Est. 1972 · First Saturday of April · High Noon</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>The Hash Bash</h2>
            </div>
          </div>

          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            One of the oldest political rallies of any kind in the United States — and the only one that started with a cannabis law loophole and just kept going. The first Hash Bash was held on April 1, 1972. The fifty-fourth was held in 2025. In 2026, the fifty-fifth happens on the first Saturday of April at high noon on the University of Michigan Diag.
          </p>

          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            Speakers include state representatives, activists, medical cannabis patients, former law enforcement, and — for most of the first fifty years — John Sinclair himself, who passed in 2024 but whose voice is still the spiritual center of the event. Former governors have attended. Gretchen Whitmer has sent video messages. Cannabis is openly consumed. There is music. There is protest energy, still, even now that recreational cannabis is legal in Michigan.
          </p>

          <p style={{ color: COLORS.cream, fontSize: '17px', lineHeight: '1.85', fontStyle: 'italic', borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: '20px', marginBottom: '28px' }}>
            &ldquo;The Hash Bash is a celebration of the culture that we formed in the late 1960s that was based on love rather than materialism.&rdquo; — Chuck Ream, Ann Arbor activist and attendee of nearly every Hash Bash since the first one
          </p>

          <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
            The event happens on the Diag — which is on University of Michigan property, where state, not city, cannabis laws apply. The University has historically allowed the event and the public consumption that comes with it, though technically cannabis use on campus remains illegal. Attendance ranges from a few thousand to over ten thousand depending on weather.
          </p>

          <a href="https://hashbash.org/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', backgroundColor: COLORS.gold, color: COLORS.green, fontSize: '15px', fontWeight: 'bold', padding: '12px 32px', borderRadius: '50px', textDecoration: 'none' }}>
            Visit Hash Bash →
          </a>
        </div>
      </section>

      {/* ZINGERMAN'S CORNER — text-only editorial section */}
      <section className="zingermans-corner content-section" style={{ backgroundColor: COLORS.cream, padding: '72px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Photi&apos;s Ann Arbor Essay</p>
          <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', marginBottom: '28px', lineHeight: '1.25' }}>
            A note about Zingerman&apos;s — and what Ann Arbor taught Michigan about service.
          </h2>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            Zingerman&apos;s Delicatessen opened on Detroit Street in 1982 with two employees and 1,500 square feet. Today it anchors a small constellation of Ann Arbor food businesses that generate tens of millions of dollars a year, teach hospitality at Harvard Business School, and have inspired several books on service. One of those books, Ari Weinzweig&apos;s <em>Zingerman&apos;s Guide to Giving Great Service</em>, treats service not as a cost center but as the product itself.
          </p>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            What Zingerman&apos;s figured out — and what so much of the rest of American retail still hasn&apos;t — is that the thing customers are buying is the way they feel during the transaction. The Reuben is delicious. The cheese counter is stocked. But those aren&apos;t the moat. The moat is that when you walk in, someone is genuinely happy you&apos;re there. They&apos;re going to answer your questions. They&apos;re going to offer you a taste before you buy. And if something isn&apos;t right, they&apos;re going to fix it without making you feel like you&apos;re the problem.
          </p>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            Photi was built with that philosophy in mind. Michigan has extraordinary cannabis. What it has been missing is a conversation that makes walking in the door less overwhelming. Photi is not a recommendation engine. Photi is the version of a budtender that takes the conversation seriously — the same way the counter staff at Zingerman&apos;s takes the cheese conversation seriously, even with a customer who&apos;s never bought cheese before in their life.
          </p>

          <p style={{ color: COLORS.green, fontSize: '19px', lineHeight: '1.75', fontWeight: 'bold' }}>
            Ann Arbor taught Michigan how to serve. Photi is trying to do the same thing for cannabis.
          </p>
        </div>
      </section>

      {/* Food */}
      <section className="content-section" style={{ backgroundColor: COLORS.green, padding: '64px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/food.jpg"
              alt="Eat"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.3)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Eat Ann Arbor</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>The Food You Came For</h2>
            </div>
          </div>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {FOOD.map((f) => (
              <div key={f.name} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '24px', border: '1px solid rgba(181,135,58,0.2)' }}>
                <h3 style={{ color: COLORS.gold, fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>{f.name}</h3>
                <p style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.65, marginBottom: '10px' }}>{f.address} · {f.hours}</p>
                <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.75' }}>{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
            <img
              className="section-patch"
              src="/monroe/explore.jpg"
              alt="Explore"
              style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 20px rgba(181,135,58,0.2)' }}
            />
            <div>
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>While You&apos;re Here</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Ann Arbor Worth Seeing</h2>
            </div>
          </div>
          <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {EXPLORE.map((e) => (
              <div key={e.name} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '24px', border: '1px solid rgba(30,77,53,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 style={{ color: COLORS.green, fontSize: '17px', fontWeight: 'bold', marginBottom: '6px' }}>{e.name}</h3>
                {e.address && <p style={{ color: '#999', fontSize: '12px', marginBottom: '10px' }}>{e.address}</p>}
                <p style={{ color: COLORS.text, fontSize: '14px', lineHeight: '1.75', marginBottom: '12px' }}>{e.desc}</p>
                <p style={{ color: COLORS.text, fontSize: '13px', fontStyle: 'italic', opacity: 0.75, borderLeft: '2px solid rgba(181,135,58,0.4)', paddingLeft: '12px', marginBottom: '12px' }}>{e.tip}</p>
                {e.url && <a href={e.url} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.green, fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>Learn more →</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Day */}
      <section className="content-section" style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Saturday in September</p>
          <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.25' }}>
            The Big House on game day.
          </h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            Michigan Stadium holds 107,601 people — the largest college football stadium in the United States. On a home football Saturday, Ann Arbor&apos;s population effectively doubles. Tailgates start at dawn. Route 94 and M-14 back up hours before kickoff. Hotels within a thirty-mile radius sell out a year in advance for night games against Ohio State.
          </p>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            If you&apos;re in Ann Arbor on a home game Saturday, you have two options: embrace it fully — go to the tailgates, wear maize, walk the crowd down Main Street — or retreat early to one of the quieter neighborhoods like Burns Park or west of downtown. The one thing you cannot do is ignore it. Game day is Ann Arbor at peak volume.
          </p>
          <a href="https://mgoblue.com/sports/football" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', color: COLORS.gold, fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '2px' }}>
            Michigan Football Schedule →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: COLORS.green, padding: '64px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <img src="/photi-emblem.png" alt="Photi" width={80} height={80} style={{ marginBottom: '24px', borderRadius: '50%' }} />
          <h2 style={{ color: COLORS.gold, fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Ready to shop Ann Arbor like an Ann Arbor resident?</h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', marginBottom: '36px' }}>
            The right product for a Saturday at Zingerman&apos;s. The right microdose for a lecture you actually want to be awake for. The right flower before a slow afternoon at the Arb. Photi gets to what you need and points you at the right menu.
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
            <span style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents annarbordailydeals.com</span>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '13px' }}>Photi powered by MiQuest · hello@michigansdailydeals.com</p>
          <p style={{ color: COLORS.sage, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>For adults 21 and older. Please consume responsibly.</p>
        </div>
      </footer>
    </main>
  );
}
