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
import markerImage from "../assets/map/marker.svg";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function MapPage(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        center: {
            // 초기 위치는 아산병원으로 잡음
            lat: 37.524877465547, 
            lng: 127.10788678005,
        },
        errMsg: null,
        isLoading: true,
    });

    // 마커 클릭 시 위치 메시지가 보이도록 하기 위해 선언
    const [showMarkerInfo, setShowMarkerInfo] = useState(false); 

    // 마커 클릭 시 상태 전환
    const toggleMarkerInfo = () => {
        setShowMarkerInfo((prev) => !prev);  
    };

    // geolocation 사용하여 본인 위치 위도, 경도로 불러오기 
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                        isLoading: false,
                    }));
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
                                            // 마커로 사용하는 이미지 불러오기
                                            src: markerImage, 
                                            size: {
                                                width: 30,
                                                height: 30, 
                                            },
                                            options: {
                                                offset: {
                                                    x: 20,
                                                    y: 40, 
                                                },
                                            },
                                        }}
                                        // 클릭하면 상태가 전환되도록 함수 불러오기
                                        onClick={toggleMarkerInfo}  
                                    >
                                        {/* 상태에 따라 주소 메시지 창이 보이도록 함. false: 안 보임, true: 보임*/}
                                        {showMarkerInfo && (
                                            <div style={{ padding: "5px", color: "#000", whiteSpace: "nowrap" }}>
                                                {state.errMsg ? state.errMsg : `${state.center.lat}, ${state.center.lng}`}
                                            </div>
                                        )}
                                    </MapMarker>
                                )}
                            </Map>
                        </StyledMapContainer>
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

export default MapPage;
