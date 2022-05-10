5am to 10 am is morning sun
10 am to 4 pm is sun afternoon
4 pm to 7 pm is sun evening
7pm to 10 pm is moon at 8
10 pm to 12 am is moon at 11
12 am to 5 am is midnight moon

from fcc-

base: "stations"
clouds: {all: 77}
cod: 200
coord: {lon: 72.83, lat: 21.17}
dt: 1649691205
id: 1255364
main:
feels_like: 31.09
humidity: 74
pressure: 1007
temp: 27.94
temp_max: 27.94
temp_min: 27.94
[[Prototype]]: Object
name: "Surat"
sys: {type: 1, id: 9071, country: 'IN', sunrise: 1649638389, sunset: 1649683562}
timezone: 19800
visibility: 6000
weather: Array(1)
0:
description: "broken clouds"
icon: "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F04n.png?1499366020983"
id: 803
main: "Clouds"
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
wind: {speed: 2.06, deg: 220}

--------->
Date: "2022-04-11T07:00:00+05:30"
Day: {Icon: 30, IconPhrase: 'Hot', HasPrecipitation: false}
EpochDate: 1649640600
Link: "http://www.accuweather.com/en/in/calcutta/3138253/daily-weather-forecast/3138253?day=1&lang=en-us"
MobileLink: "http://www.accuweather.com/en/in/calcutta/3138253/daily-weather-forecast/3138253?day=1&lang=en-us"
Night: {Icon: 37, IconPhrase: 'Hazy moonlight', HasPrecipitation: false}
Sources: ['AccuWeather']
Temperature:
Maximum: {Value: 106, Unit: 'F', UnitType: 18}
Minimum: {Value: 73, Unit: 'F', UnitType: 18}

------->
hourly

{
"DateTime": "2022-04-11T22:00:00+05:30",
"EpochDateTime": 1649694600,
"WeatherIcon": 37,
"IconPhrase": "Hazy moonlight",
"HasPrecipitation": false,
"IsDaylight": false,
"Temperature": {
"Value": 83.0,
"Unit": "F",
"UnitType": 18
},
"PrecipitationProbability": 0,
"MobileLink": "http://www.accuweather.com/en/in/surat/202441/hourly-weather-forecast/202441?day=1&hbhhour=22&lang=en-us",
"Link": "http://www.accuweather.com/en/in/surat/202441/hourly-weather-forecast/202441?day=1&hbhhour=22&lang=en-us"
},

--------> sample

// const hourlyForcastData = [
// { time: "1PM", temp: "20" },
// { time: "2PM", temp: "30" },
// { time: "3PM", temp: "40" },
// { time: "4PM", temp: "50" },
// { time: "5PM", temp: "60" },
// ];
// const dailyForecastData = [
// { day: "Monday", temp: "20" },
// { day: "Tuesday", temp: "30" },
// { day: "Wednesday", temp: "40" },
// { day: "Thursday", temp: "50" },
// { day: "Friday", temp: "60" },
// ];
--------->
Object {
"AdministrativeArea": Object {
"CountryID": "IN",
"EnglishName": "Andhra Pradesh",
"EnglishType": "State",
"ID": "AP",
"Level": 1,
"LocalizedName": "Andhra Pradesh",
"LocalizedType": "State",
},
"Country": Object {
"EnglishName": "India",
"ID": "IN",
"LocalizedName": "India",
},
"DataSets": Array [
"AirQualityCurrentConditions",
"AirQualityForecasts",
"Alerts",
"FutureRadar",
"MinuteCast",
"PremiumAirQuality",
],
"EnglishName": "Nellore",
"GeoPosition": Object {
"Elevation": Object {
"Imperial": Object {
"Unit": "ft",
"UnitType": 0,
"Value": 52,
},
"Metric": Object {
"Unit": "m",
"UnitType": 5,
"Value": 16,
},
},
"Latitude": 14.428,
"Longitude": 79.963,
},
"IsAlias": false,
"Key": "186822",
"LocalizedName": "Nellore",
"PrimaryPostalCode": "",
"Rank": 35,
"Region": Object {
"EnglishName": "Asia",
"ID": "ASI",
"LocalizedName": "Asia",
},
"SupplementalAdminAreas": Array [
Object {
"EnglishName": "Sri Potti Sriramulu Nellore",
"Level": 2,
"LocalizedName": "Sri Potti Sriramulu Nellore",
},
Object {
"EnglishName": "Nellore",
"Level": 3,
"LocalizedName": "Nellore",
},
],
"TimeZone": Object {
"Code": "IST",
"GmtOffset": 5.5,
"IsDaylightSaving": false,
"Name": "Asia/Kolkata",
"NextOffsetChange": null,
},
"Type": "City",
"Version": 1,
}

1. wind velocity
2. 7day forecast
3. sunrise and sunset
4. precipition - expectation of rainfall
