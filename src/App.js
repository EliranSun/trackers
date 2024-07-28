import './App.css';
import { useEffect, useState } from "react";
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
import { HubView } from "./features/hub/HubView";
import { HabitTemplate } from "./components/templates/HabitTemplate";

const ViewComponent = {
  [TrackerNames.HOME]: HubView,
  [TrackerNames.HABIT]: HabitTemplate,
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
  const [time, setTime] = useState(dateObject.toLocaleTimeString("en-IL"));
  const [selectedView, setSelectedView] = useState(TrackerNames.HABIT);
  const View = ViewComponent[selectedView];
  
  useEffect(() => {
    // set meta theme color based on day/night
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      metaThemeColor.setAttribute("content", "#1a202c");
    } else {
      metaThemeColor.setAttribute("content", "#f7fafc");
    }
  }, []);
  
  return (
    <div
      className="overflow-x-hidden w-screen h-screen bg-gray-50 dark:bg-gray-900 m-auto flex flex-col text-center m-auto items-center px-4">
      <DateNavigation
        dateObject={dateObject}
        setDateObject={setDateObject}
        dateLabel={dateLabel}
        setDateLabel={setDateLabel}/>
      <div className="w-full pt-16 pb-48">
        <View date={dateLabel} time={time}/>
      </div>
      <Navbar
        selectedView={selectedView}
        setSelectedView={setSelectedView}/>
    </div>
  );
}

export default App;
