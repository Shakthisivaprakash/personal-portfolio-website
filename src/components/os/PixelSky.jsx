import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CLOUDS = [
  { id: 1, top: '8%', size: 'large', speed: 90, delay: 0, direction: 1 },
  { id: 2, top: '18%', size: 'medium', speed: 120, delay: 30, direction: -1 },
  { id: 3, top: '30%', size: 'small', speed: 100, delay: 60, direction: 1 },
  { id: 4, top: '14%', size: 'medium', speed: 140, delay: 80, direction: 1 },
  { id: 5, top: '40%', size: 'small', speed: 110, delay: 45, direction: -1 },
];

export default function PixelSky() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, #FFD1DC 0%, #E6E6FA 35%, #FFFBF2 100%)',
      }}
    >
      {/* Pixel Sun */}
      <PixelSun />

      {/* Pixel Clouds */}
      {CLOUDS.map((cloud) => (
        <PixelCloud key={cloud.id} {...cloud} />
      ))}

      {/* Subtle scan lines for CRT effect */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
    </div>
  );
}

function PixelSun() {
  return (
    <div
      className="absolute top-6 right-8 md:top-10 md:right-16"
      style={{ animation: 'sun-pulse 4s ease-in-out infinite' }}
    >
      {/* Sun body - pixel grid */}
      <div className="relative w-16 h-16 md:w-20 md:h-20">
        {/* Core */}
        <div className="absolute inset-2 bg-[#FFEAA7]" style={{ boxShadow: '0 0 20px rgba(255,234,167,0.6)' }} />
        
        {/* Pixel rays */}
        {/* Top */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-[#FFEAA7] opacity-70" />
        {/* Bottom */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-[#FFEAA7] opacity-70" />
        {/* Left */}
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-2 bg-[#FFEAA7] opacity-70" />
        {/* Right */}
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-2 bg-[#FFEAA7] opacity-70" />
        
        {/* Diagonal rays */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#FFEAA7] opacity-50" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFEAA7] opacity-50" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#FFEAA7] opacity-50" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#FFEAA7] opacity-50" />
        
        {/* Face */}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#F0C040] opacity-60" />
          <div className="w-1.5 h-1.5 bg-[#F0C040] opacity-60" />
        </div>
      </div>
    </div>
  );
}

function PixelCloud({ top, size, speed, delay, direction }) {
  const sizeConfig = {
    large: { w: 'w-28 md:w-36', h: 'h-10 md:h-12' },
    medium: { w: 'w-20 md:w-28', h: 'h-7 md:h-9' },
    small: { w: 'w-14 md:w-20', h: 'h-5 md:h-7' },
  };

  const { w, h } = sizeConfig[size];
  const animName = direction > 0 ? 'cloud-drift-1' : 'cloud-drift-2';

  return (
    <div
      className={`absolute ${w} ${h}`}
      style={{
        top,
        animation: `${animName} ${speed}s linear ${delay}s infinite`,
        opacity: size === 'large' ? 0.7 : size === 'medium' ? 0.5 : 0.4,
      }}
    >
      <CloudShape size={size} />
    </div>
  );
}

function CloudShape({ size }) {
  const scale = size === 'large' ? 1 : size === 'medium' ? 0.75 : 0.55;
  
  return (
    <div className="relative w-full h-full" style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
      {/* Cloud built from pixel blocks */}
      <div className="absolute bottom-0 left-[10%] right-[10%] h-[50%] bg-white/90" />
      <div className="absolute bottom-[40%] left-[5%] w-[35%] h-[55%] bg-white/90" />
      <div className="absolute bottom-[35%] left-[25%] w-[40%] h-[65%] bg-white/90" />
      <div className="absolute bottom-[30%] right-[15%] w-[30%] h-[50%] bg-white/90" />
    </div>
  );
}
