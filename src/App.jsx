
import './App.css'
import { useState, useRef } from 'react';

function App() {
  const [image, setImage] = useState(null); // Store the uploaded image
  const [frame, setFrame] = useState('none'); // Store the selected frame
  const canvasRef = useRef(null); // Reference to the canvas element

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        drawImage(img); // Draw image when it's fully loaded
      };
      img.src = event.target.result;
      setImage(img);
    };
    reader.readAsDataURL(file);
  };

  // Function to draw image and frame
  const drawImage = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous content
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw image
    applyFrame(ctx); // Apply the frame
  };

  // Apply the selected frame
  const applyFrame = (ctx) => {
    if (frame === 'frame1') {
      ctx.strokeStyle = 'red'; // Frame 1: Red Border
      ctx.lineWidth = 10;
      ctx.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } else if (frame === 'frame2') {
      ctx.strokeStyle = 'blue'; // Frame 2: Blue Border
      ctx.lineWidth = 20;
      ctx.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Handle frame selection change
  const handleFrameChange = (event) => {
    setFrame(event.target.value);
    if (image) {
      drawImage(image); // Redraw the image with the new frame
    }
  };

  // Download the framed image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'framed-image.png';
    link.click();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Image Frame Editor</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="frames">Choose a frame:</label>
        <select id="frames" value={frame} onChange={handleFrameChange}>
          <option value="none">None</option>
          <option value="frame1">Frame 1 (Red)</option>
          <option value="frame2">Frame 2 (Blue)</option>
        </select>
      </div>
      <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black', marginTop: '20px' }}></canvas>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleDownload}>Download Image</button>
      </div>
    </div>
  );
}

export default App;