// app/[slug]/page.jsx

import { getPageWithACF, getNewsPostsByIdsServer, getCompanyPostsByIds, getTeamPostsByIds } from '@/lib/wp-server';
import PageBuilder from '@/components/PageBuilder';

// ✅ SEO generation
export async function generateMetadata({ params }) {
  const { slug } = params;
  const page = await getPageWithACF(slug);

  const title = page?.title || 'Page Not Found | CA';
  const description =
    page?.acf?.seo_description || 'Explore this page from Collaboration Art for insights and updates.';
  const ogImage = page?.acf?.seo_image?.url || 'https://gomowebb.com/ca-poc/wp-content/uploads/2025/07/default-og.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function DynamicPage({ params }) {
  const slug = params?.slug;
  const data = await getPageWithACF(slug);

  if (!data) {
    return <>
             <div className="h-[64px] w-full bg-black"></div> 
             <div className="text-center pt-40 font-bold text-9xl mb-5">404</div>
             <div className="text-center pb-40 font-bold text-5xl text-red-500">Page not found</div>
          </>;
  }

  const builder = [...(data.acf?.ca_builder || [])];

  for (const block of builder) {
    const layout = block.acf_fc_layout;

    let ids = [];

    switch (layout) {
      case 'news_section':
        ids = (block.latest_News || []).map((item) => item.ID || item.id);
        block.newsPosts = await getNewsPostsByIdsServer(ids);
        break;

      case 'group_section':
        ids = (block.group_cards_block || []).map((item) => item.ID || item.id);
        block.group_cards_block = await getCompanyPostsByIds(ids);
        break;

      case 'founders_section':
        ids = (block.group_cards_block || []).map((item) => item.ID || item.id);
        block.group_cards_block = await getTeamPostsByIds(ids);
        break;

      case 'board_of_directors':
        ids = (block.select_board_memebers || []).map((item) => item.ID || item.id); // ✅ FIXED
        block.group_cards_block = await getTeamPostsByIds(ids); // mapped to group_cards_block
        break;

      case 'ceo_section':
        ids = (block.select_ceo || []).map((item) => item.ID || item.id); // ✅ FIXED
        block.group_cards_block = await getTeamPostsByIds(ids); // mapped to group_cards_block
        break;

      case 'inner_founder_section':
        ids = (block.select_founder || []).map((item) => item.ID || item.id); // ✅ FIXED
        block.group_cards_block = await getTeamPostsByIds(ids); // mapped to group_cards_block
        break; 
      case 'contact_ceo_section':
        ids = (block.contact_ceo || []).map((item) => item.ID || item.id); // ✅ FIXED
        block.group_cards_block = await getTeamPostsByIds(ids); // mapped to group_cards_block
        break; 
    }
  }

  return (
    <main className="pages">
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
      <PageBuilder blocks={builder} />
    </main>
  );
}
