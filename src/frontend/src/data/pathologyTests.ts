export interface PathologyTest {
  name: string;
  price: number;
}

export const pathologyTests: Record<string, PathologyTest[]> = {
  "Hematology": [
    { name: "CBC (Hb, TLC, DLC, Platelet)", price: 300 },
    { name: "ESR", price: 100 },
    { name: "Reticulocyte Count", price: 100 },
    { name: "AEC", price: 100 },
    { name: "MP (Malaria Parasite)", price: 200 },
    { name: "PBS", price: 300 },
    { name: "Sickling Test", price: 400 },
  ],
  "Immuno-Hematology": [
    { name: "Direct Coombs", price: 400 },
    { name: "Indirect Coombs", price: 400 },
    { name: "ABO & Rh", price: 100 },
  ],
  "Diabetes & Metabolism": [
    { name: "RBS", price: 75 },
    { name: "FBS", price: 75 },
    { name: "PPBS", price: 75 },
    { name: "HbA1C", price: 450 },
    { name: "OGTT", price: 500 },
    { name: "OGCT", price: 500 },
  ],
  "Cardiac & Emergency": [
    { name: "Trop-T", price: 1200 },
    { name: "LDH", price: 500 },
  ],
  "Hemoglobin Studies": [
    { name: "Hb Electrophoresis", price: 1200 },
  ],
  "Biochemistry": [
    { name: "KFT", price: 500 },
    { name: "RFT", price: 500 },
    { name: "LFT", price: 600 },
    { name: "Blood Urea", price: 150 },
    { name: "Serum Creatinine", price: 150 },
    { name: "Serum Uric Acid", price: 200 },
    { name: "Serum Calcium", price: 200 },
    { name: "Serum Sodium", price: 250 },
    { name: "Serum Potassium", price: 250 },
    { name: "SGPT", price: 150 },
    { name: "SGOT", price: 150 },
    { name: "Alkaline Phosphatase", price: 150 },
    { name: "Total Protein", price: 200 },
    { name: "Serum Albumin", price: 150 },
    { name: "GGT", price: 500 },
  ],
  "Lipid & Hormones": [
    { name: "Lipid Profile", price: 500 },
    { name: "TFT (T3, T4, TSH)", price: 600 },
    { name: "FT3, FT4", price: 600 },
    { name: "Prolactin", price: 575 },
    { name: "LH", price: 550 },
    { name: "FSH", price: 550 },
    { name: "Beta-HCG", price: 1000 },
    { name: "AMH", price: 1500 },
  ],
  "Vitamins & Special Tests": [
    { name: "Vitamin B12", price: 1300 },
    { name: "Vitamin D", price: 1300 },
    { name: "Serum IgE", price: 1000 },
    { name: "PSA Free", price: 1000 },
    { name: "PSA Total", price: 1000 },
    { name: "Serum Ferritin", price: 1000 },
    { name: "Serum Iron", price: 300 },
    { name: "Iron Profile", price: 1000 },
    { name: "Procalcitonin", price: 2500 },
    { name: "Serum Amylase", price: 750 },
    { name: "Serum Lipase", price: 750 },
    { name: "Ammonia", price: 1000 },
  ],
  "Serology & Infectious Diseases": [
    { name: "HIV I & II", price: 350 },
    { name: "HBsAg", price: 300 },
    { name: "HCV", price: 450 },
    { name: "CRP", price: 450 },
    { name: "ASO", price: 400 },
    { name: "RF Factor", price: 400 },
    { name: "Anti-CCP", price: 1500 },
    { name: "Widal", price: 200 },
    { name: "Typhi Dot", price: 500 },
    { name: "Dengue (IgG, IgM, NS1)", price: 1200 },
    { name: "VDRL", price: 200 },
  ],
  "Coagulation": [
    { name: "PT-INR", price: 350 },
    { name: "APTT", price: 400 },
    { name: "D-Dimer", price: 1500 },
  ],
  "Urine & Microbiology": [
    { name: "Urine Routine", price: 100 },
    { name: "Urine Culture", price: 500 },
    { name: "Pus Culture", price: 800 },
    { name: "Gram Stain", price: 200 },
    { name: "AFB Stain", price: 200 },
    { name: "KOH Mount", price: 150 },
  ],
};

export const ultrasoundServices = [
  {
    category: "General & Abdominal",
    items: [
      { name: "Whole Abdomen Ultrasound", price: 1500 },
      { name: "Abdominal Ultrasound", price: 1500 },
      { name: "Thyroid Ultrasound", price: 800 },
    ],
  },
  {
    category: "Gynecology & Obstetrics",
    items: [
      { name: "Obstetric Ultrasound", price: 1700 },
      { name: "TVS (Transvaginal Sonography)", price: 1700 },
      { name: "TAS Pelvis", price: 1200 },
      { name: "Fetal Wellbeing Scan", price: 1000 },
    ],
  },
  {
    category: "Vascular & Advanced",
    items: [
      { name: "Doppler Study", price: 2000 },
    ],
  },
];
