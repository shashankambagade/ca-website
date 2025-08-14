'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function InnerHeroSection({ data }) {
  const bgImage = data.bg_image?.url || '';
  const heading = data.heading || '';

  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallax + subtle Ken Burns for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  // Word-by-word reveal
  const words = String(heading).trim().split(/\s+/);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const word = {
    hidden: { y: '110%', opacity: 0 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[700px] flex items-end justify-start overflow-hidden bg-black text-white"
    >
      {/* Background (with motion wrapper for transforms) */}
      {bgImage && (
        <motion.div
          className="absolute inset-0"
          style={
            prefersReducedMotion
              ? {}
              : {
                  y,
                  scale,
                }
          }
          aria-hidden="true"
        >
          <Image
            src={bgImage}
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      )}

      {/* Gradient overlay fade-in */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Heading */}
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pb-12 lg:pb-10">
        {/* Accessible, animated word-by-word reveal */}
        <motion.h1
          className="font-raleway font-semibold text-[48px] sm:text-[96px] lg:text-[200px] leading-[1.2] tracking-[-1px] lg:tracking-p[-2.8px] flex flex-wrap"
          variants={container}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.6 }}
          aria-label={heading}
        >
          {words.map((w, i) => (
            <span key={i} className="mr-3 overflow-hidden will-change-transform">
              <motion.span className="inline-block" variants={word}>
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>
      </div>
    </section>
  );
}
