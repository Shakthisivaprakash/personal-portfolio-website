import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import useDragConstraints from '@/hooks/use-drag-constraints';

const SKILLS_DATA = {
  programming: {
    title: 'Programming',
    color: '#FFEAA7', // Yellow tint
    skills: [
      { name: 'Python', icon: '🐍', level: 95, exp: 'EXPERT', log: 'python --version\nPython 3.11.4 (default)\n>>> import sys\n>>> sys.stdout.write("Python interpreter active\\n")' },
      { name: 'HTML', icon: '🌐', level: 90, exp: 'EXPERT', log: 'cat index.html\n<!DOCTYPE html>\n<html>\n<body>HTML5 DOM compiler ready</body>\n</html>' },
      { name: 'CSS', icon: '🎨', level: 88, exp: 'ADVANCED', log: 'cat styles.css\n.skill-card {\n  border: 2px solid var(--primary);\n  box-shadow: active;\n}' }
    ]
  },
  ml: {
    title: 'Machine Learning',
    color: '#00FF66', // Green tint
    skills: [
      { name: 'Machine Learning', icon: '📊', level: 92, exp: 'EXPERT', log: 'from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\nAccuracy: 96.4%' },
      { name: 'Deep Learning', icon: '🧠', level: 90, exp: 'EXPERT', log: 'import torch\nmodel = torch.nn.Sequential(\n  nn.Linear(128, 64),\n  nn.ReLU(),\n  nn.Linear(64, 2)\n)\nSystem: GPU CUDA active' },
      { name: 'CNN', icon: '👁️', level: 88, exp: 'ADVANCED', log: 'from tensorflow.keras import layers\nmodel.add(layers.Conv2D(32, (3, 3), activation="relu"))\nmodel.add(layers.MaxPooling2D((2, 2)))' },
      { name: 'Computer Vision', icon: '📷', level: 85, exp: 'ADVANCED', log: 'import cv2\nimage = cv2.imread("camera_stream.png")\ngray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)\nFeatures detected: 148' },
      { name: 'LLM Integration', icon: '💬', level: 90, exp: 'EXPERT', log: 'import ollama\nstream = ollama.chat(model="llama3", messages=[...])\nReading prompt token-by-token (48.5 tok/s)' }
    ]
  },
  frameworks: {
    title: 'Frameworks',
    color: '#B19CD9', // Lavender tint
    skills: [
      { name: 'TensorFlow', icon: '🔥', level: 85, exp: 'ADVANCED', log: 'import tensorflow as tf\nprint(tf.config.list_physical_devices("GPU"))\nDevices: [PhysicalDevice(name="/physical_device:GPU:0")]' },
      { name: 'Keras', icon: '📦', level: 88, exp: 'ADVANCED', log: 'from tensorflow import keras\nmodel = keras.models.load_model("cnn_scratch_20k.h5")\nModel weights loaded: 2.4M parameters' },
      { name: 'FastAPI', icon: '⚡', level: 90, exp: 'EXPERT', log: 'uvicorn main:app --reload\nINFO:     Uvicorn server running on http://127.0.0.1:8000\nINFO:     Application startup complete.' },
      { name: 'React', icon: '⚛️', level: 88, exp: 'ADVANCED', log: 'npm run dev\nVITE v5.2.0  ready in 234 ms\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose' }
    ]
  },
  analytics: {
    title: 'Analytics',
    color: '#74b9ff', // Blue tint
    skills: [
      { name: 'Power BI', icon: '📈', level: 85, exp: 'ADVANCED', log: 'EVALUATE\nSUMMARIZECOLUMNS(\n  Sales[Category],\n  "Revenue", SUM(Sales[Amount]),\n  "YoY Growth", [YoY Growth %]\n)' },
      { name: 'Tableau', icon: '📊', level: 82, exp: 'ADVANCED', log: 'CONNECT SERVER: Tableau Cloud\nRETRIEVING SOURCE: Tata Group Intern Sales Database\nPUBLISHING INSIGHTS SHEET... OK' },
      { name: 'Statistical Analysis', icon: '📐', level: 88, exp: 'ADVANCED', log: 'from scipy import stats\nt_stat, p_val = stats.ttest_ind(groupA, groupB)\nResult: p_value = 0.0024 (Null Hypothesis rejected)' },
      { name: 'Data Visualization', icon: '🖌️', level: 90, exp: 'EXPERT', log: 'import matplotlib.pyplot as plt\nplt.figure(figsize=(10, 6))\nplt.plot(df["month"], df["sales"], marker="o")\nplt.show()' }
    ]
  },
  tools: {
    title: 'Tools',
    color: '#E6E6FA', // Light purple tint
    skills: [
      { name: 'AWS', icon: '☁️', level: 80, exp: 'INTERMEDIATE', log: 'aws s3 sync ./dist s3://shakthis-os-portfolio\nupload: ./dist/index.html to s3://shakthis-os-portfolio/index.html\nDeployment complete.' },
      { name: 'Git', icon: '🐙', level: 92, exp: 'EXPERT', log: 'git commit -m "feat: skills window integrated"\ngit push origin main\nBranch main: up-to-date with origin/main' },
      { name: 'Ollama', icon: '🦙', level: 90, exp: 'EXPERT', log: 'ollama run llama3-coder\n>>> Initializing local instance...\nLocal host online on port 11434.' },
      { name: 'PostgreSQL', icon: '🛢️', level: 85, exp: 'ADVANCED', log: 'psql -U shakthis -d app_db\napp_db=# SELECT * FROM skills WHERE category = "ML";\nResult: 5 rows found. Query execution: 0.02ms' },
      { name: 'SQLite', icon: '💾', level: 88, exp: 'ADVANCED', log: 'sqlite3 local_cache.db\nsqlite> SELECT sqlite_version();\n3.41.2' }
    ]
  }
};

export default function SkillsWindow({ visible, onClose }) {
  const [minimized, setMinimized] = useState(false);
  const [activeCategory, setActiveCategory] = useState('programming');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [terminalTyping, setTerminalTyping] = useState(false);
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

  // Load default skill when switching categories
  useEffect(() => {
    const firstSkill = SKILLS_DATA[activeCategory].skills[0];
    triggerTerminalDiagnostic(firstSkill);
  }, [activeCategory]);

  const triggerTerminalDiagnostic = (skill) => {
    setSelectedSkill(skill);
    setTerminalTyping(true);
    setTerminalOutput(`guest@shakthi-os:~$ diagnostic --check "${skill.name.toLowerCase()}"\n`);
    
    let currentText = `guest@shakthi-os:~$ diagnostic --check "${skill.name.toLowerCase()}"\n`;
    const fullLog = skill.log;
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex >= fullLog.length) {
        clearInterval(interval);
        setTerminalTyping(false);
        return;
      }
      currentText += fullLog[charIndex];
      setTerminalOutput(currentText);
      charIndex += 4; // Fast type stream
    }, 10);
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
                background: 'linear-gradient(90deg, #B2F2BB 0%, #AEC6CF 100%)',
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
                ⚙️ skills_manifest.exe
              </span>
              <div className="w-12" />
            </div>

            {/* Window Content */}
            <div className="overflow-y-auto flex-1 terminal-custom-scrollbar" style={{ maxHeight: 'calc(100vh - 160px)' }}>
              <div className="p-4 space-y-4">
                
                {/* Category Navigation Tabs */}
                <div className="flex flex-wrap gap-1 border-b border-[#AEC6CF]/30 pb-2">
                  {Object.keys(SKILLS_DATA).map((catKey) => {
                    const category = SKILLS_DATA[catKey];
                    const isActive = activeCategory === catKey;
                    return (
                      <button
                        key={catKey}
                        onClick={() => setActiveCategory(catKey)}
                        className={`px-2.5 py-1 font-pixel text-[6px] transition-all border ${
                          isActive
                            ? 'bg-[#FFFBF2] text-[#2D3436]'
                            : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
                        }`}
                        style={{
                          borderColor: isActive ? '#AEC6CF' : 'transparent',
                          borderBottomColor: isActive ? '#FFFBF2' : 'transparent',
                          marginBottom: '-3px',
                          zIndex: isActive ? 10 : 1
                        }}
                      >
                        {category.title}
                      </button>
                    );
                  })}
                </div>

                {/* Skills Container: Grid of little pixel OS components */}
                <div className="space-y-2">
                  <span className="font-pixel text-[6px] text-slate-400 block tracking-wider">
                    [ SELECT A NEURAL COMPONENT TO PROBE ]
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SKILLS_DATA[activeCategory].skills.map((skill) => {
                      const isSelected = selectedSkill?.name === skill.name;
                      const skillColor = SKILLS_DATA[activeCategory].color;
                      const barsCount = Math.floor(skill.level / 10);
                      const barDisplay = '▰'.repeat(barsCount) + '▱'.repeat(10 - barsCount);

                      return (
                        <motion.button
                          key={skill.name}
                          onClick={() => triggerTerminalDiagnostic(skill)}
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="flex flex-col overflow-hidden text-left"
                          style={{
                            background: '#FFFBF2',
                            border: `2px solid ${isSelected ? skillColor : '#AEC6CF'}`,
                            boxShadow: isSelected 
                              ? `2px 3px 0 ${skillColor}aa` 
                              : `2px 2px 0 rgba(0, 0, 0, 0.05)`
                          }}
                        >
                          {/* Mini Window Title Bar */}
                          <div
                            className="flex items-center justify-between px-1.5 py-0.5 border-b"
                            style={{
                              background: isSelected ? skillColor : '#AEC6CF',
                              borderColor: isSelected ? skillColor : '#AEC6CF',
                              color: '#2D3436'
                            }}
                          >
                            <div className="flex items-center gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FF9B9B]" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FFEAA7]" />
                            </div>
                            <span className="font-pixel text-[4.5px] uppercase tracking-wide truncate">
                              {skill.name.toLowerCase()}.sys
                            </span>
                          </div>

                          {/* Skill Body */}
                          <div className="p-2 space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm">{skill.icon}</span>
                              <span className="font-pixel text-[6px] text-[#2D3436] font-bold truncate">
                                {skill.name}
                              </span>
                            </div>

                            {/* Mini Pixel Progress Meter */}
                            <div className="space-y-0.5">
                              <div className="flex justify-between font-pixel text-[4px] text-slate-400">
                                <span>LEVEL:</span>
                                <span>{skill.level}%</span>
                              </div>
                              <div className="font-mono-retro text-[8px] text-[#B19CD9] tracking-tighter leading-none">
                                {barDisplay}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Diagnostic Probe Terminal */}
                {selectedSkill && (
                  <div className="space-y-1.5 pt-2">
                    <span className="font-pixel text-[6px] text-slate-400 block tracking-wider">
                      💾 NEURAL_CONNECTIONS // DIAGNOSTIC_PROBE
                    </span>
                    
                    <div
                      className="border-2 p-3 font-mono-retro text-[11px] text-[#B2F2BB] min-h-[96px] relative overflow-hidden flex flex-col justify-between"
                      style={{
                        background: '#0a0a14',
                        borderColor: '#AEC6CF',
                        boxShadow: 'inset 0 0 10px rgba(0,255,102,0.1)'
                      }}
                    >
                      {/* Grid overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-[0.02]"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00FF66 2px, #00FF66 4px)'
                        }}
                      />

                      {/* Diagnostic output logs */}
                      <pre className="whitespace-pre-wrap leading-normal relative z-10 flex-1 overflow-y-auto max-h-24 skills-scrollbar">
                        {terminalOutput}
                      </pre>

                      <div className="flex items-center justify-between border-t border-[#B2F2BB]/10 pt-1.5 mt-2 relative z-10 font-pixel text-[4.5px]">
                        <span className="text-slate-400 uppercase">PROBING: {selectedSkill.name}</span>
                        <span className="text-[#00FF66] uppercase animate-pulse">
                          {terminalTyping ? '⚡ SCANNING...' : '◉ DIAGNOSTIC OK'}
                        </span>
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
          className="fixed bottom-16 left-[348px] z-30 px-3 py-1 font-pixel text-[7px] text-white"
          style={{
            background: 'linear-gradient(90deg, #B2F2BB, #AEC6CF)',
            border: '2px solid #AEC6CF',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.1)'
          }}
        >
          skills_manifest.exe
        </motion.button>
      )}
    </AnimatePresence>
  );
}
