"use client"
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function DashboardLayout({ children }: { children:React.ReactNode }) {
  const [menuSelect,setMenuSelect] = useState(false)

  return (
    <div className="flex flex-col">
      <Header onMenuSelect={setMenuSelect}/>
      <div className="flex flex-1 overflow-hidden min-h-dvh ">
        <SideBar menuSelect={menuSelect}/>
        {children}
      </div>
      
    </div>
  );
} 