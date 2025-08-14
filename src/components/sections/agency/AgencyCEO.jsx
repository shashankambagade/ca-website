'use client';

import Image from 'next/image';

export default function AgencyCeo({ data }) {
  const { sub_heading, heading, short_heading, image } = data;

  return (
    <section data-theme="light" className="theme-sync bg-white py-20 px-4 md:px-12 lg:px-20 font-raleway">
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

        {/* 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-[40px] items-start">
          {/* Col 1: Spacer */}
          <div className="hidden md:block md:col-span-4" />

          {/* Col 2: Content */}
          <div className="md:col-span-4 space-y-4">
            {short_heading && (
              <div
                className="text-[16px] leading-[24px] font-raleway [&_h4]:mb-5 [&_p]:mb-3 [&_h4]:text-[32px] [&_h4]:leading-[32px] [&_h4]:font-semibold"
                dangerouslySetInnerHTML={{ __html: short_heading }}
              />
            )}
          </div>

          {/* Col 3: Image */}
          {image?.url && (
            <div className="md:col-span-4 mt-8 md:mt-0">
              <Image
                src={image.url}
                alt={image.alt || 'CEO'}
                width={image.width || 400}
                height={image.height || 400}
                className="rounded-sm object-cover w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
