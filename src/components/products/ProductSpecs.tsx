
import React from 'react';

interface ProductSpecsProps {
  materials: string;
  dimensions: string;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ materials, dimensions }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <h3 className="text-sm font-semibold text-safyra-navy mb-1">Materials</h3>
        <p className="text-gray-600">{materials}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-safyra-navy mb-1">Dimensions</h3>
        <p className="text-gray-600">{dimensions}</p>
      </div>
    </div>
  );
};

export default ProductSpecs;
