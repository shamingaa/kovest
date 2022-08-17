import { NavLink } from "react-router-dom";
import TransactionSVG from "../atom/TransactionSVG";

const LoanLink = () => {
  return (
    <NavLink id="side" to={"/app/das"}>
      <div className="dashboard">
        <div className="sideLinkWrapper">
          <TransactionSVG />
          <span>loans</span>
        </div>
      </div>
    </NavLink>
  );
};

export default LoanLink;
