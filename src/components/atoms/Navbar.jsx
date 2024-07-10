import {TrackerIcons, TrackerNames} from "../../constants";
import classNames from "classnames";
import {DotsThreeOutlineVertical, House,} from "@phosphor-icons/react";
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
                "flex w-screen left-0 fixed bottom-0 z-20 h-24 justify-between pb-4 px-4 font-mono": true,
                "bg-gray-700": true,
            })}>
                <NavButton
                    isSelected={selectedView === "home"}
                    onClick={() => {
                        setSelectedView("home");
                        setIsMenuOpen(false);
                    }}>
                    <House size={30}/>
                    {/*<label className="text-sm">Home</label>*/}
                </NavButton>
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
                <NavButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <DotsThreeOutlineVertical size={30}/>
                </NavButton>
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