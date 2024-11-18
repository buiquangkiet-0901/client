import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import tours from "../assets/data/tours";
import Booking from "../components/Booking/Booking";

const TourDetail = () => {
  const { id } = useParams();
  const tour = tours.find((t) => t.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviews, setReviews] = useState(tour.reviews || []);
  const [newComment, setNewComment] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [error, setError] = useState("");

  if (!tour) {
    return <div>Tour not found</div>;
  }

  // Xử lý gửi bình luận
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu
    if (!newComment.name || !newComment.comment || newComment.rating === 0) {
      setError("Please fill in all fields and select a rating.");
      return;
    }

    // Thêm bình luận mới
    const updatedReviews = [
      ...reviews,
      {
        name: newComment.name || "Anonymous",
        rating: newComment.rating,
        comment: newComment.comment,
        date: new Date().toLocaleDateString(),
      },
    ];

    setReviews(updatedReviews);

    // Reset form và lỗi
    setNewComment({ name: "", rating: 0, comment: "" });
    setError("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left section: Image and details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tour Image */}
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <img
              src={tour.images[activeImageIndex]}
              alt={`Tour destination ${tour.title}`}
              className="w-full h-full object-cover"
            />
            {/* Pagination dưới hình ảnh */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeImageIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Pricing and Details */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">{tour.title}</h1>
          
            <div className="flex justify-center items-center space-x-4 text-gray-700">
              <span className="flex items-center">
                <FaStar className="text-yellow-500" /> {tour.avgRating} ({tour.reviews?.length || 0} reviews)
              </span>
              <span>📍 {tour.city}</span>
              <span>💲 {tour.price}/person</span>
            </div>
            <p className="text-gray-600">{tour.desc}</p>
          </div>
        </div>

        {/* Right section: Booking Form */}
        <div>
          <Booking tour={tour} />
        </div>
      </div>

      {/* Guest Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Guest Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-800">{review.name}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Add Your Comment</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={newComment.name}
              onChange={(e) =>
                setNewComment({ ...newComment, name: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <select
              value={newComment.rating}
              onChange={(e) =>
                setNewComment({ ...newComment, rating: parseInt(e.target.value) })
              }
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">Select Rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value} Star{value > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              value={newComment.comment}
              onChange={(e) =>
                setNewComment({ ...newComment, comment: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment here"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourDetail;
