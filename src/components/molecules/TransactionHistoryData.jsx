import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { appContext } from "../template/Layout";
import moment from "moment";

const TransactionHistoryData = ({ goalData }) => {
  const [user, balance , themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const { goal_title, id } = goalData;
  const [history, setHistory] = useState([]);

  // ============ Get Transaction History ===============
  useEffect(() => {
    const getTransaction = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `https://kovest.herokuapp.com/v1/user/transaction?goal_id=${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        let filtered = data
          .map((item) => item)
          .filter(({ goal_id }) => goal_id == id);
        setHistory(filtered);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      }
    };
    getTransaction();
  }, []);

  return (
    <>
      {history.map(({ desc, status, goal, createdAt, type, amount }) => (
        <div
          className={`historyCard themeTransition ${
            themeCheck ? "" : "lightDark"
          }`}
        >
          <div className="historyHeader">
            <Row>
              <Col>
                <h6>{desc}</h6>
              </Col>
              <Col>
                <h6>{moment(createdAt).format("MMM Do YYYY, h:mm a")}</h6>
              </Col>
              <Col>
                <h6
                  id="historyAmount"
                  className={type === "liquidation" ? "red" : ""}
                >
                  {type === "liquidation" ? "-₦" : "+₦"}
                  {amount.toLocaleString("en-US")}
                </h6>
              </Col>
              <Col>
                <h6 id="historyStatus">{status}</h6>
              </Col>
              <Col>
                <h6 style={{ textTransform: "Capitalize" }}>{type}</h6>
              </Col>
            </Row>
          </div>
        </div>
      ))}
    </>
  );
};

export default TransactionHistoryData;
