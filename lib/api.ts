const BASE_URL = "https://archive-api.open-meteo.com/v1/archive";

type SearchParams = {
  lat: string;
  lon: string;
  start_date: string;
  end_date: string;
  timezone: string;
  dailyMetrics?: string[];
  hourlyMetrics?:string[];
};

export async function getAllMetricsbyParams({
  lat,
  lon,
  start_date,
  end_date,
  timezone,
  dailyMetrics=[],
  hourlyMetrics=[]
}: SearchParams) {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", lon);
    url.searchParams.set("start_date", start_date);
    url.searchParams.set("end_date", end_date);
    url.searchParams.set("timezone", timezone);
    if(dailyMetrics.length>0) url.searchParams.set("daily", dailyMetrics.join(","));
    if(hourlyMetrics.length>0) url.searchParams.set("hourly", hourlyMetrics.join(","));
    
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
}