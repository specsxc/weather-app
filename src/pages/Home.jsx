import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

export default function Home() {
  return (
    <main>
      <div className="homeView">
        <div className="search-box">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            type="text"
            className="searchInput"
            placeholder="Search for a city..."
          />
        </div>
        <p className="savedCitiesText">Saved cities</p>

        <div className="city">
          <h2>Warsaw</h2>

          <p className="weatherCurrent">
            <img src="https://openweathermap.org/img/wn/13n@2x.png" />
            Temp
          </p>
        </div>
        <button className="primary-btn">test1</button>
      </div>
    </main>
  );
}
