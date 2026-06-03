import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PixelAvatar() {
  const [frame, setFrame] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [waving, setWaving] = useState(false);

  // Breathing animation cycle (4 frames)
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 4);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Idle detection - show laptop after 30s
  useEffect(() => {
    let timeout;
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 30000);
    };
    
    resetIdle();
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('touchstart', resetIdle);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
    };
  }, []);

  // Listen for wave trigger
  useEffect(() => {
    const handleWave = () => {
      setWaving(true);
      setTimeout(() => setWaving(false), 2000);
    };
    window.addEventListener('avatar-wave', handleWave);
    return () => window.removeEventListener('avatar-wave', handleWave);
  }, []);

  // Breathing offset
  const breatheOffset = [0, 1, 2, 1][frame];

  return (
    <motion.div
      className="fixed bottom-14 left-4 md:left-8 z-40 select-none pointer-events-none"
      style={{ animation: 'float-gentle 3s ease-in-out infinite' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="relative" style={{ imageRendering: 'pixelated' }}>
        {/* Shadow */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/10 rounded-full"
          style={{ filter: 'blur(2px)' }}
        />

        {/* Character - 48x64 pixel grid rendered via CSS */}
        <svg
          width="48"
          height="64"
          viewBox="0 0 12 16"
          className="w-12 h-16 md:w-16 md:h-[88px]"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Hair */}
          <rect x="3" y={0 - breatheOffset * 0.1} width="6" height="1" fill="#2D3436" />
          <rect x="2" y={1 - breatheOffset * 0.1} width="8" height="1" fill="#2D3436" />
          
          {/* Head / Skin */}
          <rect x="3" y={2 - breatheOffset * 0.1} width="6" height="1" fill="#FFDAB9" />
          <rect x="2" y={3 - breatheOffset * 0.1} width="8" height="2" fill="#FFDAB9" />
          
          {/* Goggles */}
          <rect x="3" y={3 - breatheOffset * 0.1} width="2" height="1" fill="#AEC6CF" />
          <rect x="6" y={3 - breatheOffset * 0.1} width="2" height="1" fill="#AEC6CF" />
          {/* Eyes behind goggles */}
          <rect x="3.5" y={3.2 - breatheOffset * 0.1} width="1" height="0.6" fill="#2D3436"
            style={{ animation: 'blink 4s infinite' }} />
          <rect x="6.5" y={3.2 - breatheOffset * 0.1} width="1" height="0.6" fill="#2D3436"
            style={{ animation: 'blink 4s infinite' }} />
          
          {/* Mouth */}
          <rect x="5" y={4.5 - breatheOffset * 0.1} width="2" height="0.5" fill="#FF9B9B" rx="0.2" />
          
          {/* Neck */}
          <rect x="5" y={5 - breatheOffset * 0.05} width="2" height="1" fill="#FFDAB9" />
          
          {/* Lab coat / body */}
          <rect x="2" y={6} width="8" height="1" fill="#FFFBF2" />
          <rect x="1" y={7} width="10" height={3 + breatheOffset * 0.2} fill="#FFFBF2" />
          
          {/* Coat details */}
          <rect x="5.5" y={7} width="0.5" height={3} fill="#AEC6CF" opacity="0.5" />
          
          {/* Pocket */}
          <rect x="7" y={8} width="2" height="1" fill="#E6E6FA" />
          {/* Pen in pocket */}
          <rect x="8" y={7.5} width="0.5" height="1" fill="#B19CD9" />
          
          {/* Arms */}
          {waving ? (
            <>
              {/* Waving arm */}
              <rect x="0" y={5} width="2" height="1" fill="#FFDAB9" />
              <rect x="-1" y={4} width="2" height="1" fill="#FFDAB9" />
              <rect x="10" y={7} width="2" height="3" fill="#FFDAB9" />
            </>
          ) : isIdle ? (
            <>
              {/* Arms holding laptop */}
              <rect x="0" y={7} width="2" height="2" fill="#FFDAB9" />
              <rect x="10" y={7} width="2" height="2" fill="#FFDAB9" />
              {/* Laptop */}
              <rect x="3" y={9.5} width="6" height="0.5" fill="#636e72" />
              <rect x="3.5" y={9} width="5" height="0.5" fill="#74b9ff" opacity="0.8" />
            </>
          ) : (
            <>
              <rect x="0" y={7} width="2" height="3" fill="#FFDAB9" />
              <rect x="10" y={7} width="2" height="3" fill="#FFDAB9" />
            </>
          )}
          
          {/* Legs */}
          <rect x="3" y={10 + breatheOffset * 0.1} width="3" height="3" fill="#636e72" />
          <rect x="6" y={10 + breatheOffset * 0.1} width="3" height="3" fill="#636e72" />
          
          {/* Shoes */}
          <rect x="2" y={13 + breatheOffset * 0.1} width="4" height="1" fill="#B19CD9" />
          <rect x="6" y={13 + breatheOffset * 0.1} width="4" height="1" fill="#B19CD9" />
        </svg>

        {/* Speech bubble for idle state */}
        {isIdle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-10 left-12 md:left-16 px-2 py-1 font-pixel text-[6px] md:text-[7px] text-[#2D3436] whitespace-nowrap"
            style={{
              background: '#FFFBF2',
              border: '2px solid #AEC6CF',
            }}
          >
            coding...
            <div className="absolute -bottom-1 left-2 w-2 h-2 bg-[#FFFBF2] border-b-2 border-r-2 border-[#AEC6CF] rotate-45" />
          </motion.div>
        )}

        {waving && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-10 left-12 md:left-16 px-2 py-1 font-pixel text-[6px] md:text-[7px] text-[#2D3436] whitespace-nowrap"
            style={{
              background: '#FFFBF2',
              border: '2px solid #AEC6CF',
            }}
          >
            hi there! ✨
            <div className="absolute -bottom-1 left-2 w-2 h-2 bg-[#FFFBF2] border-b-2 border-r-2 border-[#AEC6CF] rotate-45" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
