import styled from "styled-components";
import axios from 'axios';
import { Container, Body } from '../styles/Global';
import { motion } from "framer-motion";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.svg";
import kakaoButtonImage from "../assets/login/kakao_login_button.svg";  

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 로그인 후 페이지 이동을 위한 navigate

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signin`, {
                email: username,
                password: password,
            });
    
            console.log('로그인 성공:', response.data);
            navigate('/Mypage'); // 로그인 후 페이지 이동
        } catch (error) {
            console.error('로그인 실패:', error.response?.data || error.message);
            // 오류 처리
            alert("로그인 실패. 다시 시도해주세요.");
        }
    };
  
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container>
                <BodyWrapper>
                    <Header>
                        <img className="logo" src={logo} alt="logo" />
                    </Header>
                    <Body>
                        <h1>안녕하세요.</h1>
                        <p>응급상황 대처 가이드 서비스, 삐용삐용입니다.</p>
                        <InputWrapper>
                            <label htmlFor="username">아이디</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="아이디를 입력하세요"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="비밀번호를 입력하세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputWrapper>
                        <Button onClick={handleLogin}>로그인</Button>
                        <KakaoButton>
                            <img src={kakaoButtonImage} alt="카카오 로그인 버튼" />
                        </KakaoButton>
                    </Body>
                </BodyWrapper>
            </Container>
        </motion.div>
    );
}

export default Login;

const Header = styled.header`
  position: relative;
  .logo {
    margin-top: 6rem;
    margin-left: -10.8rem;
    transform: scale(1.5); 
    transform-origin: top left;
  }
`;

const BodyWrapper = styled.div`
    margin-top: 8rem;
    min-height: calc(100vh - 6rem); 
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
  text-align: left;
  width: 80%;
  margin: 0 auto;

  label {
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
    display: block;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
`;

const Button = styled.button`
  background-color: #ff4f4d;
  color: white;
  border: none;
  padding: 15px;
  width: 80%;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #e03a3a;
  }
`;

const KakaoButton = styled.div`
  margin-top: 20px;
  img {
    width: 100%;  
  }
`;
