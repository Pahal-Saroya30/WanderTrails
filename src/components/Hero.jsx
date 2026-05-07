import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    const handleScroll = () => {
      if (!el) return;
      el.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDestinations = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">

      {/* Background image + rich overlay stack */}
      <div className="absolute inset-0 z-0">
        <div
          ref={heroRef}
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: "url('/hero_india.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        {/* Deep forest-green gradient to blend with site palette at the bottom */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,36,33,1) 0%, transparent 15%)' }} />
      </div>

      {/* Subtle floating particles — gold toned */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'rgba(197,160,89,0.55)',
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#C5A059' }} />
          <span className="text-sm font-medium tracking-wider uppercase" style={{ color: '#D4B375' }}>
            Discover Incredible India
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-playfair text-3xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-up drop-shadow-lg"
          style={{ color: '#F6F1EB', animationDelay: '0.2s' }}
        >
          Unfold the{' '}
          <span className="shimmer drop-shadow-lg">Unseen</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-4 font-semibold leading-relaxed animate-fade-in-up drop-shadow-md"
          style={{ color: '#F6F1EB', animationDelay: '0.4s' }}
        >
          Authentic Journeys to India's Best-Kept Secrets
        </p>

        {/* Sub-tagline */}
        <p
          className="text-base md:text-lg max-w-2xl mx-auto mb-12 font-medium animate-fade-in-up drop-shadow-md"
          style={{ color: 'rgba(246,241,235,0.85)', animationDelay: '0.5s' }}
        >
          From mist-covered valleys in the northeast to ancient coastal temples — we take you beyond the ordinary.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
        >
          <button
            onClick={scrollToDestinations}
            className="btn-pulse font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-2xl min-w-[190px]"
            style={{
              background: 'linear-gradient(135deg, #C5A059, #D4B375)',
              color: '#1A2421',
              boxShadow: '0 8px 32px rgba(197,160,89,0.25)',
            }}
          >
            ✦ Explore Destinations
          </button>
          <button
            onClick={scrollToContact}
            className="glass font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 min-w-[190px]"
            style={{
              color: '#F6F1EB',
              border: '1px solid rgba(197,160,89,0.35)',
            }}
          >
            Plan My Trip →
          </button>
        </div>

        {/* Stats */}
        <div
          className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16 animate-fade-in-up"
          style={{ animationDelay: '0.9s' }}
        >
          {[
            { value: '120+', label: 'Hidden Destinations' },
            { value: '5000+', label: 'Happy Travellers' },
            { value: '15+', label: 'Years of Experience' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-playfair text-3xl md:text-4xl font-bold gradient-text">{value}</div>
              <div className="text-sm mt-1 tracking-wide" style={{ color: 'rgba(246,241,235,0.50)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1" style={{ color: 'rgba(197,160,89,0.45)' }}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 animate-pulse" style={{ background: 'linear-gradient(to bottom, rgba(197,160,89,0.45), transparent)' }} />
      </div>
    </section>
  );
};

export default Hero;
