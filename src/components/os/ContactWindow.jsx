import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Mail, Linkedin, Phone, User, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useDragConstraints from '@/hooks/use-drag-constraints';

export default function ContactWindow({ visible, onClose }) {
  const [minimized, setMinimized] = useState(false);
  const { toast } = useToast();
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

  // Auto-maximize window when selected from bottom dock
  useEffect(() => {
    if (visible) {
      setMinimized(false);
    }
  }, [visible]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Simulated transmission states
  const [uplinkState, setUplinkState] = useState('idle'); // 'idle' | 'transmitting' | 'success'
  const [uplinkProgress, setUplinkProgress] = useState(0);
  const [uplinkLogs, setUplinkLogs] = useState([]);

  const handleSendUplink = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "CONNECTION FAULT",
        description: "Please fill out all terminal data fields before uplinking.",
        variant: "destructive"
      });
      return;
    }

    setUplinkState('transmitting');
    setUplinkProgress(0);
    setUplinkLogs([]);

    const logsList = [
      `[SYS] Initializing SMTP gateway client connection...`,
      `[DNS] Resolving target: shakthisivaprakash.s09@gmail.com... OK`,
      `[PACK] Encrypting message body using RSA-2048...`,
      `[LINK] Sending payload through ShakthiOS Comms Node...`,
      `[BUFF] Flushing output stream buffers...`,
      `[SUCCESS] Uplink verified. Code 200: OK.`
    ];

    setUplinkLogs([logsList[0]]);

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      setUplinkProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUplinkState('success');
          setUplinkLogs(logsList);
          
          toast({
            title: "UPLINK SUCCESSFUL",
            description: `Thank you ${name}! Your message has been sent to Shakthi.`,
          });
          return 100;
        }

        const nextProgress = prev + 10;
        const logStep = Math.floor(nextProgress / 20);
        
        if (logStep > currentLogIndex && logStep < logsList.length) {
          setUplinkLogs(prevLogs => [...prevLogs, logsList[logStep]]);
          currentLogIndex = logStep;
        }

        return nextProgress;
      });
    }, 120);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setUplinkState('idle');
    setUplinkProgress(0);
    setUplinkLogs([]);
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
          className="fixed z-30"
          style={{
            top: 'clamp(56px, 12vh, 110px)',
            left: isMobile ? '4%' : 'calc(50% - 250px)',
            width: isMobile ? '92%' : '500px',
            maxHeight: 'calc(100vh - 100px)',
            touchAction: 'pan-y'
          }}
        >
          <div
            className="flex flex-col overflow-hidden crt-screen"
            style={{
              background: '#0a0507', // Dark rose tint background
              border: '3px solid #FFD1DC',
              boxShadow: `
                0 0 20px rgba(255, 209, 220, 0.4),
                inset 0 0 20px rgba(255, 209, 220, 0.15)
              `,
              color: '#FFD1DC',
              position: 'relative',
              maxHeight: 'inherit'
            }}
          >
            {/* Style block for CRT & scrollbars */}
            <style>{`
              @keyframes comms-scanline {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
              }
              .scanline-bar-comms {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 6px;
                background: rgba(255, 209, 220, 0.12);
                z-index: 100;
                pointer-events: none;
                animation: comms-scanline 5s linear infinite;
              }
              .input-pixel-comms {
                background: rgba(255, 209, 220, 0.05);
                border: 2px solid rgba(255, 209, 220, 0.3);
                color: white;
                outline: none;
                font-family: monospace;
              }
              .input-pixel-comms:focus {
                border-color: #FFD1DC;
                background: rgba(255, 209, 220, 0.1);
                box-shadow: 0 0 5px rgba(255, 209, 220, 0.4);
              }
            `}</style>

            {/* CRT scanline sweep */}
            <div className="scanline-bar-comms" />

            {/* Title Bar */}
            <div
              className="flex items-center justify-between px-2 py-1 flex-shrink-0 border-b-2 z-10 select-none"
              style={{
                borderColor: '#FFD1DC',
                background: 'rgba(255, 209, 220, 0.1)',
                cursor: !isMobile ? 'grab' : 'default',
                touchAction: 'none'
              }}
              onPointerDown={(e) => {
                if (!isMobile) dragControls.start(e);
              }}
            >
              {/* Controls */}
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
              <span className="font-pixel text-[6px] text-[#FFD1DC] tracking-wider drop-shadow-sm flex items-center gap-1">
                <span>💬</span> comms_uplink_terminal.sh
              </span>
              <div className="w-12" />
            </div>

            {/* Console Viewport */}
            <div 
              className="relative overflow-y-auto terminal-custom-scrollbar z-10" 
              style={{ maxHeight: 'calc(100vh - 160px)', minHeight: 'min(380px, 50vh)' }}
            >
              <div className="p-4 space-y-4">
                
                {/* AI System Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border border-[#FFD1DC]/30 p-2.5 bg-[#FFD1DC]/5 font-pixel text-[6px] tracking-wider">
                  <div className="flex items-center gap-1.5 text-[#B2F2BB]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B2F2BB] animate-ping" />
                    <span>UPLINK: LIVE</span>
                  </div>
                  <div className="text-[#FFD1DC] flex items-center gap-1">
                    <span>📡 BANDWIDTH: 1.2 GBPS</span>
                  </div>
                  <div className="text-[#B19CD9] flex items-center gap-1">
                    <span>🧬 SECURE: SSL-RSA</span>
                  </div>
                  <div className="text-[#FFEAA7] flex items-center gap-1">
                    <span>📊 ADDR: PORT 465</span>
                  </div>
                </div>

                {/* Main Content splits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left Column: Direct contact info & Buttons */}
                  <div className="space-y-3">
                    <span className="font-pixel text-[6px] text-slate-400 block tracking-wider">
                      [ TARGET SPECIFICATIONS ]
                    </span>

                    <div className="border border-[#FFD1DC]/20 bg-[#FFD1DC]/5 p-3 space-y-2.5 font-mono-retro">
                      <div className="border-b border-[#FFD1DC]/10 pb-1.5 flex items-center gap-2">
                        <User size={13} className="text-[#FFD1DC]" />
                        <div className="flex-1">
                          <span className="font-pixel text-[4.5px] text-slate-500 block uppercase">NAME</span>
                          <span className="text-white font-bold text-[12px]">Shakthi Sivaprakash S</span>
                        </div>
                      </div>

                      <div className="border-b border-[#FFD1DC]/10 pb-1.5 flex items-center gap-2">
                        <Mail size={13} className="text-[#FFD1DC]" />
                        <div className="flex-1">
                          <span className="font-pixel text-[4.5px] text-slate-500 block uppercase">EMAIL GATEWAY</span>
                          <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=shakthisivaprakash.s09@gmail.com&su=Portfolio%20Inquiry"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.preventDefault();
                              const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=shakthisivaprakash.s09@gmail.com&su=Portfolio%20Inquiry";
                              const mailtoUrl = "mailto:shakthisivaprakash.s09@gmail.com?subject=Portfolio%20Inquiry";
                              try {
                                const newWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
                                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                                  window.location.href = mailtoUrl;
                                }
                              } catch (err) {
                                window.location.href = mailtoUrl;
                              }
                            }}
                            className="text-white hover:text-[#FFD1DC] text-[11px] truncate block transition-colors duration-150 cursor-pointer"
                          >
                            shakthisivaprakash.s09@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="border-b border-[#FFD1DC]/10 pb-1.5 flex items-center gap-2">
                        <Phone size={13} className="text-[#FFD1DC]" />
                        <div className="flex-1">
                          <span className="font-pixel text-[4.5px] text-slate-500 block uppercase">CELLULAR ROUTE</span>
                          <a
                            href="tel:+919342919614"
                            className="text-white hover:text-[#FFD1DC] text-[11px] block transition-colors duration-150 cursor-pointer"
                          >
                            +91 9342919614
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Linkedin size={13} className="text-[#FFD1DC]" />
                        <div className="flex-1">
                          <span className="font-pixel text-[4.5px] text-slate-500 block uppercase">LINKEDIN PROFILE</span>
                          <a
                            href="https://linkedin.com/in/shakthi-siva"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#FFD1DC] text-[11px] block transition-colors duration-150 cursor-pointer"
                          >
                            linkedin.com/in/shakthi-siva
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Direct Launch buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* Email Button */}
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=shakthisivaprakash.s09@gmail.com&su=Portfolio%20Inquiry"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=shakthisivaprakash.s09@gmail.com&su=Portfolio%20Inquiry";
                          const mailtoUrl = "mailto:shakthisivaprakash.s09@gmail.com?subject=Portfolio%20Inquiry";
                          try {
                            const newWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
                            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                              window.location.href = mailtoUrl;
                            }
                          } catch (err) {
                            window.location.href = mailtoUrl;
                          }
                        }}
                        className="py-1.5 font-pixel text-[6px] text-center border-2 border-[#FFD1DC] bg-transparent text-[#FFD1DC] hover:bg-[#FFD1DC]/10 uppercase transition-all tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                        style={{ boxShadow: '2px 2px 0 rgba(255,209,220,0.2)' }}
                      >
                        <Mail size={10} />
                        DIRECT EMAIL
                      </a>

                      {/* LinkedIn Button */}
                      <a
                        href="https://linkedin.com/in/shakthi-siva"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 font-pixel text-[6px] text-center border-2 border-[#FFD1DC] bg-transparent text-[#FFD1DC] hover:bg-[#FFD1DC]/10 uppercase transition-all tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                        style={{ boxShadow: '2px 2px 0 rgba(255,209,220,0.2)' }}
                      >
                        <Linkedin size={10} />
                        LINKEDIN APPR
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Contact form Terminal */}
                  <div className="space-y-3">
                    <span className="font-pixel text-[6px] text-slate-400 block tracking-wider">
                      [ MESSAGE TRANSMISSION MATRIX ]
                    </span>

                    {uplinkState === 'idle' && (
                      <form onSubmit={handleSendUplink} className="space-y-2">
                        {/* Name input */}
                        <div className="flex flex-col gap-1">
                          <label className="font-pixel text-[5px] text-slate-400 uppercase">SENDER NAME:</label>
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="GUEST_DEVELOPER"
                            className="input-pixel-comms px-2 py-1 font-mono-retro text-[11px]"
                          />
                        </div>

                        {/* Email input */}
                        <div className="flex flex-col gap-1">
                          <label className="font-pixel text-[5px] text-slate-400 uppercase">RETURN GATEWAY:</label>
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your_node@domain.com"
                            className="input-pixel-comms px-2 py-1 font-mono-retro text-[11px]"
                          />
                        </div>

                        {/* Message body */}
                        <div className="flex flex-col gap-1">
                          <label className="font-pixel text-[5px] text-slate-400 uppercase">MESSAGE BODY:</label>
                          <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            placeholder="Type connection request details..."
                            className="input-pixel-comms px-2 py-1 font-mono-retro text-[11px] resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-1.5 font-pixel text-[6.5px] bg-[#FF9B9B] hover:bg-[#FFB1B1] text-black font-bold uppercase transition-all tracking-wider flex items-center justify-center gap-1.5"
                          style={{ boxShadow: '2px 2px 0 rgba(255,155,155,0.3)' }}
                        >
                          <Send size={10} />
                          SEND UPLINK CONNECTION
                        </button>
                      </form>
                    )}

                    {/* Transmitting Loader */}
                    {uplinkState === 'transmitting' && (
                      <div className="border border-[#FFD1DC]/30 bg-[#FFD1DC]/5 p-3 flex flex-col gap-2 min-h-[220px] justify-center items-center">
                        <div className="font-pixel text-[6px] text-[#FFD1DC] animate-pulse">
                          📡 ESTABLISHING UPLINK PAYLOAD STREAM
                        </div>
                        
                        {/* Loading progress bar */}
                        <div className="w-full max-w-[200px]">
                          <div className="flex justify-between font-pixel text-[4px] text-slate-400 mb-0.5">
                            <span>UPLINK LOAD</span>
                            <span>{uplinkProgress}%</span>
                          </div>
                          <div className="border border-[#FFD1DC] p-0.5 bg-black">
                            <div 
                              className="h-1 bg-[#FF9B9B]"
                              style={{ width: `${uplinkProgress}%`, transition: 'width 0.1s linear' }}
                            />
                          </div>
                        </div>

                        {/* Live compiling console logs */}
                        <div className="w-full bg-black/60 p-2 font-mono-retro text-[9px] text-[#B2F2BB] h-20 overflow-y-auto terminal-custom-scrollbar border border-[#FFD1DC]/20 text-left">
                          {uplinkLogs.map((log, index) => (
                            <div key={index} className="opacity-95 leading-normal truncate">
                              {log}
                            </div>
                          ))}
                          <div className="flex items-center gap-1 text-[#FFD1DC]">
                            <span>🧬 FLUSHING SOCKET_CHANNELS...</span>
                            <span className="w-1 h-3 bg-[#FFD1DC] animate-pulse" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Success Screen */}
                    {uplinkState === 'success' && (
                      <div className="border-2 border-[#B2F2BB] bg-[#B2F2BB]/5 p-4 flex flex-col items-center justify-center text-center gap-3 min-h-[220px]">
                        <div 
                          className="w-12 h-12 rounded-full bg-[#B2F2BB]/10 border-2 border-[#B2F2BB] flex items-center justify-center text-white"
                          style={{ boxShadow: '0 0 8px rgba(178, 242, 187, 0.4)' }}
                        >
                          <CheckCircle2 size={24} className="text-[#B2F2BB]" />
                        </div>
                        <span className="font-pixel text-[8px] text-[#B2F2BB] uppercase tracking-wider block">
                          UPLINK SUCCESSFUL
                        </span>
                        <span className="font-mono-retro text-[10px] text-slate-300 max-w-[200px] block leading-normal">
                          Shakthi Sivaprakash S has received your transmission sequence.
                        </span>
                        <button
                          onClick={handleResetForm}
                          className="px-3 py-1 font-pixel text-[6px] border border-[#B2F2BB] text-[#B2F2BB] hover:bg-[#B2F2BB]/10 uppercase transition-all"
                        >
                          SEND ANOTHER UPLINK
                        </button>
                      </div>
                    )}

                  </div>
                </div>

                {/* Prompt block */}
                <div className="pt-2 flex items-center gap-2 font-mono-retro border-t border-[#FFD1DC]/20 text-slate-400">
                  <span>guest@shakthi-os:~$</span>
                  <span className="text-white uppercase">ping -c 3 portfolio-host</span>
                  <span className="w-1.5 h-3 bg-white animate-pulse" />
                </div>
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
          className="fixed bottom-16 right-24 z-30 px-3 py-1 font-pixel text-[7px] text-white"
          style={{
            background: 'linear-gradient(90deg, #FF9B9B, #FFD1DC)',
            border: '2px solid #FFD1DC',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.1)'
          }}
        >
          comms_uplink_terminal.sh
        </motion.button>
      )}
    </AnimatePresence>
  );
}
