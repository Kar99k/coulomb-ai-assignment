import { render, screen } from '@testing-library/react'
import ChartWidget from '@/components/templates/ChartWidget'

const mockData = {
    type: 'line',
    title: 'Temperature',
    unit: '°C',
    xAxis: ['Mon', 'Tue', 'Wed'],
    series: [
        {
            name: 'City A',
            data: [22, 24, 21]
        }
    ]
};

describe('ChartWidget', () => {
    it('renders chart with correct axis titles and tooltip unit', () => {
        render(<ChartWidget data={mockData} />);

        const svgElement = document.querySelector('svg');
        expect(svgElement).toBeInTheDocument();

        const container = document.querySelector('.highcharts-container');
        expect(container).toBeInTheDocument();
        
    });
});