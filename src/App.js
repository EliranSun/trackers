import './App.css';
import {useState} from "react";
import classNames from "classnames";
import {ONE_DAY, Tracker, TrackerNames} from "./constants";
import {TrackerSection} from "./components/TrackerSection";

function App() {
    const [dateObject, setDateObject] = useState(new Date());
    const [date, setDate] = useState(dateObject.toLocaleDateString("en-IL"));
    const [selectedView, setSelectedView] = useState(TrackerNames.KETO);

    return (
        <div className="w-full h-full overflow-x-hidden p-4">
                <div className="flex justify-evenly items-center">
                    <button
                        className="text-xl px-4 pb-6 bg-black"
                        onClick={() => {
                            const newDate = new Date(dateObject.getTime() - ONE_DAY);
                            setDate(newDate.toLocaleDateString("en-IL"));
                            setDateObject(newDate);
                        }}>
                        ◀
                    </button>
                    <h1 className="">{date}</h1>
                    <button
                        className="text-xl p-4 bg-black"
                        onClick={() => {
                            const newDate = new Date(dateObject.getTime() + ONE_DAY);
                            setDate(newDate.toLocaleDateString("en-IL"));
                            setDateObject(newDate);
                        }}>
                        ▶
                    </button>
                </div>
                <div className="flex w-screen left-0 fixed bottom-0 h-20 bg-gray-900 justify-evenly p-4 font-mono">
                    {Object.values(TrackerNames).map((name, index) => {
                        return (
                            <button
                                key={name}
                                className={classNames({
                                    "bg-black": selectedView === name,
                                    "bg-transparent": selectedView !== name,
                                    "p-4 text-white": true,
                                })}
                                onClick={() => {
                                    console.log(name);
                                    setSelectedView(name);
                                }}>
                                {name}
                            </button>
                        );
                    })}
                </div>
            {Tracker.map((tracker) => {
                return (
                    <TrackerSection
                        key={tracker.name}
                        date={date}
                        {...tracker}/>
                );
            })}
        </div>
    );
}

export default App;
