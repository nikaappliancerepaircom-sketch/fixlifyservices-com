// Fixlify Appliance Services — Services Data
const SERVICES = [
  {
    slug: "refrigerator-repair",
    name: "Refrigerator Repair",
    shortName: "Refrigerator",
    icon: "🧊",
    emoji: "🧊",
    costMin: 150,
    costMax: 400,
    commonProblems: [
      "Not cooling or freezing",
      "Water leaking inside or under",
      "Ice maker not working",
      "Loud noise or humming",
      "Door seal/gasket damaged",
      "Compressor failure"
    ],
    brands: ["Samsung", "LG", "Whirlpool", "GE", "Bosch", "Frigidaire", "Kenmore"],
    description: "Expert refrigerator repair for all major brands. We fix cooling issues, water leaks, ice makers, compressors, and more. Same-day service available.",
    urgencyNote: "Fridge not cooling? Don't lose your groceries — book same-day repair now."
  },
  {
    slug: "washer-repair",
    name: "Washer Repair",
    shortName: "Washer",
    icon: "🫧",
    emoji: "🫧",
    costMin: 120,
    costMax: 350,
    commonProblems: [
      "Not spinning or draining",
      "Leaking water",
      "Won't start or turn on",
      "Loud banging or vibration",
      "Door latch broken",
      "Error codes displayed"
    ],
    brands: ["Samsung", "LG", "Whirlpool", "GE", "Maytag", "Kenmore", "Bosch"],
    description: "Washing machine repair for front-load and top-load washers. Fix spin, drain, leaks, and electrical issues. Book online for same-day service.",
    urgencyNote: "Washer won't spin? Don't let laundry pile up — book today."
  },
  {
    slug: "dryer-repair",
    name: "Dryer Repair",
    shortName: "Dryer",
    icon: "♨️",
    emoji: "♨️",
    costMin: 100,
    costMax: 300,
    commonProblems: [
      "Not heating or drying",
      "Takes too long to dry",
      "Making loud squeaking noise",
      "Drum not turning",
      "Overheating and shutting off",
      "Won't start"
    ],
    brands: ["Samsung", "LG", "Whirlpool", "GE", "Maytag", "Kenmore", "Bosch"],
    description: "Gas and electric dryer repair. We fix heating elements, drums, belts, and thermostats. Same-day dryer repair booking available.",
    urgencyNote: "Dryer not heating? Book now and we'll come today."
  },
  {
    slug: "dishwasher-repair",
    name: "Dishwasher Repair",
    shortName: "Dishwasher",
    icon: "🍽️",
    emoji: "🍽️",
    costMin: 120,
    costMax: 350,
    commonProblems: [
      "Not cleaning dishes properly",
      "Not draining water",
      "Leaking onto floor",
      "Won't start or door won't latch",
      "Loud grinding noise",
      "Not filling with water"
    ],
    brands: ["Bosch", "Samsung", "LG", "Whirlpool", "GE", "KitchenAid", "Frigidaire"],
    description: "Dishwasher repair for all major brands. Fix draining, cleaning, leaks, and electronic issues. Book same-day dishwasher repair online.",
    urgencyNote: "Dishwasher leaking? Book now before it causes water damage."
  },
  {
    slug: "oven-repair",
    name: "Oven Repair",
    shortName: "Oven",
    icon: "🔥",
    emoji: "🔥",
    costMin: 130,
    costMax: 380,
    commonProblems: [
      "Not heating to correct temperature",
      "Heating element burned out",
      "Control panel not working",
      "Door not closing properly",
      "Self-clean not working",
      "Gas igniter failure"
    ],
    brands: ["Samsung", "LG", "Whirlpool", "GE", "Bosch", "KitchenAid", "Frigidaire"],
    description: "Electric and gas oven repair. We fix heating elements, igniters, control boards, and door seals. Same-day oven repair available.",
    urgencyNote: "Oven not working before dinner? Book emergency repair now."
  },
  {
    slug: "stove-repair",
    name: "Stove & Range Repair",
    shortName: "Stove",
    icon: "🍳",
    emoji: "🍳",
    costMin: 130,
    costMax: 380,
    commonProblems: [
      "Burner not igniting",
      "Burner won't turn off",
      "Electric coil not heating",
      "Gas smell from burner",
      "Control knob broken",
      "Glass cooktop cracked"
    ],
    brands: ["Samsung", "LG", "Whirlpool", "GE", "Bosch", "KitchenAid", "Frigidaire"],
    description: "Gas and electric stove and range repair. Fix igniters, burners, control boards, and more. Book same-day stove repair with online scheduling.",
    urgencyNote: "Stove burner won't light? Book same-day repair — we'll come today."
  }
];

if (typeof module !== 'undefined') module.exports = SERVICES;
