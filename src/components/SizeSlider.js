import React from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #007bff;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #007bff;
    cursor: pointer;
  }
`;

const SizeSlider = ({ size, onChange }) => {
  return (
    <SliderContainer>
      <span>Size: {size}</span>
      <StyledSlider
        type="range"
        min="1"
        max="50"
        value={size}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </SliderContainer>
  );
};

export default SizeSlider;
