import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import '../styles/index.scss';
import {Footer} from "../components/footer/footer";
import {Header} from "../components/header/header";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700']
})

export const metadata: Metadata = {
  title: "Next.js LazyShop",
  description: "LazyShop made with Next.js, React, TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <main className="content" id="top">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
