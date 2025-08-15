import type { Metadata } from 'next';
import RedirectHandler from './redirectHandler';

export const metadata: Metadata = {
  title: 'Pokemon',
  description: 'Pokemon search',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="body">
        <RedirectHandler />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
