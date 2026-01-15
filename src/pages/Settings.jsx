import { useDispatch, useSelector } from "react-redux";
import { setUnit } from "../store/unitSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
  const dispatch = useDispatch();
  const currentUnit = useSelector((state) => state.units.system);

  const options = [
    { id: "metric", label: "°C" },
    { id: "imperial", label: "°F" },
    { id: "standard", label: "K" },
  ];

  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faGear} className="settings-icon" />
        Settings
      </div>
      <div className="unit-controls">
        {options.map((opt) => (
          <button
            key={opt.id}
            className={currentUnit === opt.id ? "active" : ""}
            onClick={() => dispatch(setUnit(opt.id))}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
