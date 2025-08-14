'use client';

import { motion } from 'framer-motion';

export default function CTASection({ data }) {
  const { heading_scroller, short_text, cta_text, cta_url } = data;
  const originalLength = Array.isArray(heading_scroller) ? heading_scroller.length : 0;
  // Duplicate scroller content for seamless loop
  const scrollerItems = [...(heading_scroller || []), ...(heading_scroller || [])];

  return (
    <section className="bg-black text-white py-20 px-0 text-center overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex space-x-10 items-center text-4xl lg:text-8xl font-semibold whitespace-nowrap min-w-max"
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          }}
        >
          {scrollerItems.map((item, index) => {
            const isDuplicate = index >= originalLength;
            return (
              <div key={index} className="flex items-center" aria-hidden={isDuplicate}>
                {item.image?.url && (
                  <img
                    src={item.image.url}
                    alt={isDuplicate ? '' : (item.image.alt || 'icon')}
                    className="h-15 w-15 mr-[35px] animate-rotatePause  object-contain"
                  />
                )}
                <span>{item.scrolling_text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {short_text && (
        <div
          className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto px-6 mt-8"
          dangerouslySetInnerHTML={{ __html: short_text }}
        />
      )}
    <div className="flex  cta-big justify-center">
  {cta_text && cta_url && (
    <a
      href={cta_url}
      className="group inline-flex justify-center items-center gap-2 w-[400px] px-6 py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-full overflow-hidden relative font-[var(--font-merriweather)] italic text-[16px] leading-[24px] tracking-[0.64px]"
    >
      <span className="flex items-center leading-[24px]">
        {cta_text.split('').map((char, i) => (
          <span key={i} className="relative block overflow-hidden h-[24px]">
            <span
              className="block transition-all duration-500 ease-in-out group-hover:-translate-y-full group-hover:rotate-x-90 word-top"
              style={{ transitionDelay: `${i * 10}ms` }}
            >
               {char === ' ' ? '\u00A0' : char}
            </span>
            <span
              className="block absolute top-full left-0 w-full transition-all duration-500 ease-in-out group-hover:translate-y-[-100%] group-hover:rotate-x-0 word-bottom"
              style={{ transitionDelay: `${i * 10}ms` }}
            >
               {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </span>

      <img
        src="/cta-arrow-icon.svg"
        alt="Arrow Right"
        className="h-6 w-6"
      />
    </a>
  )}
</div>

    </section>
  );
}
