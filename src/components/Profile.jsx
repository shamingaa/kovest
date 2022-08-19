import moment from "moment";
import { useContext } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/avatar.svg";
import { appContext } from "./template/Layout";

const Profile = () => {
  const navigate = useNavigate();
  const [user, balance, themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const { first_name, last_name, dob, gender, email } = user;
  const inputTheme = themeCheck ? "" : "inputDark";
  const dateOfBirth = moment(dob).utc().format("MMMM do, YYYY");
  const theme = `themeTransition ${themeCheck ? "" : "themeDark"}`;
  const profileStyle = {
    backgroundImage: `url("${profilePic}")`,
    backgroundSize: "cover",
    backgroundPosition: "top",
  };

  //   console.log(dateOfBirth);

  const redirectToChangePassword = () => {
    navigate("/app/changePassword");
  };

  const redirectToAddCard = () => {
    navigate("/app/addCard");
  };

  return (
    <Container id="profile_container">
      <div className="profileWrapper">
        <div className={`profile ${theme}`}>
          <Row className="details">
            <div className="avaterHolder" style={profileStyle}></div>
          </Row>
          <h3 id="userName">{`${first_name} ${last_name}`}</h3>
          <div className="profileDetails" style={{ marginTop: 30 }}>
            <Row>
              <Col>
                <Container>
                  <Form.Label style={{ display: "block", fontSize: "20px" }}>
                    Date of Birth:{" "}
                  </Form.Label>
                  <span style={{ fontSize: 18, color: "#666" }}>
                    {dateOfBirth}
                  </span>

                  <Form.Label style={{ display: "block", fontSize: "22px" }}>
                    Email:{" "}
                  </Form.Label>
                  <span style={{ fontSize: 18, color: "#666" }}>{email}</span>

                  <Form.Label style={{ display: "block", fontSize: "22px" }}>
                    Gender:{" "}
                  </Form.Label>
                  <span style={{ fontSize: 18, color: "#666" }}>{gender}</span>
                </Container>
              </Col>

              <Col>
                <Container>
                  <button
                    type="submit"
                    className="createGoalButton"
                    id="profileChangePassword"
                    onClick={redirectToChangePassword}
                  >
                    Change Password
                  </button>

                  <button
                    type="submit"
                    className="createGoalButton"
                    id="profileAddCard"
                    onClick={redirectToAddCard}
                  >
                    Add card
                  </button>
                </Container>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
