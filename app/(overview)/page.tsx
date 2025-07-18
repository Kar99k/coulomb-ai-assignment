import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-6 w-dvw">
        <div className="text-2xl font-medium">Overview</div>

        <div className="flex flex-col gap-2">
           <div className="h-12"> Filter Section </div>
            <div className="grid grid-cols-2 gap-[24px]">
              <div className="bg-gray-100 p-4 cursor-pointer">Chart 1</div>
              <div className="bg-gray-100 p-4 cursor-pointer">Chart 2</div>
              <div className="bg-gray-100 p-4 cursor-pointer">Chart 3</div>
            </div>
        </div>
        

    </div>
  );
}
