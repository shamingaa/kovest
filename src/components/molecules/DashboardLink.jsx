import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import HomeSVG from "../atom/HomeSVG";
import { appContext } from "../template/Layout";

const DashboardLink = () => {
  return (
    <NavLink exact activeClassName="active" id="side" to={"/app/dashboard"}>
      <div className="dashboard">
        <div className="sideLinkWrapper">
          <HomeSVG />
          <span>Dashboard</span>
        </div>
      </div>
    </NavLink>
  );
};

export default DashboardLink;
