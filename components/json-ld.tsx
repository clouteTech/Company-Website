/** Renders one JSON-LD block. "<" is escaped so the data can never close the script tag. */
export function JsonLd({ graph }: { graph: object | object[] }) {
  const data = { "@context": "https://schema.org", "@graph": Array.isArray(graph) ? graph : [graph] };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
