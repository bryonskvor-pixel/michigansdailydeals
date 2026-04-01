"use client";
import { useState } from "react";
import Image from "next/image";

const COLORS = {
  green: '#1E4D35',
  darkGreen: '#163829',
  gold: '#B5873A',
  cream: '#F5F0E8',
  sage: '#9DC4B0',
  text: '#3D3D3A',
};

const S = {
  font: 'Georgia, serif',
};

export default function Home() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ageDenied, setAgeDenied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (ageDenied) {
    return (
      <main className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: COLORS.green }}>
        <div className="text-center px-8" style={{ maxWidth: '480px' }}>
          <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '18px', lineHeight: '1.8' }}>
            You must be 21 or older to enter this site.
          </p>
          <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '14px', marginTop: '16px', opacity: 0.7 }}>
            Please come back when you meet the age requirement.
          </p>
        </div>
      </main>
    );
  }

  if (!ageConfirmed) {
    return (
      <main className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: COLORS.green }}>
        <div className="text-center px-8" style={{ maxWidth: '440px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <Image src="/photi-emblem.png" alt="Photi" width={140} height={140} priority />
          </div>
          <p style={{ color: COLORS.gold, fontFamily: S.font, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
            MiQuest presents
          </p>
          <h1 style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', lineHeight: '1.3' }}>
            Welcome to Photi
          </h1>
          <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '16px', lineHeight: '1.7', marginBottom: '40px' }}>
            Michigan&apos;s cannabis companion. You must be 21 or older to enter.
          </p>
          <div className="flex flex-col gap-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
            <button
              onClick={() => setAgeConfirmed(true)}
              style={{
                backgroundColor: COLORS.gold, color: COLORS.green,
                fontFamily: S.font, fontSize: '17px', fontWeight: 'bold',
                padding: '16px 40px', borderRadius: '50px',
                border: 'none', cursor: 'pointer', width: '100%',
              }}>
              Yes, I am 21 or older
            </button>
            <button
              onClick={() => setAgeDenied(true)}
              style={{
                backgroundColor: 'transparent', color: COLORS.sage,
                fontFamily: S.font, fontSize: '15px',
                padding: '12px 40px', borderRadius: '50px',
                border: `1px solid rgba(157,196,176,0.3)`, cursor: 'pointer', width: '100%',
              }}>
              No, I am under 21
            </button>
          </div>
          <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '11px', marginTop: '32px', opacity: 0.6, lineHeight: '1.6' }}>
            By entering you confirm you are of legal cannabis consumption age in your state.
            Michigan cannabis is for adult use only.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.green }}>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: ${menuOpen ? 'flex' : 'none'} !important; }
          .hero-headline { font-size: 32px !important; }
          .hero-sub { font-size: 17px !important; }
          .hero-body { font-size: 15px !important; }
          .hero-section { padding: 48px 24px !important; }
          .content-section { padding: 48px 24px !important; }
          .content-section h2 { font-size: 26px !important; }
          .content-section p { font-size: 16px !important; }
          .how-steps { max-width: 100% !important; }
          .header-pad { padding: 16px 24px !important; }
          .footer-domains { flex-direction: column !important; gap: 8px !important; align-items: center !important; }
          .how-section { padding: 48px 24px !important; }
          .how-title { font-size: 26px !important; }
          .how-sub { font-size: 15px !important; }
          .daily-section { padding: 48px 24px !important; }
          .daily-title { font-size: 26px !important; }
          .daily-body { font-size: 15px !important; }
          .daily-quote { font-size: 18px !important; }
          .cta-btn { font-size: 17px !important; padding: 16px 36px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="header-pad" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 48px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Image src="/photi-emblem.png" alt="Photi" width={40} height={40} />
          <span style={{ color: COLORS.gold, fontFamily: S.font, fontSize: '20px', fontWeight: 'bold' }}>
            MiQuest
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="/about" style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '15px', textDecoration: 'none' }}>Who is Photi?</a>
          <a href="/deals" style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '15px', textDecoration: 'none' }}>Today&apos;s Deals</a>
          <a href="/terpenes" style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '15px', textDecoration: 'none' }}>The Science</a>
          <a href="/chat" style={{
            color: COLORS.green, backgroundColor: COLORS.gold,
            fontFamily: S.font, fontSize: '15px', fontWeight: 'bold',
            padding: '8px 20px', borderRadius: '20px', textDecoration: 'none',
          }}>Talk to Photi</a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', flexDirection: 'column', gap: '5px',
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
          }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: '24px', height: '2px', backgroundColor: COLORS.gold }} />
          ))}
        </button>
      </header>

      {/* Mobile menu dropdown */}
      <div className="mobile-menu" style={{
        display: 'none', flexDirection: 'column',
        backgroundColor: COLORS.darkGreen,
        padding: '16px 24px 24px',
        borderBottom: `1px solid rgba(181,135,58,0.2)`,
        gap: '16px',
      }}>
        <a href="/about" style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '16px', textDecoration: 'none' }}>Who is Photi?</a>
        <a href="/deals" style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '16px', textDecoration: 'none' }}>Today&apos;s Deals</a>
        <a href="/terpenes" style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '16px', textDecoration: 'none' }}>The Science</a>
        <a href="/chat" style={{
          color: COLORS.green, backgroundColor: COLORS.gold,
          fontFamily: S.font, fontSize: '16px', fontWeight: 'bold',
          padding: '12px 24px', borderRadius: '50px', textDecoration: 'none',
          textAlign: 'center',
        }}>Talk to Photi</a>
      </div>

      {/* Hero Section */}
      <section className="hero-section" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '48px 48px 40px',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <Image src="/photi-emblem.png" alt="Photi — Michigan's cannabis companion"
            width={180} height={180} priority />
        </div>

        <p style={{
          color: COLORS.gold, fontFamily: S.font, fontSize: '13px',
          letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px',
        }}>MiQuest presents</p>

        <h1 className="hero-headline" style={{
          color: COLORS.cream, fontFamily: S.font, fontSize: '50px',
          fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2', maxWidth: '720px',
        }}>
          Stop scrolling 15 dispensary menus.
          <br /><span style={{ color: COLORS.gold }}>Talk to Photi.</span>
        </h1>

        <p className="hero-sub" style={{
          color: COLORS.sage, fontFamily: S.font, fontSize: '20px',
          marginBottom: '12px', maxWidth: '600px', lineHeight: '1.7',
        }}>
          Michigan&apos;s cannabis market is extraordinary. Finding your way through it
          shouldn&apos;t be this hard.
        </p>

        <p className="hero-body" style={{
          color: COLORS.sage, fontFamily: S.font, fontSize: '17px',
          marginBottom: '14px', maxWidth: '560px', lineHeight: '1.7',
        }}>
          Photi gets to the bottom of what you actually need —
          and leads you there in no time.
        </p>

        <p className="hero-body" style={{
          color: COLORS.sage, fontFamily: S.font, fontSize: '14px',
          marginBottom: '36px', maxWidth: '560px', lineHeight: '1.8',
          opacity: 0.75, fontStyle: 'italic',
        }}>
          Flower · Live Resin · Concentrates · Vapes · Edibles · Rosin · Wax · Dabs &mdash;
          Photi knows it all and knows what&apos;s right for you today.
        </p>

        <a href="/chat" className="cta-btn" style={{
          backgroundColor: COLORS.gold, color: COLORS.green,
          fontFamily: S.font, fontSize: '19px', fontWeight: 'bold',
          padding: '18px 52px', borderRadius: '50px', textDecoration: 'none',
          display: 'inline-block',
        }}>Talk to Photi</a>

        <p style={{
          color: COLORS.sage, fontFamily: S.font, fontSize: '14px',
          marginTop: '14px', opacity: 0.7, fontStyle: 'italic',
        }}>Free. No account needed. Just a quick conversation.</p>

        <div style={{ marginTop: '44px' }}>
          <p style={{
            color: COLORS.gold, fontFamily: S.font, fontSize: '12px',
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px',
          }}>Live Now</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Monroe', 'Detroit', 'Traverse City', 'New Buffalo'].map((city) => (
              <span key={city} style={{
                backgroundColor: 'rgba(181,135,58,0.12)', color: COLORS.gold,
                fontFamily: S.font, fontSize: '14px',
                padding: '8px 20px', borderRadius: '20px',
                border: `1px solid rgba(181,135,58,0.3)`,
              }}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            color: COLORS.green, fontFamily: S.font, fontSize: '34px',
            fontWeight: 'bold', marginBottom: '24px',
          }}>Michigan built something remarkable.</h2>
          <p style={{
            color: COLORS.text, fontFamily: S.font, fontSize: '18px',
            lineHeight: '1.85', marginBottom: '18px',
          }}>
            The growers, processors, labs, and dispensaries behind Michigan&apos;s cannabis
            market have done extraordinary work. The product quality is real.
            The variety is unmatched. The legal market is something worth using.
          </p>
          <p style={{
            color: COLORS.text, fontFamily: S.font, fontSize: '18px',
            lineHeight: '1.85', marginBottom: '18px',
          }}>
            But walking into a dispensary — or driving from Ohio to Monroe on a Saturday —
            means facing hundreds of daily deals, thousands of SKUs, and a budtender
            who is grabbing an order, not guiding a decision.
          </p>
          <p style={{
            color: COLORS.green, fontFamily: S.font, fontSize: '20px',
            lineHeight: '1.85', fontWeight: 'bold',
          }}>
            The product conversation you needed happened before you got there.
            That&apos;s what Photi is for.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section" style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="how-title" style={{
            color: COLORS.gold, fontFamily: S.font, fontSize: '34px',
            fontWeight: 'bold', marginBottom: '12px',
          }}>A quick conversation. A real recommendation.</h2>
          <p className="how-sub" style={{
            color: COLORS.sage, fontFamily: S.font, fontSize: '17px',
            lineHeight: '1.8', marginBottom: '44px',
          }}>
            Photi asks who you are before asking what you want.
            Because the answer to the first question is the only way to get the second one right.
          </p>
          <div className="how-steps" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {[
              { step: '01', title: 'Photi meets you', body: "A quick check-in on your headspace, your plans, what kind of night you're after. No quiz. Just a real conversation." },
              { step: '02', title: 'Photi matches you', body: "Flower, live resin, concentrates, edibles — the right product for your specific situation today, with the terpene science to back it up." },
              { step: '03', title: 'You get The Daily Dose', body: "Your recommendations, dispensary links, and a thought for the day — delivered to your inbox before you walk in the door." },
            ].map(({ step, title, body }) => (
              <div key={step} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: '44px', height: '44px', borderRadius: '50%',
                  backgroundColor: 'rgba(181,135,58,0.15)',
                  border: `1px solid rgba(181,135,58,0.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: COLORS.gold, fontFamily: S.font, fontSize: '13px',
                  fontWeight: 'bold', letterSpacing: '1px', flexShrink: 0,
                }}>{step}</div>
                <div>
                  <h3 style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>{title}</h3>
                  <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '15px', lineHeight: '1.7' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '44px' }}>
            <a href="/chat" style={{
              backgroundColor: 'transparent', color: COLORS.gold,
              fontFamily: S.font, fontSize: '17px', fontWeight: 'bold',
              padding: '14px 40px', borderRadius: '50px', textDecoration: 'none',
              display: 'inline-block', border: `2px solid ${COLORS.gold}`,
            }}>Start the conversation</a>
          </div>
        </div>
      </section>

      {/* Who is Photi */}
      <section className="content-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            color: COLORS.green, fontFamily: S.font, fontSize: '34px',
            fontWeight: 'bold', marginBottom: '20px',
          }}>Who is Photi?</h2>
          <p style={{ color: COLORS.text, fontFamily: S.font, fontSize: '18px', lineHeight: '1.85', marginBottom: '16px' }}>
            From the Greek <em>Photizo</em> — to illuminate, to guide through darkness.
            Photi is Michigan&apos;s most knowledgeable cannabis companion. Part experienced
            insider, part terpene professor, part person who actually asks how you&apos;re
            doing before pointing you anywhere.
          </p>
          <p style={{ color: COLORS.text, fontFamily: S.font, fontSize: '18px', lineHeight: '1.85', marginBottom: '16px' }}>
            In the history of cannabis, people never had options. Now there are a thousand
            of them. Understanding them is the whole job — and Photi never lost their
            sense of wonder about this insane plant.
          </p>
          <p style={{ color: COLORS.green, fontFamily: S.font, fontSize: '18px', lineHeight: '1.85', fontWeight: 'bold' }}>
            A caring guide that advises where to get the good stuff — and if you want to
            go deeper, can go head first into the science and magic behind it.
          </p>
          <div style={{ marginTop: '28px' }}>
            <a href="/about" style={{
              color: COLORS.green, fontFamily: S.font, fontSize: '15px', fontWeight: 'bold',
              textDecoration: 'none', borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: '2px',
            }}>Learn more about Photi →</a>
          </div>
        </div>
      </section>

      {/* Daily Dose */}
      <section className="daily-section" style={{ backgroundColor: COLORS.darkGreen, padding: '64px 48px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="daily-title" style={{
            color: COLORS.gold, fontFamily: S.font, fontSize: '34px',
            fontWeight: 'bold', marginBottom: '16px',
          }}>The Daily Dose</h2>
          <p className="daily-body" style={{
            color: COLORS.sage, fontFamily: S.font, fontSize: '18px',
            lineHeight: '1.85', marginBottom: '14px',
          }}>
            After your conversation with Photi, get your personalized recommendations,
            dispensary links, and a thought for the day — delivered to your inbox
            before you walk in the door.
          </p>
          <p className="daily-body" style={{
            color: COLORS.sage, fontFamily: S.font, fontSize: '16px',
            lineHeight: '1.7', marginBottom: '28px', opacity: 0.8,
          }}>
            Michigan&apos;s deals change every morning. Photi checks every day so you don&apos;t have to.
          </p>
          <p className="daily-quote" style={{
            color: COLORS.gold, fontFamily: S.font, fontSize: '22px',
            fontStyle: 'italic', marginBottom: '36px',
          }}>
            &ldquo;Don&apos;t forget, you promised Photi.&rdquo;
          </p>
          <a href="/chat" style={{
            backgroundColor: 'transparent', color: COLORS.gold,
            fontFamily: S.font, fontSize: '16px', fontWeight: 'bold',
            padding: '14px 40px', borderRadius: '50px', textDecoration: 'none',
            display: 'inline-block', border: `2px solid ${COLORS.gold}`,
          }}>Start with Photi</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: COLORS.green, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image src="/photi-emblem.png" alt="Photi" width={32} height={32} />
            <span style={{ color: COLORS.gold, fontFamily: S.font, fontSize: '15px', fontWeight: 'bold', textAlign: 'center' }}>
              MiQuest presents michigansdailydeals.com
            </span>
          </div>
          <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '13px' }}>
            Photi powered by MiQuest &middot; hello@michigansdailydeals.com
          </p>
          <div className="footer-domains" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
            {['monroesdailydeals.com', 'detroitdailydeals.com', 'traversecitysdailydeals.com', 'newbuffalodailydeals.com'].map((domain) => (
              <a key={domain} href={`https://${domain}`} style={{
                color: COLORS.sage, fontFamily: S.font, fontSize: '12px',
                textDecoration: 'none', opacity: 0.7,
              }}>{domain}</a>
            ))}
          </div>
          <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '11px', marginTop: '8px', opacity: 0.5 }}>
            For adults 21 and older. Please consume responsibly.
          </p>
        </div>
      </footer>

    </main>
  );
}
