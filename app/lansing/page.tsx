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

// SPOTLIGHT — Pure Options Lansing South
const SPOTLIGHT = {
  name: 'Pure Options — Lansing South',
  tagline: "The flagship. Four Pure Options locations in Greater Lansing — this is the original, and where the Pro Gro story is most fully told.",
  description: "Pure Options is the retail arm of the Pro Gro operation — Michigan's most decorated cannabis brand, grown right here in Lansing in the former Pro Bowl bowling alley on Martin Luther King Jr. Boulevard. Lansing South at 5815 S Pennsylvania Ave is the anchor location: longest-running, most consistent, and the place where the city's cannabis community has been voting with its dollars since the early days of Michigan's recreational market. Three additional Pure Options locations serve the greater area — Lansing Midtown (500 E Oakland Ave), Lansing North (2905 N East St), and East Lansing/Frandor (125 N Clippert St). The Midtown location is where Pro Gro sells cannabis clones to the cultivation community — you can actually buy a start from the same genetics that win Top of the Town awards. That's vertical integration that goes all the way down to the hobbyist grower.",
  address: '5815 S Pennsylvania Ave, Lansing, MI 48911',
  hours: '9am–9pm daily',
  phone: '(517) 580-5950',
  url: 'https://pureoptions.com/',
};

// FEATURED DISPENSARIES
const FEATURED_DISPENSARIES = [
  {
    name: 'Homegrown Cannabis Company',
    address: 'Greater Lansing area',
    hours: '10am–9:45pm daily',
    url: 'https://homegrowncannabisco.com/',
    note: "Ranked #1 in Lansing by community review — not by a paid algorithm, by the people who actually shop there. Homegrown's name is the philosophy: community-first, locally operated, built around the customer who wants to be treated like a regular rather than a transaction. Staff is consistently praised for knowing their product and taking time with questions. The kind of place that earns repeat customers who could go anywhere.",
  },
  {
    name: 'Fortuo',
    address: 'Lansing, MI',
    hours: 'Thu–Sat, check hours',
    url: 'https://www.fortuo.com/',
    note: "The most interesting origin story of any dispensary in Lansing: the founder grew up in this city, sold cannabis on its streets, and eventually became a licensed cultivator and retailer — building a business where the laws he once navigated around are the framework he now operates inside. Fortuo is a single-location small business with in-house cultivation, no pesticides, and no remediated product. They pass the savings of eliminating the middleman directly to the buyer. The mission is craft quality without a craft price tag, and they mean it.",
  },
  {
    name: 'House of Dank — Lansing',
    address: 'Lansing, MI',
    hours: '10am–9pm daily',
    url: 'https://houseofdank.com/',
    note: "The Lansing location of a respected Michigan chain — twelve locations statewide, each staffed by people described consistently as knowledgeable and patient. House of Dank carries the full spectrum: flower, pre-rolls, vaporizers, concentrates, tinctures, edibles, topicals. The in-store experts are trained to help you find the right product for your needs rather than the most expensive one on the shelf. The choice for the Lansing visitor who wants depth of selection with someone on staff who can help navigate it.",
  },
];

// FEATURED BRANDS
const FEATURED_BRANDS = [
  {
    name: 'Pro Gro',
    description: "Lansing's own. Founded by Sam Usman Jr. — East Lansing native, MSU grad, Colorado cannabis investor who came home — Pro Gro began as a 72-plant caregiver project under Michigan's 2008 Medical Marijuana Act and grew into Michigan's most decorated cultivation brand. The 10,000-plant facility in the former Pro Bowl bowling alley at 2122 N Martin Luther King Jr. Blvd is one of the most remarkable buildings in Michigan cannabis. The company name comes from the building. The culture comes from Lansing. City Pulse readers voted them Best Cannabis Growing Brand and Best Retail Location in 2025's Top of the Town — for the second consecutive year.",
    url: 'https://progrocannabis.com/',
    lookFor: [
      { product: 'Moonbow #112 Flower 3.5g', category: 'Flower', note: 'Zkittlez × Do Si Dos. Sugar, sour fruit, baking spice on the nose. Relaxing and happy. One of Pro Gro\'s most expressive phenotypes.' },
      { product: 'GMO Flower 3.5g', category: 'Flower', note: 'Garlic, mushroom, onion — the classic funky savory profile. Heavy indica. A 2022 High Times Cannabis Cup winner. The strain Pro Gro built their reputation on.' },
      { product: 'Rainbow Belts Concentrate 1g', category: 'Concentrate', note: '2025 Best Solvent Concentrate — Top of the Town. Sweet, soapy candy profile with deep sedation. The extract that proved Lansing can compete at the top of the state.' },
      { product: 'M5 Flower 3.5g', category: 'Flower', note: 'A Pro Gro signature — the kind of named internal phenotype that serious flower buyers seek out specifically. Ask what M5 is hitting like right now.' },
    ],
  },
  {
    name: 'Mitten Extracts',
    description: "Michigan's most recognized vape brand, built in Metro Detroit and distributed statewide. Five-times-distilled oil, ceramic coils, no fillers, no Vitamin E acetate. Their Gelato #33 distillate cartridge is the #1-selling Mitten Extracts product in Michigan month after month. For the Lansing buyer who wants a reliable, clean, affordable vape experience without a science degree — Mitten is the answer that doesn't require explanation.",
    url: 'https://mittenextracts.com/',
    lookFor: [
      { product: 'Gelato #33 Distillate Cart 1g', category: 'Vape', note: 'Michigan\'s #1 cart. Five-times-distilled, ceramic coil, clean hit. The reliable baseline that makes everything else make sense.' },
      { product: 'Mitten+ PLUS Disposable 1g', category: 'Vape', note: 'Premium distillate + live resin terpenes in a rechargeable disposable. Step up from a standard cart without stepping into rosin territory.' },
      { product: 'Liquid Diamond Infused Pre-Rolls', category: 'Pre-Roll', note: 'Indoor flower infused with liquid diamonds and coated in kief. Reddit\'s r/Michigents called the Gushers variety the best infused pre-roll of 2025.' },
      { product: 'Live Resin Concentrate 1g', category: 'Concentrate', note: 'Fresh-frozen flower, full-spectrum terpene preservation. The entry point for Mitten buyers ready to step from vapes into proper dabs.' },
    ],
  },
  {
    name: 'Eastside Alchemy',
    description: "Lansing's own craft rosin operation. Small team, serious focus — Eastside Alchemy does nothing but live rosin, and it shows. Detroit Metro Times named them one of Michigan's 15 cannabis brands that consistently deliver quality, describing their drops as 'fresh, flavorful, and consistent.' This is the Lansing brand that proves the city isn't just where cannabis laws are written and where Pro Gro grows — it's also where a small crew of dedicated extractors is making some of the best solventless concentrate in the state, quietly, without much fanfare. The connoisseur's Lansing pick.",
    url: null,
    lookFor: [
      { product: 'Live Rosin — current drop', category: 'Concentrate', note: 'Ask what\'s fresh. Eastside Alchemy drops in small batches, strain-specific, always from fresh-frozen material. The menu changes with each harvest.' },
      { product: 'Pomelo Punch Live Rosin 1g', category: 'Concentrate', note: 'Cited by Detroit Metro Times as a standout expression. Bright citrus, full-spectrum, clean finish. Check availability.' },
      { product: 'Rosin Badder — seasonal', category: 'Concentrate', note: 'Cold-cured from single-origin genetics. When it\'s on the menu, it\'s worth the price.' },
      { product: 'Rosin Cartridge 1g', category: 'Vape', note: 'True solventless rosin in cart form. Rare in this price tier. Eastside Alchemy occasionally drops these — watch the dispensary menus.' },
    ],
  },
  {
    name: 'Pleasanteas',
    description: "Michigan-made cannabis tea from Emerald Canning in Mt. Clemens. Exactly 10mg THC per can, nano-emulsified for fast onset (15–30 minutes, vs. 60–120 for standard edibles), no alcohol, no crash. Three flavors: Raspberry, Peach, Lemon. For the Lansing buyer who wants to enjoy cannabis the way they'd enjoy a beer at Old Town — socially, measurably, and without waking up wondering what happened. Cannabis at the State Capitol has been argued about in policy terms for twenty years. Pleasanteas makes the case in the most practical terms possible: a 10mg can that tastes good and works when they said it would.",
    url: 'https://pleasanteas.com/',
    lookFor: [
      { product: 'Raspberry Tea 10mg', category: 'Beverage', note: 'The flagship flavor. Nano-emulsified — onset in 15–30 minutes. Clean, tart, no cannabis aftertaste.' },
      { product: 'Peach Tea 10mg', category: 'Beverage', note: 'The smoothest of the three. Great intro for cannabis-curious friends who aren\'t ready for flower.' },
      { product: 'Lemon Tea 10mg', category: 'Beverage', note: 'Bright, citrus-forward. The daytime flavor. Pairs well with a River Trail walk or a Capitol tour.' },
      { product: 'Mixed 4-pack', category: 'Beverage', note: 'When available — one of each flavor plus a wildcard. The ideal way to try the range without committing to a full case.' },
    ],
  },
];

const FOOD = [
  {
    name: 'Bowdies Chophouse',
    address: 'Downtown Lansing',
    hours: 'Dinner nightly, lunch weekdays',
    note: "Downtown Lansing's anchor fine-dining spot — prime steaks, gourmet cocktails, intimate room. Located across from the convention center and a few blocks from the Capitol. The place where state legislators and cannabis lobbyists eat dinner at adjacent tables without acknowledging each other. Reservations recommended.",
  },
  {
    name: "The People's Kitchen",
    address: 'Lansing',
    hours: 'Lunch and dinner',
    note: "Contemporary American, local sourcing, fun atmosphere. Upscale cuisine with craft cocktails and rotating local artist gallery as décor. The kind of restaurant that feels like the city it's in — creative, unpretentious, locally rooted. One of the best meals in Lansing for a city the size of Lansing.",
  },
  {
    name: 'Strange Matter Coffee',
    address: 'East Side, Lansing',
    hours: 'Morning and afternoon daily',
    note: "The east side indie coffee anchor. On the same stretch as the Green Door and Avenue Café that gives Lansing's east side its eclectic independent-business identity. Strange Matter is where the Lansing creative class starts its day. Good coffee, good people, the right energy before a walk or a dispensary run.",
  },
  {
    name: 'Old Town Lansing',
    address: 'North Lansing, along Turner St',
    hours: 'Varies by venue',
    note: "Lansing's historic neighborhood turned dining and arts district. The original small-town main street energy that the rest of downtown eventually built toward. BBQ, famous breakfast spots, local breweries, galleries. Saturday morning in Old Town is Lansing at its most itself — unhurried, local, honest. Start here before anything else.",
  },
];

const EXPLORE = [
  {
    name: 'Michigan State Capitol',
    address: '100 N Capitol Ave',
    desc: "Where Michigan's cannabis laws were debated, written, passed, and are currently being argued over again. The building that oversaw the 2008 Medical Marijuana Act, the 2018 Proposition 1 recreational vote, and the ongoing cannabis tax battles that Sam Usman Jr. and MiCIA are currently fighting. Free guided tours Monday through Friday — the interior is one of the most beautiful in the country and almost no one outside Lansing knows it. The rotunda dome is Italian Renaissance. The cast-iron staircases are original. Worth ninety minutes of any visit.",
    tip: "Tours run Mon–Fri, free, no reservation required. Go in the morning before the legislative sessions get loud.",
    url: 'https://www.michigan.gov/capitol',
  },
  {
    name: 'Michigan History Museum',
    address: '702 W Kalamazoo St',
    desc: "The definitive museum of Michigan's story — automotive, industrial, Great Lakes, and increasingly, agricultural and cannabis history. Several permanent exhibits on Michigan's cultural and economic development that put Lansing's role in the state in genuine context. Free admission. Directly adjacent to the Capitol campus.",
    tip: "The timeline of Michigan's industrial history in the main hall is surprisingly moving. Give it more time than you think you need.",
    url: 'https://www.michigan.gov/mhc/museums',
  },
  {
    name: 'Lansing River Trail',
    address: 'Runs through downtown along the Grand River',
    desc: "Twenty miles of paved trail along the Grand River, connecting Old Town to REO Town to the Capital Area to Potter Park and beyond. The spine of Lansing's outdoor identity. Flat, accessible, beautiful in every season. The stretch through downtown puts you within view of both the Capitol and the river simultaneously. Rent a bike or just walk the downtown section.",
    tip: "The REO Town stretch (south of downtown, named for Ransom Olds' car company) is quieter than downtown and shows you Lansing's industrial history in the riverfront context.",
    url: 'https://www.lmb.org/river-trail/',
  },
  {
    name: 'Impression 5 Science Center',
    address: '200 Museum Dr',
    desc: "Hands-on science museum on the River Trail, one of the best family destinations in mid-Michigan. Over 200 interactive exhibits. Worth knowing about whether you have kids with you or not — the water science section is more impressive than you'd expect. Good stop on a River Trail walk.",
    tip: "Combine it with a River Trail walk. It's directly on the path.",
    url: 'https://impression5.org/',
  },
  {
    name: 'Potter Park Zoo',
    address: '1301 S Pennsylvania Ave',
    desc: "A legitimate regional zoo on the Red Cedar River — big cats, giraffes, river otters, a carousel. Modest and excellent. The kind of zoo that surprises you. Open year-round. Close to Lansing South dispensary if you're making an itinerary.",
    tip: "The river otter exhibit is the sleeper hit. Budget two hours.",
    url: 'https://www.potterparkzoo.org/',
  },
  {
    name: 'REO Town',
    address: 'South Lansing along Washington Ave',
    desc: "Named for Ransom E. Olds — the man who built the first American automobile factory in Lansing in 1897, before moving to Detroit. REO Town is Lansing's arts and creative district: galleries, music venues, small restaurants, murals. The neighborhood that's becoming what it was always supposed to be.",
    tip: "The R.E. Olds Transportation Museum is nearby (211 Museum Dr) — genuinely worth an hour for anyone interested in automotive history, which is Michigan's origin story.",
    url: 'https://www.reotownlansing.com/',
  },
];

export default function LansingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [weather, setWeather] = useState<{ temp: string; condition: string; icon: string } | null>(null);

  useEffect(() => {
    fetch('https://wttr.in/Lansing,MI?format=j1')
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
          .capital-story { padding: 40px 24px !important; }
          .capital-story h2 { font-size: 28px !important; }
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
            src="/city/lansing.jpg"
            alt="Lansing Michigan — Michigan State Capitol with Grand River and oak trees"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Michigan&apos;s Capital City</p>
        <h1 style={{ color: COLORS.cream, fontSize: '52px', fontWeight: 'bold', lineHeight: '1.15', maxWidth: '760px', margin: '0 auto 16px' }}>
          Welcome to Lansterdam.
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '18px', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 20px' }}>
          Where Michigan cannabis is made — legally and literally. The state capital, the CRA offices, the MiCIA meetings, and the Pro Bowl bowling alley with 10,000 plants growing inside. Lansing doesn&apos;t just talk about cannabis. It grows it, regulates it, and refines it.
        </p>

        {weather && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(181,135,58,0.1)', border: '1px solid rgba(181,135,58,0.25)', borderRadius: '50px', padding: '8px 20px', marginBottom: '32px' }}>
            <span style={{ fontSize: '18px' }}>{weather.icon}</span>
            <span style={{ color: COLORS.gold, fontSize: '15px' }}>Lansing right now: {weather.temp} · {weather.condition}</span>
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

      {/* CAPITAL CITY STORY — unique editorial section */}
      <section className="capital-story content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>The Capital City Story</p>
          <h2 style={{ color: COLORS.green, fontSize: '36px', fontWeight: 'bold', marginBottom: '28px', lineHeight: '1.25' }}>
            This is where the Michigan cannabis industry actually lives.
          </h2>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            The Michigan Cannabis Regulatory Agency — the state body that licenses every dispensary, cultivator, and processor in Michigan — is headquartered in Lansing. The Michigan Cannabis Industry Association, which lobbies on behalf of the industry and is currently fighting a proposed cannabis excise tax that operators argue would push consumers back to the illicit market, is headquartered in Lansing. The Capitol building where the 2008 Michigan Medical Marijuana Act was debated, where Proposition 1 passed in 2018, and where the next round of cannabis legislation will be argued — that is in Lansing. When Michigan&apos;s cannabis industry is in crisis or celebration, it is in Lansing that the response gets organized.
          </p>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            Sam Usman Jr. grew up in East Lansing, graduated from Michigan State University, went to Colorado to learn the cannabis business before Michigan had a real commercial market, and came home. In 2011 he founded what would become Pro Gro — starting as a 72-plant medical caregiver operation under the 2008 MMMA. When he acquired a bowling alley called Pro Bowl on North Martin Luther King Jr. Boulevard, he named the company after it. That facility now grows over 10,000 cannabis plants under one roof, employs close to 300 people — most of whom live in Lansing — and supplies the Pure Options retail network that City Pulse readers have voted the best cannabis brand in the city two consecutive years. Usman is also a board member of MiCIA, the industry association, and one of the most visible advocates for fair cannabis tax policy in Lansing. The grower and the policy voice are the same person. That only happens in a capital city.
          </p>

          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '28px' }}>
            Locals have been calling this city Lansterdam for years. The nickname is earned. When you walk into a Pure Options in Lansing, the flower on the shelf was grown ten minutes away, by a company started by a guy who went to MSU, in a building Lansing residents remember as the bowling alley where they threw league nights. That&apos;s not a brand story. That&apos;s Lansing.
          </p>

          <p style={{ color: COLORS.green, fontSize: '19px', lineHeight: '1.8', fontWeight: 'bold', fontStyle: 'italic' }}>
            Ann Arbor owns the history of cannabis in Michigan. Detroit owns the market. Lansing owns the industry itself.
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
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Lansing Cannabis</p>
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Featured Dispensaries</h2>
            </div>
          </div>
          <p style={{ color: COLORS.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '36px', maxWidth: '680px' }}>
            Lansing has more cannabis dispensaries than most Michigan cities its size — over 50 in the greater area. These three represent three different reasons to walk in: community trust earned over time, a founder&apos;s story worth knowing, and the depth of selection for anyone who wants to see the full range.
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
          <div style={{ textAlign: 'center', padding: '28px', backgroundColor: 'rgba(30,77,53,0.05)', borderRadius: '12px', border: '1px solid rgba(30,77,53,0.1)' }}>
            <p style={{ color: COLORS.green, fontSize: '16px', marginBottom: '8px' }}>
              Not sure which dispensary fits what you need today?
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
            Two of these four brands are Lansing originals. One is Michigan&apos;s most recognized vape brand. One is the Michigan cannabis beverage that makes the case for the category better than anything else on the market. Together they cover the Lansing buyer from the flower purist to the Capitol staffer who wants a 10mg tea with their lunch.
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

      {/* TOP OF THE TOWN — editorial callout */}
      <section className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>WKAR · City Pulse · 2025</p>
          <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.25' }}>
            Lansterdam&apos;s Top of the Town.
          </h2>
          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            Every year, WKAR and City Pulse — Lansing&apos;s most respected independent news organization — run a community-wide Best of Lansing survey called Top of the Town. Lansing residents vote. The results are genuinely reflective of local opinion, not sponsored placement. In 2025, the cannabis category was not close.
          </p>
          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '28px' }}>
            Pro Gro and Pure Options swept the field: Best Cannabis Growing Brand went to Pro Gro. Best Retail Location went to Pure Options. The Lansing Midtown location took Best Indoor Grow Store. Their Rainbow Belts concentrate won Best Solvent Concentrate — validated by the same people who shop there every week, not by a trade publication judging panel. Two consecutive Top of the Town sweeps. In a market with over fifty dispensaries competing for the same customer. The locals have decided.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {[
              { award: 'Best Cannabis Growing Brand', winner: 'Pro Gro', detail: '2nd consecutive year' },
              { award: 'Best Retail Location', winner: 'Pure Options', detail: 'City-wide vote' },
              { award: 'Best Indoor Grow Store', winner: 'Pure Options Midtown', detail: 'Cannabis clone sales' },
              { award: 'Best Solvent Concentrate', winner: 'Rainbow Belts by Pro Gro', detail: 'Community judged' },
            ].map(a => (
              <div key={a.award} style={{ backgroundColor: 'rgba(30,77,53,0.06)', borderRadius: '10px', padding: '20px', border: '1px solid rgba(30,77,53,0.12)' }}>
                <p style={{ color: COLORS.gold, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{a.award}</p>
                <p style={{ color: COLORS.green, fontSize: '17px', fontWeight: 'bold', marginBottom: '4px' }}>{a.winner}</p>
                <p style={{ color: COLORS.text, fontSize: '12px', opacity: 0.6 }}>{a.detail}</p>
              </div>
            ))}
          </div>

          <p style={{ color: COLORS.green, fontSize: '17px', lineHeight: '1.75', fontWeight: 'bold' }}>
            You can&apos;t buy this kind of credibility. You grow it, from a building on Martin Luther King Jr. Boulevard, for fifteen years.
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
              <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Eat Lansing</p>
              <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Where to Eat in Lansterdam</h2>
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
              <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>Lansing Worth Seeing</h2>
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

      {/* MSU / East Lansing */}
      <section className="content-section" style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Green and White</p>
          <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.25' }}>
            Michigan State and East Lansing.
          </h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            Michigan State University sits in East Lansing — directly adjacent to the capital city, connected by the Michigan Ave corridor. 50,000 students. Spartan Stadium holds 75,000 for football Saturdays. Tom Izzo&apos;s Breslin Center is one of the loudest arenas in the Big Ten for basketball. The Wharton Center for Performing Arts brings Broadway and jazz to mid-Michigan. The Eli and Edythe Broad Art Museum — designed by Zaha Hadid, open and free — is one of the most architecturally striking buildings in any university in the country.
          </p>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            The MSU Dairy Store on campus sells what is, without much serious competition, the best ice cream in Michigan. Students have been going there for a hundred years. The flavors rotate seasonally, the lines are real, and it costs less than four dollars. Do not miss it if you are in East Lansing.
          </p>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '28px' }}>
            The Michigan Ave corridor — running from the Capitol building west into campus — is Lansing&apos;s main artery. Walk it. Bike it. Every few blocks something changes: the character of the businesses, the mix of students and staffers and longtime residents. The whole city is visible from that one road.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://msuspartans.com/" target="_blank" rel="noopener noreferrer"
              style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '2px' }}>
              MSU Sports Schedule →
            </a>
            <a href="https://broadmuseum.msu.edu/" target="_blank" rel="noopener noreferrer"
              style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '2px' }}>
              Broad Art Museum →
            </a>
            <a href="https://dairystore.msu.edu/" target="_blank" rel="noopener noreferrer"
              style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '2px' }}>
              MSU Dairy Store →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: COLORS.green, padding: '64px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <img src="/photi-emblem.png" alt="Photi" width={80} height={80} style={{ marginBottom: '24px', borderRadius: '50%' }} />
          <h2 style={{ color: COLORS.gold, fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Ready to shop Lansing like someone who actually lives here?</h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', marginBottom: '36px' }}>
            The right Pro Gro flower for a Saturday at Spartan Stadium. The right Mitten Extracts cart for a walk on the River Trail. The right Pleasanteas for a slow morning in Old Town. Photi knows Lansing and knows the products — ask and get pointed at exactly the right menu.
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
            <span style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents michigansdailydeals.com</span>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '13px' }}>Photi powered by MiQuest · hello@michigansdailydeals.com</p>
          <p style={{ color: COLORS.sage, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>For adults 21 and older. Please consume responsibly.</p>
        </div>
      </footer>
    </main>
  );
}
