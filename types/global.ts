export {};

declare global {

    type DailyMetricCategory = {
    Temperature: string[],
    Precipitation: string[],
    WindSpeed: string[]
    }

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
        title?: string
        xAxis: string[]
        unit: string
        series: DataSeries[]
        yAxis?: any
    }

    interface TempLineChart extends BaseChart{}
    interface WindLineChart extends BaseChart{}
    interface PreciBarChart extends BaseChart{}
    interface HourlyMetricsChart extends Omit<BaseChart, 'type'|'unit'>{
        
    }


}

export const METRICS_LABEL: Record<string, string> = {
    temperature_2m: "Temperature",
    relative_humidity_2m: "Relative Humidity",
    apparent_temperature:"Apparent Temperature",
    precipitation: "Precipitation",
    pressure_msl:"Sea Level Pressure",
    wind_speed_10m: "Wind Speed"
} as const

export const LABEL_TO_HOURLY_METRICS: Record<(typeof METRICS_LABEL)[keyof typeof METRICS_LABEL], keyof typeof METRICS_LABEL> = Object.entries(METRICS_LABEL).reduce(
  (acc, [key, value]) => {
    acc[value as keyof typeof LABEL_TO_HOURLY_METRICS] = key as keyof typeof METRICS_LABEL;
    return acc;
  },
  {} as Record<string, keyof typeof METRICS_LABEL>
);

export const METRICS_CHART_TYPE: Record<string, string> = {
    temperature_2m: "spline",
    relative_humidity_2m: "spline",
    apparent_temperature:"spline",
    precipitation: "column",
    pressure_msl:"spline",
    wind_speed_10m: "spline"
} as const

