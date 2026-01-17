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
    const rows = 35;                // More rows for a smoother surface
    const verticalSeparation = 12;  // Tighter stacking
    
    // Wave Physics - Slower, more organic movement
    const waves = [
      { freq: 0.002, amp: 40, speed: 0.01 },
      { freq: 0.015, amp: 15, speed: 0.02 },
      { freq: 0.03,  amp: 5,  speed: 0.05 }
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

      // Create a shared gradient for the ridges
      // This ensures every line has that "Gold/Blue" signature look
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0,   'rgba(14, 165, 233, 0)');   // Fade Left
      gradient.addColorStop(0.2, 'rgba(14, 165, 233, 1)');   // Cyan
      gradient.addColorStop(0.5, 'rgba(234, 179, 8, 1)');    // Gold Center
      gradient.addColorStop(0.8, 'rgba(14, 165, 233, 1)');   // Cyan
      gradient.addColorStop(1,   'rgba(14, 165, 233, 0)');   // Fade Right

      // Loop from Back (i=0) to Front (i=rows-1)
      for (let i = 0; i < rows; i++) {
        
        const progress = i / (rows - 1);
        
        // Depth Logic
        // Back lines: Thinner, transparent
        // Front lines: Thicker, opaque
        const scale = 0.8 + (0.2 * progress); 
        const yOffset = (i * verticalSeparation);
        
        // Center the mass of the waves
        const startY = (height * 0.35) + yOffset; 

        // Generate Path Points
        // We calculate points first so we can use them for both Fill and Stroke
        const points = [];
        for (let x = 0; x <= width; x += 10) { // Optimization: Step by 10px
          let y = 0;
          waves.forEach(w => {
            // (i * 0.3) creates the propagation delay (traveling wave effect)
            y += w.amp * Math.sin(x * w.freq + time * w.speed + (i * 0.3));
          });
          const screenY = startY - (y * scale);
          points.push({ x, y: screenY });
        }

        // --- 1. FILL (Occlusion) ---
        // We must fill with a dark color to hide the lines behind this one
        ctx.globalAlpha = 1; // Fill is always opaque to block background
        ctx.beginPath();
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let p of points) ctx.lineTo(p.x, p.y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        // Use a very dark blue-black to blend better than pure black
        ctx.fillStyle = '#020617'; 
        ctx.fill();

        // --- 2. STROKE (The Color Ridge) ---
        // Set alpha based on depth (Back is dim, Front is bright)
        ctx.globalAlpha = 0.1 + (0.9 * Math.pow(progress, 3)); // Exponential curve for dramatic focus on front
        
        ctx.beginPath();
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let p of points) ctx.lineTo(p.x, p.y);
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5 + (1.5 * progress); // Thicker in front
        
        // Add glow only to the front 30% of lines for performance and style
        if (progress > 0.7) {
            ctx.shadowBlur = 15 * progress;
            ctx.shadowColor = 'rgba(14, 165, 233, 0.5)';
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.stroke();
      }

      // Reset global alpha for next frame/other draws
      ctx.globalAlpha = 1;
      
      time += 0.05;
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
      <style>{`
        .signal-container-bottom {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60vh; /* Adjust height to taste */
          z-index: 0;
          pointer-events: none;
          /* Fade the top edge slightly */
          mask-image: linear-gradient(to top, black 80%, transparent 100%);
          -webkit-mask-image: linear-gradient(to top, black 80%, transparent 100%);
        }
        .signal-canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default SignalWave;