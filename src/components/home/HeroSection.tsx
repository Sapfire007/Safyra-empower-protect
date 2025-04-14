
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-safyra-navy/30 z-10"
          aria-hidden="true"
        ></div>
        <img
          src="https://images.unsplash.com/photo-1545622783-b3e021430fee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Woman wearing elegant jewelry"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
            Empower Your Safety with Safyra
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            Smart jewelry that protects and empowers
          </p>
          <Link 
            to="/products" 
            className="cta-button inline-block animate-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            Discover Our Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
