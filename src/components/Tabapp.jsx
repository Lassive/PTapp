import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomerList from "./Customerlist";
import TrainingsList from "./Traininglist";
import Homepage from "./Homepage";


function TabApp() {
  const [value, setValue] = useState("homepage");


  const handleChange = (event, value) => {
    setValue(value);
  };


  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="homepage" label="Homepage" />
        <Tab value="customerlist" label="Customers" />
        <Tab value="trainingslist" label="Trainings" />
      </Tabs>
      {value === "homepage" && <Homepage />}
      {value === "customerlist" && <CustomerList />}
      {value === "trainingslist" && <TrainingsList />}
    </div>
  );
}

export default TabApp;
