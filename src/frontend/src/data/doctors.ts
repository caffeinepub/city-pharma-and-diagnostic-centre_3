export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  availableDays: number[]; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  fee: number;
  timing: string;
  freeConsultation: boolean;
  initials: string;
  color: string;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Swati Lal",
    specialty: "Gynaecologist & Obstetrician",
    availableDays: [0],
    fee: 500,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: false,
    initials: "SL",
    color: "oklch(0.55 0.15 340)",
  },
  {
    id: 2,
    name: "Dr. Faruque",
    specialty: "Child, Diabetic & General Physician",
    availableDays: [2, 6],
    fee: 500,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: false,
    initials: "DF",
    color: "oklch(0.55 0.15 200)",
  },
  {
    id: 3,
    name: "Dr. Rahul Yogendar Raj",
    specialty: "Orthopaedic & Neurologist",
    availableDays: [0],
    fee: 500,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: false,
    initials: "RR",
    color: "oklch(0.55 0.15 264)",
  },
  {
    id: 4,
    name: "Dr. Anup Tirkey",
    specialty: "Dermatologist & Cosmetic Specialist",
    availableDays: [0],
    fee: 500,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: false,
    initials: "AT",
    color: "oklch(0.55 0.15 100)",
  },
  {
    id: 5,
    name: "Dr. Parmeshwar Lal",
    specialty: "Senior Physician (Chest & Neurology)",
    availableDays: [5],
    fee: 0,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: true,
    initials: "PL",
    color: "oklch(0.55 0.15 142)",
  },
  {
    id: 6,
    name: "Dr. R. L. Munda",
    specialty: "Senior Physician & Child Specialist",
    availableDays: [1],
    fee: 300,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: false,
    initials: "RM",
    color: "oklch(0.55 0.15 25)",
  },
  {
    id: 7,
    name: "Dr. Mayank Shekhar Sharma",
    specialty: "Gastroenterologist",
    availableDays: [4],
    fee: 500,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: false,
    initials: "MS",
    color: "oklch(0.55 0.15 60)",
  },
  {
    id: 8,
    name: "Dr. S. K. Choudhary",
    specialty: "Senior Dermatologist & Physician",
    availableDays: [1, 2, 3, 5, 6],
    fee: 500,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: false,
    initials: "SC",
    color: "oklch(0.55 0.15 300)",
  },
  {
    id: 9,
    name: "Dr. K. C. Singh Munda",
    specialty: "Senior General Physician",
    availableDays: [3],
    fee: 300,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: false,
    initials: "KM",
    color: "oklch(0.55 0.15 180)",
  },
  {
    id: 10,
    name: "Dr. Baidyanath Sadhu",
    specialty: "Expert Surgeon & General Surgeon",
    availableDays: [0, 1, 2, 3, 4, 5, 6],
    fee: 300,
    timing: "10:00 AM – 3:00 PM",
    freeConsultation: false,
    initials: "BS",
    color: "oklch(0.55 0.15 25)",
  },
];

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const FULL_DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM",
];
