import "server-only"

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOCS_PATH = path.join(process.cwd(), "content/docs");

export type Doc = {
    slug: string
    filename: string
    title: string
    order: number
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

export function getAllDocs() {
    const files = fs.readdirSync(DOCS_PATH)

    return files.map((file) => {
        const fullPath = path.join(DOCS_PATH, file)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        // remove extension
        const rawName = file.replace(/\.mdx?$/, "")

        return {
            // URL-safe route
            slug: 
                data.slug ||
                createSlug(rawName),

            // original filename
            filename: file,

            // UI title
            title:
                data.title ||
                rawName,

            order:
                data.order || 999,

            content,

            frontmatter: data, 
        }
    })
}

export function getDocSlugs() {
    /*
    return fs.readdirSync(DOCS_PATH).map((file) =>
        file.replace(/\.mdx$/, "")
    )
    */
   return getAllDocs().map((doc) => ({
    slug: doc.slug,
   }))
}

export function getDocBySlug(slug: string) {
    /*
    const fullPath = path.join(DOCS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
        content,
        frontmatter: data,
        slug
    };
    */

    return getAllDocs().find((doc) => doc.slug == slug)
}