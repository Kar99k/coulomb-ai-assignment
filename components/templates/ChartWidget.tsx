import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const ChartWidget: React.FC<{data:TempLineChart | WindLineChart | PreciBarChart}> = ({data})=>{
    
     const options = {
        chart: {
            type: data.type
        },
        accessibility: {
            enabled: false,
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
                text: 'Daily'
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

    return <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ 'data-testid': 'chart-container' }}/>
}

export default ChartWidget