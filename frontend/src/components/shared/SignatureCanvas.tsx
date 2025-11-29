import React, { useRef, useState, useEffect } from 'react';

const SignatureCanvas = ({ onSignatureChange, label = "Firma del Paciente", required = false }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    
    // Soporte para touch y mouse
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setIsEmpty(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    // Soporte para touch y mouse
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      
      // Extraer solo la parte Base64 (sin el prefijo data:image/png;base64,)
      const base64Only = dataURL.split(',')[1];
      
      onSignatureChange(base64Only);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onSignatureChange('');
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        marginBottom: '6px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#172B4D'
      }}>
        {label} {required && <span style={{ color: '#DE350B' }}>*</span>}
      </label>
      
      <div style={{
        border: '2px dashed #DFE1E6',
        borderRadius: '4px',
        padding: '12px',
        backgroundColor: '#FAFBFC'
      }}>
        <canvas
          ref={canvasRef}
          width={500}
          height={150}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            cursor: 'crosshair',
            backgroundColor: 'white',
            width: '100%',
            touchAction: 'none'
          }}
        />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px'
        }}>
          <span style={{
            fontSize: '12px',
            color: '#626F86',
            fontStyle: 'italic'
          }}>
            {isEmpty ? '✍️ Firme aquí usando el mouse' : '✅ Firma capturada'}
          </span>
          
          <button
            type="button"
            onClick={clearSignature}
            disabled={isEmpty}
            style={{
              padding: '6px 12px',
              backgroundColor: isEmpty ? '#F4F5F7' : '#FFEBE6',
              color: isEmpty ? '#97A0AF' : '#DE350B',
              border: 'none',
              borderRadius: '3px',
              cursor: isEmpty ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureCanvas;
