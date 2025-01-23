// /** @type {import('next').NextConfig} */
// export const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "damutgjolteetqxwnscf.supabase.co",
//         pathname: "/storage/v1/object/public/cabins-images/**",
//         // protocol: "https",
//         // hostname: "damutgjolteetqxwnscf.supabase.co",
//       },
//     ],
//   },
//   experimental: {
//     optimizeCss: false, // Disable CSS minification
//   },
// };

// // https://damutgjolteetqxwnscf.supabase.co/storage/v1/object/public/cabins-images/cabin-008.jpg

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "damutgjolteetqxwnscf.supabase.co",
        pathname: "/storage/v1/object/public/cabins-images/**",
      },
    ],
  },
  // experimental: {
  //   optimizeCss: false, // Disable CSS minification
  // },

  // experimental: {
  //   appDir: true,
  //   fontLoaders: [
  //     { loader: "@next/font/google", options: { subsets: ["latin"] } },
  //   ],
  // },
};

export default nextConfig;
