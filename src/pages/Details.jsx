import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { symbols } from "../utils/units";

export default function Details({ weather, getWeatherData, api }) {
  const location = useLocation();
  const cityFromFavorites = location.state?.cityName;

  const unitSystem = useSelector((state) => state.units.system);

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);

  const isFavorite = weather ? favorites.includes(weather.name) : false;

  useEffect(() => {
    if (cityFromFavorites && weather?.name !== cityFromFavorites) {
      getWeatherData({ city: cityFromFavorites }, api, unitSystem);
    }
  }, [cityFromFavorites, getWeatherData, weather?.name, api, unitSystem]);

  const handleFavoriteClick = () => {
    if (weather && weather.name) {
      dispatch(toggleFavorite(weather.name));
    } else {
      console.error("Error: Data not loaded!");
    }
  };

  if (!weather) {
    return <div className="loading">Fetching weather...</div>;
  }

  const date = new Date();

  const currentDate = date.toLocaleDateString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const dailyForecast = weather.list.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  function windDirection(deg) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }

  return (
    <>
      <div className="details-view">
        <div className="header-container">
          <div className="location-container">
            <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
            <div>
              <h1>
                {weather.name}, {weather.country}
              </h1>
              <h3>{currentDate}</h3>
            </div>
          </div>
          <button
            className={`favourites-button ${isFavorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
          >
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: isFavorite ? "#ff4d4d" : "" }}
              className="favorites-icon"
            />
            <span>
              {isFavorite ? "Remove from favourites" : "Add to favourites"}
            </span>
          </button>
        </div>
        <div className="weather-details">
          <div className="temp-details">
            <img
              className="weather-temp-icon"
              src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
              alt={weather.list[0].weather[0].description}
            />
            <div>
              <h2>
                {Math.round(weather.list[0].main.temp)}
                {symbols[unitSystem]}
              </h2>
              <p className="weather-status">
                {weather.list[0].weather[0].main}
              </p>
            </div>
          </div>
          <div className="info-details">
            <div className="box-weather">
              <p>Clouds</p>
              <span>{weather.list[0].clouds.all}%</span>
            </div>
            <div className="box-weather">
              <p>Wind</p>
              <span>{windDirection(weather.list[0].wind.deg)}</span>
            </div>
            <div className="box-weather">
              <p>Wind speed</p>
              <span>{Math.round(weather.list[0].wind.speed)} km/h</span>
            </div>
          </div>
        </div>
        <div className="forecast-container">
          <div className="forecast-header">
            <p>5-Day Forecast</p>
            <p className="forecast-expect">Expected Conditions</p>
          </div>
          <div className="forecast-flex">
            {dailyForecast.map((day, index) => (
              <div key={index} className="forecast-day">
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                  hour: "numeric",
                })}
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
                <div className="forecast-min-max">
                  <h3>
                    {Math.round(day.main.temp_max)}
                    {symbols[unitSystem]}
                  </h3>
                  <p>
                    {Math.round(day.main.temp_min)}
                    {symbols[unitSystem]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
