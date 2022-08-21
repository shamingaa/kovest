import { Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { appContext } from "../template/Layout";
import AddSVG from "../atom/AddSVG";
import SendSVG from "../atom/SendSVG";
import ripple from "../../assets/ripple.svg"
import { currentDate } from "../../services/Authenticator";
// import { currentTime } from "../../services/Authenticator";
import { useNavigate } from "react-router-dom";

const TotalBalanceCard = () => {
  const navigate = useNavigate();
  const [user, balance, themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const [goals, setGoals] = goalsShare;
  const { fixed_savings, flexible_savings } = balance;

  const totalBalance = fixed_savings + flexible_savings;

  const redirectToCreateGoal = () => {
    return navigate("/app/createGoal");
  };

  const redirectToLiquidation = () => {
    return navigate("/app/goals");
  };

  return (
    <div
      className={`dashboard-cards themeTransition  ${
        themeCheck ? " " : "themeDark"
      }`}

      id="balance_card_small"
    >
      <Row id="total-balance-row">
        <Col>
          <div className="balance-info">
            <span
              id={
                themeCheck
                  ? "total-balance-text"
                  : "themeTransition total-balance-text-dark"
              }
            >
              Your Total Balance
            </span>
            <h1 id="total-amount">₦{totalBalance.toLocaleString("en-US")}</h1>
            <span>{currentDate()}</span>
          </div>
        </Col>

        <Col>
          <Row
            className={`total-balance-buttons themeTransition ${
              themeCheck ? " " : "total-balance-button-theme"
            } `}
          >
            <Col>
              <div
                className={`bg-light buttonGroup themeTransition ${
                  themeCheck ? " " : "buttonGroup-dark"
                } `}
                onClick={redirectToLiquidation}
              >
                <div className="iconCase">
                  <SendSVG />
                  <span>Send</span>
                </div>
              </div>
            </Col>
            <Col>
              <div
                className={`bg-light buttonGroup themeTransition ${
                  themeCheck ? " " : "buttonGroup-dark"
                } `}
                onClick={redirectToCreateGoal}
              >
                <div className="iconCase">
                  <AddSVG />
                  <span>Add</span>
                  <img style={{width: 24}} src={ripple} alt="loader" />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TotalBalanceCard;
