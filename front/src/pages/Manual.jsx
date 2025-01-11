import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Container, BodyWrapper, Body} from '../styles/Global';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import bar from "../assets/bottom_bar/bar.svg";
import logo_icon from "../assets/bottom_bar/logo_icon.svg";
import manual_icon from "../assets/bottom_bar/manual_icon.svg";
import map_icon from "../assets/bottom_bar/map_icon.svg";
import chat_icon from "../assets/bottom_bar/chat.svg";
import my_icon from "../assets/bottom_bar/my_icon.svg";
import SearchBar from '../components/search_bar/SearchBar';
import ManualBox from '../components/box/ManualBox';

// 더미 데이터
const dummyData = [
  {
    category: "general",
    emergencyName: "심정지(CPR)",
    manualSummaries: "심정지 상태에서 CPR을 하는 방법에 대한 매뉴얼입니다.",
    thumbnail: "https://via.placeholder.com/100",
  },
  {
    category: "injury",
    emergencyName: "기절/의식 상실",
    manualSummaries: "기절이나 의식 상실 상태에 대처하는 방법을 설명합니다.",
    thumbnail: "https://via.placeholder.com/100",
  },
  {
    category: "disease",
    emergencyName: "호흡곤란",
    manualSummaries: "호흡이 어려운 상태에서 대처하는 방법을 설명합니다.",
    thumbnail: "https://via.placeholder.com/100",
  }
];

function Manual() {
  const [activeTab, setActiveTab] = useState('general');
  const [manualContent, setManualContent] = useState([]);
  const navigate = useNavigate();

  const goMy = () => navigate("/Mypage");
  const goManual = () => navigate("/Manual");
  const goMap = () => navigate("/"); 
  const goChat = () => navigate("/Chat");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchManualData = () => {
      const filteredData = dummyData.filter(item => item.category === activeTab);
      setManualContent(filteredData);
    };

    fetchManualData();
  }, [activeTab]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container>
        <BodyWrapper>
          <Header>
            <img className="logo" src={logo} alt="logo" />
          </Header>
          <Body>
            <SearchArea>
                <SearchBar />
            </SearchArea>
            <TabContainer>
                <Tab $active={activeTab === 'general'} onClick={() => handleTabClick('general')}>일반 응급상황</Tab>
                <Tab $active={activeTab === 'injury'} onClick={() => handleTabClick('injury')}>부상 응급처치</Tab>
                <Tab $active={activeTab === 'disease'} onClick={() => handleTabClick('disease')}>질병 응급상황</Tab>
            </TabContainer>
            <Content>
                {manualContent.length > 0 ? (
                <CardWrapper>
                    {manualContent.map((item, index) => (
                    <ManualBox key={index} thumbnail={item.thumbnail} title={item.emergencyName} summary={item.manualSummaries} />
                    ))}
                </CardWrapper>
                ) : (
                <div>로딩 중...</div>
                )}
            </Content>
          </Body>
        </BodyWrapper>
        <Footer>
          <Base>
            <img src={bar} width="100%" alt="footer_bar" />
          </Base>
          <StyledIcon src={map_icon} alt="map_icon" style={{ marginLeft: "-10rem" }} onClick={goMap} />
          <StyledIcon src={manual_icon} alt="manual_icon" style={{ marginLeft: "-6rem" }} onClick={goManual} />
          <StyledLogoIcon src={logo_icon} alt="logo_icon" />
          <StyledIcon src={chat_icon} alt="chat_icon" style={{ marginLeft: "3.7rem" }} onClick={goChat} />
          <StyledIcon src={my_icon} alt="my_icon" style={{ marginLeft: "8rem", marginTop: "-3.5rem" }} onClick={goMy} />
        </Footer>
      </Container>
    </motion.div>
  );
}

// 스타일링
const Header = styled.header`
  position: relative;
  .logo {
    position: absolute;
    margin-top: 1.3rem;
    margin-left: -10.8rem;
  }
`;

const SearchArea = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #FF4F4D;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 10px;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  color: ${(props) => (props.$active ? '#FF4F4D' : '#000000')};
  transition: all 0.3s;
`;

const Content = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;  
`;

const Footer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
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

export default Manual;
