"use client"
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function DashboardLayout({ children }: { children:React.ReactNode }) {
  const [menuSelect,setMenuSelect] = useState(false)

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header onMenuSelect={() => setMenuSelect(true)} />
      <div className="flex flex-1 min-w-0">
        <SideBar menuSelect={menuSelect}/>
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
} 