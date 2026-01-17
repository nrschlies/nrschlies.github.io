import React, { useEffect, useRef } from 'react';

const SignalWave = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let time = 0;

    // --- Configuration ---
    const rows = 40;                 // High density for the "terrain" look
    const verticalSeparation = 10;   // Tighter stacking
    const aberrationStrength = 2.5;  // Pixel offset for the RGB split (Balatro style)
    
    // Wave Physics - FASTER and more energetic
    const waves = [
      { freq: 0.003, amp: 35, speed: 0.04 }, // Swell
      { freq: 0.012, amp: 15, speed: 0.07 }, // Mid-detail
      { freq: 0.025, amp: 5,  speed: 0.15 }  // Fast ripple
    ];

    const resize = () => {
      width = window.innerWidth;
      height = 600; 
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);

      // Gradient for the main central beam
      const mainGradient = ctx.createLinearGradient(0, 0, width, 0);
      mainGradient.addColorStop(0,   'rgba(14, 165, 233, 0)');
      mainGradient.addColorStop(0.2, 'rgba(14, 165, 233, 1)');   // Cyan
      mainGradient.addColorStop(0.5, 'rgba(234, 179, 8, 1)');    // Gold
      mainGradient.addColorStop(0.8, 'rgba(14, 165, 233, 1)');   // Cyan
      mainGradient.addColorStop(1,   'rgba(14, 165, 233, 0)');

      // Loop from Back to Front
      for (let i = 0; i < rows; i++) {
        
        const progress = i / (rows - 1);
        const scale = 0.8 + (0.2 * progress); 
        const yOffset = (i * verticalSeparation);
        const startY = (height * 0.3) + yOffset; 

        // Calculate points once per row
        const points = [];
        for (let x = 0; x <= width; x += 8) {
          let y = 0;
          waves.forEach(w => {
            y += w.amp * Math.sin(x * w.freq + time * w.speed + (i * 0.35));
          });
          const screenY = startY - (y * scale);
          points.push({ x, y: screenY });
        }

        // --- 1. OCCLUSION (Fill) ---
        ctx.globalAlpha = 1;
        ctx.beginPath();
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let p of points) ctx.lineTo(p.x, p.y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = '#020617'; // Deep dark blue/black background
        ctx.fill();

        // --- 2. CHROMATIC ABERRATION (The Balatro Effect) ---
        // Only apply to the front ~40% of lines where it's most visible
        if (progress > 0.6) {
            ctx.lineWidth = 2 + (1.5 * progress);
            ctx.globalAlpha = 0.6 * progress; // Slightly transparent

            // Red Channel (Shifted Left)
            ctx.strokeStyle = 'rgba(255, 0, 50, 0.8)'; 
            ctx.beginPath();
            if (points.length > 0) {
              ctx.moveTo(points[0].x - aberrationStrength, points[0].y);
              for (let p of points) ctx.lineTo(p.x - aberrationStrength, p.y);
            }
            ctx.stroke();

            // Blue Channel (Shifted Right)
            ctx.strokeStyle = 'rgba(0, 50, 255, 0.8)'; 
            ctx.beginPath();
            if (points.length > 0) {
              ctx.moveTo(points[0].x + aberrationStrength, points[0].y);
              for (let p of points) ctx.lineTo(p.x + aberrationStrength, p.y);
            }
            ctx.stroke();
        }

        // --- 3. MAIN BEAM (White/Gold/Cyan) ---
        ctx.globalAlpha = 0.1 + (0.9 * Math.pow(progress, 4)); // Sharp fade in
        ctx.strokeStyle = mainGradient;
        ctx.lineWidth = 2 + (1 * progress);
        
        ctx.beginPath();
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let p of points) ctx.lineTo(p.x, p.y);
        }
        
        // Add "Bloom" glow
        if (progress > 0.8) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(14, 165, 233, 0.6)';
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      time += 0.05; // Increased Speed
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="signal-container-bottom" aria-hidden="true">
      <canvas ref={canvasRef} className="signal-canvas" />
      
      {/* CRT OVERLAY LAYERS */}
      <div className="crt-scanlines"></div>
      <div className="crt-vignette"></div>

      <style>{`
        .signal-container-bottom {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60vh;
          z-index: 0;
          pointer-events: none;
          mask-image: linear-gradient(to top, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to top, black 85%, transparent 100%);
        }
        .signal-canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* --- CRT EFFECT LAYERS --- */
        
        /* 1. Scanlines: Horizontal dark bands */
        .crt-scanlines {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          );
          background-size: 100% 4px; /* Size of the scanlines */
          z-index: 2;
          pointer-events: none;
        }

        /* 2. Vignette: Darkens corners like an old tube TV */
        .crt-vignette {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(
            circle,
            rgba(0,0,0,0) 60%,
            rgba(0,0,0,0.6) 100%
          );
          z-index: 3;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default SignalWave;