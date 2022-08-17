import { useNavigate } from "react-router-dom";

const NoGoalPage = () => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate("/app/createGoal")
  }


  return (
    <div className="noGoals">
      <div className="noGoalBox">
        <h4>Goals</h4>
        <span>
          You have no goals at the moment. When you do, your goals shows here.
        </span>
        <button id="createGoalBtn" onClick={handleRedirect}>Create a goal</button>
      </div>
    </div>
  );
};

export default NoGoalPage;
