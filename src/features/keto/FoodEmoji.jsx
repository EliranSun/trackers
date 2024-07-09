import {FoodType} from "../../constants";
import {useRef, useState} from "react";
import classNames from "classnames";

export const FoodEmoji = ({name, onClick, carbs}) => {
    const ref = useRef(null);
    const [isSelected, setIsSelected] = useState(false);

    const foodEmoji = Object
        .entries(FoodType)
        .find(([key]) => name.toLowerCase().includes(key)) || [null, "😋"];

    return (
        <div
            ref={ref}
            data-name={name}
            className={classNames({
                "flex flex-col items-center justify-center h-20": true,
                "size-10": carbs === 0,
                "size-16": carbs < 10,
                "size-24": carbs >= 10,
                "size-28": carbs >= 20,
                "size-32": carbs >= 30,
                "size-36": carbs >= 40,
                "size-40": carbs >= 50,
                "user-select-none": true,
                "cursor-pointer bg-gray-700": true,
                "bg-gray-500": isSelected,
            })}
            onClick={() => {
                setIsSelected(!isSelected);
                onClick(!isSelected);
            }}>
            <span className="mt-0 text-3xl">{foodEmoji ? foodEmoji[1] : null}</span>
            <span className="-mt-1 text-[8px]">
                {name.replace(",", "").split(" ")[0]}, {Math.round(carbs)}
                </span>
        </div>
    );
}