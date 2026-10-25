"use client"

import { motion, type Variants } from "framer-motion"

export default function Signature() {
  const quoteWords = [
    "My",
    "work",
    "is",
    "done",
    "when",
    "you",
    "no",
    "longer",
    "need",
    "me!",
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="signature" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-800/80">
      {/* Background radial glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-primary/10 rounded-full filter blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 text-center max-w-4xl">
        {/* Section Index */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-primary font-bold mb-8"
        >
          Signature / 01
        </motion.p>

        {/* Animated Quote */}
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
        >
          {quoteWords.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordVariants}
              className={`inline-block mr-2.5 sm:mr-3.5 ${
                word === "done" || word === "me!"
                  ? "text-teal-gradient"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Attribution */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-slate-400 font-medium tracking-wide flex items-center justify-center gap-2"
        >
          <span>— Hafiz Abdul Rehman</span>
        </motion.p>
      </div>
    </section>
  )
}
