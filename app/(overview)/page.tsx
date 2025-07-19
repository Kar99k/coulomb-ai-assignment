"use client"

import ChartWidget from "@/components/ChartWidget";
import { useEffect, useState } from "react";
import {CloudHailIcon, MoveDown, ThermometerIcon, WindIcon} from 'lucide-react'
import { extractChartConfigByDailyMetric } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { getAllDailyMetrics } from "@/lib/api";
import { LOCATIONS } from "@/lib/constants";
import Dropdown from "@/components/atom/DropDown";
import DateRangeDropDown from "@/components/molecule/DateRangeDropDown";


export default function Home() {
  
  const options:AllowedLocations[] = ["India", "USA", "UK", "Japan","Australia","China"];

  const [tempdata,settempData] = useState<TempLineChart>()
  const [windData, setwindData] = useState<WindLineChart>()
  const [preciData,setPreciData] = useState<PreciBarChart>()
  const [dateRange,setDateRange] = useState({
    from: '2025-07-10',
    to: '2025-07-16'
  })

  const [location,setLocation] = useState<AllowedLocations>('India')

  const router = useRouter();
  
   function handleRoute(metrics:string) {
   const params = new URLSearchParams({
      location: location,
      start_date: dateRange.from,
      end_date: dateRange.to,
      metrics: metrics,
   });

      router.push(`/detailedView?${params.toString()}`);
   }

  useEffect(()=>{
      
   const fetchAllDailyMetrics = async () =>{
          const result = await getAllDailyMetrics({
            lat: LOCATIONS[location].lat,
            lon: LOCATIONS[location].lon,
            start_date: dateRange.from,
            end_date: dateRange.to,
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

  },[location,dateRange])

  return (
    <div className="p-6 flex flex-col gap-6 bg-background">
        <div className="text-2xl font-medium">Overview</div>        

        <div className="flex flex-col gap-2">
           <div className="h-12">
               <div className="flex gap-4">
                  <DateRangeDropDown value={dateRange} onChange={setDateRange}/>
                 <Dropdown
                  options={options}
                  selected={location}
                  placeholder="All Cities Selected"
                  onSelect={(value) => {
                     if (value in LOCATIONS) {
                        setLocation(value as AllowedLocations);
                     }
                  }}
                  size="lg"
                  />
               </div>         
            </div>

            <div className="grid grid-cols-1 gap-[24px] xl:grid-cols-2">
              <div className="bg-white p-4 md:p-6 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]" onClick={()=>handleRoute("temperature_2m")}>
                 <div className="flex items-center gap-3">
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

              <div className="bg-white p-4 md:p-6 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]" onClick={()=>handleRoute("precipitation")}>
                 <div className="flex items-center gap-3">
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

              <div className="bg-white p-4 md:p-6 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]" onClick={()=>handleRoute("wind_speed_10m")}>
                 <div className="flex items-center gap-3">
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
