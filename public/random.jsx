 // --------- Fetch goals -----------------
 useEffect(() => {
    async function getGoals() {
      try {
        const res = await fetch("http://localhost:3001/goals");
        const data = await res.json();

        const filtered = data.filter((item) => item.user_id === user.id);
        setGoalData(filtered);

        setError(null);
      } catch (error) {
        setError(error.messaage);
      } finally {
        setLoading(false);
      }
    }
    getGoals();
  }, [user]);

  const [user_id, setUserId] = useState(0);
  const [goal_title, setSavingsTitle] = useState("");
  const [amount_saved, setAmountSaved] = useState(0);
  const [amount_to_save, setTarget] = useState(0);
  const [saved_progress, savedProgress] = useState(0);
  const [duration, setDuration] = useState(100);
  const [frequency_amount, setAmountToSave] = useState(0);
  const [savings_status, setSavingsStatus] = useState("Active");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [method_of_savings, setMethodOfSavings] = useState("Bank");
  const [is_liquidated, setIsLiquidated] = useState(false);
  const typeOfSavingsOptions = [
    { value: "", text: "--Choose an option--" },
    { value: "Fixed" },
    { value: "Flexible" },
  ];
  const typeOfFrequencyOptions = [
    { value: "", text: "--Choose an option--" },
    { value: "Daily" },
    { value: "Weekly" },
    { value: "Monthly" },
  ];
  const [type_of_savings, setTypeOfSavings] = useState(
    typeOfSavingsOptions[0].value
  );
  const [frequency, setSavingsFrequency] = useState(
    typeOfFrequencyOptions[0].value
  );

  // ----------  Handle type of savings------------------
  const handleTypeOfSavings = (event) => {
    setTypeOfSavings(event.target.value);
  };

  // ----------  Handle type of frequency ----------------
  const handleTypeOfFrequency = (event) => {
    setSavingsFrequency(event.target.value);
  };

  const formDetails = [
    [user_id, setUserId],
    [goal_title, setSavingsTitle],
    [amount_saved, setAmountSaved],
    [amount_to_save, setTarget],
    [saved_progress, savedProgress],
    [duration, setDuration],
    [frequency_amount, setAmountToSave],
    [savings_status, setSavingsStatus],
    [start_date, setStartDate],
    [end_date, setEndDate],
    [method_of_savings, setMethodOfSavings],
    [is_liquidated, setIsLiquidated],
    typeOfSavingsOptions,
    typeOfFrequencyOptions,
    [type_of_savings, setTypeOfSavings],
    [frequency, setSavingsFrequency],
    handleTypeOfSavings,
    handleTypeOfFrequency,
  ];