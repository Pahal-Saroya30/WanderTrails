import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Destinations', 'About', 'Contact'];

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
      style={scrolled ? { borderColor: 'rgba(197,160,89,0.15)' } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #C5A059, #D4B375)' }}
          >
            <span className="font-playfair font-bold text-lg" style={{ color: '#1A2421' }}>W</span>
          </div>
          <div>
            <span className="font-playfair font-bold text-xl leading-none block" style={{ color: '#F6F1EB' }}>
              WanderTrails
            </span>
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#C5A059' }}>
              India
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="nav-link text-sm font-medium transition-colors duration-300"
              style={{ color: 'rgba(246,241,235,0.75)' }}
              onMouseEnter={e => (e.target.style.color = '#F6F1EB')}
              onMouseLeave={e => (e.target.style.color = 'rgba(246,241,235,0.75)')}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo('Contact')}
            className="btn-pulse px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(197,160,89,0.5)]"
            style={{
              background: 'linear-gradient(135deg, #C5A059, #D4B375)',
              color: '#1A2421',
            }}
          >
            Plan Your Trip
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: '#F6F1EB' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ background: '#F6F1EB' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: '#F6F1EB' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } glass border-t`}
        style={{ borderColor: 'rgba(197,160,89,0.15)' }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-base font-medium text-left transition-colors duration-200"
              style={{ color: 'rgba(246,241,235,0.75)' }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo('Contact')}
            className="px-5 py-2.5 rounded-full text-sm font-semibold w-full mt-2"
            style={{ background: 'linear-gradient(135deg, #C5A059, #D4B375)', color: '#1A2421' }}
          >
            Plan Your Trip
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
