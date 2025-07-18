"use client"

import ChartWidget from "@/components/ChartWidget";
import { batch_widget_metrics } from "@/test/data";
import { useEffect, useState } from "react";
import {CloudHailIcon, ThermometerIcon, WindIcon} from 'lucide-react'
import { extractChartConfigByDailyMetric } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { getAllDailyMetrics } from "@/lib/api";
import { LOCATIONS } from "@/lib/constants";

export default function Home() {

  const [tempdata,settempData] = useState<TempLineChart>()
  const [windData, setwindData] = useState<WindLineChart>()
  const [preciData,setPreciData] = useState<PreciBarChart>()
  const [startDate,setStartDate] = useState('2025-07-10')
  const [endDate,setEndDate] = useState('2025-07-16')
  const [location,setLocation] = useState<AllowedLocations>('India')

  const router = useRouter();
  
   function handleRoute(metrics:string) {
   const params = new URLSearchParams({
      location: location,
      start_date: startDate,
      end_date: endDate,
      metrics: metrics,
   });

      router.push(`/detailedView?${params.toString()}`);
   }

  useEffect(()=>{
      
   const fetchAllDailyMetrics = async () =>{
          const result = await getAllDailyMetrics({
            lat: LOCATIONS[location].lat,
            lon: LOCATIONS[location].lon,
            start_date: startDate,
            end_date: endDate,
            timezone: LOCATIONS[location].tz,
            dailyMetrics: [
                "apparent_temperature_mean",
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_sum",
                "wind_speed_10m_max"
            ]
            });

          const {TempChartConfig,PreciChartConfig,WindChartConfig} = extractChartConfigByDailyMetric(result, {
            Temperature: ['temperature_2m_max','temperature_2m_min','apparent_temperature_mean'],
            Precipitation: ['precipitation_sum'],
            WindSpeed: ['wind_speed_10m_max']
            });
      
         settempData(TempChartConfig)
         setPreciData(PreciChartConfig)
         setwindData(WindChartConfig)

        
      }

      fetchAllDailyMetrics()

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
              <div className="bg-white p-4 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]" onClick={()=>handleRoute("temperature_2m")}>
                 <div className="flex items-center">
                      <ThermometerIcon width={24} height={24}/>
                      <div className="font-semibold text-xl">Temperature</div>
                 </div>
                 
                  {tempdata ? (
                     <div className="mt-6">
                        <ChartWidget data={tempdata} />
                     </div>
                     ) : (
                     <div className="min-h-[400px] flex items-center justify-center">
                        <Spinner />
                     </div>
                  )}
              </div>

              <div className="bg-white p-4 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]" onClick={()=>handleRoute("precipitation")}>
                 <div className="flex items-center">
                      <CloudHailIcon width={24} height={24}/>
                      <div className="font-semibold text-xl">Precipitation</div>
                 </div>
                 
                  

                  {preciData ? (
                     <div className="mt-6">
                        <ChartWidget data={preciData}/>
                     </div>
                     ) : (
                     <div className="min-h-[400px] flex items-center justify-center">
                        <Spinner />
                     </div>
                  )}
                
              </div>

              <div className="bg-white p-4 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]" onClick={()=>handleRoute("wind_speed_10m")}>
                 <div className="flex items-center">
                      <WindIcon width={24} height={24}/>
                      <div className="font-semibold text-xl">Wind Speed</div>
                 </div>
                 
                  {windData ? (
                     <div className="mt-6">
                        <ChartWidget data={windData}/>
                     </div>
                     ) : (
                     <div className="min-h-[400px] flex items-center justify-center">
                        <Spinner />
                     </div>
                  )}
                
              </div>
            </div>
        </div>
        

    </div>
  );
}
