import { METRICS_LABEL, METRICS_CHART_TYPE, LOCATIONS } from "@/lib/constants";


const TAILWIND_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#14b8a6', '#ec4899', '#f97316', '#22c55e', '#0ea5e9',
];

export function extractChartConfigByDailyMetric(
  data: any | any[],
  { Temperature = [], Precipitation = [], WindSpeed = [] }: DailyMetricCategory
) {
  const isArray = Array.isArray(data);
  const dataArray = isArray ? data : [data];
  const time = dataArray[0]?.daily?.time || [];

  const getLocationMeta = (timezone: string) => {
    for (const [name, meta] of Object.entries(LOCATIONS)) {
      if (meta.tz === timezone) {
        return { name, color: meta.color };
      }
    }
    return { name: 'Unknown', color: '#999' };
  };

  const usedColorMap = new Map<string, string>();
  let colorIndex = 0;

  const getColorFor = (location: string, metric: string) => {
    const key = `${location}_${metric}`;
    if (usedColorMap.has(key)) return usedColorMap.get(key)!;
    const color = TAILWIND_COLORS[colorIndex % TAILWIND_COLORS.length];
    usedColorMap.set(key, color);
    colorIndex++;
    return color;
  };

  const createSeries = (metrics: string[]) => {
    const allSeries: { name: string; data: number[]; color?: string }[] = [];

    dataArray.forEach((d) => {
      const BulkMetricData = d.daily;
      const { name: locationName } = getLocationMeta(d.timezone);

      metrics.forEach((metric: string) => {
        if (BulkMetricData[metric]) {
          const label = METRICS_LABEL[metric as keyof typeof METRICS_LABEL] ?? metric;
          const seriesItem: { name: string; data: number[]; color?: string } = {
            name: `${locationName} - ${label}`,
            data: BulkMetricData[metric],
          };

          if (isArray || metrics.length > 1) {
            seriesItem.color = getColorFor(locationName, metric);
          }

          allSeries.push(seriesItem);
        }
      });
    });

    return allSeries;
  };

  const pickUnit = (metricList: string[], d: any) =>
    metricList.map((m) => d.daily_units?.[m]).filter(Boolean)[0] || '';

  const TempChartConfig = {
    title: 'Temperature',
    type: 'spline',
    xAxis: time,
    unit: pickUnit(Temperature, dataArray[0]),
    series: createSeries(Temperature),
  };

  const PreciChartConfig = {
    title: 'Precipitation',
    type: 'column',
    xAxis: time,
    unit: pickUnit(Precipitation, dataArray[0]),
    series: createSeries(Precipitation),
  };

  const WindChartConfig = {
    title: 'Wind Speed',
    type: 'spline',
    xAxis: time,
    unit: pickUnit(WindSpeed, dataArray[0]),
    series: createSeries(WindSpeed),
  };

  console.log({ TempChartConfig, PreciChartConfig, WindChartConfig });
  return { TempChartConfig, PreciChartConfig, WindChartConfig };
}

export function extractChartConfigByHourlyMetric(
  data: any | any[],
  multi_metric: string[]
): HourlyMetricsChart {
  const isArray = Array.isArray(data);
  const dataArray = isArray ? data : [data];

  const time = dataArray[0]?.hourly?.time || [];

  const getLocationMeta = (timezone: string) => {
    for (const [name, meta] of Object.entries(LOCATIONS)) {
      if (meta.tz === timezone) {
        return { name, color: meta.color };
      }
    }
    return { name: 'Unknown', color: '#999' };
  };

  const usedColorMap = new Map<string, string>();
  let colorIndex = 0;

  const getColorFor = (location: string, metric: string) => {
    const key = `${location}_${metric}`;
    if (usedColorMap.has(key)) return usedColorMap.get(key)!;
    const color = TAILWIND_COLORS[colorIndex % TAILWIND_COLORS.length];
    usedColorMap.set(key, color);
    colorIndex++;
    return color;
  };

  const series: DataSeries[] = [];
  const yAxis: any[] = [];
  const titleParts: string[] = [];

  multi_metric.forEach((metric, metricIndex) => {
    dataArray.forEach((d) => {
      const BulkMetricData = d?.hourly as Record<string, any>;
      const locationMeta = getLocationMeta(d.timezone);
      const metricData = BulkMetricData?.[metric];
      const unit = d?.hourly_units?.[metric];

      if (!metricData) return;

      const name = `${locationMeta.name} - ${
        METRICS_LABEL[metric as keyof typeof METRICS_LABEL] ?? metric
      }`;

      series.push({
        name,
        data: metricData,
        type: METRICS_CHART_TYPE[metric] ?? 'spline',
        tooltip: {
          valueSuffix: unit,
        },
        yAxis: metricIndex,
        color: getColorFor(locationMeta.name, metric),
      });
    });

    yAxis.push({
      title: {
        text: METRICS_LABEL[metric as keyof typeof METRICS_LABEL] ?? metric,
      },
      opposite: metricIndex % 2 === 1,
    });

    titleParts.push(METRICS_LABEL[metric as keyof typeof METRICS_LABEL] ?? metric);
  });

  return {
    xAxis: time,
    yAxis,
    series,
    title: titleParts.join(', '),
  };
}


export function multiSelectCountries(countries: LocationOption[]) {
  const isAll = countries.includes("All Locations");
  const keys = isAll ? Object.keys(LOCATIONS) as AllowedLocations[] : countries as AllowedLocations[];

  const latitudes: string[] = [];
  const longitudes: string[] = [];
  const timezone: string[] = [];

  keys.forEach((country) => {
    const location = LOCATIONS[country];
    if (location) {
      latitudes.push(location.lat);
      longitudes.push(location.lon);
      timezone.push(location.tz);
    }
  });

  return {
    lat: latitudes.join(','),
    lon: longitudes.join(','),
    tz: timezone.join(',')
  };
}