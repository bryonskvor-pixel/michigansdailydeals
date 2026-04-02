"use client";
import { useState } from "react";
import Image from "next/image";
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

const TERPENES = [
  {
    name: 'Myrcene',
    image: '/terpenes/myrcene.jpg',
    aroma: 'Earthy, musky, herbal — like cloves or fresh mango',
    foundIn: 'Mango, hops, lemongrass, thyme',
    tendency: 'Calm, heavy, restful. Evening use. Body-forward. The most common terpene in commercial cannabis.',
    quote: "If you've ever eaten a mango before consuming cannabis and noticed stronger effects — that's myrcene. Same compound, different plant.",
    headspace: 'restful',
    color: '#8B6914',
    strains: [],
  },
  {
    name: 'Limonene',
    image: '/terpenes/limonene.jpg',
    aroma: 'Bright citrus — lemon, orange, grapefruit',
    foundIn: 'Citrus rinds, juniper, peppermint',
    tendency: 'Bright, social, mood-lifted. Daytime. Creative. Uplifting without being overwhelming.',
    quote: "Limonene is the terpene that makes a strain feel like sunshine. If you're going into something social or creative and you want to feel up rather than heavy, look for it.",
    headspace: 'energetic',
    color: '#C49A1A',
    strains: [],
  },
  {
    name: 'Caryophyllene',
    image: '/terpenes/caryophyllene.jpg',
    aroma: 'Spicy, peppery, woody — like black pepper or cloves',
    foundIn: 'Black pepper, cloves, cinnamon, hops',
    tendency: 'Grounding, calming, potentially anti-inflammatory. The only terpene that binds directly to cannabinoid receptors.',
    quote: "Caryophyllene is the overachiever of terpenes. Every other terpene works indirectly. This one actually binds to your cannabinoid receptors directly. Next time you smell black pepper — you're smelling a cannabinoid.",
    headspace: 'balanced',
    color: '#6B4C8A',
    strains: [],
  },
  {
    name: 'Linalool',
    image: '/terpenes/linalool.jpg',
    aroma: 'Floral, lavender, slightly spicy',
    foundIn: 'Lavender, coriander, birch trees',
    tendency: 'Soft, calming, sleep-supportive. Evening. Anxiety relief. Gentle and approachable.',
    quote: "Linalool is why your grandmother's lavender sachets actually worked. Same compound. Cannabis just delivers it differently.",
    headspace: 'restful',
    color: '#7B5EA7',
    strains: [],
  },
  {
    name: 'Pinene',
    image: '/terpenes/pinene.jpg',
    aroma: 'Sharp, fresh pine — like a forest after rain',
    foundIn: 'Pine trees, rosemary, basil, dill',
    tendency: 'Alert, focused, clear. Daytime. Functional. May counteract some short-term memory effects of THC.',
    quote: "Pinene is the terpene for people who want to think while they're high. It's one of the reasons some strains feel sharp and functional while others feel foggy — the pinene content is often the difference.",
    headspace: 'energetic',
    color: '#2D6A4F',
    strains: [],
  },
  {
    name: 'Terpinolene',
    image: '/terpenes/terpinolene.jpg',
    aroma: 'Fresh, floral, slightly herbal and citrusy — complex and hard to pin down',
    foundIn: 'Apples, lilac, tea tree, nutmeg',
    tendency: 'Creative, energetic, cerebral. Daytime. The hidden gem. Lifts without scattering.',
    quote: "Terpinolene strains tend to be the ones people describe as 'different' without being able to say exactly why. The ones who find it become evangelists for it.",
    headspace: 'creative',
    color: '#4A7C59',
    strains: [],
  },
  {
    name: 'Humulene',
    image: '/terpenes/humulene.jpg',
    aroma: 'Earthy, woody, subtly hoppy',
    foundIn: 'Hops, ginseng, cloves, basil',
    tendency: 'Grounding, anti-inflammatory, appetite-neutral. Often found alongside caryophyllene.',
    quote: "Humulene is the quiet one in the room that actually knows the most. No drama, just grounding. And it's the rare terpene that won't have you raiding the kitchen.",
    headspace: 'balanced',
    color: '#6B5C3E',
    strains: [],
  },
  {
    name: 'Ocimene',
    image: '/terpenes/ocimene.jpg',
    aroma: 'Sweet, herbal, woody with tropical notes',
    foundIn: 'Mint, parsley, orchids, basil',
    tendency: 'Light, uplifting, social. Less studied but increasingly present in premium cultivar profiles.',
    quote: "Ocimene is the terpene you find in something that smells unlike anything else you've tried. Fresh and tropical in a way that's hard to describe until you smell it.",
    headspace: 'fun',
    color: '#3D7A6B',
    strains: [],
  },
  {
    name: 'Bisabolol',
    image: '/terpenes/bisabolol.jpg',
    aroma: 'Delicate floral, slightly sweet — similar to chamomile',
    foundIn: 'Chamomile, candeia tree',
    tendency: 'Gentle, calming, approachable. Best for newer consumers or anyone who tends toward anxiety.',
    quote: "If someone tells me they're new or anxious about cannabis, I look for bisabolol and linalool in the profile. Those are the terpenes that tend toward gentle.",
    headspace: 'restful',
    color: '#8B7A3A',
    strains: [],
  },
  {
    name: 'Valencene',
    image: '/terpenes/valencene.jpg',
    aroma: 'Fresh citrus, orange peel, slightly woody',
    foundIn: 'Valencia oranges',
    tendency: 'Fresh, social, uplifting. A clean citrus character distinct from limonene\'s sharper lemon quality.',
    quote: "Valencene is limonene's more relaxed cousin. Same citrus family, different character — rounder, sweeter, less sharp. Great for social situations where you want to be present without being wired.",
    headspace: 'fun',
    color: '#C47A1A',
    strains: [],
  },
  {
    name: 'Geraniol',
    image: '/terpenes/geraniol.jpg',
    aroma: 'Floral, rose-like, fruity',
    foundIn: 'Roses, geraniums, lemon',
    tendency: 'Relaxing, distinctive, evening. Strains with notable geraniol have an unusually floral character that people remember.',
    quote: "Geraniol strains are the ones people describe as smelling like a flower shop. It's distinctive enough that once you know it, you recognize it immediately — and you understand why some people seek it out specifically.",
    headspace: 'restful',
    color: '#9A4A6A',
    strains: [],
  },
];

const headspaceLabel: Record<string, { label: string; color: string }> = {
  restful: { label: 'Restful', color: '#4A7C59' },
  energetic: { label: 'Energetic', color: '#C49A1A' },
  creative: { label: 'Creative', color: '#6B5C8A' },
  balanced: { label: 'Balanced', color: '#4A7A7A' },
  fun: { label: 'Fun', color: '#C47A1A' },
};

export default function TerpenesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main style={{ backgroundColor: COLORS.green, minHeight: '100vh', fontFamily: S.font }}>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: ${menuOpen ? 'flex' : 'none'} !important; }
          .header-outer { padding: 16px 24px !important; }
          .terpene-hero { padding: 40px 24px !important; }
          .terpene-hero h1 { font-size: 32px !important; }
          .terpene-hero p { font-size: 15px !important; }
          .intro-section { padding: 40px 24px !important; }
          .intro-section h2 { font-size: 24px !important; }
          .intro-section p { font-size: 15px !important; }
          .terpene-cards { padding: 32px 16px !important; }
          .terpene-card { flex-direction: column !important; }
          .terpene-card-reverse { flex-direction: column !important; }
          .terpene-card-img { width: 100% !important; padding: 24px 24px 8px !important; }
          .terpene-card-img img { width: 140px !important; height: 140px !important; }
          .terpene-card-content { padding: 16px 24px 28px !important; }
          .terpene-card-title { font-size: 26px !important; }
          .cta-section { padding: 48px 24px !important; }
          .cta-section h2 { font-size: 26px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="header-outer" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 48px', borderBottom: '1px solid rgba(181,135,58,0.15)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <Image src="/photi-emblem.png" alt="Photi" width={40} height={40} />
          <span style={{ color: COLORS.gold, fontSize: '20px', fontWeight: 'bold' }}>MiQuest</span>
        </Link>
        <nav className="desktop-nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="/about" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Who is Photi?</Link>
          <Link href="/terpenes" style={{ color: COLORS.gold, fontSize: '15px', textDecoration: 'none', borderBottom: `1px solid ${COLORS.gold}`, paddingBottom: '2px' }}>Terpenes</Link>
          <Link href="/processes" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>The Science</Link>
          <Link href="/deals" style={{ color: COLORS.cream, fontSize: '15px', textDecoration: 'none' }}>Today&apos;s Deals</Link>
          <Link href="/chat" style={{
            backgroundColor: COLORS.gold, color: COLORS.green,
            fontSize: '15px', fontWeight: 'bold', padding: '8px 20px',
            borderRadius: '20px', textDecoration: 'none',
          }}>Talk to Photi</Link>
        </nav>
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: '24px', height: '2px', backgroundColor: COLORS.gold }} />
          ))}
        </button>
      </header>

      <div className="mobile-menu" style={{
        display: 'none', flexDirection: 'column',
        backgroundColor: COLORS.darkGreen,
        padding: '16px 24px 24px',
        borderBottom: `1px solid rgba(181,135,58,0.2)`,
        gap: '16px',
      }}>
        <Link href="/about" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Who is Photi?</Link>
        <Link href="/terpenes" style={{ color: COLORS.gold, fontSize: '16px', textDecoration: 'none' }}>Terpenes</Link>
        <Link href="/processes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>The Science</Link>
        <Link href="/deals" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Today&apos;s Deals</Link>
        <Link href="/chat" style={{
          color: COLORS.green, backgroundColor: COLORS.gold,
          fontSize: '16px', fontWeight: 'bold',
          padding: '12px 24px', borderRadius: '50px', textDecoration: 'none',
          textAlign: 'center',
        }}>Talk to Photi</Link>
      </div>

      {/* Hero */}
      <section style={{ padding: '64px 48px 48px', textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <img
            src="/terpenes/cards/card-bouquet.jpg"
            alt="Terpene Bouquet"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '12px',
              display: 'block',
              boxShadow: '0 8px 40px rgba(181,135,58,0.4)',
            }}
          />
        </div>
        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
          The Science
        </p>
        <h1 style={{ color: COLORS.cream, fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2', maxWidth: '700px', margin: '0 auto 20px' }}>
          Understanding Terpenes
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '19px', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 16px' }}>
          Cannabis has over 200 identified terpenes. They&apos;re responsible for flavor, aroma,
          and — working alongside cannabinoids — the character of the experience itself.
        </p>
        <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', maxWidth: '580px', margin: '0 auto 48px', opacity: 0.8, fontStyle: 'italic' }}>
          Two products at 25% THC. One puts you on the couch. One has you reorganizing
          your apartment at midnight. The terpenes are why.
        </p>
      </section>

      {/* Terpene Card Universe */}
      <section style={{
        backgroundColor: COLORS.darkGreen,
        padding: '48px 16px 56px',
        backgroundImage: 'url(/terpene-grid-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(18,44,30,0.45)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ color: COLORS.gold, fontSize: '16px', letterSpacing: '4px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px', fontWeight: 'bold', textShadow: '0 2px 12px rgba(181,135,58,0.5)' }}>
            Explore the Library
          </p>

          {/* Responsive card grid — flex wrap works on all screen sizes */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { name: 'myrcene', img: '/terpenes/cards/card-myrcene.jpg' },
              { name: 'limonene', img: '/terpenes/cards/card-limonene.jpg' },
              { name: 'caryophyllene', img: '/terpenes/cards/card-caryophyllene.jpg' },
              { name: 'linalool', img: '/terpenes/cards/card-linalool.jpg' },
              { name: 'pinene', img: '/terpenes/cards/card-pinene.jpg' },
              { name: 'terpinolene', img: '/terpenes/cards/card-terpinolene.jpg' },
              { name: 'humulene', img: '/terpenes/cards/card-humulene.jpg' },
              { name: 'ocimene', img: '/terpenes/cards/card-ocimene.jpg' },
              { name: 'bisabolol', img: '/terpenes/cards/card-bisabolol.jpg' },
              { name: 'valencene', img: '/terpenes/cards/card-valencene.jpg' },
              { name: 'geraniol', img: '/terpenes/cards/card-geraniol.jpg' },
            ].map(t => (
              <a key={t.name} href={`#${t.name}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                <img src={t.img} alt={t.name}
                  style={{
                    width: 'clamp(80px, 12vw, 140px)',
                    height: 'clamp(120px, 18vw, 210px)',
                    borderRadius: '6px',
                    display: 'block',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'translateY(-6px)'; }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'translateY(0)'; }}
                />
              </a>
            ))}
            {/* Ask Photi card */}
            <a href="/chat" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <img src="/terpenes/cards/card-photi.jpg" alt="Ask Photi"
                style={{
                  width: 'clamp(80px, 12vw, 140px)',
                  height: 'clamp(120px, 18vw, 210px)',
                  borderRadius: '6px',
                  display: 'block',
                  boxShadow: '0 4px 20px rgba(181,135,58,0.4)',
                }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'translateY(0)'; }}
              />
            </a>
          </div>
        </div>
      </section>

            {/* Intro section — cream */}
      <section style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 style={{ color: COLORS.green, fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
            How to read a terpene profile
          </h2>
          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '16px' }}>
            When a processor provides a terpene profile on a product, read it like a map.
            The dominant terpene sets the direction. The secondary terpenes add character
            and nuance. The minor terpenes are the finishing notes.
          </p>
          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '16px' }}>
            A product with myrcene dominant, linalool secondary, and caryophyllene tertiary
            is telling a rest and recovery story. A product with limonene dominant, terpinolene
            secondary, and pinene tertiary is telling a daytime creativity story.
          </p>
          <p style={{ color: COLORS.green, fontSize: '18px', lineHeight: '1.85', fontWeight: 'bold' }}>
            The THC percentage tells you the volume. The terpene profile tells you the song.
          </p>
        </div>
      </section>

      {/* Terpene Cards */}
      <section style={{ padding: '64px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {TERPENES.map((t, i) => (
              <div key={t.name} id={t.name.toLowerCase()} style={{
                scrollMarginTop: '80px',
                display: 'flex',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                gap: '0',
                backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent',
                borderRadius: '16px',
                marginBottom: '24px',
                overflow: 'hidden',
              }}>
                {/* Image side */}
                <div style={{
                  width: '280px', minWidth: '280px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '32px',
                }}>
                  <img
                    src={t.image}
                    alt={t.name}
                    width="200"
                    height="200"
                    style={{borderRadius: '50%', display: 'block'}}
                  />
                </div>

                {/* Content side */}
                <div style={{ flex: 1, padding: '36px 36px 36px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                  {/* Name + headspace tag */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <h2 style={{ color: COLORS.gold, fontSize: '34px', fontWeight: 'bold', margin: 0 }}>
                      {t.name}
                    </h2>
                    <span style={{
                      backgroundColor: 'rgba(181,135,58,0.12)',
                      color: COLORS.gold,
                      fontSize: '12px', letterSpacing: '1px',
                      padding: '4px 12px', borderRadius: '20px',
                      border: '1px solid rgba(181,135,58,0.3)',
                      textTransform: 'uppercase',
                    }}>
                      {headspaceLabel[t.headspace]?.label}
                    </span>
                  </div>

                  {/* Aroma */}
                  <p style={{ color: COLORS.sage, fontSize: '15px', fontStyle: 'italic', marginBottom: '16px', lineHeight: '1.6' }}>
                    {t.aroma}
                  </p>

                  {/* Found in */}
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>Found in — </span>
                    <span style={{ color: COLORS.sage, fontSize: '14px' }}>{t.foundIn}</span>
                  </div>

                  {/* Tendency */}
                  <p style={{ color: COLORS.cream, fontSize: '15px', lineHeight: '1.7', marginBottom: '20px', opacity: 0.9 }}>
                    {t.tendency}
                  </p>

                  {/* Photi quote */}
                  <div style={{
                    borderLeft: `3px solid ${COLORS.gold}`,
                    paddingLeft: '16px',
                    marginBottom: '20px',
                  }}>
                    <p style={{ color: COLORS.sage, fontSize: '14px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Strains placeholder */}
                  <div>
                    <p style={{ color: COLORS.gold, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Common Michigan Strains
                    </p>
                    {t.strains.length > 0 ? (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {t.strains.map(s => (
                          <span key={s} style={{
                            backgroundColor: 'rgba(181,135,58,0.1)',
                            color: COLORS.sage, fontSize: '13px',
                            padding: '4px 12px', borderRadius: '20px',
                            border: '1px solid rgba(181,135,58,0.2)',
                          }}>{s}</span>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: COLORS.sage, fontSize: '13px', opacity: 0.5, fontStyle: 'italic', margin: 0 }}>
                        Strain data coming as Michigan dispensaries connect with Photi.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Image src="/photi-emblem.png" alt="Photi" width={80} height={80} style={{ marginBottom: '24px' }} />
          <h2 style={{ color: COLORS.gold, fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Now that you know the science
          </h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', marginBottom: '36px' }}>
            Talk to Photi and find the right terpene profile for your headspace today.
            The knowledge is interesting. The right product is the point.
          </p>
          <Link href="/chat" style={{
            backgroundColor: COLORS.gold, color: COLORS.green,
            fontSize: '18px', fontWeight: 'bold',
            padding: '16px 48px', borderRadius: '50px',
            textDecoration: 'none', display: 'inline-block',
          }}>
            Talk to Photi
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: COLORS.green, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image src="/photi-emblem.png" alt="Photi" width={28} height={28} />
            <span style={{ color: COLORS.gold, fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents michigansdailydeals.com</span>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '12px', opacity: 0.6 }}>
            Photi powered by MiQuest · hello@michigansdailydeals.com
          </p>
          <p style={{ color: COLORS.sage, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>
            For adults 21 and older. Please consume responsibly.
          </p>
        </div>
      </footer>

    </main>
  );
}