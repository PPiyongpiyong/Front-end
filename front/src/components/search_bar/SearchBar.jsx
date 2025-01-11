import React from 'react';
import { ReactComponent as SpeechIcon } from '../../assets/speech/speech_mark.svg'; 
import { ReactComponent as MagnifyingGlassIcon } from '../../assets/search/magnifying_glass.svg'; 
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #FF4F4D10; 
  border: 1px solid #FF4F4D; 
  border-radius: 4px;
  gap: 0.5rem;
  padding: 5px 15px;
  width: ${(props) => props.width || '337px'};  
  height: ${(props) => props.height || '37px'};  
`;

const InputField = styled.input`
  border: none;
  background-color: transparent;
  flex-grow: 1;
  padding: 5px;
  font-size: 14px;
  outline: none;
  height: ${(props) => props.height || '30px'};  
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: ${(props) => props.height || '30px'};  
`;

function SearchBar({ width, height }) {
  const handleSearchClick = () => {
    console.log("Search initiated");
  };

  const handleSpeechClick = () => {
    console.log("Speech input activated");
  };

  return (
    <SearchBarContainer width={width} height={height}>
      <IconWrapper onClick={handleSearchClick} height={height}>
        <MagnifyingGlassIcon style={{ width: 15, height: 15 }} />
      </IconWrapper>
      <InputField type="text" placeholder="" height={height} />
      <IconWrapper onClick={handleSpeechClick} height={height}>
        <SpeechIcon style={{ width: 15, height: 15 }} />
      </IconWrapper>
    </SearchBarContainer>
  );
}

export default SearchBar;
