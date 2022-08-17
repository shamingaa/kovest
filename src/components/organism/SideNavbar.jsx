import { useContext } from "react";
import DashboardLink from "../molecules/DashboardLink";
import GoalsLink from "../molecules/GoalsLink";
import LiquidationLink from "../molecules/LiquidationLink";
import LoanLink from "../molecules/LoanLink";
import SideBarHeader from "../molecules/SideBarHeader";
import TransactionsLink from "../molecules/TransactionsLink";
import { appContext } from "../template/Layout";

const SideNavbar = () => {
  const [user, balance , themeCheck, loading, error, token, goalsShare] = useContext(appContext);


  return (
    <div>
      <nav
        id="sidebar"
        className={`themeTransition ${
          themeCheck === true ? " " : "themeDark"
        }`}
      >
        <div className="sidebar-links">
          <SideBarHeader />

          <ul className="list-unstyled components">
            <li>
              <DashboardLink />
            </li>

            <li>
              <GoalsLink />
            </li>

            <li>
              <TransactionsLink />
            </li>

            {/* <li>
              <LiquidationLink />
            </li>

            <li>
              <LoanLink />
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SideNavbar;
