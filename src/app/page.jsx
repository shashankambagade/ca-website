// ca-website/src/app/page.jsx

import { getPageWithACF, getNewsPostsByIdsServer, getCompanyPostsByIds, getTeamPostsByIds } from '@/lib/wp-server';
import PageBuilder from '@/components/PageBuilder';

// ✅ SEO metadata generation
export async function generateMetadata() {
  const data = await getPageWithACF('home');

  const title = data?.title || 'Home | CA';
  const description = data?.acf?.seo_description || 'Discover Collaboration Art’s vision, team, and impact.';
  const ogImage = data?.acf?.seo_image?.url || '../favicon.png';

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

// ✅ Home page rendering
export default async function Home() {
  const data = await getPageWithACF('home');

  if (!data) return <div className="p-10 text-red-500">Page not found</div>;

  const builder = [...(data.acf?.ca_builder || [])];

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
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
      <PageBuilder blocks={builder} />
    </main>
  );
}
