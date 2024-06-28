import classNames from "classnames";

export const Measurements = ({ children }) => {
  return (
    <div className={classNames({
      "m-auto": true,
      "backdrop-blur rounded-full bg-gray-700 shadow-xl": true,
      "w-fit h-20 flex items-center gap-10 py-4 px-10": true,
      "sticky top-28 z-10 inset-x-0 ": true,
    })}>
      {children}
    </div>
  )
}