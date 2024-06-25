import {TrackerIcons, TrackerNames} from "../constants";
import classNames from "classnames";

export const Navbar = ({selectedView, setSelectedView}) => {
    return (
        <div className="flex w-screen left-0 fixed bottom-0 h-24 bg-gray-900 justify-evenly px-4 pb-4 font-mono">
            {Object.values(TrackerNames).map((name, index) => {
                const Icon = TrackerIcons[name];

                return (
                    <button
                        key={name}
                        className={classNames({
                            "bg-black": selectedView === name,
                            "bg-transparent": selectedView !== name,
                            "p-4 text-white": true,
                        })}
                        onClick={() => {
                            console.log(name);
                            setSelectedView(name);
                        }}>
                        <Icon/>
                    </button>
                );
            })}
        </div>
    );
};