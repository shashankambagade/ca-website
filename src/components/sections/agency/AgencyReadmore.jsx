'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AgencyReadmore({ data }) {
  const { sub_heading, heading, content_section, readmore_content } = data;
  const [expanded, setExpanded] = useState(false);

  return (
    <section data-theme="dark" className="theme-sync bg-black text-white py-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Subheading + Heading */}
        <div className="mb-10">
          <div className="flex items-center mb-5">
            <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2"></span>
            <span className="font-merriweather italic text-[18px] leading-[28px]">
              {sub_heading}
            </span>
          </div>
          <h2
            className="font-raleway font-medium text-[56px] leading-[66px]"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>

        {/* Content + Readmore */}
        <div className="flex flex-col items-start max-w-[900px] ml-auto space-y-6">
          {content_section && (
            <div
              className="font-raleway text-[16px] leading-[24px]"
              dangerouslySetInnerHTML={{ __html: content_section }}
            />
          )}

          {expanded && readmore_content && (
            <div
              className="font-raleway text-[16px] leading-[24px] text-gray-300"
              dangerouslySetInnerHTML={{ __html: readmore_content }}
            />
          )}

          {readmore_content && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 inline-block font-merriweather italic text-[16px] leading-[24px] text-black bg-[#FFBF00] rounded-[31px] min-w-[180px] px-8 py-[14px] text-center hover:opacity-90 transition"
            >
              {expanded ? 'Show Less' : 'Learn more'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
