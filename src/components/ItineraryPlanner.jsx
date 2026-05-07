import { useState, useRef, useEffect } from 'react';

const itineraries = {
  spiti: [
    { day: 1, title: 'Acclimatization in Kaza', desc: 'Arrive in Kaza. Rest, hydrate, and explore the local market to adjust to the high altitude (12,500 ft).' },
    { day: 2, title: 'Key Monastery & Kibber', desc: 'Visit the iconic Key Gompa, perched spectacularly on a hill, followed by the high-altitude village of Kibber.' },
    { day: 3, title: 'Langza & Hikkim', desc: 'Hunt for marine fossils in Langza and send a postcard from the world\'s highest post office in Hikkim.' }
  ],
  ziro: [
    { day: 1, title: 'Arrival & Apatani Villages', desc: 'Settle into your local homestay and take a guided walk through Hong, one of the largest villages.' },
    { day: 2, title: 'Paddy Fields & Pine Groves', desc: 'Trek through the famous terraced rice farms where fish and rice are cultivated together.' },
    { day: 3, title: 'Cultural Immersion', desc: 'Interact with the local elders, learn traditional weaving, and enjoy evening Apong (rice beer).' }
  ],
  generic: [
    { day: 1, title: 'Arrival & Orientation', desc: 'Settle into your premium accommodation. Enjoy a welcome dinner and personalized trip briefing.' },
    { day: 2, title: 'Guided Exploration', desc: 'A full day of curated sightseeing to the region\'s most hidden and spectacular viewpoints.' },
    { day: 3, title: 'Leisure & Departure', desc: 'Free morning for local shopping, slow walks, or relaxation before your onward journey.' }
  ]
};

const inputBaseStyle = {
  width: '100%',
  background: 'rgba(197,160,89,0.05)',
  border: '1px solid rgba(197,160,89,0.18)',
  borderRadius: '0.75rem',
  padding: '0.875rem 1rem',
  color: '#F6F1EB',
  fontSize: '0.875rem',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.3s, box-shadow 0.3s',
  outline: 'none',
};

const ItineraryPlanner = () => {
  const [dest, setDest] = useState('');
  const [days, setDays] = useState('3');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = () => {
    if (!result) return;
    const text = `3-Day Escape to ${result.name}\n\n` + 
      result.data.map(item => `Day ${item.day}: ${item.title}\n${item.desc}`).join('\n\n') + 
      '\n\nAI-generated for WanderTrails India';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!dest.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const d = dest.toLowerCase();
      if (d.includes('spiti')) setResult({ name: dest, data: itineraries.spiti });
      else if (d.includes('ziro')) setResult({ name: dest, data: itineraries.ziro });
      else setResult({ name: dest, data: itineraries.generic });
      
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="py-32 px-6 relative" style={{ backgroundColor: '#1A2421' }} ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #C5A059)' }} />
            <span className="text-sm font-medium tracking-widest uppercase" style={{ color: '#C5A059' }}>
              AI Magic
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #C5A059)' }} />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F6F1EB' }}>
            Instant <span className="gradient-text">Itinerary Planner</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(246,241,235,0.60)' }}>
            Tell us where you want to go, and we'll instantly generate a perfect 3-day snapshot of your adventure.
          </p>
        </div>

        {/* Interactive Form */}
        <div 
          className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label htmlFor="planner-dest" className="block text-sm mb-2 font-medium" style={{ color: 'rgba(246,241,235,0.8)' }}>
                Destination
              </label>
              <input
                id="planner-dest"
                type="text"
                placeholder="e.g. Spiti, Ziro, Gokarna..."
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                required
                style={inputBaseStyle}
                onFocus={e => { e.target.style.borderColor = '#C5A059'; e.target.style.boxShadow = '0 0 0 3px rgba(197,160,89,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(197,160,89,0.18)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="planner-days" className="block text-sm mb-2 font-medium" style={{ color: 'rgba(246,241,235,0.8)' }}>
                Number of Days
              </label>
              <select
                id="planner-days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                style={{ ...inputBaseStyle, appearance: 'none', cursor: 'pointer' }}
                onFocus={e => { e.target.style.borderColor = '#C5A059'; e.target.style.boxShadow = '0 0 0 3px rgba(197,160,89,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(197,160,89,0.18)'; e.target.style.boxShadow = 'none'; }}
              >
                <option value="3" style={{ background: '#1E2D28' }}>3 Days (Demo)</option>
                <option value="5" style={{ background: '#1E2D28' }} disabled>5 Days (Coming Soon)</option>
                <option value="7" style={{ background: '#1E2D28' }} disabled>7 Days (Coming Soon)</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading || !dest.trim()}
              className="w-full md:w-auto px-8 py-[0.875rem] rounded-xl font-bold text-sm transition-all duration-300 h-[46px] flex items-center justify-center whitespace-nowrap"
              style={
                loading || !dest.trim()
                  ? { background: 'rgba(197,160,89,0.2)', color: 'rgba(246,241,235,0.4)', cursor: 'not-allowed' }
                  : { background: 'linear-gradient(135deg, #C5A059, #D4B375)', color: '#1A2421', boxShadow: '0 4px 16px rgba(197,160,89,0.25)' }
              }
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Crafting...
                </span>
              ) : (
                '✨ Generate Magic Itinerary'
              )}
            </button>
          </form>

          {/* Result Area */}
          <div className={`mt-8 transition-all duration-500 overflow-hidden ${result ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {result && (
              <div className="pt-8 border-t border-white/10">
                <h3 className="font-playfair text-2xl font-bold mb-6 text-center" style={{ color: '#F6F1EB' }}>
                  Your 3-Day Escape to <span style={{ color: '#C5A059' }}>{result.name}</span>
                </h3>
                
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#C5A059] before:via-[#C5A059]/50 before:to-transparent">
                  {result.data.map((item, idx) => (
                    <div key={item.day} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
                           style={{ backgroundColor: '#1A2421', borderColor: '#1E2D28', color: '#C5A059' }}>
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C5A059' }}></span>
                      </div>
                      
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:-translate-y-1 transition-transform duration-300 shadow-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold px-2 py-1 rounded bg-[#C5A059]/10 text-[#C5A059]">Day {item.day}</span>
                          <h4 className="font-semibold text-[#F6F1EB]">{item.title}</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-[#F6F1EB]/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="mt-10 flex flex-col items-center justify-center border-t border-white/10 pt-6 gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{ 
                      background: copied ? '#6BAE8A' : 'rgba(197,160,89,0.1)', 
                      color: copied ? '#1A2421' : '#C5A059',
                      border: copied ? '1px solid #6BAE8A' : '1px solid rgba(197,160,89,0.3)'
                    }}
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                  <span className="text-xs italic" style={{ color: 'rgba(246,241,235,0.35)' }}>
                    AI-generated for WanderTrails India
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryPlanner;
