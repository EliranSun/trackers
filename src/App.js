import './App.css';
import { useState } from "react";
import { ONE_DAY, TrackerNames } from "./constants";
import { Navbar } from "./components/atoms/Navbar";
import { KetoTable } from "./components/keto/KetoTable";
import { HourlyView } from "./components/hourly/HourlyView";
import { format } from "date-fns";

function App() {
  const [dateObject, setDateObject] = useState(new Date());
  const [dateDB, setDateDB] = useState(format(new Date(), "yyyy-MM-dd 00:00:00"));
  const [dateLabel, setDateLabel] = useState(dateObject.toLocaleDateString("en-IL"));
  const [selectedView, setSelectedView] = useState(TrackerNames.KETO);
  
  return (
    <div className="w-screen h-screen bg-gray-900 m-auto flex flex-col items-center overflow-x-hidden p-4">
      <div className="fixed top-0 z-10 bg-gray-900 h-16 left-0 w-screen flex justify-evenly items-center">
        <button
          className="text-xl p-4 w-1/3"
          onClick={() => {
            const newDate = new Date(dateObject.getTime() - ONE_DAY);
            setDateLabel(newDate.toLocaleDateString("en-IL"));
            setDateDB(format(newDate, "yyyy-MM-dd 00:00:00"));
            setDateObject(newDate);
          }}>
          ◀
        </button>
        <h1 className="">{dateLabel}</h1>
        <button
          className="text-xl p-4 w-1/3"
          onClick={() => {
            const newDate = new Date(dateObject.getTime() + ONE_DAY);
            setDateLabel(newDate.toLocaleDateString("en-IL"));
            setDateDB(format(newDate, "yyyy-MM-dd 00:00:00"));
            setDateObject(newDate);
          }}>
          ▶
        </button>
      </div>
      <div className="pt-16 pb-48">
        {selectedView === TrackerNames.KETO
          ? <KetoTable
            date={dateDB}
            columns={[
              { name: "name", type: "text" },
              { name: "calories", type: "number" },
              { name: "protein", type: "number" },
              { name: "carbs", type: "number" },
            ]}/> : null}
        {selectedView === TrackerNames.HOURLY
          ? <HourlyView date={dateLabel}/> : null}
        {/*{selectedView === TrackerNames.SETTINGS*/}
        {/*  ? <Settings/> : null}*/}
      </div>
      <Navbar
        selectedView={selectedView}
        setSelectedView={setSelectedView}/>
    </div>
  );
}

export default App;
