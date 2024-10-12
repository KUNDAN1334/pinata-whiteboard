import React from 'react';
import styled from 'styled-components';
import { FaUndo, FaRedo } from 'react-icons/fa';

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

const UndoRedoButtons = ({ onUndo, onRedo }) => {
  return (
    <ButtonContainer>
      <StyledButton onClick={onUndo}>
        <FaUndo />
      </StyledButton>
      <StyledButton onClick={onRedo}>
        <FaRedo />
      </StyledButton>
    </ButtonContainer>
  );
};

export default UndoRedoButtons;
