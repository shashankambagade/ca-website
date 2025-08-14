'use client';
import Image from 'next/image';

export default function AgencyHero({ data }) {
  const { heading, short_heading, cta_text, cta_url, bg_image } = data;

  return (
    <>
    <section className="relative bg-black text-white pt-20 lg:pt-35 pb-10 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        {/* Text Content */}
        <div className="max-w-2xl mb-6">
          {heading && (
            <h1 className="text-[56px] md:text-[64px] leading-tight font-raleway font-medium mb-6">
              {heading}
            </h1>
          )}

          {short_heading && (
            <div
              className="text-base md:text-lg text-gray-300 leading-relaxed font-raleway mb-8"
              dangerouslySetInnerHTML={{ __html: short_heading }}
            />
          )}

          {/* CTA Button */}
          {cta_text && cta_url && (
            <div className='cta-big'>
            <a href={cta_url} target='_blank' rel="noopener noreferrer" className="group inline-flex justify-center items-center gap-2 w-[240px] px-6 py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-full overflow-hidden relative font-[var(--font-merriweather)] italic text-[16px] leading-[24px] tracking-[0.64px]">
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
        className="h-6 w-6" />
    </a></div>
          )}
        </div>
      </div>
    </section>
     {bg_image?.url && (
        <div className="w-full relative h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src={bg_image.url}
            alt={bg_image.alt || 'Agency Team'}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}
      </>
  );
}
