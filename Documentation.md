# Project Documentation
Name : Karthikeyan </br>
Github Link: https://github.com/Kar99k/coulomb-ai-assignment

## 1. CodeBase Structure & Organization : 
<pre lang="markdown">
coulomb-ai-assignment/ 
├── __tests__/ - <span style="color:green">contains all test files</span>
├── app/ - app router
│     ├── detailedView/
|     │     └── page.tsx - <span style="color:green">drilldown page</span>
│     ├── layout.tsx - <span style="color:green">layout design</span>
|     └── page.tsx - <span style="color:green">overview page</span>
├── components/
│     ├── atoms/ - <span style="color:green">has basic components like button,dropdown..</span>
│     ├── molecules/ - <span style="color:green">components composed of atoms, adding logic and behavior</span>
│     ├── templates/ - <span style="color:green">reusage chart templates</span>
|     └── pages/ - <span style="color:green">has page template</span>
├── lib/ - 
│     ├── api.ts - <span style="color:green">handles all the api calls and fetching the data</span>
│     ├── constants.ts - <span style="color:green">constants</span>
│     ├── data.ts - <span style="color:green">test datas</span>
│     └── utils.ts - <span style="color:green">handles and creates chart options and configs</span>
├── public/ -  <span style="color:green">static files</span>
├── types/ - <span style="color:green">user defined custom types</span>
│     ├── global.ts 
│     └── metrics.ts
</pre>


## 2. Low Level Design

### Functional Requirements :

### Reusable Components
- **UI Components**: Navbar, Sidebar, UserIcon, Calendar Range Picker, Multi-Select Dropdown, Single-Select with Radio Buttons

- **Chart Components**: DailyChartWidget, HourlyChartWidget
    - Accept config + data as props

### Pages
- **Overview Page**  
  - Displays: `2 Line Charts` + `1 Bar Chart`  
  - Filters:  
    - **Date Range Picker** (max 3 months)  
    - **Location Selector** (6 default countries)  
  - Default: All countries selected  
  - Routing: Click → Detailed page with query params  

- **Detailed Insights Page**  
  - Single large **customizable chart**  
  - Filter:  
    - **Metric Selector** (Max 2: adds dual Y-axis + legend/color codes)  
    - Date & Location filters (same as overview)

### API Integration
- **Base URL**: `https://archive-api.open-meteo.com/v1/archive`  
- **Endpoints**:
  - **Temperature (Daily)**:  
    `daily=temperature_2m_max,temperature_2m_min,apparent_temperature_mean`
  - **Precipitation (Daily)**:  
    `daily=precipitation_sum`
  - **Wind Speed (Daily)**:  
    `daily=wind_speed_10m_max`
  - **Bulk Query (Multi-country)**:  
    `latitude`, `longitude`, `start_date`, `end_date`, `daily`, `timezone` each as comma-separated values
  - **Hourly Metrics API** (Detailed Page):  
    `hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,pressure_msl,wind_speed_10m`


### Locations  
| Country     | Lat       | Lon       | Timezone         |
|-------------|-----------|-----------|------------------|
| India       | 28.6139   | 77.2090   | Asia/Kolkata     |
| China       | 39.9042   | 116.4074  | Asia/Shanghai    |
| USA         | 40.7128   | -74.0060  | America/New_York |
| UK          | 51.5074   | -0.1278   | Europe/London    |
| Japan       | 35.6895   | 139.6917  | Asia/Tokyo       |
| Australia   | -33.8688  | 151.2093  | Australia/Sydney |

### Non-Functional Requirements : 

### Layout & Responsiveness
- **Structure**: `Header`, `Sidebar`, `Title Pane`, `Filter Pane`, `Widget Pane`
- **Grid**:
  - `>xl`: 3 columns  
  - `md-xl`: 2 columns  
  - `<md`: 1 column  

### API Handling
- **Central API utility** (`lib/api.ts`)
- Data fetched/refreshed on filter interactions

## Covered Pointers

- Future-ready support for **multi-country selection**
- **Legends** added for individual countries
- **Color-coded series** to distinguish country-wise data
- **"All countries"** handled as default view state
- **Tooltips on hover** implemented for better data visibility
- On **legend hover**, chart visually isolates the corresponding data series

## Testing strategies : 
### Component Testing
- Focused on **individual components**, especially **reusable UI components**.
- Ensures props, states, interactions, and render logic work as expected.

### Tools Used
- **Jest** – Test runner for executing tests.
- **React Testing Library (RTL)** – DOM-focused library to test UI the way users interact with it.

