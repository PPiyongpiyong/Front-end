import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    text-align: center;
    background: white;
    background-size: cover;
    -ms-overflow-style: none;
    scrollbar-width: none;
    align-items: center;
    border: 1px solid;

    @media (hover: hover) {
        width: 390px;
        margin: 0 auto;
    }
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const BodyWrapper = styled.div`
    min-height: calc(100vh - 145px);
`;

export const Body = styled.div`
    .scrollbox {
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
        width: 0;
        background: transparent;
        }
    }
`;