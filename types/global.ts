export {};

declare global {

    type DataSeries = {
        name: string
        type?:string
        data: number[]
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
    interface HourlyMetricsChart extends Omit<BaseChart, 'type'>{}
}