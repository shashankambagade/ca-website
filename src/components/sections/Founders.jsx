'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FoundersSection({ data }) {
  const founders = data.group_cards_block || [];
  const COLORS = ['#F34835', '#FFBF00', '#1FC363'];

  return (
    <>
      {/* Heading Section (unchanged) */}
      <section  data-theme="light" className="theme-sync bg-white text-black pt-20 px-4 md:px-12 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center mb-5">
              <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2"></span>
              <span className="font-merriweather italic text-[18px] leading-[28px] text-black">
                {data.sub_heading}
              </span>
            </div>
            <h2
              className="font-raleway font-medium text-[56px] leading-[66px] text-black"
              dangerouslySetInnerHTML={{ __html: data.heading }}
            />
          </div>

          <div className="flex flex-col items-start max-w-[460px] mx-auto mb-20">
          {data.short_text && (
            <p
              className="font-raleway text-[16px] leading-[24px] text-black mb-6"
              dangerouslySetInnerHTML={{ __html: data.short_text }}
            />
          )}
            {data.cta_text && data.cta_url && (
              <Link
                href={data.cta_url}
                className="inline-block font-merriweather italic text-[16px] leading-[24px] text-white bg-[#F34835] rounded-[31px] min-w-[180px] px-8 py-[14px] text-center hover:opacity-90 transition"
              >
                {data.cta_text}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Founder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {founders.slice(0, 3).map((founder, index) => {
          const color = COLORS[index % COLORS.length];
          const name = founder.title?.rendered || '';
          const image = founder._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
          const bio = founder.excerpt?.rendered || '';
          const linkedin = founder.acf?.linkedin;
          const position = founder.acf?.position;
          const company = founder.acf?.company;

          // STATIC wrapper (measurement target – never transformed)
          const measureRef = useRef(null);

          // Progress: when wrapper top goes from 90% → 10% of viewport
          const { scrollYProgress } = useScroll({
            target: measureRef,
            offset: ['start 90%', 'start 10%'],
          });

          // Map 0..1 → startY..0 (0, 80, 160 → 0)
          const startY = index * 80;
          const y = useTransform(scrollYProgress, [0, 1], [startY, 0]);

          return (
            <div key={founder.id} ref={measureRef}>
              {/* ANIMATED card (transform applied here) */}
              <motion.div
                style={{ y, willChange: 'transform', backgroundColor: color }}  // ← single style prop
                className="relative group overflow-hidden min-h-[550px] p-12 flex items-center justify-center"
              >
                {/* Default View */}
                <div className="relative">
                  {image && (
                    <div className="w-full relative mb-6">
                      <Image
                        src={image}
                        alt={name}
                        width={320}
                        height={430}
                        className="object-cover object-center rounded-sm"
                      />
                    </div>
                  )}
                  <h3 className="text-xl text-white font-raleway font-semibold mb-1">{name}</h3>
                  <p className="text-sm font-raleway text-white/90 flex items-center gap-1">
                    <span className="w-[6px] h-[6px] bg-white rounded-full inline-block"></span> {position}, {company}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 text-black p-12 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20 flex flex-col justify-between"
                  style={{ backgroundColor: color }}
                >
                  <div>
                    <h3 className="font-merriweather text-2xl font-semibold mb-2">{name}</h3>
                    <p className="text-sm font-raleway mb-2 uppercase">{position}, {company}</p>
                    <div className="text-[15px] font-raleway leading-[24px] text-black" dangerouslySetInnerHTML={{ __html: bio }} />
                  </div>
                  {linkedin && (
                    <div className="mt-4">
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:underline"
                      >
                        <Image src="/linkedin-icon-white.svg" alt="LinkedIn" width={42} height={42} />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </>
  );
}
