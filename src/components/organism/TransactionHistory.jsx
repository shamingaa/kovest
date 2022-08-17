import { Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TransactionHistoryTitle from "../atom/TransactionHistoryTitle";
import TransactionHistoryData from "../molecules/TransactionHistoryData";
import TransactionHistoryHeader from "../molecules/TransactionHistoryHeader";

const TransactionGoalList = () => {
  const { state } = useLocation();
  const { goal_title, id } = state;

  return (
    <Container>
      <TransactionHistoryTitle goalTitle={goal_title} />

      <Col>
        <TransactionHistoryHeader />
      </Col>

      <Col>
        <div className="transaction_wrapper">
          <TransactionHistoryData goalData={{ goal_title, id }} />
        </div>
      </Col>
    </Container>
  );
};

export default TransactionGoalList;
