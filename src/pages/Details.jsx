import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

export default function Details(props) {
  const unitSystem = useSelector((state) => state.units.system);

  const date = new Date();

  const currentDate = date.toLocaleDateString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // const currentTime = date.toLocaleTimeString("en-us", {
  //   timeStyle: "short",
  // });

  function windDirection(deg) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }

  if (!props.weather || !props.weather.dailyWeather) {
    return <div className="loading">Pobieranie prognozy...</div>;
  }

  const symbols = {
    metric: "°C",
    imperial: "°F",
    standard: " K",
  };

  return (
    <>
      <div className="details-view">
        <div className="header-container">
          <div className="location-container">
            <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
            <div>
              <h1>
                {props.weather.name}, {props.weather.country}
              </h1>
              <h3>{currentDate}</h3>
            </div>
          </div>
          <button className="favourites-button">
            <FontAwesomeIcon icon={faHeart} />
            <span>Add to favourites</span>
          </button>
        </div>
        <div className="weather-details">
          <div className="temp-details">
            <img
              className="weather-temp-icon"
              src={`https://openweathermap.org/img/wn/${props.weather.weatherIcon}@2x.png`}
            />
            <div>
              <h2>
                {Math.floor(props.weather.currentTemp)}
                {symbols[unitSystem]}
              </h2>
              <p className="weather-status">{props.weather.weatherStatus}</p>
            </div>
          </div>
          <div className="info-details">
            <div className="box-weather">
              <p>Clouds</p>
              <span>{props.weather.clouds}%</span>
            </div>
            <div className="box-weather">
              <p>Wind</p>
              <span>{windDirection(props.weather.windDeg)}</span>
            </div>
            <div className="box-weather">
              <p>Wind speed</p>
              <span>{props.weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
        <div className="forecast-container">
          <div className="forecast-header">
            <p>5-Day Forecast</p>
            <p className="forecast-expect">Expected Conditions</p>
          </div>
          <div className="forecast-flex">
            {props.weather.dailyWeather.slice(1, 6).map((day, index) => (
              <div key={index} className="forecast-day">
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                />
                <div className="forecast-min-max">
                  <h3>
                    {Math.floor(day.temp.max)}
                    {symbols[unitSystem]}
                  </h3>
                  <p>
                    {Math.floor(day.temp.min)}
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
