import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Canvas from './components/Canvas';
import ColorPicker from './components/ColorPicker';
import ToolBar from './components/ToolBar';
import ImageUploader from './components/ImageUploader';
import ExportButton from './components/ExportButton';
import SizeSlider from './components/SizeSlider';
import UndoRedoButtons from './components/UndoRedoButtons';
import WhiteboardList from './components/WhiteboardList';
import usePinata from './hooks/usePinata';
import NFTMinter from './components/NFTMinter';



const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #007bff;
`;

function App() {
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState('pencil');
  const [size, setSize] = useState(2);
  const canvasRef = useRef(null);
  const { uploadFile, getFileUrl, saveWhiteboard, loadWhiteboard, listWhiteboards, deleteWhiteboard } = usePinata();

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleToolChange = (newTool) => {
    setTool(newTool);
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const addImageToCanvas = (file) => {
          if (canvasRef.current) {
            canvasRef.current.addImage(file);
          }
        };
        
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  const getWhiteboardImage = () => {
    if (canvasRef.current) {
      return new Promise((resolve) => {
        canvasRef.current.exportImage().toBlob(resolve, 'image/png');
      });
    }
    return null;
  };

  const handleExport = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.exportImage();
      const link = document.createElement('a');
      link.download = 'whiteboard.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const handleSave = async () => {
    if (canvasRef.current) {
      const whiteboardData = canvasRef.current.getWhiteboardData();
      const cid = await saveWhiteboard(whiteboardData);
      alert(`Whiteboard saved! CID: ${cid}`);
    }
  };

  const handleLoad = async (cid) => {
    const whiteboardData = await loadWhiteboard(cid);
    if (canvasRef.current) {
      canvasRef.current.loadWhiteboardData(whiteboardData);
    }
  };

  return (
    <AppContainer>
      <Title>Pinata Whiteboard</Title>
      <ControlsContainer>
        <ColorPicker color={color} onChange={handleColorChange} />
        <ToolBar tool={tool} onChange={handleToolChange} />
        <SizeSlider size={size} onChange={handleSizeChange} />
        <ImageUploader onUpload={handleImageUpload} />
        <ExportButton onClick={handleExport} />
        <UndoRedoButtons
          onUndo={() => canvasRef.current && canvasRef.current.undo()}
          onRedo={() => canvasRef.current && canvasRef.current.redo()}
        />
        <button onClick={handleSave}>Save Whiteboard</button>
      </ControlsContainer>
      <Canvas ref={canvasRef} color={color} tool={tool} size={size} />
<NFTMinter getWhiteboardImage={getWhiteboardImage} />
<WhiteboardList
  listWhiteboards={listWhiteboards}
  loadWhiteboard={handleLoad}
  deleteWhiteboard={deleteWhiteboard}
/>
    </AppContainer>
  );
}

export default App;

