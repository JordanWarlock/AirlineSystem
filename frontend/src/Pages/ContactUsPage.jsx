import { React, useState, useRef, useEffect } from "react";
import "../css/ContactUsPage.css";
import axios from "axios";

const ContactUsPage = () => {
  const [chats, setChats] = useState([]);
  const [conversationState, setConversationState] = useState({});
  const chatSpaceRef = useRef(null);
  const fetchAIResponse = async (chat) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generateResponse",
        chat
      );
      setChats((prevChats) => [...prevChats, response.data]);
      setConversationState(response.data.conversation_state);
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
          conversation_state: conversationState,
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
    <div className="container">
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
  );
};

export default ContactUsPage;
