import { batch_widget_metrics, hourly_temp, multi_metrics, preci_data_for_india, temp_data_for_india, wind_data_for_india } from "@/test/data";
import { METRICS_LABEL, METRICS_CHART_TYPE } from "@/types/global";
import { title } from "process";

export function extractChartConfigByMetric(
  data:typeof batch_widget_metrics,
  intervals:string,
  { Temperature = [], Precipitation = [], WindSpeed = [] }: DailyMetricCategory) {

  const BulkMetricData = data[intervals as keyof typeof data] as Record<string, any>;
  const time = BulkMetricData.time;
  
  const createSeries = (metrics: string[],title:string) => {
    return metrics?.map(metric => {
      const seriesData = BulkMetricData[metric];
      return {
        name: metric,
        data: seriesData
      };
    });
  };

  const TempChartConfig = {
    title: "Temperature",
    type:"spline",
    xAxis: time,
    unit: Temperature.map(m => data.daily_units?.[m as keyof typeof data.daily_units])[0],
    series: createSeries(Temperature,"Temperature")
  };

  const PreciChartConfig = {
    title:"Precipitation",
    type:"column",
    xAxis:time,
    unit: Precipitation.map(m => data.daily_units?.[m as keyof typeof data.daily_units])[0],
    series: createSeries(Precipitation,"Precipitation")
  };

  const WindChartConfig = {
    title:"WindSpeed",
    type:"spline",
    xAxis:time,
    unit: WindSpeed.map(m => data.daily_units?.[m as keyof typeof data.daily_units])[0],
    series: createSeries(Precipitation,"WindSpeed")
  };


  console.log("Temp", TempChartConfig)
  console.log("Preci",PreciChartConfig)
  console.log("Wind",WindChartConfig)
  return { TempChartConfig,PreciChartConfig,WindChartConfig }
}

export function convertTohourlyMetricsChart(data: typeof hourly_temp | typeof multi_metrics,title:string):HourlyMetricsChart{
   const {time} = data.hourly
   let series:DataSeries[] = []
   let yAxis:any = []
   const metrics = Object.keys(data.hourly).filter((k) => k !== "time");

   metrics.forEach((metric, index) => {
    
    series.push({
      name: METRICS_LABEL[metric] ?? metric,
      data: data.hourly[metric as keyof typeof data.hourly] as number[],
      type: METRICS_CHART_TYPE[metric] ?? "line",
      tooltip: {
        valueSuffix: data.hourly_units[metric as keyof typeof data.hourly_units]
      },
      yAxis: index,
    });

    yAxis.push({
      title: { text: METRICS_LABEL[metric] ?? metric },
      opposite: index === 1,
    });

  });

  return {
    yAxis,
    title: title,
    xAxis: time,
    series
  };
}

