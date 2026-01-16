export default async function getWeatherData(location, api, units = "metric") {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location.city}&appid=${api}`
    );
    if (!res.ok) {
      console.log(res.status);
      throw Error("Something went wrong");
    }
    const data = await res.json();
    if (!data || data.length === 0) {
      throw new Error("City not found!");
    }
    const country = data[0].country;
    const name = data[0].name;
    const latitude = data[0].lat;
    const longitude = data[0].lon;

    if (longitude && latitude) {
      const res2 = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely,hourly&lang=pl&appid=${api}`
      );
      if (!res2.ok) {
        console.log(res2.status);
        throw Error("Something went wrong");
      }
      const data2 = await res2.json();
      return {
        name: name,
        country: country,
        latitude: latitude,
        longitude: longitude,
        dailyWeather: data2.daily,
        currentTemp: data2.current.temp,
        weatherStatus: data2.current.weather[0].main,
        clouds: data2.current.clouds,
        windDeg: data2.current.wind_deg,
        windSpeed: data2.current.wind_speed,
        weatherIcon: data2.current.weather[0].icon,
      };
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
