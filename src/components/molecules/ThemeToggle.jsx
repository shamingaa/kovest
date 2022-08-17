const ModeToggle = ({mode, setMode}) => {

  function handleChange() {
    setMode(!mode)
  }

  return (
    <>
      <input type="checkbox" className="checkbox" id="chk" />
      <label className="label" htmlFor="chk" onClick={handleChange}>
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
        <div className="ball"></div>
      </label>
    </>
  );
};

export default ModeToggle;
