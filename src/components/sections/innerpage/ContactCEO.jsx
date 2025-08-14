'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ContactCeo({ data }) {
  const members = data.group_cards_block || [];

  if (!Array.isArray(members) || members.length === 0) {
    return <div className="text-red-500 text-center">⚠️ No CEO profiles found.</div>;
  }

  return (
    <section data-theme="light" className="theme-sync bg-white text-black py-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Subheading + Heading */}
        <div className="mb-10">
          {data.sub_heading && (
            <div className="flex items-center mb-5">
              <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2"></span>
              <span className="font-merriweather italic text-[18px] leading-[28px] text-black">
                {data.sub_heading}
              </span>
            </div>
          )}
          {data.heading && (
            <h2
              className="font-raleway font-medium text-[56px] leading-[66px] text-black"
              dangerouslySetInnerHTML={{ __html: data.heading }}
            />
          )}
        </div>

        {/* CEO Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => {
            const image =
              member._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
              'https://via.placeholder.com/400x300?text=No+Image';
            const name = member.title?.rendered || '';
            const position = member.acf?.position || '';
            const company = member.acf?.company || '';
            const linkedin = member.acf?.linkedin || '';
            const email = member.acf?.email || '';
            const phone = member.acf?.contact_no || '';


            return (
              <div
                key={member.id}
                className="relative p-1 rounded-sm block overflow-hidden shadow-md border border-[#D9DAE3] "
              >
                {/* Image */}
                <div className="relative w-full">
                  <Image
                    src={image}
                    alt={name}
                    height={200}
                    width={400}
                                       
                    className="object-cover  h-[300px] rounded-sm"
                  />
                </div>

                {/* Bottom Info */}
                <div className=" bottom-0 left-0 w-full bg-white px-4 py-3 z-10">
                  <h3 className="text-black text-2xl font-semibold">{name}</h3>
                  <p className="text-sm font-semibold text-[#ADAEB5] mb-4">
                    {position} {company && `| ${company}`}
                  </p>
        
                  {phone && (
                    <Link
                        href={`tel:${phone}`}
                        target="_blank"
                         
                        className="text-sm font-helvetica font-normal text-black"
                    >{phone}
                    </Link>
                    )}
                    <br />
                    {email && (
                    <Link
                        href={`mailto:${email}`}
                        target="_blank"
                      
                        className="text-sm email-link font-semibold text-black"
                    >{email}
                    </Link>
                    )}               

                  {/* LinkedIn icon (only if provided) */}
                  {linkedin && (
                    <Link
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 right-3 w-6 h-6 bg-[#F34835] text-white text-sm font-bold rounded-full flex items-center justify-center"
                    >
                        <Image
                        src="/linkedin-icon-red.svg"
                        alt="LinkedIn"
                        width={24}
                        height={24}
                        />
                    </Link>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
