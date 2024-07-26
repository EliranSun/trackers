import {TrackerIcons, TrackerNames} from "../../constants";
import classNames from "classnames";
import {useState} from "react";
import {NavButton} from "./NavButton";
import {NavMenu} from "./NavMenu";

const PagesList = Object.values(TrackerNames);
const NAVBAR_PAGE_LIMIT = 5;

export const Navbar = ({selectedView, setSelectedView}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className={classNames({
                "text-gray-700": true,
                "flex w-screen left-0 fixed bottom-0 z-20 h-24 justify-center pb-4 px-4 font-mono": true,
                "bg-gray-300 dark:bg-gray-700": true,
            })}>
                {PagesList
                    .slice(0, NAVBAR_PAGE_LIMIT)
                    .map((name) => {
                        const Icon = TrackerIcons[name];

                        return (
                            <NavButton
                                key={name}
                                isSelected={selectedView === name}
                                onClick={() => {
                                    setSelectedView(name);
                                    setIsMenuOpen(false);
                                }}>
                                <Icon size={30}/>
                                {/*<label className="text-xs">{name}</label>*/}
                            </NavButton>
                        );
                    })}
            </div>
            {isMenuOpen ?
                <NavMenu
                    items={PagesList.slice(NAVBAR_PAGE_LIMIT, PagesList.length)}
                    onClose={() => setIsMenuOpen(false)}
                    selectedMenuItem={selectedView}
                    onSelect={setSelectedView}/> : null}
        </>
    );
};