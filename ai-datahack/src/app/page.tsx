import Image from "next/image";
import {SidebarDemo}  from "./components/Sidebar"
import { NextButton } from "./components/NextButton";
import { CardStackDemo } from "./components/CardstackDemo";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

        <SidebarDemo />
        <NextButton />
        <CardStackDemo />
        
    </div>
  );
}
