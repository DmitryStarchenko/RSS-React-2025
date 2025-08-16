import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import RedirectHandler from './redirectHandler';
import './global.css';

export const metadata: Metadata = {
  title: 'Pokemon',
  description: 'Pokemon search',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <RedirectHandler />
        <NextIntlClientProvider>
          <div id="root">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
