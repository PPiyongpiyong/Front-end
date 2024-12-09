import { Container, BodyWrapper, Body } from '../styles/Global';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React, { useState } from 'react';
import styled from "styled-components";
import bar from "../assets/bottom_bar/bar.svg";
import logo_icon from "../assets/bottom_bar/logo_icon.svg";
import manual_icon from "../assets/bottom_bar/manual_icon.svg";
import map_icon from "../assets/bottom_bar/map_icon.svg";
import youtube_icon from "../assets/bottom_bar/youtube_icon.svg";
import my_icon from "../assets/bottom_bar/my_icon.svg";
import back from "../assets/chat/back.svg";
import speech from "../assets/chat/speech.svg";
import btn from "../assets/chat/sendbox.svg";

function Chat() {
    const navigate = useNavigate();

    const goMy = () => {
      navigate("/Mypage");
    };

    const goManual = () => {
        navigate("/Manual");
      };

    const goMap = () => {
        navigate("/");
    };  

    const goYoutube = () => {
        navigate("/Youtube");
    };

    const backBtn = () => {
        navigate("/");
    };

    // // stt 기능 구현을 위해 정의
    // const {
    //     transcript,  // stt 녹음한 내용을 담는 변수
    //     listening,   // stt 녹음
    //     resetTranscript,  // stt 녹음 reset
    //     browserSupportsSpeechRecognition
    //   } = useSpeechRecognition();
    
    //   if (!browserSupportsSpeechRecognition) {
    //     return <span>Browser doesn't support speech recognition.</span>;
    //   }

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    // input 상태 관리
    const [inputValue, setInputValue] = useState("");
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
    // 녹음 시작
    const startListening = () => {
      SpeechRecognition.startListening({ continuous: true, language: "ko" });
    };
  
    // 녹음 종료 후 텍스트 반영
    const stopListening = () => {
      SpeechRecognition.stopListening();
      setInputValue(transcript); // 녹음된 내용을 input 값에 설정
    };

    const handleSpeechClick = () => {
        if (listening) {
          stopListening();
        } else {
          startListening();
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container>
                <BodyWrapper>
                    <Header>
                        <img className="back" src={back} alt="back" onClick={backBtn} />
                    </Header>
                    <Body>
                    <AIChatBox>

                    </AIChatBox>
                    <UserChatBox>

                    </UserChatBox>
                    <div style={{ position: "absolute" }}>
                        <ChatBox
                            value={inputValue} // input 값을 상태로 관리
                            onChange={(e) => setInputValue(e.target.value)} // 사용자가 직접 입력한 값 반영
                            placeholder={listening ? "녹음 중..." : "질문을 입력하세요."}
                        />
                        <div style={{ position: "absolute", right: "1rem", top: "0.5rem" }}>
                            <img
                            className="speech"
                            src={speech}
                            alt="speech"
                            onClick={handleSpeechClick} // 녹음 시작/중지 토글
                            style={{ position: 'absolute', cursor: "pointer", left: "1rem", top: "44.5rem" }}
                            />
                            <img className="btn"
                            src={btn}
                            alt='btn'
                            style={{ position:'absolute', cursor: "pointer", left: "19rem", top: "44rem" }}/>
                        </div>
                    </div>
                    </Body>
                </BodyWrapper>
                <Footer>
                    <Base>
                        <img
                            src={bar}
                            width="100%"
                            alt="footer_bar"
                        />
                    </Base>
                        <StyledIcon src={map_icon} alt="map_icon" style={{marginLeft: "-10rem"}} onClick={goMap}/>
                        <StyledIcon src={manual_icon} alt="manual_icon" style={{marginLeft: "-6rem"}} onClick={goManual}/>
                        <StyledLogoIcon src={logo_icon} alt="logo_icon" /> 
                        <StyledIcon src={youtube_icon} alt="youtube_icon" style={{marginLeft: "3.7rem"}} onClick={goYoutube}/>
                        <StyledIcon src={my_icon} alt="my_icon" style={{marginLeft: "8rem", marginTop: "-3.5rem"}} onClick={goMy}/>
                </Footer>
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

const Footer = styled.div`
  position: absolute;
  left: 0rem;
  bottom: 0;
  border: none;
  margin: 0;
`;

const Base = styled.div``;

// logo icon만 변경하고 싶어서 styled-component 설정해줌
const StyledLogoIcon = styled.img`
  position: absolute;
  width: 4rem;
  margin-left: -1.9rem;
  margin-top: -4.35rem; 
`;

const StyledIcon = styled.img`
  position: absolute;
  margin-top: -3.7rem;
`;

const AIChatBox = styled.div`
    position: relative;
    width: 20rem;
    height: 3rem;
    background-color: #fff6f6;
    border: 1px solid #FF4F4D;
    border-radius: 0 20px 20px 20px;
    align-items: left;
`;

const UserChatBox = styled.div`
    position: relative;
    width: 20rem;
    height: 3rem;
    background-color: white;
    border: 1px solid #FF4F4D;
    border-radius: 20px 0px 20px 20px;
    margin-top: 1.1rem;
    align-items: left;
`;

const ChatBox = styled.input`
    position: absolute;
    top: 43rem;
    left: -1rem;
    width: 19rem;
    height: 2.5rem;
    background-color: white;
    border: 1px solid #FF4F4D;
    border-radius: 20px 20px 20px 20px;
    margin-top: 1.1rem;
    padding-left: 2.5rem;
    font-size: 15px;
`;

export default Chat;
