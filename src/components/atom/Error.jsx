import badNetwork from "../../assets/badNetwork.png";

const Error = () => {
  return (
    <div className="loaders">
      <div>
        <img src={badNetwork} alt="Bad Network Icon" />
      </div>
    </div>
  );
};

export default Error;
