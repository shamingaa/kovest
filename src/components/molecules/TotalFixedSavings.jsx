import { Col, Row } from "react-bootstrap";
import lock from "../../assets/locked.svg";
import { useContext } from "react";
import { appContext } from "../template/Layout";
import { useEffect } from "react";

const FixedGoalCard = () => {
  const [user, balance , themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const [goals, setGoals] = goalsShare;
  const { fixed_savings, flexible_savings } = balance;
  return (
    <Row id="card-shape">
      <Col>
        <img src={lock} alt="invest Icon"  id="lock" />
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
            Fixed Savings
          </span>
          <h1 id="fixed-amount">₦{fixed_savings?.toLocaleString("en-US")}</h1>
        </div>
      </Col>
    </Row>
  );
};

export default FixedGoalCard;
