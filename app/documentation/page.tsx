import Link from "next/link";
import { getDocCategories } from "@/lib/docs";

const featuredCategories = ["Getting Started", "User Guide", "API Reference", "Contributor's Guide"];

export default function DocumentationPage() {
  const categories = getDocCategories();
  const featured = categories.filter((category) => featuredCategories.includes(category.title));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] border border-slate-800/70 bg-slate-950/80 shadow-2xl shadow-slate-950/20">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">Axiom++ Docs</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              A structured guide from first principles to advanced contribution.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Browse the library by intent: start quickly, study the user guide, inspect the API surface, or contribute to the project. Mathematical notation and conventions are woven into the experience so the documentation stays both practical and rigorous.
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-6">
            <h2 className="text-lg font-semibold text-white">Explore by journey</h2>
            <div className="mt-4 space-y-3">
              <Link
                href="/documentation/getting-started"
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400/50 hover:text-white"
              >
                <span>Begin with installation and setup</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/documentation/mathematical-notation"
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400/50 hover:text-white"
              >
                <span>Read the notation guide</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/documentation/python-api"
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 hover:border-cyan-400/50 hover:text-white"
              >
                <span>Inspect the Python API</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featured.map((category) => (
          <div key={category.title} className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">{category.title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{category.description}</p>
            <div className="mt-4 text-sm text-slate-400">
              {category.docs[0] ? (
                <Link href={`/documentation/${category.docs[0].slug}`} className="font-medium text-slate-200 hover:text-cyan-300">
                  Start with {category.docs[0].title}
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-5">
        {featured.map((category) => (
          <div key={category.title} className="rounded-[1.75rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">{category.title}</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{category.description}</h2>
              </div>
              <span className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-sm text-slate-400">
                {category.docs.length} pages
              </span>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {category.docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/documentation/${doc.slug}`}
                  className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                    <span className="text-sm text-cyan-400">Read →</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{doc.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}