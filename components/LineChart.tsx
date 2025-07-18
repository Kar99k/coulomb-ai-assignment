import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const SimpleLineChart: React.FC<{data:TempLineChart | WindLineChart}> = ({data})=>{
    
     const options = {
        chart: {
            type: 'line'
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

    return <HighchartsReact highcharts={Highcharts} options={options}/>
}

export default SimpleLineChart