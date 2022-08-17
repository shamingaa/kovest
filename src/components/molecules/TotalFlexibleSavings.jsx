import { Col, Row } from "react-bootstrap";
import money from "../../assets/money.svg";
import { useContext } from "react";
import { appContext } from "../template/Layout";

const TotalFlexibleSavings = () => {
  const [user, balance , themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const [goals, setGoals] = goalsShare;
  const { fixed_savings, flexible_savings } = balance;

  return (
    <Row id="card-shape">
      <Col>
        <img src={money} alt="invest Icon" id="flexible-money-icon" />
      </Col>
      <Col>
        <div className="balance-info">
          <span
            id={themeCheck ? "total-balance-text" : "themeTransition total-balance-text-dark"}
          >
            Flexible Savings
          </span>
          <h1 id="flexible-amount">₦{flexible_savings?.toLocaleString("en-US")}</h1>
        </div>
      </Col>
    </Row>
  );
};

export default TotalFlexibleSavings;
