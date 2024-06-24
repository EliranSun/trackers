import './App.css';
import {useMemo, useState} from "react";
import classNames from "classnames";

const FOOD_API = "https://walak.vercel.app/nutrition";

const fetchFoodNutrition = async (food) => {
    const url = new URL(FOOD_API);
    url.searchParams.append("food", food);

    if (process.env.NODE_ENV === "development") {
        return {
            "calories": Math.round(Math.random() * 1000),
            "protein": Math.round(Math.random() * 100),
            "carbs": Math.round(Math.random() * 100),
        };
    }

    try {
        const response = await fetch(url);
        const results = await response.json();
        console.log({results});
        return JSON.parse(results.replace("```json", "").replace("```", ""));
    } catch (error) {
        console.error(error);
        return {};
    }
}

const setStorageData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getStorageData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

const KETO_KEY = "keto";

const dataMock = {
    "2021-10-10": {
        [KETO_KEY]: {
            "row-0": {
                name: "test",
                calories: 100,
                protein: 100,
                carbs: 100,
            }
        }
    }
}

const getData = (date, key) => {
    const data = getStorageData(key);
    if (data && data[date] && data[date][key]) {
        return data[date][key];
    }

    return [];
};

const setData = (date, key, rowIndex, columnName, value) => {
    let data = getStorageData(key);

    if (!data) {
        data = {
            [date]: {
                [key]: {
                    [`row-${rowIndex}`]: {
                        [columnName]: value
                    }
                }
            }
        };
    } else {
        data[date][key][`row-${rowIndex}`] = {
            ...data[date][key][`row-${rowIndex}`],
            [columnName]: value
        };
    }
    setStorageData(key, data);
    return data;
}

const Measurement = ({name, value, range = []}) => {
    return (
        <div className={classNames({
            "flex flex-col items-center": true,
            "text-red-500": value < range[0] || value > range[1],
            "text-green-500": value >= range[0] && value <= range[1],
        })}>
            <h2 className="text-xl">{value}</h2>
            <label className="text-sm">{name}</label>
        </div>
    )
};

const KetoTable = ({columns, date}) => {
        const [localData, setLocalData] = useState(Object.values(getData(date, KETO_KEY)));
        const caloriesSum = useMemo(() => {
            return localData.reduce((acc, row) => {
                if (!row.calories) {
                    return acc;
                }

                return acc + Number(row.calories);
            }, 0);
        }, [localData]);
        const proteinSum = useMemo(() => {
            return localData.reduce((acc, row) => {
                if (!row.protein) {
                    return acc;
                }

                return acc + Number(row.protein);
            }, 0);
        }, [localData]);
        const carbsSum = useMemo(() => {
            return localData.reduce((acc, row) => {
                if (!row.carbs) {
                    return acc;
                }

                return acc + Number(row.carbs);
            }, 0);
        }, [localData]);

        return (
            <div className="flex flex-col gap-2">
                <div className="flex justify-evenly">
                    <Measurement
                        name="Calories"
                        value={caloriesSum}
                        range={[100, 2000]}/>
                    <Measurement
                        name="Protein"
                        value={proteinSum}
                        range={[120, 150]}/>
                    <Measurement
                        name="Carbs"
                        value={carbsSum}
                        range={[0, 40]}/>
                </div>
                <div className="h-[80vh] overflow-y-auto">
                    {localData.concat({
                        name: "",
                        calories: "",
                        protein: "",
                        carbs: "",
                    }).map((row, index) => {
                        return (
                            <div
                                key={`${row.name}-${index}`}
                                className=" p-4 grid grid-cols-3 gap-4 max-w-screen-sm w-full">
                                {columns.map(({name, type}) => {
                                    const value = row[name];
                                    return (
                                        <div key={name} className="first-of-type:col-span-3">
                                            {name}
                                            <input
                                                type={type}
                                                className="border-2 p-4 text-base border-gray-300 text-black w-full"
                                                defaultValue={value}
                                                key={`${date}-${KETO_KEY}-${name}-${value}`}
                                                onBlur={async (event) => {
                                                    const newData = setData(date, KETO_KEY, index, name, event.target.value);
                                                    setLocalData(Object.values(newData[date][KETO_KEY]));

                                                    const calories = newData[date][KETO_KEY][`row-${index}`].calories;
                                                    const protein = newData[date][KETO_KEY][`row-${index}`].protein;
                                                    const carbs = newData[date][KETO_KEY][`row-${index}`].carbs;

                                                    const hasMissingData = !calories || !protein || !carbs;

                                                    if (name === "name" && event.target.value !== "" && hasMissingData) {
                                                        const nutrition = await fetchFoodNutrition(event.target.value);

                                                        if (!calories) {
                                                            const caloriesData = setData(date, KETO_KEY, index, "calories", nutrition.calories);
                                                            setLocalData(Object.values(caloriesData[date][KETO_KEY]));
                                                        }

                                                        if (!protein) {
                                                            const proteinData = setData(date, KETO_KEY, index, "protein", nutrition.protein);
                                                            setLocalData(Object.values(proteinData[date][KETO_KEY]));
                                                        }

                                                        if (!carbs) {
                                                            const carbsData = setData(date, KETO_KEY, index, "carbs", nutrition.carbs);
                                                            setLocalData(Object.values(carbsData[date][KETO_KEY]));
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
;
const TrackerSection = ({name, component}) => {
    return (
        <section className="bg-gray-900 py-4">
            {component}
        </section>
    )
};

const TrackerNames = {
    KETO: "Keto",
    NO_PRON: "NoPron",
    SLEEP: "Sleep",
    WEIGHT: "Weight",
    HOURLY: "Hourly",
};

const TrackerType = {
    CHECKBOX: "Checkbox",
    NUMBER: "Number",
    TABLE: "Table",
};

const date = new Date().toLocaleDateString("en-IL");

const Tracker = [
    {
        name: TrackerNames.KETO,
        date,
        component: (
            <KetoTable
                date={date}
                columns={[
                    {name: "name", type: "text"},
                    {name: "calories", type: "number"},
                    {name: "protein", type: "number"},
                    {name: "carbs", type: "number"},
                ]}/>
        )
    }
]

function App() {
    const [selectedView, setSelectedView] = useState(TrackerNames.KETO);

    return (
        <div className="p-4">
            <div className="flex justify-evenly items-center h-10">
                <button>◀</button>
                <h1 className="mb-2">{date}</h1>
                <button>▶</button>
            </div>
            <div className="flex justify-evenly mb-4 font-mono">
                {Object.values(TrackerNames).map((name, index) => {
                    return (
                        <button
                            key={name}
                            className={classNames({
                                "bg-gray-900": selectedView === name,
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
                        {...tracker}/>
                );
            })}
        </div>
    );
}

export default App;
