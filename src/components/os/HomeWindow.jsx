import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import useDragConstraints from '@/hooks/use-drag-constraints';
import { X, Minus, Square } from 'lucide-react';

const TYPING_TEXT = "Building intelligent systems that solve real-world problems using Artificial Intelligence, Machine Learning, Data Analytics, and Full-Stack AI Development.";

function TypingText({ text, speed = 30 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <span
          className="inline-block w-[2px] h-[12px] bg-[#B19CD9] align-middle ml-0.5"
          style={{ animation: 'blink 1s steps(1) infinite' }}
        />
      )}
    </span>
  );
}

function StatusBadge() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-start gap-2 mt-1">
      <div className="flex-shrink-0 mt-1">
        <div className="relative w-2.5 h-2.5">
          <div className="absolute inset-0 bg-[#B2F2BB]" />
          {pulse && (
            <motion.div
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute inset-0 bg-[#B2F2BB]"
            />
          )}
        </div>
      </div>
      <span className="font-mono-retro text-sm md:text-base text-[#2D3436]/80 leading-snug">
        Available for AI Engineering, Data Science, and Machine Learning opportunities.
      </span>
    </div>
  );
}

export default function HomeWindow({ visible }) {
  const [minimized, setMinimized] = useState(false);
  const [shake, setShake] = useState(false);
  const dragControls = useDragControls();
  const { windowRef, constraints } = useDragConstraints(visible, minimized);

  // Responsive mobile checking
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-maximize window when selected from bottom dock
  useEffect(() => {
    if (visible) {
      setMinimized(false);
    }
  }, [visible]);

  // Pixel star particle positions (static for note feel)
  const stars = [
    { x: '88%', y: '12%', color: '#B19CD9', size: 4 },
    { x: '92%', y: '70%', color: '#FFD1DC', size: 3 },
    { x: '5%',  y: '80%', color: '#AEC6CF', size: 4 },
    { x: '10%', y: '15%', color: '#FFD1DC', size: 3 },
  ];

  return (
    <AnimatePresence>
      {visible && !minimized && (
        <motion.div
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : { opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={shake ? { duration: 0.4 } : { type: 'spring', stiffness: 280, damping: 24, delay: 0.1 }}
          onAnimationComplete={() => shake && setShake(false)}
          drag={!isMobile}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={constraints}
          className={`fixed z-30 ${isMobile ? 'animate-[float-gentle_6s_ease-in-out_infinite]' : ''}`}
          style={{
            top: 'clamp(56px, 10vh, 100px)',
            left: isMobile ? '4%' : 'calc(50% - 220px)',
            width: isMobile ? '92%' : '440px',
          }}
        >
          {/* Sticky note paper */}
          <div
            className="relative overflow-hidden"
            style={{
              background: '#FFFBF2',
              border: '2px solid #AEC6CF',
              boxShadow: `
                inset -2px -2px 0 rgba(0,0,0,0.06),
                inset 2px 2px 0 rgba(255,255,255,0.9),
                4px 6px 0 rgba(174,198,207,0.35),
                8px 10px 0 rgba(174,198,207,0.15)
              `,
            }}
          >
            {/* Window Title Bar */}
            <div
              className="flex items-center justify-between px-2 py-1 select-none"
              style={{
                background: 'linear-gradient(90deg, #B19CD9 0%, #AEC6CF 100%)',
                borderBottom: '2px solid #AEC6CF',
                cursor: !isMobile ? 'grab' : 'default',
                touchAction: 'none'
              }}
              onPointerDown={(e) => {
                if (!isMobile) dragControls.start(e);
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => window.dispatchEvent(new Event('avatar-wave'))}
                  className="w-3 h-3 bg-[#FF9B9B] hover:brightness-90 transition-all"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  title="Close"
                />
                <button
                  onClick={() => setMinimized(true)}
                  className="w-3 h-3 bg-[#FFEAA7] hover:brightness-90 transition-all"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  title="Minimize"
                />
                <button
                  onClick={() => setShake(true)}
                  className="w-3 h-3 bg-[#B2F2BB] hover:brightness-90 transition-all"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  title="Maximize"
                />
              </div>

              {/* Title */}
              <span className="font-pixel text-[7px] text-white tracking-wider drop-shadow-sm">
                welcome.txt
              </span>

              {/* Filler for symmetry */}
              <div className="w-12" />
            </div>

            {/* Pixel push-pin */}
            <div
              className="absolute top-7 left-1/2 -translate-x-1/2 w-3 h-3 z-10"
              style={{ background: '#FF9B9B', border: '2px solid #e07070', boxShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}
            />

            {/* Note Body */}
            <div className="px-4 pb-5 pt-6">
              {/* Pixel corner decorations */}
              {stars.map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{ left: s.x, top: s.y }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg width={s.size * 2} height={s.size * 2} viewBox="0 0 4 4" style={{ imageRendering: 'pixelated' }}>
                    <rect x="1" y="0" width="2" height="4" fill={s.color} />
                    <rect x="0" y="1" width="4" height="2" fill={s.color} />
                  </svg>
                </motion.div>
              ))}

              {/* Ruled lines (notebook feel) */}
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="absolute left-0 right-0 h-px opacity-[0.07]"
                  style={{ background: '#AEC6CF', top: `${90 + i * 28}px` }} />
              ))}

              {/* Header row with pixel icon */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-shrink-0 w-6 h-6 relative" style={{ imageRendering: 'pixelated' }}>
                  <svg width="24" height="24" viewBox="0 0 6 6" style={{ imageRendering: 'pixelated' }}>
                    <rect x="1" y="0" width="4" height="1" fill="#B19CD9" />
                    <rect x="0" y="1" width="6" height="4" fill="#B19CD9" />
                    <rect x="1" y="5" width="4" height="1" fill="#B19CD9" />
                    <rect x="1" y="2" width="4" height="1" fill="#FFFBF2" opacity="0.5" />
                  </svg>
                </div>
                <h1 className="font-pixel text-[9px] md:text-[10px] text-[#2D3436] leading-tight tracking-wide">
                  Welcome to SHAKTHI OS
                </h1>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-1 mb-3">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #B19CD9, #AEC6CF, transparent)' }} />
                <div className="w-1 h-1 bg-[#B19CD9]" />
              </div>

              {/* Subtitle */}
              <p className="font-mono-retro text-sm md:text-base text-[#B19CD9] mb-3 leading-snug">
                AI Engineer | Data Scientist | Machine Learning Developer
              </p>

              {/* Message with typewriter */}
              <div
                className="p-2 mb-3 font-mono-retro text-sm md:text-base text-[#2D3436]/80 leading-relaxed"
                style={{
                  background: 'rgba(177,156,217,0.06)',
                  borderLeft: '3px solid #B19CD9',
                }}
              >
                <TypingText text={TYPING_TEXT} speed={25} />
              </div>

              {/* Status */}
              <div
                className="p-2"
                style={{
                  background: 'rgba(178,242,187,0.15)',
                  border: '2px solid #B2F2BB',
                }}
              >
                <p className="font-pixel text-[7px] text-[#2D3436]/50 mb-1">STATUS</p>
                <StatusBadge />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Minimized tab */}
      {visible && minimized && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setMinimized(false)}
          className="fixed bottom-16 left-4 z-30 px-3 py-1 font-pixel text-[7px] text-white"
          style={{
            background: 'linear-gradient(90deg, #B19CD9, #AEC6CF)',
            border: '2px solid #AEC6CF',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
          }}
        >
          welcome.txt
        </motion.button>
      )}
    </AnimatePresence>
  );
}
