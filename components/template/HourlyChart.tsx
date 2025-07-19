import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const HourlyChart: React.FC<{data:HourlyMetricsChart}> = ({data})=>{
     const options = {
        chart: {
            type: 'column'
        },
         boost: {
            useGPUTranslations: true,
            usePreAllocated: true
         },
        title: {
            text: ''
        },
        xAxis: {
            categories: data?.xAxis,
            title: {
                text: 'Hourly'
            }
        },
        tooltip: {
            shared: true
        },
        yAxis: data.yAxis,
        series: data.series
    };

    return <HighchartsReact highcharts={Highcharts} options={options}/>
}

export default HourlyChart

