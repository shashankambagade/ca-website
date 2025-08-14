'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ImpactSection({ data }) {
  const stats = data.impact_content || [];
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <section data-theme="dark" className="theme-sync bg-black text-white py-20 px-4 md:px-12 lg:px-20 font-raleway">
      <div className="max-w-screen-xl mx-auto">
        {/* Subheading */}
        {data.sub_heading && (
          <div className="flex items-center mb-6">
            <span className="w-[6px] h-[6px] bg-[#F34835] rounded-full mr-3"></span>
            <span className="font-merriweather italic text-[18px] leading-[28px]">
              {data.sub_heading}
            </span>
          </div>
        )}

        {/* Heading */}
        {data.heading && (
          <motion.h2
            className="text-[40px] sm:text-[56px] leading-tight font-medium mb-12 max-w-5xl impact-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            dangerouslySetInnerHTML={{ __html: data.heading }}
          />
        )}

        {/* Stats List */}
        {stats.length > 0 && (
          <div className="space-y-12">
            {stats.map((item, i) => {
              const isActive = hoverIndex === null || hoverIndex === i;
              return (
                <div
                  key={i}
                  className={`transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-40'
                  }`}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="flex flex-col lg:flex-row items-end justify-between gap-12 border-t border-white/20 pt-10">
                    {/* Heading (e.g., $8B, 85K+) */}
                    <div>
                      <div
                        className={`text-[80px] md:text-[120px] font-normal impact-style leading-[1] ${
                          i % 2 === 0 ? 'text-[#F34835]' : 'text-[#A6382F]'
                        } impact-heading`}
                        dangerouslySetInnerHTML={{ __html: item.heading }}
                      />
                    </div>

                    {/* Description */}
                    <div className="max-w-[300px] text-gray-300 text-sm leading-relaxed">
                      <p>{item.short_text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
