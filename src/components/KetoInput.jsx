import {KETO_KEY} from "../constants";
import {setData} from "../utils/storage";
import {isNumber} from "lodash";
import {fetchFoodNutrition} from "../utils/api";
import classNames from "classnames";

export const KetoInput = ({type, value, date, name, index, setLocalData}) => {
    return (
        <div className={classNames({
            "flex items-center flex-col": name !== "name",
            "flex items-center flex-row-reverse": name === "name",
        })}>
            <input
                type={type}
                className={classNames({
                    "text-center bg-white/10": true,
                    "p-4 text-base bg-transparent text-white w-full": true,
                })}
                defaultValue={value}
                key={`${date}-${KETO_KEY}-${name}-${value}`}
                onBlur={async (event) => {
                    const newData = setData(date, KETO_KEY, index, name, event.target.value);
                    setLocalData(Object.values(newData[date][KETO_KEY]));

                    const calories = newData[date][KETO_KEY][`row-${index}`].calories;
                    const protein = newData[date][KETO_KEY][`row-${index}`].protein;
                    const carbs = newData[date][KETO_KEY][`row-${index}`].carbs;

                    const hasMissingData = !isNumber(calories) || !isNumber(protein) || !isNumber(carbs);

                    console.log({hasMissingData});

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
            {name === "name" ? null :
                <span className="text-sm">{name}</span>}
        </div>
    )
}