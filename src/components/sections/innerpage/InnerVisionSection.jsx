// component/sections/innerpage/InnerVisionSection.jsx
'use client';

import Image from 'next/image';
import useRevealOnce from '@/hooks/useRevealOnce';
import '@/styles/reveal-animation.css'
import { motion, useReducedMotion } from 'framer-motion';


export default function InnerVisionSection({ data }) {
  const { sub_heading, heading, short_text, cta_text, cta_url, image, section_video } = data || {};
  const headingRef = useRevealOnce();  
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: prefersReducedMotion ? 0 : 0.08 * i, duration: 0.5, ease: 'easeOut' }
    })
  };

  const leftIn = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } }
  };

  const rightIn = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } }
  };

  return (
    <section data-theme="dark" className="theme-sync bg-black py-20 px-4 md:px-12 lg:px-20 font-raleway">
      <div className="max-w-screen-xl mx-auto space-y-12">
        {/* Row 1: Subheading + Heading */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {sub_heading && (
            <motion.div className="flex items-center gap-3" variants={fadeUp} custom={0}>
              <motion.span
                className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2 mt-[6px] lg:mt-0"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <span className="text-white font-merriweather italic text-sm">{sub_heading}</span>
            </motion.div>
          )}

          {heading && (
            <div
              ref={headingRef}
              className="text-[40px] sm:text-[56px] leading-tight font-medium text-white max-w-4xl reveal-once"
              variants={fadeUp}
              custom={1}
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          )}
        </motion.div>

        {/* Row 2: 1/3 + 2/3 layout */}
        <div className="flex flex-col lg:flex-row gap-[50px]">
          {/* Left Column (1/3) */}
          <motion.div
            className="lg:basis-1/3 space-y-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={leftIn}
          >
            {short_text && (
              <div
                className="text-base text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: short_text }}
              />
            )}

            {cta_text && cta_url && (
              <motion.a
                href={cta_url}
                className="group inline-flex items-center justify-center rounded-full font-[Merriweather] italic px-6 py-3 text-sm bg-[#FFBF00] text-black font-semibold hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#FFBF00]/60"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label={cta_text}
              >
                {/* letter-by-letter hover rise */}
                <span className="flex">
                  {cta_text.split('').map((ch, i) => (
                    <span
                      key={i}
                      className="relative inline-block overflow-hidden"
                      style={{ lineHeight: '1.5' }}
                    >
                      <span
                        className="inline-block transition-transform duration-300 group-hover:-translate-y-[110%]"
                        style={{ transitionDelay: `${i * 10}ms` }}
                      >
                        {ch === ' ' ? '\u00A0' : ch}
                      </span>
                      <span
                        className="absolute left-0 top-[110%] inline-block transition-transform duration-300 group-hover:-translate-y-[110%]"
                        style={{ transitionDelay: `${i * 10}ms` }}
                      >
                        {ch === ' ' ? '\u00A0' : ch}
                      </span>
                    </span>
                  ))}
                </span>
              </motion.a>
            )}

            {section_video?.url && (
              <motion.video
                autoPlay
                muted
                loop
                playsInline
                className="rounded-sm w-full mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <source src={section_video.url} type="video/mp4" />
              </motion.video>
            )}
          </motion.div>

          {/* Right Column (2/3) */}
          <motion.div
            className="lg:basis-2/3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={rightIn}
          >
            {image?.url && (
              <motion.div
                className="relative rounded-sm overflow-hidden"
                initial={{ scale: 1.04, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={image.url}
                  alt={image.alt || 'Vision Image'}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
