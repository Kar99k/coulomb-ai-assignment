import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({ children }: { children:React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header/>
      <div className="flex flex-1 overflow-hidden min-h-dvh ">
        <SideBar/>
        {children}
      </div>
      
    </div>
  );
} 