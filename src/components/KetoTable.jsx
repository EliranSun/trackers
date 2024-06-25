import {useEffect, useMemo, useState} from "react";
import {getData, setData} from "../utils/storage";
import {KETO_KEY} from "../constants";
import {Measurement} from "./Measurement";
import {isNumber} from "lodash";
import {fetchFoodNutrition} from "../utils/api";
import {KetoInput} from "./KetoInput";

export const KetoTable = ({columns, date}) => {
        const [localData, setLocalData] = useState(Object.values(getData(date, KETO_KEY)));

        useEffect(() => {
            const newData = (getData(date, KETO_KEY));
            setLocalData(Object.values(newData));
        }, [date]);

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
                <div className="sticky top-28 bg-gray-900 flex justify-evenly p-4">
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
                <div className="h-full overflow-y-auto">
                    {localData.concat({
                        name: "",
                        calories: null,
                        protein: null,
                        carbs: null,
                    }).map((row, index) => {
                        return (
                            <div
                                key={`${row.name}-${index}`}
                                className="bg-gray-800 my-4 p-4 grid grid-cols-3 gap-4 max-w-screen-sm rounded-lg w-full">
                                {columns.map(({name: columnName, type}) => {
                                    const value = row[columnName];
                                    return (
                                        <div key={columnName} className="first-of-type:col-span-3">
                                            {columnName}
                                            <KetoInput
                                                type={type}
                                                value={value}
                                                date={date}
                                                columnName={columnName}
                                                index={index}
                                                setLocalData={setLocalData}/>
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