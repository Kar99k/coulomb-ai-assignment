import { hourly_temp, preci_data_for_india, temp_data_for_india, wind_data_for_india } from "@/test/data";

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

export function convertTohourlyMetricsChart(data: typeof hourly_temp,title:string):HourlyMetricsChart{
   const {time,temperature_2m} = data.hourly
   const unit = data.hourly_units.temperature_2m
   

  return {
    title: title,
    xAxis: time,
    unit,
    series: [
      {
        name: 'Temperature',
        data: temperature_2m
      }
    ],
  };
}