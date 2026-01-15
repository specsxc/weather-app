import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

export default function Details(props) {
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
  // function changeTimestamp(timestamp) {
  //   if (timestamp) {
  //     const offset = 3600;
  //     const day = new Date((timestamp + offset) * 1000).toLocaleDateString(
  //       "en-us",
  //       {
  //         weekday: "short",
  //       }
  //     );
  //     return day;
  //   }
  // }

  console.log(props.weather);

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
              <h2>{Math.floor(props.weather.currentTemp)}&deg;C</h2>
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

          <div className="forecast-day">
            {/* {changeTimestamp(props.weather.dailyWeather[0].dt)} */}
          </div>
          <div className="forecast-day">
            {/* {changeTimestamp(props.weather.dailyWeather[1].dt)} */}
          </div>
          <div className="forecast-day">
            {/* {changeTimestamp(props.weather.dailyWeather[2].dt)} */}
          </div>
          <div className="forecast-day">
            {/* {changeTimestamp(props.weather.dailyWeather[3].dt)} */}
          </div>
          <div className="forecast-day">
            {/* {changeTimestamp(props.weather.dailyWeather[4].dt)} */}
          </div>
        </div>
      </div>
    </>
  );
}
