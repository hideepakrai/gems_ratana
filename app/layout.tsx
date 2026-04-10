import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import LayoutWrapper from '@/components/LayoutWrapper';
import StoreProvider from '@/app/StoreProvider';
import { AnnotatorPlugin } from '@/components/annotationPlugin';
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import ChunkErrorRecovery from '@/components/ChunkErrorRecovery';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: 'GemsRatna Premium Gemstones',
  description: 'Premium natural gemstones and spiritual wellness products.',
  icons: {
    icon: '/assets/Image/favicon.svg', // 👈 favicon added
    shortcut: '/assets/Image/favicon.svg',
    apple: '/assets/Image/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable, playfair.variable)}
    >
      <body>
        <ChunkErrorRecovery />
        <StoreProvider>
          <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
            {/* <AnnotatorPlugin /> */}
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
