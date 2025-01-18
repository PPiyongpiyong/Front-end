import styled from "styled-components";
import axios from 'axios';
import { Container, Body } from '../styles/Global';
import { motion } from "framer-motion";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.svg";
import { KAKAO_AUTH_URL } from "../secret/OAuth.js";  

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 로그인 후 페이지 이동을 위한 navigate
    const Sign = () => navigate("/Signup");

    const handleLogin = async () => {
        try {
            const response = await axios.post(`/api/auth/signin`, {
                email: username,
                password: password,
            });
    
            console.log('로그인 성공:', response.data);
            navigate('/Map'); // 로그인 후 페이지 이동
        } catch (error) {
            console.error('로그인 실패:', error.response?.data || error.message);
            // 오류 처리
            alert("로그인 실패. 다시 시도해주세요.");
        }
    };

    const kakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container>
                <BodyWrapper>
                    <Header>
                        <img className="logo" src={logo} alt="logo" />
                    </Header>
                    <Body>
                        <p className="hi">안녕하세요.</p>
                        <p className="title">응급상황 대처 가이드 서비스,</p>
                        <p className="title2">삐용삐용입니다.</p>
                        <InputWrapper>
                            <input
                                type="text"
                                id="username"
                                placeholder="아이디를 입력하세요"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <input
                                type="password"
                                id="password"
                                placeholder="비밀번호를 입력하세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputWrapper>
                        <Signup onClick={Sign}>회원가입</Signup>
                        <Button onClick={handleLogin}>로그인</Button>
                        <KakaoButton onClick={kakaoLogin}>
                            카카오 로그인
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
    margin-top: 3rem;
    margin-left: -14rem;
    transform: scale(1.5); 
    transform-origin: top left;
  }
`;

const BodyWrapper = styled.div`
    margin-top: 8rem;
    min-height: calc(100vh - 6rem); 

    .hi {
        font-size: 22px;
        margin-left: -13rem;
        margin-top: 2.3rem;
    }

    .title {
        margin-top: -0.5rem;
        margin-left: -8rem;
    }
    .title2 {
        margin-top: -0.5rem;
        margin-left: -13rem;
    }
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
  text-align: left;
  width: 88%;
  margin: 0 auto;
  margin-left: 2rem;

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
    border: none;
    border-bottom: 1px solid #ddd;
    background-color: transparent;
  }
  input:focus {outline: none;} 
  
  #username {
    margin-top: 2.5rem;
    margin-left: -1.5rem;
  }

  #password {
    margin-top: 1.5rem;
    margin-left: -1.5rem;
  }
`;

const Signup = styled.div`
    margin-top: 1rem;
    font-size: 14px;
    color: #535252;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
`;

const Button = styled.button`
  background-color: #ff7775;
  color: #3B1C1C;
  border: none;
  padding: 15px;
  width: 324px;
  height: 56px;
  left: calc(50% - 324px/2 - 0.5px);
  font-size: 19px;
  border-radius: 13px;
  margin-bottom: 0.3rem;
  margin-top: 4rem;
  font-weight: bold;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  
  &:hover {
    background-color: #e03a3a;
  }
`;

const KakaoButton = styled.div`
  margin-top: 20px;
  background-color: #F9E000;
  color: #3B1C1C;
  border: none;
  padding: 15px;
  width: 295px;
  height: 25px;
  left: calc(50% - 324px/2 - 0.5px);
  font-size: 19px;
  border-radius: 13px;
  font-weight: bold;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  
  &:hover {
    background-color: #a1984b;
  }
`;