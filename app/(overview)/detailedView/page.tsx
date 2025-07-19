"use client"

import Dropdown from "@/components/atom/DropDown"
import HourlyChart from "@/components/HourlyChart"
import DateRangeDropDown from "@/components/molecule/DateRangeDropDown"
import MultiSelectDropdown from "@/components/molecule/MultiSelectDropdown"
import Spinner from "@/components/Spinner"
import { getAllMetricsbyParams } from "@/lib/api"
import { LOCATIONS, METRICS_LABEL } from "@/lib/constants"
import { extractChartConfigByHourlyMetric } from "@/lib/utils"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DetailedView(){
    
    const searchParams = useSearchParams();

    const options:AllowedLocations[] = ["India", "USA", "UK", "Japan","Australia","China"];
    const metricsOptions:AllowedMetrics[] = ["temperature_2m",  "relative_humidity_2m",  "apparent_temperature",  "precipitation",  "pressure_msl",  "wind_speed_10m"];


    const locationParam = searchParams.get('location') ?? '';
    const metricsParam = searchParams.get('metrics') ?? '';

    const [location, setLocation] = useState<AllowedLocations>(
    locationParam in LOCATIONS ? (locationParam as AllowedLocations) : 'India'
    );

    const [dateRange,setDateRange] = useState({
        from: searchParams.get('start_date') ?? '',
        to: searchParams.get('end_date') ?? ''
    })

    const [metrics, setMetrics] = useState<AllowedMetrics[]>(
    metricsParam.split(",").map((m) => m.trim() as AllowedMetrics)
    );

    const [chartData, setChartData] = useState<HourlyMetricsChart>();

    useEffect(() => {
    const fetchData = async () => {
        const result = await getAllMetricsbyParams({
        lat: LOCATIONS[location].lat,
        lon: LOCATIONS[location].lon,
        start_date: dateRange.from,
        end_date: dateRange.to,
        timezone: LOCATIONS[location].tz,
        hourlyMetrics: metrics,
        });

        setChartData(extractChartConfigByHourlyMetric(result, metrics));
    };

    fetchData();
    }, [location, dateRange, metrics]);

    return (
        <div className="p-6 flex w-full flex-col gap-6 bg-background">
            <div className="text-2xl font-medium">Drilldown</div>

            <div className="flex flex-col gap-2 min-w-0">
                <div className="h-12">
                    <div className="flex gap-4">
                     <DateRangeDropDown value={dateRange} onChange={setDateRange}/>
                        <Dropdown
                            options={options}
                            selected={location}
                            placeholder= {location || "All Cities Selected"}
                            onSelect={(value) => {
                                if (value in LOCATIONS) {
                                    setLocation(value as AllowedLocations);
                                }
                            }}
                            size="lg"
                            />
                    </div>
                </div>

                <div className="bg-white min-h-[332px] p-4 rounded-2xl border border-[#E9EFF5]">
                     <div className="flex items-center justify-between">
                        <div className="font-semibold text-xl">Temperature</div>
                         <MultiSelectDropdown<AllowedMetrics>
                            options={metricsOptions}
                            selected={metrics}
                            onSelect={setMetrics}
                            getLabel={(metric) => METRICS_LABEL[metric]}
                            />
                     </div>
                     {chartData ? (
                     <div className="mt-6">
                        <HourlyChart data={chartData} />
                     </div>
                     ) : (
                     <div className="min-h-[400px] flex items-center justify-center">
                        <Spinner />
                     </div>
                  )}
                </div>

            </div>
        </div>

    )
}