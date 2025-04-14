
import { Bell, Diamond, Users, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    description: 'Instant notifications for your safety',
    color: 'text-safyra-navy'
  },
  {
    icon: Diamond,
    title: 'Discreet Design',
    description: 'Elegance meets functionality',
    color: 'text-safyra-gold'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with a trusted network',
    color: 'text-safyra-emerald'
  },
  {
    icon: Lightbulb,
    title: 'Empowerment Tools',
    description: 'Resources at your fingertips',
    color: 'text-safyra-gold'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-safyra-navy text-center mb-16">
          Smart Protection, Elegant Design
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="feature-card flex flex-col items-center text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${feature.color} mb-4`}>
                <feature.icon size={36} />
              </div>
              <h3 className="text-xl font-bold text-safyra-navy mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
