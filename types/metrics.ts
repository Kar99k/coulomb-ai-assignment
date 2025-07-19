interface BaseMetrics {
    latitude: number;
    longitude: number;
    timezone: string;
}

interface DailyMetrics extends BaseMetrics {
    daily: Record<string,string[] | number[]>;
    daily_units?: Record<string,string>;
}

interface HourlyMetrics extends BaseMetrics {
    hourly: Record<string,string[] | number[]>;
    hourly_units?: Record<string,string>;
}