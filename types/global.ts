import { METRICS_LABEL } from "@/lib/constants";

export {};

declare global {

    type AllowedLocations = "India" | "China" | "USA" | "UK" | "Japan" | "Australia" ;
    type AllowedMetrics = "temperature_2m" | "relative_humidity_2m" | "apparent_temperature" | "precipitation" | "pressure_msl" | "wind_speed_10m";

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
    interface HourlyMetricsChart extends Omit<BaseChart, 'type'|'unit'>{ }


}