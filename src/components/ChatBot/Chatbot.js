import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(true);

  // Hàm gửi tin nhắn
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const newMessage = {
      sender: "user",
      text: inputMessage,
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];

      // Tạo phản hồi của bot sau khi thêm tin nhắn người dùng
      const botResponse = {
        sender: "bot",
        text: generateBotResponse(inputMessage),
      };

      updatedMessages.push(botResponse);
      return updatedMessages;
    });

    setInputMessage(""); // Reset input message sau khi gửi
  };

  // Hàm tạo phản hồi của bot
  const generateBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes("hello")) {
      return "Hi! How can I assist you today? You can ask about booking or available tours!";
    }
    if (lowerCaseMessage.includes("hi")) {
      return "Hi! How can I assist you today? You can ask about booking or available tours!";
    }
    // Các câu hỏi liên quan đến đặt phòng (Booking)
    if (lowerCaseMessage.includes("book") || lowerCaseMessage.includes("reservation")) {
      return "I can help you with booking a room! What date would you like to book?";
    }
    if (lowerCaseMessage.includes("room available") || lowerCaseMessage.includes("room free")) {
      return "Let me check the availability of rooms. What dates are you planning to stay?";
    }
    if (lowerCaseMessage.includes("price") || lowerCaseMessage.includes("cost")) {
      return "Our room prices depend on the dates. Can you tell me the dates you are looking for?";
    }

    // Câu hỏi về thời gian
    if (lowerCaseMessage.includes("time") || lowerCaseMessage.includes("when")) {
      return `The current time is: ${new Date().toLocaleTimeString()}`;
    }

    // Câu hỏi về ngày tháng
    if (lowerCaseMessage.includes("date") || lowerCaseMessage.includes("today")) {
      return `Today's date is: ${new Date().toLocaleDateString()}`;
    }

    // Câu hỏi về dịch vụ
    if (lowerCaseMessage.includes("service") || lowerCaseMessage.includes("breakfast")) {
      return "We offer a variety of services including breakfast, laundry, and spa. Would you like more details?";
    }
    if (lowerCaseMessage.includes("parking")) {
      return "Yes, we have parking available for our guests.";
    }

    // Các câu hỏi liên quan đến số lượng người
    if (lowerCaseMessage.includes("guests") || lowerCaseMessage.includes("people")) {
      return "How many people will be staying?";
    }

    // Các câu hỏi không hiểu
    return "Sorry, I didn't quite catch that. Can you rephrase or ask something else about booking or services?";
  };

  // Hàm để ẩn/hiện chatbot
  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };

  if (!isChatbotVisible) {
    return (
      <button
        onClick={toggleChatbot}
        className="fixed bottom-5 right-5 p-3 bg-blue-600 text-white rounded-full shadow-lg"
      >
        Show Chatbot
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
        <h2 className="font-semibold">Chatbot</h2>
        <button
          onClick={toggleChatbot}
          className="text-sm text-white hover:text-gray-300"
        >
          Hide
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div key={index} className={message.sender === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block max-w-xs p-2 rounded-lg ${
                message.sender === "user" ? "bg-blue-600 text-white" : "bg-blue-100 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center border-t border-blue-600 p-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-3 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
