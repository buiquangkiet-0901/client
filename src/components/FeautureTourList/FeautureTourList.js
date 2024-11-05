import React from 'react';
import TourCard from '../../Shared/TourCard';
import tours from '../../assets/data/tours';

const FeautureTourList = () => {
  if (!tours || tours.length === 0) {
    return <div>No tours available</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tours.map(tour => (
        <div key={tour.id} className="mb-4">
          <TourCard tour={tour} />
        </div>
      ))}
    </div>
  );
};

export default FeautureTourList;
