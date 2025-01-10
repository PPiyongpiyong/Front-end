import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import InputText from "../components/InputText";
import { Container, BodyWrapper, Body } from "../styles/Global";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import back from "../assets/chat/back.svg";

const Chat = () => {
  const navigate = useNavigate();
  const backBtn = () => navigate("/");

  const [input, setInput] = useState(""); // 입력된 텍스트 값
  const [messages, setMessages] = useState([]); // 메시지 목록(작성한 내용들 저장해야 하므로 배열로 저장)
  const messageEndRef = useRef(null); // 스크롤 조정

  // 메시지 스크롤 조정 함수
  const scrollBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 메시지 입력 처리
  const handleInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  // 메시지 추가 및 전송 처리
  // .trim() 공백 제거 함수
  const handleSendMessage = () => {
    if (!input.trim()) {
      alert("메시지를 입력하세요!");
      return;
    }

    // 메시지 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input.trim(), timestamp: new Date().toLocaleTimeString() },
    ]);
    setInput(""); // 입력값 초기화
    scrollBottom(); // 대화창 하단으로 스크롤 이동
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container>
        <BodyWrapper>
          <Header>
            <img
              className="back"
              src={back}
              style={{ cursor: "pointer" }}
              alt="back"
              onClick={backBtn}
            />
          </Header>
          <Body>
            <HomepageMessage>
              {messages.map((message, idx) => (
                <Message key={idx}>
                  <span className="role">{message.role === "user" ? "Me" : "Bot"}:</span>
                  <span className="content">{message.content}</span>
                  <span className="timestamp">{message.timestamp}</span>
                </Message>
              ))}
              <div ref={messageEndRef} /> {/* 대화창 끝을 나타내는 요소 */}
            </HomepageMessage>

            <HomepageInput>
              <MessageInput>
                <InputText
                  placeholder={"메세지를 입력하세요"}
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      if (e.keyCode === 229) return;
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button className="send" onClick={handleSendMessage}>
                  보내기
                </button>
              </MessageInput>
            </HomepageInput>
          </Body>
        </BodyWrapper>
      </Container>
    </motion.div>
  );
};

const Header = styled.header`
  .back {
    position: absolute;
    margin-top: 1.3rem;
    margin-left: -10.8rem;
  }
  margin-bottom: 5rem;
`;

const HomepageMessage = styled.div`
  margin: auto;
  padding: 0 1em;
  height: 840px; /* 기본 높이 설정 */
  margin-bottom: 20px;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const Message = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  

  .role {
    font-weight: bold;
    color: #555;
  }

  .content {
    flex: 1;
    margin: 0 10px;
  }

  .timestamp {
    font-size: 0.8em;
    color: #999;
  }
`;

const HomepageInput = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 6em 2em 2em 2em;
  width: 100%;
  background: linear-gradient(0deg, #fff 55%, transparent);
  box-sizing: border-box;
`;

const MessageInput = styled.div`
  position: relative;
  margin: auto;
  max-width: 390px;

  input {
    display: block;
    max-width: 800px;
    margin: auto;
  }

  .send {
    position: absolute;
    right: 6px;
    bottom: 6px;
    padding: 0 12px;
    height: 40px;
    background: #fff6f6;
    border: 1px solid #333;
    border-radius: 52px;
    cursor: pointer;
  }
`;

export default Chat;
