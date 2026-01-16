import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";
import Favourites from "./pages/Favorites";
import getWeatherData from "./services/getWeatherData";
import { useSelector } from "react-redux";

export default function App() {
  const unitSystem = useSelector((state) => state.units.system);
  const [location, setLocation] = useState({ city: "" });
  const [weather, setWeather] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!location.city) {
      return;
    }
    const fetchAll = async () => {
      const data = await getWeatherData(location, API_KEY, unitSystem);
      if (data) {
        setWeather(data);
      }
    };
    fetchAll();
  }, [location, API_KEY, unitSystem]);

  return (
    <div className="grid-container">
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <Home
                weather={weather}
                setLocation={setLocation}
                location={location}
              />
            }
          />
          <Route
            path="/favourites"
            element={<Favourites setLocation={setLocation} />}
          />
          <Route
            path="/details"
            element={
              <Details weather={weather} getWeatherData={getWeatherData} />
            }
          />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}
