import Link from "next/link";
// import { getDocSlugs, getDocBySlug } from "@/lib/docs";
import { getAllDocs } from "@/lib/docs";

export default function DocumentationPage() {
  // const slugs = getDocSlugs();
  // const docs = getAllDocs();
  const docs = getAllDocs().sort(
    (a, b) => a.order - b.order
  );

  /*
  const docs = slugs.flatMap((slug) => {
    const doc = getDocBySlug(slug)

    if(!doc) return []

    return [{
      slug,
      title: doc.frontmatter.title || slug,
      filename: doc.filename,
    }]
  })
  */

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>

      <ul className="space-y-4">
        {docs.map((doc) => (
          <li key={doc.slug}>
           <Link href={`/documentation/${doc.slug}`}>
            {doc.title}
           </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}