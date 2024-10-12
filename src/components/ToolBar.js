import React from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaEraser } from 'react-icons/fa';

const ToolBarContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const ToolButton = styled.button`
  background-color: ${props => props.active ? '#007bff' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#e2e6ea'};
  }
`;

const ToolBar = ({ tool, onChange }) => {
  return (
    <ToolBarContainer>
      <ToolButton active={tool === 'pencil'} onClick={() => onChange('pencil')}>
        <FaPencilAlt /> Pencil
      </ToolButton>
      <ToolButton active={tool === 'eraser'} onClick={() => onChange('eraser')}>
        <FaEraser /> Eraser
      </ToolButton>
    </ToolBarContainer>
  );
};

export default ToolBar;
