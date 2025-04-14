
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, name }) => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-white shadow-md">
      <img 
        src={image} 
        alt={name}
        className="w-full h-[500px] object-cover"
      />
      <Badge 
        className="absolute top-6 right-6 bg-safyra-emerald text-white text-base px-4 py-1"
      >
        Coming Soon
      </Badge>
    </div>
  );
};

export default ProductImage;
