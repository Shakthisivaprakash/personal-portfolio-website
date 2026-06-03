import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('boot'); // boot, loading, ready

  useEffect(() => {
    // Check if already booted in this session to bypass sequence
    if (sessionStorage.getItem('shakthios_booted') === 'true') {
      setPhase('ready');
      onComplete();
      return;
    }

    // Boot text phase
    const bootTimer = setTimeout(() => setPhase('loading'), 800);
    return () => clearTimeout(bootTimer);
  }, [onComplete]);

  useEffect(() => {
    if (phase !== 'loading') return;

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('shakthios_booted', 'true');
          setTimeout(() => {
            setPhase('ready');
            setTimeout(onComplete, 400);
          }, 300);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'ready' ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#FFFBF2' }}
        >
          {/* Skip Boot Quick Bypass */}
          <button
            onClick={() => {
              sessionStorage.setItem('shakthios_booted', 'true');
              setPhase('ready');
              onComplete();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 px-2.5 py-1 border-2 border-[#AEC6CF] bg-[#FFFBF2] hover:bg-[#E6E6FA] font-pixel text-[6.5px] text-[#2D3436] transition-all select-none z-[120]"
            style={{ boxShadow: '2px 2px 0 rgba(174,198,207,0.3)' }}
          >
            [ FAST BOOT / SKIP ]
          </button>
          {/* Pixel logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="w-16 h-16 relative mx-auto mb-4">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4" style={{ imageRendering: 'pixelated' }}>
                <div className="col-start-2 col-span-2 row-start-1 bg-[#B19CD9]" />
                <div className="col-start-1 col-span-4 row-start-2 bg-[#B19CD9]" />
                <div className="col-start-1 col-span-4 row-start-3 bg-[#FFD1DC]" />
                <div className="col-start-2 col-span-2 row-start-4 bg-[#FFD1DC]" />
              </div>
            </div>
            <h1 className="font-pixel text-sm md:text-base text-[#2D3436] text-center">
              SHAKTHI OS
            </h1>
          </motion.div>

          {/* Boot messages */}
          {phase === 'boot' && (
            <div className="font-mono-retro text-xs text-[#2D3436]/60 text-center space-y-1">
              <p>Initializing neural cores...</p>
            </div>
          )}

          {/* Progress bar */}
          {phase === 'loading' && (
            <div className="w-48 md:w-64">
              <div
                className="h-3 w-full"
                style={{
                  background: '#E6E6FA',
                  border: '2px solid #AEC6CF',
                }}
              >
                <motion.div
                  className="h-full"
                  style={{ background: '#B19CD9' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: 'linear', duration: 0.1 }}
                />
              </div>
              <p className="font-mono-retro text-xs text-[#2D3436]/50 text-center mt-2">
                Loading modules... {Math.min(Math.round(progress), 100)}%
              </p>
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
