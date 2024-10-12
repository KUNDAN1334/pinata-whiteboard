import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import { drawLine, addImage } from '../utils/canvasUtils';

const CanvasContainer = styled.div`
  border: 2px solid #333;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledCanvas = styled.canvas`
  cursor: crosshair;
`;

const Canvas = forwardRef(({ color, tool, size }, ref) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 0.8;
      canvas.height = window.innerHeight * 0.6;
      redrawCanvas();
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history.slice(0, historyIndex + 1).forEach(item => {
      if (item.type === 'draw') {
        drawLine(ctx, item.x1, item.y1, item.x2, item.y2, item.color, item.size);
      } else if (item.type === 'erase') {
        ctx.clearRect(item.x - item.size / 2, item.y - item.size / 2, item.size, item.size);
      } else if (item.type === 'image') {
        ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
      }
    });
  };

  useImperativeHandle(ref, () => ({
    addImage: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const aspectRatio = img.width / img.height;
          const maxWidth = canvas.width * 0.8;
          const maxHeight = canvas.height * 0.8;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }
          if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
          }

          const x = (canvas.width - width) / 2;
          const y = (canvas.height - height) / 2;

          const newHistory = [...history.slice(0, historyIndex + 1), { type: 'image', image: img, x, y, width, height }];
          setHistory(newHistory);
          setHistoryIndex(newHistory.length - 1);
          redrawCanvas();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    exportImage: () => {
      return canvasRef.current.toDataURL();
    },
    clearCanvas: () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHistory([]);
      setHistoryIndex(-1);
    },
    undo: () => {
      if (historyIndex > -1) {
        setHistoryIndex(historyIndex - 1);
        redrawCanvas();
      }
    },
    redo: () => {
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        redrawCanvas();
      }
    },
    getWhiteboardData: () => {
      return {
        history,
        historyIndex,
        width: canvasRef.current.width,
        height: canvasRef.current.height,
      };
    },
    loadWhiteboardData: (data) => {
      setHistory(data.history);
      setHistoryIndex(data.historyIndex);
      canvasRef.current.width = data.width;
      canvasRef.current.height = data.height;
      redrawCanvas();
    }
  }));

  const startDrawing = (e) => {
    isDrawing.current = true;
    const { x, y } = getCoordinates(e);
    lastPos.current = { x, y };
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (tool === 'pencil') {
      drawLine(ctx, lastPos.current.x, lastPos.current.y, x, y, color, size);
      const newHistory = [...history.slice(0, historyIndex + 1), { type: 'draw', x1: lastPos.current.x, y1: lastPos.current.y, x2: x, y2: y, color, size }];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    } else if (tool === 'eraser') {
      ctx.clearRect(x - size / 2, y - size / 2, size, size);
      const newHistory = [...history.slice(0, historyIndex + 1), { type: 'erase', x, y, size }];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }

    lastPos.current = { x, y };
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  return (
    <CanvasContainer>
      <StyledCanvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
      />
    </CanvasContainer>
  );
});

export default Canvas;
