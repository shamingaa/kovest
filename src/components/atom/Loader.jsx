import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="loaders">
      <Spinner animation="grow" size="sm" className="primarySpin spin" />
      <Spinner animation="grow" size="sm" className="secondarySpin spin" />
      <Spinner animation="grow" size="sm" className="tertiarySpin spin" />
    </div>
  );
};

export default Loader;
