"use client"

import ChartWidget from "@/components/ChartWidget";
import { preci_data_for_india, temp_data_for_india, wind_data_for_india } from "@/test/testingData";
import { useEffect, useState } from "react";
import {CloudHailIcon, ThermometerIcon, WindIcon} from 'lucide-react'
import { converToPreciBarChart, convertToTempLineChart, convertToWindLineChart } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Home() {

  const [tempdata,settempData] = useState<TempLineChart>()
  const [windData, setwindData] = useState<WindLineChart>()
  const [preciData,setPreciData] = useState<PreciBarChart>()

  const router = useRouter();
  
  function handleRoute(routeTo:string){
      router.push(`/${routeTo}`)
  }

  useEffect(()=>{
     settempData(convertToTempLineChart(temp_data_for_india,"Temperature"))
     setwindData(convertToWindLineChart(wind_data_for_india,"Wind"))
     setPreciData(converToPreciBarChart(preci_data_for_india,"Precipitation"))
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
              <div className="bg-white p-4 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl" onClick={()=>handleRoute("temperature")}>
                 <div className="flex items-center">
                      <ThermometerIcon width={24} height={24}/>
                      <div className="font-semibold text-xl">Temperature</div>
                 </div>
                 
                  <div className="mt-6">
                     {tempdata && <ChartWidget data={tempdata}/>}
                  </div>
              </div>

              <div className="bg-white p-4 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl" onClick={()=>handleRoute("precipitation")}>
                 <div className="flex items-center">
                      <CloudHailIcon width={24} height={24}/>
                      <div className="font-semibold text-xl">Precipitation</div>
                 </div>
                 
                  <div className="mt-6">
                     {preciData && <ChartWidget data={preciData}/>}
                  </div>
                
              </div>

              <div className="bg-white p-4 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl" onClick={()=>handleRoute("windspeed")}>
                 <div className="flex items-center">
                      <WindIcon width={24} height={24}/>
                      <div className="font-semibold text-xl">Wind Speed</div>
                 </div>
                 
                  <div className="mt-6">
                     {windData && <ChartWidget data={windData}/>}
                  </div>
                
              </div>
            </div>
        </div>
        

    </div>
  );
}
