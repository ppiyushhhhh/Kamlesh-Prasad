import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Exact coordinates for instant dot tracking (0ms latency)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Only enable custom cursor on desktop devices with fine pointer
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const checkIsDesktop = () => setIsDesktop(mediaQuery.matches);
    checkIsDesktop();

    if (!mediaQuery.matches) return;

    // Add cursor-none class to html body for desktop
    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, input[type="submit"], input[type="button"], select, [role="button"], .cursor-pointer, summary'
      );
      setIsHovered(Boolean(interactiveEl));

      const textEl = target.closest(
        'input[type="text"], input[type="email"], input[type="search"], input[type="tel"], textarea, [contenteditable="true"]'
      );
      setIsTextInput(Boolean(textEl));
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isDesktop) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-white shadow-xs"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: "difference",
      }}
      animate={{
        width: isTextInput ? 2 : isHovered ? 20 : 8,
        height: isTextInput ? 16 : isHovered ? 20 : 8,
        borderRadius: isTextInput ? 1 : 9999,
        opacity: !isVisible ? 0 : isTextInput ? 0.4 : 1,
        scale: isClicked ? 0.75 : 1,
      }}
      transition={{
        width: { duration: 0.18, ease: "easeOut" },
        height: { duration: 0.18, ease: "easeOut" },
        scale: { duration: 0.12, ease: "easeOut" },
        opacity: { duration: 0.15 },
      }}
    />
  );
};

export default CustomCursor;
