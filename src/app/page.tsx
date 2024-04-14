// page.tsx
"use client";
import Layout from "@/components/Layout";
import styled from "styled-components";
import tw from "twin.macro";

const Main = styled.main`
  ${tw`grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center p-12`}
`;

export default function Home() {
  return (
    <Layout>
      <Main>
        <div className="bg-lime-500 h-48 "></div>
        <div className="bg-lime-500 h-48"></div>
        <div className="bg-lime-500 h-48"></div>
        <div className="bg-lime-500 h-48"></div>

        <div className="h-7 flex justify-between items-center px-2 col-span-2 bg-lime-500 mt-3 rounded-sm">
          <div className="text-white text-xs pt-0.5">
            <div className="badge badge-neutral">normal</div>
            <span className="pl-1"> [1번 카메라] 일반적인 로그입니다.</span>
          </div>
          <p className="text-white text-xs pt-0.5">
            발생일시 2024-01-01 14:00:01
          </p>
        </div>
      </Main>
    </Layout>
  );
}
