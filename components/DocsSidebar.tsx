"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type Doc = {
    slug: string
    title: string
    category: string
}

export default function DocsSidebar({
    docs,
}: {
    docs: Doc[]
}) {
    const pathname = usePathname()

    const groupedDocs = docs.reduce<Record<string, Doc[]>>((acc, doc) => {
        if (!acc[doc.category]) {
            acc[doc.category] = []
        }

        acc[doc.category].push(doc)
        return acc
    }, {})

    return (
        <aside className="sticky top-0 hidden min-h-screen w-72 shrink-0 border-r border-slate-800/70 bg-slate-950/70 px-5 py-7 backdrop-blur lg:flex lg:flex-col lg:overflow-y-auto">
            <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-400">Reference</p>
                <h2 className="mt-2 text-lg font-semibold text-white">Documentation</h2>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                    Move from onboarding to implementation and contributions without losing context.
                </p>
            </div>

            <nav className="space-y-5">
                {Object.entries(groupedDocs).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                            {category}
                        </h3>
                        <div className="space-y-1">
                            {items.map((doc) => {
                                const href = `/documentation/${doc.slug}`
                                const active = pathname === href

                                return (
                                    <Link
                                        key={doc.slug}
                                        href={href}
                                        className={`block rounded-xl px-3 py-2 text-sm transition ${
                                            active
                                                ? "bg-cyan-500/15 text-cyan-300"
                                                : "text-slate-300 hover:bg-slate-900 hover:text-white"
                                        }`}
                                    >
                                        {doc.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    )
}