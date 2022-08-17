import { Col, Row } from "react-bootstrap";
import investIcon from "../../assets/loan.svg";
import { useContext } from "react";
import { appContext } from "../template/Layout";
import { currentDate } from "../../services/Authenticator";

const InvestmentCard = () => {
  const [user, balance, themeCheck, loading, error, token, goalsShare] = useContext(appContext);

  return (
    <div
      className={`dashboard-cards  investment-card themeTransition  ${
        themeCheck ? " " : "invest-dark-theme"
      }`}
    >
      <Row id="card-shape">
        <Col>
          <img src={investIcon} alt="invest Icon" id="invest-icon" />
        </Col>
        <Col>
          <div className="balance-info">
            <span
              id={
                themeCheck
                  ? "total-balance-text"
                  : "themeTransition total-balance-text-dark"
              }
            >
              Your Investment
            </span>
            <h1 id="investment-amount">₦0</h1>
            <span>{currentDate()}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvestmentCard;
