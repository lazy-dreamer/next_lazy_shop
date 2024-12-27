import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/index.scss";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@/components/react_query_provider/react_query_provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Next.js LazyShop",
  description: "LazyShop made with Next.js, React, TypeScript",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={montserrat.className}>
          <Header />
          <main className="content" id="top">
            {children}
            {modal}
            <Toaster />
          </main>
          <Footer />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
