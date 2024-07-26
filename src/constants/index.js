import {
    Bed,
    CircleHalfTilt,
    Egg,
    ForkKnife,
    Ghost,
    Gift,
    Heart,
    Ruler,
    House,
    Timer,
    Waveform,
    ToiletPaper,
    Bandaids,
    CheckFat
} from "@phosphor-icons/react";

export const FOOD_API = "https://walak.vercel.app/nutrition";
export const KETO_KEY = "keto";
export const ONE_DAY = 1000 * 60 * 60 * 24;

export const TrackerNames = {
    KETO: "Keto",
    HOURLY: "Hourly",
    HABIT: "Habit",
    WEIGHT: "Weight",
    SLEEP: "Sleep",
    PRON: "Pron",
    ANGER: "Anger",
    DATES: "Dates",
    ESX: "Esx",
    LYING: "Lying",
    DINNER: "Dinner",
    SMALL_THINGS: "Small Things",
    SNORE: "Snore",
};

export const TrackerIcons = {
    [TrackerNames.KETO]: Egg,
    [TrackerNames.PRON]: ToiletPaper,
    [TrackerNames.SLEEP]: Bed,
    [TrackerNames.WEIGHT]: Ruler,
    [TrackerNames.HABIT]: CheckFat,
    [TrackerNames.HOME]: House,
    [TrackerNames.HOURLY]: Timer,
    [TrackerNames.ANGER]: Bandaids,
    [TrackerNames.ESX]: CircleHalfTilt,
    [TrackerNames.LYING]: Ghost,
    [TrackerNames.DINNER]: ForkKnife,
    [TrackerNames.SMALL_THINGS]: Gift,
    [TrackerNames.SNORE]: Waveform,
    [TrackerNames.DATES]: Heart,
};

export const TrackerType = {
    CHECKBOX: "checkbox",
    NUMBER: "number",
    TEXT: "text",
}

export const Trackers = {
    [TrackerNames.KETO]: {
        name: TrackerNames.KETO,
        icon: TrackerIcons[TrackerNames.KETO],
        type: TrackerType.TEXT,
    },
    [TrackerNames.PRON]: {
        name: TrackerNames.PRON,
        icon: TrackerIcons[TrackerNames.PRON],
        type: TrackerType.CHECKBOX,
        isSuccessMessage: "abstained",
        isFailureMessage: "watched",
        isPositive: false,

    },
    [TrackerNames.SLEEP]: {
        name: TrackerNames.SLEEP,
        icon: TrackerIcons[TrackerNames.SLEEP],
        type: TrackerType.CHECKBOX,
        isSuccessMessage: "rested",
        isFailureMessage: "deprived",
        isPositive: true,
    },
    [TrackerNames.SNORE]: {
        name: TrackerNames.SNORE,
        icon: TrackerIcons[TrackerNames.SNORE],
        type: TrackerType.CHECKBOX,
        isSuccessMessage: "quiet",
        isFailureMessage: "snored",
        isPositive: false,
    },
    [TrackerNames.WEIGHT]: {
        name: TrackerNames.WEIGHT,
        icon: TrackerIcons[TrackerNames.WEIGHT],
        type: TrackerType.NUMBER,
    },
    [TrackerNames.HOURLY]: {
        name: TrackerNames.HOURLY,
        icon: TrackerIcons[TrackerNames.HOURLY],
        type: TrackerType.TEXT,
    },
    [TrackerNames.ANGER]: {
        name: TrackerNames.ANGER,
        icon: TrackerIcons[TrackerNames.ANGER],
        type: TrackerType.CHECKBOX,
        isSuccessMessage: "peaceful",
        isFailureMessage: "angry",
        isPositive: false,
    },
    [TrackerNames.ESX]: {
        name: TrackerNames.ESX,
        icon: TrackerIcons[TrackerNames.ESX],
        type: TrackerType.CHECKBOX,
        isSuccessMessage: "sexual",
        isFailureMessage: "celibacy",
        isPositive: true,
    },
    [TrackerNames.LYING]: {
        name: TrackerNames.LYING,
        icon: TrackerIcons[TrackerNames.LYING],
        type: TrackerType.CHECKBOX,
        isSuccessMessage: "truthful",
        isFailureMessage: "lied",
        isPositive: false,
    },
    [TrackerNames.DINNER]: {
        name: TrackerNames.DINNER,
        icon: TrackerIcons[TrackerNames.DINNER],
        type: TrackerType.CHECKBOX,
        isSuccessMessage: "served",
        isFailureMessage: "cold",
        isPositive: true,
    },
    [TrackerNames.SMALL_THINGS]: {
        name: TrackerNames.SMALL_THINGS,
        icon: TrackerIcons[TrackerNames.SMALL_THINGS],
        type: TrackerType.CHECKBOX,
        isSuccessMessage: "care",
        isFailureMessage: "neglect",
        isPositive: true,
    },
    [TrackerNames.DATES]: {
        name: TrackerNames.DATES,
        icon: TrackerIcons[TrackerNames.DATES],
        type: TrackerType.CHECKBOX,
        isSuccessMessage: "intimacy",
        isFailureMessage: "detachment",
        isPositive: true,
    },
}

export const KetoKeys = {
    NAME: "name",
    CALORIES: "calories",
    PROTEIN: "protein",
    CARBS: "carbs",
};

export const FoodType = {
    coffee: "☕",
    espresso: "☕",
    cappuccino: "☕",
    americano: "☕",
    latte: "☕",
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
    beef: "🥩",
    steak: "🥩",
    chicken: "🍗",
    patty: "🍔",
    hamburger: "🍔",
    fries: "🍟",
    pizza: "🍕",
    sandwich: "🥪",
    pita: "🫓",
    falafel: "🧆",
    meatballs: "🧆",
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
    vodka: "🥃",
    whiskey: "🥃",
    chocolate: "🍫",
    mustard: "🥫",
    mayonnaise: "🥫",
    mayo: "🥫",
    frankfurter: "🌭",
    würstchen: "🌭",
    hotdog: "🌭",
    "hot dog": "🌭",
    pringles: "🍿",
    snack: "🍫",
    chips: "🍟",
    "french fries": "🍟",
    tofu: "🍢",
    shcnitzel: "🍖",
    schnitzel: "🍖",
    schnitchel: "🍖",
    shnitchel: "🍖",
    couscous: "🍚",
    nuts: "🥜",
    cinnabon: "🥮",
    cinnamon: "🥮",
    burger: "🍔",
    biscuit: "🍪",
    doritos: "🍟",
};

export const MonthsColors = {
    0: "bg-red-500",
    1: "bg-orange-500",
    2: "bg-amber-500",
    3: "bg-yellow-500",
    4: "bg-lime-500",
    5: "bg-green-500",
    6: "bg-emerald-500",
    7: "bg-teal-500",
    8: "bg-cyan-500",
    9: "bg-sky-200",
    10: "bg-blue-200",
    11: "bg-indigo-200",
    12: "bg-violet-200",
};