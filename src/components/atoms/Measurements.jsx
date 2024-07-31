import classNames from "classnames";

export const Measurements = ({children}) => {
    return (
        <div className={classNames({
            "m-auto": true,
            "backdrop-blur rounded-full bg-gray-200 dark:bg-gray-700 shadow-xl": true,
            "w-fit flex items-center gap-10 py-3 px-10": true,
            "sticky top-20 z-10 inset-x-0": true,
        })}>
            {children}
        </div>
    )
}