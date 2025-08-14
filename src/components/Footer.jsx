import { getFooterWidgets } from '@/lib/wp-server';

export default async function Footer() {
  const {
    footer_left,
    quick_links,
    headquarter,
    locations,
    copyrights,
  } = await getFooterWidgets();

  return (
    <footer className="pt-20 pb-10 px-4 md:px-12 lg:px-20 text-black" style={{ backgroundColor: '#f7f8f9' }}>
      <div className="max-w-screen-xl mx-auto text-base">

        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Let's Collab block from WP */}
          <div dangerouslySetInnerHTML={{ __html: footer_left }} />

          {/* Right: 3-column layout */}
          <div className="grid grid-cols-3 gap-8">
            <div dangerouslySetInnerHTML={{ __html: quick_links }} />
            <div dangerouslySetInnerHTML={{ __html: headquarter }} />
            <div dangerouslySetInnerHTML={{ __html: locations }} />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className=" mt-10 text-sm copyrights">
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12' dangerouslySetInnerHTML={{ __html: copyrights }} />
        </div>
      </div>
    </footer>
  );
}
