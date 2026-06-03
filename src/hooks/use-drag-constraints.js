import { useState, useEffect, useRef } from 'react';

export default function useDragConstraints(visible, minimized) {
  const windowRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    if (!visible || minimized) return;

    const updateConstraints = () => {
      if (!windowRef.current) return;
      const element = windowRef.current;
      
      // Temporarily clear transform to get layout coordinates on the screen
      const prevTransform = element.style.transform;
      element.style.transform = 'none';
      const rect = element.getBoundingClientRect();
      element.style.transform = prevTransform;

      // Allow dragging off screen horizontally as long as at least 80px remains visible.
      // Allow dragging vertically up to y=0 (cannot drag title bar above top screen edge).
      // Allow dragging vertically down so title bar remains on screen (bottom offset keeps top 40px visible).
      setConstraints({
        left: 80 - rect.left - rect.width,
        right: window.innerWidth - 80 - rect.left,
        top: 0 - rect.top,
        bottom: window.innerHeight - 40 - rect.top
      });
    };

    updateConstraints();
    // Use an animation frame to let React finish rendering/positioning changes
    const rId = requestAnimationFrame(updateConstraints);
    window.addEventListener('resize', updateConstraints);
    
    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener('resize', updateConstraints);
    };
  }, [visible, minimized]);

  return { windowRef, constraints };
}
