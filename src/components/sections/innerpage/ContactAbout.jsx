// components/sections/innerpage/ContactAbout.jsx
'use client';

import useRevealOnce from '@/hooks/useRevealOnce';
import '@/styles/reveal-animation.css';

export default function ContactAboutSection({ data }) {
  const rows = Array.isArray(data.contact_details) ? data.contact_details : [];
  const headingRef = useRevealOnce();

  return (
    <section data-theme="dark" className="theme-sync bg-black py-20 px-4 md:px-12 lg:px-20 font-raleway">
      <div className="max-w-screen-xl mx-auto contact-about">

        {/* Row 1: Subheading (≈12%) + Big Heading (≈80%) */}
        <div className="flex flex-col lg:flex-row items-start gap-6 mb-10">
          {/* Subheading */}
          <div className="lg:basis-[12%] flex items-start lg:items-center">
            <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2 mt-[6px] lg:mt-0" />
            {!!data.sub_heading && (
              <span className="font-merriweather italic text-[16px] lg:text-[18px] leading-[24px] lg:leading-[28px]">
                {data.sub_heading}
              </span>
            )}
          </div>

          {/* Big Heading */}
          <div
            ref={headingRef}
            className="lg:basis-[80%] text-white font-raleway font-medium text-[32px] leading-[42px] lg:text-[56px] lg:leading-[66px] lg:indent-[110px] reveal-once"
            dangerouslySetInnerHTML={{ __html: data.heading || '' }}
          />

          {/* Spacer */}
          <div className="hidden lg:block lg:basis-[5%]" />
        </div>

          {/* Top border before the list (matches design) */}
        {rows.length > 0 && <div className="" />}

        {/* Rows: strict 30% / 70% with ONLY separators between rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6 py-8 ${
              i !== 0 ? 'border-t border-white/20' : ''
            }`}
          >
            {/* 30% label in Merriweather */}
            <div className="flex items-start">
              <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2 mt-[6px]" />
              <span className="font-merriweather italic text-[16px] lg:text-[18px] leading-[24px] lg:leading-[28px]">
                {row.sub_heading}
              </span>
            </div>

            {/* 70% content in Raleway @ 32px */}
            <div
              className="font-raleway text-[18px] leading-[28px] lg:text-[32px] lg:leading-[44px]"
              dangerouslySetInnerHTML={{ __html: row.deatils || '' }}
            />
          </div>
        ))}

  
      </div>
    </section>
  );
}
