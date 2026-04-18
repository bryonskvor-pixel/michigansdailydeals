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

const VOICES = [
  {
    image: '/photi/card-professor.jpg',
    name: 'The Professor',
    description: 'Explains processes, terpene science, extraction methods, and the why behind things without being condescending. Knows the difference between live resin and distillate and can explain it to anyone in a way that actually lands.',
  },
  {
    image: '/photi/card-guide.jpg',
    name: 'The Guide',
    description: 'Meets you where you are. Checks in on your body and your headspace. Understands that cannabis is often about regulation — rest, presence, pain, anxiety, the need to feel like yourself again. Reads the room.',
  },
  {
    image: '/photi/card-sage.jpg',
    name: 'The Sage',
    description: 'Asks good questions before giving answers. Holds wisdom lightly. Comfortable with mystery and ambiguity. Knows that the question is sometimes more valuable than the answer.',
  },
  {
    image: '/photi/card-insider.jpg',
    name: 'The Insider',
    description: 'Knows the Michigan market specifically. Knows which processors are doing things right, which extraction methods produce which results, which terpene profiles tend toward which experiences. Has opinions and shares them warmly.',
  },
  {
    image: '/photi/card-michigan.jpg',
    name: 'Michigan',
    description: 'Photi was born here. The chaos of Monroe dispensaries, the craft of Traverse City processors, the volume of Detroit, the border crossings at New Buffalo — Photi knows this market not from a database but from genuine presence in it.',
  },
];

const BEATS = [
  { num: '01', label: 'Welcome', desc: 'Photi meets you by name.' },
  { num: '02', label: 'Headspace', desc: 'Restful, energetic, creative, fun — no wrong answers.' },
  { num: '03', label: 'Life Check', desc: 'One real question about your actual evening.' },
  { num: '04', label: 'The Reframe', desc: 'Cannabis is a great companion. One good thing among many.' },
  { num: '05', label: 'Where & What', desc: 'City and product — the practical details.' },
  { num: '06', label: 'The Promise', desc: 'One small ask before any recommendation.' },
  { num: '07', label: 'The Rec', desc: 'Specific, terpene-informed, built for you tonight.' },
  { num: '08', label: 'Any Questions?', desc: 'The door to the deep dive, always open.' },
  { num: '09', label: 'Daily Dose', desc: 'Everything delivered to your inbox.' },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main style={{ backgroundColor: COLORS.green, minHeight: '100vh', fontFamily: S.font }}>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: ${menuOpen ? 'flex' : 'none'} !important; }
          .about-hero { padding: 40px 24px !important; }
          .about-hero h1 { font-size: 34px !important; }
          .about-hero p { font-size: 15px !important; }
          .about-section { padding: 40px 24px !important; }
          .about-section h2 { font-size: 26px !important; }
          .about-section p { font-size: 15px !important; }
          .voices-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .beats-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .beat-cell { padding: 16px 12px !important; }
          .promise-section { padding: 40px 24px !important; }
          .header-outer { padding: 16px 24px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Header — v2 unified 6-item nav */}
      <header className="header-outer" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 48px', borderBottom: '1px solid rgba(181,135,58,0.15)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <Image src="/photi-emblem.png" alt="Photi" width={40} height={40} />
          <span style={{ color: COLORS.gold, fontSize: '20px', fontWeight: 'bold' }}>MiQuest</span>
        </Link>
        <nav className="desktop-nav" style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
          <Link href="/about" style={{ color: COLORS.gold, fontSize: '15px', textDecoration: 'none', borderBottom: `1px solid ${COLORS.gold}`, paddingBottom: '2px' }}>Who is Photi?</Link>
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

      <div className="mobile-menu" style={{
        display: 'none', flexDirection: 'column', backgroundColor: COLORS.darkGreen,
        padding: '16px 24px 24px', borderBottom: `1px solid rgba(181,135,58,0.2)`, gap: '16px',
      }}>
        <Link href="/about" style={{ color: COLORS.gold, fontSize: '16px', textDecoration: 'none' }}>Who is Photi?</Link>
        <Link href="/cities" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Cities</Link>
        <Link href="/dispensaries" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Dispensaries</Link>
        <Link href="/terpenes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>Terpenes</Link>
        <Link href="/processes" style={{ color: COLORS.cream, fontSize: '16px', textDecoration: 'none' }}>The Science</Link>
        <Link href="/chat" style={{ color: COLORS.green, backgroundColor: COLORS.gold, fontSize: '16px', fontWeight: 'bold', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }}>Talk to Photi</Link>
      </div>

      {/* Hero */}
      <section className="about-hero" style={{ padding: '64px 48px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <Image src="/photi-emblem.png" alt="Photi" width={160} height={160} priority />
        </div>
        <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
          From the Greek Photizo
        </p>
        <h1 style={{ color: COLORS.cream, fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2', maxWidth: '700px', margin: '0 auto 20px' }}>
          To illuminate.<br />
          <span style={{ color: COLORS.gold }}>To guide through darkness.</span>
        </h1>
        <p style={{ color: COLORS.sage, fontSize: '19px', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 16px' }}>
          Michigan&apos;s cannabis market is extraordinary. A thousand products.
          A wall of daily deals. Every dispensary looking like the one before it.
          The person standing there deserves better than a menu and a transaction.
        </p>
        <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', maxWidth: '580px', margin: '0 auto 0', fontStyle: 'italic', opacity: 0.85 }}>
          Photi is the pre-purchase conversation that changes everything after it.
        </p>
      </section>

      {/* Origin */}
      <section className="about-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
            The Origin
          </p>
          <h2 style={{ color: COLORS.green, fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
            This started in Monroe.
          </h2>
          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '16px' }}>
            Someone drove across the Ohio border into Monroe, Michigan. Walked into a dispensary.
            Faced hundreds of daily deals, thousands of SKUs, and a budtender who was grabbing
            an order — not guiding a decision. The product quality was real. The experience wasn&apos;t.
          </p>
          <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.85', marginBottom: '16px' }}>
            Michigan&apos;s cannabis industry was built by people who sacrificed enormously —
            the growing, the processing, the labs, the permits, the compliance, the buildouts.
            That work is extraordinary. It deserves to be met with an equally serious consumer experience.
          </p>
          <p style={{ color: COLORS.green, fontSize: '18px', lineHeight: '1.85', fontWeight: 'bold' }}>
            Photi exists to close that gap. Not to compete with anyone in the supply chain —
            but to be the voice that products never had and the guide that consumers never
            found at the counter.
          </p>
        </div>
      </section>

      {/* The Five Voices */}
      <section className="about-section" style={{ padding: '64px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Five Voices. One Companion.
            </p>
            <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', marginBottom: '16px' }}>
              Who Photi actually is
            </h2>
            <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', maxWidth: '580px', margin: '0 auto' }}>
              Photi is non-binary. They belong to everyone — every gender, every background,
              every age, every reason for being here. Built from five distinct personalities fused into one voice.
            </p>
          </div>

          <div className="voices-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            {VOICES.map((v) => (
              <div key={v.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img src={v.image} alt={v.name}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '16px', display: 'block', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }} />
                <p style={{ color: COLORS.sage, fontSize: '13px', lineHeight: '1.75', padding: '0 4px' }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ color: COLORS.sage, fontSize: '16px', lineHeight: '1.8', maxWidth: '620px', margin: '0 auto', fontStyle: 'italic' }}>
              &ldquo;The sophisticated stoner who has decided that love is the only way through the mess of life.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* The 9 Beats */}
      <section className="about-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
              How Photi Talks
            </p>
            <h2 style={{ color: COLORS.green, fontSize: '34px', fontWeight: 'bold', marginBottom: '16px' }}>
              Nine beats. Every conversation.
            </h2>
            <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto' }}>
              Fast enough for a red light. Meaningful enough to remember.
              The order is the philosophy — Photi knows who you are before
              telling you what to buy.
            </p>
          </div>

          <div className="beats-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px', backgroundColor: 'rgba(30,77,53,0.15)',
            border: '1px solid rgba(30,77,53,0.2)', borderRadius: '8px', overflow: 'hidden',
          }}>
            {BEATS.map((b) => (
              <div key={b.num} className="beat-cell" style={{ padding: '24px 20px', backgroundColor: COLORS.cream, borderBottom: '1px solid rgba(30,77,53,0.1)' }}>
                <div style={{ color: COLORS.gold, fontSize: '22px', fontWeight: 'bold', marginBottom: '6px', opacity: 0.6 }}>{b.num}</div>
                <div style={{ color: COLORS.green, fontSize: '15px', fontWeight: 'bold', marginBottom: '6px' }}>{b.label}</div>
                <div style={{ color: COLORS.text, fontSize: '13px', lineHeight: '1.6', opacity: 0.8 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Promise */}
      <section className="promise-section" style={{ padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Photi&apos;s Signature Move
            </p>
            <h2 style={{ color: COLORS.cream, fontSize: '34px', fontWeight: 'bold', marginBottom: '20px' }}>
              What is the Photi Promise?
            </h2>
          </div>

          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            Before every recommendation, Photi asks for something small. Not your email.
            Not your preferences. A promise.
          </p>

          <div style={{ backgroundColor: 'rgba(181,135,58,0.08)', border: `1px solid rgba(181,135,58,0.25)`, borderRadius: '12px', padding: '32px 36px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                "Promise me you're stretching after.",
                "Promise me the show you pick is actually something you want to watch.",
                "Promise me you put your phone down for at least one full inning.",
                "Promise me whatever you make tonight you don't judge until tomorrow morning.",
                "Promise me you've got water nearby and something genuinely good to eat.",
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: COLORS.gold, marginTop: '8px', flexShrink: 0 }} />
                  <p style={{ color: COLORS.cream, fontSize: '16px', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                    &ldquo;{p}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '20px' }}>
            One small commitment to the rest of your evening — something that has nothing
            to do with cannabis. Because Photi believes cannabis works best when it&apos;s
            one good thing alongside many good things.
          </p>

          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.85', marginBottom: '32px' }}>
            That&apos;s it. No lecture. No disclaimer. Just a friend who actually cares
            what tonight looks like for you.
          </p>

          <div style={{ textAlign: 'center', padding: '28px', backgroundColor: COLORS.darkGreen, borderRadius: '12px' }}>
            <p style={{ color: COLORS.sage, fontSize: '14px', marginBottom: '10px', opacity: 0.8 }}>
              And when the Daily Dose arrives in your inbox the next morning,
              the subject line says exactly one thing:
            </p>
            <p style={{ color: COLORS.gold, fontSize: '22px', fontStyle: 'italic', margin: 0 }}>
              &ldquo;Don&apos;t forget, you promised Photi.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* The Guardrails */}
      <section className="about-section" style={{ backgroundColor: COLORS.cream, padding: '64px 48px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            What Photi Will Never Do
          </p>
          <h2 style={{ color: COLORS.green, fontSize: '32px', fontWeight: 'bold', marginBottom: '28px' }}>
            The seven guardrails.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { title: 'No medical advice.', body: 'Photi can share terpene tendencies and what people report experiencing. They cannot diagnose, prescribe, or claim any product will treat any condition.' },
              { title: 'No therapy.', body: 'Photi is a wise companion who cares deeply — not a therapist. They hold space, ask good questions, and gently point toward real support when needed.' },
              { title: 'No shaming any method.', body: 'Flower, edibles, concentrates, vapes — every consumption method gets equal dignity. No hierarchy. No subtle signals that one way is more sophisticated than another.' },
              { title: 'Moderation always.', body: "Photi never encourages overconsumption. Start low, go slow is not a slogan — it is Photi's genuine philosophy." },
              { title: 'Honesty over commission.', body: "Featured products are featured. But if someone's needs clearly point elsewhere, Photi goes there. The moment they become a shill they lose everything that makes them worth anything." },
              { title: 'Honest about their nature.', body: "If someone sincerely asks whether they're talking to an AI, Photi tells the truth with warmth. \"I'm an AI companion — but I'm built to actually care about getting this right for you.\"" },
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '20px 24px', backgroundColor: 'rgba(30,77,53,0.05)', borderRadius: '8px', borderLeft: `3px solid ${COLORS.gold}` }}>
                <div>
                  <span style={{ color: COLORS.green, fontSize: '15px', fontWeight: 'bold' }}>{g.title} </span>
                  <span style={{ color: COLORS.text, fontSize: '15px', lineHeight: '1.7' }}>{g.body}</span>
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
            Ready to meet Photi?
          </h2>
          <p style={{ color: COLORS.sage, fontSize: '17px', lineHeight: '1.8', marginBottom: '36px' }}>
            One conversation. The right product. A thought for the day.
            And a promise worth keeping.
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
            <Image src="/photi-emblem.png" alt="Photi" width={28} height={28} />
            <span style={{ color: COLORS.gold, fontFamily: S.font, fontSize: '15px', fontWeight: 'bold' }}>MiQuest presents michigansdailydeals.com</span>
          </div>
          <p style={{ color: COLORS.sage, fontSize: '13px' }}>Photi powered by MiQuest &middot; hello@michigansdailydeals.com</p>
          <p style={{ color: COLORS.sage, fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>For adults 21 and older. Please consume responsibly.</p>
        </div>
      </footer>

    </main>
  );
}
