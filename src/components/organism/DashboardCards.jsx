import { useContext, useRef, useState, useEffect } from "react";
import { appContext } from "../template/Layout";
import { Container, Row, Col, Alert } from "react-bootstrap";
import TotalBalanceCard from "../molecules/TotalBalanceCard";
import InvestmentCard from "../molecules/InvestmentCard";
import TotalFixedSavings from "../molecules/TotalFixedSavings";
import TotalFlexibleSavings from "../molecules/TotalFlexibleSavings";
import NotificationSound from "../../assets/noti2.mp3";
import { BaaChaat } from "../molecules/BarChart";

const DashboardCards = () => {
  const [user, balance, themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const [goals, setGoals] = goalsShare;
  const [showError, setShowError] = useState(true);

  const darkTheme = `dashboard-cards themeTransition ${
    themeCheck ? "" : "themeDark"
  }`;

  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }

  function AlertError() {
    if (showError) {
      return (
        <div className="alertContainer">
          <Alert
            style={{ backgroundColor: "#99CB38", color: "white" }}
            onDurationChange={setTimeout(() => {
              setShowError(false);
            }, 2500)}
            id="noGoalAlart"
          >
            <span>You have no goals. Please create a goal</span>
            {/* {playAudio()} */}
          </Alert>
        </div>
      );
    }
  }
  useEffect(() => {
    AlertError();
  }, []);

  useEffect(() => {
    const yam = () => {
      return playAudio();
    };

    if (goals.length <= 0) {
      yam();
    }
  }, []);

  return (
    <div>
      {goals.length > 0 ? "" : <AlertError />}
      <Container>
        <audio ref={audioPlayer} src={NotificationSound} />
        <Row className="dashboardRow">
          <Col lg="5" className="total-balance-col">
            <TotalBalanceCard theme={themeCheck} />
          </Col>

          <Col lg="7">
            <InvestmentCard />
          </Col>

          <Col lg="6">
            <div className={darkTheme}>
              <TotalFixedSavings />
            </div>
          </Col>

          <Col lg="6">
            <div className={darkTheme}>
              <TotalFlexibleSavings />
            </div>
          </Col>
        </Row>
        <Col>
          <div
            className={`bar-wrapper themeTransition  ${
              themeCheck ? " " : "themeDark"
            }`}
          >
            <BaaChaat />
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default DashboardCards;
