import './App.css';
import { useState } from "react";
import { ONE_DAY, TrackerNames } from "./constants";
import { Navbar } from "./components/Navbar";
import { KetoTable } from "./components/KetoTable";
import { RealityVsExpectationView } from "./components/RealityVsExpectationView";

function App() {
  const [dateObject, setDateObject] = useState(new Date());
  const [date, setDate] = useState(dateObject.toLocaleDateString("en-IL"));
  const [selectedView, setSelectedView] = useState(TrackerNames.KETO);
  
  return (
    <div className="w-full h-screen bg-gray-900 overflow-x-hidden p-4">
      <div className="fixed top-0 z-10 bg-gray-900 h-16 left-0 w-screen flex justify-evenly items-center">
        <button
          className="text-xl p-4 w-1/3"
          onClick={() => {
            const newDate = new Date(dateObject.getTime() - ONE_DAY);
            setDate(newDate.toLocaleDateString("en-IL"));
            setDateObject(newDate);
          }}>
          ◀
        </button>
        <h1 className="">{date}</h1>
        <button
          className="text-xl p-4 w-1/3"
          onClick={() => {
            const newDate = new Date(dateObject.getTime() + ONE_DAY);
            setDate(newDate.toLocaleDateString("en-IL"));
            setDateObject(newDate);
          }}>
          ▶
        </button>
      </div>
      <div className="pt-16 pb-48">
        {selectedView === TrackerNames.KETO
          ? <KetoTable
            date={date}
            columns={[
              { name: "name", type: "text" },
              { name: "calories", type: "number" },
              { name: "protein", type: "number" },
              { name: "carbs", type: "number" },
            ]}/> : null}
        {selectedView === TrackerNames.HOURLY
          ? <RealityVsExpectationView date={date}/> : null}
      </div>
      <Navbar
        selectedView={selectedView}
        setSelectedView={setSelectedView}/>
    </div>
  );
}

export default App;
