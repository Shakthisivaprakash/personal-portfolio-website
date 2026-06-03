import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Folder, ArrowRight } from 'lucide-react';
import { PROJECTS } from './ProjectIcons';
import useDragConstraints from '@/hooks/use-drag-constraints';

export default function ProjectsExplorer({ visible, onClose, onOpenProject }) {
  const [minimized, setMinimized] = useState(false);
  const dragControls = useDragControls();
  const { windowRef, constraints } = useDragConstraints(visible, minimized);

  // Responsive mobile/tablet checking
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
          className="fixed z-30"
          style={{
            top: 'clamp(56px, 12vh, 100px)',
            left: isMobile ? '4%' : 'calc(50% - 250px)',
            width: isMobile ? '92%' : '500px',
            maxHeight: 'calc(100vh - 100px)',
            touchAction: 'pan-y'
          }}
        >
          <div
            className="flex flex-col overflow-hidden crt-screen"
            style={{
              background: '#FFFBF2',
              border: '2px solid #AEC6CF',
              boxShadow: `
                inset -2px -2px 0 rgba(0,0,0,0.06),
                inset 2px 2px 0 rgba(255,255,255,0.9),
                4px 6px 0 rgba(174,198,207,0.35),
                8px 10px 0 rgba(174,198,207,0.15)
              `,
              position: 'relative',
              maxHeight: 'inherit'
            }}
          >
            {/* Title Bar */}
            <div
              className="flex items-center justify-between px-2 py-1 flex-shrink-0 select-none"
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
              <div className="flex items-center gap-1">
                <button
                  onClick={onClose}
                  className="w-3 h-3 bg-[#FF9B9B] hover:brightness-90 transition-all"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                />
                <button
                  onClick={() => setMinimized(true)}
                  className="w-3 h-3 bg-[#FFEAA7] hover:brightness-90 transition-all"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                />
                <button
                  className="w-3 h-3 bg-[#B2F2BB] hover:brightness-90 transition-all"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                />
              </div>
              <span className="font-pixel text-[7px] text-white tracking-wider drop-shadow-sm flex items-center gap-1">
                📁 projects_explorer.exe
              </span>
              <div className="w-12" />
            </div>

            {/* Folder Explorer View */}
            <div className="p-4 space-y-4 overflow-y-auto terminal-custom-scrollbar" style={{ maxHeight: 'calc(100vh - 160px)', minHeight: '260px' }}>
              <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                [ SHAKTHI OS DIRECTORY: /PROJECTS ]
              </span>

              <div className="grid grid-cols-2 gap-3">
                {PROJECTS.map((proj) => (
                  <motion.button
                    key={proj.id}
                    onClick={() => onOpenProject(proj.id)}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="border-2 p-3 text-left flex flex-col items-center justify-center gap-2 group relative transition-all"
                    style={{
                      background: '#FFFBF2',
                      borderColor: '#AEC6CF',
                      boxShadow: '2px 2px 0 rgba(0,0,0,0.05)'
                    }}
                  >
                    {/* Retro Folder Icon */}
                    <div 
                      className="w-10 h-10 flex items-center justify-center relative transition-transform group-hover:scale-105"
                      style={{ color: proj.color }}
                    >
                      <Folder size={36} fill={proj.color + '44'} strokeWidth={1.5} />
                      <span className="absolute text-[8px] font-pixel text-slate-800" style={{ top: '15px' }}>
                        ⚙️
                      </span>
                    </div>

                    <div className="text-center">
                      <span className="font-pixel text-[6.5px] text-[#2D3436] font-bold block truncate max-w-[120px]">
                        {proj.label}
                      </span>
                      <span className="font-mono-retro text-[9px] text-slate-400 block mt-0.5 uppercase">
                        Case Study →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Folder Status bar */}
            <div className="px-3 py-1 bg-slate-100 border-t border-[#AEC6CF]/30 font-pixel text-[5px] text-slate-400 flex justify-between">
              <span>{PROJECTS.length} OBJECT(S) FOUND</span>
              <span>guest@shakthi-os:~$ ls -la /projects</span>
            </div>

          </div>
        </motion.div>
      )}

      {/* Minimized dock tab */}
      {visible && minimized && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setMinimized(false)}
          className="fixed bottom-16 left-[108px] z-30 px-3 py-1 font-pixel text-[7px] text-white"
          style={{
            background: 'linear-gradient(90deg, #B19CD9, #AEC6CF)',
            border: '2px solid #AEC6CF',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.1)'
          }}
        >
          📁 projects_explorer.exe
        </motion.button>
      )}
    </AnimatePresence>
  );
}
