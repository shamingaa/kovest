import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NoLiquidation from "../molecules/NoLiquidation";
import { Col, Container, Row, Form, ProgressBar, Alert } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { appContext } from "../template/Layout";
import loader from "../../assets/loader.gif";
import NotificationSound from "../../assets/noti4.wav";
import NotificationSuccess from "../../assets/noti6.wav";
import { useRef } from "react";
import eye from "../../assets/eyeOpen.svg";
import eyeClose from "../../assets/eyeClosed.svg";

const Liquidation = () => {
  const [user, balance, themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const { state } = useLocation();
  const goalTitle = state;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const userData = { goal_id: goalTitle.id, password };
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const audioPlayer = useRef(null);
  const inputTheme = themeCheck ? "" : "themeTransition inputDark";
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [pass, setPass] = useState(false);

  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  //=================  Handle Liquidation =================
  const handleLiquidate = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const res = await axios({
        method: "post",
        url: "https://kovest.herokuapp.com/user/withdraw",
        headers: { Authorization: `Bearer ${token}` },
        data: userData,
      });

      setMessage(res.data);
      setShowError(true);
      setPass(true);
    } catch (error) {
      setMessage(error.response.data.message);
      setShowError(true);
    }
    setFormSubmitting(false);
  };

  // ============ Notification Sounnd ===========
  function playAudio() {
    audioPlayer.current.play();
  }

  // =============== Message Alert =============
  function AlertError() {
    if (showError) {
      return (
        <div className="alertContainer">
          <Alert
            style={{
              backgroundColor: message === "User not found" ? "red" : "#99CB38",
              color: "white",
            }}
            onDurationChange={setTimeout(() => {
              setShowError(false);
              setShouldRedirect(true);
            }, 2500)}
            id="noGoalAlart"
          >
            <span>{message}</span>
            {playAudio()}
          </Alert>
        </div>
      );
    }
  }
  useEffect(() => {
    AlertError();
  }, []);

  // ============ Auto Redirect =================
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/app/dashboard");
    }
  }, [shouldRedirect]);

  return (
    <>
      {state === null ? (
        <NoLiquidation />
      ) : (
        <Container className="cardFormWrapper">
          <AlertError />
          <audio
            ref={audioPlayer}
            src={pass === true ? NotificationSound : NotificationSuccess}
          />
          <div className={`cardForm themeTransition  ${
          themeCheck ? " " : "themeDark"
        }`}>
            <Form onSubmit={handleLiquidate}>
              <Form.Label
                style={{ fontSize: 26, color: "#1a667a", fontWeight: "bold" }}
              >
                Withdrawal
              </Form.Label>
              <Row>
                <Col>
                  <Form.Label style={{ fontSize: 18, color: "#878a91" }}>
                    Goal Title:
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label style={{ fontSize: 18, color: "#878a91" }}>
                    {goalTitle.goal_title}
                  </Form.Label>
                </Col>
              </Row>

              <Col>
                <Form.Label style={{ fontSize: 18, color: "#878a91" }}>
                  Saved Progress:
                </Form.Label>
                <ProgressBar
                  now={Math.floor(
                    (goalTitle.amount_saved * 100) / goalTitle.amount_to_save
                  )}
                />
              </Col>
              <Row>
                <Col>
                  <Form.Label style={{ fontSize: 18, color: "#878a91" }}>
                    Amount Saved:
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label style={{ fontSize: 18, color: "#878a91" }}>
                    ₦{goalTitle.amount_saved}
                  </Form.Label>
                </Col>
              </Row>

              <div className="passwordInputHoldder">
                <Form.Group className="mb-4" controlId="formBasicloginPassword">
                  <Form.Control
                    type={passwordType}
                    onChange={handlePasswordChange}
                    value={passwordInput}
                    name="loginPassword"
                    placeholder="Password"
                    required
                    onInput={(e) => setPassword(e.target.value.trim())}
                    className={inputTheme}
                  />
                  <img
                    src={passwordType === "password" ? eye : eyeClose}
                    alt="eye"
                    id="eye"
                    onClick={togglePassword}
                  />
                </Form.Group>
              </div>

              <button
                type="submit"
                className="createGoalButton"
                id="profileAddCard"
              >
                {formSubmitting ? (
                  <img src={loader} style={{ width: "20px" }} />
                ) : (
                  "Withdraw"
                )}
              </button>
            </Form>
          </div>
        </Container>
      )}
    </>
  );
};

export default Liquidation;
