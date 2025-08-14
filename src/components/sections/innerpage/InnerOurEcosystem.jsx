//components/sections/innerpage/InnerOurEcosystem.jsx 

'use client';

export default function InnerOurEcosystem({ data }) {
  const { sub_heading, heading, offering = [] } = data;

  return (
    <section data-theme="dark" className="theme-sync bg-black py-20 px-4 md:px-12 lg:px-20 font-raleway">
      <div className="max-w-screen-xl mx-auto space-y-16">

        {/* Row 1: Subheading + Heading */}
        <div className="space-y-6 max-w-5xl">
          {/* Subheading */}
          {sub_heading && (
            <div className="flex items-center gap-3">
              <div className="w-[6px] h-[6px] bg-[#F34835] rounded-full" />
              <span className="font-merriweather italic text-[18px] leading-[28px]">
                {sub_heading}
              </span>
            </div>
          )}

          {/* Heading */}
          {heading && (
            <h2
              className="text-[40px] sm:text-[56px] leading-[66px] font-medium font-raleway"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          )}
        </div>

        {/* Row 2: Spacer + Offerings */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:basis-1/4 hidden lg:block" />

          <div className="lg:basis-3/4 w-full space-y-12">
            {offering.map((item, i) => {
              const number = `${(i + 1).toString().padStart(2, '0')}`;

              return (
                <div key={i} className="border-b relative border-white/20 pb-8">
                  <div className="text-[#F34835] absolute text-sm normal-nums font-normal mb-1" style={{ fontFamily: 'HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    {number}
                  </div>
                  <h3 className="pl-[25px] font-raleway text-[32px] font-normal mb-5">
                    {item.our_offerings}
                  </h3>
                  <p className="text-gray-300 pl-[25px] max-w-[420px] text-[16px] leading-[24px] max-w-3xl">
                    {item.short_text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
