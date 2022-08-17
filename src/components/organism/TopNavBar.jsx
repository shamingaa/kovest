import { Container } from "react-bootstrap";
import ThemeToggle from "../molecules/ThemeToggle";
import TopNavHeader from "../molecules/TopNavHeader";
import ProfileButton from "../molecules/ProfileButton";

const TopNavBar = ({ mode, setMode }) => {
  return (
    <Container className="intro">
      <TopNavHeader />
      <div className="headerIcons">
        <ThemeToggle mode={mode} setMode={setMode} />
        <ProfileButton />
      </div>
    </Container>
  );
};

export default TopNavBar;
