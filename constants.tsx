
import React from 'react';
import { 
  LayoutDashboard, 
  PlayCircle, 
  Target, 
  BookOpen, 
  Map, 
  Library, 
  Settings, 
  ShieldAlert,
  ChevronRight,
  HelpCircle,
  Timer,
  XCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ICONS = {
  Dashboard: <LayoutDashboard size={20} />,
  Practice: <PlayCircle size={20} />,
  Focus: <Target size={20} />,
  Topics: <BookOpen size={20} />,
  Oregon: <Map size={20} />,
  Resources: <Library size={20} />,
  Settings: <Settings size={20} />,
  Admin: <ShieldAlert size={20} />,
  Chevron: <ChevronRight size={16} />,
  Help: <HelpCircle size={16} />,
  Timer: <Timer size={16} />,
  Incorrect: <XCircle size={24} className="text-red-500" />,
  Correct: <CheckCircle2 size={24} className="text-green-500" />,
  Hint: <AlertCircle size={16} />
};

export interface Tip {
  category: "Math" | "PLSS" | "Law" | "Traverse" | "Strategy" | "Oregon" | "GNSS";
  text: string;
}

export const TIPS: Tip[] = [
  { 
    category: "Strategy", 
    text: "The FS exam tests speed as much as knowledge. Aim for 2-3 minutes per question. If a calculation takes longer than 5 minutes, flag it and move on." 
  },
  { 
    category: "PLSS", 
    text: "Hierarchy of Calls: Natural monuments (rivers, trees) outrank artificial ones (iron pipes), which both outrank adjoiners, then bearings/distances, and finally area." 
  },
  { 
    category: "Oregon", 
    text: "Oregon licensure requires passing the FS, PS, and a state-specific law exam. The state exam focuses heavily on ORS Chapters 92 (Plats) and 209 (County Surveyor duties)." 
  },
  { 
    category: "Traverse", 
    text: "The Compass Rule assumes errors in angles and distances are equally likely. It distributes the closure error proportional to the length of each course." 
  },
  { 
    category: "Math", 
    text: "Law of Cosines: Use c² = a² + b² - 2ab cos(C) when you have two sides and the included angle (SAS) or all three sides (SSS)." 
  },
  { 
    category: "GNSS", 
    text: "PDOP (Positional Dilution of Precision) measures satellite geometry. Values below 4.0 are ideal; values above 7.0 usually indicate poor reliability." 
  },
  { 
    category: "Law", 
    text: "Senior Rights: In cases of overlap, the first deed recorded (or the one from the senior chain of title) usually takes precedence. In plats, however, shortages/surpluses are usually prorated." 
  },
  { 
    category: "PLSS", 
    text: "Meander lines are not property boundaries. The actual boundary is the Ordinary High Water Mark (OHWM) for navigable waters." 
  },
  { 
    category: "Math", 
    text: "Heron's Formula: Area = sqrt(s(s-a)(s-b)(s-c)), where s is the semi-perimeter (a+b+c)/2. Perfect for calculating area when only side lengths are known." 
  },
  { 
    category: "Traverse", 
    text: "Azimuths are typically measured clockwise from North. To convert an Azimuth (Az) to a Bearing in the SE quadrant: Bearing = S (180 - Az) E." 
  },
  { 
    category: "Law", 
    text: "Adverse Possession (OCEAN): Possession must be Open, Continuous, Exclusive, Adverse (Hostile), and Notorious for the full statutory period." 
  },
  { 
    category: "GNSS", 
    text: "Multipath error occurs when signals reflect off surfaces (buildings, trees) before reaching the antenna. It is the most difficult GNSS error to model mathematically." 
  },
  { 
    category: "Traverse", 
    text: "Linear Error of Closure (LEOC) = sqrt((Σ Latitudes)² + (Σ Departures)²). The precision is the LEOC divided by the total perimeter." 
  }
];

export const MASTERY_LABELS = [
  "New",
  "Struggling",
  "Learning",
  "Stable",
  "Strong",
  "Exam Ready"
];
