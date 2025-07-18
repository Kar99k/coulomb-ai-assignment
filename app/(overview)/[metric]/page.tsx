"use client"

import HourlyChart from "@/components/HourlyChart"
import Spinner from "@/components/Spinner"
import { extractChartConfigByHourlyMetric } from "@/lib/utils"
import { hourly_temp, multi_metrics } from "@/test/data"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DetailedView(){
    const params = useParams()
    const [tempdata,settempData] = useState<HourlyMetricsChart>()

    useEffect(()=>{
         settempData(extractChartConfigByHourlyMetric(multi_metrics))
      },[])

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
                     {tempdata ? (
                     <div className="mt-6">
                        <HourlyChart data={tempdata} />
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