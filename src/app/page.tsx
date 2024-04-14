// page.tsx
"use client";
import { useLogoutUser } from "@/api/hooks/useUser";
import Layout from "@/components/Layout";
import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";

const Main = styled.main`
  ${tw`flex  flex-col items-center gap-y-10 p-12`}
`;

export default function Home() {
  const logoutMutation = useLogoutUser();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Layout>
      <Main>
        <Link href="/notice"> notice</Link>
        <Link href="/login">login</Link>
        <Link href="/register">signup</Link>
        <button onClick={handleLogout}>Logout</button>
      </Main>
    </Layout>
  );
}
