'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HeroSection({ data }) {
  const bgImageUrl = data.bg_image?.url;
  const bgVideoUrl = data.bg_video?.url;

  const [showCTA, setShowCTA] = useState(false);

  // Show CTA after heading animation completes
  useEffect(() => {
    const delay = 1000 + (data.big_heading?.length || 0) * 100;
    const timer = setTimeout(() => setShowCTA(true), delay);
    return () => clearTimeout(timer);
  }, [data.big_heading]);

  return (
    <section className="relative min-h-[700px] pb-20 flex items-center bg-black text-white overflow-hidden">
      {/* Background Image */}
      {bgImageUrl && (
        <Image
          src={bgImageUrl}
          alt="Background"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
      )}

      {/* Background Video */}
      {bgVideoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        >
          <source src={bgVideoUrl} type="video/mp4" />
        </video>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mt-30 mx-auto px-6 w-full">
        <div className="max-w-[500px]">
          {/* Heading */}
          {data.heading && (
            <p className="text-2xl md:text-4xl font-raleway font-medium mb-3 leading-snug">
              {data.heading}
            </p>
          )}

          {/* Short Heading: plain text vs HTML */}
          {data.short_heading ? (
            /<\w+/.test(data.short_heading) ? (
              <div
                className="text-lg text-gray-300 mb-10 leading-relaxed font-raleway"
                dangerouslySetInnerHTML={{ __html: data.short_heading }}
              />
            ) : (
              <p className="text-lg text-gray-300 mb-10 leading-relaxed font-raleway">
                {data.short_heading}
              </p>
            )
          ) : null}

        </div>

        {/* Big Heading */}
        {data.big_heading && (
          <h1 className="flex flex-wrap gap-[2px] text-[120px] lg:text-[240px] xl:text-[390px] font-bold font-raleway leading-[1] tracking-tight overflow-hidden w-full">
            {data.big_heading.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block opacity-0 animate-fade-up"
                style={{
                  animationDelay: `${1000 + i * 100}ms`,
                  animationFillMode: 'forwards',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        )}

        {/* CTA Button */}
        {showCTA && data.cta_text && data.cta_url && (
  <div className="mt-10 flex cta-big justify-end">
    <a
      href={data.cta_url}
      className="group inline-flex justify-center items-center gap-2 w-[400px] px-6 py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-full overflow-hidden relative font-[var(--font-merriweather)] italic text-[16px] leading-[24px] tracking-[0.64px]"
    >
      <span className="flex items-center leading-[24px]">
        {data.cta_text.split('').map((char, i) => (
          <span key={i} className="relative block overflow-hidden h-[24px]">
            <span
              className="block transition-all duration-500 ease-in-out group-hover:-translate-y-full group-hover:rotate-x-90"
              style={{ transitionDelay: `${i * 10}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
            <span
              className="block absolute top-full left-0 w-full transition-all duration-500 ease-in-out group-hover:translate-y-[-100%]"
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
        className="h-6 w-6"
      />
    </a>
  </div>
)}


      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fade-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
