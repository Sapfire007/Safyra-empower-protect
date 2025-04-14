
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ProductShowcase from '@/components/home/ProductShowcase';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('safyra_auth') === 'true';

  // This is just to help users know they can log in
  useEffect(() => {
    if (!isLoggedIn) {
      // Show a one-time hint for demo purposes
      const hasShownHint = sessionStorage.getItem('hint_shown');
      if (!hasShownHint) {
        setTimeout(() => {
          alert('Hint: You can log in with:\nEmail: admin@admin.com\nPassword: admin123');
          sessionStorage.setItem('hint_shown', 'true');
        }, 2000);
      }
    }
  }, [isLoggedIn]);

  return (
    <PageLayout>
      <HeroSection />
      <FeaturesSection />
      <ProductShowcase />
      <TestimonialsSection />
      <CtaSection />
    </PageLayout>
  );
};

export default Index;
