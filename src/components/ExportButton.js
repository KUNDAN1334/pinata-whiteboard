import React from 'react';
import styled from 'styled-components';
import { FaDownload } from 'react-icons/fa';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #17a2b8;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #138496;
  }
`;

const ExportButton = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <FaDownload /> Export as PNG
    </StyledButton>
  );
};

export default ExportButton;
