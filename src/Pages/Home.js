import React, { useState } from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import SearchBar from '../Shared/SearchBar';
import ServiceList from '../Shared/ServiceList';
import FeautureTourList from '../components/FeautureTourList/FeautureTourList';
import Chatbot from '../components/ChatBot/Chatbot'; // Nhập Chatbot vào đây

function Home() {
  const [showChatbot, setShowChatbot] = useState(true); // State để kiểm soát việc hiển thị chatbot

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev); // Điều khiển ẩn/hiện chatbot
  };

  return (
    <>
      <Header />
      <HeroSection />
      <SearchBar />
      <ServiceList />
      <FeautureTourList />

      {/* Nút để mở/đóng chatbot */}
      <button
  onClick={toggleChatbot}
  className="fixed bottom-5 right-5 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
>
  {showChatbot ? 'Hide Chatbot' : 'Show Chatbot'}
</button>


      {/* Hiển thị Chatbot nếu showChatbot là true */}
      {showChatbot && <Chatbot />}
    </>
  );
}

export default Home;
