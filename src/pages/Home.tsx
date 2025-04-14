import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-safyra-navy mb-4">
            Welcome to Safyra
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering and protecting through innovative smart jewelry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-safyra-lightGray p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-safyra-navy mb-3">Our Mission</h2>
            <p className="text-gray-600">
              At Safyra, we're dedicated to creating beautiful jewelry that combines 
              fashion with cutting-edge technology to enhance your safety and well-being.
            </p>
          </div>
          
          <div className="bg-safyra-lightGray p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-safyra-navy mb-3">Get Started</h2>
            <p className="text-gray-600 mb-4">
              Visit your dashboard to manage your Safyra smart jewelry and explore its features.
            </p>
            <Link 
              to="/dashboard" 
              className="px-4 py-2 bg-safyra-gold text-white rounded-md hover:bg-safyra-navy transition-colors duration-300 inline-block"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;