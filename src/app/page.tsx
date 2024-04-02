import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10 p-12">
      <Link href="/notice"> notice</Link>
    </main>
  );
}
