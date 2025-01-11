import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import InputText from "../components/InputText";
import { Container, BodyWrapper, Body } from "../styles/Global";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import back from "../assets/chat/back.svg";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Chat = () => {
  const navigate = useNavigate();
  const backBtn = () => navigate("/");

  const [input, setInput] = useState(""); // 입력된 텍스트 값
  const [messages, setMessages] = useState([]); // 메시지 목록
  const messageEndRef = useRef(null); // 스크롤 조정

  // 음성인식 관련 설정
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // 음성인식 가능 여부 확인
  const isBrowserSupported = SpeechRecognition.browserSupportsSpeechRecognition();

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

  // 메시지 입력 처리
  const handleInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  // 메시지 추가 및 전송 처리
  const handleSendMessage = () => {
    if (!input.trim()) {
      alert("메시지를 입력하세요!");
      return;
    }

    // 사용자 메시지 추가
    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    // 임시 챗봇 응답
    const botMessage = {
      role: "assistant",
      content: `이것은 AI의 임시 응답입니다: "${input.trim()}"에 대한 답변입니다.`,
      timestamp: new Date().toLocaleTimeString(),
    };

    // 메시지 업데이트
    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setInput(""); // 입력값 초기화
    scrollBottom(); // 대화창 하단으로 스크롤 이동
  };

  // 브라우저 지원 여부 체크
  if (!isBrowserSupported) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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
                  <span className="role">{message.role === "user" ? "👤" : "🚨"}:</span>
                  <span className="content">{message.content}</span>
                  <span className="timestamp">{message.timestamp}</span>
                </Message>
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
  display: flex;
  justify-content: space-between;
  border: 1px solid grey;
  border-radius: 15px;
  margin-bottom: 10px;

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

  .speech {
    position: absolute;
    left: 6px;
    bottom: 6px;
    padding: 0 12px;
    height: 40px;
    background: #fff6f6;
    border: 1px solid #333;
    border-radius: 52px;
    cursor: pointer;
  }

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
