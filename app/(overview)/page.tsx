"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import {CloudHailIcon, ThermometerIcon, WindIcon} from 'lucide-react'
import { extractChartConfigByDailyMetric, multiSelectCountries } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Spinner from "@/components/atoms/Spinner";
import { getAllMetricsbyParams } from "@/lib/api";
import Dropdown from "@/components/atoms/DropDown";
import DateRangeDropDown from "@/components/molecules/DateRangeDropDown";
import MetricCard from "@/components/molecules/MetricCard";


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

   const DAILY_METRICS = useMemo(() => [
    "apparent_temperature_mean",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "wind_speed_10m_max"
  ], []);

  const METRIC_GROUP_MAP = useMemo(() => ({
    Temperature: ['temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_mean'],
    Precipitation: ['precipitation_sum'],
    WindSpeed: ['wind_speed_10m_max']
  }), []);

  const fetchAllDailyMetrics = useCallback(async () => {
      if (!locations?.length || !dateRange?.from || !dateRange?.to) return;

      try {
        setIsLoading(true);
        
        const { lat, lon, tz } = multiSelectCountries(locations);

        const result = await getAllMetricsbyParams({
          lat,
          lon,
          start_date: dateRange.from,
          end_date: dateRange.to,
          timezone: tz,
          dailyMetrics: DAILY_METRICS
        });

        const { TempChartConfig, PreciChartConfig, WindChartConfig } = extractChartConfigByDailyMetric(
          result,
          METRIC_GROUP_MAP
        );

        settempData(TempChartConfig);
        setPreciData(PreciChartConfig);
        setwindData(WindChartConfig);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      } finally {
        setIsLoading(false);
      }
    }, [locations, dateRange, DAILY_METRICS, METRIC_GROUP_MAP]);

    useEffect(() => {
      fetchAllDailyMetrics();
    }, [fetchAllDailyMetrics]);
  
  
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
        <MetricCard
          title="Temperature"
          icon={<ThermometerIcon width={24} height={24} />}
          data={tempdata}
          onClick={() => handleRoute("temperature_2m")}
        />

        <MetricCard
          title="Precipitation"
          icon={<CloudHailIcon width={24} height={24} />}
          data={preciData}
          onClick={() => handleRoute("precipitation")}
        />

        <MetricCard
          title="Wind Speed"
          icon={<WindIcon width={24} height={24} />}
          data={windData}
          onClick={() => handleRoute("wind_speed_10m")}
        />
        
      </div>
    </div>
  </div>
);

}
