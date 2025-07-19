
export const Routes = {
  Home:{
    label:"Home",
    path:"/"
  },
  DrilledDown:{
    label:"Detailed View",
    path:"/detailedView"
  }
} as const

export const METRICS_LABEL = {
  temperature_2m: "Temperature",
  relative_humidity_2m: "Relative Humidity",
  apparent_temperature: "Apparent Temperature",
  precipitation: "Precipitation",
  pressure_msl: "Sea Level Pressure",
  wind_speed_10m: "Wind Speed",
};

export const METRICS_CHART_TYPE: Record<string, string> = {
    temperature_2m: "spline",
    relative_humidity_2m: "spline",
    apparent_temperature:"spline",
    precipitation: "column",
    pressure_msl:"spline",
    wind_speed_10m: "spline"
} as const

export const LOCATIONS: Record<AllowedLocations, { lat: string; lon: string; tz: string }> = {
  India: {
    lat: "28.6139",
    lon: "77.2090",
    tz: "Asia/Kolkata",
  },
  China: {
    lat: "39.9042",
    lon: "116.4074",
    tz: "Asia/Shanghai",
  },
  USA: {
    lat: "40.7128",
    lon: "-74.0060",
    tz: "America/New_York",
  },
  UK: {
    lat: "51.5074",
    lon: "-0.1278",
    tz: "Europe/London",
  },
  Japan: {
    lat: "35.6895",
    lon: "139.6917",
    tz: "Asia/Tokyo",
  },
  Australia: {
    lat: "-33.8688",
    lon: "151.2093",
    tz: "Australia/Sydney",
  },
} as const;