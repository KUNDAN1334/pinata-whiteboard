export const drawLine = (ctx, x1, y1, x2, y2, color, size) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };
  
  export const addImage = (canvas, url, x, y, width, height) => {
    return new Promise((resolve, reject) => {
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  };
  
  