
import React from 'react';

interface ProductFeaturesListProps {
  features: string[];
}

const ProductFeaturesList: React.FC<ProductFeaturesListProps> = ({ features }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-safyra-navy mb-4">Key Features</h2>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block h-2 w-2 bg-safyra-gold rounded-full mt-2 mr-2"></span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeaturesList;
