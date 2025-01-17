import styled from "styled-components";

export const Container = styled.div`
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    font-family: 'Pretendard-Regular', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    text-align: center;
    background: linear-gradient(179.98deg, #FFFFFF 20.02%, rgba(255, 243, 243, 0.671667) 73.6%, rgba(253, 226, 225, 0.51) 99.98%);
    background-size: cover;
    -ms-overflow-style: none;
    scrollbar-width: none;
    align-items: center;
    overflow-x: hidden;

    @media (hover: hover) {
        width: 390px;
        margin: 0 auto;
    }
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const BodyWrapper = styled.div`
    font-family: 'Pretendard-Regular', sans-serif;
    min-height: calc(100vh - 145px);
`;

export const Body = styled.div`
    font-family: 'Pretendard-Regular', sans-serif;

    .scrollbox {
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }
    }
`;
