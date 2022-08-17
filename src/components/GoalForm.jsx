import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { getLocalData } from "../services/Authenticator";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { appContext } from "./template/Layout";
import GoalSection from "./organism/GoalSection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import moment from "moment";

const GoalForm = () => {
  const navigate = useNavigate();
  const [user, balance , themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const theme = `goalFormHolder themeTransition ${
    themeCheck ? "" : "themeDark"
  }`;
  const inputTheme = themeCheck ? "" : "inputDark";
  const [showError, setShowError] = useState(false);
  // const [token, setToken] = useState("");
  const [hasCard, setHasCard] = useState(false);
  const [createError, setCreateError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [goals, setGoals] = goalsShare;

  const [goal_title, setSavingsTitle] = useState("");
  const [amount_to_save, setTarget] = useState(0);
  const [saved_progress, savedProgress] = useState(0);
  const [duration, setDuration] = useState(100);
  const [frequency_amount, setAmountToSave] = useState(0);
  const [savings_status, setSavingsStatus] = useState("Active");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [method_of_savings, setMethodOfSavings] = useState("Bank");
  const typeOfSavingsOptions = [
    { value: "", text: "--Choose an option--" },
    { value: "Fixed" },
    { value: "Flexible" },
  ];
  const typeOfFrequencyOptions = [
    { value: "", text: "--Choose an option--" },
    { value: "Minutes" },
    { value: "Daily" },
    { value: "Weekly" },
    { value: "Monthly" },
  ];
  const [type_of_savings, setTypeOfSavings] = useState(
    typeOfSavingsOptions[0].value
  );
  const [frequency, setSavingsFrequency] = useState(
    typeOfFrequencyOptions[0].value
  );

  // ----------  Handle type of savings------------------
  const handleTypeOfSavings = (event) => {
    setTypeOfSavings(event.target.value);
  };

  // ----------  Handle type of frequency ----------------
  const handleTypeOfFrequency = (event) => {
    setSavingsFrequency(event.target.value);
  };
  
  const sentGoals = {
    goal_title,
    amount_to_save,
    saved_progress,
    duration,
    frequency,
    frequency_amount,
    type_of_savings,
    savings_status,
    start_date : moment(start_date).format("YYYY-MM-DDTHH:mm:ss.000[Z]"),
    end_date : moment(end_date).format("YYYY-MM-DDTHH:mm:ss.000[Z]"),
    method_of_savings,
  };

  useEffect(() => {
    const checkCard = JSON.parse(getLocalData("user_data"));
    setHasCard(checkCard.has_added_card);
  }, []);

  // ---------- Post new task to the server ----------------
  const createGoal = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/v1/goals/create",
        data: sentGoals,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      setGoals([...goals, data]);
      hasCard ? navigate("/app/goalPage") : navigate("/app/addCard");
    } catch (error) {
      setCreateError(error.message);
      setShowError(true);
    }
    setFormSubmitting(false);
  };

  //============ Login Credential Error Alert ==================
  function AlertError() {
    if (showError) {
      return (
        <div className="alertContainer">
          <Alert
            variant="danger"
            onDurationChange={setTimeout(() => {
              setShowError(false);
            }, 2000)}
          >
            <span>{createError}</span>
          </Alert>
        </div>
      );
    }
  }

  return (
    <>
      <GoalSection />
      <Container className="goalContainer">
        <AlertError />
        <div className={`themeTransition ${theme}`}>
          <Form className="createGoalForm" onSubmit={createGoal}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Title Of Goal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Reason for saving"
                required
                className={inputTheme}
                value={goal_title}
                onInput={(e) => setSavingsTitle(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Amount to save frequently</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Amount to save frequently"
                    required
                    className={inputTheme}
                    onInput={(e) => {
                      setAmountToSave(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Label>Savings frequency</Form.Label>
                <Form.Select
                  required
                  className={inputTheme}
                  value={frequency}
                  onChange={handleTypeOfFrequency}
                >
                  <option>Choose savings frequency</option>
                  <option
                    key={typeOfFrequencyOptions.value}
                    value={typeOfFrequencyOptions.value}
                  >
                    {" "}
                    Minutes{" "}
                  </option>
                  <option
                    key={typeOfFrequencyOptions.value}
                    value={typeOfFrequencyOptions.value}
                  >
                    {" "}
                    Daily{" "}
                  </option>
                  <option
                    key={typeOfFrequencyOptions.value}
                    value={typeOfFrequencyOptions.value}
                  >
                    {" "}
                    Weekly{" "}
                  </option>
                  <option
                    key={typeOfFrequencyOptions.value}
                    value={typeOfFrequencyOptions.value}
                  >
                    {" "}
                    Monthly
                  </option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Target</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Expected Amount"
                    required
                    className={inputTheme}
                    onInput={(e) => setTarget(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Label>Type of Savings</Form.Label>
                <Form.Select
                  value={type_of_savings}
                  required
                  className={inputTheme}
                  onChange={handleTypeOfSavings}
                >
                  <option>Select type of Savings</option>
                  <option key={typeOfSavingsOptions.value} value="fixed">
                    {" "}
                    Fixed{" "}
                  </option>
                  <option key={typeOfSavingsOptions.value} value="Flexible">
                    {" "}
                    Flexible{" "}
                  </option>
                </Form.Select>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Set Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    onInput={(e) => setStartDate(e.target.value)}
                    required
                    className={inputTheme}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Set End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    onInput={(e) => setEndDate(e.target.value)}
                    required
                    className={inputTheme}
                  />
                </Form.Group>
              </Col>
            </Row>

            <button
              type="submit"
              className="createGoalButton"
              disabled={formSubmitting}
            >
              {formSubmitting ? (
                <img src={loader} style={{ width: "20px" }} />
              ) : (
                "Create Goal"
              )}
            </button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default GoalForm;
