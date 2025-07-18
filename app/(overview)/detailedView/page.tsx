"use client"

import HourlyChart from "@/components/HourlyChart"
import Spinner from "@/components/Spinner"
import { getAllDailyMetrics } from "@/lib/api"
import { LOCATIONS, ROUTEPARAM_TO_METRIC } from "@/lib/constants"
import { extractChartConfigByHourlyMetric } from "@/lib/utils"
import { hourly_temp, multi_metrics } from "@/test/data"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DetailedView(){
    
    const searchParams = useSearchParams();

    const locationParam = searchParams.get('location') ?? '';
    const metricsParam = searchParams.get('metrics') ?? '';

    const [location, setLocation] = useState<AllowedLocations>(
    locationParam in LOCATIONS ? (locationParam as AllowedLocations) : 'India'
    );

    const [dateRange,setDateRange] = useState({
        from: searchParams.get('start_date') ?? '',
        to: searchParams.get('end_date') ?? ''
    })

    const [metrics, setMetrics] = useState(
    metricsParam.split(',').map(m => m.trim()).filter(Boolean)
    );

    const [chartData, setChartData] = useState<HourlyMetricsChart>();

    useEffect(() => {
    const fetchData = async () => {
        const result = await getAllDailyMetrics({
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
        <div className="p-6 flex flex-col w-dvw gap-6 bg-background">
            <div className="text-2xl font-medium">Drilldown</div>

            <div className="flex flex-col gap-2">
                <div className="h-12">
                    <div>
                        Filter Section
                    </div>
                </div>

                <div className="min-h-[332px] p-4 rounded-2xl border border-[#E9EFF5]">
                     <div className="flex items-center">
                            <div className="font-semibold text-xl">Temperature</div>
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