import React from 'react'
import { useState, useEffect } from 'react'
import CommonSection from '../Shared/CommonSection'
import SearchBar from '../Shared/SearchBar'
import TourCard from '../Shared/TourCard'
import tours from '../assets/data/tours'

const Tours = () => {
const [pageCount, setPageCount] = useState(0);
const [page, setPage] = useState(0);

const handlePageClick = (number) => {
  setPage(number);
};

useEffect(() => {
const itemsPerPage = 8;
const pages = Math.ceil(tours.length /itemsPerPage );
  setPageCount(pages);
}, [page]);

  return (
    <>
      <CommonSection/>
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tours?.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-4 gap-3">
  {[...Array(pageCount).keys()].map(number => (
    <span
      key={number}
      onClick={() => handlePageClick(number)}
      className={`cursor-pointer text-center px-3 py-1 rounded-full border ${
        number === page ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
      } transition-all duration-200`}
      style={{ minWidth: '40px' }}
    >
      {number + 1}
    </span>
  ))}
</div>
    </>
  )
}

export default Tours