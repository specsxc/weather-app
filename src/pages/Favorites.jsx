import getWeatherData from "../services/getWeatherData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { symbols } from "../utils/units";

export default function Favourites({ setLocation, api }) {
  const unitSystem = useSelector((state) => state.units.system);
  const favouriteNames = useSelector((state) => state.favorites.items);

  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const validCities = favouriteNames.filter(
        (name) => typeof name === "string" && name.length > 0,
      );

      if (validCities.length === 0) {
        setFavData([]);
        return;
      }

      setLoading(true);
      try {
        const promises = favouriteNames.map((city) =>
          getWeatherData({ city: city }, api, unitSystem),
        );
        const results = await Promise.all(promises);
        setFavData(results.filter((res) => res !== null));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (favouriteNames.length > 0) {
      fetchAll();
    } else {
      setFavData([]);
    }
  }, [favouriteNames, api, unitSystem]);

  const handleCitySelect = (cityName) => {
    setLocation({ city: cityName });
  };

  return (
    <div className="favourites-container">
      <h1 className="favorites-header">Your Favourite Cities</h1>

      {loading && <p>Updating weather data...</p>}

      {!loading && favouriteNames.length === 0 && (
        <p>No favourites added yet.</p>
      )}

      <div className="favourites-grid">
        {favData.map((weather) => (
          <NavLink
            key={weather.name}
            to="/details"
            className="cityDetails"
            state={{ cityName: weather.name }}
            onClick={() => handleCitySelect(weather.name)}
          >
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
        ))}
      </div>
    </div>
  );
}
