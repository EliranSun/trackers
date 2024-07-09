import './App.css';
import { useState } from "react";
import { TrackerNames } from "./constants";
import { Navbar } from "./components/atoms/Navbar";
import { KetoTable } from "./features/keto/KetoTable";
import { HourlyView } from "./features/hourly/HourlyView";
import { DateNavigation } from "./components/atoms/DateNavigation";
import { WeightView } from "./features/weight/WeightView";
import { SleepView } from "./features/sleep/SleepView";
import { AngerView } from "./features/anger/AngerView";
import { DatesView } from "./features/dates/DatesView";
import { DinnerView } from "./features/dinner/DinnerView";

const ViewComponent = {
  [TrackerNames.KETO]: KetoTable,
  [TrackerNames.HOURLY]: HourlyView,
  [TrackerNames.WEIGHT]: WeightView,
  [TrackerNames.SLEEP]: SleepView,
  [TrackerNames.ANGER]: AngerView,
  [TrackerNames.DATES]: DatesView,
  [TrackerNames.DINNER]: DinnerView,
}

function App() {
  const [dateObject, setDateObject] = useState(new Date());
  const [dateLabel, setDateLabel] = useState(dateObject.toLocaleDateString("en-IL"));
  const [selectedView, setSelectedView] = useState(TrackerNames.KETO);
  const View = ViewComponent[selectedView];
  
  return (
    <div className="overflow-x-hidden w-screen h-screen bg-gray-900 m-auto flex flex-col items-center px-4">
      <DateNavigation
        dateObject={dateObject}
        setDateObject={setDateObject}
        dateLabel={dateLabel}
        setDateLabel={setDateLabel}/>
      <div className="w-full pt-16 pb-48">
        <View date={dateLabel}/>
      </div>
      <Navbar
        selectedView={selectedView}
        setSelectedView={setSelectedView}/>
    </div>
  );
}

export default App;
