import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faHouse,
  faHeart,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-section">
        <NavLink to="/" className="homeButton">
          <FontAwesomeIcon icon={faCloud} className="sidebar-home" />
        </NavLink>
        <NavLink to="/">
          <FontAwesomeIcon icon={faHouse} className="sidebar-icon" />
        </NavLink>
        <NavLink to="/favourites">
          <FontAwesomeIcon icon={faHeart} className="sidebar-icon" />
        </NavLink>
      </div>
      <NavLink to="/settings">
        <FontAwesomeIcon icon={faGear} className="sidebar-icon" />
      </NavLink>
    </nav>
  );
}
