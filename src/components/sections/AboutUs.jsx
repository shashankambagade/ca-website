'use client';

import Link from 'next/link';
import Image from 'next/image';
import useRevealOnce from '@/hooks/useRevealOnce';
import '@/styles/reveal-animation.css';

export default function AboutSection({ data }) {
  const imageUrl = data.image?.url || '';
  const headingRef = useRevealOnce();

  return (
    <section data-theme="dark" className="theme-sync bg-black text-white py-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="lg:basis-[12%] flex items-center">
            <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2"></span>
            <span className="font-merriweather italic text-[16px] lg:text-[18px] leading-[24px] lg:leading-[28px]">
              {data.sub_heading}
            </span>
          </div>

          <div
            ref={headingRef}
            className="lg:basis-[80%] font-raleway font-normal text-[32px] leading-[42px] lg:text-[56px] lg:leading-[66px] text-white lg:indent-[110px] reveal-once"
            dangerouslySetInnerHTML={{ __html: data.heading }}
          />
          <div className="hidden lg:block lg:basis-[5%]" />
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col items-start max-w-[400px] space-y-6">
            <div
              className="font-raleway text-[16px] leading-[24px]"
              dangerouslySetInnerHTML={{ __html: data.short_text }}
            />

            {data.cta_text && data.cta_url && (
              <Link
                href={data.cta_url}
                className="inline-block font-merriweather italic text-[16px] leading-[24px] text-black bg-[#FFBF00] rounded-[31px] min-w-[180px] px-8 py-[14px] text-center hover:opacity-90 transition"
              >
                {data.cta_text}
              </Link>
            )}
          </div>
        </div>

        {imageUrl && (
          <div className="w-full">
            <Image
              src={imageUrl}
              alt="About section image"
              width={1920}
              height={600}
              className="w-full h-auto rounded-sm object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
