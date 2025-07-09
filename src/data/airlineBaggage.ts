export interface AirlineBaggage {
  name: string;
  code: string;
  carryOn: {
    dimensions: string;
    weight: string;
    restrictions?: string[];
  };
  checkedBag: {
    dimensions: string;
    weightLimits: {
      economy: string;
      premium: string;
      business: string;
      first: string;
    };
    fees?: {
      first: string;
      second: string;
      overweight: string;
    };
  };
  personalItem: {
    dimensions: string;
    description: string;
  };
}

export const airlineBaggageRules: AirlineBaggage[] = [
  {
    name: "American Airlines",
    code: "AA",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "No weight limit",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "50 lbs (23 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "$30",
        second: "$40",
        overweight: "$100-200"
      }
    },
    personalItem: {
      dimensions: "18 x 14 x 8 inches (45 x 35 x 20 cm)",
      description: "Purse, laptop bag, or small backpack"
    }
  },
  {
    name: "Delta Air Lines",
    code: "DL",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 35 x 23 cm)",
      weight: "No weight limit",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "50 lbs (23 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "$30",
        second: "$40",
        overweight: "$100-200"
      }
    },
    personalItem: {
      dimensions: "18 x 14 x 8 inches (45 x 35 x 20 cm)",
      description: "Small bag that fits under seat"
    }
  },
  {
    name: "United Airlines",
    code: "UA",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 35 x 22 cm)",
      weight: "No weight limit",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "50 lbs (23 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "$35",
        second: "$45",
        overweight: "$100-400"
      }
    },
    personalItem: {
      dimensions: "17 x 10 x 9 inches (43 x 25 x 22 cm)",
      description: "Small bag that fits under seat"
    }
  },
  {
    name: "Southwest Airlines",
    code: "WN",
    carryOn: {
      dimensions: "24 x 16 x 10 inches (61 x 41 x 28 cm)",
      weight: "No weight limit",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "50 lbs (23 kg)",
        business: "50 lbs (23 kg)",
        first: "50 lbs (23 kg)"
      },
      fees: {
        first: "Free",
        second: "Free",
        overweight: "$75-100"
      }
    },
    personalItem: {
      dimensions: "18.5 x 8.5 x 13.5 inches (47 x 22 x 34 cm)",
      description: "Small bag that fits under seat"
    }
  },
  {
    name: "JetBlue Airways",
    code: "B6",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "No weight limit",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "50 lbs (23 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "$35",
        second: "$45",
        overweight: "$100-150"
      }
    },
    personalItem: {
      dimensions: "17 x 13 x 8 inches (43 x 33 x 20 cm)",
      description: "Small bag that fits under seat"
    }
  },
  {
    name: "Alaska Airlines",
    code: "AS",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "No weight limit",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "50 lbs (23 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "$30",
        second: "$40",
        overweight: "$100"
      }
    },
    personalItem: {
      dimensions: "18 x 14 x 8 inches (45 x 35 x 20 cm)",
      description: "Small bag that fits under seat"
    }
  },
  {
    name: "Spirit Airlines",
    code: "NK",
    carryOn: {
      dimensions: "22 x 18 x 10 inches (56 x 46 x 25 cm)",
      weight: "40 lbs (18 kg)",
      restrictions: ["Fee applies", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "40 lbs (18 kg)",
        premium: "40 lbs (18 kg)",
        business: "40 lbs (18 kg)",
        first: "40 lbs (18 kg)"
      },
      fees: {
        first: "$37-89",
        second: "$42-94",
        overweight: "$50-100"
      }
    },
    personalItem: {
      dimensions: "18 x 14 x 8 inches (45 x 35 x 20 cm)",
      description: "Small bag that fits under seat (FREE)"
    }
  },
  {
    name: "Frontier Airlines",
    code: "F9",
    carryOn: {
      dimensions: "24 x 16 x 10 inches (61 x 41 x 25 cm)",
      weight: "35 lbs (16 kg)",
      restrictions: ["Fee applies", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "50 lbs (23 kg)",
        business: "50 lbs (23 kg)",
        first: "50 lbs (23 kg)"
      },
      fees: {
        first: "$37-59",
        second: "$45-69",
        overweight: "$75-100"
      }
    },
    personalItem: {
      dimensions: "18 x 14 x 8 inches (45 x 35 x 20 cm)",
      description: "Small bag that fits under seat (FREE)"
    }
  },
  {
    name: "British Airways",
    code: "BA",
    carryOn: {
      dimensions: "22 x 18 x 10 inches (56 x 45 x 25 cm)",
      weight: "51 lbs (23 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "51 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "90 lbs (40 kg)"
      },
      fees: {
        first: "Included",
        second: "$150-300",
        overweight: "$100-200"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag or laptop bag"
    }
  },
  {
    name: "Lufthansa",
    code: "LH",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "12 x 16 x 6 inches (30 x 40 x 10 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Air France",
    code: "AF",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (55 x 35 x 25 cm)",
      weight: "26 lbs (12 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "KLM Royal Dutch Airlines",
    code: "KL",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (55 x 35 x 25 cm)",
      weight: "26 lbs (12 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Emirates",
    code: "EK",
    carryOn: {
      dimensions: "22 x 15 x 8 inches (55 x 38 x 22 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "88 lbs (40 kg)",
        business: "88 lbs (40 kg)",
        first: "110 lbs (50 kg)"
      },
      fees: {
        first: "Included",
        second: "$150-300",
        overweight: "$50-300"
      }
    },
    personalItem: {
      dimensions: "14 x 12 x 6 inches (35 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Qatar Airways",
    code: "QR",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 22 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50-66 lbs (23-30 kg)",
        premium: "88 lbs (40 kg)",
        business: "88 lbs (40 kg)",
        first: "110 lbs (50 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-300",
        overweight: "$50-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Singapore Airlines",
    code: "SQ",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (56 x 40 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "66 lbs (30 kg)",
        premium: "77 lbs (35 kg)",
        business: "88 lbs (40 kg)",
        first: "110 lbs (50 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$50-200"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Cathay Pacific",
    code: "CX",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "77 lbs (35 kg)",
        business: "88 lbs (40 kg)",
        first: "88 lbs (40 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-300",
        overweight: "$50-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Japan Airlines (JAL)",
    code: "JL",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 25 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "All Nippon Airways (ANA)",
    code: "NH",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 25 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Air Canada",
    code: "AC",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (56 x 40 x 23 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "50 lbs (23 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "$30-75",
        second: "$50-100",
        overweight: "$100-225"
      }
    },
    personalItem: {
      dimensions: "16 x 13 x 6 inches (41 x 33 x 16 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "WestJet",
    code: "WS",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (56 x 40 x 23 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "50 lbs (23 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "$29.75-59.50",
        second: "$39.25-79.50",
        overweight: "$50-100"
      }
    },
    personalItem: {
      dimensions: "16 x 13 x 8 inches (41 x 33 x 20 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Virgin Atlantic",
    code: "VS",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "66 lbs (30 kg)",
        business: "70 lbs (32 kg)",
        first: "90 lbs (40 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "14 x 10 x 6 inches (35 x 25 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Virgin Australia",
    code: "VA",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "66 lbs (30 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "$40-80",
        second: "$60-120",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Qantas",
    code: "QF",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "77 lbs (35 kg)",
        business: "88 lbs (40 kg)",
        first: "88 lbs (40 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-300",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Air New Zealand",
    code: "NZ",
    carryOn: {
      dimensions: "22 x 14 x 10 inches (56 x 36 x 25 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Turkish Airlines",
    code: "TK",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Swiss International Air Lines",
    code: "LX",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Austrian Airlines",
    code: "OS",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Brussels Airlines",
    code: "SN",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "26 lbs (12 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Scandinavian Airlines (SAS)",
    code: "SK",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Norwegian Air",
    code: "DY",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "44 lbs (20 kg)",
        premium: "66 lbs (30 kg)",
        business: "66 lbs (30 kg)",
        first: "66 lbs (30 kg)"
      },
      fees: {
        first: "$50-150",
        second: "$75-200",
        overweight: "$50-200"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Finnair",
    code: "AY",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Iberia",
    code: "IB",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (56 x 40 x 25 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "TAP Air Portugal",
    code: "TP",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 20 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Alitalia",
    code: "AZ",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 20 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "LOT Polish Airlines",
    code: "LO",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Czech Airlines",
    code: "OK",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Ethiopian Airlines",
    code: "ET",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "South African Airways",
    code: "SA",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (56 x 36 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "EgyptAir",
    code: "MS",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Royal Air Maroc",
    code: "AT",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Kenya Airways",
    code: "KQ",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "China Eastern Airlines",
    code: "MU",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 20 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "China Southern Airlines",
    code: "CZ",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 20 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Air China",
    code: "CA",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 20 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Hainan Airlines",
    code: "HU",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 20 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Korean Air",
    code: "KE",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 20 cm)",
      weight: "26 lbs (12 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Asiana Airlines",
    code: "OZ",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (55 x 40 x 20 cm)",
      weight: "22 lbs (10 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Thai Airways",
    code: "TG",
    carryOn: {
      dimensions: "22 x 16 x 9 inches (56 x 45 x 25 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "66 lbs (30 kg)",
        premium: "77 lbs (35 kg)",
        business: "88 lbs (40 kg)",
        first: "88 lbs (40 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Malaysia Airlines",
    code: "MH",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "66 lbs (30 kg)",
        premium: "77 lbs (35 kg)",
        business: "88 lbs (40 kg)",
        first: "88 lbs (40 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Philippine Airlines",
    code: "PR",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 6 inches (40 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Cebu Pacific",
    code: "5J",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "44 lbs (20 kg)",
        premium: "66 lbs (30 kg)",
        business: "66 lbs (30 kg)",
        first: "66 lbs (30 kg)"
      },
      fees: {
        first: "$25-50",
        second: "$40-80",
        overweight: "$50-150"
      }
    },
    personalItem: {
      dimensions: "14 x 10 x 8 inches (35 x 25 x 20 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "AirAsia",
    code: "AK",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (56 x 36 x 23 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "32 x 20 x 12 inches (81 x 51 x 31 cm)",
      weightLimits: {
        economy: "44 lbs (20 kg)",
        premium: "66 lbs (30 kg)",
        business: "66 lbs (30 kg)",
        first: "66 lbs (30 kg)"
      },
      fees: {
        first: "$25-75",
        second: "$40-100",
        overweight: "$15-30 per kg"
      }
    },
    personalItem: {
      dimensions: "16 x 12 x 4 inches (40 x 30 x 10 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "IndiGo",
    code: "6E",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (55 x 35 x 25 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "33-44 lbs (15-20 kg)",
        premium: "77 lbs (35 kg)",
        business: "77 lbs (35 kg)",
        first: "77 lbs (35 kg)"
      },
      fees: {
        first: "$20-60",
        second: "$40-100",
        overweight: "$10-20 per kg"
      }
    },
    personalItem: {
      dimensions: "14 x 12 x 6 inches (35 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "SpiceJet",
    code: "SG",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (55 x 35 x 25 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "33-44 lbs (15-20 kg)",
        premium: "66 lbs (30 kg)",
        business: "66 lbs (30 kg)",
        first: "66 lbs (30 kg)"
      },
      fees: {
        first: "$15-50",
        second: "$30-80",
        overweight: "$8-15 per kg"
      }
    },
    personalItem: {
      dimensions: "14 x 12 x 6 inches (35 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "GoAir",
    code: "G8",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (55 x 35 x 25 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "33-44 lbs (15-20 kg)",
        premium: "66 lbs (30 kg)",
        business: "66 lbs (30 kg)",
        first: "66 lbs (30 kg)"
      },
      fees: {
        first: "$20-60",
        second: "$40-100",
        overweight: "$10-20 per kg"
      }
    },
    personalItem: {
      dimensions: "14 x 12 x 6 inches (35 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Vistara",
    code: "UK",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (55 x 35 x 25 cm)",
      weight: "15 lbs (7 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "33-44 lbs (15-20 kg)",
        premium: "77 lbs (35 kg)",
        business: "88 lbs (40 kg)",
        first: "88 lbs (40 kg)"
      },
      fees: {
        first: "Included",
        second: "$50-100",
        overweight: "$10-20 per kg"
      }
    },
    personalItem: {
      dimensions: "14 x 12 x 6 inches (35 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  },
  {
    name: "Air India",
    code: "AI",
    carryOn: {
      dimensions: "22 x 14 x 9 inches (55 x 35 x 25 cm)",
      weight: "18 lbs (8 kg)",
      restrictions: ["Must fit in overhead bin", "1 bag + 1 personal item"]
    },
    checkedBag: {
      dimensions: "62 linear inches (158 cm)",
      weightLimits: {
        economy: "50 lbs (23 kg)",
        premium: "64 lbs (29 kg)",
        business: "70 lbs (32 kg)",
        first: "70 lbs (32 kg)"
      },
      fees: {
        first: "Included",
        second: "$100-200",
        overweight: "$100-300"
      }
    },
    personalItem: {
      dimensions: "14 x 12 x 6 inches (35 x 30 x 15 cm)",
      description: "Small handbag, laptop bag, or camera bag"
    }
  }
];