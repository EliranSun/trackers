import {KetoInput} from "./KetoInput";
import {addKetoLog, deleteKetoLog, editKetoLog} from "../../utils/db";
import {useCallback, useEffect, useState} from "react";
import {fetchFoodNutrition} from "../../utils/api";
import {isNumber} from "lodash";
import {KetoKeys} from "../../constants";
import {Brain, X} from "@phosphor-icons/react";
import classNames from "classnames";
import {FoodEmoji} from "./FoodEmoji";

export const KetoEntry = ({
                              date,
                              refetch,
                              name: initName,
                              calories,
                              id,
                              protein,
                              isNew,
                              carbs,
                              onSelectEntry,
                              isSelected,
                          }) => {
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState(initName || "");
    const [macros, setMacros] = useState({
        calories: calories || null,
        carbs: carbs || null,
        protein: protein || null,
    });

    const addMessage = useCallback(newMessage => {
        console.log(newMessage);
        setMessages(prev => [...prev, newMessage]);
    }, []);

    useEffect(() => {
        addMessage(`KetoEntry mount with ${JSON.stringify({id, name, calories, protein, carbs})}`);
        return () => {
            addMessage(`KetoEntry unmount`);
        }
    }, []);

    useEffect(() => {
        setName(initName);
        setMacros({
            calories,
            protein,
            carbs,
        });
    }, [initName, calories, protein, carbs]);

    const updateMacrosWithAI = useCallback(async () => {
        const hasMissingData =
            !isNumber(macros.calories) ||
            !isNumber(macros.protein) ||
            !isNumber(macros.carbs);

        if (hasMissingData) {
            addMessage(`Has missing data ${JSON.stringify(macros)}`);
            setIsThinking(true);
            const nutrition = await fetchFoodNutrition(name);
            addMessage(`Nutrition fetched ${JSON.stringify(nutrition)}`);

            const newMacros = {
                calories: nutrition.calories,
                carbs: nutrition.carbs,
                protein: nutrition.protein
            };

            setMacros(newMacros);
            const log = {name, ...newMacros};
            addMessage(`New log: ${JSON.stringify({date, log})}`);

            if (!log.name || (!log.carbs && !log.calories && !log.carbs)) {
                addMessage(`Missing required params ${JSON.stringify(log)}`);
                return;
            }

            addKetoLog(date, log)
                .then(() => {
                    addMessage("add keto log success!");
                    setTimeout(refetch, 5000);
                })
                .catch(error => addMessage("add keto log error! " + error.message))
                .finally(() => setIsThinking(false));
        } else {
            addMessage("Does not have missing data");
        }
    }, [name, date, macros]);

    const updateMacro = useCallback((key, value) => {
        if (isNumber(Number(value))) {
            addMessage(`Updating ${key} to ${value} for id ${id}`);
            editKetoLog(id, {[key]: Number(value)})
                .then(data => addMessage(`edit keto log success! ${JSON.stringify(data)}`))
                .catch(error => addMessage("error editing keto log " + error.message));
        } else {
            addMessage(`Invalid value for ${key}: ${value}`);
        }
    }, [addMessage, id]);

    if (!isSelected) {
        return (
            <FoodEmoji
                carbs={macros.carbs}
                totalCarbs={macros.carbs}
                onClick={onSelectEntry}
                name={name}/>
        );
    }

    return (
        <>
            <div className="relative bg-gray-700 my-4 p-2 grid grid-cols-3 gap-2 max-w-screen-sm rounded-lg w-full">
                {isNew ? null :
                    <X
                        className="absolute right-5 top-5 cursor-pointer"
                        weight="bold"
                        size={32}
                        onClick={async () => {
                            setIsThinking(true);
                            console.log(id);
                            if (!id) {
                                addMessage("No id found");
                                setIsThinking(false);
                                return;
                            }

                            await deleteKetoLog(id);
                            await refetch();
                            setIsThinking(false);
                        }}
                    />}
                <KetoInput
                    type="text"
                    placeholder="Log here, macros should fill automatically"
                    className="col-span-3"
                    name={KetoKeys.NAME}
                    value={name}
                    onChange={setName}
                    onBlur={updateMacrosWithAI}
                />
                <KetoInput
                    type="number"
                    name={KetoKeys.CALORIES}
                    value={macros.calories}
                    onChange={value => setMacros(prev => ({...prev, calories: value}))}
                    onBlur={value => updateMacro(KetoKeys.CALORIES, value)}
                />
                <KetoInput
                    type="number"
                    name={KetoKeys.PROTEIN}
                    value={macros.protein}
                    onChange={value => setMacros(prev => ({...prev, protein: value}))}
                    onBlur={value => updateMacro(KetoKeys.PROTEIN, value)}
                />
                <KetoInput
                    type="number"
                    name={KetoKeys.CARBS}
                    value={macros.carbs}
                    onChange={value => setMacros(prev => ({...prev, carbs: value}))}
                    onBlur={value => updateMacro(KetoKeys.CARBS, value)}
                />
            </div>
            {isThinking ?
                <div
                    className={classNames({
                        "flex justify-center items-center": true,
                        "animate-pulse text-white/90 bg-black/50": true,
                        "fixed bottom-32 z-10 inset-x-0 size-20 m-auto  rounded-full": true,
                    })}>
                    <Brain size={32} className=""/>
                </div> : null}
        </>
    )
}

// sliced cucumber, 5 pieces