import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import useDragConstraints from '@/hooks/use-drag-constraints';

function AnimatedNumber({ value, isDecimal }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    const duration = 1000; // 1 second count-up
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {isDecimal ? displayValue.toFixed(2) : Math.floor(displayValue)}
    </span>
  );
}

export default function StatsWindow({ visible, onClose }) {
  const [minimized, setMinimized] = useState(false);
  const dragControls = useDragControls();
  const { windowRef, constraints } = useDragConstraints(visible, minimized);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (visible) setMinimized(false);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && !minimized && (
        <motion.div
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          drag={!isMobile}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={constraints}
          className="fixed z-30 font-pixel"
          style={{
            top: 'clamp(56px, 15vh, 180px)',
            left: isMobile ? '6%' : 'calc(50% - 160px)',
            width: isMobile ? '88%' : '320px',
            maxHeight: 'calc(100vh - 120px)',
            touchAction: 'pan-y'
          }}
        >
          <div
            className="flex flex-col overflow-hidden crt-screen"
            style={{
              background: '#FFFBF2',
              border: '3.5px solid #2D3436',
              boxShadow: '4px 6px 0 rgba(0,0,0,0.15)',
              position: 'relative',
              maxHeight: 'inherit'
            }}
          >
            {/* Window Title Bar */}
            <div
              className="flex items-center justify-between px-2 py-1.5 flex-shrink-0 select-none"
              style={{
                background: 'linear-gradient(90deg, #FF9B9B 0%, #FFEAA7 100%)',
                borderBottom: '2.5px solid #2D3436',
                cursor: !isMobile ? 'grab' : 'default',
                touchAction: 'none'
              }}
              onPointerDown={(e) => {
                if (!isMobile) dragControls.start(e);
              }}
            >
              <div className="flex items-center gap-1">
                <button
                  onClick={onClose}
                  className="w-3.5 h-3.5 bg-[#FF9B9B] hover:brightness-95 transition-all"
                  style={{ border: '1.5px solid #2D3436' }}
                />
                <button
                  onClick={() => setMinimized(true)}
                  className="w-3.5 h-3.5 bg-[#FFEAA7] hover:brightness-95 transition-all"
                  style={{ border: '1.5px solid #2D3436' }}
                />
                <div
                  className="w-3.5 h-3.5 bg-[#B2F2BB]"
                  style={{ border: '1.5px solid #2D3436' }}
                />
              </div>
              <span className="text-[7.5px] text-[#2D3436] tracking-wider drop-shadow-sm font-bold">
                📊 career_analytics.exe
              </span>
              <div className="w-8" />
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto flex-1 terminal-custom-scrollbar p-3.5 space-y-3 bg-[#FFFBF2]" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              <span className="text-[6.5px] text-slate-400 block tracking-wider uppercase">[ 📊 LIVE DIAGNOSTICS ]</span>
              
              <div className="grid grid-cols-2 gap-2 text-[#2D3436] font-mono-retro font-bold">
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[6px] text-slate-400 font-pixel uppercase">Projects Built</span>
                  <span className="text-xl text-[#2D3436] mt-1">
                    <AnimatedNumber value={5} />
                  </span>
                </div>
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[6px] text-slate-400 font-pixel uppercase">Major AI Projects</span>
                  <span className="text-xl text-[#B19CD9] mt-1">
                    <AnimatedNumber value={4} />
                  </span>
                </div>
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[6px] text-slate-400 font-pixel uppercase">Internships</span>
                  <span className="text-xl text-[#FFEAA7] mt-1">
                    <AnimatedNumber value={2} />
                  </span>
                </div>
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[6px] text-slate-400 font-pixel uppercase">Certificates</span>
                  <span className="text-xl text-[#74b9ff] mt-1">
                    <AnimatedNumber value={6} />+
                  </span>
                </div>
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[6px] text-slate-400 font-pixel uppercase">Technologies</span>
                  <span className="text-xl text-[#B2F2BB] mt-1">
                    <AnimatedNumber value={15} />+
                  </span>
                </div>
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[6px] text-slate-400 font-pixel uppercase">Academic CGPA</span>
                  <span className="text-xl text-[#FF9B9B] mt-1">
                    <AnimatedNumber value={8.99} isDecimal={true} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
