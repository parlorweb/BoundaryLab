
import { Topic, Concept, Question, Resource } from '../types';

export const SEED_TOPICS: Topic[] = [
  { id: 't1', slug: 'math-trig', name: 'Math & Trig', description: 'Fundamental mathematics, trigonometry, and geometry for surveying.', sortOrder: 1, isActive: true },
  { id: 't2', slug: 'traverse-cogo', name: 'Traverse/COGO', description: 'Coordinate geometry, traverse calculations, and closure.', sortOrder: 2, isActive: true },
  { id: 't3', slug: 'error-adjustments', name: 'Error & Adjustments', description: 'Measurement theory, error propagation, and adjustments.', sortOrder: 3, isActive: true },
  { id: 't4', slug: 'boundary-law', name: 'Boundary Law Basics', description: 'Legal principles, evidence, and property law.', sortOrder: 4, isActive: true },
  { id: 't5', slug: 'plss', name: 'PLSS', description: 'Public Land Survey System layout, numbering, and restoration.', sortOrder: 5, isActive: true }
];

export const SEED_CONCEPTS: Concept[] = [
  // Math & Trig (t1)
  { id: 'c1', topicId: 't1', slug: 'law-of-sines', name: 'Law of Sines', summary: 'Solves triangles when one side and two angles (ASA/AAS) or two sides and an opposite angle (SSA) are known.', formula: 'a/sin(A) = b/sin(B) = c/sin(C)', isActive: true },
  { id: 'c8', topicId: 't1', slug: 'law-of-cosines', name: 'Law of Cosines', summary: 'Solves triangles given two sides and the included angle (SAS) or three sides (SSS).', formula: 'c² = a² + b² - 2ab cos(C)', isActive: true },
  { id: 'c9', topicId: 't1', slug: 'herons-formula', name: 'Heron\'s Formula', summary: 'Calculates the area of a triangle given all three side lengths.', formula: 'Area = sqrt(s(s-a)(s-b)(s-c)) where s=(a+b+c)/2', isActive: true },
  { id: 'c2', topicId: 't1', slug: 'bearing-quadrant', name: 'Bearing Quadrant', summary: 'Converting between 0-360 azimuths and quadrant bearings (NE, SE, SW, NW).', formula: 'Az 0-90: NE; 90-180: S(180-Az)E; 180-270: S(Az-180)W; 270-360: N(360-Az)W', isActive: true },
  { id: 'c16', topicId: 't1', slug: 'triangle-area', name: 'Triangle Area', summary: 'Basic geometric area calculation for triangles.', formula: 'Area = 1/2 * b * h', isActive: true },
  { id: 'c17', topicId: 't1', slug: 'radians-degrees', name: 'Radians & Degrees', summary: 'Conversion between angular measurement systems.', formula: 'Rad = Deg * (π / 180)', isActive: true },

  // Traverse/COGO (t2)
  { id: 'c3', topicId: 't2', slug: 'compass-rule', name: 'Compass Rule', summary: 'Distributes closure error proportional to the length of each course. Assumes errors in angles and distances are equal.', formula: 'Correction = -(Total Error * Course Length / Total Perimeter)', isActive: true },
  { id: 'c10', topicId: 't2', slug: 'leoc', name: 'Linear Error of Closure', summary: 'The vector distance between the starting point and the calculated end point of a closed traverse.', formula: 'LEOC = sqrt((ΣLat)² + (ΣDep)²)', isActive: true },
  { id: 'c11', topicId: 't2', slug: 'latitude-departure', name: 'Latitude & Departure', summary: 'Converting polar components (Bearing/Distance) to rectangular components (Northing/Easting).', formula: 'Lat = Dist * cos(Brg); Dep = Dist * sin(Brg)', isActive: true },
  { id: 'c18', topicId: 't2', slug: 'relative-error', name: 'Relative Error', summary: 'The ratio of linear misclosure to the total perimeter of a traverse.', formula: 'Precision = 1 : (Perimeter / LEOC)', isActive: true },
  { id: 'c19', topicId: 't2', slug: 'azimuth-conversion', name: 'Azimuth Conversion', summary: 'Calculation and logic for switching between North-based and South-based azimuths.', isActive: true },
  { id: 'c20', topicId: 't2', slug: 'closure-error', name: 'Closure Error', summary: 'The total vector of error in a closed traverse.', isActive: true },

  // Error & Adjustments (t3)
  { id: 'c6', topicId: 't3', slug: 'standard-deviation', name: 'Standard Deviation', summary: 'A measure of precision for a set of random observations.', formula: 'σ = sqrt(Σ(v²) / (n-1))', isActive: true },
  { id: 'c12', topicId: 't3', slug: 'error-propagation', name: 'Error Propagation', summary: 'Determining the error in a calculated value based on the errors of its components.', formula: 'E_total = sqrt(e1² + e2² + ... + en²)', isActive: true },
  { id: 'c13', topicId: 't3', slug: 'curvature-refraction', name: 'Curvature & Refraction', summary: 'Correction for the Earth\'s curvature and atmospheric refraction over long sight lines.', formula: 'C+R = 0.0206 * d² (d in thousands of feet)', isActive: true },
  { id: 'c21', topicId: 't3', slug: 'random-systematic-blunders', name: 'Error Types', summary: 'Classification of errors into Random, Systematic, and Blunders.', isActive: true },
  { id: 'c22', topicId: 't3', slug: 'significant-figures', name: 'Significant Figures', summary: 'Rules for precision and rounding in engineering calculations.', isActive: true },

  // Boundary Law (t4)
  { id: 'c4', topicId: 't4', slug: 'unwritten-rights', name: 'Unwritten Rights', summary: 'Transfer of title without a written deed through long-term possession or agreement.', formula: 'Requirements: OCEAN (Open, Continuous, Exclusive, Adverse, Notorious)', isActive: true },
  { id: 'c14', topicId: 't4', slug: 'senior-rights', name: 'Senior Rights', summary: 'The principle that the first person to receive title from a common grantor has a superior claim.', formula: 'Senior Deed > Junior Deed', isActive: true },
  { id: 'c23', topicId: 't4', slug: 'monuments-vs-measurements', name: 'Monuments vs Measurements', summary: 'The legal hierarchy of evidence in boundary retracement.', isActive: true },

  // PLSS (t5)
  { id: 'c7', topicId: 't5', slug: 'section-layout', name: 'Section Numbering', summary: 'The grid numbering system for sections within a 36-section township.', formula: 'Start NE (1), snake west to 6, south to 7, east to 12...', isActive: true },
  { id: 'c5', topicId: 't5', slug: 'meander-corners', name: 'Meander Corners', summary: 'Established at the intersection of township or section lines with navigable water bodies.', isActive: true },
  { id: 'c15', topicId: 't5', slug: 'single-proportion', name: 'Single Proportion', summary: 'Method for restoring lost corners on a line where distances in only one direction were originally measured.', formula: 'D_new = D_orig * (Total_new / Total_orig)', isActive: true },
  { id: 'c24', topicId: 't5', slug: 'aliquot-parts', name: 'Aliquot Parts', summary: 'The fractional subdivision of a section based on halves and quarters.', isActive: true },
  { id: 'c25', topicId: 't5', slug: 'township-range-section', name: 'Township/Range System', summary: 'The primary organizational units of the Public Land Survey System.', isActive: true }
];

export const SEED_QUESTIONS: Question[] = [
  // --- Original FS Foundation Questions ---
  {
    id: 'q1', topicId: 't1', difficulty: 2, type: 'single', prompt: 'In a triangle with sides a=10, b=12, and angle A=45°, find angle B using the Law of Sines.',
    explanation: 'Using a/sinA = b/sinB => 10/sin(45) = 12/sinB => sinB = 12 * sin(45) / 10 = 0.8485. B = arcsin(0.8485) ≈ 58.1°.',
    hint: 'Apply the formula a/sinA = b/sinB.', source: 'BoundaryLab Core', conceptIds: ['c1'],
    choices: [
      { id: 'q1c1', choiceKey: 'A', text: '58.1°', isCorrect: true },
      { id: 'q1c2', choiceKey: 'B', text: '45.0°', isCorrect: false },
      { id: 'q1c3', choiceKey: 'C', text: '32.4°', isCorrect: false },
      { id: 'q1c4', choiceKey: 'D', text: '65.2°', isCorrect: false }
    ]
  },
  {
    id: 'q4', topicId: 't1', difficulty: 3, type: 'fill', prompt: 'Convert an azimuth of 135° to a bearing format (e.g., S 45 E).',
    explanation: 'In the second quadrant (90-180), Bearing = S (180 - Azimuth) E. So, 180 - 135 = 45. The result is S 45 E.',
    hint: '135 degrees is in the SE quadrant.', source: 'BoundaryLab Core', conceptIds: ['c2'],
    choices: [{ id: 'q4c1', choiceKey: 'Ans', text: 'S 45 E', isCorrect: true }]
  },

  // --- UNIQUE SURVEYING QUESTIONS (Set A) ---
  {
    id: 'MATH-001-A', topicId: 't1', difficulty: 2, type: 'single', prompt: 'Area of triangle with base 8 ft and height 5 ft?',
    explanation: 'Area = 1/2 bh = 1/2 * 8 * 5 = 20.', hint: 'Use 1/2 bh.', source: 'Original Set A', conceptIds: ['c16'],
    choices: [
      { id: 'm01ac1', choiceKey: 'A', text: '20', isCorrect: true },
      { id: 'm01ac2', choiceKey: 'B', text: '40', isCorrect: false },
      { id: 'm01ac3', choiceKey: 'C', text: '13', isCorrect: false },
      { id: 'm01ac4', choiceKey: 'D', text: '16', isCorrect: false }
    ]
  },
  {
    id: 'MATH-002-A', topicId: 't1', difficulty: 3, type: 'single', prompt: 'Convert 90° to radians.',
    explanation: 'Radians = degrees * π/180 -> 90 * π/180 = π/2.', hint: 'Multiply by π/180.', source: 'Original Set A', conceptIds: ['c17'],
    choices: [
      { id: 'm02ac1', choiceKey: 'A', text: 'π', isCorrect: false },
      { id: 'm02ac2', choiceKey: 'B', text: 'π/2', isCorrect: true },
      { id: 'm02ac3', choiceKey: 'C', text: 'π/4', isCorrect: false },
      { id: 'm02ac4', choiceKey: 'D', text: '2π', isCorrect: false }
    ]
  },
  {
    id: 'MATH-003-A', topicId: 't1', difficulty: 3, type: 'single', prompt: 'Using Law of Cosines, find c if a=3, b=4, C=90°.',
    explanation: 'c² = a² + b² -> 9+16=25 -> c=5.', hint: 'cos90°=0.', source: 'Original Set A', conceptIds: ['c8'],
    choices: [
      { id: 'm03ac1', choiceKey: 'A', text: '5', isCorrect: true },
      { id: 'm03ac2', choiceKey: 'B', text: '6', isCorrect: false },
      { id: 'm03ac3', choiceKey: 'C', text: '4', isCorrect: false },
      { id: 'm03ac4', choiceKey: 'D', text: '7', isCorrect: false }
    ]
  },
  {
    id: 'TRV-001-A', topicId: 't2', difficulty: 2, type: 'single', prompt: 'Azimuth 135° is in which quadrant?',
    explanation: '135° lies between 90°–180° -> SE quadrant.', hint: 'Check 90–180 range.', source: 'Original Set A', conceptIds: ['c19'],
    choices: [
      { id: 't01ac1', choiceKey: 'A', text: 'NE', isCorrect: false },
      { id: 't01ac2', choiceKey: 'B', text: 'SE', isCorrect: true },
      { id: 't01ac3', choiceKey: 'C', text: 'SW', isCorrect: false },
      { id: 't01ac4', choiceKey: 'D', text: 'NW', isCorrect: false }
    ]
  },
  {
    id: 'TRV-002-A', topicId: 't2', difficulty: 3, type: 'single', prompt: 'ΔN=6 ft, ΔE=8 ft. Linear closure distance?',
    explanation: '√(6²+8²)=√100=10.', hint: 'Use Pythagorean theorem.', source: 'Original Set A', conceptIds: ['c10'],
    choices: [
      { id: 't02ac1', choiceKey: 'A', text: '10', isCorrect: true },
      { id: 't02ac2', choiceKey: 'B', text: '14', isCorrect: false },
      { id: 't02ac3', choiceKey: 'C', text: '2', isCorrect: false },
      { id: 't02ac4', choiceKey: 'D', text: '8', isCorrect: false }
    ]
  },
  {
    id: 'TRV-003-A', topicId: 't2', difficulty: 3, type: 'single', prompt: 'Total length 2000 ft, misclosure 0.5 ft. Relative error?',
    explanation: '2000/0.5 = 4000 -> 1:4000.', hint: 'Divide length by misclosure.', source: 'Original Set A', conceptIds: ['c18'],
    choices: [
      { id: 't03ac1', choiceKey: 'A', text: '1:4000', isCorrect: true },
      { id: 't03ac2', choiceKey: 'B', text: '1:2000', isCorrect: false },
      { id: 't03ac3', choiceKey: 'C', text: '1:1000', isCorrect: false },
      { id: 't03ac4', choiceKey: 'D', text: '1:500', isCorrect: false }
    ]
  },
  {
    id: 'ERR-001-A', topicId: 't3', difficulty: 2, type: 'single', prompt: 'A consistent +0.01 ft bias is what type of error?',
    explanation: 'Predictable bias = systematic error.', hint: 'Repeatable bias.', source: 'Original Set A', conceptIds: ['c21'],
    choices: [
      { id: 'e01ac1', choiceKey: 'A', text: 'Random', isCorrect: false },
      { id: 'e01ac2', choiceKey: 'B', text: 'Systematic', isCorrect: true },
      { id: 'e01ac3', choiceKey: 'C', text: 'Blunder', isCorrect: false },
      { id: 'e01ac4', choiceKey: 'D', text: 'Gross', isCorrect: false }
    ]
  },
  {
    id: 'LAW-003-A', topicId: 't4', difficulty: 3, type: 'multi', prompt: 'Which of the following are required for Adverse Possession (OCEAN)? Select two.',
    explanation: 'OCEAN: Open, Continuous, Exclusive, Adverse, Notorious.', hint: 'Think of the acronym.', source: 'Original Set A', conceptIds: ['c4'],
    choices: [
      { id: 'l03ac1', choiceKey: 'A', text: 'Open & Notorious', isCorrect: true },
      { id: 'l03ac2', choiceKey: 'B', text: 'Occasional', isCorrect: false },
      { id: 'l03ac3', choiceKey: 'C', text: 'Continuous', isCorrect: true },
      { id: 'l03ac4', choiceKey: 'D', text: 'Hidden', isCorrect: false }
    ]
  },
  {
    id: 'PLSS-005-A', topicId: 't5', difficulty: 3, type: 'single', prompt: 'Which section is in the Northwest corner of a township?',
    explanation: 'Numbering goes 1-6 (East to West), then 7-12 (West to East). Section 6 is the NW corner.', hint: 'Starts NE (1), goes West.', source: 'Original Set A', conceptIds: ['c7'],
    choices: [
      { id: 'p05ac1', choiceKey: 'A', text: 'Section 6', isCorrect: true },
      { id: 'p05ac2', choiceKey: 'B', text: 'Section 1', isCorrect: false },
      { id: 'p05ac3', choiceKey: 'C', text: 'Section 31', isCorrect: false },
      { id: 'p05ac4', choiceKey: 'D', text: 'Section 36', isCorrect: false }
    ]
  },

  // --- NEW IMPORTED BATCH (25 UNIQUE QUESTIONS FROM CHAT) ---
  {
    id: 'MATH-001', topicId: 't1', difficulty: 2, type: 'single', prompt: 'What is the area of a triangle with base 10 ft and height 6 ft?',
    explanation: 'The area of a triangle is calculated using A = 1/2 × base × height. Substituting the given values: 1/2 × 10 ft × 6 ft = 30 sq ft.', hint: 'Use 1/2 bh.', source: 'Imported Batch', conceptIds: ['c16'],
    choices: [
      { id: 'm01c1', choiceKey: 'A', text: '30 sq ft', isCorrect: true },
      { id: 'm01c2', choiceKey: 'B', text: '60 sq ft', isCorrect: false },
      { id: 'm01c3', choiceKey: 'C', text: '16 sq ft', isCorrect: false },
      { id: 'm01c4', choiceKey: 'D', text: '40 sq ft', isCorrect: false }
    ]
  },
  {
    id: 'MATH-002', topicId: 't1', difficulty: 3, type: 'single', prompt: 'Convert 120 degrees to radians.',
    explanation: 'Radians = degrees × π/180. 120 × π/180 = 2π/3.', hint: 'Multiply by π/180.', source: 'Imported Batch', conceptIds: ['c17'],
    choices: [
      { id: 'm02c1', choiceKey: 'A', text: '2π/3', isCorrect: true },
      { id: 'm02c2', choiceKey: 'B', text: 'π/3', isCorrect: false },
      { id: 'm02c3', choiceKey: 'C', text: '3π/2', isCorrect: false },
      { id: 'm02c4', choiceKey: 'D', text: 'π/2', isCorrect: false }
    ]
  },
  {
    id: 'MATH-003', topicId: 't1', difficulty: 3, type: 'single', prompt: 'Using Law of Sines, if angle A = 30° and side a = 50 ft, what is a/sin(A)?',
    explanation: 'a/sin(A) = 50/sin30°. Since sin30° = 0.5, result = 100.', hint: 'Recall sin30° = 0.5.', source: 'Imported Batch', conceptIds: ['c1'],
    choices: [
      { id: 'm03c1', choiceKey: 'A', text: '100', isCorrect: true },
      { id: 'm03c2', choiceKey: 'B', text: '25', isCorrect: false },
      { id: 'm03c3', choiceKey: 'C', text: '75', isCorrect: false },
      { id: 'm03c4', choiceKey: 'D', text: '50', isCorrect: false }
    ]
  },
  {
    id: 'MATH-004', topicId: 't1', difficulty: 3, type: 'single', prompt: 'Using Law of Cosines, what is side c if a=9 ft, b=12 ft, and the included angle is 90°?',
    explanation: 'c² = a² + b² − 2ab cos(90°). Since cos90°=0, c²=81+144=225, so c=15 ft.', hint: 'cos(90°) equals zero.', source: 'Imported Batch', conceptIds: ['c8'],
    choices: [
      { id: 'm04c1', choiceKey: 'A', text: '15 ft', isCorrect: true },
      { id: 'm04c2', choiceKey: 'B', text: '21 ft', isCorrect: false },
      { id: 'm04c3', choiceKey: 'C', text: '10 ft', isCorrect: false },
      { id: 'm04c4', choiceKey: 'D', text: '18 ft', isCorrect: false }
    ]
  },
  {
    id: 'MATH-005', topicId: 't1', difficulty: 2, type: 'single', prompt: 'Convert 3 miles to feet.',
    explanation: '1 mile equals 5,280 ft. Multiply 3 × 5,280 = 15,840 ft.', hint: 'Recall 1 mile = 5,280 ft.', source: 'Imported Batch', conceptIds: ['c17'],
    choices: [
      { id: 'm05c1', choiceKey: 'A', text: '15,840 ft', isCorrect: true },
      { id: 'm05c2', choiceKey: 'B', text: '5,280 ft', isCorrect: false },
      { id: 'm05c3', choiceKey: 'C', text: '1,760 ft', isCorrect: false },
      { id: 'm05c4', choiceKey: 'D', text: '52,800 ft', isCorrect: false }
    ]
  },
  {
    id: 'MATH-006', topicId: 't1', difficulty: 3, type: 'single', prompt: 'What is the value of sin(60°)?',
    explanation: 'sin(60°) equals √3/2, approximately 0.866.', hint: 'Recall common special angles.', source: 'Imported Batch', conceptIds: ['c17'],
    choices: [
      { id: 'm06c1', choiceKey: 'A', text: '0.500', isCorrect: false },
      { id: 'm06c2', choiceKey: 'B', text: '0.866', isCorrect: true },
      { id: 'm06c3', choiceKey: 'C', text: '1.000', isCorrect: false },
      { id: 'm06c4', choiceKey: 'D', text: '0.707', isCorrect: false }
    ]
  },
  {
    id: 'TRV-001', topicId: 't2', difficulty: 2, type: 'single', prompt: 'An azimuth of 210° lies in which quadrant?',
    explanation: 'Azimuths between 180° and 270° fall in the SW quadrant.', hint: 'Locate the 180–270 range.', source: 'Imported Batch', conceptIds: ['c19'],
    choices: [
      { id: 't01c1', choiceKey: 'A', text: 'NE', isCorrect: false },
      { id: 't01c2', choiceKey: 'B', text: 'SE', isCorrect: false },
      { id: 't01c3', choiceKey: 'C', text: 'SW', isCorrect: true },
      { id: 't01c4', choiceKey: 'D', text: 'NW', isCorrect: false }
    ]
  },
  {
    id: 'TRV-002', topicId: 't2', difficulty: 3, type: 'single', prompt: 'If ΔN = 3 ft and ΔE = 4 ft, what is the linear closure?',
    explanation: 'Closure = √(3² + 4²) = √25 = 5 ft.', hint: 'Use Pythagorean theorem.', source: 'Imported Batch', conceptIds: ['c10'],
    choices: [
      { id: 't02c1', choiceKey: 'A', text: '5 ft', isCorrect: true },
      { id: 't02c2', choiceKey: 'B', text: '7 ft', isCorrect: false },
      { id: 't02c3', choiceKey: 'C', text: '1 ft', isCorrect: false },
      { id: 't02c4', choiceKey: 'D', text: '4 ft', isCorrect: false }
    ]
  },
  {
    id: 'TRV-003', topicId: 't2', difficulty: 3, type: 'single', prompt: 'Total traverse length is 2500 ft and misclosure is 0.5 ft. What is the relative error?',
    explanation: 'Relative error = 2500 / 0.5 = 5000, or 1:5000.', hint: 'Divide total length by misclosure.', source: 'Imported Batch', conceptIds: ['c18'],
    choices: [
      { id: 't03c1', choiceKey: 'A', text: '1:500', isCorrect: false },
      { id: 't03c2', choiceKey: 'B', text: '1:2500', isCorrect: false },
      { id: 't03c3', choiceKey: 'C', text: '1:5000', isCorrect: true },
      { id: 't03c4', choiceKey: 'D', text: '1:1250', isCorrect: false }
    ]
  },
  {
    id: 'TRV-004', topicId: 't2', difficulty: 3, type: 'single', prompt: 'A line has bearing N30E and length 100 ft. What is its latitude component?',
    explanation: 'Latitude = D cosθ = 100 cos30° ≈ 86.6 ft.', hint: 'Use D × cos(θ).', source: 'Imported Batch', conceptIds: ['c11'],
    choices: [
      { id: 't04c1', choiceKey: 'A', text: '86.6 ft', isCorrect: true },
      { id: 't04c2', choiceKey: 'B', text: '50 ft', isCorrect: false },
      { id: 't04c3', choiceKey: 'C', text: '100 ft', isCorrect: false },
      { id: 't04c4', choiceKey: 'D', text: '70 ft', isCorrect: false }
    ]
  },
  {
    id: 'TRV-005', topicId: 't2', difficulty: 3, type: 'single', prompt: 'A line has bearing N30E and length 100 ft. What is its departure component?',
    explanation: 'Departure = D sinθ = 100 sin30° = 50 ft.', hint: 'Use D × sin(θ).', source: 'Imported Batch', conceptIds: ['c11'],
    choices: [
      { id: 't05c1', choiceKey: 'A', text: '50 ft', isCorrect: true },
      { id: 't05c2', choiceKey: 'B', text: '86.6 ft', isCorrect: false },
      { id: 't05c3', choiceKey: 'C', text: '70 ft', isCorrect: false },
      { id: 't05c4', choiceKey: 'D', text: '30 ft', isCorrect: false }
    ]
  },
  {
    id: 'TRV-006', topicId: 't2', difficulty: 4, type: 'single', prompt: 'If a traverse misclosure is distributed using the Compass Rule, what is adjusted proportionally?',
    explanation: 'Compass Rule distributes closure proportionally to each line\'s length in both latitude and departure.', hint: 'Think proportional to line length.', source: 'Imported Batch', conceptIds: ['c3'],
    choices: [
      { id: 't06c1', choiceKey: 'A', text: 'Only latitudes', isCorrect: false },
      { id: 't06c2', choiceKey: 'B', text: 'Only departures', isCorrect: false },
      { id: 't06c3', choiceKey: 'C', text: 'Latitudes and departures based on line length', isCorrect: true },
      { id: 't06c4', choiceKey: 'D', text: 'Interior angles only', isCorrect: false }
    ]
  },
  {
    id: 'TRV-007', topicId: 't2', difficulty: 3, type: 'single', prompt: 'Convert the bearing S45W to azimuth.',
    explanation: 'S45W lies in the SW quadrant: 180° + 45° = 225°.', hint: 'Add 180° for SW quadrant.', source: 'Imported Batch', conceptIds: ['c2'],
    choices: [
      { id: 't07c1', choiceKey: 'A', text: '225°', isCorrect: true },
      { id: 't07c2', choiceKey: 'B', text: '135°', isCorrect: false },
      { id: 't07c3', choiceKey: 'C', text: '315°', isCorrect: false },
      { id: 't07c4', choiceKey: 'D', text: '45°', isCorrect: false }
    ]
  },
  {
    id: 'TRV-008', topicId: 't2', difficulty: 4, type: 'single', prompt: 'If a line has latitude +50 ft and departure −50 ft, what quadrant is it in?',
    explanation: 'Positive latitude is north; negative departure is west. Therefore NW quadrant.', hint: 'Check sign of each component.', source: 'Imported Batch', conceptIds: ['c2'],
    choices: [
      { id: 't08c1', choiceKey: 'A', text: 'NE', isCorrect: false },
      { id: 't08c2', choiceKey: 'B', text: 'NW', isCorrect: true },
      { id: 't08c3', choiceKey: 'C', text: 'SE', isCorrect: false },
      { id: 't08c4', choiceKey: 'D', text: 'SW', isCorrect: false }
    ]
  },
  {
    id: 'ERR-001', topicId: 't3', difficulty: 2, type: 'single', prompt: 'Which error type results from instrument miscalibration?',
    explanation: 'Systematic errors follow predictable patterns due to known causes.', hint: 'Think predictable bias.', source: 'Imported Batch', conceptIds: ['c21'],
    choices: [
      { id: 'e01c1', choiceKey: 'A', text: 'Random error', isCorrect: false },
      { id: 'e01c2', choiceKey: 'B', text: 'Systematic error', isCorrect: true },
      { id: 'e01c3', choiceKey: 'C', text: 'Blunder', isCorrect: false },
      { id: 'e01c4', choiceKey: 'D', text: 'Personal error', isCorrect: false }
    ]
  },
  {
    id: 'ERR-002', topicId: 't3', difficulty: 3, type: 'single', prompt: 'A level loop with 1 mile total length has allowable misclosure of approximately how much (using 0.02√miles)?',
    explanation: 'Tolerance ≈ 0.02√1 = 0.02 ft.', hint: 'Apply 0.02 × √distance.', source: 'Imported Batch', conceptIds: ['c13'],
    choices: [
      { id: 'e02c1', choiceKey: 'A', text: '0.02 ft', isCorrect: true },
      { id: 'e02c2', choiceKey: 'B', text: '0.20 ft', isCorrect: false },
      { id: 'e02c3', choiceKey: 'C', text: '0.002 ft', isCorrect: false },
      { id: 'e02c4', choiceKey: 'D', text: '2 ft', isCorrect: false }
    ]
  },
  {
    id: 'ERR-003', topicId: 't3', difficulty: 3, type: 'single', prompt: 'Rounding 12.347 to three significant figures results in:',
    explanation: 'Three significant figures keeps 1,2,3. The next digit is 4, so no rounding up.', hint: 'Count non-zero digits.', source: 'Imported Batch', conceptIds: ['c22'],
    choices: [
      { id: 'e03c1', choiceKey: 'A', text: '12.3', isCorrect: true },
      { id: 'e03c2', choiceKey: 'B', text: '12.35', isCorrect: false },
      { id: 'e03c3', choiceKey: 'C', text: '12.34', isCorrect: false },
      { id: 'e03c4', choiceKey: 'D', text: '12.300', isCorrect: false }
    ]
  },
  {
    id: 'ERR-004', topicId: 't3', difficulty: 4, type: 'single', prompt: 'An EDM measurement repeatedly shows a +0.02 ft bias over 100 ft. This indicates:',
    explanation: 'Consistent measurable bias indicates systematic error due to calibration.', hint: 'Look for repeated consistent bias.', source: 'Imported Batch', conceptIds: ['c21'],
    choices: [
      { id: 'e04c1', choiceKey: 'A', text: 'Random error', isCorrect: false },
      { id: 'e04c2', choiceKey: 'B', text: 'Systematic error', isCorrect: true },
      { id: 'e04c3', choiceKey: 'C', text: 'Blunder', isCorrect: false },
      { id: 'e04c4', choiceKey: 'D', text: 'Personal error', isCorrect: false }
    ]
  },
  {
    id: 'LAW-001', topicId: 't4', difficulty: 2, type: 'single', prompt: 'If monuments conflict with record distances, which generally controls?',
    explanation: 'Original monuments typically have higher priority than measurements.', hint: 'Physical evidence controls.', source: 'Imported Batch', conceptIds: ['c23'],
    choices: [
      { id: 'l01c1', choiceKey: 'A', text: 'Area', isCorrect: false },
      { id: 'l01c2', choiceKey: 'B', text: 'Monuments', isCorrect: true },
      { id: 'l01c3', choiceKey: 'C', text: 'Bearings', isCorrect: false },
      { id: 'l01c4', choiceKey: 'D', text: 'Distances', isCorrect: false }
    ]
  },
  {
    id: 'LAW-002', topicId: 't4', difficulty: 3, type: 'single', prompt: 'In sequential conveyances, who has senior rights?',
    explanation: 'In sequential conveyances, priority follows time—first in time is senior.', hint: 'Think chronological priority.', source: 'Imported Batch', conceptIds: ['c14'],
    choices: [
      { id: 'l02c1', choiceKey: 'A', text: 'Most recent grantee', isCorrect: false },
      { id: 'l02c2', choiceKey: 'B', text: 'Original grantor', isCorrect: false },
      { id: 'l02c3', choiceKey: 'C', text: 'First grantee in time', isCorrect: true },
      { id: 'l02c4', choiceKey: 'D', text: 'All equally', isCorrect: false }
    ]
  },
  {
    id: 'LAW-003', topicId: 't4', difficulty: 3, type: 'single', prompt: 'Evidence from long-term occupation that conflicts with a record description relates to which concept?',
    explanation: 'Occupation evidence may clarify or conflict with record description.', hint: 'Think physical use vs written record.', source: 'Imported Batch', conceptIds: ['c23'],
    choices: [
      { id: 'l03c1', choiceKey: 'A', text: 'Parol evidence', isCorrect: false },
      { id: 'l03c2', choiceKey: 'B', text: 'Record vs occupation', isCorrect: true },
      { id: 'l03c3', choiceKey: 'C', text: 'Junior rights', isCorrect: false },
      { id: 'l03c4', choiceKey: 'D', text: 'Aliquot parts', isCorrect: false }
    ]
  },
  {
    id: 'PLSS-001', topicId: 't5', difficulty: 2, type: 'single', prompt: 'How many acres are in a quarter section?',
    explanation: 'A quarter of 640 acres equals 160 acres.', hint: 'Divide 640 by 4.', source: 'Imported Batch', conceptIds: ['c24'],
    choices: [
      { id: 'p01c1', choiceKey: 'A', text: '160', isCorrect: true },
      { id: 'p01c2', choiceKey: 'B', text: '80', isCorrect: false },
      { id: 'p01c3', choiceKey: 'C', text: '320', isCorrect: false },
      { id: 'p01c4', choiceKey: 'D', text: '640', isCorrect: false }
    ]
  },
  {
    id: 'PLSS-002', topicId: 't5', difficulty: 3, type: 'single', prompt: 'A quarter-quarter section contains how many acres?',
    explanation: '640 ÷ 16 = 40 acres.', hint: 'Divide 640 by 16.', source: 'Imported Batch', conceptIds: ['c24'],
    choices: [
      { id: 'p02c1', choiceKey: 'A', text: '40 acres', isCorrect: true },
      { id: 'p02c2', choiceKey: 'B', text: '80 acres', isCorrect: false },
      { id: 'p02c3', choiceKey: 'C', text: '160 acres', isCorrect: false },
      { id: 'p02c4', choiceKey: 'D', text: '20 acres', isCorrect: false }
    ]
  },
  {
    id: 'PLSS-003', topicId: 't5', difficulty: 3, type: 'single', prompt: 'When restoring a lost interior section corner, which method is typically used?',
    explanation: 'Interior corners are restored using double proportionate measurement.', hint: 'Interior vs exterior corner rule.', source: 'Imported Batch', conceptIds: ['c15'],
    choices: [
      { id: 'p03c1', choiceKey: 'A', text: 'Single proportionate measurement', isCorrect: false },
      { id: 'p03c2', choiceKey: 'B', text: 'Double proportionate measurement', isCorrect: true },
      { id: 'p03c3', choiceKey: 'C', text: 'Bearing intersection', isCorrect: false },
      { id: 'p03c4', choiceKey: 'D', text: 'Record distance only', isCorrect: false }
    ]
  },
  {
    id: 'PLSS-004', topicId: 't5', difficulty: 4, type: 'multi', prompt: 'Which statements about township lines are true? Select all that apply.',
    explanation: 'Township lines run east-west and are spaced 6 miles apart.', hint: 'Township vs range orientation.', source: 'Imported Batch', conceptIds: ['c25'],
    choices: [
      { id: 'p04c1', choiceKey: 'A', text: 'They run east-west', isCorrect: true },
      { id: 'p04c2', choiceKey: 'B', text: 'They run north-south', isCorrect: false },
      { id: 'p04c3', choiceKey: 'C', text: 'They are spaced 6 miles apart', isCorrect: true },
      { id: 'p04c4', choiceKey: 'D', text: 'They define range lines', isCorrect: false }
    ]
  }
];

export const SEED_RESOURCES: Resource[] = [
  { id: 'r1', title: 'NCEES FS Reference Handbook', category: 'Official', url: 'https://ncees.org', description: 'The primary reference allowed during the exam.' },
  { id: 'r2', title: 'Oregon Board of Examiners (OSBEELS)', category: 'Regulatory', url: 'https://www.oregon.gov/osbeels', description: 'Information on Oregon licensure requirements.' },
  { id: 'r3', title: 'Manual of Surveying Instructions (2009)', category: 'PLSS', url: 'https://www.blm.gov', description: 'The fundamental guide for PLSS surveys.' }
];
