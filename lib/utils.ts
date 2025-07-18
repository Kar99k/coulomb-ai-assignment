import { hourly_temp, multi_metrics, preci_data_for_india, temp_data_for_india, wind_data_for_india } from "@/test/data";
import { HOURLY_METRICS_LABEL, METRICS_CHART_TYPE } from "@/types/global";

export function convertToTempLineChart(data:typeof temp_data_for_india,title:string): TempLineChart{

  const { time, temperature_2m_max, temperature_2m_min, apparent_temperature_mean } = data.daily;
  const unit = data.daily_units.apparent_temperature_mean;
  const type = 'line'

  return {
    type,
    title: title,
    xAxis: time,
    unit,
    series: [
      {
        name: 'Average Temperature',
        data: apparent_temperature_mean
      },
      {
        name: 'Maximum Temperature',
        data: temperature_2m_max
      },
      {
        name: 'Minimum Temperature',
        data:  temperature_2m_min
      },
    ],
  };
}

export function convertToWindLineChart(data: typeof wind_data_for_india,title:string): WindLineChart{
  const { time, wind_speed_10m_max} = data.daily;
  const unit = data.daily_units.wind_speed_10m_max;
  const type = 'line'

  return {
    type,
    title: title,
    xAxis: time,
    unit,
    series: [
      {
        name: 'Wind Speed',
        data: wind_speed_10m_max
      }
    ],
  };
}

export function converToPreciBarChart(data: typeof preci_data_for_india,title:string):PreciBarChart{
  const { time, precipitation_sum} = data.daily;
  const unit = data.daily_units.precipitation_sum;
  const type = 'column'

  return {
    type,
    title: title,
    xAxis: time,
    unit,
    series: [
      {
        name: 'Precipitation',
        data: precipitation_sum
      }
    ],
  };
}

export function convertTohourlyMetricsChart(data: typeof hourly_temp | typeof multi_metrics,title:string):HourlyMetricsChart{
   const {time} = data.hourly
   let series:DataSeries[] = []
   let yAxis:any = []
   const metrics = Object.keys(data.hourly).filter((k) => k !== "time");

   metrics.forEach((metric, index) => {
    
    series.push({
      name: HOURLY_METRICS_LABEL[metric] ?? metric,
      data: data.hourly[metric as keyof typeof data.hourly] as number[],
      type: METRICS_CHART_TYPE[metric] ?? "line",
      tooltip: {
        valueSuffix: data.hourly_units[metric as keyof typeof data.hourly_units]
      },
      yAxis: index,
    });

    yAxis.push({
      title: { text: HOURLY_METRICS_LABEL[metric] ?? metric },
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

