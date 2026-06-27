import { Footer } from '@/components/Footer';

import type { ComponentPropsWithoutRef } from 'react';

import { notFound } from "next/navigation"
import { getDocBySlug, getDocSlugs } from '@/lib/docs';
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,

  defaultLang: "plaintext",

  onVisitLine(node: any) {
    // ensures empty lines still render properly
    if (node.children.length === 0) {
      node.children = [{ type: "text", values: " " }]
    }
  },

  showLineNumbers: true,
}

// import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  /*
  return getDocSlugs().map((slug) => ({
    slug,
  }))
    */
   return getDocSlugs()
}

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 className="text-3xl font-bold mt-10 mb-6" {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 className="text-2xl font-semibold mt-8 mb-4" {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="text-base leading-7 text-white mb-4" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => <a className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" {...props} />,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    /*
    <code className="bg-gray-100 text-sm px-1.5 py-0.5 rounded font-mono" {...props} />
    */
    <code {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="text-base leading-7 text-white" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className="rounded-lg p-4 overflow-x-auto bg-[#0d1117]" {...props} />
  ),
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const doc = getDocBySlug(slug)

  if(!doc) return notFound()

  return (
    <article className="prose max-w-3xl mx-auto py-10">
      <h1>{doc.title}</h1>

      <MDXRemote 
        source={doc.content} 
        components={components} 
        options={{
          mdxOptions: {
            rehypePlugins: [
              [rehypePrettyCode, prettyCodeOptions]
            ],
          }
        }}
        />
    </article>
  )
}