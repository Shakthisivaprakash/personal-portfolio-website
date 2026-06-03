import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
// ... (rest of code stays the same)
  {
    id: 'ai-debugger',
    label: 'AI Debugger OS',
    color: '#B19CD9',
    icon: (
      <svg width="40" height="40" viewBox="0 0 10 10" style={{ imageRendering: 'pixelated' }}>
        {/* Terminal screen */}
        <rect x="1" y="1" width="8" height="6" fill="#2D3436" />
        <rect x="2" y="2" width="6" height="4" fill="#1a1a2e" />
        {/* Cursor blink lines */}
        <rect x="3" y="3" width="3" height="1" fill="#B19CD9" />
        <rect x="3" y="4.5" width="2" height="1" fill="#B19CD9" opacity="0.6" />
        <rect x="3" y="3" width="1" height="1" fill="#FFFBF2" opacity="0.8" />
        {/* Bug icon */}
        <rect x="7" y="2.5" width="1" height="1" fill="#FF9B9B" />
        <rect x="7" y="4" width="1" height="1" fill="#FF9B9B" />
        {/* Stand */}
        <rect x="4" y="7" width="2" height="1" fill="#636e72" />
        <rect x="3" y="8" width="4" height="1" fill="#636e72" />
      </svg>
    ),
  },
  {
    id: 'vision-lab',
    label: 'Vision Lab',
    color: '#AEC6CF',
    icon: (
      <svg width="40" height="40" viewBox="0 0 10 10" style={{ imageRendering: 'pixelated' }}>
        {/* Camera body */}
        <rect x="1" y="3" width="8" height="5" fill="#2D3436" />
        <rect x="1" y="3" width="8" height="1" fill="#636e72" />
        {/* Lens */}
        <rect x="3" y="4" width="4" height="4" fill="#AEC6CF" opacity="0.3" />
        <rect x="4" y="4.5" width="2" height="3" fill="#AEC6CF" opacity="0.5" />
        <rect x="4.5" y="5" width="1" height="2" fill="#FFFBF2" opacity="0.9" />
        {/* Viewfinder */}
        <rect x="7" y="2" width="2" height="1" fill="#2D3436" />
        {/* Flash / eye highlight */}
        <rect x="2" y="4" width="1" height="1" fill="#FFD1DC" />
        {/* Scan lines */}
        <rect x="3" y="5" width="4" height="0.5" fill="#AEC6CF" opacity="0.4" />
        <rect x="3" y="6.5" width="4" height="0.5" fill="#AEC6CF" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'flood-intel',
    label: 'Predictive Flood',
    color: '#74b9ff',
    icon: (
      <svg width="40" height="40" viewBox="0 0 10 10" style={{ imageRendering: 'pixelated' }}>
        {/* Water waves */}
        <rect x="0" y="6" width="10" height="4" fill="#74b9ff" opacity="0.4" />
        <rect x="0" y="7" width="10" height="3" fill="#74b9ff" opacity="0.6" />
        {/* Wave top */}
        <rect x="1" y="6" width="2" height="1" fill="#FFFBF2" opacity="0.5" />
        <rect x="4" y="6" width="2" height="1" fill="#FFFBF2" opacity="0.5" />
        <rect x="7" y="6" width="2" height="1" fill="#FFFBF2" opacity="0.5" />
        {/* House */}
        <rect x="3" y="4" width="4" height="3" fill="#FFDAB9" />
        <rect x="2" y="3" width="6" height="2" fill="#FF9B9B" />
        <rect x="4" y="5" width="2" height="2" fill="#AEC6CF" />
        {/* Radar / alert */}
        <rect x="7" y="1" width="2" height="2" fill="#FFEAA7" opacity="0.9" />
        <rect x="8" y="0" width="1" height="1" fill="#FFEAA7" />
      </svg>
    ),
  },
  {
    id: 'data-hub',
    label: 'Data Analytics Hub',
    color: '#B2F2BB',
    icon: (
      <svg width="40" height="40" viewBox="0 0 10 10" style={{ imageRendering: 'pixelated' }}>
        {/* Bar chart */}
        <rect x="1" y="7" width="1" height="2" fill="#B19CD9" />
        <rect x="3" y="5" width="1" height="4" fill="#AEC6CF" />
        <rect x="5" y="3" width="1" height="6" fill="#B2F2BB" />
        <rect x="7" y="4" width="1" height="5" fill="#FFD1DC" />
        {/* Axes */}
        <rect x="1" y="1" width="1" height="8" fill="#2D3436" opacity="0.5" />
        <rect x="1" y="8" width="8" height="1" fill="#2D3436" opacity="0.5" />
        {/* Trend line */}
        <rect x="2" y="7" width="1" height="1" fill="#FFEAA7" opacity="0.8" />
        <rect x="4" y="5" width="1" height="1" fill="#FFEAA7" opacity="0.8" />
        <rect x="6" y="3" width="1" height="1" fill="#FFEAA7" opacity="0.8" />
        <rect x="8" y="2" width="1" height="1" fill="#FFEAA7" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: 'gradtwin-ml',
    label: 'Gradtwin ML',
    color: '#B2F2BB',
    icon: (
      <svg width="40" height="40" viewBox="0 0 10 10" style={{ imageRendering: 'pixelated' }}>
        {/* Certificate/Badge border */}
        <rect x="1" y="1" width="8" height="8" fill="#2D3436" />
        <rect x="2" y="2" width="6" height="6" fill="#FFFBF2" />
        {/* Ribbon/Seal */}
        <rect x="4" y="4" width="2" height="2" fill="#FFEAA7" />
        <rect x="3.5" y="5.5" width="3" height="0.5" fill="#FFEAA7" />
        {/* Ribbon tails */}
        <rect x="3" y="6" width="1" height="2" fill="#FF9B9B" />
        <rect x="6" y="6" width="1" height="2" fill="#FF9B9B" />
        {/* Certificate writing lines */}
        <rect x="3" y="3" width="4" height="0.5" fill="#AEC6CF" />
        <rect x="3" y="4" width="1" height="0.5" fill="#AEC6CF" />
        <rect x="5" y="4" width="2" height="0.5" fill="#AEC6CF" />
      </svg>
    ),
  },
  {
    id: 'hr-assistant',
    label: 'HR Assistant',
    color: '#D8B4FE',
    icon: (
      <svg width="40" height="40" viewBox="0 0 10 10" style={{ imageRendering: 'pixelated' }}>
        {/* Folder Back */}
        <rect x="1" y="3" width="8" height="6" fill="#F5C46C" />
        <rect x="1" y="2" width="3.5" height="1.5" fill="#F5C46C" />
        
        {/* Extracted Document Sheet */}
        <rect x="2.5" y="1" width="5" height="3.5" fill="#FFFBF2" />
        <rect x="3.5" y="2" width="3" height="0.5" fill="#AEC6CF" />
        
        {/* Folder Front Cover */}
        <rect x="1" y="4" width="8" height="5" fill="#FFE082" />
        
        {/* Chat Bubble on top-right */}
        <rect x="4.5" y="0.5" width="4.5" height="3" rx="0.5" fill="#74b9ff" />
        {/* Bubble Tail */}
        <rect x="5.5" y="3" width="1" height="1" fill="#74b9ff" />
        {/* Inside Chat Bubble Text Indicator */}
        <rect x="5.5" y="1.5" width="2.5" height="0.5" fill="#FFFBF2" />
        
        {/* AI Assistant Face Display on Folder Front */}
        <rect x="2.5" y="5.5" width="3" height="2.5" fill="#2D3436" />
        {/* Robot Eyes */}
        <rect x="3" y="6.2" width="0.5" height="0.5" fill="#B2F2BB" />
        <rect x="4.5" y="6.2" width="0.5" height="0.5" fill="#B2F2BB" />
      </svg>
    ),
  },
];

export { PROJECTS };

function ProjectIconItem({ project, index, onOpenProject }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4 + index * 0.12, duration: 0.4 }}
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={() => onOpenProject(project.id)}
      onClick={() => onOpenProject(project.id)}
      className="flex flex-col items-center gap-1 group w-16 select-none relative"
    >
      {/* Hover Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 whitespace-nowrap font-pixel text-[4.5px] text-[#2D3436] pointer-events-none z-30"
            style={{
              background: '#FFFBF2',
              border: '1px solid #AEC6CF',
              boxShadow: '1px 1px 0 rgba(0,0,0,0.1)',
            }}
          >
            Click or Double-click to Open
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon box with deep active drop shadows */}
      <div
        className="w-12 h-12 flex items-center justify-center transition-all duration-200"
        style={{
          background: hovered ? project.color + '44' : project.color + '1a',
          border: `2.5px solid ${project.color}`,
          boxShadow: hovered 
            ? `4px 4px 0 ${project.color}77, inset 1px 1px 0 rgba(255,255,255,0.7)` 
            : `2px 2px 0 ${project.color}33, inset 1px 1px 0 rgba(255,255,255,0.5)`,
        }}
      >
        <div className="transition-transform duration-300 group-hover:scale-105">
          {project.icon}
        </div>
      </div>

      {/* Label with retro desktop selection style inversion */}
      <span
        className="font-pixel text-[5.5px] text-center leading-tight px-1 py-0.5 max-w-[64px] border transition-all duration-150"
        style={{
          background: hovered ? project.color : 'rgba(255,251,242,0.85)',
          color: '#2D3436',
          borderColor: hovered ? '#2D3436' : 'rgba(174,198,207,0.4)',
          boxShadow: hovered ? '1px 1px 0 rgba(0,0,0,0.15)' : 'none',
          fontWeight: hovered ? 'bold' : 'normal',
        }}
      >
        {project.label}
      </span>
    </motion.button>
  );
}

export default function ProjectIcons({ onOpenProject }) {
  const desktopProjects = PROJECTS.filter(p => p.id !== 'gradtwin-ml');

  return (
    <div className="fixed top-12 left-4 z-20 flex flex-col gap-4 pt-4">
      {desktopProjects.map((project, i) => (
        <ProjectIconItem
          key={project.id}
          project={project}
          index={i}
          onOpenProject={onOpenProject}
        />
      ))}
    </div>
  );
}
