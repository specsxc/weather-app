import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Settings from "./pages/Settings";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function App() {
  const [location, setLocation] = useState({ city: "warsaw" });
  const [weather, setWeather] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  // https://openweathermap.org/img/wn/10d@2x.png
  // useEffect(() => {
  //   fetch(
  //     `http://api.openweathermap.org/geo/1.0/direct?q=${location.city}&appid=${API_KEY}`
  //   )
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw Error("Something went wrong");
  //       }
  //       console.log(res.status);
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setLocation((prev) => ({
  //         ...prev,
  //         latitude: data[0].lat,
  //         longitude: data[0].lon,
  //       }));
  //     });
  // }, [location.city, API_KEY]);

  // useEffect(() => {
  //   if (location.longitude && location.latitude) {
  //     fetch(
  //       `https://api.openweathermap.org/data/3.0/onecall?lat=${location.latitude}&lon=${location.longitude}&units=metric&exclude=minutely,hourly&lang=pl&appid=${API_KEY}`
  //     )
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw Error("Something went wrong");
  //         }
  //         console.log(res.status);
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setWeather({
  //           currentTemp: data.current.temp,
  //           clouds: data.current.clouds,
  //           windDeg: data.current.wind_deg,
  //           windSpeed: data.current.wind_speed,
  //           weatherIcon: data.current.weather[0].icon,
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [location.latitude, location.longitude, API_KEY]);

  console.log(weather);

  return (
    <div className="grid-container">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}
