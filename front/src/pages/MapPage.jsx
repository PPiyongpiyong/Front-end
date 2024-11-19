import { Container, BodyWrapper, Body } from '../styles/Global';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import logo from "../assets/logo.svg";
import bar from "../assets/bottom_bar/bar.svg";
import logo_icon from "../assets/bottom_bar/logo_icon.svg";
import manual_icon from "../assets/bottom_bar/manual_icon.svg";
import map_icon from "../assets/bottom_bar/map_icon.svg";
import youtube_icon from "../assets/bottom_bar/youtube_icon.svg";
import my_icon from "../assets/bottom_bar/my_icon.svg";
import chat from "../assets/chat_btn.svg";
import markerImage from "../assets/map/marker.svg";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function MapPage() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        center: {
            lat: 37.524877465547, 
            lng: 127.10788678005,
        },
        address: "", // 주소명을 저장할 상태
        errMsg: null,
        isLoading: true,
    });

    const [showMarkerInfo, setShowMarkerInfo] = useState(false); 

    // Geocoder를 통해 위도, 경도를 주소로 변경하기
    const getAddress = (lat, lng) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
    
        geocoder.coord2Address(lng, lat, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const addressName = result[0]?.road_address?.address_name || result[0]?.address?.address_name;
                setState((prev) => ({
                    ...prev,
                    address: addressName || "주소 정보를 가져올 수 없어요.",
                }));
            } else {
                setState((prev) => ({
                    ...prev,
                    address: "주소 정보를 가져올 수 없어요.",
                }));
            }
        });
    };
    

    // 현재 위치를 위도, 경도로 받아온 후, getAddress 함수를 호출하여 위도, 경도를 주소로 변환함
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: latitude,
                            lng: longitude,
                        },
                        isLoading: false,
                    }));
                    // 위도, 경도를 주소 변환하는 함수 호출
                    getAddress(latitude, longitude); 
                },
                (err) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }));
                }
            );
        } else {
            setState((prev) => ({
                ...prev,
                errMsg: "현재 위치를 알 수 없어요..",
                isLoading: false,
            }));
        }
    }, []);

    const toggleMarkerInfo = () => {
        setShowMarkerInfo((prev) => !prev);  
    };

    const goMy = () => navigate("/Mypage");
    const goManual = () => navigate("/Manual");
    const goMap = () => navigate("/");
    const goYoutube = () => navigate("/Youtube");
    const goChat = () => navigate("/Chat");

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container>
                <BodyWrapper>
                    <Header>
                        <img className="logo" src={logo} alt="logo" />
                    </Header>
                    <Body>
                        <StyledMapContainer>
                            <Map
                                center={state.center}
                                style={{ width: '100%', height: '100%' }}
                                level={3}
                            >
                                {!state.isLoading && (
                                    <MapMarker
                                        position={state.center}
                                        image={{
                                            src: markerImage, 
                                            size: { width: 30, height: 30 },
                                            options: { offset: { x: 20, y: 40 } },
                                        }}
                                        onClick={toggleMarkerInfo}  
                                    >
                                        {showMarkerInfo && (
                                            <div style={{ padding: "5px", color: "#000", whiteSpace: "nowrap" }}>
                                                {state.errMsg || state.address}
                                            </div>
                                        )}
                                    </MapMarker>
                                )}
                            </Map>
                        </StyledMapContainer>
                        <MyAddress>
                            <p className='title'>현위치</p>
                            <p className='content'>{state.address}</p>
                        </MyAddress>
                        <HospitalBoxes>
                            <HospitalBox>
                                <p className='hospital_name'>구리 한양대병원</p>
                                <p className='hospital_address'>경기도 구리시 경춘로 153</p>
                            </HospitalBox>
                            <HospitalBox>
                                <p className='hospital_name'>구리 한양대병원</p>
                                <p className='hospital_address'>경기도 구리시 경춘로 153</p>
                            </HospitalBox>
                            <HospitalBox>
                                <p className='hospital_name'>구리 한양대병원</p>
                                <p className='hospital_address'>경기도 구리시 경춘로 153</p>
                            </HospitalBox>
                            <HospitalBox>
                                <p className='hospital_name'>구리 한양대병원</p>
                                <p className='hospital_address'>경기도 구리시 경춘로 153</p>
                            </HospitalBox>
                            <HospitalBox>
                                <p className='hospital_name'>구리 한양대병원</p>
                                <p className='hospital_address'>경기도 구리시 경춘로 153</p>
                            </HospitalBox>
                            <HospitalBox>
                                <p className='hospital_name'>구리 한양대병원</p>
                                <p className='hospital_address'>경기도 구리시 경춘로 153</p>
                            </HospitalBox>
                        </HospitalBoxes>
                    </Body>
                </BodyWrapper>
                <Footer>
                    <Chat onClick={goChat}>
                        <img className="chat" src={chat} alt="chat_btn" />
                    </Chat>
                    <Base>
                        <img src={bar} width="100%" alt="footer_bar" />
                    </Base>
                    <StyledIcon src={map_icon} alt="map_icon" style={{ marginLeft: "-10rem" }} onClick={goMap} />
                    <StyledIcon src={manual_icon} alt="manual_icon" style={{ marginLeft: "-6rem" }} onClick={goManual} />
                    <StyledLogoIcon src={logo_icon} alt="logo_icon" />
                    <StyledIcon src={youtube_icon} alt="youtube_icon" style={{ marginLeft: "3.7rem" }} onClick={goYoutube} />
                    <StyledIcon src={my_icon} alt="my_icon" style={{ marginLeft: "8rem", marginTop: "-3.5rem" }} onClick={goMy} />
                </Footer>
            </Container>
        </motion.div>
    );
};

const Header = styled.header`
    .logo {
        position: absolute;
        margin-top: 1.3rem;
        margin-left: -10.8rem;
    }
`;

const Footer = styled.div`
    position: absolute;
    left: 0rem;
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

const StyledMapContainer = styled.div`
    width: 22rem;
    height: 17rem;
    margin-top: 5.5rem;
    border-radius: 8px; 
    overflow: hidden; 
`;

const MyAddress = styled.div`
    position: relative;
    margin: auto;
    top: 1rem;
    width: 21rem;
    height: 4.5rem;
    border: 1px solid #FF4F4D;
    background-color: #fff6f6;
    border-radius: 10px;

    .title {
        margin-left: -16rem;
        margin-top: 0.7rem;
        color: #FF4F4D;
        font-weight: bold;
    }
    .content {
        text-align: left;
        margin-top: -0.7rem;
        margin-left: 1rem;
        font-size: 14px;
    }
`;

const HospitalBoxes = styled.div`
    margin-top: 2rem;
    margin-bottom: 5.5rem;
    margin-left: 0.44rem;
`;

const HospitalBox = styled.div`
  margin-bottom: 1.1rem;
  position: relative;
  width: 21rem;
  height: 4.5rem;
  border: 1px solid #FF4F4D;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .hospital_name {
    text-align: left;
    margin-left: 1rem;
    margin-top: 0.8rem;
    color: #FF4F4D;
    font-weight: bold;
    font-size: 17.5px;
  }

  .hospital_address {
    text-align: left;
    font-size: 14px;
    margin-top: -0.7rem;
    margin-left: 1rem;
  }
`;

const Chat = styled.div`
    position: relative;
    bottom: 1.5rem;
    left: 9.2rem;
`;


export default MapPage;
