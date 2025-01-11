import React from 'react';
import styled from 'styled-components';

const ManualBoxWrapper = styled.div`
  display: flex;
  align-items: flex-start; 
  background-color: #FF4F4D05; 
  border: 1px solid #FF4F4D; 
  border-radius: 10px;
  width: ${(props) => props.width || '333px'};
  height: ${(props) => props.height || '93px'};  
`;

const ManualThumbnail = styled.img`
  width: 93px;
  height: 93px;
  border-radius: 10px;
  object-fit: cover; 
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  text-align: left;
  width: 100%;
  padding: 0rem 0.5rem;
`;

const ManualTitle = styled.h3`
  font-size: 1rem;
  color: #000000;
  font-weight: bold;
  margin: 0.5rem 0rem;
  
`;

const ManualSummaries = styled.p`
  font-size: 0.75rem;
  color: #000000;
  margin: 0;
`;

const ManualBox = ({ thumbnail, title, summary }) => {
  return (
    <ManualBoxWrapper>
      <ManualThumbnail src={thumbnail} alt="manual-thumbnail" />
      <ContentWrapper>
        <ManualTitle>{title}</ManualTitle>
        <ManualSummaries>{summary}</ManualSummaries>
      </ContentWrapper>
    </ManualBoxWrapper>
  );
};

export default ManualBox;