'use client';

import Link from 'next/link';
import useRevealOnce from '@/hooks/useRevealOnce';
import '@/styles/reveal-animation.css';

export default function AgencyContent({ data }) {
  const { sub_heading, heading, content_section, content_section_column_ii, cta_text, cta_url } = data;
  const headingRef = useRevealOnce();
  

  return (
    <section data-theme="dark" className="theme-sync bg-black text-white py-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Subheading + Heading */}
        <div className="mb-16">
          <div className="flex items-center mb-5">
            <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2"></span>
            <span className="font-merriweather italic text-[18px] leading-[28px] text-white">
              {sub_heading}
            </span>
          </div>
          <h2
            ref={headingRef}
            className="font-raleway font-medium text-[56px] leading-[66px] text-white reveal-once"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>

        {/* Row 1: 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div /> {/* 1/3 Empty */}
          <div>
            {content_section && (
              <div
                className="font-raleway text-[16px] leading-[24px] text-gray-300"
                dangerouslySetInnerHTML={{ __html: content_section }}
              />
            )}
          </div>
          <div>
            {content_section_column_ii && (
              <div
                className="font-raleway text-[16px] leading-[24px] text-gray-300"
                dangerouslySetInnerHTML={{ __html: content_section_column_ii }}
              />
            )}
          </div>
        </div>

        {/* Row 2: CTA */}
        {cta_text && cta_url && (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div /> {/* 1/3 Empty */}
            <div className="lg:col-span-2">
              <Link
                href={cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-merriweather italic text-[16px] leading-[24px] text-black bg-[#FFBF00] rounded-[31px] min-w-[180px] px-8 py-[14px] text-center hover:opacity-90 transition"
              >
                {cta_text}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
