"use client"
import Header from "@/components/molecules/Header";
import SideBar from "@/components/molecules/SideBar";
import { useState } from "react";

export default function DashboardLayout({ children }: { children:React.ReactNode }) {
  const [menuSelect,setMenuSelect] = useState(false)
  function handleMenuSelect(){
    setMenuSelect(prev=>!prev)
  }
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header handleMenuSelect={handleMenuSelect} />
      <div className="flex flex-1 min-w-0">
        <SideBar menuSelect={menuSelect} setMenuSelect={setMenuSelect}/>
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
} 