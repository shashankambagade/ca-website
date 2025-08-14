'use client';

import { useState } from 'react';
import SmartImage from '@/components/sections/elements/SmartImage'; 

export default function AgencyOffering({ data }) {
  const { sub_heading, heading, offering, team_image } = data || {};
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section data-theme="light" className="theme-sync bg-white pb-20 px-4 md:px-12 lg:px-20 text-black font-raleway">
      <div className="max-w-screen-xl mx-auto">
        
        {/* Subheading + Heading */}
        <div className="mb-10">
          <div className="flex items-center mb-5">
            <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2"></span>
            <span className="font-merriweather italic text-[18px] leading-[28px] text-black">
              {sub_heading}
            </span>
          </div>
          <h2
            className="font-raleway font-medium text-[56px] leading-[66px] text-black"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>

        {/* Grid Row: 40% blank + 60% repeater */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-[40px] items-start">
          {/* Spacer Column (40%) */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* Offerings List Column (60%) */}
          <div className="lg:col-span-9 space-y-6">
            {offering?.map((item, index) => {
              const isActive = hoveredIndex === index;

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 transition-all duration-300 my-10 cursor-pointer ${
                    isActive ? 'opacity-100' : hoveredIndex === null ? 'opacity-100' : 'opacity-40'
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Number */}
                  <span className="text-[#F34835] font-semibold w-8 text-[14px] relative left-5">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Offering Text */}
                  <span className="text-[36px] md:text-[64px] underline underline-offset-[18px] decoration-2 font-raleway font-normal mt-[34px]">
                    {item.our_offerings}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Image with animation */}
        {team_image?.url && (
          <div className="md:col-span-4 mt-8 md:mt-0">
            <SmartImage
              src={team_image.url}
              alt={team_image.alt || 'CEO'}
              width={team_image.width || 400}
              height={team_image.height || 400}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-sm object-cover w-full h-auto mt-20"
              effect="reveal"        // 'zoom' | 'fade' | 'reveal'
              hoverScale={true}
              rounded="rounded-sm"
              fit="object-cover"
              placeholder="empty"    // set to 'blur' if you have blurDataURL
              // blurDataURL={team_image.blurDataURL}
            />
          </div>
        )}
      </div>
    </section>
  );
}
