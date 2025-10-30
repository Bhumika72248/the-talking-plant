import React from 'react';

const SimpleParticleBackground = () => {
  return (
    <div className="particle-field">
      {/* CSS-only animated particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-neon-green rounded-full animate-particle opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}
      
      {/* Floating data streams */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`data-${i}`}
          className="absolute text-neon-green/10 font-mono text-xs animate-matrix"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            fontSize: `${8 + Math.random() * 4}px`
          }}
        >
          {Math.random() > 0.5 ? '01010101' : '11001100'}
        </div>
      ))}
    </div>
  );
};

export default SimpleParticleBackground;