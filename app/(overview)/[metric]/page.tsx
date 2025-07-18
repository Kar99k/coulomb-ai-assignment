"use client"

import HourlyChart from "@/components/HourlyChart"
import { convertTohourlyMetricsChart, convertToTempLineChart } from "@/lib/utils"
import { hourly_temp } from "@/test/testingData"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DetailedView(){
    const params = useParams()
    const [tempdata,settempData] = useState<HourlyMetricsChart>()

    useEffect(()=>{
         settempData(convertTohourlyMetricsChart(hourly_temp,"Temperature"))
      },[])

      console.log(tempdata)
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
                     <div className="mt-6">
                     {tempdata && <HourlyChart data={tempdata}/>}
                  </div>
                </div>

            </div>
        </div>

    )
}