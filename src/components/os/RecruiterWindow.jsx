import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import useDragConstraints from '@/hooks/use-drag-constraints';

const SKILLS = ['Python', 'Machine Learning', 'Deep Learning', 'Data Analytics', 'FastAPI', 'React'];
const ROLES = ['AI Engineer', 'Machine Learning Engineer', 'Data Scientist', 'Software Developer'];

export default function RecruiterWindow({ visible, onClose }) {
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
                background: 'linear-gradient(90deg, #B19CD9 0%, #AEC6CF 100%)',
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
                🔍 recruiter_quick_view.exe
              </span>
              <div className="w-12" />
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto flex-1 terminal-custom-scrollbar p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 160px)' }}>
              {/* Header Profile Badge */}
              <div className="border-2 border-dashed border-[#B19CD9] p-3 bg-[#B19CD9]/5 text-center">
                <h3 className="text-[10px] text-[#2D3436] font-bold">AI & Data Science Graduate</h3>
                <p className="text-[#B19CD9] text-[8px] mt-1 font-bold">Sri Venkateswaraa College of Technology</p>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-[#2D3436] font-mono-retro font-bold">
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[7px] text-slate-400 font-pixel">ACADEMIC CGPA</span>
                  <span className="text-sm text-[#2D3436] mt-1">8.99 / 10.0</span>
                </div>
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[7px] text-slate-400 font-pixel">PORTFOLIO PROJECTS</span>
                  <span className="text-sm text-[#B19CD9] mt-1">5 Active</span>
                </div>
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[7px] text-slate-400 font-pixel">INTERNSHIPS</span>
                  <span className="text-sm text-[#FFEAA7] mt-1">2 Industry</span>
                </div>
                <div className="border-2 border-[#2D3436] p-2 bg-white flex flex-col justify-between">
                  <span className="text-[7px] text-slate-400 font-pixel">CERTIFICATIONS</span>
                  <span className="text-sm text-[#74b9ff] mt-1">6+ Verified</span>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <span className="text-[6.5px] text-slate-400 block tracking-wider uppercase">[ 🛠️ CORE SKILLS ]</span>
                <div className="flex flex-wrap gap-1.5 p-2.5 border-2 border-[#2D3436] bg-white">
                  {SKILLS.map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[6.5px] text-[#2D3436] border-2 border-[#2D3436] font-bold"
                      style={{
                        background: '#B2F2BB',
                        boxShadow: '1px 1.5px 0 #2D3436'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <span className="text-[6.5px] text-slate-400 block tracking-wider uppercase">[ 💼 INDUSTRY EXPERIENCE ]</span>
                <div className="p-3 border-2 border-[#2D3436] bg-white space-y-2 text-[10px] font-mono-retro font-bold text-[#2D3436]">
                  <div className="flex items-start gap-2">
                    <span className="text-[#B2F2BB]">✓</span>
                    <span>Tata Data Visualization Virtual Internship</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#B2F2BB]">✓</span>
                    <span>Gradtwin Machine Learning Internship</span>
                  </div>
                </div>
              </div>

              {/* Seeking Opportunities */}
              <div className="space-y-1.5">
                <span className="text-[6.5px] text-slate-400 block tracking-wider uppercase">[ 🚀 SEEKING OPPORTUNITIES ]</span>
                <div className="p-3 border-2 border-[#2D3436] bg-white space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {ROLES.map(role => (
                      <span
                        key={role}
                        className="px-2 py-0.5 text-[6px] text-[#2D3436] border-2 border-[#2D3436] font-bold"
                        style={{
                          background: '#FFD1DC',
                          boxShadow: '1px 1.5px 0 #2D3436'
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#2D3436]/70 leading-normal font-mono-retro mt-1">
                    Available immediately for full-time positions. Seeking roles to build intelligent systems, deploy ML models, and engineer AI-powered software solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
