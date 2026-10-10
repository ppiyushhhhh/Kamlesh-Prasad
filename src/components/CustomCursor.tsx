import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Exact coordinates for instant dot tracking (0 latency)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth elastic spring for the luxury follower ring
  const springConfig = { damping: 26, stiffness: 320, mass: 0.55 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on desktop devices with fine pointer (mouse)
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

      // Check if hovering over interactive or text elements
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
    <>
      {/* Outer Follower Ring - Monochromatic Platinum with mix-blend-mode: difference */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          width: isTextInput ? 18 : isHovered ? 52 : 34,
          height: isTextInput ? 18 : isHovered ? 52 : 34,
          opacity: !isVisible ? 0 : isTextInput ? 0.35 : 1,
          scale: isClicked ? 0.8 : isHovered ? 1.15 : 1,
          backgroundColor: isHovered
            ? "rgba(255, 255, 255, 0.22)"
            : "rgba(255, 255, 255, 0.05)",
          borderWidth: isHovered ? "1.5px" : "1px",
          borderColor: isHovered
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.55)",
        }}
        transition={{
          width: { duration: 0.2, ease: "easeOut" },
          height: { duration: 0.2, ease: "easeOut" },
          scale: { duration: 0.15, ease: "easeOut" },
          opacity: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
        }}
      />

      {/* Inner Precision Dot - Instant tracking (0ms lag) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-white"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          width: isTextInput ? 2 : isHovered ? 6 : 5,
          height: isTextInput ? 14 : isHovered ? 6 : 5,
          borderRadius: isTextInput ? 1 : 9999,
          opacity: !isVisible ? 0 : 1,
          scale: isClicked ? 0.6 : 1,
        }}
        transition={{
          width: { duration: 0.15 },
          height: { duration: 0.15 },
          scale: { duration: 0.1 },
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
};

export default CustomCursor;
