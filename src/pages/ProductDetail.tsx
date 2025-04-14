
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import ProductImage from '@/components/products/ProductImage';
import ProductFeaturesList from '@/components/products/ProductFeaturesList';
import ProductSpecs from '@/components/products/ProductSpecs';
import AvailabilityNotice from '@/components/products/AvailabilityNotice';
import { products } from '@/data/products';

type Product = typeof products[0];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === Number(id));
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 pt-24 pb-16 flex justify-center items-center h-[50vh]">
          <p className="text-lg text-safyra-navy">Loading product details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!product) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-safyra-navy mb-4">Product Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button
            className="bg-safyra-navy text-white hover:bg-safyra-navy/90"
            onClick={() => navigate('/products')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Button
          variant="ghost"
          className="mb-6 text-safyra-navy hover:text-safyra-gold"
          onClick={() => navigate('/products')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collection
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <ProductImage image={product.image} name={product.name} />
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-safyra-navy mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-safyra-gold mb-4">{product.price}</p>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <ProductSpecs 
                materials={product.materials} 
                dimensions={product.dimensions} 
              />
            </div>
            
            <ProductFeaturesList features={product.features} />
            
            <AvailabilityNotice productName={product.name} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
