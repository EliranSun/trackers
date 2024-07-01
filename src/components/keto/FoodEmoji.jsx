import {FoodType} from "../../constants";
import {useRef, useState} from "react";
import classNames from "classnames";
import {useClickOutside} from "../../hooks/useClickOutside";
import {TOTAL_CARBS} from "./KetoTable";

export const FoodEmoji = ({name, onClick, carbs}) => {
    const ref = useRef(null);
    const [isSelected, setIsSelected] = useState(false);

    // useClickOutside(ref, () => {
    //     setIsSelected(false);
    //     onClick(false);
    // });

    const foodEmoji = Object
        .entries(FoodType)
        .find(([key, emoji]) => name.toLowerCase().includes(key));

    return (
        <div
            ref={ref}
            data-name={name}
            className={classNames({
                "flex flex-col items-center justify-center h-max": true,
                "size-10": carbs === 0,
                "size-16": carbs < 10,
                "size-24": carbs >= 10,
                "size-28": carbs >= 20,
                "size-32": carbs >= 30,
                "size-36": carbs >= 40,
                "size-40": carbs >= 50,
                "user-select-none": true,
                "cursor-pointer bg-gray-700 text-2xl": true,
                "bg-gray-500": isSelected,
            })}
            onClick={() => {
                setIsSelected(!isSelected);
                onClick(!isSelected);
            }}>
            <span className="mt-4">{foodEmoji ? foodEmoji[1] : null}</span>
            <span className="-mt-3 text-[8px]">{name.replace(",", "").split(" ")[0]}</span>
        </div>
    );
}