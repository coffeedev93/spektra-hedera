"use client";

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QRCodeGenerator({ text, size = 250 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        text,
        {
          width: size,
          margin: 2,
          color: {
            dark: '#000000', // Black dots
            light: '#ffffff', // White background
          },
        },
        (error) => {
          if (error) console.error('QR Code generation failed:', error);
        }
      );
    }
  }, [text, size]);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
      <canvas ref={canvasRef} />
    </div>
  );
}