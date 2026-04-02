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

const CATEGORIES = [
  { id: 'the-plant', label: 'The Plant', image: '/processes/the-plant.jpg' },
  { id: 'flower', label: 'Flower', image: '/processes/flower.jpg' },
  { id: 'concentrates', label: 'Concentrates', image: '/processes/concentrates.jpg' },
  { id: 'vapes', label: 'Vapes', image: '/processes/vapes.jpg' },
  { id: 'edibles', label: 'Edibles', image: '/processes/edibles.jpg' },
  { id: 'consumption', label: 'How to Consume', image: '/processes/consumption.jpg' },
];

const Quote = ({ children }: { children: React.ReactNode }) => (
  <div style={{ borderLeft: '3px solid #B5873A', paddingLeft: '20px', margin: '24px 0' }}>
    <p style={{ color: '#1E4D35', fontSize: '16px', lineHeight: '1.8', fontStyle: 'italic', margin: 0 }}>
      {children}
    </p>
  </div>
);

export default function ProcessesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main style={{ backgroundColor: '#1E4D35', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .page-hero { padding: 40px 24px 32px !important; }
          .page-hero h1 { font-size: 30px !important; }
          .page-hero p { font-size: 15px !important; }
          .content-section { padding: 40px 20px !important; }
          .content-section h2 { font-size: 26px !important; }
          .content-section p { font-size: 15px !important; }
          .category-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
          .section-layout { flex-direction: column !important; gap: 24px !important; }
          .section-img { min-width: unset !important; width: 100% !important; display: flex !important; justify-content: center !important; }
          .section-img img { width: 160px !important; height: 160px !important; }
          .header-outer { padding: 16px 24px !important; }
          .nav-guide { padding: 32px 20px 40px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      <header className="header-outer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', borderBottom: '1px solid rgba(181,135,58,0.15)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/photi-emblem.png" alt="Photi" width={40} height={40} style={{ borderRadius: '50%' }} />
          <span style={{ color: '#B5873A', fontSize: '20px', fontWeight: 'bold' }}>MiQuest</span>
        </Link>
        <nav className="desktop-nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="/about" style={{ color: '#F5F0E8', fontSize: '15px', textDecoration: 'none' }}>Who is Photi?</Link>
          <Link href="/terpenes" style={{ color: '#F5F0E8', fontSize: '15px', textDecoration: 'none' }}>Terpenes</Link>
          <Link href="/processes" style={{ color: '#B5873A', fontSize: '15px', textDecoration: 'none', borderBottom: '1px solid #B5873A', paddingBottom: '2px' }}>The Science</Link>
          <Link href="/deals" style={{ color: '#F5F0E8', fontSize: '15px', textDecoration: 'none' }}>Today&apos;s Deals</Link>
          <Link href="/chat" style={{ backgroundColor: '#B5873A', color: '#1E4D35', fontSize: '15px', fontWeight: 'bold', padding: '8px 20px', borderRadius: '20px', textDecoration: 'none' }}>Talk to Photi</Link>
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
          {[0,1,2].map(i => <div key={i} style={{ width: '24px', height: '2px', backgroundColor: '#B5873A' }} />)}
        </button>
      </header>

      {menuOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#163829', padding: '16px 24px 24px', borderBottom: '1px solid rgba(181,135,58,0.2)', gap: '16px' }}>
          <Link href="/about" style={{ color: '#F5F0E8', fontSize: '16px', textDecoration: 'none' }}>Who is Photi?</Link>
          <Link href="/terpenes" style={{ color: '#F5F0E8', fontSize: '16px', textDecoration: 'none' }}>Terpenes</Link>
          <Link href="/processes" style={{ color: '#B5873A', fontSize: '16px', textDecoration: 'none' }}>The Science</Link>
          <Link href="/deals" style={{ color: '#F5F0E8', fontSize: '16px', textDecoration: 'none' }}>Today&apos;s Deals</Link>
          <Link href="/chat" style={{ color: '#1E4D35', backgroundColor: '#B5873A', fontSize: '16px', fontWeight: 'bold', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }}>Talk to Photi</Link>
        </div>
      )}

      <section className="page-hero" style={{ padding: '64px 48px', textAlign: 'center' }}>
        <p style={{ color: '#B5873A', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>The Science</p>
        <h1 style={{ color: '#F5F0E8', fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2', maxWidth: '700px', margin: '0 auto 20px' }}>Understanding Cannabis</h1>
        <p style={{ color: '#9DC4B0', fontSize: '19px', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 16px' }}>
          A thousand products. A wall of options. Every category has a story — how it&apos;s made, what makes it different, and what it&apos;s actually going to feel like.
        </p>
        <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.8', maxWidth: '580px', margin: '0 auto', fontStyle: 'italic', opacity: 0.85 }}>
          Photi doesn&apos;t just know what&apos;s on the menu. They know how everything got there.
        </p>
      </section>

      <section className="nav-guide" style={{ backgroundColor: '#163829', padding: '48px 48px 56px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#B5873A', fontSize: '16px', letterSpacing: '4px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '32px', fontWeight: 'bold' }}>Explore the Guide</p>
          <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {CATEGORIES.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', gap: '10px' }}>
                  <img src={cat.image} alt={cat.label} width={90} height={90}
                    style={{ borderRadius: '50%', display: 'block', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }} />
                  <span style={{ color: '#B5873A', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center', lineHeight: '1.4' }}>{cat.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="the-plant" className="content-section" style={{ backgroundColor: '#F5F0E8', padding: '72px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-layout" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>
            <div className="section-img" style={{ minWidth: '220px', display: 'flex', justifyContent: 'center' }}>
              <img src="/processes/the-plant.jpg" alt="The Plant" style={{ width: '220px', height: '220px', borderRadius: '50%', display: 'block', boxShadow: '0 8px 32px rgba(30,77,53,0.25)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#B5873A', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Chapter One</p>
              <h2 style={{ color: '#1E4D35', fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>The Plant</h2>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}>Indica. Sativa. Hybrid. These labels are everywhere — and they mean less than you think. The indica/sativa distinction started as a botanical classification but became consumer shorthand. What actually determines your experience is the chemical profile: the specific combination of cannabinoids and terpenes in that particular cultivar, from that particular grow.</p>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}><strong style={{ color: '#1E4D35' }}>Indica</strong> — traditionally associated with body relaxation, sedation, couch lock. Shorter, bushier plants. Higher myrcene content in many cultivars. Evening use. The &ldquo;in da couch&rdquo; association isn&apos;t entirely wrong — but it&apos;s the terpenes doing that work, not the label.</p>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}><strong style={{ color: '#1E4D35' }}>Sativa</strong> — traditionally associated with uplifting, energetic, cerebral effects. Taller plants, longer flowering. Higher limonene and terpinolene in many cultivars. Daytime use. Again — the terpenes are the mechanism.</p>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}><strong style={{ color: '#1E4D35' }}>Hybrid</strong> — everything in between. Which is honestly most commercial cannabis today. Decades of crossbreeding means pure landrace strains are rare.</p>
              <Quote>&ldquo;Two products both labeled indica. One puts you to sleep. One has you anxious and wired. The label didn&apos;t change — the terpene profile did. This is why Photi asks about headspace before asking about indica or sativa.&rdquo;</Quote>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85' }}>The cannabis plant produces over 100 cannabinoids and 200+ terpenes. THC drives psychoactive effects. CBD modulates THC. CBG, CBN, THCV are minor cannabinoids with distinct profiles. Terpenes shape the character of the experience alongside all of them. This is the entourage effect — the whole plant chemistry working together.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="flower" className="content-section" style={{ padding: '72px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-layout" className="section-layout" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start', flexDirection: 'row-reverse' }}>
            <div className="section-img" style={{ minWidth: '220px', display: 'flex', justifyContent: 'center' }}>
              <img src="/processes/flower.jpg" alt="Flower" style={{ width: '220px', height: '220px', borderRadius: '50%', display: 'block', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#B5873A', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Chapter Two</p>
              <h2 style={{ color: '#F5F0E8', fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Flower</h2>
              <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}>The dried and cured bud of the cannabis plant. The most traditional consumption method and still the most popular in Michigan by volume. Simple in concept, complex in execution.</p>
              <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}>Quality flower comes from genetics, growing conditions, harvest timing, curing process, and storage — in roughly that order. A well-grown plant harvested at peak trichome development and cured properly will outperform a mediocre grow with a famous strain name every time.</p>
              <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}><strong style={{ color: '#B5873A' }}>What Photi looks for:</strong> Visible trichomes — the crystal-like structures that contain cannabinoids and terpenes. Complex aroma true to the cultivar. Appropriate moisture. Vibrant color. A processor with a track record.</p>
              <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}><strong style={{ color: '#B5873A' }}>THC percentage</strong> is the most marketed number in dispensaries and one of the least reliable indicators of experience quality. A 28% flower with a flat terpene profile often delivers less than a 19% flower with a rich, complex chemical makeup.</p>
              <div style={{ borderLeft: '3px solid #B5873A', paddingLeft: '20px', margin: '24px 0' }}>
                <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.8', fontStyle: 'italic', margin: 0 }}>&ldquo;THC percentage is like judging a coffee by caffeine content. It tells you something. It doesn&apos;t tell you whether it&apos;s going to be good. The fancy jar with the high number is not always the move.&rdquo;</p>
              </div>
              <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.85' }}>Flower gives you the most control over your experience — you decide how much, how fast, and you feel the effects within minutes. It&apos;s also the most social consumption method. There&apos;s a ritual to it that other formats don&apos;t replicate.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="concentrates" className="content-section" style={{ backgroundColor: '#F5F0E8', padding: '72px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-layout" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>
            <div className="section-img" style={{ minWidth: '220px', display: 'flex', justifyContent: 'center' }}>
              <img src="/processes/concentrates.jpg" alt="Concentrates" style={{ width: '220px', height: '220px', borderRadius: '50%', display: 'block', boxShadow: '0 8px 32px rgba(30,77,53,0.25)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#B5873A', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Chapter Three</p>
              <h2 style={{ color: '#1E4D35', fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Concentrates</h2>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}>Concentrated cannabis extracts remove plant material and isolate cannabinoids and terpenes. Significantly more potent than flower. How a concentrate is made tells you almost everything about what it will be like.</p>
              <p style={{ color: '#1E4D35', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px' }}>Solvent-Based</p>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}>Uses chemical solvents — butane (BHO), propane (PHO), ethanol, or CO2 — to extract cannabinoids and terpenes. Solvent is then purged. Final consistency varies by post-processing: <strong>shatter</strong> (glass-like), <strong>wax</strong> (soft and opaque), <strong>budder</strong> (whipped, creamy), <strong>crumble</strong> (dry), <strong>sauce</strong> (terpene-rich with crystalline THC).</p>
              <p style={{ color: '#1E4D35', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px' }}>Solventless</p>
              <p style={{ color: '#3D3D3A', fontSize: '15px', lineHeight: '1.85', marginBottom: '8px' }}><strong>Kief</strong> — trichome heads separated by agitation through fine screens. Entry-level solventless.</p>
              <p style={{ color: '#3D3D3A', fontSize: '15px', lineHeight: '1.85', marginBottom: '8px' }}><strong>Bubble Hash</strong> — plant material agitated in ice water, trichomes separated through progressively finer micron bags. 6-star full melt is among the most prized concentrates available.</p>
              <p style={{ color: '#3D3D3A', fontSize: '15px', lineHeight: '1.85', marginBottom: '16px' }}><strong>Rosin</strong> — heat and pressure only. No solvents. No additives. The purest expression of the plant&apos;s chemistry.</p>
              <p style={{ color: '#1E4D35', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px' }}>Live vs. Cured</p>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}><strong>Cured</strong> concentrates use dried cannabis — terpenes degrade during this process. <strong>Live</strong> concentrates use fresh-frozen plant material, preserving the terpene profile at peak.</p>
              <Quote>&ldquo;The word &lsquo;live&rsquo; on a concentrate label is not marketing. It means something specific: this was made from frozen fresh plant and the terpene profile you&apos;re tasting is the closest thing to what the plant smelled like in the field.&rdquo;</Quote>
            </div>
          </div>
        </div>
      </section>

      <section id="vapes" className="content-section" style={{ padding: '72px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-layout" className="section-layout" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start', flexDirection: 'row-reverse' }}>
            <div className="section-img" style={{ minWidth: '220px', display: 'flex', justifyContent: 'center' }}>
              <img src="/processes/vapes.jpg" alt="Vapes" style={{ width: '220px', height: '220px', borderRadius: '50%', display: 'block', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#B5873A', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Chapter Four</p>
              <h2 style={{ color: '#F5F0E8', fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Vapes</h2>
              <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.85', marginBottom: '20px' }}>Pre-filled cartridges of cannabis oil attached to a battery for vaporization. Convenient, discreet, consistent dosing. The most variable category in terms of quality — and the one where price difference is most meaningful.</p>
              {[
                { title: 'Distillate', price: '$', body: 'Highly refined oil, often 80-90% THC. Most terpenes removed in distillation. May be reintroduced — cannabis-derived (CDT) or botanical. Least expensive. Most common. Not bad — just the least complex experience.' },
                { title: 'Full-Spectrum', price: '$$', body: 'Preserves a broader range of cannabinoids and terpenes. Better entourage effect. More nuanced than distillate. A meaningful step up.' },
                { title: 'Live Resin', price: '$$$', body: 'Made from live (fresh-frozen) plant material. Premium terpene preservation. Best vape experience for flavor and full-spectrum effect without going solventless.' },
                { title: 'Live Rosin', price: '$$$$', body: 'Solventless live rosin in cartridge form. The highest expression of vape quality. Rare and expensive. If you want to taste the actual plant, this is it.' },
              ].map(({ title, price, body }) => (
                <div key={title} style={{ marginBottom: '16px', padding: '16px 20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '3px solid #B5873A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#B5873A', fontSize: '15px', fontWeight: 'bold' }}>{title}</span>
                    <span style={{ color: '#9DC4B0', fontSize: '13px', opacity: 0.7 }}>{price}</span>
                  </div>
                  <p style={{ color: '#9DC4B0', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{body}</p>
                </div>
              ))}
              <div style={{ borderLeft: '3px solid #B5873A', paddingLeft: '20px', margin: '24px 0' }}>
                <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.8', fontStyle: 'italic', margin: 0 }}>&ldquo;If a vape cart is priced at the bottom of the menu and the label doesn&apos;t specify — assume distillate with botanical terpenes added back. That&apos;s not a scandal. It&apos;s just what it is. If you want to taste the actual plant, look for live resin or live rosin and budget accordingly.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="edibles" className="content-section" style={{ backgroundColor: '#F5F0E8', padding: '72px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-layout" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>
            <div className="section-img" style={{ minWidth: '220px', display: 'flex', justifyContent: 'center' }}>
              <img src="/processes/edibles.jpg" alt="Edibles" style={{ width: '220px', height: '220px', borderRadius: '50%', display: 'block', boxShadow: '0 8px 32px rgba(30,77,53,0.25)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#B5873A', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Chapter Five</p>
              <h2 style={{ color: '#1E4D35', fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Edibles</h2>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}>Cannabis infused into food or drink. The most misunderstood product category and the one most responsible for difficult first experiences. The difference from inhaled cannabis is fundamental.</p>
              <div style={{ backgroundColor: 'rgba(181,135,58,0.08)', border: '1px solid rgba(181,135,58,0.25)', borderRadius: '10px', padding: '20px 24px', marginBottom: '20px' }}>
                <p style={{ color: '#1E4D35', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>The Liver Difference</p>
                <p style={{ color: '#3D3D3A', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>When cannabis is inhaled, THC enters the bloodstream through the lungs and reaches the brain in minutes. When eaten, THC is metabolized by the liver first — converting to 11-hydroxy-THC, which is more potent and longer lasting. Onset: 30 minutes to 2 hours. Duration: 4-8 hours.</p>
              </div>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '12px' }}><strong style={{ color: '#1E4D35' }}>Gummies</strong> — most popular format. Consistent dosing, easy to portion. Common doses: 2.5mg, 5mg, 10mg. <strong>5mg is a real dose for many people.</strong></p>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '12px' }}><strong style={{ color: '#1E4D35' }}>Hard Candies & Chocolates</strong> — similar onset to gummies. Chocolates may absorb slightly faster due to fat content.</p>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '12px' }}><strong style={{ color: '#1E4D35' }}>Beverages</strong> — often nano-emulsified for faster absorption. Onset 15-30 minutes. More predictable. Great for a social, beer-like experience.</p>
              <p style={{ color: '#3D3D3A', fontSize: '16px', lineHeight: '1.85', marginBottom: '16px' }}><strong style={{ color: '#1E4D35' }}>Ratio Products</strong> — THC:CBD ratios (1:1, 1:2, 2:1) produce different experiences. CBD modulates THC — often reducing anxiety while maintaining the body experience.</p>
              <Quote>&ldquo;Start low. Go slow. This is not a slogan — it is the actual advice. 5mg is a real dose for many people. 10mg is significant. The person who says edibles don&apos;t work on me and then eats 50mg is the person who calls someone three hours later.&rdquo;</Quote>
            </div>
          </div>
        </div>
      </section>

      <section id="consumption" className="content-section" style={{ padding: '72px 48px', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-layout" className="section-layout" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start', flexDirection: 'row-reverse' }}>
            <div className="section-img" style={{ minWidth: '220px', display: 'flex', justifyContent: 'center' }}>
              <img src="/processes/consumption.jpg" alt="How to Consume" style={{ width: '220px', height: '220px', borderRadius: '50%', display: 'block', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#B5873A', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Chapter Six</p>
              <h2 style={{ color: '#F5F0E8', fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>How to Consume Concentrates</h2>
              <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.85', marginBottom: '20px' }}>You found live rosin. Now what? Concentrates require a little more knowledge about equipment than flower or vapes. Here&apos;s the landscape.</p>
              {[
                { title: 'Dab Rig', body: 'A water pipe designed for concentrates. Uses a quartz banger heated with a torch. Full temperature control. The classic concentrate experience. Learning curve involved but the flavor at low temps is unmatched.' },
                { title: 'E-Rig (Electronic Rig)', body: 'Battery-powered with precise temperature control. No torch needed. Puffco Peak, Dr. Dabber Switch. Consistent temperature means consistent experience. More expensive upfront, much easier to use.' },
                { title: 'Dab Pen', body: 'Portable, pen-style device. Load wax, budder, or rosin directly into the chamber. Discreet and convenient. Less flavor complexity than a rig but a great entry point for concentrates.' },
                { title: 'Dry Herb Vaporizer', body: 'Heats flower to vaporization temperature without combustion. More terpene preservation, cleaner inhale. Volcano, Mighty, Dynavap. Not for concentrates unless specifically designed for both.' },
                { title: 'Temperature Matters', body: 'Low temp (315-450°F) — more terpenes, more flavor, lighter effect. High temp (450-600°F) — bigger hits, more sedating, less flavor nuance. Most experienced users prefer low-temp dabs.' },
              ].map(({ title, body }) => (
                <div key={title} style={{ marginBottom: '16px', padding: '16px 20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '3px solid rgba(181,135,58,0.5)' }}>
                  <p style={{ color: '#B5873A', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>{title}</p>
                  <p style={{ color: '#9DC4B0', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{body}</p>
                </div>
              ))}
              <div style={{ borderLeft: '3px solid #B5873A', paddingLeft: '20px', margin: '24px 0' }}>
                <p style={{ color: '#9DC4B0', fontSize: '16px', lineHeight: '1.8', fontStyle: 'italic', margin: 0 }}>&ldquo;Rosin is the thing I get unreasonably excited about. You take a plant, apply heat and pressure, and the oil just comes out. No chemistry lab. No solvents. Just physics and a really good starting material.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#163829', padding: '64px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <img src="/photi-emblem.png" alt="Photi" width={80} height={80} style={{ marginBottom: '24px', borderRadius: '50%' }} />
          <h2 style={{ color: '#B5873A', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Now you know the science.</h2>
          <p style={{ color: '#9DC4B0', fontSize: '17px', lineHeight: '1.8', marginBottom: '36px' }}>
            Talk to Photi and find the right product for your headspace tonight. The knowledge is interesting. The right product is the point.
          </p>
          <Link href="/chat" style={{ backgroundColor: '#B5873A', color: '#1E4D35', fontSize: '18px', fontWeight: 'bold', padding: '16px 48px', borderRadius: '50px', textDecoration: 'none', display: 'inline-block' }}>
            Talk to Photi
          </Link>
        </div>
      </section>

      <footer style={{ backgroundColor: '#1E4D35', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/photi-emblem.png" alt="Photi" width={28} height={28} style={{ borderRadius: '50%' }} />
            <span style={{ color: '#B5873A', fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents michigansdailydeals.com</span>
          </div>
          <p style={{ color: '#9DC4B0', fontSize: '13px' }}>Photi powered by MiQuest · hello@michigansdailydeals.com</p>
          <p style={{ color: '#9DC4B0', fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>For adults 21 and older. Please consume responsibly.</p>
        </div>
      </footer>
    </main>
  );
}
