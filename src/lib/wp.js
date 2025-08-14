'use client';

import { useEffect, useState } from 'react';
import { getPageWithACF } from '@/lib/wp';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPageWithACF('home').then(setData).catch(() => setData(false));
  }, []);

  if (data === false) return <div className="p-10 text-red-500">Page not found</div>;
  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </main>
  );
}
