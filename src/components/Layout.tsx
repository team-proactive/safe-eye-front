import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Header />
      {children}
    </div>
  );
}
export const metadata = {
  title: "Notice",
};
