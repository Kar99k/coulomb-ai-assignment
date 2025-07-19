"use client"
import Image from "next/image"
import chartIcon from "@/public/assets/chart.svg"
import { Routes } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/" },
  { label: "Settings", href: "#" },
  { label: "Profile", href: "#" },
  { label: "Logout", href: "#" },
];

const SideBar: React.FC<{menuSelect:boolean}>=({menuSelect})=>{
    const router = useRouter();

    return (
        <>
      <aside className="w-[55px] bg-white border-r border-[#E9EFF5] px-2 py-4 hidden md:block">
        <nav
          className="size-10 p-2.5 bg-[#E5F4F2] cursor-pointer rounded-[5px]"
          onClick={() => router.push(Routes.Home.path)}
        >
          <Image
            src={chartIcon}
            width={20}
            height={20}
            alt={Routes.Home.label}
          />
        </nav>
      </aside>

      {menuSelect && (
        <aside className="absolute z-10 md:hidden">
          <nav className="flex flex-col p-4 gap-2 bg-white border border-[#E9EFF5] rounded-lg shadow-md">
            {menuItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-4 py-2 rounded hover:bg-gray-100 text-sm"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
      )}
    </>
    )
}

export default SideBar;