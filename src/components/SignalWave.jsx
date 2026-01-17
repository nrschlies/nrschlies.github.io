// src/components/SignalWave.jsx
import React from 'react';

const SignalWave = () => {
  // A path data representative of a noisy sine wave
  const noisySinePath = "M0,150 C50,150 50,50 100,50 C150,50 150,250 200,250 C250,250 250,150 300,150 C350,150 350,50 400,50 C450,50 450,250 500,250 C550,250 550,150 600,150 C650,150 650,50 700,50 C750,50 750,250 800,250 C850,250 850,150 900,150 C950,150 950,50 1000,50 C1050,50 1050,250 1100,250 C1150,250 1150,150 1200,150";

  return (
    <div className="signal-container-bottom" aria-hidden="true">
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        className="signal-svg-bottom"
      >
        <defs>
          {/* Gradient for the glowing line */}
          <linearGradient id="signalGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-blue)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--color-accent-gold)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-accent-blue)" stopOpacity="0.8" />
          </linearGradient>
          {/* Filter for the "noise" and "glow" effect */}
          <filter id="glow-noise" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6 2" result="blur" />
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="blur" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* The animated path with glow and noise filter */}
        <path
          className="signal-path-bottom"
          d={noisySinePath}
          stroke="url(#signalGlow)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow-noise)"
        />
        
        {/* A second, sharper path on top for definition */}
        <path
          className="signal-path-bottom"
          d={noisySinePath}
          stroke="var(--color-accent-blue)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      
      <style>{`
        .signal-container-bottom {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 300px; /* Adjust height of the signal area */
          z-index: 0;
          pointer-events: none;
          opacity: 0.7;
          mask-image: linear-gradient(to top, black, transparent); /* Fade out at top */
        }
        .signal-svg-bottom {
          width: 200%; /* Double width for seamless looping */
          height: 100%;
          display: block;
        }
        .signal-path-bottom {
          animation: signal-scroll 12s linear infinite;
        }
        @keyframes signal-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .signal-path-bottom { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default SignalWave;