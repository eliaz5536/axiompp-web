import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { notFound } from "next/navigation";
import { getAllDocs, getDocBySlug, getDocSlugs } from "@/lib/docs";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,
  defaultLang: "plaintext",

  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", values: " " }]
    }
  },

  showLineNumbers: true,
}

export async function generateStaticParams() {
  return getDocSlugs()
}

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 className="mt-10 mb-6 text-3xl font-semibold text-white" {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 className="mt-8 mb-4 text-2xl font-semibold text-slate-100" {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 className="mt-6 mb-3 text-xl font-semibold text-slate-100" {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="mb-4 text-base leading-8 text-slate-300" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => <a className="font-medium text-cyan-400 underline underline-offset-4 transition-colors hover:text-cyan-300" {...props} />,
  code: (props: ComponentPropsWithoutRef<"code">) => <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-slate-200" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-300" {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-300" {...props} />,
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="leading-8 text-slate-300" {...props} />,
  pre: (props: ComponentPropsWithoutRef<"pre">) => <pre className="overflow-x-auto rounded-2xl bg-[#0d1117] p-4" {...props} />,
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const doc = getDocBySlug(slug)

  if (!doc) return notFound()

  const relatedDocs = getAllDocs()
    .filter((item) => item.category === doc.category && item.slug !== doc.slug)
    .slice(0, 3)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[1.75rem] border border-slate-800/70 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {doc.category}
          </span>
          <span className="text-sm text-slate-400">{doc.summary}</span>
        </div>

        <h1 className="mt-5 text-4xl font-semibold text-white">{doc.title}</h1>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/documentation" className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-white">
            Back to docs home
          </Link>
          {relatedDocs[0] ? (
            <Link href={`/documentation/${relatedDocs[0].slug}`} className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:border-cyan-400/40 hover:text-cyan-200">
              Explore {relatedDocs[0].title}
            </Link>
          ) : null}
        </div>
      </div>

      <article className="rounded-[1.75rem] border border-slate-800/70 bg-slate-950/80 p-8 shadow-lg shadow-slate-950/10">
        <MDXRemote
          source={doc.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeKatex],
            },
          }}
        />
      </article>
    </div>
  )
}