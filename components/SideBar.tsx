"use client"
import Image from "next/image"
import chartIcon from "@/public/assets/chart.svg"
import { Routes } from "@/lib/constants";
import { useRouter } from "next/navigation";

const SideBar: React.FC<{}>=()=>{
    const router = useRouter();

    return (
        <aside className="w-[55px] bg-white border-r border-r-[#E9EFF5] px-2 py-4">
            <div className="size-10 p-2.5 bg-[#E5F4F2] cursor-pointer rounded-[5px]" onClick={()=>router.push(Routes.Home.path)}>
                <Image src={chartIcon} width={20} height={20} alt={Routes.Home.label}></Image>
            </div>
        </aside>
    )
}

export default SideBar;