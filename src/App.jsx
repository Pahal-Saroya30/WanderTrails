import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedDestinations from './components/FeaturedDestinations';
import ItineraryPlanner from './components/ItineraryPlanner';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#1A2421', color: '#F6F1EB' }}>
      <Navbar />
      <main>
        <Hero />
        <FeaturedDestinations />
        <ItineraryPlanner />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
