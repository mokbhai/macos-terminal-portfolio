import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface DockIconProps {
  children: React.ReactNode;
  mouseX: any;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function DockIcon({
  children,
  mouseX,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const widthSync = useMotionValue(56);

  // Add icon size motion value
  const iconSizeSync = useMotionValue(45);

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Spring animation for icon size
  const iconSize = useSpring(iconSizeSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  useEffect(() => {
    const updateDistance = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distanceFromMouse = Math.abs(
        mouseX.get() - (rect.left + rect.width / 2)
      );
      distance.set(distanceFromMouse);

      // Calculate sizes based on mouse distance
      const containerSize = Math.max(56, 80 - distanceFromMouse / 5);
      const iconSizeValue = Math.max(45, 65 - distanceFromMouse / 5);

      widthSync.set(containerSize);
      iconSizeSync.set(iconSizeValue);
    };

    const unsubscribe = mouseX.onChange(updateDistance);
    return () => unsubscribe();
  }, [mouseX]);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="relative aspect-square flex items-center justify-center"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={{
          width: iconSize,
          height: iconSize,
        }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
