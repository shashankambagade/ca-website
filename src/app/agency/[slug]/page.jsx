import { getCompanyBySlug } from '@/lib/wp-server';
import { getPageWithACF, getNewsPostsByIdsServer, getCompanyPostsByIds, getTeamPostsByIds } from '@/lib/wp-server';
import PageBuilder from '@/components/PageBuilder';

// ✅ SEO meta tags for Headless Next.js
export async function generateMetadata({ params }) {
  const company = await getCompanyBySlug(params.slug);

  if (!company) {
    return {
      title: 'Company Not Found | CA',
      description: 'This company profile could not be found.',
    };
  }

  const title = company.title?.rendered || 'Company | CA';
  const description =
    company.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() ||
    'Explore the company details on CA website.';
  const featureImage =
    company._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
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

// ✅ Main dynamic Company page
export default async function CompanyPage({ params }) {
  const company = await getCompanyBySlug(params.slug);

    if (!company) {
    return <>
             <div className="h-[64px] w-full bg-black"></div> 
             <div className="text-center pt-40 font-bold text-9xl mb-5">404</div>
             <div className="text-center pb-40 font-bold text-5xl text-red-500">Page not found</div>
          </>;
  }

  const builder = company.acf?.ca_builder || [];
  
  for (const block of builder) {
    const layout = block.acf_fc_layout;

    if (['news_section', 'group_section', 'founders_section'].includes(layout)) {
      const ids = (block.latest_News || block.group_cards_block || []).map((item) => item.ID || item.id);

      switch (layout) {
        case 'news_section':
          block.newsPosts = await getNewsPostsByIdsServer(ids);
          break;
        case 'group_section':
          block.group_cards_block = await getCompanyPostsByIds(ids);
          break;
        case 'founders_section':
          block.group_cards_block = await getTeamPostsByIds(ids);
          break;
      }
    }
  }

  return (
    <main>
      <PageBuilder blocks={builder} />
    </main>
  );
}
