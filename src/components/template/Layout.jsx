import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getLocalData } from "../../services/Authenticator";
import SideNavbar from "../organism/SideNavbar";
import TopNavBar from "../organism/TopNavBar";
import { useRef } from "react";

export const appContext = React.createContext();
const Layout = () => {
  const [themeCheck, setThemeCheck] = useState(true);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [goals, setGoals] = useState([]);
  const goalsShare = [goals, setGoals];
  const [balance, setBalance] = useState([]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchedToken = JSON.parse(getLocalData("user_session"));
    setToken(fetchedToken.token);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // =========== Get Goals =================
    const getGoals = async () => {
      try {
        const res = await axios({
          method: "get",
          url: "https://kovest.herokuapp.com/v1/goals/fetch",
          headers: { Authorization: `Bearer ${token}` },
        });

        setGoals(res.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      }
    };
    getGoals();
  }, [token]);

  // =========== Get Balances =================
  useEffect(() => {
    const getBalance = async () => {
      try {
        if(token){
          const res = await axios({
            method: "get",
            url: "https://kovest.herokuapp.com/v1/user/me",
            headers: { Authorization: `Bearer ${token}` },
          });
          
  
          setBalance(res?.data);
        }
      } catch (error) {
          if (error.response) {
            console.log(error.response.data.message);
          }
      }
    };
    getBalance()
  }, [token]);

  // ---------- Global Context  Data --------------
  const appState = [
    user,
    balance,
    themeCheck,
    loading,
    error,
    token,
    goalsShare,
  ];

  useEffect(() => {
    // verfy usersesson
    const getSession = getLocalData("user_session");
    if (!getSession) {
      return navigate("/");
    }

    const getUser = getLocalData("user_data");
    // update active user
    setSession(getSession);
    setUser(JSON.parse(getUser));
    setPageLoading(false);
  }, []);

  return (
    <>
      {pageLoading ? (
        <div style={{ textAlign: "center" }}>Loading</div>
      ) : (
        <appContext.Provider value={appState}>
          <Container fluid>
            <Row className="layoutRow">
              <Col
                lg="2"
                md="2"
                className={`side-bar-col themeTransition ${
                  themeCheck === true ? " " : "themeDark"
                }`}
              >
                <SideNavbar />
              </Col>

              <Col
                lg="10"
                md="10"
                className={` themeTransition ${
                  themeCheck === true ? "content-light" : "content-dark"
                } `}
              >
                <TopNavBar mode={themeCheck} setMode={setThemeCheck} />
                <Outlet />
              </Col>
            </Row>
          </Container>
        </appContext.Provider>
      )}
    </>
  );
};

export default Layout;
