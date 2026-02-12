
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

  // Traverse/COGO (t2)
  { id: 'c3', topicId: 't2', slug: 'compass-rule', name: 'Compass Rule', summary: 'Distributes closure error proportional to the length of each course. Assumes errors in angles and distances are equal.', formula: 'Correction = -(Total Error * Course Length / Total Perimeter)', isActive: true },
  { id: 'c10', topicId: 't2', slug: 'leoc', name: 'Linear Error of Closure', summary: 'The vector distance between the starting point and the calculated end point of a closed traverse.', formula: 'LEOC = sqrt((ΣLat)² + (ΣDep)²)', isActive: true },
  { id: 'c11', topicId: 't2', slug: 'latitude-departure', name: 'Latitude & Departure', summary: 'Converting polar components (Bearing/Distance) to rectangular components (Northing/Easting).', formula: 'Lat = Dist * cos(Brg); Dep = Dist * sin(Brg)', isActive: true },

  // Error & Adjustments (t3)
  { id: 'c6', topicId: 't3', slug: 'standard-deviation', name: 'Standard Deviation', summary: 'A measure of precision for a set of random observations.', formula: 'σ = sqrt(Σ(v²) / (n-1))', isActive: true },
  { id: 'c12', topicId: 't3', slug: 'error-propagation', name: 'Error Propagation', summary: 'Determining the error in a calculated value based on the errors of its components.', formula: 'E_total = sqrt(e1² + e2² + ... + en²)', isActive: true },
  { id: 'c13', topicId: 't3', slug: 'curvature-refraction', name: 'Curvature & Refraction', summary: 'Correction for the Earth\'s curvature and atmospheric refraction over long sight lines.', formula: 'C+R = 0.0206 * d² (d in thousands of feet)', isActive: true },

  // Boundary Law (t4)
  { id: 'c4', topicId: 't4', slug: 'unwritten-rights', name: 'Unwritten Rights', summary: 'Transfer of title without a written deed through long-term possession or agreement.', formula: 'Requirements: OCEAN (Open, Continuous, Exclusive, Adverse, Notorious)', isActive: true },
  { id: 'c14', topicId: 't4', slug: 'senior-rights', name: 'Senior Rights', summary: 'The principle that the first person to receive title from a common grantor has a superior claim.', formula: 'Senior Deed > Junior Deed', isActive: true },

  // PLSS (t5)
  { id: 'c7', topicId: 't5', slug: 'section-layout', name: 'Section Numbering', summary: 'The grid numbering system for sections within a 36-section township.', formula: 'Start NE (1), snake west to 6, south to 7, east to 12...', isActive: true },
  { id: 'c5', topicId: 't5', slug: 'meander-corners', name: 'Meander Corners', summary: 'Established at the intersection of township or section lines with navigable water bodies.', isActive: true },
  { id: 'c15', topicId: 't5', slug: 'single-proportion', name: 'Single Proportion', summary: 'Method for restoring lost corners on a line where distances in only one direction were originally measured.', formula: 'D_new = D_orig * (Total_new / Total_orig)', isActive: true }
];

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'q1',
    topicId: 't1',
    difficulty: 2,
    type: 'single',
    prompt: 'In a triangle with sides a=10, b=12, and angle A=45°, find angle B using the Law of Sines.',
    explanation: 'Using a/sinA = b/sinB => 10/sin(45) = 12/sinB => sinB = 12 * sin(45) / 10 = 0.8485. B = arcsin(0.8485) ≈ 58.1°.',
    hint: 'Apply the formula a/sinA = b/sinB.',
    source: 'Original',
    conceptIds: ['c1'],
    choices: [
      { id: 'q1c1', choiceKey: 'A', text: '58.1°', isCorrect: true },
      { id: 'q1c2', choiceKey: 'B', text: '45.0°', isCorrect: false },
      { id: 'q1c3', choiceKey: 'C', text: '32.4°', isCorrect: false },
      { id: 'q1c4', choiceKey: 'D', text: '65.2°', isCorrect: false }
    ]
  },
  {
    id: 'q4',
    topicId: 't1',
    difficulty: 3,
    type: 'fill',
    prompt: 'Convert an azimuth of 135° to a bearing format (e.g., S 45 E).',
    explanation: 'In the second quadrant (90-180), Bearing = S (180 - Azimuth) E. So, 180 - 135 = 45. The result is S 45 E.',
    hint: '135 degrees is in the SE quadrant.',
    source: 'Original',
    conceptIds: ['c2'],
    choices: [
      { id: 'q4c1', choiceKey: 'Ans', text: 'S 45 E', isCorrect: true }
    ]
  },
  {
    id: 'q2',
    topicId: 't2',
    difficulty: 3,
    type: 'single',
    prompt: 'What is the primary purpose of the Compass Rule in traverse adjustment?',
    explanation: 'The Compass Rule distributes the error of closure in latitude and departure among the courses in proportion to their lengths.',
    hint: 'Think about proportional error distribution.',
    source: 'Original',
    conceptIds: ['c3'],
    choices: [
      { id: 'q2c1', choiceKey: 'A', text: 'To correct systematic errors in angles.', isCorrect: false },
      { id: 'q2c2', choiceKey: 'B', text: 'To distribute closure error proportional to course length.', isCorrect: true },
      { id: 'q2c3', choiceKey: 'C', text: 'To determine the coordinates of a radial point.', isCorrect: false },
      { id: 'q2c4', choiceKey: 'D', text: 'To calculate the area of the polygon.', isCorrect: false }
    ]
  },
  {
    id: 'q6',
    topicId: 't3',
    difficulty: 4,
    type: 'single',
    prompt: 'If a distance of 1000.00 feet is measured with an estimated error of ±0.05 feet, and the measurement is repeated 4 times, what is the estimated error of the mean?',
    explanation: 'Error of the mean = (Estimated Error) / sqrt(n). So, 0.05 / sqrt(4) = 0.05 / 2 = ±0.025 feet.',
    hint: 'Divide the single observation error by the square root of the number of observations.',
    source: 'Original',
    conceptIds: ['c6'],
    choices: [
      { id: 'q6c1', choiceKey: 'A', text: '±0.025 ft', isCorrect: true },
      { id: 'q6c2', choiceKey: 'B', text: '±0.050 ft', isCorrect: false },
      { id: 'q6c3', choiceKey: 'C', text: '±0.012 ft', isCorrect: false },
      { id: 'q6c4', choiceKey: 'D', text: '±0.100 ft', isCorrect: false }
    ]
  },
  {
    id: 'q3',
    topicId: 't4',
    difficulty: 4,
    type: 'multi',
    prompt: 'Which of the following are typically required for a successful claim of Adverse Possession? (Select all that apply)',
    explanation: 'Adverse possession requires the possession to be open, notorious, exclusive, continuous, and hostile for the statutory period.',
    hint: 'OCEAN is a common mnemonic (Open, Continuous, Exclusive, Adverse/Hostile, Notorious).',
    source: 'Original',
    conceptIds: ['c4'],
    choices: [
      { id: 'q3c1', choiceKey: 'A', text: 'Open and Notorious', isCorrect: true },
      { id: 'q3c2', choiceKey: 'B', text: 'Continuous for the statutory period', isCorrect: true },
      { id: 'q3c3', choiceKey: 'C', text: 'Permission from the legal owner', isCorrect: false },
      { id: 'q3c4', choiceKey: 'D', text: 'Hostile/Adverse intent', isCorrect: true }
    ]
  },
  {
    id: 'q5',
    topicId: 't4',
    difficulty: 3,
    type: 'matching',
    prompt: 'Match the legal term with its corresponding definition.',
    explanation: 'Acquiescence involves long-term acceptance of a line. Estoppel prevents someone from denying a previous statement. Prescription is an unwritten easement right.',
    hint: 'Think about legal bars and unwritten rights.',
    source: 'Original',
    conceptIds: ['c4'],
    choices: [
      { id: 'q5c1', choiceKey: '1', text: 'Estoppel', isCorrect: true, matchingValue: 'Bar to a right' },
      { id: 'q5c2', choiceKey: '2', text: 'Acquiescence', isCorrect: true, matchingValue: 'Consent by silence' },
      { id: 'q5c3', choiceKey: '3', text: 'Prescription', isCorrect: true, matchingValue: 'Easement right' }
    ]
  },
  {
    id: 'q7',
    topicId: 't5',
    difficulty: 2,
    type: 'single',
    prompt: 'In the standard PLSS township numbering system, what section is directly north of Section 7?',
    explanation: 'Section 6 is north of Section 7 (the grid snakes back and forth). Section 7 is in the second row, Section 6 is the last section of the first row.',
    hint: 'Remember the "boustrophedonic" (ox-turning) pattern of section numbering.',
    source: 'Original',
    conceptIds: ['c7'],
    choices: [
      { id: 'q7c1', choiceKey: 'A', text: 'Section 6', isCorrect: true },
      { id: 'q7c2', choiceKey: 'B', text: 'Section 8', isCorrect: false },
      { id: 'q7c3', choiceKey: 'C', text: 'Section 18', isCorrect: false },
      { id: 'q7c4', choiceKey: 'D', text: 'Section 1', isCorrect: false }
    ]
  }
];

export const SEED_RESOURCES: Resource[] = [
  { id: 'r1', title: 'NCEES FS Reference Handbook', category: 'Official', url: 'https://ncees.org', description: 'The primary reference allowed during the exam.' },
  { id: 'r2', title: 'Oregon Board of Examiners (OSBEELS)', category: 'Regulatory', url: 'https://www.oregon.gov/osbeels', description: 'Information on Oregon licensure requirements.' },
  { id: 'r3', title: 'Manual of Surveying Instructions (2009)', category: 'PLSS', url: 'https://www.blm.gov', description: 'The fundamental guide for PLSS surveys.' }
];
