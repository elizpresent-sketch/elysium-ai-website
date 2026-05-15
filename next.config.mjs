/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve AVIF first (smallest), fall back to WebP
    formats: ["image/avif", "image/webp"],

    // Cache optimised images for 1 year on the CDN / ISR cache
    minimumCacheTTL: 31536000,

    // Trim the default srcset — remove 2048/3840 which are never needed for this site.
    // Generates: 390 (iPhone), 640, 750, 828, 1080, 1200, 1920 (max full-bleed).
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],

    // Keep default imageSizes for fill/fixed layouts (16–384)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
