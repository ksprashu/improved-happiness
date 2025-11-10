import { Asana, Pranayama } from '@/types';

// ==================== ASANAS ====================

export const ASANAS: Record<string, Asana> = {
  // ACTIVATION/STRENGTH
  'SURYA-NAMASKAR': {
    id: 'SURYA-NAMASKAR',
    name: 'Sun Salutation',
    sanskritName: 'Surya Namaskar',
    category: 'activation',
    benefits: [
      'Full body warm-up',
      'Cardiovascular conditioning',
      'Spinal mobility',
      'Energy activation'
    ],
    cues: [
      'Flow through 12 positions',
      'Coordinate breath with movement',
      'Inhale on extensions, exhale on folds',
      'Build rhythm over multiple rounds'
    ],
    duration: 60, // per round
  },

  'UTKATASANA': {
    id: 'UTKATASANA',
    name: 'Chair Pose',
    sanskritName: 'Utkatasana',
    category: 'activation',
    benefits: [
      'Quad and glute strength',
      'Core activation',
      'Ankle mobility',
      'Mental focus'
    ],
    cues: [
      'Feet hip-width apart',
      'Sit hips back as if in chair',
      'Arms overhead',
      'Weight in heels',
      'Engage core'
    ],
    duration: 30,
  },

  'VIRABHADRASANA-I': {
    id: 'VIRABHADRASANA-I',
    name: 'Warrior I',
    sanskritName: 'Virabhadrasana I',
    category: 'stability',
    benefits: [
      'Leg strength',
      'Hip flexor stretch',
      'Balance',
      'Chest opening'
    ],
    cues: [
      'Front knee over ankle',
      'Back leg straight',
      'Hips square forward',
      'Arms overhead',
      'Gaze up'
    ],
    duration: 30,
  },

  'VIRABHADRASANA-II': {
    id: 'VIRABHADRASANA-II',
    name: 'Warrior II',
    sanskritName: 'Virabhadrasana II',
    category: 'stability',
    benefits: [
      'Leg endurance',
      'Hip opening',
      'Core stability',
      'Shoulder strength'
    ],
    cues: [
      'Wide stance',
      'Front knee over ankle',
      'Arms parallel to ground',
      'Gaze over front hand',
      'Hips open to side'
    ],
    duration: 30,
  },

  'VIRABHADRASANA-III': {
    id: 'VIRABHADRASANA-III',
    name: 'Warrior III',
    sanskritName: 'Virabhadrasana III',
    category: 'stability',
    benefits: [
      'Balance',
      'Posterior chain strength',
      'Core control',
      'Focus'
    ],
    cues: [
      'Stand on one leg',
      'Hinge forward to horizontal',
      'Back leg lifts parallel to ground',
      'Arms forward or at sides',
      'Body in one line'
    ],
    duration: 20,
  },

  'NAVASANA': {
    id: 'NAVASANA',
    name: 'Boat Pose',
    sanskritName: 'Navasana',
    category: 'activation',
    benefits: [
      'Core strength',
      'Hip flexor activation',
      'Balance',
      'Digestive stimulation'
    ],
    cues: [
      'Sit with knees bent',
      'Lift feet off ground',
      'Straighten legs if possible',
      'Arms forward',
      'Balance on sit bones'
    ],
    duration: 30,
  },

  'SETU-BANDHASANA': {
    id: 'SETU-BANDHASANA',
    name: 'Bridge Pose',
    sanskritName: 'Setu Bandhasana',
    category: 'activation',
    benefits: [
      'Glute activation',
      'Chest opening',
      'Spinal extension',
      'Hip flexor stretch'
    ],
    cues: [
      'Lie on back, knees bent',
      'Lift hips up',
      'Press into feet',
      'Clasp hands under back',
      'Squeeze glutes'
    ],
    duration: 30,
  },

  // MOBILITY/RECOVERY
  'MARJARYASANA-BITILASANA': {
    id: 'MARJARYASANA-BITILASANA',
    name: 'Cat-Cow',
    sanskritName: 'Marjaryasana-Bitilasana',
    category: 'mobility',
    benefits: [
      'Spinal mobility',
      'Core activation',
      'Breath coordination',
      'Shoulder mobility'
    ],
    cues: [
      'Start on hands and knees',
      'Inhale: arch back (cow)',
      'Exhale: round spine (cat)',
      'Move with breath',
      'Full spinal wave'
    ],
    duration: 60,
  },

  'BHUJANGASANA': {
    id: 'BHUJANGASANA',
    name: 'Cobra Pose',
    sanskritName: 'Bhujangasana',
    category: 'mobility',
    benefits: [
      'Spinal extension',
      'Chest opening',
      'Core strength',
      'Hip flexor stretch'
    ],
    cues: [
      'Lie face down',
      'Hands under shoulders',
      'Press to lift chest',
      'Elbows slightly bent',
      'Engage glutes'
    ],
    duration: 30,
  },

  'ADHO-MUKHA-SVANASANA': {
    id: 'ADHO-MUKHA-SVANASANA',
    name: 'Downward Dog',
    sanskritName: 'Adho Mukha Svanasana',
    category: 'mobility',
    benefits: [
      'Hamstring stretch',
      'Shoulder strength',
      'Spinal decompression',
      'Full body lengthening'
    ],
    cues: [
      'Hands and feet on ground',
      'Hips up and back',
      'Form inverted V',
      'Heels toward ground',
      'Press chest toward thighs'
    ],
    duration: 45,
  },

  'BALASANA': {
    id: 'BALASANA',
    name: 'Child\'s Pose',
    sanskritName: 'Balasana',
    category: 'recovery',
    benefits: [
      'Relaxation',
      'Hip stretch',
      'Back release',
      'Stress relief'
    ],
    cues: [
      'Knees wide, sit on heels',
      'Fold forward',
      'Arms extended or at sides',
      'Forehead to ground',
      'Breathe deeply'
    ],
    duration: 60,
  },

  'SAVASANA': {
    id: 'SAVASANA',
    name: 'Corpse Pose',
    sanskritName: 'Savasana',
    category: 'recovery',
    benefits: [
      'Complete relaxation',
      'Nervous system reset',
      'Stress reduction',
      'Integration of practice'
    ],
    cues: [
      'Lie on back',
      'Arms at sides, palms up',
      'Legs relaxed',
      'Close eyes',
      'Release all tension',
      'Focus on breath'
    ],
    duration: 300,
  },

  'PASCHIMOTTANASANA': {
    id: 'PASCHIMOTTANASANA',
    name: 'Seated Forward Fold',
    sanskritName: 'Paschimottanasana',
    category: 'mobility',
    benefits: [
      'Hamstring stretch',
      'Spinal lengthening',
      'Calming',
      'Digestive aid'
    ],
    cues: [
      'Sit with legs extended',
      'Hinge at hips',
      'Fold forward',
      'Reach for feet',
      'Keep spine long'
    ],
    duration: 45,
  },

  'ARDHA-MATSYENDRASANA': {
    id: 'ARDHA-MATSYENDRASANA',
    name: 'Seated Spinal Twist',
    sanskritName: 'Ardha Matsyendrasana',
    category: 'mobility',
    benefits: [
      'Spinal rotation',
      'Digestive stimulation',
      'Hip opening',
      'Shoulder mobility'
    ],
    cues: [
      'Sit with one leg crossed',
      'Twist toward bent knee',
      'Opposite elbow outside knee',
      'Look over shoulder',
      'Lengthen on inhale, twist on exhale'
    ],
    duration: 30,
  }
};

// ==================== PRANAYAMA ====================

export const PRANAYAMA: Record<string, Pranayama> = {
  'BHASTRIKA': {
    id: 'BHASTRIKA',
    name: 'Bellows Breath',
    sanskritName: 'Bhastrika',
    duration: 2,
    benefit: 'Fat oxidation, energy boost, mental clarity',
    instructions: [
      'Sit comfortably with spine straight',
      'Take deep inhale through nose',
      'Exhale forcefully through nose',
      'Repeat rapidly (1 breath per second)',
      'Do 20-30 breaths, then rest',
      'Repeat for 2-3 rounds'
    ],
  },

  'KAPALABHATI': {
    id: 'KAPALABHATI',
    name: 'Skull Shining Breath',
    sanskritName: 'Kapalabhati',
    duration: 1,
    benefit: 'Core activation, digestive fire, mental clarity',
    instructions: [
      'Sit with spine straight',
      'Passive inhale through nose',
      'Forceful exhale using abdominal contraction',
      'Rapid pace (1-2 breaths per second)',
      'Do 30-50 breaths per round',
      'Rest between rounds'
    ],
  },

  'ANULOM-VILOM': {
    id: 'ANULOM-VILOM',
    name: 'Alternate Nostril Breathing',
    sanskritName: 'Anulom Vilom',
    duration: 5,
    benefit: 'Hormonal balance, autonomic balance, stress relief, mental clarity',
    instructions: [
      'Sit comfortably, spine straight',
      'Close right nostril with thumb',
      'Inhale through left nostril (4 counts)',
      'Close both nostrils, hold (4 counts)',
      'Open right nostril, exhale (4 counts)',
      'Inhale through right, switch sides',
      'Continue alternating for 5 minutes'
    ],
  },

  'BHRAMARI': {
    id: 'BHRAMARI',
    name: 'Bee Breath',
    sanskritName: 'Bhramari',
    duration: 2,
    benefit: 'Stress downregulation, anxiety relief, nervous system calming',
    instructions: [
      'Sit comfortably, spine straight',
      'Close eyes',
      'Take deep inhale through nose',
      'Exhale while making humming sound',
      'Feel vibration in head',
      'Repeat 6-8 times'
    ],
  },

  'BOX-BREATHING': {
    id: 'BOX-BREATHING',
    name: 'Box Breathing',
    sanskritName: 'Sama Vritti',
    duration: 5,
    benefit: 'Cortisol modulation, focus, stress management, HRV improvement',
    instructions: [
      'Sit or lie comfortably',
      'Inhale through nose (4 counts)',
      'Hold breath (4 counts)',
      'Exhale through nose (4 counts)',
      'Hold empty (4 counts)',
      'Repeat cycle for 5 minutes'
    ],
  },

  'NADI-SHODHANA': {
    id: 'NADI-SHODHANA',
    name: 'Channel Purification',
    sanskritName: 'Nadi Shodhana',
    duration: 3,
    benefit: 'Energy channel balancing, mental clarity, nervous system reset',
    instructions: [
      'Similar to Anulom Vilom',
      'Close right nostril',
      'Inhale left (4 counts)',
      'Close both, hold (2 counts)',
      'Open right, exhale (4 counts)',
      'Inhale right (4 counts)',
      'Close both, hold (2 counts)',
      'Open left, exhale (4 counts)',
      'Continue for 3 minutes'
    ],
  },

  'UJJAYI': {
    id: 'UJJAYI',
    name: 'Ocean Breath',
    sanskritName: 'Ujjayi',
    duration: 3,
    benefit: 'Focus, breath control, internal heat generation',
    instructions: [
      'Sit or stand comfortably',
      'Inhale through nose',
      'Slightly constrict back of throat',
      'Create ocean sound',
      'Exhale with same constriction',
      'Maintain throughout practice'
    ],
  }
};

// Helper functions
export const getAsanasByCategory = (category: Asana['category']): Asana[] => {
  return Object.values(ASANAS).filter(asana => asana.category === category);
};

export const getPranayamaByDuration = (maxDuration: number): Pranayama[] => {
  return Object.values(PRANAYAMA).filter(p => p.duration <= maxDuration);
};

export const getRecoverySequence = (): Asana[] => {
  return [
    ASANAS['BALASANA'],
    ASANAS['PASCHIMOTTANASANA'],
    ASANAS['ARDHA-MATSYENDRASANA'],
    ASANAS['SAVASANA']
  ];
};

export const getActivationSequence = (): Asana[] => {
  return [
    ASANAS['MARJARYASANA-BITILASANA'],
    ASANAS['SURYA-NAMASKAR'],
    ASANAS['UTKATASANA']
  ];
};
