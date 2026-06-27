import "server-only"

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOCS_PATH = path.join(process.cwd(), "content/docs");

const CATEGORY_INFO: Record<string, { description: string; order: number }> = {
    "Getting Started": {
        description: "Install, orient yourself, and make your first calculations.",
        order: 1,
    },
    "User Guide": {
        description: "Learn the concepts, workflows, and examples behind the library.",
        order: 2,
    },
    "API Reference": {
        description: "Inspect the public interfaces for C++ and Python usage.",
        order: 3,
    },
    "Contributor's Guide": {
        description: "Understand how to contribute, extend, and maintain the project.",
        order: 4,
    },
};

export type Doc = {
    slug: string
    filename: string
    title: string
    order: number
    category: string
    summary: string
    content: string
    frontmatter: Record<string, any>
}

function createSlug(name: string) {
    return name
        .toLowerCase()

        // programming language fixes
        .replace(/\+\+/g, "pp")
        .replace(/#/g, "sharp")

        // remove invalid URL chars
        .replace(/[^\w\s-]/g, "")

        // spaces -> hyphens
        .replace(/\s+/g, "-")
}

function inferCategory(frontmatter: Record<string, any>, rawName: string, slug: string) {
    if (typeof frontmatter.category === "string" && frontmatter.category.trim()) {
        return frontmatter.category.trim();
    }

    if (["introduction", "getting-started", "installation"].includes(slug)) {
        return "Getting Started";
    }

    if (["python-api", "c-api", "cpp-api", "api-reference"].includes(slug)) {
        return "API Reference";
    }

    if (["contributing", "contribution"].includes(slug)) {
        return "Contributor's Guide";
    }

    if (["mathematical-notation", "references", "license"].includes(slug)) {
        return "User Guide";
    }

    if (rawName.toLowerCase().includes("api")) {
        return "API Reference";
    }

    return "User Guide";
}

function inferSummary(frontmatter: Record<string, any>, title: string) {
    if (typeof frontmatter.description === "string" && frontmatter.description.trim()) {
        return frontmatter.description.trim();
    }

    return `Explore ${title} in the Axiom++ documentation.`;
}

export function getAllDocs() {
    const files = fs.readdirSync(DOCS_PATH)

    return files
        .map((file) => {
            const fullPath = path.join(DOCS_PATH, file)
            const fileContents = fs.readFileSync(fullPath, "utf8")
            const { data, content } = matter(fileContents)

            const rawName = file.replace(/\.mdx?$/, "")
            const slug = data.slug || createSlug(rawName)

            return {
                slug,
                filename: file,
                title: data.title || rawName,
                order: data.order || 999,
                category: inferCategory(data, rawName, slug),
                summary: inferSummary(data, data.title || rawName),
                content,
                frontmatter: data,
            }
        })
        .sort((a, b) => a.order - b.order)
}

export function getDocCategories() {
    const docs = getAllDocs()
    const grouped = new Map<string, { title: string; description: string; docs: Doc[] }>()

    docs.forEach((doc) => {
        const existing = grouped.get(doc.category) || {
            title: doc.category,
            description: CATEGORY_INFO[doc.category]?.description || "Additional documentation for Axiom++.",
            docs: [],
        }

        existing.docs.push(doc)
        grouped.set(doc.category, existing)
    })

    return Array.from(grouped.values()).sort((a, b) => {
        const first = CATEGORY_INFO[a.title]?.order ?? 99
        const second = CATEGORY_INFO[b.title]?.order ?? 99
        return first - second
    })
}

export function getDocSlugs() {
    return getAllDocs().map((doc) => ({
        slug: doc.slug,
    }))
}

export function getDocBySlug(slug: string) {
    return getAllDocs().find((doc) => doc.slug === slug)
}