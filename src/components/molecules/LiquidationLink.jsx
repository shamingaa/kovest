import { Link, NavLink } from "react-router-dom";
import WalletSVG from "../atom/WalletSVG";

const LiquidationLink = () => {
  return (
    <NavLink activeClassName="active" id="side" to={"/app/liquidation"}>
      <div className="dashboard">
        <div className="sideLinkWrapper">
          <WalletSVG />
          <span>Liquidation</span>
        </div>
      </div>
    </NavLink>
  );
};

export default LiquidationLink;
