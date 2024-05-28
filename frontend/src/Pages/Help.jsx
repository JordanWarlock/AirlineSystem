import { React, useState, useRef, useEffect } from "react";
import "../css/Help.css";
import axios from "axios";
import Header from "../Components/Header";
import signupImageUrl from "../Pictures/signup.jpg";
import Footer from "../Components/Footer";


const Help = () => {
  const [chats, setChats] = useState([]);
  const chatSpaceRef = useRef(null);
  const fetchAIResponse = async (chat) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generateResponse",
        chat
      );
      setChats((prevChats) => [...prevChats, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  function handleEnterPressed(e) {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        const chat = {
          message: e.target.value,
          type: "Human",
        };
        setChats((prevChats) => [...prevChats, chat]);
        fetchAIResponse(chat);
        console.log(chats);
        e.target.value = "";
      }
    }
  }

  useEffect(() => {
    if (chatSpaceRef.current) {
      chatSpaceRef.current.scrollTop = chatSpaceRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div>
    <Header imageUrl={signupImageUrl} />

    <div className="container">
        <h1>Our <div className="AI">AI</div> is here to help</h1>
      <div className="chat-space-wrapper" ref={chatSpaceRef}>
        {chats.map((chat, index) =>
          chat["type"] === "Human" ? (
            <div className="text text-human" key={index}>
              {chat["message"]}
            </div>
          ) : (
            <div className="text text-ai" key={index}>
              {chat["message"]}
            </div>
          )
        )}
        <input
          type="text"
          className="message-input"
          placeholder="Type to chat with AI bot"
          onKeyDown={handleEnterPressed}
        />
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Help;
