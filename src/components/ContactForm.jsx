import { useState, useRef, useEffect } from 'react';

const destinations = [
  'Ziro Valley, Arunachal Pradesh',
  'Majuli Island, Assam',
  'Gokarna, Karnataka',
  'Spiti Valley, Himachal Pradesh',
  'Tawang, Arunachal Pradesh',
  'Dholavira, Gujarat',
  'Chopta, Uttarakhand',
  'Gandikota, Andhra Pradesh',
  'Dzukou Valley, Nagaland',
  'Other / Custom Destination',
];

const inputBaseStyle = {
  width: '100%',
  background: 'rgba(197,160,89,0.05)',
  border: '1px solid rgba(197,160,89,0.18)',
  borderRadius: '0.75rem',
  padding: '0.875rem 1rem',
  color: '#F6F1EB',
  fontSize: '0.875rem',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  outline: 'none',
};

const InputField = ({ label, id, type = 'text', placeholder, value, onChange, error, required, pattern, maxLength, min, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <label htmlFor={id} style={{ color: 'rgba(246,241,235,0.65)', fontSize: '0.8125rem', fontWeight: 500 }}>
      {label} {required && <span style={{ color: '#C5A059' }}>*</span>}
    </label>
    {children || (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
        min={min}
        className="form-input"
        style={{
          ...inputBaseStyle,
          borderColor: error ? 'rgba(180,100,80,0.55)' : 'rgba(197,160,89,0.18)',
        }}
      />
    )}
    {error && <p style={{ color: '#B06050', fontSize: '0.75rem' }}>{error}</p>}
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', destination: '',
    checkin: '', checkout: '', groupSize: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Please enter a valid email';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone)) errs.phone = 'Please enter a valid 10-digit phone number';
    if (!formData.destination) errs.destination = 'Please select a destination';
    if (!formData.checkin) errs.checkin = 'Check-in date is required';
    if (!formData.checkout) errs.checkout = 'Check-out date is required';
    return errs;
  };

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    
    setSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "85c88fdf-ef39-4fba-9a0a-efb266ad0eea",
          ...formData
        }),
      });
      
      const json = await response.json();
      
      if (response.status === 200 || json.success) {
        setSubmittedData({ name: formData.name, email: formData.email });
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', destination: '', checkin: '', checkout: '', groupSize: '', message: '' });
      } else {
        alert(json.message || "Something went wrong submitting the form.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whyUs = [
    { icon: '🎯', title: 'Curated Experiences', desc: 'Every itinerary is handcrafted, never templated.' },
    { icon: '🤝', title: 'Local Experts', desc: 'Our guides are locals, not just tour operators.' },
    { icon: '🌿', title: 'Sustainable Travel', desc: 'We partner with responsible eco-lodges and communities.' },
    { icon: '📞', title: '24/7 Support', desc: 'We are with you throughout your journey.' },
  ];

  return (
    <section id="contact" className="relative py-32 px-6" style={{ backgroundColor: '#182620' }} ref={sectionRef}>
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 25% 50%, #C5A059 0%, transparent 55%), radial-gradient(circle at 75% 50%, #D4B375 0%, transparent 55%)'
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #C5A059)' }} />
            <span className="text-sm font-medium tracking-widest uppercase" style={{ color: '#C5A059' }}>Plan With Us</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #C5A059)' }} />
          </div>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6" style={{ color: '#F6F1EB' }}>
            Start Your <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(246,241,235,0.50)' }}>
            Tell us your dream, and we will craft an experience that exceeds it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Left — Why us */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="sticky top-28">
              <h3 className="font-playfair text-2xl font-bold mb-8" style={{ color: '#F6F1EB' }}>Why WanderTrails India?</h3>
              <div className="flex flex-col gap-6">
                {whyUs.map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 group">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-colors duration-300"
                      style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.18)' }}
                    >
                      {icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#F6F1EB' }}>{title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,235,0.50)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(197,160,89,0.12)' }}>
                <p className="text-sm mb-4" style={{ color: 'rgba(246,241,235,0.38)' }}>Or reach us directly:</p>
                <div className="flex flex-col gap-3">
                  <a href="mailto:hello@wandertrailsindia.com" className="flex items-center gap-3 text-sm transition-colors" style={{ color: 'rgba(246,241,235,0.55)' }}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    hello@wandertrailsindia.com
                  </a>
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-sm transition-colors" style={{ color: 'rgba(246,241,235,0.55)' }}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {submitted ? (
              <div
                className="rounded-3xl p-12 text-center"
                style={{ backgroundColor: '#1E2D28', border: '1px solid rgba(197,160,89,0.22)' }}
              >
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #C5A059, #D4B375)', color: '#1A2421', boxShadow: '0 8px 32px rgba(197,160,89,0.25)' }}
                >
                  &#10003;
                </div>
                <h3 className="font-playfair text-3xl font-bold mb-4" style={{ color: '#F6F1EB' }}>Success! We've received your inquiry</h3>
                <p className="text-base mb-4 leading-relaxed" style={{ color: 'rgba(246,241,235,0.60)' }}>
                  Thank you, <span style={{ color: '#C5A059', fontWeight: 600 }}>{submittedData?.name}</span>! Our travel expert will reach out within 24 hours with a personalised itinerary.
                </p>
                <p className="text-sm" style={{ color: 'rgba(246,241,235,0.38)' }}>Check your inbox at {submittedData?.email}</p>
                <button
                  onClick={() => { setSubmitted(false); setSubmittedData(null); }}
                  className="mt-8 text-sm underline underline-offset-4 transition-colors"
                  style={{ color: '#C5A059' }}
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl p-8 md:p-10 space-y-6"
                style={{ backgroundColor: '#1E2D28', border: '1px solid rgba(197,160,89,0.12)' }}
                noValidate
              >
                {/* Web3Forms Access Key */}
                <input type="hidden" name="access_key" value="85c88fdf-ef39-4fba-9a0a-efb266ad0eea" />
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label="Full Name" id="name" placeholder="e.g. Priya Sharma" value={formData.name} onChange={handleChange('name')} error={errors.name} required />
                  <InputField label="Email Address" id="email" type="email" placeholder="priya@email.com" value={formData.email} onChange={handleChange('email')} error={errors.email} required />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label="Phone Number" id="phone" type="tel" placeholder="9876543210" value={formData.phone} onChange={handleChange('phone')} error={errors.phone} pattern="[0-9]{10}" maxLength="10" required />
                  <InputField label="Group Size" id="groupSize" type="number" placeholder="e.g. 2" value={formData.groupSize} onChange={handleChange('groupSize')} error={errors.groupSize} required />
                </div>

                {/* Destination */}
                <InputField label="Preferred Destination" id="destination" error={errors.destination} required>
                  <select
                    id="destination"
                    value={formData.destination}
                    onChange={handleChange('destination')}
                    className="form-input"
                    style={{
                      ...inputBaseStyle,
                      borderColor: errors.destination ? 'rgba(180,100,80,0.55)' : 'rgba(197,160,89,0.18)',
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundColor: 'rgba(197,160,89,0.05)',
                    }}
                  >
                    <option value="" style={{ background: '#1E2D28' }}>Select a destination...</option>
                    {destinations.map((d) => (
                      <option key={d} value={d} style={{ background: '#1E2D28' }}>{d}</option>
                    ))}
                  </select>
                </InputField>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label="Check-in Date" id="checkin" type="date" value={formData.checkin} onChange={handleChange('checkin')} error={errors.checkin} min={today} required />
                  <InputField label="Check-out Date" id="checkout" type="date" value={formData.checkout} onChange={handleChange('checkout')} error={errors.checkout} min={today} required />
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="message" style={{ color: 'rgba(246,241,235,0.65)', fontSize: '0.8125rem', fontWeight: 500 }}>
                    Tell us about your dream trip
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Any special interests, dietary requirements, or activities you would love?"
                    value={formData.message}
                    onChange={handleChange('message')}
                    className="form-input"
                    style={{ ...inputBaseStyle, resize: 'none' }}
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-300"
                  style={
                    submitting
                      ? { background: 'rgba(197,160,89,0.3)', color: 'rgba(246,241,235,0.4)', cursor: 'not-allowed' }
                      : { background: 'linear-gradient(135deg, #C5A059, #D4B375)', color: '#1A2421', boxShadow: '0 8px 28px rgba(197,160,89,0.22)' }
                  }
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" style={{ color: 'rgba(246,241,235,0.6)' }}>
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    <span>&#10086; Send My Inquiry</span>
                  )}
                </button>

                <p className="text-center text-xs" style={{ color: 'rgba(246,241,235,0.28)' }}>
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
