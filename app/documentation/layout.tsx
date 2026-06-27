import DocsSidebar from "@/components/DocsSidebar";
import { getAllDocs } from "@/lib/docs";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const docs = getAllDocs().sort(
        (a, b) => a.order - b.order
    )

    return (
        <div className="flex">
            <DocsSidebar docs={docs}/>

            <main className="flex-1 p-10">
                {children}
            </main>
        </div>
    )
}