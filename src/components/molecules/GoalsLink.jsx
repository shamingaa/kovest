import { NavLink } from "react-router-dom";
import JarSVG from "../atom/JarSVG";

const GoalsLink = () => {
  return (
    <NavLink activeClassName="active" id="side" to={"/app/goals"}>
      <div className="dashboard">
        <div className="sideLinkWrapper">
          <JarSVG />
          <span>Goals</span>
        </div>
      </div>
    </NavLink>
  );
};

export default GoalsLink;
