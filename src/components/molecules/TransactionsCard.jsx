import { useContext } from "react";
import { Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { appContext } from "../template/Layout";

const TransactionsCard = () => {
  const [user, balance , themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const [goals, setGoals] = goalsShare;
  const navigate = useNavigate();

  return goals.map(({ goal_title, savings_status, id }) => (
    <Container key={id}>
      <Col>
        <div
          className={`goal_list themeTransition ${
            themeCheck ? "" : "themeDark"
          }`}
          onClick={() =>
            navigate("/app/transactions/list", { state: {goal_title, id} })
          }
        >
          <div className="goal_holder">
            <h5>{goal_title}</h5>
            <span id="goal_status_completed">{savings_status}</span>
          </div>
        </div>
      </Col>
    </Container>
  ));
};

export default TransactionsCard;
