import { useContext } from "react";
import { Container } from "react-bootstrap";
import { appContext } from "../template/Layout";
import NoGoalPage from "../molecules/NoGoalPage";
import TransactionsCard from "../molecules/TransactionsCard";
import NoLiquidation from "../molecules/NoLiquidation";

const Transactions = () => {
  const [user, balance , themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
    const [goals, setGoals] = goalsShare;

  return (
    <>
      <Container>
        <h5 id="historyTitle">All transactions</h5>
      </Container>
      {goals.length === 0 ? <NoLiquidation /> : <TransactionsCard />}
    </>
  );
};

export default Transactions;
