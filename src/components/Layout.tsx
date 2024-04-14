import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-3xl min-h-screen mx-auto bg-black">
      <Header />
      {children}
    </section>
  );
}
export const metadata = {
  title: "Notice",
};
