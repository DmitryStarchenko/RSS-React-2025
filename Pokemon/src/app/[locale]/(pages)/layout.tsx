import Footer from '../../../widgets/footer/footer';
import Header from '../../../widgets/header/header';
import { ClientProviders } from './Page';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <Header />
      {children}
      <Footer />
    </ClientProviders>
  );
}
