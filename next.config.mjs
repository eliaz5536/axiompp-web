import createMDX from "@next/mdx"

const withMDX = createMDX({
    extension: /\.mdx?$/,
})

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)