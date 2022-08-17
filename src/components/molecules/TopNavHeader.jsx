import { useContext } from "react";
import { appContext } from "../template/Layout";

const TopNavHeader = () => {
    const [user, ...others] = useContext(appContext);
    const {first_name, last_name} = user;

  return (
    <div className="headerMessage">
      <h4 id="welcomeMessage">Welcome to Kovest</h4>
      <span style={{textTransform:'capitalize'}}>Hi, {`${first_name} ${last_name}`} </span>
    </div>
  );
};

export default TopNavHeader;
