import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import getWeatherData from "../services/getWeatherData";

export default function Home({ weather, location, setLocation }) {
  const unitSystem = useSelector((state) => state.units.system);
  const favouriteNames = useSelector((state) => state.favorites.items);
  const [topFavs, setTopFavs] = useState([]);
  const api = import.meta.env.VITE_WEATHER_API_KEY;

  const symbols = {
    metric: "°C",
    imperial: "°F",
    standard: " K",
  };

  useEffect(() => {
    const fetchTopFive = async () => {
      try {
        if (favouriteNames.length === 0) {
          setTopFavs((prev) => (prev.length > 0 ? [] : prev));
          return;
        }
        const firstFive = favouriteNames.slice(0, 5);
        const promises = firstFive.map((cityName) =>
          getWeatherData({ city: cityName }, api, unitSystem)
        );

        const results = await Promise.all(promises);
        const validResults = results.filter((res) => res !== null);

        setTopFavs(validResults);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchTopFive();
  }, [favouriteNames, api, unitSystem]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get("city").toLowerCase().trim();
    if (city !== "") {
      setLocation({ city: city });
      e.currentTarget.reset();
    }
  }

  return (
    <div className="homeView">
      <div className="search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="city"
            name="city"
            className="searchInput"
            placeholder="Search for a city..."
          />
        </form>
      </div>
      {weather && <p className="last-city-text">Last city</p>}
      {weather && location.city && (
        <NavLink to="/details" className="cityDetails">
          <div className="city">
            <div>
              <h2>{weather.name}</h2>
              <span className="country-code">{weather.country}</span>
            </div>
            <p className="weatherCurrent">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`}
              />
              <span>
                {Math.floor(weather.currentTemp)}
                {symbols[unitSystem]}
              </span>
            </p>
          </div>
        </NavLink>
      )}
      {topFavs.length > 0 && <p className="saved-city-text">Saved cities</p>}
      <div className="favorites-list">
        {topFavs.length > 0 &&
          topFavs.map((fav) => (
            <NavLink
              key={fav.name}
              to="/details"
              state={{ cityName: fav.name }}
              className="cityDetails"
              style={{ marginBottom: "10px" }}
            >
              <div className="city">
                <div>
                  <h2>{fav.name}</h2>
                  <span className="country-code">{fav.country}</span>
                </div>
                <p className="weatherCurrent">
                  <img
                    src={`https://openweathermap.org/img/wn/${fav.weatherIcon}@2x.png`}
                    alt="weather icon"
                  />
                  <span>
                    {Math.floor(fav.currentTemp)}
                    {symbols[unitSystem]}
                  </span>
                </p>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
}
