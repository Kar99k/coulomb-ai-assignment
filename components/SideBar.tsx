import Image from "next/image"
import chartIcon from "@/public/assets/chart.svg"

const SideBar: React.FC<{}>=()=>{
    return (
        <aside className="w-[55px] bg-white border-r border-r-[#E9EFF5] px-2 py-4">
            <div className="size-10 p-2.5 bg-[#E5F4F2] cursor-pointer rounded-[5px]">
                <Image src={chartIcon} width={20} height={20} alt="chart-icon"></Image>
            </div>
        </aside>
    )
}

export default SideBar;