import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home({ weather, location, setLocation }) {
  const unitSystem = useSelector((state) => state.units.system);

  const symbols = {
    metric: "°C",
    imperial: "°F",
    standard: " K",
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get("city").toLowerCase().trim();
    if (city !== "") {
      setLocation({ city: city });
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
      <p className="savedCitiesText">Saved cities</p>
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
    </div>
  );
}
