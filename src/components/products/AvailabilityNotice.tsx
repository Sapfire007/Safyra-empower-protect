
import React from 'react';

interface AvailabilityNoticeProps {
  productName: string;
}

const AvailabilityNotice: React.FC<AvailabilityNoticeProps> = ({ productName }) => {
  return (
    <div className="bg-safyra-lightGray p-6 rounded-lg border border-safyra-gold/20">
      <h3 className="text-lg font-semibold text-safyra-navy mb-2">Availability Notice</h3>
      <p className="text-gray-700">
        This product is currently in development and will be available for purchase soon. 
        Sign up for our newsletter to be notified when the {productName} becomes available.
      </p>
    </div>
  );
};

export default AvailabilityNotice;
