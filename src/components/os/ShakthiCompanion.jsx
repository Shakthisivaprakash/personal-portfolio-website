import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShakthiCompanion({ activeSection, activeProject, isWindowOpen: isWindowOpenProp, onNavigate, onOpenProjects }) {
  // Compute isWindowOpen from props
  const isWindowOpen = isWindowOpenProp !== undefined 
    ? isWindowOpenProp 
    : (activeSection !== 'home' || activeProject !== null);

  // Screen dimensions to compute safe boundaries
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600
  });

  const [pos, setPos] = useState({ x: 120, y: 180 });
  const [state, setState] = useState('waving'); // 'walking' | 'idle' | 'looking' | 'sitting' | 'waving' | 'inspecting'
  const [facing, setFacing] = useState('right'); // 'left' | 'right'
  const [target, setTarget] = useState({ x: 120, y: 180 });
  const [duration, setDuration] = useState(0);
  const [bubbleText, setBubbleText] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [targetProject, setTargetProject] = useState(null);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  // Tutorial state on load: 0 to 4, or -1 when completed
  const [tutorialStep, setTutorialStep] = useState(0);

  // Animation frame indices
  const [walkFrame, setWalkFrame] = useState(0);
  const [waveFrame, setWaveFrame] = useState(0);
  const [typeFrame, setTypeFrame] = useState(0);

  // Timeout/Ref references
  const idleTimeoutRef = useRef(null);
  const easterEggTimeoutRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);
  const hasDoneInactivityAnim = useRef(false);

  // Monitor window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute responsive layout variables
  const isMobile = dimensions.width < 1024;
  const isUltraMobile = dimensions.width < 768;
  const safeMinX = 10;
  const safeMaxX = isMobile ? dimensions.width - 44 : dimensions.width - 60;
  const safeMinY = 50;
  const safeMaxY = isMobile ? dimensions.height - 110 : dimensions.height - 90;

  // Walking speed calculation
  const getTravelDuration = (x1, y1, x2, y2) => {
    const distance = Math.hypot(x2 - x1, y2 - y1);
    const speed = isMobile ? 20 : 40; // pixels per second
    return distance / speed;
  };

  // Get nearest safe corner when windows open
  const getNearestSafeCorner = (currentX, currentY) => {
    const corners = [
      { x: dimensions.width - (isMobile ? 52 : 64), y: dimensions.height - (isMobile ? 110 : 120) }, // Bottom-Right
      { x: isMobile ? 16 : 95, y: dimensions.height - (isMobile ? 110 : 120) },                      // Bottom-Left
      { x: dimensions.width - (isMobile ? 52 : 64), y: 60 },                                         // Top-Right
      { x: isMobile ? 16 : 95, y: 60 }                                                               // Top-Left
    ];
    
    let nearest = corners[0];
    let minDist = Infinity;
    for (const c of corners) {
      const d = Math.hypot(c.x - currentX, c.y - currentY);
      if (d < minDist) {
        minDist = d;
        nearest = c;
      }
    }
    return nearest;
  };

  // Pick target coordinate for normal roaming
  const pickNextTarget = useCallback((currentPos) => {
    if (isWindowOpen) {
      setTargetProject(null);
      return getNearestSafeCorner(currentPos.x, currentPos.y);
    }

    if (isMobile) {
      setTargetProject(null);
      // Restricted mobile roaming (safe side area)
      const nextX = dimensions.width - 80 + Math.random() * 50;
      const nextY = dimensions.height - 140 + Math.random() * 50;
      return { x: Math.max(safeMinX, Math.min(nextX, safeMaxX)), y: Math.max(safeMinY, Math.min(nextY, safeMaxY)) };
    }

    // 30% chance to target a project icon area (stopping naturally next to it, not overlapping it)
    if (Math.random() < 0.3) {
      const projectsList = ['ai-debugger', 'vision-lab', 'flood-intel', 'data-hub', 'hr-assistant'];
      const projId = projectsList[Math.floor(Math.random() * projectsList.length)];
      setTargetProject(projId);

      const iconIndex = projectsList.indexOf(projId);
      const iconX = 95; // Stop to the right of the left-aligned desktop icons (x: ~16 to 80px)
      const iconY = 70 + iconIndex * 74;
      return { x: iconX, y: iconY };
    } else {
      setTargetProject(null);
      // 70% chance random desktop spot
      const nextX = safeMinX + Math.random() * (safeMaxX - safeMinX);
      const nextY = safeMinY + Math.random() * (safeMaxY - safeMinY);
      return { x: nextX, y: nextY };
    }
  }, [isWindowOpen, isMobile, dimensions, safeMinX, safeMaxX, safeMinY, safeMaxY]);

  // Coordinate target calculations for teleporting
  const pickSafeTeleportCoordinate = () => {
    if (isWindowOpen) {
      // Teleport randomly to one of the safe corners
      const corners = [
        { x: dimensions.width - (isMobile ? 52 : 64), y: dimensions.height - (isMobile ? 110 : 120) },
        { x: isMobile ? 16 : 95, y: dimensions.height - (isMobile ? 110 : 120) },
        { x: dimensions.width - (isMobile ? 52 : 64), y: 60 },
        { x: isMobile ? 16 : 95, y: 60 }
      ];
      return corners[Math.floor(Math.random() * corners.length)];
    }

    let attempts = 0;
    while (attempts < 100) {
      const nextX = safeMinX + Math.random() * (safeMaxX - safeMinX);
      const nextY = safeMinY + Math.random() * (safeMaxY - safeMinY);

      // Avoid overlapping desktop project icons (left aligned, x: 16-80px, y: 48-460px)
      const overlapsIcons = nextX < 110 && nextY < 500;

      // Avoid bottom dock (centered horizontally, y: height - 120)
      const overlapsDock = nextY > dimensions.height - 130;

      // Avoid utility icons
      const overlapsRecruiter = nextX > dimensions.width - 100 && nextY < 160;
      const overlapsWhyHire = nextX < 100 && nextY > dimensions.height - 160;
      const overlapsAnalytics = nextX > dimensions.width - 120 && nextY > dimensions.height - 160;

      if (!overlapsIcons && !overlapsDock && !overlapsRecruiter && !overlapsWhyHire && !overlapsAnalytics) {
        return { x: nextX, y: nextY };
      }
      attempts++;
    }

    return { x: dimensions.width / 2, y: dimensions.height / 2 };
  };

  // Synchronize transition when window status changes
  useEffect(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    if (tutorialStep !== -1 || isEasterEggOpen) return;

    if (isWindowOpen) {
      setPos(current => {
        const nearestCorner = getNearestSafeCorner(current.x, current.y);
        const tDuration = getTravelDuration(current.x, current.y, nearestCorner.x, nearestCorner.y);
        setTarget(nearestCorner);
        setDuration(tDuration);
        setState('walking');
        setFacing(nearestCorner.x > current.x ? 'right' : 'left');
        return current;
      });
    } else {
      setPos(current => {
        const nextT = pickNextTarget(current);
        setTarget(nextT);
        setDuration(getTravelDuration(current.x, current.y, nextT.x, nextT.y));
        setState('walking');
        setFacing(nextT.x > current.x ? 'right' : 'left');
        return current;
      });
    }
  }, [isWindowOpen, pickNextTarget, tutorialStep, isEasterEggOpen, dimensions]);

  // Proximity Project Messages
  const getProjectQuote = (projId) => {
    switch (projId) {
      case 'ai-debugger':
        return "Built using FastAPI and LLMs 🤖";
      case 'vision-lab':
        return "CNN-powered computer vision 👁️";
      case 'flood-intel':
        return "Predictive analytics for disaster management 🌊";
      case 'data-hub':
        return "Business insights through data 📊";
      case 'gradtwin-ml':
        return "Practical Machine Learning workflows 🧠";
      case 'hr-assistant':
        return "Local HR automation chatbot 💬";
      default:
        return null;
    }
  };

  // Inactivity Animation Loop (15 seconds triggers 5-second sit/laptop state, then resumes roaming)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const resetUserTimer = () => {
      hasDoneInactivityAnim.current = false;

      // If user became active during sitting diagnostic animation, stand up and roam
      setState(currentState => {
        if (currentState === 'sitting' && bubbleText === "Training new models...") {
          setTimeout(() => {
            const nextT = pickNextTarget(pos);
            setTarget(nextT);
            setDuration(getTravelDuration(pos.x, pos.y, nextT.x, nextT.y));
            setState('walking');
            setFacing(nextT.x > pos.x ? 'right' : 'left');
            setBubbleText(null);
          }, 0);
        }
        return currentState;
      });

      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      if (idleTimeoutRef.current && bubbleText === "Training new models...") {
        clearTimeout(idleTimeoutRef.current);
      }

      inactivityTimeoutRef.current = setTimeout(() => {
        // Trigger inactivity diagnostics
        if (tutorialStep !== -1 || isEasterEggOpen || isWindowOpen || hasDoneInactivityAnim.current) return;

        hasDoneInactivityAnim.current = true;
        
        setPos(current => {
          setTarget(current);
          setDuration(0);
          setState('sitting');
          setBubbleText("Training new models...");
          return current;
        });

        // After a few seconds (5 seconds), close laptop, stand up, and resume roaming
        idleTimeoutRef.current = setTimeout(() => {
          setState('idle');
          setBubbleText(null);
          
          setPos(current => {
            const nextT = pickNextTarget(current);
            setTarget(nextT);
            setDuration(getTravelDuration(current.x, current.y, nextT.x, nextT.y));
            setState('walking');
            setFacing(nextT.x > current.x ? 'right' : 'left');
            return current;
          });
        }, 5000);

      }, 15000);
    };

    resetUserTimer();

    window.addEventListener('mousemove', resetUserTimer);
    window.addEventListener('mousedown', resetUserTimer);
    window.addEventListener('keydown', resetUserTimer);
    window.addEventListener('touchstart', resetUserTimer);

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      window.removeEventListener('mousemove', resetUserTimer);
      window.removeEventListener('mousedown', resetUserTimer);
      window.removeEventListener('keydown', resetUserTimer);
      window.removeEventListener('touchstart', resetUserTimer);
    };
  }, [tutorialStep, isEasterEggOpen, isWindowOpen, pickNextTarget, pos, bubbleText]);

  // Interactive guide tutorial loop on load
  useEffect(() => {
    if (tutorialStep === -1) return;

    const tutorialSteps = [
      { text: "Hi, I'm Shakthi 👋", state: 'waving', facing: 'right', dur: 3000 },
      { text: "Welcome to SHAKTHI OS v1.0! 🖥️", state: 'looking', facing: 'right', dur: 3000 },
      { text: "Double-click desktop icons to read my AI & Data Science case studies! 📂", state: 'looking', facing: 'left', dur: 4500 },
      { text: "Use the bottom dock to view my Resume, Skills, or email me! 💼", state: 'sitting', facing: 'right', dur: 4500 },
      { text: "Click me anytime to teleport me out of your way! ⚡", state: 'waving', facing: 'right', dur: 3000 }
    ];

    const current = tutorialSteps[tutorialStep];
    setBubbleText(current.text);
    setState(current.state);
    setFacing(current.facing);

    const t = setTimeout(() => {
      if (tutorialStep < tutorialSteps.length - 1) {
        setTutorialStep(s => s + 1);
      } else {
        setTutorialStep(-1);
        setBubbleText(null);
        // Start natural roaming
        const nextT = pickNextTarget(pos);
        setTarget(nextT);
        setDuration(getTravelDuration(pos.x, pos.y, nextT.x, nextT.y));
        setState('walking');
        setFacing(nextT.x > pos.x ? 'right' : 'left');
      }
    }, current.dur);

    return () => clearTimeout(t);
  }, [tutorialStep, pickNextTarget]);

  // Interrupt tutorial if user opens a window immediately
  useEffect(() => {
    if (isWindowOpen && tutorialStep !== -1) {
      setTutorialStep(-1);
      setBubbleText(null);
    }
  }, [isWindowOpen, tutorialStep]);

  // Listen for About window specifically
  useEffect(() => {
    if (activeSection === 'about') {
      setIsEasterEggOpen(false);
      setBubbleText("Thanks for visiting my portfolio!");
      const t = setTimeout(() => {
        setBubbleText(prev => prev === "Thanks for visiting my portfolio!" ? null : prev);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [activeSection]);

  // Animation ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setWalkFrame(f => (f + 1) % 2);
      setWaveFrame(f => (f + 1) % 2);
      setTypeFrame(f => (f + 1) % 2);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  // Arrival handler
  const handleArrival = () => {
    setPos(target);

    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    if (tutorialStep !== -1 || isEasterEggOpen || hasDoneInactivityAnim.current) return;

    if (isWindowOpen) {
      const cornerStates = ['idle', 'looking', 'sitting', 'waving'];
      const nextState = cornerStates[Math.floor(Math.random() * cornerStates.length)];
      setState(nextState);

      idleTimeoutRef.current = setTimeout(() => {
        handleArrival();
      }, 4000 + Math.random() * 2000);
    } else {
      if (targetProject) {
        setState('inspecting');
        const projQuote = getProjectQuote(targetProject);
        setBubbleText(projQuote);
        setFacing('left');

        idleTimeoutRef.current = setTimeout(() => {
          setBubbleText(null);
          setTargetProject(null);
          const nextT = pickNextTarget(target);
          setTarget(nextT);
          setDuration(getTravelDuration(target.x, target.y, nextT.x, nextT.y));
          setState('walking');
          setFacing(nextT.x > target.x ? 'right' : 'left');
        }, 3500);
      } else {
        const idleStates = ['idle', 'looking', 'sitting', 'waving'];
        const nextState = idleStates[Math.floor(Math.random() * idleStates.length)];
        setState(nextState);

        const idleDuration = nextState === 'sitting' ? 6000 : 3000 + Math.random() * 2000;

        idleTimeoutRef.current = setTimeout(() => {
          const nextT = pickNextTarget(target);
          setTarget(nextT);
          setDuration(getTravelDuration(target.x, target.y, nextT.x, nextT.y));
          setState('walking');
          setFacing(nextT.x > target.x ? 'right' : 'left');
        }, idleDuration);
      }
    }
  };

  // Easter Egg Click Triggers
  const handleCompanionClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    if (easterEggTimeoutRef.current) {
      clearTimeout(easterEggTimeoutRef.current);
    }

    if (tutorialStep !== -1) {
      setTutorialStep(-1);
    }

    if (!isEasterEggOpen) {
      setIsEasterEggOpen(true);
      setTarget(pos);
      setDuration(0);
      setState('waving');
      setBubbleText(null);

      // Auto-disappear after 7 seconds
      easterEggTimeoutRef.current = setTimeout(() => {
        setIsEasterEggOpen(false);
        const nextT = pickNextTarget(pos);
        setTarget(nextT);
        setDuration(getTravelDuration(pos.x, pos.y, nextT.x, nextT.y));
        setState('walking');
        setFacing(nextT.x > pos.x ? 'right' : 'left');
      }, 7000);
    } else {
      setIsEasterEggOpen(false);
      
      const teleportT = pickSafeTeleportCoordinate();
      setPos(teleportT);
      setTarget(teleportT);
      setDuration(0);
      setState('idle');

      const surpriseQuotes = [
        "Oops! Teleporting! ⚡",
        "Wheee! 🌀",
        "Got me! 😄",
        "Hyperspace travel! 🚀"
      ];
      setBubbleText(surpriseQuotes[Math.floor(Math.random() * surpriseQuotes.length)]);

      idleTimeoutRef.current = setTimeout(() => {
        setBubbleText(null);
        const nextT = pickNextTarget(teleportT);
        setTarget(nextT);
        setDuration(getTravelDuration(teleportT.x, teleportT.y, nextT.x, nextT.y));
        setState('walking');
        setFacing(nextT.x > teleportT.x ? 'right' : 'left');
      }, 1500);
    }
  };

  // Mouse hover events
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!bubbleText && !isEasterEggOpen) {
      const quotes = [
        "Hi, I'm Shakthi 👋",
        "Exploring projects...",
        "AI + Data Science",
        "Welcome to SHAKTHI OS",
        "Let's build something amazing!"
      ];
      setBubbleText(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (bubbleText && !bubbleText.startsWith("Built") && !bubbleText.startsWith("CNN") && !bubbleText.startsWith("Predictive") && !bubbleText.startsWith("Business") && !bubbleText.startsWith("Training") && !bubbleText.startsWith("Hi") && !bubbleText.startsWith("Welcome") && !bubbleText.startsWith("Double-click") && !bubbleText.startsWith("Use") && !bubbleText.startsWith("Click")) {
      setBubbleText(null);
    }
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (easterEggTimeoutRef.current) clearTimeout(easterEggTimeoutRef.current);
      if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      className="fixed z-28 select-none"
      animate={{ x: target.x, y: target.y }}
      transition={{ duration, ease: 'linear' }}
      onAnimationComplete={handleArrival}
      style={{
        width: isUltraMobile ? '32px' : isMobile ? '34px' : '48px',
        height: isUltraMobile ? '42px' : isMobile ? '45px' : '64px',
        left: 0,
        top: 0
      }}
    >
      <div 
        className="relative w-full h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCompanionClick}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Shadow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1 bg-black/10 rounded-full"
          style={{ filter: 'blur(1.5px)' }}
        />

        {/* Chibi Character SVG */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 12 16"
          style={{
            imageRendering: 'pixelated',
            transform: `scaleX(${facing === 'left' ? -1 : 1})`,
            transformOrigin: 'center',
            cursor: 'pointer'
          }}
        >
          {/* Headphone band */}
          <rect x="3" y="0" width="6" height="1" fill="#FF9B9B" />
          <rect x="2" y="1" width="1" height="2" fill="#FF9B9B" />
          <rect x="9" y="1" width="1" height="2" fill="#FF9B9B" />

          {/* Ear cups */}
          <rect x="1" y="2" width="2" height="3" fill="#74b9ff" />
          <rect x="9" y="2" width="2" height="3" fill="#74b9ff" />

          {/* Hair */}
          <rect x="3" y="1" width="6" height="1" fill="#2D3436" />
          <rect x="2.5" y="2" width="7" height="4" fill="#2D3436" />
          <rect x="2" y="3" width="1" height="2" fill="#2D3436" />
          <rect x="9" y="3" width="1" height="2" fill="#2D3436" />

          {/* Head / Skin */}
          <rect x="3" y="2" width="6" height="4" fill="#FFDAB9" />

          {/* Hair details */}
          <rect x="3" y="2" width="6" height="1" fill="#2D3436" />

          {/* Eyes (Glasses) */}
          {state === 'looking' ? (
            <>
              <rect x="3.5" y="3.5" width="1.5" height="1.5" fill="#2D3436" />
              <rect x="7.0" y="3.5" width="1.5" height="1.5" fill="#2D3436" />
            </>
          ) : (
            <>
              <rect x="4" y="3.5" width="1.5" height="1.5" fill="#2D3436" />
              <rect x="7.5" y="3.5" width="1.5" height="1.5" fill="#2D3436" />
            </>
          )}

          {/* Blush */}
          <rect x="3" y="5" width="1" height="0.5" fill="#FF9B9B" opacity="0.6" />
          <rect x="8" y="5" width="1" height="0.5" fill="#FF9B9B" opacity="0.6" />

          {/* Mouth */}
          <rect x="5.5" y="5" width="1" height="0.5" fill="#FF9B9B" />

          {/* Neck */}
          <rect x="5" y="6" width="2" height="1" fill="#FFDAB9" />

          {/* Torso & Arms */}
          {state === 'sitting' ? (
            <>
              <rect x="3.5" y="7" width="5" height="3.5" fill="#B19CD9" />
              <rect x="5.5" y="8" width="1" height="1" fill="#B2F2BB" />

              {/* Laptop Base */}
              <rect x="3.5" y="9.5" width="5" height="0.6" fill="#636e72" />
              {/* Laptop Screen */}
              <rect x="4.5" y="8" width="3" height="1.5" fill="#74b9ff" opacity="0.9" />

              {/* Folded legs */}
              <rect x="2.5" y="10.5" width="7" height="1" fill="#2D3436" />
              <rect x="2.5" y="11.5" width="2" height="0.8" fill="#FFD1DC" />
              <rect x="7.5" y="11.5" width="2" height="0.8" fill="#FFD1DC" />

              {/* Typing fingers */}
              {typeFrame === 0 ? (
                <>
                  <rect x="4.2" y="9.2" width="0.8" height="0.5" fill="#FFDAB9" />
                  <rect x="6.5" y="9.2" width="0.8" height="0.5" fill="#FFDAB9" />
                </>
              ) : (
                <>
                  <rect x="4.7" y="9.2" width="0.8" height="0.5" fill="#FFDAB9" />
                  <rect x="6.0" y="9.2" width="0.8" height="0.5" fill="#FFDAB9" />
                </>
              )}
            </>
          ) : (
            <>
              {/* Normal Torso */}
              <rect x="3.5" y="7" width="5" height="4" fill="#B19CD9" />
              <rect x="5.5" y="8.2" width="1" height="1" fill="#B2F2BB" />

              {/* Arms */}
              {state === 'waving' ? (
                <>
                  <rect x="2.5" y="7" width="1" height="3.2" fill="#B19CD9" />
                  <rect x="2.5" y="10.2" width="1" height="0.8" fill="#FFDAB9" />

                  {/* Waving Right Arm */}
                  {waveFrame === 0 ? (
                    <>
                      <rect x="8.5" y="5" width="1" height="3" fill="#B19CD9" />
                      <rect x="8.5" y="4" width="1" height="1" fill="#FFDAB9" />
                    </>
                  ) : (
                    <>
                      <rect x="9.5" y="4.5" width="2" height="1" fill="#B19CD9" />
                      <rect x="11.5" y="4.5" width="1" height="1" fill="#FFDAB9" />
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* Normal Arms */}
                  <rect x="2.5" y="7" width="1" height="3.2" fill="#B19CD9" />
                  <rect x="8.5" y="7" width="1" height="3.2" fill="#B19CD9" />
                  <rect x="2.5" y="10.2" width="1" height="0.8" fill="#FFDAB9" />
                  <rect x="8.5" y="10.2" width="1" height="0.8" fill="#FFDAB9" />
                </>
              )}

              {/* Legs */}
              {state === 'walking' ? (
                walkFrame === 0 ? (
                  <>
                    <rect x="4" y="11" width="1.5" height="3" fill="#2D3436" />
                    <rect x="3" y="14" width="2.5" height="0.8" fill="#FFD1DC" />
                    <rect x="6.5" y="11" width="1.5" height="2" fill="#2D3436" />
                    <rect x="6.5" y="13" width="2.5" height="0.8" fill="#FFD1DC" />
                  </>
                ) : (
                  <>
                    <rect x="4" y="11" width="1.5" height="2" fill="#2D3436" />
                    <rect x="3" y="13" width="2.5" height="0.8" fill="#FFD1DC" />
                    <rect x="6.5" y="11" width="1.5" height="3" fill="#2D3436" />
                    <rect x="6.5" y="14" width="2.5" height="0.8" fill="#FFD1DC" />
                  </>
                )
              ) : (
                <>
                  <rect x="4" y="11" width="1.5" height="3" fill="#2D3436" />
                  <rect x="6.5" y="11" width="1.5" height="3" fill="#2D3436" />
                  <rect x="3" y="14" width="2.5" height="0.8" fill="#FFD1DC" />
                  <rect x="6.5" y="14" width="2.5" height="0.8" fill="#FFD1DC" />
                </>
              )}
            </>
          )}
        </svg>

        {/* Regular Speech Bubble */}
        {bubbleText && !isEasterEggOpen && (
          <div
            className="absolute px-2 py-1 font-pixel text-[6px] text-[#2D3436] whitespace-nowrap z-50 pointer-events-none select-none"
            style={{
              background: '#FFFBF2',
              border: '2px solid #AEC6CF',
              boxShadow: '1px 1px 0 rgba(0,0,0,0.1)',
              bottom: isMobile ? '46px' : '66px',
              left: facing === 'right' ? '12px' : 'auto',
              right: facing === 'left' ? '12px' : 'auto'
            }}
          >
            {bubbleText}
            {/* Tiny bubble tail */}
            <div 
              className="absolute -bottom-1 w-2.5 h-2.5 bg-[#FFFBF2] border-b-2 border-r-2 border-[#AEC6CF] rotate-45"
              style={{
                left: facing === 'right' ? '12px' : 'auto',
                right: facing === 'left' ? '12px' : 'auto',
              }}
            />
          </div>
        )}

        {/* Easter Egg Popup Speech Bubble with 2x2 Action Buttons Grid */}
        {isEasterEggOpen && (
          <div
            className="absolute p-3 font-pixel text-[#2D3436] z-50 pointer-events-auto border-2 border-[#2D3436] flex flex-col gap-2 cursor-default"
            style={{
              background: '#FFFBF2',
              boxShadow: '3px 4px 0 rgba(0,0,0,0.15)',
              bottom: isMobile ? '46px' : '66px',
              left: facing === 'right' ? '12px' : 'auto',
              right: facing === 'left' ? '12px' : 'auto',
              width: '180px',
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="space-y-1.5 text-[7px] leading-normal text-left font-bold">
              <p className="text-[#B19CD9] text-[8.5px]">Hi! I'm Shakthi 👋</p>
              <p>• AI Engineer</p>
              <p>• Data Scientist</p>
              <p>• Machine Learning Developer</p>
            </div>
            <div className="flex flex-col gap-1.5 mt-1 border-t border-black/10 pt-2 flex-shrink-0">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProjects();
                    setIsEasterEggOpen(false);
                  }}
                  className="py-1 border-2 border-[#2D3436] bg-[#B2F2BB] hover:brightness-95 text-[5.5px] font-bold text-center active:scale-95 transition-transform"
                  style={{ boxShadow: '1px 1.5px 0 #2D3436' }}
                >
                  View Projects
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('resume');
                    setIsEasterEggOpen(false);
                  }}
                  className="py-1 border-2 border-[#2D3436] bg-[#E6E6FA] hover:brightness-95 text-[5.5px] font-bold text-center active:scale-95 transition-transform"
                  style={{ boxShadow: '1px 1.5px 0 #2D3436' }}
                >
                  View Resume
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('contact');
                    setIsEasterEggOpen(false);
                  }}
                  className="py-1 border-2 border-[#2D3436] bg-[#FFD1DC] hover:brightness-95 text-[5.5px] font-bold text-center active:scale-95 transition-transform"
                  style={{ boxShadow: '1px 1.5px 0 #2D3436' }}
                >
                  Contact Me
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const teleportPos = pickSafeTeleportCoordinate();
                    setPos(teleportPos);
                    setTarget(teleportPos);
                    setDuration(0);
                    setState('idle');
                    setIsEasterEggOpen(false);
                    
                    const surpriseQuotes = [
                      "Oops! Teleporting! ⚡",
                      "Wheee! 🌀",
                      "Got me! 😄",
                      "Hyperspace travel! 🚀"
                    ];
                    setBubbleText(surpriseQuotes[Math.floor(Math.random() * surpriseQuotes.length)]);

                    setTimeout(() => {
                      setBubbleText(null);
                      // Resume roaming
                      const nextT = pickNextTarget(teleportPos);
                      setTarget(nextT);
                      setDuration(getTravelDuration(teleportPos.x, teleportPos.y, nextT.x, nextT.y));
                      setState('walking');
                      setFacing(nextT.x > teleportPos.x ? 'right' : 'left');
                    }, 2000);
                  }}
                  className="py-1 border-2 border-[#2D3436] bg-[#FFEAA7] hover:brightness-95 text-[5.5px] font-bold text-center active:scale-95 transition-transform"
                  style={{ boxShadow: '1px 1.5px 0 #2D3436' }}
                >
                  Random Teleport
                </button>
              </div>
            </div>
            {/* Tiny bubble tail */}
            <div 
              className="absolute -bottom-1.5 w-2.5 h-2.5 bg-[#FFFBF2] border-b-2 border-r-2 border-[#2D3436] rotate-45"
              style={{
                left: facing === 'right' ? '12px' : 'auto',
                right: facing === 'left' ? '12px' : 'auto',
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
