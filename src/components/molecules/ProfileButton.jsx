import { Dropdown } from "react-bootstrap";
import { deleteLocalItem } from "../../services/Authenticator";
import avater from "../../assets/avatar.svg";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { appContext } from "../template/Layout";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  let navigate = useNavigate();
  const [user, themeCheck, ...others] = useContext(appContext);
  const darkTheme = `themeTransition ${themeCheck ? "" : "themeDark"}`;
  const handleLogout = () => {
    deleteLocalItem("user_session");
    navigate("/");
  };

  const redirectToProfile = () => {
    navigate("/app/profile")
  }

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <img src={avater} alt="" id="bell" />
      </Dropdown.Toggle>

      <Dropdown.Menu className={darkTheme}>
        <Dropdown.Item onClick={redirectToProfile} className={themeCheck ? "" : "light"}>
          Profile
        </Dropdown.Item>
        <Dropdown.Item
          href="#/action-2"
          className={themeCheck ? "" : "light"}
          onClick={handleLogout}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileButton;
