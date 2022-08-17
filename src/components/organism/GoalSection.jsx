import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const GoalSection = () => {
  return (
    <>
      <Container>
        <div className="goal-section-nav">
          <Link to={"/app/createGoal"}>
            <button id="goal-section-nav-button">Create Goal</button>
          </Link>

          <Link to={"/app/goals"}>
            <button id="goal-section-nav-button"> Goals </button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default GoalSection;
