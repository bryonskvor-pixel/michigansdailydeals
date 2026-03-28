export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1E4D35' }}>
      
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#B5873A',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1E4D35'
          }}>P</div>
          <span style={{ color: '#B5873A', fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'bold' }}>
            MiQuest
          </span>
        </div>
        <nav className="flex gap-8">
          <a href="/about" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '15px' }}>
            Who is Photi?
          </a>
          <a href="/deals" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '15px' }}>
            Today's Deals
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-24">
        
        {/* Photi Emblem Placeholder */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#B5873A',
          border: '3px solid #F5F0E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          fontSize: '48px',
          fontFamily: 'Georgia, serif',
          color: '#1E4D35',
          fontWeight: 'bold'
        }}>
          P
        </div>

        {/* Tagline */}
        <p style={{
          color: '#B5873A',
          fontFamily: 'Georgia, serif',
          fontSize: '14px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          MiQuest presents
        </p>

        {/* Headline */}
        <h1 style={{
          color: '#F5F0E8',
          fontFamily: 'Georgia, serif',
          fontSize: '52px',
          fontWeight: 'bold',
          marginBottom: '24px',
          lineHeight: '1.2',
          maxWidth: '700px'
        }}>
          Michigan's got incredible products out there today.
        </h1>

        {/* Subheadline */}
        <p style={{
          color: '#9DC4B0',
          fontFamily: 'Georgia, serif',
          fontSize: '20px',
          marginBottom: '16px',
          maxWidth: '560px',
          lineHeight: '1.6'
        }}>
          Personalized delivery from a quick conversation.
        </p>

        <p style={{
          color: '#9DC4B0',
          fontFamily: 'Georgia, serif',
          fontSize: '16px',
          marginBottom: '48px',
          maxWidth: '480px',
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>
          Photi asks who you are before asking what you want.
        </p>

        {/* CTA Button */}
        <a href="/chat" style={{
          backgroundColor: '#B5873A',
          color: '#1E4D35',
          fontFamily: 'Georgia, serif',
          fontSize: '18px',
          fontWeight: 'bold',
          padding: '18px 48px',
          borderRadius: '50px',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'all 0.2s'
        }}>
          Talk to Photi
        </a>

        {/* City Pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-16">
          {['Monroe', 'Detroit', 'Traverse City', 'New Buffalo', 'Grand Rapids', 'Kalamazoo', 'Ann Arbor'].map((city) => (
            <span key={city} style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#9DC4B0',
              fontFamily: 'Georgia, serif',
              fontSize: '13px',
              padding: '6px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.12)'
            }}>
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* What is Photi Section */}
      <section style={{ backgroundColor: '#F5F0E8' }} className="px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{
            color: '#1E4D35',
            fontFamily: 'Georgia, serif',
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '24px'
          }}>
            Who is Photi?
          </h2>
          <p style={{
            color: '#3D3D3A',
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            lineHeight: '1.8',
            marginBottom: '16px'
          }}>
            Photi is Michigan's most knowledgeable cannabis companion — built to illuminate 
            the chaos of daily deals, hundreds of SKUs, and an overwhelming dispensary experience.
          </p>
          <p style={{
            color: '#3D3D3A',
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            lineHeight: '1.8',
            marginBottom: '16px'
          }}>
            From the Greek <em>Photizo</em> — to illuminate, to guide through darkness. 
            Photi asks how you're doing before asking what you want. 
            Because the answer to the first question is the only way to get the second one right.
          </p>
          <p style={{
            color: '#3D3D3A',
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            lineHeight: '1.8'
          }}>
            A caring guide that advises where to get the good stuff — and if you want to go deeper, 
            can go head first into the science and magic of this insane plant.
          </p>
        </div>
      </section>

      {/* The Daily Dose Section */}
      <section style={{ backgroundColor: '#163829' }} className="px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{
            color: '#B5873A',
            fontFamily: 'Georgia, serif',
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            The Daily Dose
          </h2>
          <p style={{
            color: '#9DC4B0',
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            lineHeight: '1.8',
            marginBottom: '32px'
          }}>
            After your conversation with Photi, get your personalized recommendations, 
            dispensary links, and a thought for the day — delivered to your inbox.
          </p>
          <p style={{
            color: '#B5873A',
            fontFamily: 'Georgia, serif',
            fontSize: '22px',
            fontStyle: 'italic',
            marginBottom: '48px'
          }}>
            "Don't forget you promised, Photi."
          </p>
          <a href="/chat" style={{
            backgroundColor: 'transparent',
            color: '#B5873A',
            fontFamily: 'Georgia, serif',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '14px 40px',
            borderRadius: '50px',
            textDecoration: 'none',
            display: 'inline-block',
            border: '2px solid #B5873A'
          }}>
            Start with Photi
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1E4D35', borderTop: '1px solid rgba(255,255,255,0.1)' }} className="px-8 py-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <p style={{ color: '#B5873A', fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 'bold' }}>
            MiQuest presents michigansdailydeals.com
          </p>
          <p style={{ color: '#9DC4B0', fontFamily: 'Georgia, serif', fontSize: '13px' }}>
            Photi powered by MiQuest · hello@michigansdailydeals.com
          </p>
          <div className="flex gap-6 mt-2">
            {['monroesdailydeals.com', 'detroitsdailydeals.com', 'traversecitysdailydeals.com'].map((domain) => (
              <a key={domain} href={`https://${domain}`} style={{
                color: '#9DC4B0',
                fontFamily: 'Georgia, serif',
                fontSize: '12px',
                textDecoration: 'none'
              }}>
                {domain}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}  