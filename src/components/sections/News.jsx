import Link from 'next/link';
import Image from 'next/image';
import { getNewsPosts } from '@/lib/wp-server';

export default async function NewsSection({ data }) {
  let posts = data.newsPosts || [];
  if (posts.length === 0) {
    posts = await getNewsPosts(3);
  }

  return (
    <section  data-theme="light" className="theme-sync bg-white text-black py-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Subheading + Heading (Row 1) */}
        <div className="mb-10">
          <div className="flex items-center mb-5">
            <span className="w-[5px] h-[5px] bg-[#F34835] rounded-full mr-2"></span>
            <span className="font-merriweather italic text-[18px] leading-[28px] text-black">
              {data.sub_heading}
            </span>
          </div>

          <h2
            className="font-raleway font-medium text-[56px] leading-[66px] text-black"
            dangerouslySetInnerHTML={{ __html: data.heading }}
          />
        </div>

        {/* Short Text + CTA (Row 2 - Centered) */}
        <div className="flex flex-col items-start max-w-[460px] mx-auto mb-20">
          {data.short_text && (
            <p
              className="font-raleway text-[16px] leading-[24px] text-black mb-6"
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

        {/* News Cards */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const featureImage =
                post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/window.svg';

              return (
                <div
                  key={post.id || post.ID}
                  className="bg-white border border-gray-300 rounded overflow-hidden w-full max-w-[411px] h-[495px] hover:shadow-md transition"
                >
                  <div className="m-1 relative h-64 bg-gray-200">
                    <Link href={`/news/${post.slug || post.ID}`}>
                      <Image
                        src={featureImage}
                        alt={post.title?.rendered || post.post_title}
                        fill
                        className="object-cover rounded-[4px]"
                      />
                    </Link>
                  </div>

                  <div className="p-8 flex flex-col justify-between h-[calc(100%-16rem)]">
                    <Link href={`/news/${post.slug || post.ID}`}>
                      <h3
                        className="text-black font-raleway text-2xl font-medium mb-6 leading-tight"
                        style={{ height: '94px' }}
                        dangerouslySetInnerHTML={{
                          __html: post.title?.rendered || post.post_title,
                        }}
                      />
                    </Link>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm text-gray-500">5 min read</span>
                        <span className="text-black font-raleway font-semibold text-sm">Press release</span>
                      </div>

                      <Link href={`/news/${post.slug || post.ID}`}>
                        <div
                          className="flex items-center justify-center"
                          style={{
                            background: '#FF3C20',
                            color: 'white',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                          }}
                        >
                          <Image src="/arrow-right.svg" alt="Read more" width={16} height={16} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-red-500 mt-10">⚠️ No news posts found.</div>
        )}
      </div>
    </section>
  );
}
