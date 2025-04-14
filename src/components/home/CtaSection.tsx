
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const CtaSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "Thank you for joining the Safyra community.",
        variant: "default",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="py-20 bg-safyra-navy text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join the Safyra Community
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Stay updated with our latest products, safety tips, and exclusive offers.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-grow px-4 py-3 text-safyra-navy border-2 border-transparent rounded-lg focus:border-safyra-gold focus:outline-none transition-all duration-300"
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-safyra-gold text-safyra-navy font-bold rounded-lg transition-all duration-300 hover:bg-white disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
