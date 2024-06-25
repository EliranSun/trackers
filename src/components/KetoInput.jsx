import {KETO_KEY} from "../constants";
import {setData} from "../utils/storage";
import {isNumber} from "lodash";
import {fetchFoodNutrition} from "../utils/api";

export const KetoInput = ({type, value, date, columnName, index, setLocalData}) => {
    return (
        <input
            type={type}
            className="border-2 p-4 text-base border-gray-300 text-black w-full"
            defaultValue={value}
            key={`${date}-${KETO_KEY}-${columnName}-${value}`}
            onBlur={async (event) => {
                const newData = setData(date, KETO_KEY, index, columnName, event.target.value);
                setLocalData(Object.values(newData[date][KETO_KEY]));

                const calories = newData[date][KETO_KEY][`row-${index}`].calories;
                const protein = newData[date][KETO_KEY][`row-${index}`].protein;
                const carbs = newData[date][KETO_KEY][`row-${index}`].carbs;

                const hasMissingData = !isNumber(calories) || !isNumber(protein) || !isNumber(carbs);

                console.log({hasMissingData});

                if (columnName === "name" && event.target.value !== "" && hasMissingData) {
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
    )
}