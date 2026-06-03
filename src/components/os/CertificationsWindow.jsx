import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import useDragConstraints from '@/hooks/use-drag-constraints';

const CERTS_DATA = [
  {
    id: 'tata',
    title: 'Data Visualisation: Empowering Business with Effective Insights',
    issuer: 'Tata Group × Forage',
    date: 'January 25, 2025',
    credentialId: 'SWPpDFtYxmYcxwBpe | mGHL4pYoRbC3PpqDn',
    skills: 'Data Visualisation, Business Insights, Dashboard Engineering',
    certificateImage: '/cert_tata.jpg',
    color: '#FFEAA7', // Gold
    badgeEmoji: '🏆',
    description: 'Practiced framing business scenarios, choosing correct visual paradigms, and generating diagnostic insights for Tata Group executives.'
  },
  {
    id: 'jpmorgan',
    title: 'JPMorgan Chase Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase & Co. × Forage',
    date: 'July 31, 2025',
    credentialId: 'qXtbFJEekAKWj7Q2A | mGHL4pYoRbC3PpqDn',
    skills: 'React, TypeScript, Python, Perspective Data Feeds, Git',
    certificateImage: '/cert_jpmorgan.jpg',
    color: '#B19CD9', // Silver/Lavender
    badgeEmoji: '💎',
    description: 'Built dynamic financial data feeds and visual area charting systems inside React using Perspective dashboard frameworks for banking terminals.'
  },
  {
    id: 'aws',
    title: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'June 8, 2023',
    credentialId: 'AWS-ACADEMY-CF-2023',
    skills: 'Cloud Computing, AWS S3, EC2, IAM, SQLite Integration',
    certificateImage: '/cert_aws.png',
    color: '#74b9ff', // Cloud Blue
    badgeEmoji: '☁️',
    description: 'Acquired core competencies in cloud architecture, security services, database scaling, IAM policies, and serverless compute frameworks.'
  },
  {
    id: 'iit',
    title: 'Market Research & Analysis (Stock Marketing)',
    issuer: 'Teachnook / Wiissenaire IIT Bhubaneswar',
    date: 'November 11, 2023',
    credentialId: 'TNINTC23-10526',
    skills: 'Stock Marketing, Diagnostic Analysis, Trend Forecasting',
    certificateImage: '/cert_iit.jpg',
    color: '#FF9B9B', // Bronze
    badgeEmoji: '📈',
    description: 'Completed comprehensive course requirements in stock market evaluation, predictive indicators, asset pricing model analytics, and trader diagnostics.'
  },
  {
    id: 'html',
    title: 'Web Development HTML & CSS',
    issuer: 'CCBP 4.0 NXT Wave Academy',
    date: 'January 29, 2023',
    credentialId: 'CCBP-STATIC-PGKEMPRYLE',
    skills: 'HTML5, CSS3, Bootstrap, Static Document Architecture',
    certificateImage: '/cert_html.png', // CCBP static web image file
    color: '#FFEAA7', // Gold
    badgeEmoji: '✨',
    description: 'Successfully completed the comprehensive static website design program, building standards-compliant documents, animations, and custom styling.'
  },
  {
    id: 'gradtwin',
    title: 'Machine Learning Internship Experience Certificate',
    issuer: 'Gradtwin Services',
    date: 'February 2026 – May 2026',
    credentialId: 'GT-ML-INT-2026',
    skills: 'Machine Learning, Data Analysis, Data Preprocessing, Feature Engineering, Model Evaluation, AI Problem Solving, Python Programming',
    certificateImage: '/cert_gradtwin.png',
    color: '#B2F2BB', // Pastel Green
    badgeEmoji: '🎓',
    description: 'Successfully completed a Machine Learning Internship at Gradtwin Services. Worked on machine learning concepts, analytical workflows, data preprocessing, model understanding, and AI problem-solving approaches. Demonstrated professionalism, dedication, and strong performance throughout the internship period.'
  },
  {
    id: 'hackathon',
    title: 'Dog vs Cat Image Classification using CNN',
    issuer: 'Hackathon Competition',
    date: 'May 20, 2023',
    credentialId: 'SVCT-HACK-2023-WIN',
    skills: 'Deep Learning, CNN Architecture, Image Classification, Computer Vision, Model Training, Model Evaluation, Python, TensorFlow / Keras',
    certificateImage: '/cert_hackathon.png',
    color: '#D8B4FE', // Premium Lavender/Purple
    badgeEmoji: '🧠',
    description: 'Developed a Convolutional Neural Network (CNN) model for binary image classification between dogs and cats. Performed image preprocessing, dataset preparation, feature extraction, model training, validation, and performance evaluation. Implemented multiple convolutional and pooling layers to learn image patterns and improve classification accuracy. Successfully achieved approximately 90% model accuracy on validation/testing data while maintaining reliable prediction performance. Demonstrated practical skills in Deep Learning, Computer Vision, CNN architecture design, and model optimization.'
  }
];

export default function CertificationsWindow({ visible, onClose, onOpenProject }) {
  const [minimized, setMinimized] = useState(false);
  const [selectedCert, setSelectedCert] = useState(CERTS_DATA[0]);
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
            left: isMobile ? '4%' : 'calc(50% - 270px)',
            width: isMobile ? '92%' : '540px',
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
                background: 'linear-gradient(90deg, #FF9B9B 0%, #B19CD9 100%)',
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
                🏆 certifications_cabinet.exe
              </span>
              <div className="w-12" />
            </div>

            {/* Window Content */}
            <div className="overflow-y-auto flex-1 terminal-custom-scrollbar" style={{ maxHeight: 'calc(100vh - 160px)' }}>
              <div className="p-4 space-y-4">
                
                {/* Visual Badges Cabinet Shelf */}
                <div className="space-y-2">
                  <span className="font-pixel text-[6px] text-slate-400 block tracking-wider">
                    [ VERIFIED ACHIEVEMENT CABINET ]
                  </span>
                  
                  {/* Velvet Shelf Cabinet Grid */}
                  <div 
                    className="border-2 p-3 grid grid-cols-7 gap-2 relative overflow-hidden"
                    style={{
                      background: '#121222', // Dark velvet back
                      borderColor: '#AEC6CF',
                      boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6)'
                    }}
                  >
                    {/* Shelf horizontal pixel bars */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#8e44ad]/30" />
                    
                    {CERTS_DATA.map((cert) => {
                      const isSelected = selectedCert?.id === cert.id;
                      return (
                        <motion.button
                          key={cert.id}
                          onClick={() => setSelectedCert(cert)}
                          whileHover={{ y: -5 }}
                          className="flex flex-col items-center justify-center aspect-square relative group"
                        >
                          {/* Sparkle Glow ring */}
                          {isSelected && (
                            <div 
                              className="absolute inset-0 rounded-full animate-ping opacity-25"
                              style={{ background: cert.color }}
                            />
                          )}

                          {/* Collectible Badge Ring */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg relative transition-all duration-150"
                            style={{
                              background: isSelected ? cert.color : '#2d3436',
                              border: `2px solid ${cert.color}`,
                              boxShadow: isSelected 
                                ? `0 0 8px ${cert.color}` 
                                : `inset -1px -1px 0 rgba(0,0,0,0.4), inset 1px 1px 0 rgba(255,255,255,0.1)`
                            }}
                          >
                            <span>{cert.badgeEmoji}</span>
                            
                            {/* Tiny ribbon tails */}
                            {isSelected && (
                              <div className="absolute -bottom-1 flex gap-0.5">
                                <div className="w-1.5 h-3 bg-[#e74c3c]" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />
                                <div className="w-1.5 h-3 bg-[#e74c3c]" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />
                              </div>
                            )}
                          </div>

                          <span className="font-pixel text-[4px] text-center mt-1.5 truncate w-full text-slate-300 group-hover:text-white">
                            {cert.issuer}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Credential Inspector & Picture Viewer */}
                {selectedCert && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Left Column: Achievement Badge details */}
                    <div className="space-y-3">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        📂 BADGE_SPECIFICATION
                      </span>

                      <div 
                        className="border-2 p-3 bg-[#121222] space-y-2.5"
                        style={{
                          borderColor: selectedCert.color,
                          boxShadow: `inset 0 0 10px ${selectedCert.color}15`
                        }}
                      >
                        <div>
                          <span className="font-pixel text-[5px] text-[#8a9ca7] font-bold block uppercase">CREDENTIAL NAME</span>
                          <span className="font-pixel text-[8px] text-white font-bold leading-tight block">
                            {selectedCert.title}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 border-t border-[#AEC6CF]/10 pt-2 font-pixel text-[5.5px]">
                          <div>
                            <span className="text-[#8a9ca7] font-bold block uppercase">ISSUER</span>
                            <span className="text-[#B2F2BB] font-bold">{selectedCert.issuer}</span>
                          </div>
                          <div>
                            <span className="text-[#8a9ca7] font-bold block uppercase">DATE ISSUED</span>
                            <span className="text-white">{selectedCert.date}</span>
                          </div>
                        </div>

                        <div className="border-t border-[#AEC6CF]/10 pt-2 font-pixel text-[5.5px]">
                          <span className="text-[#8a9ca7] font-bold block uppercase">KEY ATTRIBUTES</span>
                          <span className="text-[#FFFBF2] font-mono-retro text-[10px] leading-tight block mt-0.5">
                            {selectedCert.skills}
                          </span>
                        </div>

                        <div className="border-t border-[#AEC6CF]/10 pt-2 font-pixel text-[5.5px]">
                          <span className="text-[#8a9ca7] font-bold block uppercase">PROCESS OVERVIEW</span>
                          <p className="text-[#eef2f5] font-mono-retro text-[10px] leading-relaxed block mt-0.5">
                            {selectedCert.description}
                          </p>
                        </div>

                        {selectedCert.id === 'hackathon' && (
                          <div 
                            className="border-2 border-dashed p-2 mt-2 space-y-1.5 font-pixel text-[5.5px]"
                            style={{
                              borderColor: '#B2F2BB',
                              background: 'rgba(178, 242, 187, 0.05)'
                            }}
                          >
                            <span className="text-[#B2F2BB] font-bold block text-[6.5px] tracking-wide">
                              🏆 HACKATHON PROJECT ACHIEVEMENT
                            </span>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono-retro text-[9px] text-slate-300">
                              <div>
                                <span className="text-slate-500 font-pixel text-[5px] block">PROJECT</span>
                                <span className="text-white font-bold">Dog vs Cat Classification</span>
                              </div>
                              <div>
                                <span className="text-slate-500 font-pixel text-[5px] block">MODEL</span>
                                <span className="text-white font-bold">CNN Architecture</span>
                              </div>
                              <div>
                                <span className="text-slate-500 font-pixel text-[5px] block">ACCURACY</span>
                                <span className="text-[#B2F2BB] font-bold">90%</span>
                              </div>
                              <div>
                                <span className="text-slate-500 font-pixel text-[5px] block">DOMAIN</span>
                                <span className="text-white font-bold">Computer Vision</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center border-t border-[#B2F2BB]/10 pt-1 text-[8px] font-mono-retro">
                              <span className="text-slate-500 font-pixel text-[5px]">STATUS:</span>
                              <span className="px-1 bg-[#B2F2BB]/20 text-[#B2F2BB] border border-[#B2F2BB]/30">
                                SUCCESSFULLY COMPLETED
                              </span>
                            </div>
                          </div>
                        )}

                        {(selectedCert.id === 'gradtwin' || selectedCert.id === 'tata' || selectedCert.id === 'hackathon') && (
                          <div className="border-t border-[#AEC6CF]/10 pt-2 flex justify-end">
                            <button
                              onClick={() => {
                                if (onOpenProject) {
                                  if (selectedCert.id === 'gradtwin') onOpenProject('gradtwin-ml');
                                  else if (selectedCert.id === 'tata') onOpenProject('data-hub');
                                  else if (selectedCert.id === 'hackathon') onOpenProject('vision-lab');
                                  onClose();
                                }
                              }}
                              className="px-2 py-0.5 font-pixel text-[5px] border border-[#B2F2BB] bg-[#B2F2BB]/10 hover:bg-[#B2F2BB]/20 text-[#B2F2BB] transition-all"
                            >
                              [ VIEW CASE STUDY ]
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Visual Document Viewer */}
                    <div className="space-y-3">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        🖼️ CREDENTIAL_IMAGE_VIEWER
                      </span>

                      <div 
                        className="border-2 p-1.5 bg-[#0a0a14] aspect-[4/3] w-full relative overflow-hidden flex items-center justify-center"
                        style={{ borderColor: '#AEC6CF' }}
                      >
                        {selectedCert.certificateImage ? (
                          <div className="w-full h-full relative overflow-hidden flex items-center justify-center border border-[#AEC6CF]/10">
                            {/* Scanning horizontal laser */}
                            <div 
                              className="absolute inset-x-0 h-0.5 bg-[#FF9B9B] shadow-[0_0_8px_#FF9B9B] z-10 pointer-events-none"
                              style={{ animation: 'cv-scanline 5s linear infinite' }}
                            />
                            
                            <img 
                              src={selectedCert.certificateImage} 
                              alt={selectedCert.title}
                              className="w-full h-full object-contain pointer-events-none"
                            />
                          </div>
                        ) : (
                          // Fallback vector badge in case image is missing
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 border border-[#74b9ff]/20 bg-gradient-to-b from-[#0c0c26] to-[#040414] text-center p-3 relative">
                            <div className="absolute w-20 h-20 rounded-full border border-dashed border-[#74b9ff]/30 animate-spin" />
                            <div 
                              className="w-14 h-14 rounded-full bg-[#74b9ff]/10 border-2 border-[#74b9ff] flex items-center justify-center text-2xl z-10"
                              style={{ boxShadow: '0 0 10px rgba(116, 185, 255, 0.4)' }}
                            >
                              {selectedCert.badgeEmoji || '🏆'}
                            </div>
                            <span className="font-pixel text-[6px] text-[#74b9ff] z-10 uppercase tracking-widest mt-1">
                              {selectedCert.issuer}
                            </span>
                            <span className="font-pixel text-[5px] text-[#B2F2BB] z-10 mt-1">
                              [ VERIFIED BADGE ]
                            </span>
                          </div>
                        )}

                        {/* Top corner control dots */}
                        <div className="absolute top-2 right-2 px-1 py-0.5 bg-black/80 border border-[#AEC6CF]/30 font-pixel text-[4px] text-[#B2F2BB]">
                          <span>VERIFIED_CERT_OK</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
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
          className="fixed bottom-16 right-48 z-30 px-3 py-1 font-pixel text-[7px] text-white"
          style={{
            background: 'linear-gradient(90deg, #FF9B9B, #B19CD9)',
            border: '2px solid #AEC6CF',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.1)'
          }}
        >
          certifications_cabinet.exe
        </motion.button>
      )}
    </AnimatePresence>
  );
}
