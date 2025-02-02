import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { MusicProvider } from "@/context/MusicContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music streaming analytics turns data into sound decisions.",
  description:
    "Design and publish your e-commerce site in Framer, manage it with Shopify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-24`}>
        <MusicProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </MusicProvider>
      </body>
    </html>
  );
}
