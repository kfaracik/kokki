import { FAQ, PRODUCTS, type FaqItem, type Product } from "./data";

const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

type ApiSpec = { label?: string; value?: string; highlight?: boolean };
type ApiProduct = {
  _id: string;
  slug?: string;
  name?: string;
  tag?: string;
  description?: string;
  image?: string;
  specs?: ApiSpec[];
};
type ApiFaq = { _id: string; question?: string; answer?: string };

export async function getProducts(): Promise<Product[]> {
  if (!base) return PRODUCTS;
  try {
    const res = await fetch(`${base}/api/v1/products`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return PRODUCTS;
    const data = (await res.json()) as { products?: ApiProduct[] };
    const products = (data.products || [])
      .filter((p) => p.name)
      .map((p) => ({
        id: p._id,
        slug: p.slug || p._id,
        name: p.name || "",
        tag: p.tag || "",
        description: p.description || "",
        image: p.image || "",
        specs: (p.specs || [])
          .filter((s) => s.label && s.value)
          .map((s) => ({
            label: s.label || "",
            value: s.value || "",
            highlight: Boolean(s.highlight),
          })),
      }));
    return products.length ? products : PRODUCTS;
  } catch {
    return PRODUCTS;
  }
}

export async function getFaq(): Promise<FaqItem[]> {
  if (!base) return FAQ;
  try {
    const res = await fetch(`${base}/api/v1/faq`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return FAQ;
    const data = (await res.json()) as { faq?: ApiFaq[] };
    const faq = (data.faq || [])
      .filter((f) => f.question && f.answer)
      .map((f) => ({
        id: f._id,
        question: f.question || "",
        answer: f.answer || "",
      }));
    return faq.length ? faq : FAQ;
  } catch {
    return FAQ;
  }
}
