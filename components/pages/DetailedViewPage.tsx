"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/atoms/Spinner";
import Dropdown from "@/components/atoms/DropDown";
import HourlyChart from "@/components/templates/HourlyChart";
import DateRangeDropDown from "@/components/molecules/DateRangeDropDown";
import MultiSelectDropdown from "@/components/molecules/MultiSelectDropdown";
import { getAllMetricsbyParams } from "@/lib/api";
import { METRICS_LABEL } from "@/lib/constants";
import {
  extractChartConfigByHourlyMetric,
  multiSelectCountries,
} from "@/lib/utils";

export default function DetailedView() {
  const searchParams = useSearchParams();

  const metricsOptions: AllowedMetrics[] = [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "precipitation",
    "pressure_msl",
    "wind_speed_10m",
  ];

  const locationOptions: LocationOption[] = [
    "All Locations",
    "India",
    "USA",
    "UK",
    "Japan",
    "Australia",
    "China",
  ];

  const locationParam = searchParams.get("location");
  const [locations, setLocations] = useState<LocationOption[]>([
    locationParam as LocationOption,
  ]);

  const metricsParam = searchParams.get("metrics") ?? "";
  const [metrics, setMetrics] = useState<AllowedMetrics[]>(
    metricsParam.split(",").map((m) => m.trim() as AllowedMetrics)
  );

  const [dateRange, setDateRange] = useState({
    from: searchParams.get("start_date") ?? "",
    to: searchParams.get("end_date") ?? "",
  });

  const [chartData, setChartData] = useState<HourlyMetricsChart>();

  useEffect(() => {
    const fetchData = async () => {
      const { lat, lon, tz } = multiSelectCountries(locations);
      const result = await getAllMetricsbyParams({
        lat,
        lon,
        start_date: dateRange.from,
        end_date: dateRange.to,
        timezone: tz,
        hourlyMetrics: metrics,
      });

      setChartData(extractChartConfigByHourlyMetric(result, metrics));
    };

    fetchData();
  }, [locations, dateRange, metrics]);

  return (
    <div className="p-6 flex w-full flex-col gap-6 bg-background">
      <div className="text-2xl font-medium">Drilldown</div>

      <div className="flex flex-col gap-2 min-w-0">
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

        <div className="bg-white min-h-[332px] px-4 py-3 rounded-2xl border border-[#E9EFF5]">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-base">
              {metrics.map((metric) => METRICS_LABEL[metric]).join(", ")}
            </div>
            
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
  );
}
