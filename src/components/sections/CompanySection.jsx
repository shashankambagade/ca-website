import Image from 'next/image';

export default function CompanySection({ data }) {
  const companies = data.companyPosts || [];

  return (
    <section  data-theme="light"
  className="theme-sync bg-white py-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {companies.map((company) => {
          const logoUrl = company.acf?.agency_logo?.url;
          const title = company.title?.rendered || '';
          const excerpt = company.excerpt?.rendered || '';
          const image = company._embedded?.['wp:featuredmedia']?.[0]?.source_url;

          return (
            <div key={company.id} className="text-center">
              {logoUrl ? (
                <Image src={logoUrl} alt={title} width={150} height={80} className="mx-auto mb-4 object-contain" />
              ) : image ? (
                <Image src={image} alt={title} width={150} height={80} className="mx-auto mb-4 object-contain" />
              ) : null}

              <h3 className="text-lg font-semibold">{title}</h3>
              <div
                className="text-sm text-gray-500 mt-2"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
 