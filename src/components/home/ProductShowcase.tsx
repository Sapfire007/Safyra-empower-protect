
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { products as productsData } from '@/data/products';

const ProductShowcase = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Set up autoplay
  useEffect(() => {
    if (!isPaused && api) {
      const interval = setInterval(() => {
        api.scrollNext();
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [api, isPaused]);

  // Update current slide index when carousel changes
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Collection</h2>
          <Button 
            variant="outline" 
            className="rounded-full border-primary text-primary hover:bg-primary/10"
            asChild
          >
            <Link to="/products">
              View All Products
            </Link>
          </Button>
        </div>
        
        <div className="relative">
          <Carousel 
            setApi={setApi}
            className="w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {productsData.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="bg-white rounded-lg overflow-hidden h-full border border-gray-100">
                    <div className="relative h-48 bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Failed to load image: ${product.image}`);
                          e.currentTarget.src = '/imgs/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">
                        {product.description.split('.')[0]}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold text-primary">{product.price}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="rounded-full"
                          asChild
                        >
                          <Link to={`/products/${product.id}`}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom navigation arrows */}
            <button 
              onClick={() => api?.scrollPrev()} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            
            <button 
              onClick={() => api?.scrollNext()} 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </Carousel>
          
          <div className="flex items-center justify-center mt-8">
            <div className="flex space-x-2">
              {productsData.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    current === index ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
