"use client"

import SimpleLineChart from "@/components/LineChart";
import { temp_data_for_india, wind_data_for_india } from "@/test/testingData";
import { useEffect, useState } from "react";
import {ThermometerIcon, Wind} from 'lucide-react'
import { convertToTempLineChart, convertToWindLineChart } from "@/lib/utils";

export default function Home() {

  const [tempdata,settempData] = useState<TempLineChart>()
  const [windData, setwindData] = useState<WindLineChart>()

  useEffect(()=>{
     settempData(convertToTempLineChart(temp_data_for_india,"Temperature"))
     setwindData(convertToWindLineChart(wind_data_for_india,"Wind"))
  },[])

  return (
    <div className="p-6 flex flex-col gap-6 w-dvw bg-background">
        <div className="text-2xl font-medium">Overview</div>

        <div className="flex flex-col gap-2">
           <div className="h-12"> 
             <div className="">
              Filter Section
             </div>
             
              
            </div>
            <div className="grid grid-cols-2 gap-[24px]">
              <div className="bg-white p-4 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl">
                 <div className="flex items-center">
                      <ThermometerIcon width={24} height={24}/>
                      <div className="font-semibold text-xl">Temperature</div>
                 </div>
                 
                  <div className="mt-6">
                     {tempdata && <SimpleLineChart data={tempdata}/>}
                  </div>
                
              </div>
              <div className="bg-gray-100 p-4 cursor-pointer">Chart 2</div>
              <div className="bg-white p-4 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl">
                 <div className="flex items-center">
                      <Wind width={24} height={24}/>
                      <div className="font-semibold text-xl">Wind Speed</div>
                 </div>
                 
                  <div className="mt-6">
                     {windData && <SimpleLineChart data={windData}/>}
                  </div>
                
              </div>
            </div>
        </div>
        

    </div>
  );
}
