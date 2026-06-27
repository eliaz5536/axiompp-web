import DocsSidebar from "@/components/DocsSidebar";
import { getAllDocs } from "@/lib/docs";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const docs = getAllDocs()

    return (
        <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.08),_transparent_28%)]">
            <DocsSidebar docs={docs} />

            <main className="flex-1 bg-transparent">
                {children}
            </main>
        </div>
    )
}