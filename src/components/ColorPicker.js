import React from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';

const ColorPickerContainer = styled.div`
  position: relative;
`;

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
  cursor: pointer;
  background-color: ${props => props.color};
`;

const PopoverContainer = styled.div`
  position: absolute;
  z-index: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = React.useState(false);

  return (
    <ColorPickerContainer>
      <ColorButton color={color} onClick={() => setShowPicker(!showPicker)} />
      {showPicker && (
        <PopoverContainer>
          <Cover onClick={() => setShowPicker(false)} />
          <ChromePicker color={color} onChange={(color) => onChange(color.hex)} />
        </PopoverContainer>
      )}
    </ColorPickerContainer>
  );
};

export default ColorPicker;
