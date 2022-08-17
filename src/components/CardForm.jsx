import { useContext } from "react";
import axios from "axios";
import { appContext } from "./template/Layout";
import { Col, Container, Form, Row } from "react-bootstrap";
import GoalSection from "./organism/GoalSection";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { setLocalData } from "../services/Authenticator";
import cards from "../assets/cards.png";

const CardForm = () => {
  const [user, balance , themeCheck, loading, error, token, goalsShare] = useContext(appContext);
  const inputTheme = themeCheck ? "" : "inputDark";
  const navigate = useNavigate();
  const [card_number, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [card_expiry, setCardDate] = useState("");
  const [card_cvv, setCardCvv] = useState("");
  const [card_name, setCardPin] = useState("");

  useEffect(() => {
    setCardDate(`${cardMonth}/${cardYear}`);
  }, [cardMonth, cardYear]);

  const body = {
    card_number,
    card_cvv,
    card_expiry,
    card_name,
  };

  // ---------- Add Card ------------------
  const handleAddCard = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("https://kovest.herokuapp.com/v1/user/card", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLocalData("user_data", res.data);
      navigate("/app/goalPage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GoalSection />
      <Container className="cardFormWrapper">
        <div className="cardForm">
          <Form onSubmit={handleAddCard}>
            <div className="cardDescription">
              <Form.Label style={{ fontSize: 20, color: "#878a91" }}>
                Please add a card
              </Form.Label>
              <img src={cards} alt="card icons" />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Card number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter card number"
                required
                className={inputTheme}
                onInput={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Card expiry month"
                    required
                    className={inputTheme}
                    onInput={(e) => setCardMonth(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Card expiry year"
                    required
                    className={inputTheme}
                    onInput={(e) => setCardYear(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter CVV"
                required
                className={inputTheme}
                onInput={(e) => setCardCvv(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Card Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card name"
                required
                className={inputTheme}
                onInput={(e) => setCardPin(e.target.value)}
              />
            </Form.Group>

            <button type="submit" className="createGoalButton">
              Add Card
            </button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default CardForm;
