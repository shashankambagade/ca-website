'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function GroupSection({ data }) {
  const companies = data.group_cards_block || [];

  return (
    <section  data-theme="light" className="theme-sync bg-white text-black py-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Subheading + Heading */}
        <div className="mb-10">
          <div className="flex items-center mb-5">
            <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2"></span>
            <span className="font-merriweather italic text-[18px] leading-[28px] ">
              {data.sub_heading}
            </span>
          </div>
          <h2
            className="font-raleway font-medium text-[56px] leading-[66px] "
            dangerouslySetInnerHTML={{ __html: data.heading }}
          />
        </div>

        {/* Short Text + CTA */}
        <div className="flex flex-col items-start max-w-[460px] mx-auto mb-20">
          {data.short_text && !data.short_text.includes('<p') ? (
            <p
              className="font-raleway text-[16px] leading-[24px] mb-6"
              dangerouslySetInnerHTML={{ __html: data.short_text }}
            />
          ) : (
            <div
              className="font-raleway text-[16px] leading-[24px] mb-6"
              dangerouslySetInnerHTML={{ __html: data.short_text }}
            />
          )}

          {data.cta_text && data.cta_url && (
            <Link
              href={data.cta_url}
              className="inline-block font-merriweather italic text-[16px] leading-[24px] text-white bg-[#F34835] rounded-[31px] min-w-[180px] px-8 py-[14px] text-center hover:opacity-90 transition"
            >
              {data.cta_text}
            </Link>
          )}
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.slice(0, 8).map((item) => {
            const featureImage =
              item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/window.svg';
            const logo = item.acf?.agency_logo?.url;
            const excerpt = item.excerpt?.rendered || '';
            const title = item.title?.rendered;
            const slug = item.slug;

            return (
              <Link
                key={item.id}
                href={`/agency/${slug}`}
                className="relative group p-1 rounded-sm block overflow-hidden shadow-md border border-[#D9DAE3] hover:border-[#0165FC] h-[365px]"
              >
                {/* Background Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={featureImage}
                    alt={title}

                    fill
                    className="object-cover object-center rounded-sm transition-transform duration-300"
                  />

                  {/* Logo - bottom left */}
                  {logo && (
                    <div className="absolute bottom-4 left-4  shadow-md z-10">
                      <Image
                        src={logo}
                        alt={`${title} logo`}
                        width={120}
                        height={40}
                        className="object-contain rounded-sm h-10 w-auto"
                      />
                    </div>
                  )}
                </div>

                {/* Hover Blue Overlay */}
                <div className="absolute m-1 rounded-sm top-[-10px] h-[355px] left-0 bg-[#0165FC] text-white p-6 transform -translate-y-full group-hover:translate-y-0 transition-transform  group-hover:left-0 group-hover:top-[0px] duration-500 ease-in-out z-20 flex flex-col justify-between">
                  <div>
                     {logo && (
                    <div className="mb-5 z-10">
                      <Image
                        src={logo}
                        alt={`${title} logo`}
                        width={120}
                        height={40}
                        className="object-contain rounded-sm h-8 w-auto"
                      />
                    </div>
                  )}
                    <div
                      className="text-[15px] font-raleway leading-[24px] line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                  </div>
                  <div className="w-10 h-10 bg-white p-2 rounded-full mt-4 flex items-center justify-center">
                    <Image
                      src="/card-right-arrow-icon.svg"
                      alt="Arrow"
                      width={16}
                      height={16}
                      className=""
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
