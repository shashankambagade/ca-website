'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';

export default function BoardOfDirectors({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const members = data.group_cards_block || [];

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Rebind Swiper navigation once refs are attached
  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  if (!Array.isArray(members) || members.length === 0) {
    return <div className="text-red-500 text-center">⚠️ No board members found.</div>;
  }

  // Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: prefersReducedMotion ? 0 : 0.05 * i, duration: 0.45, ease: 'easeOut' }
    })
  };

  const cardVariant = {
    rest: { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' },
    hover: {
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  return (
    <section data-theme="light" className="theme-sync bg-white py-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Subheading + Heading */}
        <motion.div
          className="mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="flex items-center mb-5" variants={fadeUp} custom={0}>
            <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2"></span>
            <span className="font-merriweather italic text-[18px] leading-[28px] ">
              {data.sub_heading}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-raleway font-medium text-[56px] leading-[66px] "
            dangerouslySetInnerHTML={{ __html: data.heading }}
          />
        </motion.div>

        {/* Short Text + CTA */}
        <motion.div
          className="flex flex-col items-start max-w-[460px] mx-auto mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="font-raleway text-[16px] leading-[24px]  mb-6"
            dangerouslySetInnerHTML={{ __html: data.short_text }}
          />
          <motion.div
            variants={fadeUp}
            custom={1}
            className="flex gap-4"
          >
            <button
              ref={prevRef}
              className="cursor-pointer w-12 h-12 flex justify-center items-center rounded-full border border-gray-300 bg-[#F34835] hover:scale-105 transition-transform"
              aria-label="Previous"
            >
              <Image src={"/arrow-right.svg"} alt="Previous" width={20} height={20} className="rotate-180" />
            </button>
            <button
              ref={nextRef}
              className="cursor-pointer w-12 h-12 flex justify-center items-center rounded-full bg-[#F34835] text-white hover:scale-105 transition-transform"
              aria-label="Next"
            >
              <Image src={"/arrow-right.svg"} alt="Next" width={20} height={20} />
            </button>
          </motion.div>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={() => setActiveIndex(null)} // reset open card when sliding
          loop={true}
          spaceBetween={30}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="overflow-visible !pb-10"
        >
          {members.map((member, index) => {
            const image =
              member._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
              'https://via.placeholder.com/400x300?text=No+Image';
            const name = member.title?.rendered || '';
            const position = member.acf?.position || '';
            const excerpt = member.excerpt?.rendered || '';

            const isActive = activeIndex === index;

            return (
              <SwiperSlide key={member.id ?? index} className="!h-auto">
                <motion.div
                  variants={cardVariant}
                  initial="rest"
                  whileHover={!isActive ? 'hover' : 'rest'}
                  animate="rest"
                  className="relative p-1 rounded-sm block overflow-hidden border border-[#D9DAE3] h-[365px] bg-white"
                >
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key="bio"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="h-full w-full bg-[#0165FC] text-white rounded-sm flex flex-col justify-between p-6 relative"
                      >
                        <div
                          className="text-[15px] font-raleway leading-[24px] line-clamp-6"
                          dangerouslySetInnerHTML={{ __html: excerpt }}
                        />
                        <button
                          onClick={() => setActiveIndex(null)}
                          className="absolute bottom-3 right-3 cursor-pointer  w-6 h-6 bg-[#F34835] text-white rounded-full mt-4 flex items-center justify-center"
                          aria-label="Close bio"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="photo"
                        initial={{ opacity: 0.001 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full h-full rounded-sm overflow-hidden"
                      >
                        {/* Background Image with subtle zoom on hover */}
                        <motion.div
                          className="absolute inset-0"
                          animate={{}}
                         // whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                        >
                          <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        </motion.div>

                        {/* Bottom Info */}
                        <motion.div
                          initial={{ y: 12, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                          className="absolute bottom-0 left-0 right-0 w-full bg-white  px-4 py-3 z-10"
                        >
                          <h3 className=" text-lg font-semibold">{name}</h3>
                          <p className="text-sm flex items-center gap-2 font-semibold ">
                            <span className="w-2 h-2 bg-[#F34835] rounded-full inline-block"></span>
                            {position}
                          </p>

                          {/* + button */}
                          <button
                            onClick={() => setActiveIndex(index)}
                            className="absolute bottom-3 right-3 cursor-pointer w-6 h-6 bg-[#F34835] text-white text-lg font-bold rounded-full flex items-center justify-center"
                            aria-label={`Open bio for ${name}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
