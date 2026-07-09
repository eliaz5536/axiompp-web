import createMDX from "@next/mdx"

const withMDX = createMDX({
    extension: /\.mdx?$/,
})

const nextConfig = {
    output: 'export',
    // When deploying to a GitHub project Pages site, set basePath and assetPrefix
    // to the repository name so static assets and client JS load correctly.
    basePath: '/axiompp-web',
    assetPrefix: '/axiompp-web',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)