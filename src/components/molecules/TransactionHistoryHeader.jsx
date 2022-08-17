import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { appContext } from "../template/Layout";

const TransactionHistoryHeader = () => {
    const [user, balance , themeCheck, loading, error, token, goalsShare] = useContext(appContext);


  return (
    <div
      className={`historyWrapper themeTransition ${
        themeCheck ? "" : "themeDark"
      }`}
    >
      <div className="historyHeader">
        <Row>
          <Col>
            <h6>Goal</h6>
          </Col>
          <Col>
            <h6>Date</h6>
          </Col>
          <Col>
            <h6>Amount</h6>
          </Col>
          <Col>
            <h6>Status</h6>
          </Col>
          <Col>
            <h6>Narration</h6>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TransactionHistoryHeader;
