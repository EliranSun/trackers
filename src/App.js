import './App.css';
import { useState } from "react";
import { TrackerNames } from "./constants";
import { Navbar } from "./components/atoms/Navbar";
import { KetoTable } from "./components/keto/KetoTable";
import { HourlyView } from "./components/hourly/HourlyView";
import { DateNavigation } from "./components/atoms/DateNavigation";
import { WeightView } from "./components/weight/WeightView";

const ViewComponent = {
  [TrackerNames.KETO]: KetoTable,
  [TrackerNames.HOURLY]: HourlyView,
  [TrackerNames.WEIGHT]: WeightView,
}

function App() {
  const [dateObject, setDateObject] = useState(new Date());
  const [dateLabel, setDateLabel] = useState(dateObject.toLocaleDateString("en-IL"));
  const [selectedView, setSelectedView] = useState(TrackerNames.KETO);
  const View = ViewComponent[selectedView];
  
  return (
    <div className="w-screen h-screen bg-gray-900 m-auto flex flex-col items-center overflow-x-hidden px-4">
      <DateNavigation
        dateObject={dateObject}
        setDateObject={setDateObject}
        dateLabel={dateLabel}
        setDateLabel={setDateLabel}/>
      <div className="pt-16 pb-48">
        <View date={dateLabel}/>
      </div>
      <Navbar
        selectedView={selectedView}
        setSelectedView={setSelectedView}/>
    </div>
  );
}

export default App;
