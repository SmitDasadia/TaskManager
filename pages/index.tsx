import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import KanbanBoard from "@/components/KanbanBoard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Task Board</title>
        <meta
          name="description"
          content="Task Board with Next.js, TypeScript, Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-10">
        <h1 className="flex justify-center text-3xl font-bold items-center pb-5">
          Task List
        </h1>
        <KanbanBoard />
      </main>
    </>
  );
}
