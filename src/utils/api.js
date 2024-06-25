import {FOOD_API} from "../constants";

export const fetchFoodNutrition = async (food) => {
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