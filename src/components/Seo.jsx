// components/Seo.jsx
import { Helmet } from 'react-helmet-async';

export default function Seo({ yoast }) {
  if (!yoast) return null;

  return (
    <Helmet>
      <title>{yoast.title}</title>
      <meta name="description" content={yoast.description} />
      <meta property="og:title" content={yoast.og_title} />
      <meta property="og:description" content={yoast.og_description} />
      <meta property="og:image" content={yoast.og_image?.[0]?.url} />
      <meta property="og:url" content={yoast.og_url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content={yoast.robots} />
      {/* Add other meta tags as needed */}
    </Helmet>
  );
}