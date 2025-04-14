
const testimonials = [
  {
    id: 1,
    quote: "Safyra gives me peace of mind whether I'm commuting at night or traveling solo. The elegant design means no one knows it's also my personal security system.",
    name: "Michelle K.",
    title: "Marketing Executive",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: 2,
    quote: "As a college student, my Safyra bracelet makes me feel secure walking across campus late at night. It's stylish enough for everyday wear and formal events.",
    name: "Sophia R.",
    title: "University Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    quote: "I bought Safyra for my daughter who just moved to the city. It's the perfect combination of fashion and safety that she actually wants to wear every day.",
    name: "Jennifer L.",
    title: "Mother & Business Owner",
    image: "https://randomuser.me/api/portraits/women/67.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-safyra-navy text-center mb-12">
          What Our Customers Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="flex flex-col items-center text-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-safyra-gold"
                />
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <h4 className="font-bold text-safyra-navy">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
