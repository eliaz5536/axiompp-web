"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
// import { getAllDocs } from "@/lib/docs"

type Doc = {
    slug: string
    title: string
}

export default function DocsSidebar({
    docs,
}: {
    docs: Doc[]
}) {
    const pathname = usePathname()
    // const docs = getAllDocs().sort((a, b) => a.order - b.order)

    return (
        <aside className="w-64 border-r p-4 h-screen overflow-y-auto">
            <h2 className="font-bold mb-4 text-lg">Documentation</h2>

            <nav className="space-y-2">
                {docs.map((doc) => {
                    const href = `/documentation/${doc.slug}`
                    const active = pathname === href

                    return (
                        <Link
                            key={doc.slug}
                            href={href}
                            className={`block px-2 py-1 rounded text-sm transition ${
                                active
                                    ? "bg-gray-600 font-semibold"
                                    : "hover:bg-gray-800"
                            }`}
                        >
                            {doc.title}
                        </Link>
                        )
                    })}
            </nav>
        </aside>
    )
}