const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Destinations: ['Ziro Valley', 'Majuli Island', 'Gokarna', 'Spiti Valley', 'More Destinations'],
    Company: ['About Us', 'Our Story', 'Sustainability', 'Press', 'Careers'],
    Support: ['FAQ', 'Travel Tips', 'Booking Policy', 'Privacy Policy', 'Terms of Service'],
  };

  const socials = [
    { name: 'Instagram', icon: '📸', href: '#' },
    { name: 'YouTube', icon: '▶️', href: '#' },
    { name: 'Facebook', icon: '👥', href: '#' },
    { name: 'Twitter/X', icon: '✕', href: '#' },
  ];

  return (
    <footer className="pt-20 pb-10 px-6" style={{ backgroundColor: '#111C18', borderTop: '1px solid rgba(197,160,89,0.10)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #C5A059, #D4B375)', boxShadow: '0 4px 20px rgba(197,160,89,0.20)' }}
              >
                <span className="font-playfair font-bold text-lg" style={{ color: '#1A2421' }}>W</span>
              </div>
              <div>
                <span className="font-playfair font-bold text-xl leading-none block" style={{ color: '#F6F1EB' }}>WanderTrails</span>
                <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#C5A059' }}>India</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-8" style={{ color: 'rgba(246,241,235,0.38)' }}>
              Crafting soulful journeys to the hidden heart of India since 2009. Every trail tells a story — yours begins here.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {socials.map(({ name, icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(197,160,89,0.06)',
                    border: '1px solid rgba(197,160,89,0.15)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(197,160,89,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(197,160,89,0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(197,160,89,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(197,160,89,0.15)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-5 tracking-wide" style={{ color: '#F6F1EB' }}>{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(246,241,235,0.38)' }}
                      onMouseEnter={e => (e.target.style.color = '#C5A059')}
                      onMouseLeave={e => (e.target.style.color = 'rgba(246,241,235,0.38)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-12"
          style={{ background: 'rgba(197,160,89,0.05)', border: '1px solid rgba(197,160,89,0.14)' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h4 className="font-playfair text-xl font-bold mb-2" style={{ color: '#F6F1EB' }}>Travel Inspiration, Monthly</h4>
              <p className="text-sm" style={{ color: 'rgba(246,241,235,0.40)' }}>Hidden gems, seasonal guides, and exclusive early-bird offers.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="form-input flex-1 md:w-64 rounded-xl px-4 py-3 text-sm"
                style={{
                  background: 'rgba(197,160,89,0.05)',
                  border: '1px solid rgba(197,160,89,0.18)',
                  color: '#F6F1EB',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
              <button
                className="px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #C5A059, #D4B375)',
                  color: '#1A2421',
                  boxShadow: '0 4px 16px rgba(197,160,89,0.20)',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Gold rule divider */}
        <div className="gold-rule mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'rgba(246,241,235,0.28)' }}>
            &copy; {currentYear} WanderTrails India. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(246,241,235,0.28)' }}>
            <span>Made with</span>
            <span style={{ color: '#C5A059' }}>&#9825;</span>
            <span>for the love of Bharat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
