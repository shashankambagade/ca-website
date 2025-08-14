import { getNewsBySlug } from '@/lib/wp-server';
import Image from 'next/image';
import Link from 'next/link';

// ✅ SEO function
export async function generateMetadata({ params }) {
  const post = await getNewsBySlug(params.slug);

  if (!post) {
    return {
      title: 'News not found | CA',
      description: 'This news article could not be found.',
    };
  }

  const title = post.title?.rendered || 'News';
  const description =
    post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() ||
    'Read the latest updates from CA.';
  const featureImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://gomowebb.com/ca-poc/wp-content/uploads/2025/07/default-og.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: featureImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featureImage],
    },
  };
}

// ✅ Page component
export default async function SingleNewsPage({ params }) {
  const { slug } = params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    return <div className="p-10 text-red-500">News article not found.</div>;
  }

  const featureImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback.jpg';
    const author = post._embedded?.author?.[0]?.name || 'Unknown Author';

  return (
    <> 
    <div className="h-[64px] w-full bg-black"></div> 
    <main className="max-w-screen-md mx-auto px-5 py-20">
       
      <div className="mb-8">
        <Link href="/news" className="text-caRed underline underline-offset-2">
          ← Back to News
        </Link>
      </div>

      <h1
        className="text-4xl font-bold mb-4 font-raleway"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div className="text-gray-600 text-sm mb-8">
        Published on {new Date(post.date).toLocaleDateString()} by <b><em> {author}</em></b>
      </div>


      {featureImage && (
        <Image
          src={featureImage}
          alt={post.title.rendered}
          width={800}
          height={400}
          className="rounded-lg mb-8"
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </main>
    </>
    
  );
}
