import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: {
    template: "%s | Safe Eye",
    default: "Safe Eye | your safety is our priority",
  },
  description: "Safe Eye, Detect all treats.",
  openGraph: {
    title: "Safe Eye",
    description: "Safe Eye, Detect all treats.",
    url: "",
    siteName: "Safe Eye",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Safe Eye",
      },
    ],
  },
  icons: {
    shortcut: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <StyledComponentsRegistry>
            <GlobalStyles />
            {children}
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
