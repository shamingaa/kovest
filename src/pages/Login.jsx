import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Tab, Tabs, Form, Alert } from "react-bootstrap";
import savingsJar from "../assets/savings-jar.svg";
import { useEffect, useState } from "react";
import { getLocalData, setLocalData } from "../services/Authenticator";
import loader from "../assets/loader.gif";
import eye from "../assets/eyeOpen.svg";
import eyeClose from "../assets/eyeClosed.svg";

const Login_Signup = () => {
  const navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSignUpError, setShowSignUpError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [invalidCredentialError, setInvalidCredentialError] = useState("");
  const [signupError, setSignupError] = useState("");
  const userData = { first_name, last_name, password, email, dob, gender };
  const loginDetails = { email: loginEmail, password: loginPassword };
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

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

  useEffect(() => {
    setDob(`${day}/${month}/${year}`);
  }, [day, month, year]);

  //=================  Handle User Creation =================
  const createUser = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/v1/auth/signup",
        data: userData,
      });

      const { user_data, user_session } = res.data;
      setLocalData("user_data", user_data);
      setLocalData("user_session", user_session);
      navigate("/app/dashboard");
    } catch (error) {
      if (error.response) {
        setSignupError(error.response.data.message);
        setShowSignUpError(!showSignUpError);
      }
    }
    setFormSubmitting(false);
  };

  //============== Handle User Login ===================
  const handleLogin = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/v1/auth/login",
        data: loginDetails,
      });

      const { user_data, user_session } = res?.data;
      setLocalData("user_data", user_data);
      setLocalData("user_session", user_session);
      navigate("/app/dashboard");
    } catch (error) {
      setInvalidCredentialError(error.response.data.message);
      setShowError(!showError);
    }
    setFormSubmitting(false);
  };

  //============ Rediret User If Already Logged In =============
  useEffect(() => {
    if (getLocalData("user_session")) {
      navigate("/app/dashboard");
    }
  }, []);

  //============ Login Credential Error Alert ==================
  function LoginCredentialErrorAlert() {
    if (showError) {
      return (
        <div className="alertContainer">
          <Alert
            variant="danger"
            onDurationChange={setTimeout(() => {
              setShowError(false);
            }, 2000)}
          >
            <span>{invalidCredentialError}</span>
          </Alert>
        </div>
      );
    }
  }

  //============ Sign Up Error Alert ==================
  function SignUpErrorAlert() {
    if (showSignUpError) {
      return (
        <div className="alertContainer">
          <Alert
            variant="danger"
            onDurationChange={setTimeout(() => {
              setShowSignUpError(false);
            }, 3000)}
          >
            <span>{signupError}</span>
          </Alert>
        </div>
      );
    }
  }

  return (
    <Container className="box">
      <LoginCredentialErrorAlert />
      <SignUpErrorAlert />
      <Row>
        <Col className="formSection">
        <h3 id="logo" style={{margin: 20}}>Kovest</h3>
          <div className="formHolder">
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {/* ================= LOGIN ================== */}
              <Tab eventKey="home" title="Login" >
                <Form className="login" onSubmit={handleLogin} autocomplete="off">
                  <Form.Group className="mb-4 loginEmail">
                    <Form.Control
                      type="email"
                      name="loginEmail"
                      placeholder="Email"
                      required
                      onInput={(e) => setloginEmail(e.target.value.trim())}
                    />
                  </Form.Group>

                  <div className="passwordInputHoldder">
                    <Form.Group
                      className="mb-4"
                      controlId="formBasicloginPassword"
                    >
                      <Form.Control
                        type={passwordType}
                        onChange={handlePasswordChange}
                        value={passwordInput}
                        name="loginPassword"
                        placeholder="Password"
                        required
                        onInput={(e) => setloginPassword(e.target.value.trim())}
                      />
                      <img
                        src={passwordType === "password" ? eye : eyeClose}
                        alt="eye"
                        id="eye"
                        onClick={togglePassword}
                      />
                    </Form.Group>
                  </div>

                  <p id="terms">
                    By clicking Login, you agree to our Terms, Data Policy and
                    Cookies Policy. You may receive SMS Notification from us and
                    caan opt out any time.
                  </p>

                  <button
                    type="submit"
                    value="Login"
                    className="login_btn"
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? (
                      <img src={loader} style={{ width: "20px" }} />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </Form>
              </Tab>

              {/*===================== SIGNUP ========================  */}
              <Tab eventKey="profile" title="Signup">
                <Form autocomplete="off" onSubmit={createUser} >
                  <Row>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="text"
                          placeholder="First name"
                          required
                          onInput={(e) => set_first_name(e.target.value.trim())}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="text"
                          placeholder="Last name"
                          required
                          onInput={(e) => set_last_name(e.target.value.trim())}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      required
                      onInput={(e) => setEmail(e.target.value.trim())}
                    />
                  </Form.Group>

                  <div className="passwordInputHoldder">
                    <Form.Group className="mb-4">
                      <Form.Control
                        type={passwordType}
                        onChange={handlePasswordChange}
                        value={passwordInput}
                        placeholder="Password"
                        required
                        onInput={(e) => setPassword(e.target.value.trim())}
                      />
                      <img
                        src={passwordType === "password" ? eye : eyeClose}
                        alt="eye"
                        id="eye"
                        onClick={togglePassword}
                      />
                    </Form.Group>
                  </div>

                  <Form.Label>Birthday</Form.Label>
                  <Row>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="number"
                          placeholder="Month"
                          required
                          onInput={(e) => setDay(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="number"
                          placeholder="Day"
                          required
                          onInput={(e) => setMonth(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Control
                          type="number"
                          placeholder="Year"
                          required
                          onInput={(e) => setYear(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Label>Gender</Form.Label>
                  <Form.Group onChange={(e) => setGender(e.target.value)}>
                    <Form.Check
                      type="radio"
                      value="male"
                      name="gender"
                      label="Male"
                      inline
                    ></Form.Check>
                    <Form.Check
                      type="radio"
                      value="female"
                      name="gender"
                      label="Female"
                      inline
                    ></Form.Check>
                  </Form.Group>

                  <button
                    type="submit"
                    className="submit_btn"
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? (
                      <img src={loader} style={{ width: "20px" }} />
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </Form>
              </Tab>
            </Tabs>
          </div>
        </Col>

        <Col className="aboutSection">
          <Container className="tabBox">
            <img src={savingsJar} alt="savingsJar" />
            <h2 id="aboutText">Achieve your savings goals easily</h2>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Login_Signup;
