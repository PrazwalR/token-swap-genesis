
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
      
      {/* Floating Orbs */}
      <div className="floating-orb w-72 h-72 bg-purple-500/20 top-10 left-10 animate-float" 
           style={{ animationDelay: '0s' }} />
      <div className="floating-orb w-96 h-96 bg-blue-500/15 top-1/2 right-10 animate-float" 
           style={{ animationDelay: '2s' }} />
      <div className="floating-orb w-64 h-64 bg-pink-500/20 bottom-20 left-1/3 animate-float" 
           style={{ animationDelay: '4s' }} />
      <div className="floating-orb w-80 h-80 bg-green-500/15 top-1/4 right-1/3 animate-float" 
           style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 gap-px h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-purple-500/20" />
          ))}
        </div>
      </div>
      
      {/* Animated Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q250,10 500,50 T1000,50"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse-slow"
          />
          <path
            d="M0,150 Q250,110 500,150 T1000,150"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;
