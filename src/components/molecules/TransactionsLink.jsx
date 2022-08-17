import { Link, NavLink } from "react-router-dom";
import TransactionSVG from "../atom/TransactionSVG";

const TransactionsLink = () => {
  return (
    <NavLink activClassName="active" id="side" to={"/app/transactions/goals"}>
      <div className="dashboard">
        <div className="sideLinkWrapper">
          <TransactionSVG />
          <span>Transactions</span>
        </div>
      </div>
    </NavLink>
  );
};

export default TransactionsLink;
