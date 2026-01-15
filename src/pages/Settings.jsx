import { useDispatch, useSelector } from "react-redux";
import { setUnit } from "../store/unitSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

export default function Settings() {
  const dispatch = useDispatch();
  const currentUnit = useSelector((state) => state.units.system);

  const options = [
    { id: "metric", label: "°C", title: "Celsius", desc: "Metric system (°C)" },
    {
      id: "imperial",
      label: "°F",
      title: "Fahrenheit",
      desc: "Imperial system (°F)",
    },
    { id: "standard", label: "K", title: "Kelvin", desc: "Scientific (K)" },
  ];

  return (
    <div className="settings-view">
      <div>
        <div className="header-settings">
          <FontAwesomeIcon icon={faGear} className="settings-icon" />
          <h1>Settings</h1>
        </div>
        <div>
          <h2>Unit preferences</h2>
          <p className="header-desc">
            Personalize your weather experience. Changes are applied instantly
            across all dashboards and detailed views.
          </p>
        </div>

        <h3 className="settings-text">Temperature</h3>
        <div className="units-container">
          {options.map((opt) => (
            <label
              key={opt.id}
              className={`unit-option ${
                currentUnit === opt.id ? "active" : ""
              }`}
            >
              <div className="option-content">
                <p className="title-option">{opt.title}</p>
                <p className="desc-option">{opt.desc}</p>
              </div>
              <input
                type="radio"
                name="weather-unit"
                className="radio-input"
                value={opt.id}
                checked={currentUnit === opt.id}
                onChange={() => dispatch(setUnit(opt.id))}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="settings-footer">
        <Footer />
      </div>
    </div>
  );
}
