import {KetoTable} from "../components/KetoTable";

export const FOOD_API = "https://walak.vercel.app/nutrition";
export const KETO_KEY = "keto";
export const ONE_DAY = 1000 * 60 * 60 * 24;

export const TrackerNames = {
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

export const Tracker = [
    {
        name: TrackerNames.KETO,
        component: KetoTable,
        columns: [
            {name: "name", type: "text"},
            {name: "calories", type: "number"},
            {name: "protein", type: "number"},
            {name: "carbs", type: "number"},
        ]
        // component: (
        //     <KetoTable
        //         date={date}
        //         columns={[
        //             {name: "name", type: "text"},
        //             {name: "calories", type: "number"},
        //             {name: "protein", type: "number"},
        //             {name: "carbs", type: "number"},
        //         ]}/>
        // )
    }
]