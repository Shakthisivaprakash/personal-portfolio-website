import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Github, Calendar, User, CheckCircle2, AlertTriangle, ArrowRight, Check, Database, Cpu, BookOpen, Layers } from 'lucide-react';
import useDragConstraints from '@/hooks/use-drag-constraints';

const PROJECTS_CASE_STUDIES = {
  'ai-debugger': {
    title: 'AI Debugger OS',
    subtitle: 'AI-Powered Code Debugging Chatbot',
    color: '#B19CD9',
    emoji: '🖥️',
    banner: '/project_debugger.png',
    year: '2025',
    role: 'Full Stack AI Developer',
    status: 'Completed',
    statusColor: '#B2F2BB',
    overview: 'Developed a full-stack AI chatbot that analyzes, identifies, and resolves code errors across multiple programming languages. It addresses developer friction by translating raw stacktraces into beginner-friendly explanations.',
    problemStatement: 'Developers face massive friction deciphering obscure local stacktraces and syntax error messages, resulting in hours of wasted troubleshooting.',
    objective: 'Build a locally executable, secure developer companion utilizing lightweight local LLMs to perform automated root-cause debugging with zero data leakage.',
    components: {
      dataset: 'Custom synthetic code error logs & common language stacktraces.',
      frameworks: 'FastAPI, React (Vite)',
      libraries: 'Framer Motion, Tailwind CSS, Lucide Icons, Axios',
      tools: 'Ollama (gemma:2b / llama3), Git, VS Code',
      technologies: 'Python, JavaScript, HTML5, CSS3, SQLite'
    },
    methodology: 'Implemented a private, client-server RAG diagnostic parser routing syntax stacktraces to system-prompted offline LLM models.',
    workflow: [
      { title: 'Architecture Planning', desc: 'Designed local-first client-server model separating lightweight React view and FastAPI backend.' },
      { title: 'Model Optimization', desc: 'Deployed local Ollama servers executing quantized gemma:2b models for high-speed prompt inferences.' },
      { title: 'Stacktrace Compiler', desc: 'Developed custom regular-expression parses in Python to scrub and route code error contexts.' },
      { title: 'Interface Hook', desc: 'Built an ultra-fast developer conversation viewport with Framer Motion triggers.' }
    ],
    features: [
      'Root Cause Analysis: Explains stacktraces in plain English.',
      'AI-Generated Code Fixes: Proposes instant valid code corrections.',
      'Beginner-Friendly Diagnostics: Explains core programming principles.',
      'Streamed Token-by-Token Explanations: Interactive real-time output.',
      'Multi-Language Error Parsing: Supports Python, JS, C++, and SQL.'
    ],
    output: {
      performance: '75% reduction in debug-diagnose loop durations compared to traditional online searches.',
      findings: 'Local quantized 2-billion parameter models are highly effective at syntax diagnostic parsing when wrapped in targeted system instructions.',
      outcome: '94% diagnostic accuracy on standard logical coding faults with zero external API dependencies.'
    },
    learnings: 'Learned to optimize prompt engineering templates for small-parameter local LLMs and handle stream-based HTTP socket responses securely.',
    github: 'https://github.com/shakthi-siva/ai-coder-debugger',
    demo: null
  },
  'vision-lab': {
    title: 'Vision Lab',
    subtitle: 'Dog vs Cat Image Classification using CNN',
    color: '#00FF66',
    emoji: '👁️',
    banner: '/project_vision.jpg',
    year: '2025',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    statusColor: '#B2F2BB',
    overview: 'Built a deep convolutional neural network (CNN) classifier from scratch using over 20,000 images, optimizing network weights, batch sizes, and data augmentations.',
    problemStatement: 'High-dimensional image arrays are hard to accurately categorize without massive pre-trained model weights. Custom CNNs must be engineered with careful layer normalizations to prevent gradient explosions.',
    objective: 'Solve classic computer vision binary classification tasks by developing a light, efficient CNN model without pre-trained model weights to run predictions on cats/dogs with high validation precision.',
    components: {
      dataset: 'Kaggle Dogs vs Cats Dataset (20,000+ labeled images).',
      frameworks: 'TensorFlow, Keras',
      libraries: 'OpenCV, NumPy, Matplotlib',
      tools: 'Jupyter Notebook, Anaconda, Git',
      technologies: 'Python, CNN, Computer Vision'
    },
    methodology: 'Staged a sequential custom 18-layer CNN trained on augmented datasets utilizing dropout regularizations.',
    workflow: [
      { title: 'Preprocessing Pipeline', desc: 'Uniformly formatted 20,000+ files to 128x128 matrices and normalized RGB pixel boundaries.' },
      { title: 'Data Augmentation', desc: 'Programmed random rotations, zooms, and mirror-shifts using Keras to combat overfitting.' },
      { title: 'Sequential Layering', desc: 'Staged an 18-layer CNN featuring Conv2D, MaxPool, and BatchNormalization arrays.' },
      { title: 'Training Aggregations', desc: 'Tuned parameters with Adam cross-entropy optimizations over 25 training epochs.' }
    ],
    features: [
      'Custom 18-layer Convolutional Pipeline built completely from scratch.',
      'Data Augmentation (Rotations, Zooms, Flips) integrated to avoid overfitting.',
      'Model Convergence Diagnostics tracking training loops in real-time.',
      'Dropout Regularization layers to stabilize neural configurations.',
      'Real-time validation metrics plotting loss and accuracy trends.'
    ],
    output: {
      performance: 'Attained a spectacular 97.08% validation accuracy on testing partitions.',
      findings: 'Dropout rates of 0.3 to 0.4 on fully-connected layers are optimal in preventing overfitting in custom CNN models.',
      outcome: 'Completed image preprocessing and model training with a final reduced training loss of 0.0536.'
    },
    learnings: 'Acquired deep competency in tuning Dropout ratios to combat convolutional overfitting and reading training curves to spot vanishing gradients.',
    github: 'https://github.com/shakthi-siva/dog-vs-cat-cnn',
    demo: null
  },
  'flood-intel': {
    title: 'Predictive Flood Analytics System',
    subtitle: 'AI-Powered Flood Risk Intelligence Platform',
    color: '#74b9ff',
    emoji: '🌊',
    banner: '/project_flood.png',
    year: '2025',
    role: 'Machine Learning Engineer',
    status: 'Completed',
    statusColor: '#B2F2BB',
    overview: 'Developed a machine learning system integrating hydrological, meteorological, and historical data to analyze rainfall, water levels, and climate patterns to predict early flood risks.',
    problemStatement: 'Traditional flood warning systems rely on local thresholds which fail during rapid precipitation anomalies. Machine learning models capture multi-variable risks.',
    objective: 'Build a robust predictive intelligence command system to calculate flood hazard probabilities, supporting emergency disaster response operations.',
    components: {
      dataset: 'Meteorological rainfall stations, river height telemetries, and historical climate tables.',
      frameworks: 'Scikit-Learn',
      libraries: 'Pandas, NumPy, Seaborn, Matplotlib',
      tools: 'Jupyter Notebook, SQLite, Git',
      technologies: 'Python, Machine Learning, Predictive Analytics'
    },
    methodology: 'Aggregated historical sensor data and trained regression trees to forecast regional river flood risks.',
    workflow: [
      { title: 'Telemetry Parsing', desc: 'Consolidated rolling rainfall readings, soil saturation matrices, and river height logs.' },
      { title: 'Feature Optimization', desc: 'Formulated rolling multi-day precipitation indexes using Scikit-Learn.' },
      { title: 'Regression Tuning', desc: 'Evaluated multiple ML models including XGBoost, Random Forests, and Logistic regressions.' },
      { title: 'Mitigation Visuals', desc: 'Structured an elevation hazard board supporting emergency planning metrics.' }
    ],
    features: [
      'Multi-source climate aggregations linking rainfall and station logs.',
      'Rolling time-series precipitation index calculations.',
      'Emergency warning threshold routing for proactive hazard alerts.',
      'Localized hazard cell rating across multiple region divisions.',
      'Early Warning System (EWS) telemetry triggers.'
    ],
    output: {
      performance: '94.8% accuracy in computing flood hazards 48 hours prior to river boundary breaches.',
      findings: 'A rolling 3-day rainfall threshold of 120mm is the single highest predictor of structural basin overflow.',
      outcome: 'Designed a fully functional predictive dashboard displaying localized hazard ratings across 8 risk divisions.'
    },
    learnings: 'Mastered time-series rolling statistical aggregates and consolidated complex meteorological arrays into high-fidelity dashboards.',
    github: 'https://github.com/Shakthisivaprakash/Flood-prediction-system-using-hydrological-and-meterological-historical-data',
    demo: null
  },
  'data-hub': {
    title: 'Data Analytics Hub',
    subtitle: 'Tata Group Data Analytics Virtual Internship',
    color: '#FFEAA7',
    emoji: '📊',
    banner: '/project_analytics.png',
    year: '2025',
    role: 'Business Intelligence Analyst',
    status: 'Completed',
    statusColor: '#B2F2BB',
    overview: 'Engineered executive dashboards and performed data analysis for Tata Group, translating complex sales and operations datasets into high-impact visual stories for C-suite decision making.',
    problemStatement: 'C-suite leaders cannot extract operational performance insights or regional transaction revenue indications from raw spreadsheets.',
    objective: 'Frame real business scenarios, analyze raw sales and operational performance variables, and build executive visualizations.',
    components: {
      dataset: 'Tata Group global transactions dataset.',
      frameworks: 'Power BI, Tableau',
      libraries: 'Pandas, NumPy',
      tools: 'Power Query Editor, Tableau Desktop, Git',
      technologies: 'Data Cleaning, Business Insights, Dashboard Engineering'
    },
    methodology: 'Applied diagnostic cleaning, grouped multi-million dollar shipping segments, and engineered high-impact dashboards.',
    workflow: [
      { title: 'Data Sanitization', desc: 'Cleaned raw transactions databases, filtering invalid metrics and handling missing properties.' },
      { title: 'Strategic Diagnostics', desc: 'Audited geographic revenue metrics to isolate strategic opportunities for CEO and CMO reviews.' },
      { title: 'Dashboard Engineering', desc: 'Developed 2 high-impact dashboards inside Power BI and Tableau.' },
      { title: 'Executive Presentation', desc: 'Drafted a high-level visual deck outlining potential expansion ports.' }
    ],
    features: [
      'Power BI and Tableau Sales Dashboards for executive telemetry.',
      'Advanced SQL and Pandas script integrations for sanitization.',
      'C-Suite Executive presentation decks explaining visual results.',
      'Revenue shipping route indicators highlighting global margins.',
      'Top-10 profit performance charts focusing shipping allocations.'
    ],
    output: {
      performance: 'Successfully deployed 2 high-impact interactive dashboards in Tableau and Power BI.',
      findings: 'Rolling top 10 products contribute to 42% of global transaction profits; untapped high-yield geographic routes exist in shipping.',
      outcome: 'Provided visual analysis and presented regional revenue recommendations to Tata executive panels.'
    },
    learnings: 'Developed deep competency in structural business scenario mapping, choosing correct visual paradigms for executives, and framing insights instead of stats.',
    github: null,
    demo: null
  },
  'gradtwin-ml': {
    title: 'Gradtwin Machine Learning Internship',
    subtitle: 'Machine Learning Intern | Gradtwin Services',
    color: '#B2F2BB',
    emoji: '🎓',
    banner: '/cert_gradtwin.png',
    year: '2026',
    role: 'Machine Learning Intern',
    status: 'Completed',
    statusColor: '#B2F2BB',
    overview: 'Completed a Machine Learning Internship at Gradtwin Services focused on applying machine learning concepts, data analysis techniques, preprocessing workflows, and AI problem-solving approaches in a professional environment. Worked on assignments requiring analytical thinking, technical implementation, and practical understanding of machine learning systems.',
    github: null,
    demo: null
  },
  'hr-assistant': {
    title: 'HR Intelligence Assistant',
    subtitle: 'Local LLM-Powered HR & Document Intelligence System',
    color: '#D8B4FE',
    emoji: '💬',
    banner: '/project_hr_chatbot.png',
    year: '2026',
    role: 'AI Systems Engineer',
    status: 'Completed',
    statusColor: '#B2F2BB',
    overview: 'Developed an intelligent chatbot system using Python, Flask, and Ollama running locally with the Llama 3 model. The system supports both general conversations and HR-specific assistance through a dual-mode architecture. Users can upload documents such as PDF, DOCX, PNG, and JPG files and interact with the extracted information through dedicated chat sessions. The chatbot also provides HR policy assistance and employee ticket generation capabilities.',
    github: 'https://github.com/Shakthisivaprakash/LLM-Chatbot-with-general-or-specific-switching',
    demo: null
  }
};

export default function ProjectWindow({ projectId, onClose }) {
  const [minimized, setMinimized] = useState(false);
  const project = PROJECTS_CASE_STUDIES[projectId];
  const dragControls = useDragControls();
  const { windowRef, constraints } = useDragConstraints(true, minimized);

  // Adjust modal state if dynamic window resize occurs
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      {/* Minimized Dock tab */}
      {minimized ? (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setMinimized(false)}
          className="fixed bottom-16 left-[468px] z-30 px-3 py-1 font-pixel text-[7px] text-[#2D3436] border-2 transition-all flex items-center gap-1.5"
          style={{
            background: project.color,
            borderColor: '#AEC6CF',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.1)'
          }}
        >
          <span>{project.emoji}</span> {project.title.toLowerCase().replace(/ /g, '_')}.doc
        </motion.button>
      ) : (
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
            top: 'clamp(56px, 12vh, 90px)',
            left: isMobile ? '4%' : 'calc(50% - 420px)',
            width: isMobile ? '92%' : '840px',
            maxHeight: 'calc(100vh - 100px)',
            touchAction: 'pan-y'
          }}
        >
          <div
            className="flex flex-col overflow-hidden crt-screen"
            style={{
              background: '#FFFBF2',
              border: '3px solid #AEC6CF',
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
            {/* Window Title Bar */}
            <div
              className="flex items-center justify-between px-2 py-1 flex-shrink-0 select-none"
              style={{
                background: `linear-gradient(90deg, ${project.color} 0%, #AEC6CF 100%)`,
                borderBottom: '2px solid #AEC6CF',
                cursor: !isMobile ? 'grab' : 'default',
                touchAction: 'none'
              }}
              onPointerDown={(e) => {
                if (!isMobile) dragControls.start(e);
              }}
            >
              {/* Traffic lights */}
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
              
              {/* Window Name */}
              <span className="font-pixel text-[7px] text-[#2D3436] tracking-wider drop-shadow-sm flex items-center gap-1">
                <span>{project.emoji}</span> {project.title.toLowerCase().replace(/ /g, '_')}_case_study.sh
              </span>
              <div className="w-12" />
            </div>

            {/* Scrollable Document Body */}
            <div
              className="overflow-y-auto flex-1 terminal-custom-scrollbar"
            >
              <div className="p-4 space-y-6">
                {projectId === 'flood-intel' ? (
                  <FloodIntelShowcase isMobile={isMobile} />
                ) : projectId === 'data-hub' ? (
                  <TataInternshipShowcase isMobile={isMobile} />
                ) : projectId === 'gradtwin-ml' ? (
                  <GradtwinInternshipShowcase isMobile={isMobile} />
                ) : projectId === 'hr-assistant' ? (
                  <HRAssistantShowcase isMobile={isMobile} />
                ) : (
                  <>
                    {/* 1. Project Banner Image */}
                    <div 
                      className="border-4 overflow-hidden relative shadow-sm aspect-[16/7] w-full"
                      style={{ borderColor: '#AEC6CF', background: 'rgba(0,0,0,0.05)' }}
                    >
                      <img 
                        src={project.banner} 
                        alt={project.title} 
                        className="w-full h-full object-cover select-none pointer-events-none" 
                      />
                    </div>

                    {/* Metadata Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 border-2 border-dashed border-[#AEC6CF]/30 bg-[#FFFBF2]/50 font-pixel text-[6px]">
                      <div className="flex items-center gap-1.5 text-[#2D3436]">
                        <Calendar size={12} className="text-[#B19CD9]" />
                        <span>YEAR: {project.year}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#2D3436]">
                        <User size={12} className="text-[#AEC6CF]" />
                        <span>ROLE: {project.role}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#2D3436]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B2F2BB] animate-pulse" />
                        <span>STATUS: </span>
                        <span 
                          className="px-1 py-0.2 text-[5px] bg-[#B2F2BB]"
                          style={{ border: '1.5px solid #2D3436' }}
                        >
                          {project.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* 2. Project Overview */}
                    <div className="space-y-2">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        [ 📂 01. Project Overview ]
                      </span>
                      <div 
                        className="border-2 p-3.5 space-y-3 font-mono-retro text-[12.5px] leading-relaxed text-[#2D3436]/90"
                        style={{
                          background: '#FFFBF2',
                          borderColor: '#AEC6CF',
                          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
                        }}
                      >
                        <p className="font-bold text-[13px] text-[#2D3436]">{project.subtitle}</p>
                        <p>{project.overview}</p>
                      </div>
                    </div>

                    {/* 3. Problem Statement */}
                    <div className="space-y-2">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        [ ⚠️ 02. Problem Statement ]
                      </span>
                      <div 
                        className="border-2 p-3.5 font-mono-retro text-[12px] leading-relaxed text-[#2D3436]/90 relative overflow-hidden"
                        style={{
                          background: 'rgba(255, 155, 155, 0.05)',
                          borderColor: '#FF9B9B',
                        }}
                      >
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle size={15} className="text-[#FF9B9B] flex-shrink-0 mt-0.5" />
                          <p>{project.problemStatement}</p>
                        </div>
                      </div>
                    </div>

                    {/* 4. Objective */}
                    <div className="space-y-2">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        [ 🎯 03. Project Objective ]
                      </span>
                      <div 
                        className="border-2 p-4 font-mono-retro text-[12px] leading-relaxed relative overflow-hidden"
                        style={{
                          background: project.color + '11',
                          borderColor: project.color,
                          boxShadow: `2px 2px 0 ${project.color}33`
                        }}
                      >
                        <div className="absolute top-2 right-2 text-xl opacity-20 pointer-events-none select-none">🎯</div>
                        <p className="text-[#2D3436] font-semibold">{project.objective}</p>
                      </div>
                    </div>

                    {/* 5. Components Used */}
                    <div className="space-y-2">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        [ ⚙️ 04. Components Used ]
                      </span>
                      <div 
                        className="border-2 p-3 bg-white space-y-2.5 font-mono-retro text-[11px]"
                        style={{ borderColor: '#AEC6CF' }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="font-pixel text-[4.5px] text-slate-400 block uppercase">📊 DATASET</span>
                            <p className="text-[#2D3436] leading-normal">{project.components.dataset}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="font-pixel text-[4.5px] text-slate-400 block uppercase">🧱 FRAMEWORKS</span>
                            <p className="text-[#2D3436] leading-normal">{project.components.frameworks}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="font-pixel text-[4.5px] text-slate-400 block uppercase">📚 LIBRARIES</span>
                            <p className="text-[#2D3436] leading-normal">{project.components.libraries}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="font-pixel text-[4.5px] text-slate-400 block uppercase">🛠️ TOOLS</span>
                            <p className="text-[#2D3436] leading-normal">{project.components.tools}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 6. Methodology & Workflow */}
                    <div className="space-y-2">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        [ 🔄 05. Methodology &amp; Workflow ]
                      </span>
                      <div className="space-y-3">
                        {/* Methodology summary */}
                        <div 
                          className="border-2 p-3 bg-white font-mono-retro text-[11.5px] leading-relaxed text-slate-600"
                          style={{ borderColor: '#AEC6CF', borderLeft: `3.5px solid ${project.color}` }}
                        >
                          <strong className="font-pixel text-[5px] text-[#2D3436] block mb-1">CORE METHODOLOGY:</strong>
                          <p>{project.methodology}</p>
                        </div>

                        {/* Step-by-step workflow timeline cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {project.workflow.map((step, idx) => (
                            <div 
                              key={idx} 
                              className="border-2 overflow-hidden flex flex-col animate-[float-gentle_8s_ease-in-out_infinite]"
                              style={{ borderColor: '#AEC6CF', background: '#FFFBF2', animationDelay: `${idx * 0.5}s` }}
                            >
                              {/* Step Header */}
                              <div 
                                className="px-2 py-0.5 border-b font-pixel text-[5px] text-[#2D3436] flex items-center justify-between"
                                style={{ background: 'rgba(174,198,207,0.15)', borderColor: '#AEC6CF' }}
                              >
                                <span>STEP 0{idx + 1}</span>
                                <span className="opacity-45">●●</span>
                              </div>
                              {/* Step Body */}
                              <div className="p-3 flex-1 font-mono-retro leading-relaxed">
                                <strong className="text-[11.5px] text-[#2D3436] block mb-1 uppercase font-bold">{step.title}</strong>
                                <p className="text-[10.5px] text-slate-500">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 7. Key Features */}
                    <div className="space-y-2">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        [ 💎 06. Key System Features ]
                      </span>
                      <div 
                        className="border-2 p-4 bg-white font-mono-retro text-[11.5px] space-y-2"
                        style={{ borderColor: '#AEC6CF' }}
                      >
                        {project.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <div 
                              className="w-4 h-4 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: project.color + '22' }}
                            >
                              <Check size={10} className="text-[#2D3436] font-bold" />
                            </div>
                            <span className="text-[#2D3436] leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 8. Output & Results */}
                    <div className="space-y-2">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        [ 🏆 07. Model Performance &amp; Output ]
                      </span>
                      
                      <div 
                        className="border-2 p-4 font-mono-retro text-[11px] text-[#B2F2BB] space-y-3 relative overflow-hidden"
                        style={{
                          background: '#121222', // Solid velvet dark navy
                          borderColor: '#AEC6CF',
                          boxShadow: 'inset 0 0 12px rgba(0,255,102,0.06)'
                        }}
                      >
                        {/* Grid overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00FF66 2px, #00FF66 4px)' }} />

                        <div className="flex items-center gap-1.5 text-xs text-[#00FF66] font-pixel border-b border-[#00FF66]/20 pb-1.5">
                          <span>📊</span> SYSTEM_DIAGNOSTICS_COMPILER: SUCCESS
                        </div>

                        <div className="space-y-2 text-[11px]">
                          <div>
                            <strong className="text-white block uppercase text-[10px]">[ MODEL PERFORMANCE / KPIs ]</strong>
                            <p className="text-[#B2F2BB] mt-0.5">{project.output.performance}</p>
                          </div>
                          <div className="border-t border-[#00FF66]/10 pt-2">
                            <strong className="text-white block uppercase text-[10px]">[ KEY RESEARCH FINDINGS ]</strong>
                            <p className="text-[#B2F2BB] mt-0.5">{project.output.findings}</p>
                          </div>
                          <div className="border-t border-[#00FF66]/10 pt-2">
                            <strong className="text-white block uppercase text-[10px]">[ FINAL OUTCOME ]</strong>
                            <p className="text-[#B2F2BB] mt-0.5">{project.output.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 9. Technologies Used */}
                    <div className="space-y-2">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        [ 🛡️ 08. Tech Stack Badges ]
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.components.technologies.split(',').map((t) => {
                          const trimmed = t.trim();
                          return (
                            <span
                              key={trimmed}
                              className="px-2 py-0.5 font-pixel text-[5.5px] text-[#2D3436] cursor-default border-2"
                              style={{
                                background: project.color + '22',
                                borderColor: project.color,
                                boxShadow: `2px 2px 0 ${project.color}33`,
                              }}
                            >
                              {trimmed}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* 10. Key Learnings */}
                    <div className="space-y-2">
                      <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
                        [ 🧠 09. Key Engineering Learnings ]
                      </span>
                      <div 
                        className="border-2 p-3.5 font-mono-retro text-[12px] leading-relaxed text-[#2D3436]/80"
                        style={{
                          background: '#FFFBF2',
                          borderColor: '#AEC6CF'
                        }}
                      >
                        <p>{project.learnings}</p>
                      </div>
                    </div>

                    {/* Repository Action Button */}
                    <div className="pt-2 border-t border-[#AEC6CF]/25">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 font-pixel text-[6px] text-center border-2 border-slate-800 bg-[#FFFBF2] hover:bg-slate-100 text-[#2D3436] transition-all flex items-center justify-center gap-2"
                        style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.15)' }}
                      >
                        <Github size={12} />
                        [ VIEW GITHUB REPOSITORY ]
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloodIntelShowcase({ isMobile }) {
  const [enlargedImg, setEnlargedImg] = useState(null);
  const objectives = [
    "Predict flood risks using historical environmental data.",
    "Improve disaster preparedness.",
    "Support data-driven decision making.",
    "Analyze rainfall and hydrological trends.",
    "Visualize risk zones.",
    "Provide interpretable prediction outputs.",
    "Enable proactive disaster management strategies."
  ];

  const dataSources = [
    "Hydrological Data",
    "Meteorological Data",
    "Historical Flood Records",
    "Rainfall Information",
    "Environmental Parameters",
    "Water Level Measurements"
  ];

  const technologies = [
    "Python",
    "Machine Learning",
    "Predictive Analytics",
    "Data Visualization",
    "Statistical Analysis",
    "Environmental Data Processing"
  ];

  const workflow = [
    { title: "Data Collection", desc: "Gather hydrological, meteorological, and historical flood data." },
    { title: "Data Preprocessing", desc: "Handle missing values, normalize variables, and prepare datasets." },
    { title: "Feature Engineering", desc: "Extract flood-related indicators." },
    { title: "Model Development", desc: "Train machine learning models for flood prediction." },
    { title: "Validation", desc: "Evaluate model performance using statistical metrics." },
    { title: "Prediction", desc: "Generate flood risk scores and classifications." },
    { title: "Visualization", desc: "Present results through dashboards and analytics views." }
  ];

  const features = [
    "Flood Risk Prediction",
    "Rainfall Trend Analysis",
    "Environmental Data Processing",
    "Risk Classification",
    "Predictive Analytics Dashboard",
    "Data Visualization",
    "Historical Pattern Analysis",
    "Decision Support Insights"
  ];

  const outputs = [
    "Flood probability prediction",
    "Risk classification reports",
    "Trend analysis dashboards",
    "Environmental intelligence insights",
    "Data-driven recommendations"
  ];

  const contribution = [
    "Data preprocessing",
    "Exploratory data analysis",
    "Feature engineering",
    "Machine learning model implementation",
    "Visualization design",
    "Performance evaluation",
    "Result interpretation"
  ];

  const learnings = [
    "Predictive analytics for environmental systems",
    "Data preprocessing at scale",
    "Machine learning model development",
    "Disaster intelligence applications",
    "Data visualization and communication"
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-2 p-3 bg-white" style={{ borderColor: '#AEC6CF' }}>
        <span className="font-pixel text-[5px] text-slate-400 block tracking-wider uppercase mb-1">
          [ PROJECT TITLE ]
        </span>
        <h1 className="font-pixel text-[8px] md:text-[10px] text-[#2D3436] leading-snug font-bold">
          Predictive Flood Analytics System
        </h1>
        <p className="font-mono-retro text-[12px] text-[#74b9ff] mt-1 font-bold">
          AI-Powered Flood Risk Intelligence Platform
        </p>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🖥️ SYSTEM SCREENSHOTS ]
        </span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Screenshot 1 */}
          <div className="space-y-1.5">
            <div 
              onClick={() => setEnlargedImg('/project_flood_1.png')}
              className="border-4 overflow-hidden relative shadow-sm w-full bg-white flex justify-center items-center cursor-zoom-in group aspect-[1.7] max-h-[220px]"
              style={{ borderColor: '#AEC6CF' }}
            >
              <img 
                src="/project_flood_1.png" 
                alt="Command Center Dashboard" 
                className="w-full h-full object-cover select-none transition-transform duration-200 group-hover:scale-[1.01]" 
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1 font-pixel text-[6px] bg-[#FFFBF2] text-[#2D3436] border-2 border-[#2D3436] shadow-md">
                  🔍 CLICK TO ENLARGE
                </span>
              </div>
            </div>
            <div className="border border-dashed border-[#AEC6CF] p-2 text-center bg-[#FFFBF2] font-mono-retro text-[9px] leading-relaxed text-slate-600">
              <strong className="text-[#2D3436] font-bold block text-[10px]">Command Center Dashboard</strong>
              <p className="mt-0.5">Real-time geospatial mapping risk fusion visualization and Defcon early alert telemetry panel.</p>
            </div>
          </div>

          {/* Screenshot 2 */}
          <div className="space-y-1.5">
            <div 
              onClick={() => setEnlargedImg('/project_flood_2.png')}
              className="border-4 overflow-hidden relative shadow-sm w-full bg-white flex justify-center items-center cursor-zoom-in group aspect-[1.7] max-h-[220px]"
              style={{ borderColor: '#AEC6CF' }}
            >
              <img 
                src="/project_flood_2.png" 
                alt="Hazard Intelligence Terminal" 
                className="w-full h-full object-cover select-none transition-transform duration-200 group-hover:scale-[1.01]" 
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1 font-pixel text-[6px] bg-[#FFFBF2] text-[#2D3436] border-2 border-[#2D3436] shadow-md">
                  🔍 CLICK TO ENLARGE
                </span>
              </div>
            </div>
            <div className="border border-dashed border-[#AEC6CF] p-2 text-center bg-[#FFFBF2] font-mono-retro text-[9px] leading-relaxed text-slate-600">
              <strong className="text-[#2D3436] font-bold block text-[10px]">Hazard Intelligence Terminal</strong>
              <p className="mt-0.5">Model trust diagnostics dashboard with localized threat indicators and sector overrides.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 📂 01. Project Overview ]
        </span>
        <div 
          className="border-2 p-3.5 space-y-2.5 font-mono-retro text-[12px] leading-relaxed text-[#2D3436]/90"
          style={{
            background: '#FFFBF2',
            borderColor: '#AEC6CF',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
          }}
        >
          <p>
            Developed an intelligent flood prediction and disaster analytics platform that leverages hydrological, meteorological, and historical environmental datasets to forecast flood risks and support disaster preparedness.
          </p>
          <p>
            The platform combines machine learning, predictive analytics, geospatial visualization, and environmental monitoring to provide actionable flood intelligence for vulnerable regions.
          </p>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ ⚠️ 02. Problem Statement ]
        </span>
        <div 
          className="border-2 p-3.5 font-mono-retro text-[12px] leading-relaxed text-[#2D3436]/90 relative overflow-hidden"
          style={{
            background: 'rgba(255, 155, 155, 0.05)',
            borderColor: '#FF9B9B',
          }}
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={15} className="text-[#FF9B9B] flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p>
                Traditional flood warning systems often react after flood conditions have already escalated.
              </p>
              <p>
                Many systems rely on fragmented datasets, delayed reporting mechanisms, and limited predictive capabilities.
              </p>
              <p>
                This project addresses these challenges by integrating historical environmental data with machine learning algorithms to generate early flood risk predictions and support proactive disaster management.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives & Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Objectives */}
        <div className="space-y-2">
          <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
            [ 🎯 03. Project Objectives ]
          </span>
          <div 
            className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-2 h-full"
            style={{ borderColor: '#AEC6CF' }}
          >
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#74b9ff] select-none font-bold">•</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="space-y-2">
          <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
            [ 📊 04. Data Sources ]
          </span>
          <div 
            className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed grid grid-cols-1 gap-2 h-full"
            style={{ borderColor: '#AEC6CF' }}
          >
            {dataSources.map((ds, i) => (
              <div key={i} className="flex items-center gap-2 border border-slate-100 p-2 bg-[#FFFBF2]/50">
                <Database size={10} className="text-[#74b9ff]" />
                <span>{ds}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🛠️ 05. Technologies Used ]
        </span>
        <div className="flex flex-wrap gap-1.5 p-3 border-2 bg-white" style={{ borderColor: '#AEC6CF' }}>
          {technologies.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 font-pixel text-[5.5px] text-[#2D3436] cursor-default border-2 flex items-center gap-1"
              style={{
                background: '#74b9ff22',
                borderColor: '#74b9ff',
                boxShadow: `2px 2px 0 #74b9ff33`,
              }}
            >
              <Cpu size={8} className="text-[#74b9ff]" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Project Workflow */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🔄 06. Project Workflow ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-3"
          style={{ borderColor: '#AEC6CF' }}
        >
          {workflow.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div 
                className="w-5 h-5 rounded-full bg-[#74b9ff] text-white flex items-center justify-center font-pixel text-[6px] flex-shrink-0"
              >
                {idx + 1}
              </div>
              <div>
                <strong className="text-[#2D3436] font-bold block">{step.title}</strong>
                <span className="text-[#2D3436]/80 text-[11px]">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ ✨ 07. Key Features ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] grid grid-cols-1 sm:grid-cols-2 gap-3"
          style={{ borderColor: '#AEC6CF' }}
        >
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div 
                className="w-4 h-4 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: '#B2F2BB' }}
              >
                <Check size={10} className="text-[#2D3436] font-bold" />
              </div>
              <span className="text-[#2D3436] leading-snug">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Output */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🏆 08. Project Outputs ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-2"
          style={{ borderColor: '#AEC6CF' }}
        >
          {outputs.map((out, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#B2F2BB] select-none font-bold">✓</span>
              <span>{out}</span>
            </div>
          ))}
        </div>
      </div>

      {/* My Contribution */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🛠️ 09. My Contribution ]
        </span>
        <div 
          className="border-2 p-4 bg-[#FFFBF2] font-mono-retro text-[12px] leading-relaxed space-y-2"
          style={{ borderColor: '#AEC6CF' }}
        >
          {contribution.map((cont, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#B19CD9] select-none font-bold">•</span>
              <span>{cont}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Learnings */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🧠 10. Key Learnings ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-2"
          style={{ borderColor: '#AEC6CF' }}
        >
          {learnings.map((learn, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#FF9B9B] select-none font-bold">»</span>
              <span>{learn}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 border-t border-[#AEC6CF]/25">
        <a
          href="https://github.com/Shakthisivaprakash/Flood-prediction-system-using-hydrological-and-meterological-historical-data"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 font-pixel text-[6px] text-center border-2 border-slate-800 bg-[#FFFBF2] hover:bg-slate-100 text-[#2D3436] transition-all flex items-center justify-center gap-2"
          style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.15)' }}
        >
          <Github size={12} />
          [ VIEW GITHUB REPOSITORY ]
        </a>
      </div>

      {/* Enlarged Lightbox Overlay */}
      <AnimatePresence>
        {enlargedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedImg(null)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl w-full bg-white border-[4px] border-[#2D3436] p-1.5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={enlargedImg} 
                alt="Enlarged screenshot" 
                className="w-full h-auto max-h-[85vh] object-contain block" 
              />
              <button 
                onClick={() => setEnlargedImg(null)}
                className="absolute -top-3.5 -right-3.5 w-7 h-7 bg-[#FF9B9B] hover:brightness-95 active:scale-95 text-[#2D3436] border-2 border-[#2D3436] font-pixel text-[8px] flex items-center justify-center transition-transform"
                style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TataInternshipShowcase({ isMobile }) {
  const objectives = [
    'Analyze business datasets.',
    'Identify key trends and patterns.',
    'Perform data cleaning and preparation.',
    'Build meaningful visualizations.',
    'Create executive dashboards.',
    'Deliver strategic business recommendations.',
    'Support data-driven decision making.'
  ];

  const tasks = [
    {
      title: 'Task 1: Understanding Business Requirements',
      bullets: [
        'Studied stakeholder expectations.',
        'Identified business objectives.',
        'Defined key performance indicators.'
      ]
    },
    {
      title: 'Task 2: Data Analysis',
      bullets: [
        'Explored business datasets.',
        'Performed trend analysis.',
        'Identified performance patterns.',
        'Investigated customer behavior indicators.'
      ]
    },
    {
      title: 'Task 3: Dashboard Design',
      bullets: [
        'Designed executive dashboards.',
        'Created business-focused visualizations.',
        'Highlighted actionable insights.',
        'Improved data storytelling.'
      ]
    },
    {
      title: 'Task 4: Executive Presentation',
      bullets: [
        'Presented findings.',
        'Explained business impact.',
        'Proposed strategic recommendations.',
        'Communicated insights effectively.'
      ]
    }
  ];

  const technologies = [
    'Microsoft Excel',
    'Data Visualization',
    'Business Analytics',
    'Dashboard Design',
    'Data Cleaning',
    'Data Interpretation',
    'Business Intelligence',
    'KPI Analysis',
    'Reporting Techniques'
  ];

  const skills = [
    'Data Analysis',
    'Data Cleaning',
    'Business Intelligence',
    'Dashboard Development',
    'Data Visualization',
    'Insight Generation',
    'Stakeholder Communication',
    'Business Reporting',
    'Strategic Thinking',
    'Executive Presentation'
  ];

  const workflow = [
    'Understand business objectives.',
    'Review available datasets.',
    'Clean and prepare data.',
    'Perform exploratory analysis.',
    'Identify key trends.',
    'Create visual dashboards.',
    'Generate insights.',
    'Develop recommendations.',
    'Present findings.',
    'Support decision-making.'
  ];

  const insights = [
    'Identified performance trends across business metrics.',
    'Highlighted areas requiring management attention.',
    'Discovered opportunities for operational improvement.',
    'Supported strategic planning through data insights.',
    'Improved visibility into business performance indicators.'
  ];

  const outputs = [
    'Business dashboards.',
    'Executive reports.',
    'Trend analysis.',
    'KPI visualizations.',
    'Strategic recommendations.',
    'Data-driven business insights.'
  ];

  const contributions = [
    'Analyzing business datasets.',
    'Cleaning and preparing data.',
    'Building visual reports.',
    'Designing dashboards.',
    'Interpreting trends and KPIs.',
    'Generating actionable insights.',
    'Presenting findings to stakeholders.'
  ];

  const learningOutcomes = [
    'Data Analytics',
    'Business Intelligence',
    'Dashboard Development',
    'Data Storytelling',
    'Executive Reporting',
    'Visualization Techniques',
    'Decision Support Analytics'
  ];

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="border-2 p-3.5 bg-white space-y-1.5" style={{ borderColor: '#AEC6CF' }}>
        <span className="font-pixel text-[5px] text-slate-400 block tracking-wider uppercase">
          [ PROJECT TITLE ]
        </span>
        <h1 className="font-pixel text-[8px] md:text-[10px] text-[#2D3436] leading-snug font-bold">
          Tata Data Visualization: Empowering Business with Effective Insights
        </h1>
        <p className="font-mono-retro text-xs text-[#B19CD9] font-bold">
          Virtual Internship Experience | Tata Group × Forage
        </p>
      </div>

      {/* Image */}
      <div 
        className="border-4 overflow-hidden relative shadow-sm w-full bg-white flex justify-center items-center"
        style={{ borderColor: '#AEC6CF' }}
      >
        <img 
          src="/cert_tata.jpg" 
          alt="Tata Data Visualization Certificate" 
          className="w-full h-auto block select-none pointer-events-none" 
        />
      </div>

      {/* Project Overview */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 📂 01. Project Overview ]
        </span>
        <div 
          className="border-2 p-3.5 space-y-2.5 font-mono-retro text-[12px] leading-relaxed text-[#2D3436]/90"
          style={{
            background: '#FFFBF2',
            borderColor: '#AEC6CF',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
          }}
        >
          <p>
            Completed the Tata Data Visualization Virtual Internship offered through Forage, focusing on transforming raw business data into actionable insights for executive decision-making.
          </p>
          <p>
            The project involved analyzing business datasets, identifying trends, creating executive dashboards, and presenting strategic recommendations to leadership stakeholders.
          </p>
          <p>
            The internship simulated the role of a Data Analyst working with business leaders to support data-driven decisions.
          </p>
        </div>
      </div>

      {/* Business Problem */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ ⚠️ 02. Business Problem ]
        </span>
        <div 
          className="border-2 p-3.5 font-mono-retro text-[12px] leading-relaxed text-[#2D3436]/90 relative overflow-hidden"
          style={{
            background: 'rgba(255, 155, 155, 0.05)',
            borderColor: '#FF9B9B',
          }}
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={15} className="text-[#FF9B9B] flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p>
                Organizations generate large amounts of operational and customer data but often struggle to convert that information into meaningful business insights.
              </p>
              <p>
                The objective was to analyze business performance metrics, uncover patterns, identify opportunities for improvement, and communicate findings through clear visualizations and executive-level reporting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🎯 03. Project Objectives ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-1.5"
          style={{ borderColor: '#AEC6CF' }}
        >
          {objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#FFEAA7] select-none">•</span>
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Tasks Completed */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 📋 04. Project Tasks Completed ]
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tasks.map((task, idx) => (
            <div 
              key={idx} 
              className="border-2 overflow-hidden flex flex-col"
              style={{ borderColor: '#AEC6CF', background: '#FFFBF2' }}
            >
              <div 
                className="px-2 py-0.5 border-b font-pixel text-[5px] text-[#2D3436] flex items-center justify-between"
                style={{ background: 'rgba(174,198,207,0.15)', borderColor: '#AEC6CF' }}
              >
                <span>STAGE 0{idx + 1}</span>
                <span className="opacity-45">●●</span>
              </div>
              <div className="p-3 flex-1 font-mono-retro leading-relaxed">
                <strong className="text-[11.5px] text-[#2D3436] block mb-1.5 uppercase font-bold">{task.title}</strong>
                <ul className="space-y-1 text-[10.5px] text-slate-600">
                  {task.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1">
                      <span>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools & Technologies */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🛡️ 05. Tools &amp; Technologies ]
        </span>
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 font-pixel text-[5.5px] text-[#2D3436] cursor-default border-2"
              style={{
                background: '#FFEAA722',
                borderColor: '#FFEAA7',
                boxShadow: `2px 2px 0 #FFEAA733`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Core Skills Demonstrated */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 💎 06. Core Skills Demonstrated ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[11.5px] grid grid-cols-1 sm:grid-cols-2 gap-2"
          style={{ borderColor: '#AEC6CF' }}
        >
          {skills.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div 
                className="w-4 h-4 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: '#FFEAA722' }}
              >
                <Check size={10} className="text-[#2D3436] font-bold" />
              </div>
              <span className="text-[#2D3436] leading-snug">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🔄 07. Operational Workflow ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[11px] leading-relaxed space-y-1"
          style={{ borderColor: '#AEC6CF' }}
        >
          {workflow.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <strong className="font-pixel text-[5px] text-[#B19CD9] min-w-[20px] flex-shrink-0 mt-0.5">
                {idx + 1}.
              </strong>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Business Insights */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 💡 08. Key Business Insights ]
        </span>
        <div 
          className="border-2 p-4 bg-[#FFFBF2] font-mono-retro text-[12px] leading-relaxed space-y-1.5"
          style={{ borderColor: '#AEC6CF' }}
        >
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#B19CD9] select-none">•</span>
              <span>{insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Output */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🏆 09. Project Outputs ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-1.5"
          style={{ borderColor: '#AEC6CF' }}
        >
          <span className="text-[#2D3436] font-bold block mb-1">Outputs included:</span>
          {outputs.map((out, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#B2F2BB] select-none">•</span>
              <span>{out}</span>
            </div>
          ))}
        </div>
      </div>

      {/* My Contribution */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🛠️ 10. My Contribution ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-1.5"
          style={{ borderColor: '#AEC6CF' }}
        >
          <span className="text-[#2D3436] font-bold block mb-1">Responsibilities included:</span>
          {contributions.map((cont, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#B19CD9] select-none">•</span>
              <span>{cont}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🧠 11. Learning Outcomes ]
        </span>
        <div 
          className="border-2 p-4 bg-[#FFFBF2] font-mono-retro text-[12px] leading-relaxed space-y-1.5"
          style={{ borderColor: '#AEC6CF' }}
        >
          <span className="text-[#2D3436] font-bold block mb-1">Through this internship, I strengthened my skills in:</span>
          {learningOutcomes.map((lo, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#74b9ff] select-none">•</span>
              <span>{lo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GradtwinInternshipShowcase({ isMobile }) {
  const [enlarged, setEnlarged] = useState(false);

  const skills = [
    'Machine Learning',
    'Data Preprocessing',
    'Data Analysis',
    'Feature Engineering',
    'Model Evaluation',
    'Python Programming',
    'Problem Solving',
    'AI Development'
  ];

  const responsibilities = [
    'Working with machine learning workflows',
    'Data preprocessing and cleaning',
    'Understanding model development pipelines',
    'Supporting AI-based analytical tasks',
    'Performing data analysis',
    'Evaluating machine learning outputs'
  ];

  const outcomes = [
    'Applied Machine Learning Knowledge',
    'Professional Industry Exposure',
    'Practical AI Experience',
    'Strong Analytical Thinking',
    'Technical Problem Solving',
    'Real-world Workflow Understanding'
  ];

  const learningOutcomes = [
    'Understanding Industry AI Workflows',
    'Data Processing Techniques',
    'Machine Learning Development Lifecycle',
    'Professional Project Execution',
    'Industry-Level Problem Solving',
    'Analytical Decision Making'
  ];

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="border-2 p-3.5 bg-white space-y-1.5" style={{ borderColor: '#AEC6CF' }}>
        <span className="font-pixel text-[5px] text-slate-400 block tracking-wider uppercase">
          [ INTERNSHIP CASE STUDY ]
        </span>
        <h1 className="font-pixel text-[8px] md:text-[10px] text-[#2D3436] leading-snug font-bold">
          Gradtwin Machine Learning Internship
        </h1>
        <p className="font-mono-retro text-xs text-[#B19CD9] font-bold">
          Machine Learning Intern | Gradtwin Services
        </p>
        <p className="font-pixel text-[5px] text-slate-400">
          February 2026 – May 2026 | Domain: Machine Learning
        </p>
      </div>

      {/* Image Section */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 📄 CERTIFICATE OF EXPERIENCE ]
        </span>
        <div 
          onClick={() => setEnlarged(true)}
          className="border-4 overflow-hidden relative shadow-sm w-full bg-white flex justify-center items-center cursor-zoom-in group"
          style={{ borderColor: '#AEC6CF' }}
        >
          <img 
            src="/cert_gradtwin.png" 
            alt="Gradtwin Internship Experience Certificate" 
            className="w-full h-auto block select-none transition-transform duration-200 group-hover:scale-[1.02]" 
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1 font-pixel text-[6px] bg-[#FFFBF2] text-[#2D3436] border-2 border-[#2D3436] shadow-md">
              🔍 CLICK TO ENLARGE
            </span>
          </div>
        </div>
        
        {/* Caption */}
        <div className="border-2 border-dashed border-[#AEC6CF] p-3 text-center bg-[#FFFBF2] font-mono-retro text-[10px] leading-relaxed text-slate-600">
          <strong className="text-[#2D3436] font-bold block text-[11px]">Official Internship Experience Certificate</strong>
          <p className="mt-0.5">Gradtwin Services • Machine Learning Domain</p>
          <p className="text-[#B19CD9] font-bold text-[9px] mt-0.5">February 2026 – May 2026</p>
        </div>
      </div>

      {/* Internship Overview */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 📂 01. Internship Overview ]
        </span>
        <div 
          className="border-2 p-3.5 space-y-2.5 font-mono-retro text-[12px] leading-relaxed text-[#2D3436]/90"
          style={{
            background: '#FFFBF2',
            borderColor: '#AEC6CF',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
          }}
        >
          <p>
            Completed a Machine Learning Internship at Gradtwin Services focused on applying machine learning concepts, data analysis techniques, preprocessing workflows, and AI problem-solving approaches in a professional environment.
          </p>
          <p>
            Worked on assignments requiring analytical thinking, technical implementation, and practical understanding of machine learning systems.
          </p>
        </div>
      </div>

      {/* Skills Developed */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🛡️ 02. Skills Developed ]
        </span>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 font-pixel text-[5.5px] text-[#2D3436] cursor-default border-2"
              style={{
                background: '#B2F2BB22',
                borderColor: '#B2F2BB',
                boxShadow: `2px 2px 0 #B2F2BB33`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Key Responsibilities */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🛠️ 03. Key Responsibilities ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-1.5"
          style={{ borderColor: '#AEC6CF' }}
        >
          {responsibilities.map((cont, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#B19CD9] select-none">•</span>
              <span>{cont}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Outcomes */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🏆 04. Key Outcomes ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[11.5px] grid grid-cols-1 sm:grid-cols-2 gap-2"
          style={{ borderColor: '#AEC6CF' }}
        >
          {outcomes.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div 
                className="w-4 h-4 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: '#B2F2BB22' }}
              >
                <Check size={10} className="text-[#2D3436] font-bold" />
              </div>
              <span className="text-[#2D3436] leading-snug">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Recognition */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🎓 05. Achievement Recognition ]
        </span>
        <div 
          className="border-2 p-3.5 font-mono-retro text-[12px] leading-relaxed text-[#2D3436]/90 relative overflow-hidden"
          style={{
            background: 'rgba(178, 242, 187, 0.05)',
            borderColor: '#B2F2BB',
          }}
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={15} className="text-[#B2F2BB] flex-shrink-0 mt-0.5" />
            <p>
              Recognized by Gradtwin Services for excellent performance, dedication, professionalism, and commitment throughout the internship period.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🧠 06. Learning Outcomes ]
        </span>
        <div 
          className="border-2 p-4 bg-[#FFFBF2] font-mono-retro text-[12px] leading-relaxed space-y-1.5"
          style={{ borderColor: '#AEC6CF' }}
        >
          {learningOutcomes.map((lo, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#74b9ff] select-none">•</span>
              <span>{lo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enlarged Certificate Lightbox Overlay */}
      <AnimatePresence>
        {enlarged && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlarged(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl w-full bg-white border-[4px] border-[#2D3436] p-1.5 shadow-2xl animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src="/cert_gradtwin.png" 
                alt="Gradtwin Certificate" 
                className="w-full h-auto max-h-[85vh] object-contain block" 
              />
              <button 
                onClick={() => setEnlarged(false)}
                className="absolute -top-3.5 -right-3.5 w-7 h-7 bg-[#FF9B9B] hover:brightness-95 active:scale-95 text-[#2D3436] border-2 border-[#2D3436] font-pixel text-[8px] flex items-center justify-center transition-transform"
                style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HRAssistantShowcase({ isMobile }) {
  const [enlarged, setEnlarged] = useState(false);

  const objectives = [
    "General-purpose conversations using local Llama 3 model.",
    "HR policy assistance utilizing local vector context injection.",
    "Document understanding and text extraction from various formats.",
    "Employee request handling and automated ticket registration.",
    "Knowledge retrieval from user-uploaded files locally.",
    "Secure processing of sensitive organizational records offline."
  ];

  const technologies = [
    "Python",
    "Flask",
    "Ollama",
    "Llama 3",
    "PDFPlumber",
    "Python DOCX",
    "Tesseract OCR",
    "HTML",
    "CSS",
    "JavaScript"
  ];

  const hrCapabilities = [
    "Leave Policies (accruals, allocations, permissions)",
    "Attendance Rules (logging, checks, exceptions)",
    "Recruitment Process (flow, stages, criteria)",
    "Salary Information & Payroll Details (computations, structures)",
    "Notice Periods (terms, regulations, calculations)",
    "Employee Exit Procedures (checklists, offboarding steps)"
  ];

  const docFeatures = [
    { type: "PDF Files", desc: "Extracts multi-page text blocks using PDFPlumber parser." },
    { type: "DOCX Files", desc: "Scans structured text paragraphs using python-docx libraries." },
    { type: "PNG/JPG Images", desc: "Performs optical character recognition (OCR) via Tesseract OCR." },
    { type: "Dedicated Chat Sessions", desc: "Extracted document texts initialize isolated session tabs for contextual conversation." }
  ];

  const requestFields = [
    { field: "Full Name", icon: "👤" },
    { field: "Email Address", icon: "✉️" },
    { field: "Phone Number", icon: "📞" },
    { field: "Query Details", icon: "💬" }
  ];

  const workflow = [
    { title: "User Access", desc: "User opens the chat application viewport." },
    { title: "Mode Selection", desc: "User toggles General Mode or HR Assistant Mode." },
    { title: "Query Submission", desc: "User submits a query or uploads context documents." },
    { title: "Background Processing", desc: "Flask backend extracts content and aggregates context rules." },
    { title: "Offline Inference", desc: "Ollama directs Llama 3 to compile response locally." },
    { title: "Policy Integration", desc: "HR Assistant mode automatically maps company policy constraints." },
    { title: "Isolated Sessioning", desc: "Uploaded files create dedicated session tabs for targeted Q&A." }
  ];

  const features = [
    "General Chat Mode",
    "HR Assistant Mode",
    "Local LLM Processing",
    "Document Upload Support",
    "PDF Parsing",
    "DOCX Parsing",
    "Image OCR Processing",
    "Employee Ticket Collection",
    "Multi-Tab Conversations",
    "Context-Based Responses",
    "Local Data Storage"
  ];

  const contribution = [
    "Developed Flask backend architecture to handle offline request routing.",
    "Integrated local Llama 3 model through Ollama API wrapper.",
    "Implemented secure local document upload and parsing pipelines.",
    "Built context-injection workflow for company HR policies.",
    "Developed the employee inquiry and request collection database system.",
    "Created document parsing algorithms using PDFPlumber and Tesseract OCR.",
    "Designed the responsive multi-tab web user interface and conversation viewports."
  ];

  const learnings = [
    "Designing responsive, offline-first client-server architectures.",
    "Managing prompt template contexts and system constraints for lightweight LLMs.",
    "Building high-speed file parsing and OCR pipelines for document retrieval.",
    "Structuring multi-session state tracking in local web applications."
  ];

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="border-2 p-3.5 bg-white space-y-1.5" style={{ borderColor: '#AEC6CF' }}>
        <span className="font-pixel text-[5px] text-slate-400 block tracking-wider uppercase">
          [ PROJECT CASE STUDY ]
        </span>
        <h1 className="font-pixel text-[8px] md:text-[10px] text-[#2D3436] leading-snug font-bold">
          HR Intelligence Assistant
        </h1>
        <p className="font-mono-retro text-xs text-[#B19CD9] font-bold">
          Local LLM-Powered HR &amp; Document Intelligence System
        </p>
      </div>

      {/* Image Section */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🖥️ CHATBOT INTERFACE SCREENSHOT ]
        </span>
        <div 
          onClick={() => setEnlarged(true)}
          className="border-4 overflow-hidden relative shadow-sm w-full bg-white flex justify-center items-center cursor-zoom-in group"
          style={{ borderColor: '#AEC6CF' }}
        >
          <img 
            src="/project_hr_chatbot.png" 
            alt="HR Chatbot Screenshot" 
            className="w-full h-auto block select-none transition-transform duration-200 group-hover:scale-[1.01]" 
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1 font-pixel text-[6px] bg-[#FFFBF2] text-[#2D3436] border-2 border-[#2D3436] shadow-md">
              🔍 CLICK TO ENLARGE
            </span>
          </div>
        </div>
        
        {/* Caption */}
        <div className="border-2 border-dashed border-[#AEC6CF] p-3 text-center bg-[#FFFBF2] font-mono-retro text-[10px] leading-relaxed text-slate-600">
          <strong className="text-[#2D3436] font-bold block text-[11px]">Brave Browser Chatbot Interface Mockup</strong>
          <p className="mt-0.5">Dual-Mode Chat Screen (General &amp; HR Assistant) showing multi-tab document parsing and local session dialogs.</p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 📂 01. Project Overview ]
        </span>
        <div 
          className="border-2 p-3.5 space-y-2.5 font-mono-retro text-[12px] leading-relaxed text-[#2D3436]/90"
          style={{
            background: '#FFFBF2',
            borderColor: '#AEC6CF',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
          }}
        >
          <p>
            Developed an intelligent chatbot system using Python, Flask, and Ollama running locally with the Llama 3 model. The system supports both general conversations and HR-specific assistance through a dual-mode architecture.
          </p>
          <p>
            Users can upload documents such as PDF, DOCX, PNG, and JPG files and interact with the extracted information through dedicated chat sessions. The chatbot also provides HR policy assistance and employee ticket generation capabilities.
          </p>
        </div>
      </div>

      {/* Project Objective */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🎯 02. Project Objective ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-2"
          style={{ borderColor: '#AEC6CF' }}
        >
          {objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#B19CD9] select-none font-bold">•</span>
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Features & Technologies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Features */}
        <div className="space-y-2">
          <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
            [ ✨ 03. Core Features ]
          </span>
          <div 
            className="border-2 p-4 bg-white font-mono-retro text-[12px] space-y-2 h-full"
            style={{ borderColor: '#AEC6CF' }}
          >
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#B2F2BB] select-none font-bold">✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="space-y-2">
          <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
            [ 🛠️ 04. Technologies Used ]
          </span>
          <div 
            className="border-2 p-4 bg-white font-mono-retro text-[12px] grid grid-cols-1 gap-2 h-full"
            style={{ borderColor: '#AEC6CF' }}
          >
            {technologies.map((tech, i) => (
              <div key={i} className="flex items-center gap-2 border border-slate-100 p-2 bg-[#FFFBF2]/50">
                <Database size={10} className="text-[#B19CD9]" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Workflow */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🔄 05. System Workflow ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-3"
          style={{ borderColor: '#AEC6CF' }}
        >
          {workflow.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div 
                className="w-5 h-5 rounded-full bg-[#B19CD9] text-white flex items-center justify-center font-pixel text-[6px] flex-shrink-0"
              >
                {idx + 1}
              </div>
              <div>
                <strong className="text-[#2D3436] font-bold block">{step.title}</strong>
                <span className="text-[#2D3436]/80 text-[11px]">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HR Capabilities & Document Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* HR Assistant Capabilities */}
        <div className="space-y-2">
          <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
            [ 💼 06. HR Assistant Capabilities ]
          </span>
          <div 
            className="border-2 p-4 bg-white font-mono-retro text-[12px] space-y-2.5 h-full"
            style={{ borderColor: '#AEC6CF' }}
          >
            <p className="text-[11px] text-slate-400 uppercase font-pixel tracking-wider mb-1">Provides answers related to:</p>
            {hrCapabilities.map((cap, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#FF9B9B] select-none font-bold">•</span>
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Intelligence */}
        <div className="space-y-2">
          <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
            [ 📄 07. Document Intelligence ]
          </span>
          <div 
            className="border-2 p-4 bg-white font-mono-retro text-[12.5px] space-y-3 h-full"
            style={{ borderColor: '#AEC6CF' }}
          >
            {docFeatures.map((df, i) => (
              <div key={i} className="space-y-0.5">
                <strong className="text-[11.5px] text-[#2D3436] block font-bold">{df.type}</strong>
                <p className="text-[11px] text-slate-500">{df.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Request Management */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 📝 08. Employee Request Management ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-3"
          style={{ borderColor: '#AEC6CF' }}
        >
          <p>
            The system collects employee requests and queries for HR tracking and follow-up:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {requestFields.map((rf, i) => (
              <div key={i} className="border border-slate-100 p-2 bg-[#FFFBF2]/50 text-center font-bold flex flex-col justify-center items-center gap-1">
                <span className="text-base">{rf.icon}</span>
                <span className="text-[10px]">{rf.field}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Contribution */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🛠️ 09. My Contribution ]
        </span>
        <div 
          className="border-2 p-4 bg-[#FFFBF2] font-mono-retro text-[12px] leading-relaxed space-y-2"
          style={{ borderColor: '#AEC6CF' }}
        >
          {contribution.map((cont, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#B19CD9] select-none font-bold">•</span>
              <span>{cont}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Output */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🏆 10. Project Outputs ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-2.5"
          style={{ borderColor: '#AEC6CF' }}
        >
          <div className="flex items-start gap-2">
            <span className="text-[#B2F2BB] select-none font-bold">✓</span>
            <span>Intelligent, context-driven conversations.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#B2F2BB] select-none font-bold">✓</span>
            <span>Local HR policy assistance system.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#B2F2BB] select-none font-bold">✓</span>
            <span>Document-based offline question answering.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#B2F2BB] select-none font-bold">✓</span>
            <span>Employee request collection and logging.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#B2F2BB] select-none font-bold">✓</span>
            <span>Local AI-powered private processing.</span>
          </div>
        </div>
      </div>

      {/* Key Learnings */}
      <div className="space-y-2">
        <span className="font-pixel text-[6px] text-slate-400 block tracking-wider uppercase">
          [ 🧠 11. Key Learnings ]
        </span>
        <div 
          className="border-2 p-4 bg-white font-mono-retro text-[12px] leading-relaxed space-y-2"
          style={{ borderColor: '#AEC6CF' }}
        >
          {learnings.map((learn, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#FF9B9B] select-none font-bold">»</span>
              <span>{learn}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 border-t border-[#AEC6CF]/25">
        <a
          href="https://github.com/Shakthisivaprakash/LLM-Chatbot-with-general-or-specific-switching"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 font-pixel text-[6px] text-center border-2 border-slate-800 bg-[#FFFBF2] hover:bg-slate-100 text-[#2D3436] transition-all flex items-center justify-center gap-2"
          style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.15)' }}
        >
          <Github size={12} />
          [ VIEW PROJECT REPOSITORY ]
        </a>
      </div>

      {/* Enlarged Screenshot Overlay Lightbox */}
      <AnimatePresence>
        {enlarged && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlarged(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl w-full bg-white border-[4px] border-[#2D3436] p-1.5 shadow-2xl animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src="/project_hr_chatbot.png" 
                alt="HR Chatbot Screenshot Enlarged" 
                className="w-full h-auto max-h-[85vh] object-contain block" 
              />
              <button 
                onClick={() => setEnlarged(false)}
                className="absolute -top-3.5 -right-3.5 w-7 h-7 bg-[#FF9B9B] hover:brightness-95 active:scale-95 text-[#2D3436] border-2 border-[#2D3436] font-pixel text-[8px] flex items-center justify-center transition-transform"
                style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

