import { KetoInput } from "./KetoInput";
import { addKetoLog, editKetoLog } from "../../utils/db";
import { useCallback, useEffect, useState } from "react";
import { fetchFoodNutrition } from "../../utils/api";
import { isNumber } from "lodash";
import { KetoKeys } from "../../constants";

export const KetoEntry = ({ data, onAddEntry }) => {
  const [name, setName] = useState(data.name || "");
  const [macros, setMacros] = useState({
    calories: null,
    carbs: null,
    protein: null,
  });
    
  const updateMacrosWithAI = useCallback(async () => {
    const hasMissingData = 
    !isNumber(macros.calories) || 
    !isNumber(macros.protein) || 
    !isNumber(macros.carbs);
    
    if (hasMissingData) {
      const nutrition = await fetchFoodNutrition(name);
      setMacros({
        calories: nutrition.calories,
        carbs: nutrition.carbs,
        protein: nutrition.protein
      });
    }
  }, [name, macros]);
  
  const updateMacro = useCallback((key, value) => {
    if (isNumber(data[key])) {
      editKetoLog(data.id, { [key]: value })
        .then(data => console.info("edit keto log success!", { data }))
        .catch(error => console.error("edit keto log error!", { error }));
    }
  }, [data]);
  
  useEffect(() => {
    const dataChanged = name !== data.name || calories !== data.calories || protein !== data.protein || carbs !== data.carbs;
    if (!name || !dataChanged || !isNumber(calories) || !isNumber(protein) || !isNumber(carbs)) {
      return
    }
    
    addKetoLog({ name, ...macros })
      .then(data => {
        console.info("add keto log success!", { data });
        onAddEntry();
      })
      .catch(error => console.error("add keto log error!", { error }));
  }, [macros, data, name]);
  
  return (
    <div className="bg-gray-700 my-4 p-2 grid grid-cols-3 gap-2 max-w-screen-sm rounded-lg w-full">
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
        onChange={value => setMacros(prev => ({ ...prev, calories: value }))}
        onBlur={value => updateMacro(KetoKeys.CALORIES, value)}
      />
      <KetoInput
        type="number"
        name={KetoKeys.PROTEIN}
        value={macros.protein}
        onChange={value => setMacros(prev => ({ ...prev, protein: value }))}
        onBlur={value => updateMacro(KetoKeys.PROTEIN, value)}
      />
      <KetoInput
        type="number"
        name={KetoKeys.CARBS}
        value={macros.carbs}
        onChange={value => setMacros(prev => ({ ...prev, carbs: value }))}
        onBlur={value => updateMacro(KetoKeys.CARBS, value)}
      />
    </div>
  )
}