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
        yAxis: [{
            title: {
                text: `${data.title} ( ${data?.unit} )`
            }
        }],
        tooltip: {
            shared: true,
            valueSuffix: ` ${data?.unit}`
        },
        series: data?.series
    };

    return <HighchartsReact highcharts={Highcharts} options={options}/>
}

export default HourlyChart