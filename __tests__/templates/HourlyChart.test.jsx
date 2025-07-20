import { render, screen } from '@testing-library/react';
import HourlyChart from '@/components/templates/HourlyChart';

jest.mock('highcharts-react-official', () => {
    return ({ options }) => (
        <div data-testid="mock-highchart" data-options={JSON.stringify(options)} />
    );
});

const mockData = {
    xAxis: ['01:00', '02:00', '03:00'],
    yAxis: [
        {
            title: { text: 'Temperature (°C)' },
        },
    ],
    series: [
        {
            name: 'City A',
            data: [21, 23, 22],
        },
        {
            name: 'City B',
            data: [25, 27, 26],
        },
    ],
};

describe('HourlyChart', () => {
    it('renders with correct chart config', () => {
        render(<HourlyChart data={mockData} />);

        const chart = screen.getByTestId('mock-highchart');
        expect(chart).toBeInTheDocument();

        const options = JSON.parse(chart.getAttribute('data-options'));

        expect(options.chart.type).toBe('column');
        expect(options.xAxis.categories).toEqual(['01:00', '02:00', '03:00']);
        expect(options.xAxis.title.text).toBe('Hourly');

        expect(options.yAxis).toHaveLength(1);
        expect(options.yAxis[0].title.text).toBe('Temperature (°C)');

        expect(options.series).toHaveLength(2);
        expect(options.series[0].name).toBe('City A');
        expect(options.series[1].data).toEqual([25, 27, 26]);

        expect(options.boost.useGPUTranslations).toBe(true);
        expect(options.boost.usePreAllocated).toBe(true);
    });
});