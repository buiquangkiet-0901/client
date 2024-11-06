import React from "react";
import { useState, useEffect } from "react";

import CommonSection from "../Shared/CommonSection";
import SearchBar from "../Shared/SearchBar";
import TourCard from "../Shared/TourCard";
import tours from "../assets/data/tours";

const Tours = () => {
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
  }, [page]);

  return (
    <>
      <CommonSection title="Discover Our Tours" />
      <section>
        <SearchBar />
        {/* Add tour list here */}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </section>

      <div className="flex items-center justify-center mt-4 gap-3 pb-9">
  {[...Array(pageCount).keys()].map((number) => (
    <span
      key={number}
      onClick={() => setPage(number)}
      className={`px-3 py-1 rounded-lg cursor-pointer ${
        page === number ? "bg-blue-500 text-white font-semibold" : "bg-gray-200 text-gray-700"
      } hover:bg-blue-300 transition`}
    >
      {number + 1}
    </span>
  ))}
</div>

    </>
  );
};

export default Tours;
