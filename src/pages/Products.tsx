import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'necklace', label: 'Necklaces' },
  { value: 'bracelet', label: 'Bracelets' },
  { value: 'ring', label: 'Rings' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'watch', label: 'Watches' },
  { value: 'other', label: 'Other' },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
    
  const handleLearnMore = (productId: number) => {
    navigate(`/products/${productId}`);
  };
  
  return (
    <PageLayout>
      <section className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-safyra-navy text-center mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Discover our range of elegant smart jewelry designed to keep you safe while complementing your style.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-safyra-navy text-white'
                    : 'bg-white text-safyra-navy hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card overflow-hidden hover:-translate-y-2 transition-all duration-300">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-safyra-emerald text-white">
                    Coming Soon
                  </Badge>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-safyra-navy mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-safyra-navy">{product.price}</span>
                    <Button 
                      className="bg-safyra-gold text-safyra-navy hover:bg-safyra-gold/90 transition-transform hover:scale-105"
                      onClick={() => handleLearnMore(product.id)}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Products;
