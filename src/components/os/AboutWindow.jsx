import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MapPin, GraduationCap, Star } from 'lucide-react';
import useDragConstraints from '@/hooks/use-drag-constraints';

const TAGS = [
  { label: 'Python', color: '#B19CD9' },
  { label: 'Machine Learning', color: '#AEC6CF' },
  { label: 'Deep Learning', color: '#FFD1DC' },
  { label: 'Data Science', color: '#B2F2BB' },
  { label: 'Computer Vision', color: '#FFEAA7' },
  { label: 'LLMs', color: '#FF9B9B' },
  { label: 'FastAPI', color: '#B19CD9' },
  { label: 'React', color: '#AEC6CF' },
  { label: 'TensorFlow', color: '#FFD1DC' },
];

function InfoRow({ label, value, icon: IconComp }) {
  return (
    <div className="flex items-start gap-2 py-1.5" style={{ borderBottom: '1px dashed rgba(174,198,207,0.4)' }}>
      <div className="flex items-center gap-1.5 min-w-[110px] flex-shrink-0">
        {IconComp && <IconComp size={10} className="text-[#B19CD9] flex-shrink-0" />}
        <span className="font-pixel text-[6px] text-[#2D3436]/50 tracking-wide uppercase">{label}</span>
      </div>
      <span className="font-mono-retro text-sm text-[#2D3436] leading-tight">{value}</span>
    </div>
  );
}

function PixelTag({ label, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="px-2 py-0.5 font-pixel text-[6px] text-[#2D3436] cursor-default"
      style={{
        background: color + '33',
        border: `2px solid ${color}`,
        boxShadow: `2px 2px 0 ${color}55`,
      }}
    >
      {label}
    </motion.div>
  );
}

export default function AboutWindow({ visible, onClose }) {
  const [minimized, setMinimized] = useState(false);
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
            top: 'clamp(56px, 10vh, 100px)',
            left: isMobile ? '4%' : 'calc(50% - 230px)',
            width: isMobile ? '92%' : '460px',
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
                background: 'linear-gradient(90deg, #AEC6CF 0%, #B19CD9 100%)',
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
              <span className="font-pixel text-[7px] text-white tracking-wider drop-shadow-sm">
                about_shakthi.exe
              </span>
              <div className="w-12" />
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto flex-1 terminal-custom-scrollbar" style={{ maxHeight: 'calc(100vh - 160px)' }}>
              <div className="p-4">

                {/* Avatar + Name block */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Pixel avatar icon */}
                  <div className="flex-shrink-0">
                    <svg width="48" height="48" viewBox="0 0 12 12" style={{ imageRendering: 'pixelated' }}>
                      {/* Head */}
                      <rect x="3" y="1" width="6" height="1" fill="#2D3436" />
                      <rect x="2" y="2" width="8" height="1" fill="#2D3436" />
                      <rect x="2" y="3" width="8" height="3" fill="#FFDAB9" />
                      {/* Goggles */}
                      <rect x="3" y="4" width="2" height="1" fill="#AEC6CF" />
                      <rect x="6" y="4" width="2" height="1" fill="#AEC6CF" />
                      {/* Body */}
                      <rect x="3" y="6" width="6" height="1" fill="#FFDAB9" />
                      <rect x="2" y="7" width="8" height="3" fill="#FFFBF2" />
                      {/* Legs */}
                      <rect x="3" y="10" width="2" height="2" fill="#636e72" />
                      <rect x="6" y="10" width="2" height="2" fill="#636e72" />
                      {/* Coat detail */}
                      <rect x="5" y="7" width="1" height="3" fill="#AEC6CF" opacity="0.4" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="font-pixel text-[9px] md:text-[10px] text-[#2D3436] leading-tight mb-1">
                      Shakthi Sivaprakash S
                    </h2>
                    <div
                      className="inline-block px-2 py-0.5 font-mono-retro text-sm text-[#B19CD9]"
                      style={{ background: 'rgba(177,156,217,0.12)', border: '2px solid #B19CD9' }}
                    >
                      AI Engineer | Data Scientist | Machine Learning Developer
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #AEC6CF, #B19CD9, transparent)' }} />
                  <div className="w-1 h-1 bg-[#B19CD9]" />
                </div>

                {/* Info rows */}
                <div className="mb-4 space-y-0">
                  <InfoRow label="Location" value="Walajapet, Tamil Nadu, India" icon={MapPin} />
                  <InfoRow label="Degree" value="B.Tech Artificial Intelligence and Data Science" icon={GraduationCap} />
                  <InfoRow label="College" value="Sri Venkateswaraa College of Technology" icon={GraduationCap} />
                  <InfoRow label="CGPA" value="8.99 / 10" icon={Star} />
                </div>

                {/* Description */}
                <div
                  className="p-3 mb-4 font-mono-retro text-sm text-[#2D3436]/80 leading-relaxed space-y-2"
                  style={{
                    background: 'rgba(177,156,217,0.06)',
                    border: '2px solid rgba(177,156,217,0.25)',
                    borderLeft: '3px solid #B19CD9',
                  }}
                >
                  <p>
                    I am an AI and Data Science graduate passionate about building practical AI products that solve real-world problems.
                  </p>
                  <p>
                    My expertise includes Machine Learning, Deep Learning, Data Analytics, Computer Vision, Full-Stack AI Development, and LLM-powered applications.
                  </p>
                  <p>
                    I enjoy transforming complex problems into intelligent systems using modern AI technologies.
                  </p>
                </div>

                {/* Tags */}
                <div className="mb-1">
                  <p className="font-pixel text-[6px] text-[#2D3436]/40 mb-2 tracking-widest uppercase">Skills &amp; Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {TAGS.map((tag) => (
                      <PixelTag key={tag.label} label={tag.label} color={tag.color} />
                    ))}
                  </div>
                </div>

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
          className="fixed bottom-16 left-[228px] z-30 px-3 py-1 font-pixel text-[7px] text-white"
          style={{
            background: 'linear-gradient(90deg, #AEC6CF, #B19CD9)',
            border: '2px solid #AEC6CF',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
          }}
        >
          about_shakthi.exe
        </motion.button>
      )}
    </AnimatePresence>
  );
}
