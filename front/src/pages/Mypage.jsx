import { Container, BodyWrapper, Body } from '../styles/Global';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import logo from "../assets/logo.svg";
import bar from "../assets/bottom_bar/bar.svg";
import logo_icon from "../assets/bottom_bar/logo_icon.svg";
import manual_icon from "../assets/bottom_bar/manual_icon.svg";
import map_icon from "../assets/bottom_bar/map_icon.svg";
import chat_icon from "../assets/bottom_bar/chat.svg";
import my_icon from "../assets/bottom_bar/my_icon.svg";
import logout from "../assets/logout/logout.svg";
import { BoxType } from '../components/Box/BoxType';
import InputBox from "../components/Input/InputBox";

function Mypage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    phoneNumber: '',
    gender: '',
    parentPhoneNumber: '',
    address: '',
    residentNo: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.log('로그인이 필요합니다.');
      setIsLoading(false);
      navigate('/login');
      return;
    }

    axios.get('http://52.79.245.244/api/v1/mypage/getProfile', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(response => {
      if (response.data) setUserInfo(response.data);
      else console.log('서버에서 정보를 불러올 수 없습니다.');
    })
    .catch(error => console.error('마이페이지 오류:', error))
    .finally(() => setIsLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error("로그인 상태가 아닙니다.");
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://52.79.245.244/api/v1/auth/logout', {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');

      console.log('로그아웃 성공!');
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error.response?.data || error.message);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container>
        <BodyWrapper>
          <Header>
            <img className="logo" src={logo} alt="logo" />
            <AccountWrapper>
              <UserName>{userInfo.username || '회원'}</UserName>
              <LogoutButton onClick={handleLogout}>
                <img className="logout" src={logout} alt="logout" />
              </LogoutButton>
            </AccountWrapper>
          </Header>
          <Body>
            <InfoWrapper>
              <InputBox id="email" width="310px" height="35px" label="아이디" value={userInfo.email} />
              <InputBox id="phoneNumber" width="310px" height="35px" label="전화번호" value={userInfo.phoneNumber} />
              <InputBox id="parentPhoneNumber" width="310px" height="35px" label="보호자 전화번호" value={userInfo.parentPhoneNumber} />
              <InputBox id="address" width="310px" height="35px" label="주소" value={userInfo.address} />
              <InputBox id="residentNo" width="310px" height="35px" label="주민등록번호" value={userInfo.residentNo} />
            </InfoWrapper>
            <ButtonWrapper>
              <SignoutButton>회원탈퇴</SignoutButton>
            </ButtonWrapper>
          </Body>
        </BodyWrapper>
        <Footer>
          <Base>
            <img src={bar} width="100%" alt="footer_bar" />
          </Base>
          <StyledIcon src={map_icon} alt="map_icon" style={{ marginLeft: "-10rem" }} onClick={() => navigate("/")} />
          <StyledIcon src={manual_icon} alt="manual_icon" style={{ marginLeft: "-6rem" }} onClick={() => navigate("/Manual")} />
          <StyledLogoIcon src={logo_icon} alt="logo_icon" />
          <StyledIcon src={chat_icon} alt="chat_icon" style={{ marginLeft: "3.7rem" }} onClick={() => navigate("/Chat")} />
          <StyledIcon src={my_icon} alt="my_icon" style={{ marginLeft: "8rem", marginTop: "-3.5rem" }} onClick={() => navigate("/Mypage")} />
        </Footer>
      </Container>
    </motion.div>
  );
}

// 스타일 정리
const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Header = styled.header`
  .logo {
    position: absolute;
    margin-top: 1.3rem;
    margin-left: -10.8rem;
  }
`;

const AccountWrapper = styled.div`
  margin-top: 4rem;
  margin-left: 0.5rem;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rem;
`;

const UserName = styled.h1`
  font-size: 1.25rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 7rem;
  gap: 3rem;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
  gap: 1rem;
`;

const SignoutButton = styled(BoxType._10radiux_Box)`
  background-color: #FFFFFF;
  border: 1px solid #E60400;
  font-size: 1rem;
  width: 310px;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #E60400;
  cursor: pointer;

  &:hover {
    background-color: #E60400;
    border-color: #E60400;
    color: #ffffff;
  }
`;

const Footer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  border: none;
  margin: 0;
`;

const Base = styled.div``;

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

export default Mypage;
