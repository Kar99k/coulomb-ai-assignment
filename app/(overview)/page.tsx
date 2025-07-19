"use client"

import ChartWidget from "@/components/template/ChartWidget";
import { useEffect, useState } from "react";
import {CloudHailIcon, MoveDown, ThermometerIcon, WindIcon} from 'lucide-react'
import { extractChartConfigByDailyMetric, multiSelectCountries } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { getAllMetricsbyParams } from "@/lib/api";
import { LOCATIONS } from "@/lib/constants";
import Dropdown from "@/components/atom/DropDown";
import DateRangeDropDown from "@/components/molecule/DateRangeDropDown";
import { multi_countries } from "@/test/data";
import MultiSelectDropdown from "@/components/molecule/MultiSelectDropdown";


export default function Home() {
  
  const locationOptions: LocationOption[] = ["All Locations", "India", "USA", "UK", "Japan", "Australia", "China"];
  const [locations, setLocations] = useState<LocationOption[]>(["All Locations"]);

  const [tempdata,settempData] = useState<TempLineChart>()
  const [windData, setwindData] = useState<WindLineChart>()
  const [preciData,setPreciData] = useState<PreciBarChart>()
  const [dateRange,setDateRange] = useState({
    from: '2025-07-10',
    to: '2025-07-16'
  })

  const [isLoading,setIsLoading] = useState(true)
  
  const router = useRouter();
  
   function handleRoute(metrics:string) {

   const locationParam = locations.includes("All Locations")
    ? "All Locations"
    : locations[0];

   const params = new URLSearchParams({
      location: locationParam,
      start_date: dateRange.from,
      end_date: dateRange.to,
      metrics: metrics,
   });

      router.push(`/detailedView?${params.toString()}`);
   }

  useEffect(()=>{
   
   const fetchAllDailyMetrics = async () =>{
         setIsLoading(true)
         const { lat, lon,tz } = multiSelectCountries(locations);

          const result = await getAllMetricsbyParams({
            lat,
            lon,
            start_date: dateRange.from,
            end_date: dateRange.to,
            timezone: tz,
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
         setIsLoading(false)
      }

      fetchAllDailyMetrics()

  },[locations,dateRange])
  
  
  return (
  <div className="relative p-6 flex flex-col gap-6 bg-background min-h-screen">

    {isLoading && (
      <div className="absolute h-3/4 inset-0 z-50 bg-white/70 flex items-center justify-center">
        <Spinner />
      </div>
    )}

    <div className="text-2xl font-medium">Overview</div>

    <div className="flex flex-col gap-2">
      <div className="h-12">
        <div className="flex gap-4">
          <DateRangeDropDown value={dateRange} onChange={setDateRange} />
          <Dropdown
            options={locationOptions}
            selected={locations[0]}
            onSelect={(val) => setLocations([val as LocationOption])}
            placeholder="Select a location"
            size="lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[24px] xl:grid-cols-2">
        <div
          className="bg-white p-4 md:p-6 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]"
          onClick={() => handleRoute("temperature_2m")}
        >
          <div className="flex items-center gap-3">
            <ThermometerIcon width={24} height={24} />
            <div className="font-semibold text-xl">Temperature</div>
          </div>
          <div className="mt-6">
            {tempdata && <ChartWidget data={tempdata} />}
          </div>
        </div>

        <div
          className="bg-white p-4 md:p-6 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]"
          onClick={() => handleRoute("precipitation")}
        >
          <div className="flex items-center gap-3">
            <CloudHailIcon width={24} height={24} />
            <div className="font-semibold text-xl">Precipitation</div>
          </div>
          <div className="mt-6">
            {preciData && <ChartWidget data={preciData} />}
          </div>
        </div>

        <div
          className="bg-white p-4 md:p-6 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]"
          onClick={() => handleRoute("wind_speed_10m")}
        >
          <div className="flex items-center gap-3">
            <WindIcon width={24} height={24} />
            <div className="font-semibold text-xl">Wind Speed</div>
          </div>
          <div className="mt-6">
            {windData && <ChartWidget data={windData} />}
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
