// wp-server.js

const API_BASE = 'https://gomowebb.com/ca-poc/wp-json';

// 🧱 Pages with ACF
export async function getPageWithACF(slug) {
  const res = await fetch(`${API_BASE}/wp/v2/pages?slug=${slug}`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  const [page] = data;

  if (!page) return null;

  return {
    id: page.id,
    slug: page.slug,
    title: page.title?.rendered,
    content: page.content?.rendered,
    acf: page.acf || {},
    lang: page.lang,
    translations: page.translations,
  };
}

// 📂 News & Press CPT
export async function getNewsPosts(limit = 3) {
  const res = await fetch(`${API_BASE}/wp/v2/news-press?per_page=${limit}&_embed`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

// 📁 Single News Post
export async function getNewsBySlug(slug) {
  const res = await fetch(`${API_BASE}/wp/v2/news-press?slug=${slug}&_embed`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data[0] || null;
}

export async function getSingleNewsPostById(id) {
  const res = await fetch(`https://gomowebb.com/ca-poc/wp-json/wp/v2/news-press/${id}?_embed`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch news post');

  return res.json();
}

export async function getNewsPostsByIds(ids = []) {
  const requests = ids.map(id =>
    fetch(`https://gomowebb.com/ca-poc/wp-json/wp/v2/news-press/${id}?_embed`).then(res => res.json())
  );
  return Promise.all(requests);
}

export async function getNewsPostsByIdsServer(ids = []) {
  const requests = ids.map(id =>
    fetch(`https://gomowebb.com/ca-poc/wp-json/wp/v2/news-press/${id}?_embed`).then(res => res.json())
  );
  return Promise.all(requests);
}

// 🍔 Menus
export async function getMenus() {
  const res = await fetch(`${API_BASE}/myroutes/v1/menus`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

// 🦶 Footer Widgets
export async function getFooterWidgets() {
  const res = await fetch(`${API_BASE}/myroutes/v1/footer-widgets`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

// 📁 Companies CPT
export async function getCompanyBySlug(slug) {
  const res = await fetch(`https://gomowebb.com/ca-poc/wp-json/wp/v2/companies?slug=${slug}&_embed`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data[0] || null;
}

export async function getCompanyPostsByIds(ids = []) {
  const requests = ids.map((id) =>
    fetch(`https://gomowebb.com/ca-poc/wp-json/wp/v2/companies/${id}?_embed`).then((res) =>
      res.json()
    )
  );
  return Promise.all(requests);
}

export async function getTeamPostsByIds(ids = []) {
  if (!Array.isArray(ids)) return [];

  const requests = ids.map((id) => {
    if (!id) return Promise.resolve(null);

    return fetch(`${API_BASE}/wp/v2/team/${id}?_embed`)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null);
  });

  const results = await Promise.all(requests);

  // Only return valid responses
  return results.filter((item) => item && item.id);
}

// Optional: If you're using getbodPostsByIds somewhere else
export const getbodPostsByIds = getTeamPostsByIds;