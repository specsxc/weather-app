import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { symbols } from "../utils/units";

export default function Home({ weather, location, setLocation }) {
  const unitSystem = useSelector((state) => state.units.system);

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
      {location.city && weather && <p className="last-city-text">Last city</p>}
      {location.city && weather && (
        <NavLink to="/details" className="cityDetails">
          <div className="city">
            <div>
              <h2>{weather.name}</h2>
              <span className="country-code">{weather.country}</span>
            </div>
            <p className="weatherCurrent">
              <img
                src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
                alt={weather.list[0].weather[0].description}
              />
              <span>
                {Math.round(weather.list[0].main.temp)}
                {symbols[unitSystem]}
              </span>
            </p>
          </div>
        </NavLink>
      )}
    </div>
  );
}
