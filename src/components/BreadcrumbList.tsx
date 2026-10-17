// Renders a BreadcrumbList JSON-LD block for SEO.
// Visual breadcrumbs are intentionally NOT rendered — the spec asks only
// for the schema. Add UI breadcrumbs in a separate task if needed.

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbList({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
