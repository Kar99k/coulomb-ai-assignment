import { batch_widget_metrics, hourly_temp, multi_metrics, preci_data_for_india, temp_data_for_india, wind_data_for_india } from "@/test/data";
import { METRICS_LABEL, METRICS_CHART_TYPE } from "@/lib/constants";

export function extractChartConfigByDailyMetric(
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

  return { TempChartConfig,PreciChartConfig,WindChartConfig }
}

export function extractChartConfigByHourlyMetric(
  data: typeof multi_metrics,
  multi_metric:string[]=['temperature_2m','wind_speed_10m']
):HourlyMetricsChart{

  const BulkMetricData = data?.hourly as Record<string, any>;
  const time:string[] = BulkMetricData.time;
  let series:DataSeries[] = [];
  let yAxis:any = []
  let title:string[] = []

  const buildConfig = (metric: string,index:number) => {
    const seriesData = BulkMetricData[metric];
    const name = METRICS_LABEL[metric] ?? metric;
    series.push({
        name,
        data: seriesData,
        type: METRICS_CHART_TYPE[metric] ?? "line",
        tooltip: {
           valueSuffix: data.hourly_units[metric as keyof typeof data.hourly_units]
        },
        yAxis: index
      });

    yAxis.push({
      title: { text: METRICS_LABEL[metric] ?? metric },
      opposite: index === 1,
    })

    title.push(name) 

  };


  multi_metric.forEach((metric,index)=>buildConfig(metric,index))

  return {
    yAxis,
    title: title.join(","),
    xAxis: time,
    series
  };
}
