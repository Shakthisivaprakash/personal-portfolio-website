import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDragConstraints from '@/hooks/use-drag-constraints';
import BootScreen from '@/components/os/BootScreen';
import PixelSky from '@/components/os/PixelSky';
import DesktopArea from '@/components/os/DesktopArea';
import ProjectIcons from '@/components/os/ProjectIcons';
import HomeWindow from '@/components/os/HomeWindow';
import AboutWindow from '@/components/os/AboutWindow';
import ProjectWindow from '@/components/os/ProjectWindow';
import SkillsWindow from '@/components/os/SkillsWindow';
import CertificationsWindow from '@/components/os/CertificationsWindow';
import ResumeWindow from '@/components/os/ResumeWindow';
import ContactWindow from '@/components/os/ContactWindow';
import ProjectsExplorer from '@/components/os/ProjectsExplorer';
import BottomDock from '@/components/os/BottomDock';
import ShakthiCompanion from '@/components/os/ShakthiCompanion';
import { Toaster } from '@/components/ui/toaster';

// Import our new utility windows
import RecruiterWindow from '@/components/os/RecruiterWindow';
import WhyHireWindow from '@/components/os/WhyHireWindow';
import StatsWindow from '@/components/os/StatsWindow';

// Helper component for styled desktop utility icons
function UtilityIcon({ label, emoji, color, onClick, className }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 group w-16 select-none z-20 ${className}`}
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

      {/* Icon box */}
      <div
        className="w-12 h-12 flex items-center justify-center transition-all duration-200"
        style={{
          background: hovered ? color + '44' : color + '1a',
          border: '2.5px solid ' + color,
          boxShadow: hovered 
            ? `4px 4px 0 ${color}77, inset 1px 1px 0 rgba(255,255,255,0.7)` 
            : `2px 2px 0 ${color}33, inset 1px 1px 0 rgba(255,255,255,0.5)`,
        }}
      >
        <span className="text-xl transition-transform duration-300 group-hover:scale-105">
          {emoji}
        </span>
      </div>
      {/* Label */}
      <span
        className="font-pixel text-[5.5px] text-center leading-tight px-1 py-0.5 max-w-[68px] border transition-all duration-150"
        style={{
          background: hovered ? color : 'rgba(255,251,242,0.85)',
          color: '#2D3436',
          borderColor: hovered ? '#2D3436' : 'rgba(174,198,207,0.4)',
          boxShadow: hovered ? '1px 1px 0 rgba(0,0,0,0.15)' : 'none',
          fontWeight: hovered ? 'bold' : 'normal',
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeProject, setActiveProject] = useState(null);
  const { windowRef: achievementsRef, constraints: achievementsConstraints } = useDragConstraints(true, false);
  const { windowRef: profileNoteRef, constraints: profileNoteConstraints } = useDragConstraints(true, false);
  const { windowRef: focusNoteRef, constraints: focusNoteConstraints } = useDragConstraints(true, false);
  const { windowRef: quoteNoteRef, constraints: quoteNoteConstraints } = useDragConstraints(true, false);

  // States for recruiter utility windows
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [whyHireOpen, setWhyHireOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  const handleNavigate = (section) => {
    setActiveSection(section);
    if (section === "contact") {
      window.dispatchEvent(new Event("avatar-wave"));
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative select-none">
      {/* Boot Screen */}
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      {/* Sky Background */}
      <PixelSky />

      {/* Desktop Area */}
      <DesktopArea />

      {/* Main OS Content */}
      {booted && (
        <>
          {/* Project Desktop Icons */}
          <ProjectIcons onOpenProject={setActiveProject} />

          {/* New Utility Icons */}
          <UtilityIcon
            label="Recruiter Mode"
            emoji="🔍"
            color="#B19CD9" // Lavender
            onClick={() => setRecruiterOpen(true)}
            className="fixed top-16 right-4 lg:right-8"
          />

          <UtilityIcon
            label="Why Hire Me"
            emoji="⭐"
            color="#FFEAA7" // Gold
            onClick={() => setWhyHireOpen(true)}
            className="fixed bottom-20 left-4 lg:left-8"
          />

          <UtilityIcon
            label="Career Analytics"
            emoji="📊"
            color="#FF9B9B" // Rose
            onClick={() => setStatsOpen(true)}
            className="fixed bottom-20 right-4 lg:right-8"
          />

          {/* Draggable AI Engineer Sticky Note */}
          <motion.div
            ref={profileNoteRef}
            drag
            dragMomentum={false}
            dragConstraints={profileNoteConstraints}
            className="fixed z-20 p-3 font-pixel select-none cursor-grab active:cursor-grabbing w-[160px] hidden md:block"
            style={{
              top: '90px',
              left: '110px',
              background: '#FFFBF2',
              border: '2.5px solid #2D3436',
              boxShadow: '3px 4px 0 rgba(0,0,0,0.15)',
              transform: 'rotate(-1.5deg)',
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-[#2D3436]/20 pb-1 mb-1.5 text-[6.5px] text-[#2D3436] font-bold">
              <span>📌 AI Engineer</span>
            </div>
            <div className="space-y-1.5 font-mono-retro text-[10px] text-[#2D3436] font-bold">
              <p className="text-[9px] leading-tight">Building intelligent systems with:</p>
              <ul className="space-y-0.5 pl-1.5 text-[9.5px]">
                <li>• Machine Learning</li>
                <li>• Deep Learning</li>
                <li>• Data Analytics</li>
                <li>• Full Stack AI</li>
              </ul>
              <p className="text-[9px] border-t border-[#2D3436]/10 pt-1 mt-1 text-slate-500">
                Available for Opportunities – 2026
              </p>
              <p className="text-right text-[8px] text-[#B19CD9]">— Shakthi</p>
            </div>
          </motion.div>

          {/* Draggable Current Focus Sticky Note */}
          <motion.div
            ref={focusNoteRef}
            drag
            dragMomentum={false}
            dragConstraints={focusNoteConstraints}
            className="fixed z-20 p-3 font-pixel select-none cursor-grab active:cursor-grabbing w-[160px] hidden md:block"
            style={{
              top: '340px',
              left: '110px',
              background: '#FFFBF2',
              border: '2.5px solid #2D3436',
              boxShadow: '3px 4px 0 rgba(0,0,0,0.15)',
              transform: 'rotate(1deg)',
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-[#2D3436]/20 pb-1 mb-1.5 text-[6.5px] text-[#2D3436] font-bold">
              <span>🎯 Current Focus</span>
            </div>
            <ul className="space-y-1 font-mono-retro text-[10px] text-[#2D3436] font-bold">
              <li>• AI Applications</li>
              <li>• LLM Development</li>
              <li>• Machine Learning</li>
              <li>• Data Science</li>
              <li>• Software Engineering</li>
            </ul>
          </motion.div>

          {/* Draggable Achievement Sticky Note */}
          <motion.div
            ref={achievementsRef}
            drag
            dragMomentum={false}
            dragConstraints={achievementsConstraints}
            className="fixed z-20 p-3 font-pixel select-none cursor-grab active:cursor-grabbing w-[170px] hidden md:block"
            style={{
              top: '250px',
              right: '24px',
              background: '#FFFBF2',
              border: '2.5px solid #2D3436',
              boxShadow: '3px 4px 0 rgba(0,0,0,0.15)',
              transform: 'rotate(2deg)',
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-[#2D3436]/20 pb-1 mb-1.5 text-[6.5px] text-[#2D3436] font-bold">
              <span>🏆 Achievements</span>
            </div>
            <ul className="space-y-1.5 font-mono-retro text-[10px] text-[#2D3436] font-bold">
              <li className="flex items-start gap-1">
                <span className="text-emerald-600 select-none">✓</span>
                <span>CGPA: 8.99</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-emerald-600 select-none">✓</span>
                <span>Tata Internship</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-emerald-600 select-none">✓</span>
                <span>Gradtwin ML Internship</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-emerald-600 select-none">✓</span>
                <span>JPMorgan Simulation</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-emerald-600 select-none">✓</span>
                <span>AI Project Portfolio</span>
              </li>
            </ul>
          </motion.div>

          {/* Draggable Favorite Quote Sticky Note */}
          <motion.div
            ref={quoteNoteRef}
            drag
            dragMomentum={false}
            dragConstraints={quoteNoteConstraints}
            className="fixed z-20 p-3 font-pixel select-none cursor-grab active:cursor-grabbing w-[155px] hidden md:block"
            style={{
              bottom: '150px',
              right: '110px',
              background: '#FFFBF2',
              border: '2.5px solid #2D3436',
              boxShadow: '3px 4px 0 rgba(0,0,0,0.15)',
              transform: 'rotate(-2deg)',
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-[#2D3436]/20 pb-1 mb-1.5 text-[6.5px] text-[#2D3436] font-bold">
              <span>💡 Favorite Quote</span>
            </div>
            <p className="font-mono-retro text-[10px] text-[#2D3436] font-bold italic leading-relaxed">
              "Turning data into decisions and ideas into intelligence."
            </p>
          </motion.div>

          {/* Home Window */}
          <HomeWindow visible={activeSection === "home"} />

          {/* About Window */}
          <AboutWindow visible={activeSection === "about"} onClose={() => setActiveSection("home")} />

          {/* Skills Window */}
          <SkillsWindow visible={activeSection === "skills"} onClose={() => setActiveSection("home")} />

          {/* Certifications Window */}
          <CertificationsWindow 
            visible={activeSection === "certifications"} 
            onClose={() => setActiveSection("home")} 
            onOpenProject={setActiveProject}
          />

          {/* Resume Window */}
          <ResumeWindow 
            visible={activeSection === "resume"} 
            onClose={() => setActiveSection("home")} 
            onOpenProject={setActiveProject}
          />

          {/* Contact Window */}
          <ContactWindow visible={activeSection === "contact"} onClose={() => setActiveSection("home")} />

          {/* Projects Explorer Window */}
          <ProjectsExplorer visible={activeSection === "projects"} onClose={() => setActiveSection("home")} onOpenProject={setActiveProject} />

          {/* Active Project Window */}
          {activeProject && (
            <ProjectWindow
              projectId={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}

          {/* New Utility Windows */}
          <RecruiterWindow visible={recruiterOpen} onClose={() => setRecruiterOpen(false)} />
          <WhyHireWindow visible={whyHireOpen} onClose={() => setWhyHireOpen(false)} />
          <StatsWindow visible={statsOpen} onClose={() => setStatsOpen(false)} />

          {/* Pixel Shakthi Companion */}
          <ShakthiCompanion 
            activeSection={activeSection} 
            activeProject={activeProject} 
            isWindowOpen={activeSection !== "home" || activeProject !== null || recruiterOpen || whyHireOpen || statsOpen}
            onNavigate={handleNavigate}
            onOpenProjects={() => handleNavigate('projects')}
          />

          {/* Navigation Bottom Dock */}
          <BottomDock activeSection={activeSection} onNavigate={handleNavigate} />

          {/* Toaster notifications */}
          <Toaster />
        </>
      )}
    </div>
  );
}
