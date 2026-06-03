import { motion } from 'framer-motion';

export default function DesktopArea() {
  return (
    <div className="fixed inset-0 z-10 pt-8 pb-16 pointer-events-none">
      {/* Grid overlay - subtle pixel grid */}
      <div
        className="w-full h-full opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(174,198,207,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(174,198,207,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}
