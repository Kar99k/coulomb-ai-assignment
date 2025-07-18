export {};

declare global {

    type DataSeries = {
        name: string
        data: number[]
    }
    interface TempLineChart {
        title: string
        xAxis: string[]
        unit: string
        series: DataSeries[]
    }

    interface WindLineChart extends TempLineChart{}

}