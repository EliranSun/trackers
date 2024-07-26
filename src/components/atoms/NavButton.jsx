import classNames from "classnames";

export const NavButton = ({color, children, isSelected, onClick}) => {
    return (
        <button
            onClick={onClick}
            className={classNames({
                "text-black": color === "black",
                "text-black dark:text-white": isSelected,
                "text-black/30 dark:text-white/50": !isSelected && color !== "black",
                "hover:bg-white dark:hover:bg-black user-select-none": true,
                "p-4 relative z-20": true,
                "flex flex-col items-center justify-center": true,
            })}>
            {children}
        </button>
    )
}