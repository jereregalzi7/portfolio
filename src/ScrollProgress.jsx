import { motion, useScroll, useSpring } from "framer-motion";
export default function ScrollProgress(){
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 origin-left bg-blue-600 z-[60]" />;
}
