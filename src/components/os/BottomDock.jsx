import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, FolderOpen, User, Cpu, Award, FileText, Mail } from 'lucide-react';

const dockItems = [
  { id: 'home', label: 'Home', icon: Home, color: '#FFD1DC' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, color: '#B19CD9' },
  { id: 'about', label: 'About', icon: User, color: '#AEC6CF' },
  { id: 'skills', label: 'Skills', icon: Cpu, color: '#B2F2BB' },
  { id: 'certifications', label: 'Certs', icon: Award, color: '#FF9B9B' },
  { id: 'resume', label: 'Resume', icon: FileText, color: '#E6E6FA' },
  { id: 'contact', label: 'Contact', icon: Mail, color: '#FFD1DC' },
];

export default function BottomDock({ activeSection, onNavigate }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-2 px-4 pointer-events-none">
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
        className="pointer-events-auto flex items-end gap-1 px-3 py-2 relative"
        style={{
          background: 'rgba(255, 251, 242, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '2px solid #AEC6CF',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 -2px 8px rgba(174,198,207,0.2)',
        }}
      >
        {dockItems.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            isHovered={hoveredId === item.id}
            onHover={() => setHoveredId(item.id)}
            onLeave={() => setHoveredId(null)}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({ item, isActive, isHovered, onHover, onLeave, onClick }) {
  const Icon = item.icon;
  const isHighlighted = isActive || isHovered;

  return (
    <motion.button
      id={`dock-item-${item.id}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      animate={{
        scale: isHovered ? 1.25 : 1,
        y: isHovered ? -10 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="flex flex-col items-center gap-0.5 px-1.5 py-1 relative group"
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
        className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 whitespace-nowrap font-pixel text-[7px] text-[#2D3436] pointer-events-none"
        style={{ background: '#FFFBF2', border: '1px solid #AEC6CF' }}
      >
        {item.label}
      </motion.div>

      {/* Icon container */}
      <div
        className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center relative transition-all duration-150"
        style={{
          background: isHighlighted ? item.color : 'rgba(255,251,242,0.6)',
          border: `2px solid ${isHighlighted ? item.color : '#AEC6CF'}`,
          boxShadow: isHighlighted
            ? `inset -1px -1px 0 rgba(0,0,0,0.15), inset 1px 1px 0 rgba(255,255,255,0.6), 0 2px 6px ${item.color}60`
            : 'inset -1px -1px 0 rgba(0,0,0,0.1), inset 1px 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        <Icon
          size={18}
          strokeWidth={2.5}
          className="transition-colors"
          style={{ color: isHighlighted ? '#2D3436' : '#666' }}
        />

        {/* Pixel sparkle on hover */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-1 -right-1 w-2 h-2"
            style={{ background: item.color, boxShadow: `0 0 4px ${item.color}` }}
          />
        )}
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="w-1 h-1 mt-0.5" style={{ background: item.color }} />
      )}
    </motion.button>
  );
}
