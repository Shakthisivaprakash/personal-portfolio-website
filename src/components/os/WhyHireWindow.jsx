import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import useDragConstraints from '@/hooks/use-drag-constraints';

const REASONS = [
  'Strong AI Foundation',
  'Machine Learning & Deep Learning Experience',
  'Full-Stack AI Development',
  'Data Analytics & Business Intelligence',
  'Problem Solving Mindset',
  'Real Project Experience',
  'Continuous Learner',
  'Strong Academic Performance (CGPA 8.99)',
  'Hands-on Industry Simulations',
  'Two Industry Internship Experiences',
  'Machine Learning Internship Experience',
  'Business Analytics Experience',
  'Real-world Project Exposure',
  'Practical AI Development Experience'
];

export default function WhyHireWindow({ visible, onClose }) {
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
            top: 'clamp(56px, 12vh, 120px)',
            left: isMobile ? '4%' : 'calc(50% - 220px)',
            width: isMobile ? '92%' : '440px',
            maxHeight: 'calc(100vh - 100px)',
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
                background: 'linear-gradient(90deg, #FFEAA7 0%, #B2F2BB 100%)',
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
                ⭐ why_hire_me.exe
              </span>
              <div className="w-12" />
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto flex-1 terminal-custom-scrollbar p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 160px)' }}>
              {/* Introduction Card */}
              <div 
                className="border-2 p-3 font-mono-retro text-[12px] leading-relaxed text-[#2D3436] bg-[#FFEAA7]/10"
                style={{ borderColor: '#FFEAA7' }}
              >
                "I focus on building practical AI solutions that solve real-world problems through machine learning, analytics, and intelligent software systems."
              </div>

              {/* Checklist */}
              <div className="space-y-1.5">
                <span className="text-[6.5px] text-slate-400 block tracking-wider uppercase">[ 💡 COMPETENCIES ]</span>
                <div className="border-2 border-[#2D3436] bg-white p-3 space-y-2.5 font-mono-retro text-[12px]">
                  {REASONS.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#B2F2BB] font-bold select-none">✓</span>
                      <span className="text-[#2D3436] leading-snug">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
