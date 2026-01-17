// src/components/SignalWave.jsx
import React from 'react';

const SignalWave = () => {
  return (
    <div className="signal-container" aria-hidden="true">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="signal-svg"
      >
        <defs>
          <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Two paths for seamless looping */}
        <path
          className="signal-path"
          d="M0,60 Q30,10 60,60 T120,60 T180,60 T240,60 T300,60 T360,60 T420,60 T480,60 T540,60 T600,60 T660,60 T720,60 T780,60 T840,60 T900,60 T960,60 T1020,60 T1080,60 T1140,60 T1200,60"
          stroke="url(#signalGradient)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default SignalWave;