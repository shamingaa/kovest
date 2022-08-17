import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login_signup from "./pages/Login";
import Layout from "./components/template/Layout";
import DashboardCards from "./components/organism/DashboardCards";
import Transactions from "./components/organism/Transactions";
import TransactionHistory from "./components/organism/TransactionHistory"
import Liquidation from "./components/organism/Liquidation";
import GoalForm from "./components/GoalForm";
import Goals from "./components/molecules/Goals";
import CardForm from "./components/CardForm";
import Profile from "./components/Profile";
import ChangePasswordForm from "./components/ChangePassword";
import { useEffect } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login_signup />} />
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<DashboardCards />} />
          <Route path="goals" element={<Goals />} />
          <Route path="transactions/goals" element={<Transactions />} />
          <Route path="transactions/list" element={<TransactionHistory />} />
          <Route path="liquidation" element={<Liquidation />} />
          <Route path="createGoal" element={<GoalForm />} />
          <Route path="goalPage" element={<Goals />} />
          <Route path="addCard" element={<CardForm />} />
          <Route path="changePassword" element={<ChangePasswordForm />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
