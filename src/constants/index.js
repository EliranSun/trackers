import {Bed, Egg, GearSix, Ruler, SmileyXEyes, Timer} from "@phosphor-icons/react";

export const FOOD_API = "https://walak.vercel.app/nutrition";
export const KETO_KEY = "keto";
export const ONE_DAY = 1000 * 60 * 60 * 24;

export const TrackerNames = {
    KETO: "Keto",
    HOURLY: "Hourly",
    WEIGHT: "Weight",
    SLEEP: "Sleep",
    NO_PRON: "NoPron",
};

export const TrackerIcons = {
    [TrackerNames.KETO]: Egg,
    [TrackerNames.NO_PRON]: SmileyXEyes,
    [TrackerNames.SLEEP]: Bed,
    [TrackerNames.WEIGHT]: Ruler,
    [TrackerNames.HOURLY]: Timer,
    // [TrackerNames.SETTINGS]: GearSix,
};

export const KetoKeys = {
    NAME: "name",
    CALORIES: "calories",
    PROTEIN: "protein",
    CARBS: "carbs",
};

export const FoodType = {
    coffee: "☕",
    watermelon: "🍉",
    broccoli: "🥦",
    cucumber: "🥒",
    pepper: "🌶️",
    carrot: "🥕",
    onion: "🧅",
    potato: "🥔",
    ham: "🍠",
    croissant: "🥐",
    bread: "🍞",
    egg: "🥚",
    omelette: "🍳",
    pancake: "🥞",
    bacon: "🥓",
    steak: "🥩",
    chicken: "🍗",
    patty: "🍔",
    hamburger: "🍔",
    fries: "🍟",
    pizza: "🍕",
    sandwich: "🥪",
    pita: "🫓",
    falafel: "🧆",
    taco: "🌯",
    salad: "🥗",
    stew: "🥘",
    soup: "🫕",
    pasta: "🍝",
    noddles: "🍝",
    spaghetti: "🍝",
    rice: "🍚",
    cookie: "🍪",
    cracker: "🍘",
    hummus: "🫕",
    tahini: "🫕",
    lettuce: "🥬",
    beer: "🍺",
    cocktail: "🍹",
    wine: "🍷",
    chocolate: "🍫",
    mustard: "🥫",
    mayonnaise: "🥫",
    mayo: "🥫",
    frankfurter: "🌭",
    würstchen: "🌭",
    hotdog: "🌭",
    "hot dog": "🌭",
};