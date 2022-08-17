import { useContext } from "react";
import { appContext } from "../template/Layout";
import { Col, Container, Row, ProgressBar, Button } from "react-bootstrap";
import Loader from "../atom/Loader";
import Error from "../atom/Error";
import { useNavigate } from "react-router-dom";
import GoalSection from "../organism/GoalSection";
import NoGoalPage from "./NoGoalPage";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";

const Goals = () => {
  const [user, balance, themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const navigate = useNavigate();
  const [goals, setGoals] = goalsShare;
  let shouldLiquidateFixed = true;

  const goalList = () => {
    return goals.map(
      ({
        amount_saved,
        amount_to_save,
        end_date,
        frequency,
        frequency_amount,
        goal_title,
        id,
        is_liquidated,
        method_of_savings,
        savings_status,
        start_date,
        type_of_savings,
      }) => {
        let startDate = moment.utc(start_date).format("MMMM Do, YYYY");
        let endDate = moment.utc(end_date).format("MMMM Do, YYYY");
        let next;

        if (frequency === "Daily") {
          next = 1;
        } else if (frequency === "Weekly") {
          next = 7;
        } else {
          next = 30;
        }

        let nextDate = moment().utc().add(next, "days").format("MMMM Do YYYY");
        let moneySaved = Math.floor((amount_saved * 100) / amount_to_save);
        let remainingTime = 100 - moneySaved;

        let actualTime = moment().format('mm'); 
        let endTime = moment(end_date).format('mm'); 
        let startTime = moment(start_date).format('mm'); 

        // console.table(`
        // START: ${startTime} 
        // END: ${endTime}
        // ACTUAL: ${actualTime}
        // `);

        if(endTime === actualTime){
          shouldLiquidateFixed = false
        }

        return (
          <Col lg="6" key={id}>
            <div
              className={`goal-cards themeTransition ${
                themeCheck === true ? " " : "themeDark"
              }`}
            >
              <Container>
                <Row>
                  <Col>
                    <h5>{goal_title}</h5>
                  </Col>
                </Row>

                <Row className="goal-amount-row">
                  <Col>
                    <h5 id="saved">₦{amount_saved.toLocaleString("en-US")}</h5>
                    <span>Saved</span>
                  </Col>

                  <Col>
                    <h5>₦{amount_to_save.toLocaleString("en-US")}</h5>
                    <span>Goal</span>
                  </Col>
                </Row>

                <Row className="goal-progress">
                  <Col>
                    <span>Saved: </span>{" "}
                    <span id="saved-percent">{moneySaved}%</span>
                    <ProgressBar now={moneySaved} />
                  </Col>

                  <Col>
                    <span>Duration: </span>{" "}
                    <span id="duration-percent">{remainingTime}%</span>
                    <ProgressBar now={remainingTime} variant="warning" />
                  </Col>
                </Row>

                <Row className="goal-info-row">
                  <Col lg="9">
                    <Row className="goal-dates-row">
                      <Col>
                        <span>Start date</span>
                        <br />
                        <span>{startDate}</span>
                      </Col>

                      <Col>
                        <span>End date</span>
                        <br />
                        <span>{endDate}</span>
                      </Col>
                    </Row>

                    <Row className="goal-future-row">
                      <Col>
                        <span>Next Savings Date</span>
                        <br />
                        <span>{nextDate}</span>
                      </Col>

                      <Col>
                        <span>Payment Method</span>
                        <br />
                        <span>{method_of_savings}</span>
                      </Col>
                    </Row>
                  </Col>

                  <Col lg="3">
                    <h5 id="saving-frequency-amount">
                      ₦{frequency_amount.toLocaleString("en-US")}
                    </h5>
                    <span>{frequency}</span>
                    <br />
                    <span
                      id={
                        type_of_savings === "Fixed"
                          ? "fixed-savings"
                          : "flexible-savings"
                      }
                    >
                      {type_of_savings}
                    </span>
                  </Col>
                </Row>

                <Row id="savings-buttons-row">
                  <Col>
                    <Button
                      id="liquidate-button"
                      disabled={
                        is_liquidated ||
                        (type_of_savings === "Fixed" && shouldLiquidateFixed)
                      }
                      onClick={() =>
                        navigate("/app/liquidation", {
                          state: {
                            goal_title,
                            amount_saved,
                            id,
                            amount_saved,
                            amount_to_save,
                          },
                        })
                      }
                    >
                      {is_liquidated ? "liquidated" : "liquidate"}
                    </Button>
                  </Col>

                  <Col>
                    <span>
                      {amount_saved === amount_to_save
                        ? "Completed"
                        : savings_status}
                    </span>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        );
      }
    );
  };

  return (
    <>
      {/* {loading && <Loader />} */}

      {error && <Error />}

      <GoalSection />

      {goals.length > 0 ? (
        <Container fluid="sm">
          <Row className="yam">{goalList()}</Row>
        </Container>
      ) : (
        <NoGoalPage />
      )}
    </>
  );
};

export default Goals;
