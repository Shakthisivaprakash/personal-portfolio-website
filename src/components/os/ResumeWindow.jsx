import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import useDragConstraints from '@/hooks/use-drag-constraints';

export default function ResumeWindow({ visible, onClose, onOpenProject }) {
  const [minimized, setMinimized] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isMobile, setIsMobile] = useState(false);
  const dragControls = useDragControls();
  const { windowRef, constraints } = useDragConstraints(visible, minimized);

  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const scrollContainerRef = useRef(null);

  const closeButtonRef = useRef(null);
  const exitFocusButtonRef = useRef(null);
  const pdfObjectRef = useRef(null);

  // Auto-maximize window when selected from bottom dock
  useEffect(() => {
    if (visible) {
      setMinimized(false);
    }
  }, [visible]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Restore keyboard focus automatically after closing the PDF viewer
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      const resumeDockItem = document.getElementById('dock-item-resume');
      if (resumeDockItem) {
        resumeDockItem.focus();
      }
    }
  }, [visible]);

  // Support ESC key to exit PDF focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && visible) {
        if (
          document.activeElement === pdfObjectRef.current || 
          document.activeElement.tagName === 'OBJECT' || 
          document.activeElement.tagName === 'IFRAME'
        ) {
          pdfObjectRef.current?.blur();
          closeButtonRef.current?.focus();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, onClose]);

  const handleDownloadResume = () => {
    const pdfUrl = '/resume.pdf';
    const element = document.createElement("a");
    element.href = pdfUrl;
    element.download = "Shakthi_Resume.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const scrollToPage = (pageNum) => {
    const container = scrollContainerRef.current;
    const target = pageNum === 1 ? page1Ref.current : page2Ref.current;
    if (container && target) {
      container.scrollTo({
        top: target.offsetTop - 16, // offset for padding
        behavior: 'smooth'
      });
      setActivePage(pageNum);
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    const page2 = page2Ref.current;
    if (container && page2) {
      const containerScrollTop = container.scrollTop;
      const page2Top = page2.offsetTop;
      // Scroll past halfway to page 2 updates the active page indicator
      if (containerScrollTop >= page2Top - container.clientHeight / 2) {
        setActivePage(2);
      } else {
        setActivePage(1);
      }
    }
  };

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
          className="fixed z-30 flex flex-col"
          style={{
            top: 'clamp(56px, 10vh, 100px)',
            left: isMobile ? '4%' : 'calc(50% - 270px)',
            width: isMobile ? '92%' : '540px',
            height: isMobile ? '70vh' : '620px',
            maxHeight: 'calc(100vh - 100px)',
            touchAction: 'pan-y'
          }}
        >
          <div
            className="flex flex-col flex-1 overflow-hidden crt-screen"
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
                background: 'linear-gradient(90deg, #E6E6FA 0%, #AEC6CF 100%)',
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
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="w-3 h-3 bg-[#FF9B9B] hover:brightness-90 transition-all focus:outline-none focus:ring-1 focus:ring-black"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  aria-label="Close Resume Window"
                />
                <button
                  onClick={() => setMinimized(true)}
                  className="w-3 h-3 bg-[#FFEAA7] hover:brightness-90 transition-all focus:outline-none"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  aria-label="Minimize Resume Window"
                />
                <button
                  className="w-3 h-3 bg-[#B2F2BB] hover:brightness-90 transition-all focus:outline-none"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  aria-label="Maximize Resume Window"
                />
              </div>
              <span className="font-pixel text-[7px] text-[#2D3436]/80 tracking-wider drop-shadow-sm flex items-center gap-1">
                📄 resume_reader.exe
              </span>
              <div className="w-12" />
            </div>

            {/* Document Viewer Control Bar */}
            <div 
              className="flex items-center justify-between px-3 py-1.5 border-b border-[#AEC6CF]/30 bg-slate-100 flex-shrink-0 font-pixel text-[6px]"
              style={{ background: '#f1f2f6' }}
            >
              {isMobile ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => setZoomLevel(prev => Math.max(75, prev - 25))}
                      className="px-1.5 py-0.5 border border-slate-400 bg-white hover:bg-slate-200 font-bold text-slate-700"
                    >
                      ZOOM -
                    </button>
                    <span className="text-slate-500 font-bold">{zoomLevel}%</span>
                    <button 
                      onClick={() => setZoomLevel(prev => Math.min(150, prev + 25))}
                      className="px-1.5 py-0.5 border border-slate-400 bg-white hover:bg-slate-200 font-bold text-slate-700"
                    >
                      ZOOM +
                    </button>
                  </div>

                  {/* Page Select Toggles */}
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 mr-1 font-bold">PAGE:</span>
                    <button 
                      onClick={() => scrollToPage(1)}
                      className={`px-2 py-0.5 border ${
                        activePage === 1 
                          ? 'bg-[#AEC6CF] border-[#AEC6CF] text-white font-bold' 
                          : 'bg-white border-slate-400 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      1
                    </button>
                    <button 
                      onClick={() => scrollToPage(2)}
                      className={`px-2 py-0.5 border ${
                        activePage === 2 
                          ? 'bg-[#AEC6CF] border-[#AEC6CF] text-white font-bold' 
                          : 'bg-white border-slate-400 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      2
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-bold font-pixel mr-2">PDF VIEWER ACTIVE</span>
                  <button 
                    ref={exitFocusButtonRef}
                    onClick={() => {
                      if (document.activeElement.tagName === 'OBJECT' || document.activeElement.tagName === 'IFRAME') {
                        document.activeElement.blur();
                      }
                      closeButtonRef.current?.focus();
                    }}
                    className="px-1.5 py-0.5 border border-slate-400 bg-white hover:bg-slate-200 text-slate-700 font-bold uppercase transition-all"
                  >
                    🔓 Exit PDF Focus
                  </button>
                  <button 
                    onClick={onClose}
                    className="px-1.5 py-0.5 border border-slate-400 bg-white hover:bg-slate-200 text-slate-700 font-bold uppercase transition-all"
                  >
                    🚪 Return to Desktop
                  </button>
                </div>
              )}

              {/* Download Resume Action */}
              <button 
                onClick={handleDownloadResume}
                className="px-2 py-0.5 border-2 border-slate-800 bg-[#B2F2BB] hover:brightness-95 text-[#2D3436] font-bold"
                style={{ boxShadow: '1px 1px 0 rgba(0,0,0,0.15)' }}
              >
                💾 DOWNLOAD
              </button>
            </div>

            {/* Embedded Native PDF Viewer / High-Fidelity Mobile Fallback Viewport */}
            <div className="flex-1 min-h-0 bg-[#dfe4ea] relative">
              <object
                ref={pdfObjectRef}
                data="/resume.pdf"
                type="application/pdf"
                className="w-full h-full"
                style={{ border: 'none', display: 'block' }}
                tabIndex="-1"
              >
                {/* Mobile Fallback: High-Fidelity Pages Scrollable Layout */}
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="w-full h-full overflow-y-auto p-4 flex flex-col gap-4 items-center terminal-custom-scrollbar"
                >
                  <div 
                    ref={page1Ref}
                    className="mx-auto bg-white shadow-md border-2 border-[#AEC6CF]/30 relative transition-all duration-200 flex-shrink-0"
                    style={{ 
                      width: `${zoomLevel}%`, 
                      maxWidth: `${(zoomLevel / 100) * 420}px`,
                      background: '#FFFBF2'
                    }}
                  >
                    <img
                      src="/resume_page_1.png"
                      alt="Shakthi Resume Page 1"
                      className="w-full h-auto block select-none pointer-events-none"
                    />
                  </div>
                  <div 
                    ref={page2Ref}
                    className="mx-auto bg-white shadow-md border-2 border-[#AEC6CF]/30 relative transition-all duration-200 flex-shrink-0"
                    style={{ 
                      width: `${zoomLevel}%`, 
                      maxWidth: `${(zoomLevel / 100) * 420}px`,
                      background: '#FFFBF2'
                    }}
                  >
                    <img
                      src="/resume_page_2.png"
                      alt="Shakthi Resume Page 2"
                      className="w-full h-auto block select-none pointer-events-none"
                    />
                  </div>
                </div>
              </object>
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
          className="fixed bottom-16 right-36 z-30 px-3 py-1 font-pixel text-[7px] text-white"
          style={{
            background: 'linear-gradient(90deg, #E6E6FA, #AEC6CF)',
            border: '2px solid #AEC6CF',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.1)'
          }}
        >
          shakthi_resume.pdf
        </motion.button>
      )}
    </AnimatePresence>
  );
}

