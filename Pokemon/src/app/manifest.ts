import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pokemon',
    short_name: 'Pokemon',
    description: 'Pokemon search',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/public/assets/Pikachu.webp',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
