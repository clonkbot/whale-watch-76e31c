import { motion } from 'framer-motion';

export function ScanLines() {
  return (
    <>
      {/* Static scan lines overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(34, 211, 238, 0.5) 2px,
            rgba(34, 211, 238, 0.5) 4px
          )`,
        }}
      />

      {/* Moving scan line */}
      <motion.div
        className="fixed left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none z-50"
        initial={{ top: '-2px' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)`,
        }}
      />

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30 pointer-events-none z-30" />
      <div className="fixed top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/30 pointer-events-none z-30" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-500/30 pointer-events-none z-30" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none z-30" />

      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </>
  );
}
