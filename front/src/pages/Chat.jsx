import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import InputText from "../components/Chat/InputText";
import Message from "../components/Chat/Message";
import { Container, BodyWrapper, Body } from "../styles/Global";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import back from "../assets/chat/back.svg";
import { RiSendPlaneFill } from "react-icons/ri";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Chat = () => {
  const navigate = useNavigate();
  const backBtn = () => navigate("/");

  const [input, setInput] = useState(""); // 입력된 텍스트 값
  const [messages, setMessages] = useState([]); // 메시지 목록
  const messageEndRef = useRef(null); // 스크롤 조정

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // 음성인식 토글 함수
  const toggleListening = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
      setInput(transcript); // 음성인식된 내용을 Input에 반영
    } else {
      resetTranscript(); // 이전 음성인식 데이터 초기화
      SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
    }
  }, [listening, transcript, resetTranscript]);

  // 메시지 스크롤 조정 함수
  const scrollBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  // 메시지 입력 처리
  const handleInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  // 메시지 추가 및 전송 처리
  const handleSendMessage = async () => {
    if (!input.trim()) {
      alert("메시지를 입력하세요!");
      return;
    }

    // 사용자 메시지 추가
    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // 메시지 추가
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput(""); // 입력값 초기화
    scrollBottom(); // 대화창 하단으로 스크롤 이동

    // AI 응답 생성 (임시)
    const botMessage = {
      role: "assistant",
      content: `이것은 AI의 임시 응답입니다: "${userMessage.content}"에 대한 답변입니다.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // AI 응답 추가
    setMessages((prevMessages) => [...prevMessages, botMessage]);
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
                <Message
                  key={idx}
                  $role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              <div ref={messageEndRef} /> {/* 대화창 끝을 나타내는 요소 */}
            </HomepageMessage>

            <HomepageInput>
              <MessageInput>
                <button className="speech" onClick={toggleListening}>
                  {listening ? "중지" : "시작"}
                </button>
                <InputText
                  placeholder={"메세지를 입력하세요"}
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button className="send" onClick={handleSendMessage}>
                  <RiSendPlaneFill style={{color: "white"}} />
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

const HomepageInput = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 6em 2em 2em 2em;
  width: 100%;
  background: linear-gradient(0deg, #fff 25%, transparent);
  box-sizing: border-box;
`;

const MessageInput = styled.div`
  position: relative;
  margin: auto;
  max-width: 390px;
  input:focus {outline: none;} 

  .speech {
    position: absolute;
    left: 6px;
    bottom: 6px;
    padding: 0 12px;
    height: 40px;
    background: #fff6f6;
    border: 1px solid #333;
    border-radius: 15px;
    cursor: pointer;
  }

  input {
    display: block;
    max-width: 800px;
    margin: auto;
  }

  .send {
    position: absolute;
    right: 11px;
    bottom: 9px;
    padding: 0 12px;
    height: 35px;
    background: #ff7775;
    border: none;
    border-radius: 150px;
    cursor: pointer;
  }
`;

export default Chat;