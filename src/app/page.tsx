"use client";
import Layout from "@/components/Layout";
import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";

const Main = styled.main`
  ${tw`flex  flex-col items-center gap-y-10 p-12`}
`;

export default function Home() {
  return (
    <Layout>
      <Main>
        <Link href="/notice"> notice</Link>
        <Link href="/login">login</Link>
      </Main>
    </Layout>
  );
}
