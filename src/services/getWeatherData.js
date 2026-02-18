export default async function getWeatherData(location, api, units = "metric") {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location.city}&units=${units}&appid=${api}`,
    );
    if (!res.ok) {
      console.log(res.status);
      throw Error("Something went wrong");
    }
    const data = await res.json();
    return {
      name: data.city.name,
      country: data.city.country,
      list: data.list,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
