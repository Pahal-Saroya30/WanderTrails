import { useState, useRef, useEffect } from 'react';

const destinations = [
  {
    id: 'ziro',
    name: 'Ziro Valley',
    state: 'Arunachal Pradesh',
    image: '/ziro_valley.png',
    badge: 'UNESCO Tentative List',
    badgeStyle: { background: 'linear-gradient(135deg, #2D6A4F, #40916C)', color: '#F6F1EB' },
    description: "A pristine valley cradled by pine forests, home to the ancient Apatani tribe — one of India's most intriguing indigenous cultures.",
    highlights: ['Apatani Culture', 'Pine Forests', 'Music Festival', 'Organic Farming'],
    duration: '4–6 Days',
    bestTime: 'Mar – Oct',
    difficulty: 'Easy',
    difficultyColor: '#6BAE8A',
    icon: '🏔️',
  },
  {
    id: 'majuli',
    name: 'Majuli Island',
    state: 'Assam',
    image: '/majuli_island.png',
    badge: "World's Largest River Island",
    badgeStyle: { background: 'linear-gradient(135deg, #2C4A6E, #3A6491)', color: '#F6F1EB' },
    description: 'A mystical floating world on the Brahmaputra — a cradle of Vaishnavite culture, vibrant festivals, and rare migratory birds.',
    highlights: ['Satra Monasteries', 'Mishing Tribe', 'Bird Watching', 'River Cruises'],
    duration: '3–5 Days',
    bestTime: 'Oct – Mar',
    difficulty: 'Easy',
    difficultyColor: '#6BAE8A',
    icon: '🏝️',
  },
  {
    id: 'gokarna',
    name: 'Gokarna',
    state: 'Karnataka',
    image: '/gokarna_beach.png',
    badge: 'Sacred Coastal Gem',
    badgeStyle: { background: 'linear-gradient(135deg, #A8853E, #C5A059)', color: '#1A2421' },
    description: 'Where ancient temples meet untouched beaches — the perfect blend of spirituality and sun-drenched serenity on the Konkan coast.',
    highlights: ['Om Beach', 'Mahabaleshwar Temple', 'Dolphin Spotting', 'Coastal Treks'],
    duration: '3–4 Days',
    bestTime: 'Oct – Feb',
    difficulty: 'Easy',
    difficultyColor: '#6BAE8A',
    icon: '🌊',
  },
  {
    id: 'spiti',
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    image: '/spiti_valley.png',
    badge: 'Land of Lamas',
    badgeStyle: { background: 'linear-gradient(135deg, #4A3960, #6B5487)', color: '#F6F1EB' },
    description: 'A cold desert mountain valley at 12,500 ft — where ancient monasteries, bone-white landscapes, and raw Himalayan grandeur converge.',
    highlights: ['Key Monastery', 'Chandratal Lake', 'Fossil Park', 'Stargazing'],
    duration: '7–10 Days',
    bestTime: 'May – Sep',
    difficulty: 'Challenging',
    difficultyColor: '#C08070',
    icon: '❄️',
  },
];

const DestinationCard = ({ dest, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={cardRef}
      className={`group dest-card rounded-3xl overflow-hidden flex flex-col transition-all duration-700 bg-white/5 backdrop-blur-md border border-white/10 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden flex-shrink-0">
        <img
          src={dest.image}
          alt={dest.name}
          className="card-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1E2D28 0%, rgba(26,36,33,0.15) 55%, transparent 100%)' }} />

        {/* Badge */}
        <div className="absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg" style={dest.badgeStyle}>
          {dest.badge}
        </div>

        {/* Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 glass rounded-xl flex items-center justify-center text-xl">
          {dest.icon}
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="text-xs font-medium tracking-widest uppercase mb-0.5" style={{ color: 'rgba(197,160,89,0.65)' }}>
            {dest.state}
          </div>
          <h3 className="font-playfair text-2xl font-bold" style={{ color: '#F6F1EB' }}>{dest.name}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(246,241,235,0.58)' }}>{dest.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-5">
          {dest.highlights.map((h) => (
            <span
              key={h}
              className="text-xs px-3 py-1 rounded-full"
              style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.18)', color: 'rgba(246,241,235,0.65)' }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs border-t pt-4 mb-5" style={{ borderColor: 'rgba(197,160,89,0.12)', color: 'rgba(246,241,235,0.45)' }}>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{dest.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3" />
            </svg>
            <span>{dest.bestTime}</span>
          </div>
          <div className="font-medium" style={{ color: dest.difficultyColor }}>{dest.difficulty}</div>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToContact}
          className="mt-auto w-full font-semibold py-3 rounded-2xl text-sm transition-all duration-300 group"
          style={{
            background: 'rgba(197,160,89,0.08)',
            border: '1px solid rgba(197,160,89,0.25)',
            color: '#C5A059',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #C5A059, #D4B375)';
            e.currentTarget.style.border = '1px solid transparent';
            e.currentTarget.style.color = '#1A2421';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(197,160,89,0.08)';
            e.currentTarget.style.border = '1px solid rgba(197,160,89,0.25)';
            e.currentTarget.style.color = '#C5A059';
          }}
        >
          Inquire About This Trip →
        </button>
      </div>
    </div>
  );
};

const FeaturedDestinations = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="destinations" className="py-32 px-6 relative" style={{ backgroundColor: '#182620' }}>
      <div className="absolute top-0 left-0 right-0 h-20" style={{ background: 'linear-gradient(to bottom, #1A2421, transparent)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #C5A059)' }} />
            <span className="text-sm font-medium tracking-widest uppercase" style={{ color: '#C5A059' }}>
              Curated Journeys
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #C5A059)' }} />
          </div>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F6F1EB' }}>
            Featured{' '}
            <span className="gradient-text">Destinations</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(246,241,235,0.50)' }}>
            Four handpicked secrets of India that most tourists never discover — each a world unto itself.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.id} dest={dest} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-sm mb-4" style={{ color: 'rgba(246,241,235,0.35)' }}>And 100+ more hidden gems waiting to be explored</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium underline underline-offset-4 transition-colors"
            style={{ color: '#C5A059' }}
          >
            Request a custom itinerary →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
