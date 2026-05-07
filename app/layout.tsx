import type { Metadata } from 'next';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { BackToTop } from '@/components/ui/BackToTop';
import './globals.css'; // Global styles

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

const SITE_URL =
  process.env.APP_URL ??
  'https://sonofgraig-enterprise-179668402458.africa-south1.run.app';

const SITE_DESCRIPTION =
  "Africa's first enterprise AI platform. Build agents, ground AI in your data, fine-tune models, and prove compliance from one platform.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'SonOfGraig — Enterprise AI Platform',
  description: SITE_DESCRIPTION,
  applicationName: 'SonOfGraig',
  authors: [{ name: 'SonOfGraig Digital Solutions' }],
  keywords: [
    'enterprise AI',
    'POPIA compliance',
    'South Africa',
    'AI platform',
    'RAG',
    'agents',
    'LLM',
    'data governance',
    'AWS af-south-1',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'SonOfGraig',
    title: 'SonOfGraig — Enterprise AI Platform',
    description: SITE_DESCRIPTION,
    locale: 'en_ZA',
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: 'SonOfGraig — Enterprise AI Platform',
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} storageKey="sg-theme">
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
