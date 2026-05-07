import { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Anika Mehta',
    location: 'Mumbai',
    avatar: 'AM',
    rating: 5,
    text: "WanderTrails took us to Ziro Valley for our anniversary — it was like stepping into another world. The Apatani village homestay was beyond anything I'd imagined. Absolutely life-changing.",
    destination: 'Ziro Valley',
  },
  {
    name: 'Rohan Kapoor',
    location: 'Bengaluru',
    avatar: 'RK',
    rating: 5,
    text: 'Spiti Valley in September is indescribable. The Key Monastery at sunrise, the Chandratal Lake reflections, the stars at night — WanderTrails got every detail right. No generic itinerary; pure magic.',
    destination: 'Spiti Valley',
  },
  {
    name: 'Sunita & Deepak',
    location: 'Delhi',
    avatar: 'SD',
    rating: 5,
    text: "We've travelled with 4 operators before. WanderTrails is on a completely different level. Majuli Island felt personal, not touristy. Their local guide Ranjit was extraordinary.",
    destination: 'Majuli Island',
  },
];

const TestimonialsSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 px-6" style={{ backgroundColor: '#1A2421' }} ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #C5A059)' }} />
            <span className="text-sm font-medium tracking-widest uppercase" style={{ color: '#C5A059' }}>
              Traveller Stories
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #C5A059)' }} />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F6F1EB' }}>
            Words from the <span className="gradient-text">Trail</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, location, avatar, rating, text, destination }, i) => (
            <div
              key={name}
              className={`rounded-3xl p-7 transition-all duration-700 hover:-translate-y-2 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                backgroundColor: '#1E2D28',
                border: '1px solid rgba(197,160,89,0.10)',
                transitionDelay: `${i * 150 + 200}ms`,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.28)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.10)')}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(rating)].map((_, j) => (
                  <span key={j} className="text-sm" style={{ color: '#C5A059' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed mb-6 italic" style={{ color: 'rgba(246,241,235,0.65)' }}>"{text}"</p>

              {/* Destination tag */}
              <div
                className="inline-block text-xs px-3 py-1 rounded-full mb-5"
                style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.22)', color: '#C5A059' }}
              >
                📍 {destination}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(197,160,89,0.10)' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C5A059, #D4B375)', color: '#1A2421' }}
                >
                  {avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#F6F1EB' }}>{name}</div>
                  <div className="text-xs" style={{ color: 'rgba(246,241,235,0.40)' }}>{location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
