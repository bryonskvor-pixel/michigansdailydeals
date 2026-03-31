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

  // Age denied screen
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

  // Age gate screen
  if (!ageConfirmed) {
    return (
      <main className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: COLORS.green }}>
        <div className="text-center px-8" style={{ maxWidth: '440px' }}>

          {/* Photi Emblem */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <Image
              src="/photi-emblem.png"
              alt="Photi"
              width={140}
              height={140}
              priority
            />
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

  // Main site
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.green }}>

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/photi-emblem.png"
            alt="Photi"
            width={40}
            height={40}
          />
          <span style={{ color: COLORS.gold, fontFamily: S.font, fontSize: '20px', fontWeight: 'bold' }}>
            MiQuest
          </span>
        </div>
        <nav className="flex gap-8">
          <a href="/about" style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '15px', textDecoration: 'none' }}>
            Who is Photi?
          </a>
          <a href="/deals" style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '15px', textDecoration: 'none' }}>
            Today&apos;s Deals
          </a>
          <a href="/terpenes" style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '15px', textDecoration: 'none' }}>
            Terpenes
          </a>
          <a href="/chat" style={{
            color: COLORS.green, backgroundColor: COLORS.gold,
            fontFamily: S.font, fontSize: '15px', fontWeight: 'bold',
            padding: '8px 20px', borderRadius: '20px', textDecoration: 'none',
          }}>
            Talk to Photi
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-20">

        {/* Photi Emblem — hero size */}
        <div style={{ marginBottom: '28px' }}>
          <Image
            src="/photi-emblem.png"
            alt="Photi — Michigan's cannabis companion"
            width={180}
            height={180}
            priority
          />
        </div>

        <p style={{
          color: COLORS.gold, fontFamily: S.font,
          fontSize: '13px', letterSpacing: '3px',
          textTransform: 'uppercase', marginBottom: '20px',
        }}>
          MiQuest presents
        </p>

        {/* Main Headline */}
        <h1 style={{
          color: COLORS.cream, fontFamily: S.font,
          fontSize: '50px', fontWeight: 'bold',
          marginBottom: '20px', lineHeight: '1.2', maxWidth: '720px',
        }}>
          Stop scrolling 15 dispensary menus.
          <br />
          <span style={{ color: COLORS.gold }}>Talk to Photi.</span>
        </h1>

        {/* Problem line */}
        <p style={{
          color: COLORS.sage, fontFamily: S.font,
          fontSize: '20px', marginBottom: '12px',
          maxWidth: '600px', lineHeight: '1.7',
        }}>
          Michigan&apos;s cannabis market is extraordinary. Finding your way through it
          shouldn&apos;t be this hard.
        </p>

        {/* Value prop */}
        <p style={{
          color: COLORS.sage, fontFamily: S.font,
          fontSize: '17px', marginBottom: '16px',
          maxWidth: '560px', lineHeight: '1.7',
        }}>
          Photi gets to the bottom of what you actually need —
          and leads you there in no time.
        </p>

        {/* Product vocabulary — SEO + instant clarity */}
        <p style={{
          color: COLORS.sage, fontFamily: S.font,
          fontSize: '14px', marginBottom: '44px',
          maxWidth: '560px', lineHeight: '1.8',
          opacity: 0.75, fontStyle: 'italic',
        }}>
          Flower · Live Resin · Concentrates · Vapes · Edibles · Rosin · Wax · Dabs &mdash;
          Photi knows it all and knows what&apos;s right for you today.
        </p>

        {/* CTA */}
        <a href="/chat" style={{
          backgroundColor: COLORS.gold, color: COLORS.green,
          fontFamily: S.font, fontSize: '19px', fontWeight: 'bold',
          padding: '18px 52px', borderRadius: '50px',
          textDecoration: 'none', display: 'inline-block',
        }}>
          Talk to Photi
        </a>

        <p style={{
          color: COLORS.sage, fontFamily: S.font,
          fontSize: '14px', marginTop: '16px', opacity: 0.7,
          fontStyle: 'italic',
        }}>
          Free. No account needed. Just a quick conversation.
        </p>

        {/* Live Market Pills */}
        <div style={{ marginTop: '52px' }}>
          <p style={{
            color: COLORS.gold, fontFamily: S.font,
            fontSize: '12px', letterSpacing: '2px',
            textTransform: 'uppercase', marginBottom: '14px',
          }}>
            Live Now
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Monroe', 'Detroit', 'Traverse City', 'New Buffalo'].map((city) => (
              <span key={city} style={{
                backgroundColor: 'rgba(181,135,58,0.12)',
                color: COLORS.gold,
                fontFamily: S.font, fontSize: '14px',
                padding: '8px 20px', borderRadius: '20px',
                border: `1px solid rgba(181,135,58,0.3)`,
              }}>
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem We Solve — cream section */}
      <section style={{ backgroundColor: COLORS.cream }} className="px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{
            color: COLORS.green, fontFamily: S.font,
            fontSize: '34px', fontWeight: 'bold', marginBottom: '28px',
          }}>
            Michigan built something remarkable.
          </h2>
          <p style={{
            color: COLORS.text, fontFamily: S.font,
            fontSize: '18px', lineHeight: '1.85', marginBottom: '20px',
          }}>
            The growers, processors, labs, and dispensaries behind Michigan&apos;s cannabis
            market have done extraordinary work. The product quality is real.
            The variety is unmatched. The legal market is something worth using.
          </p>
          <p style={{
            color: COLORS.text, fontFamily: S.font,
            fontSize: '18px', lineHeight: '1.85', marginBottom: '20px',
          }}>
            But walking into a dispensary — or driving from Ohio to Monroe on a Saturday —
            means facing hundreds of daily deals, thousands of SKUs, and a budtender
            who is grabbing an order, not guiding a decision.
          </p>
          <p style={{
            color: COLORS.green, fontFamily: S.font,
            fontSize: '20px', lineHeight: '1.85', fontWeight: 'bold',
          }}>
            The product conversation you needed happened before you got there.
            That&apos;s what Photi is for.
          </p>
        </div>
      </section>

      {/* How It Works — dark green */}
      <section style={{ backgroundColor: COLORS.darkGreen }} className="px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{
            color: COLORS.gold, fontFamily: S.font,
            fontSize: '34px', fontWeight: 'bold', marginBottom: '12px',
          }}>
            A quick conversation. A real recommendation.
          </h2>
          <p style={{
            color: COLORS.sage, fontFamily: S.font,
            fontSize: '17px', lineHeight: '1.8', marginBottom: '48px',
          }}>
            Photi asks who you are before asking what you want.
            Because the answer to the first question is the only way to get the second one right.
          </p>

          <div className="flex flex-col gap-8" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'left' }}>
            {[
              {
                step: '01',
                title: 'Photi meets you',
                body: "A quick check-in on your headspace, your plans, what kind of night you're after. No quiz. Just a real conversation."
              },
              {
                step: '02',
                title: 'Photi matches you',
                body: "Flower, live resin, concentrates, edibles — the right product for your specific situation today, with the terpene science to back it up."
              },
              {
                step: '03',
                title: 'You get The Daily Dose',
                body: "Your recommendations, dispensary links, and a thought for the day — delivered to your inbox before you walk in the door."
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-6 items-start">
                <div style={{
                  minWidth: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: 'rgba(181,135,58,0.15)',
                  border: `1px solid rgba(181,135,58,0.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: COLORS.gold, fontFamily: S.font,
                  fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px',
                }}>
                  {step}
                </div>
                <div>
                  <h3 style={{ color: COLORS.cream, fontFamily: S.font, fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>
                    {title}
                  </h3>
                  <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '16px', lineHeight: '1.7' }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '52px' }}>
            <a href="/chat" style={{
              backgroundColor: 'transparent', color: COLORS.gold,
              fontFamily: S.font, fontSize: '17px', fontWeight: 'bold',
              padding: '15px 44px', borderRadius: '50px',
              textDecoration: 'none', display: 'inline-block',
              border: `2px solid ${COLORS.gold}`,
            }}>
              Start the conversation
            </a>
          </div>
        </div>
      </section>

      {/* Who is Photi — cream */}
      <section style={{ backgroundColor: COLORS.cream }} className="px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{
            color: COLORS.green, fontFamily: S.font,
            fontSize: '34px', fontWeight: 'bold', marginBottom: '24px',
          }}>
            Who is Photi?
          </h2>
          <p style={{
            color: COLORS.text, fontFamily: S.font,
            fontSize: '18px', lineHeight: '1.85', marginBottom: '18px',
          }}>
            From the Greek <em>Photizo</em> — to illuminate, to guide through darkness.
            Photi is Michigan&apos;s most knowledgeable cannabis companion. Part experienced
            insider, part terpene professor, part person who actually asks how you&apos;re
            doing before pointing you anywhere.
          </p>
          <p style={{
            color: COLORS.text, fontFamily: S.font,
            fontSize: '18px', lineHeight: '1.85', marginBottom: '18px',
          }}>
            In the history of cannabis, people never had options. Now there are a thousand
            of them. Understanding them is the whole job — and Photi never lost their
            sense of wonder about this insane plant.
          </p>
          <p style={{
            color: COLORS.green, fontFamily: S.font,
            fontSize: '18px', lineHeight: '1.85', fontWeight: 'bold',
          }}>
            A caring guide that advises where to get the good stuff — and if you want to
            go deeper, can go head first into the science and magic behind it.
          </p>
          <div style={{ marginTop: '36px' }}>
            <a href="/about" style={{
              color: COLORS.green, fontFamily: S.font,
              fontSize: '15px', fontWeight: 'bold',
              textDecoration: 'none',
              borderBottom: `2px solid ${COLORS.gold}`,
              paddingBottom: '2px',
            }}>
              Learn more about Photi →
            </a>
          </div>
        </div>
      </section>

      {/* The Daily Dose — darkest green */}
      <section style={{ backgroundColor: COLORS.darkGreen }} className="px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{
            color: COLORS.gold, fontFamily: S.font,
            fontSize: '34px', fontWeight: 'bold', marginBottom: '16px',
          }}>
            The Daily Dose
          </h2>
          <p style={{
            color: COLORS.sage, fontFamily: S.font,
            fontSize: '18px', lineHeight: '1.85', marginBottom: '16px',
          }}>
            After your conversation with Photi, get your personalized recommendations,
            dispensary links, and a thought for the day — delivered to your inbox
            before you walk in the door.
          </p>
          <p style={{
            color: COLORS.sage, fontFamily: S.font,
            fontSize: '16px', lineHeight: '1.7', marginBottom: '36px', opacity: 0.8,
          }}>
            Michigan&apos;s deals change every morning. Photi checks every day so you don&apos;t have to.
          </p>
          <p style={{
            color: COLORS.gold, fontFamily: S.font,
            fontSize: '22px', fontStyle: 'italic', marginBottom: '48px',
          }}>
            &ldquo;Don&apos;t forget, you promised Photi.&rdquo;
          </p>
          <a href="/chat" style={{
            backgroundColor: 'transparent', color: COLORS.gold,
            fontFamily: S.font, fontSize: '16px', fontWeight: 'bold',
            padding: '14px 40px', borderRadius: '50px',
            textDecoration: 'none', display: 'inline-block',
            border: `2px solid ${COLORS.gold}`,
          }}>
            Start with Photi
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: COLORS.green, borderTop: '1px solid rgba(255,255,255,0.08)' }} className="px-8 py-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/photi-emblem.png"
              alt="Photi"
              width={32}
              height={32}
            />
            <span style={{ color: COLORS.gold, fontFamily: S.font, fontSize: '16px', fontWeight: 'bold' }}>
              MiQuest presents michigansdailydeals.com
            </span>
          </div>
          <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '13px' }}>
            Photi powered by MiQuest &middot; hello@michigansdailydeals.com
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            {[
              'monroesdailydeals.com',
              'detroitdailydeals.com',
              'traversecitysdailydeals.com',
              'newbuffalodailydeals.com',
            ].map((domain) => (
              <a key={domain} href={`https://${domain}`} style={{
                color: COLORS.sage, fontFamily: S.font,
                fontSize: '12px', textDecoration: 'none', opacity: 0.7,
              }}>
                {domain}
              </a>
            ))}
          </div>
          <p style={{ color: COLORS.sage, fontFamily: S.font, fontSize: '11px', marginTop: '12px', opacity: 0.5 }}>
            For adults 21 and older. Please consume responsibly.
          </p>
        </div>
      </footer>

    </main>
  );
}
