import { temp_data_for_india, wind_data_for_india } from "@/test/testingData";

export function convertToTempLineChart(data:typeof temp_data_for_india,title:string): TempLineChart{

  const { time, temperature_2m_max, temperature_2m_min, apparent_temperature_mean } = data.daily;
  const unit = data.daily_units.apparent_temperature_mean;

  return {
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

  return {
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