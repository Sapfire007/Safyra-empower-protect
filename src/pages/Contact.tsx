
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <PageLayout>
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-safyra-navy text-center mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Have questions about our products or need assistance? We're here to help.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-safyra-navy mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-safyra-navy font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-safyra-navy font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-safyra-navy font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Product Inquiry"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-safyra-navy font-medium mb-2">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="cta-button w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <div className="bg-safyra-navy text-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-safyra-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <p className="text-gray-300">support@safyra.com</p>
                      <p className="text-gray-300">sales@safyra.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-safyra-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <p className="text-gray-300">+1-800-SAFYRA</p>
                      <p className="text-gray-300">Monday-Friday, 9AM-5PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-safyra-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Visit Us</h3>
                      <p className="text-gray-300">Safyra Headquarters</p>
                      <p className="text-gray-300">1234 Innovation Drive</p>
                      <p className="text-gray-300">San Francisco, CA 94103</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="bg-white p-2 rounded-lg shadow-md h-80 overflow-hidden">
                <img 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=13&size=600x400&key=&style=feature:all|element:labels|visibility:off" 
                  alt="Map of Safyra Headquarters location"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-safyra-navy mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Find quick answers to common questions about our products and services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-safyra-navy mb-3">How does Safyra jewelry work?</h3>
              <p className="text-gray-600">Our smart jewelry connects to your smartphone via Bluetooth and uses discreet buttons to trigger alerts to your emergency contacts with your GPS location.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-safyra-navy mb-3">How long does the battery last?</h3>
              <p className="text-gray-600">Battery life varies by product, but most Safyra pieces last between 24-48 hours on a single charge, with discreet charging cases included.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-safyra-navy mb-3">Is Safyra jewelry water-resistant?</h3>
              <p className="text-gray-600">Yes, all Safyra jewelry is splash-resistant. Our bracelets and watches are water-resistant up to 30 meters for brief immersion.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-safyra-navy mb-3">Do you ship internationally?</h3>
              <p className="text-gray-600">Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days, with tracking provided.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
