import {useEffect, useMemo, useState} from "react";
import {getData, setData} from "../utils/storage";
import {KETO_KEY} from "../constants";
import {Measurement} from "./Measurement";
import {isNumber} from "lodash";
import {fetchFoodNutrition} from "../utils/api";
import {KetoInput} from "./KetoInput";
import classNames from "classnames";

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
            <div className="flex flex-col gap-2 rounded-3xl bg-gray-800">
                <div className={classNames({
                        "m-auto": true,
                        "backdrop-blur rounded-3xl bg-gray-700 shadow-xl": true,
                    "w-fit h-20 flex items-center gap-10 p-4": true,
                    "fixed bottom-32 inset-x-0 ": false,
                })}>
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
                <div className="h-full overflow-x-hidden overflow-y-auto">
                    {localData.concat({
                        name: "",
                        calories: null,
                        protein: null,
                        carbs: null,
                    }).map((row, index) => {
                        return (
                            <div
                                key={`${row.name}-${index}`}
                                className="bg-gray-700 my-4 p-4 grid grid-cols-3 gap-4 max-w-screen-sm rounded-lg w-full">
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