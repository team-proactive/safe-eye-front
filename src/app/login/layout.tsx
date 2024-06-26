// app/login/layout.tsx
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login",
    description: "Safe Eye, Detect all threats.",
    openGraph: {
      title: "Login",
      description: "Safe Eye, Detect all treats.",
      url: "https://example.com/login",
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
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
