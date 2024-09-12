import {TrackerIcons, TrackerNames} from "../../constants";
import classNames from "classnames";
import {useState} from "react";
import {NavButton} from "./NavButton";
import {NavMenu} from "./NavMenu";

const PagesList = Object.values(TrackerNames);
const NAVBAR_PAGE_LIMIT = 3;

export const Navbar = ({selectedView, setSelectedView}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className={classNames({
                "text-gray-700": true,
                "w-screen left-0 fixed bottom-0 z-20 h-24 pb-4 px-8 font-mono": true,
                "bg-white dark:bg-neutral-800": true,
                "flex justify-center gap-16": true,
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