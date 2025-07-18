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
    interface HourlyMetricsChart extends Omit<BaseChart, 'type'|'unit'>{ }


}