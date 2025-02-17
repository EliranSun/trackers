import classNames from "classnames";

export const NavButton = ({color, children, isSelected, onClick}) => {
    return (
        <button
            onClick={onClick}
            className={classNames({
                "text-black": color === "black",
                "text-amber-500 dark:text-amber-500": isSelected,
                "text-black/30 dark:text-white/50": !isSelected && color !== "black",
                "user-select-none": true,
                "py-2 relative z-20": true,
                "flex flex-col items-center justify-center": true,
            })}>
            {children}
        </button>
    )
}