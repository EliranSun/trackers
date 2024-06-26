import { KetoInput } from "./KetoInput";
import { addKetoLog, editKetoLog } from "../../utils/db";
import { useCallback, useEffect, useState } from "react";
import { fetchFoodNutrition } from "../../utils/api";
import { isNumber } from "lodash";
import { KetoKeys } from "../../constants";

export const KetoEntry = ({ data, onAddEntry }) => {
  const [name, setName] = useState(data.name || "");
  const [calories, setCalories] = useState(data.calories || null);
  const [protein, setProtein] = useState(data.protein || null);
  const [carbs, setCarbs] = useState(data.carbs || null);
  
  const updateMacrosWithAI = useCallback(async () => {
    const hasMissingData = !isNumber(calories) || !isNumber(protein) || !isNumber(carbs);
    
    if (hasMissingData) {
      const nutrition = await fetchFoodNutrition(name);
      
      !isNumber(calories) && setCalories(nutrition.calories);
      !isNumber(protein) && setProtein(nutrition.protein);
      !isNumber(carbs) && setCarbs(nutrition.carbs);
    }
  }, [calories, carbs, name, protein]);
  
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
    
    addKetoLog({ name, calories, protein, carbs })
      .then(data => {
        console.info("add keto log success!", { data });
        onAddEntry();
      })
      .catch(error => console.error("add keto log error!", { error }));
  }, [calories, carbs, data.calories, data.carbs, data.name, data.protein, name, protein]);
  
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
        value={calories}
        onChange={setCalories}
        onBlur={value => updateMacro(KetoKeys.CALORIES, value)}
      />
      <KetoInput
        type="number"
        name={KetoKeys.PROTEIN}
        value={protein}
        onChange={setProtein}
        onBlur={value => updateMacro(KetoKeys.PROTEIN, value)}
      />
      <KetoInput
        type="number"
        name={KetoKeys.CARBS}
        value={carbs}
        onChange={setCarbs}
        onBlur={value => updateMacro(KetoKeys.CARBS, value)}
      />
    </div>
  )
}