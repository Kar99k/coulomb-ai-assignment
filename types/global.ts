export {};

declare global {

    type tooltip = {
        valueSuffix: string
    }

    type yAxisTitle = {
        title: {
            text: string;
        };
        opposite:boolean
    }

    type DataSeries = {
        name: string
        type?:string
        data: number[]
        tooltip?: tooltip
        yAxis?:number
    }

    interface BaseChart {
        type: string
        title: string
        xAxis: string[]
        unit: string
        series: DataSeries[]
    }

    interface TempLineChart extends BaseChart{}
    interface WindLineChart extends BaseChart{}
    interface PreciBarChart extends BaseChart{}
    interface HourlyMetricsChart extends Omit<BaseChart, 'type'|'unit'>{
        yAxis: any
    }


}

export const HOURLY_METRICS_LABEL: Record<string, string> = {
    temperature_2m: "Temperature",
    relative_humidity_2m: "Relative Humidity",
    apparent_temperature:"Apparent Temperature",
    precipitation: "Precipitation",
    pressure_msl:"Sea Level Pressure",
    wind_speed_10m: "Wind Speed"
} as const

export const LABEL_TO_HOURLY_METRICS: Record<(typeof HOURLY_METRICS_LABEL)[keyof typeof HOURLY_METRICS_LABEL], keyof typeof HOURLY_METRICS_LABEL> = Object.entries(HOURLY_METRICS_LABEL).reduce(
  (acc, [key, value]) => {
    acc[value as keyof typeof LABEL_TO_HOURLY_METRICS] = key as keyof typeof HOURLY_METRICS_LABEL;
    return acc;
  },
  {} as Record<string, keyof typeof HOURLY_METRICS_LABEL>
);

export const METRICS_CHART_TYPE: Record<string, string> = {
    temperature_2m: "line",
    relative_humidity_2m: "line",
    apparent_temperature:"line",
    precipitation: "column",
    pressure_msl:"line",
    wind_speed_10m: "line"
} as const