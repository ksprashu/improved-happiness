import { Exercise } from '@/types';

export const EXERCISES: Record<string, Exercise> = {
  // ==================== GADA (MACE) EXERCISES ====================
  'GADA-360': {
    id: 'GADA-360',
    name: 'Gada 360° Swing',
    tool: 'gada',
    pattern: 'rotate',
    primary: ['lats', 'glutes', 'obliques', 'forearms'],
    secondary: ['shoulders', 'core'],
    cues: [
      'Start with feet shoulder-width apart',
      'Hinge at hips, keep ribs down',
      'Swing mace in full circle around head',
      'Drive from hips, not arms',
      'Maintain tight core throughout'
    ],
    breathingPattern: 'Inhale on upswing, exhale powerfully on downswing',
    regressions: ['GADA-HALO-PAUSE'],
    progressions: ['GADA-10TO2'],
    contraindications: ['Acute shoulder pain', 'Rotator cuff injury'],
    loadGuidance: {
      beginner: { min: 4, max: 6, unit: 'kg' },
      intermediate: { min: 6, max: 8, unit: 'kg' },
      advanced: { min: 8, max: 12, unit: 'kg' }
    },
    description: 'Traditional full circular swing that builds posterior chain power and rotational strength',
    impact: 'high'
  },

  'GADA-10TO2': {
    id: 'GADA-10TO2',
    name: 'Gada 10-to-2 Pendulum',
    tool: 'gada',
    pattern: 'hinge',
    primary: ['lats', 'glutes', 'lower_back'],
    secondary: ['hamstrings', 'forearms'],
    cues: [
      'Powerful hinge pattern from 10 o\'clock to 2 o\'clock',
      'Keep spine neutral',
      'Drive from hips',
      'Control the eccentric',
      'Ribs stay down'
    ],
    breathingPattern: 'Exhale on the drive, inhale on the return',
    regressions: ['GADA-360'],
    loadGuidance: {
      beginner: { min: 4, max: 6, unit: 'kg' },
      intermediate: { min: 6, max: 8, unit: 'kg' },
      advanced: { min: 8, max: 12, unit: 'kg' }
    },
    description: 'Pendulum swing emphasizing posterior chain and hip drive',
    impact: 'high'
  },

  'GADA-FRONT-SWING': {
    id: 'GADA-FRONT-SWING',
    name: 'Gada Front Swing',
    tool: 'gada',
    pattern: 'anti_extension',
    primary: ['core', 'shoulders'],
    secondary: ['chest', 'lats'],
    cues: [
      'Chest-level front arc',
      'Brace core to prevent rib flare',
      'Controlled movement',
      'Keep shoulders packed'
    ],
    breathingPattern: 'Exhale on extension, inhale on return',
    contraindications: ['Lower back pain'],
    loadGuidance: {
      beginner: { min: 4, max: 5, unit: 'kg' },
      intermediate: { min: 5, max: 7, unit: 'kg' },
      advanced: { min: 7, max: 10, unit: 'kg' }
    },
    description: 'Anti-extension core control with front arc movement',
    impact: 'moderate'
  },

  'GADA-HALO-PAUSE': {
    id: 'GADA-HALO-PAUSE',
    name: 'Gada Halo with Pause',
    tool: 'gada',
    pattern: 'mobility',
    primary: ['shoulders', 'rotator_cuff'],
    secondary: ['core', 'obliques'],
    cues: [
      'Slow halo around head',
      'Pause 2 seconds at lateral extension',
      'Isometric hold builds strength',
      'Keep neck neutral'
    ],
    breathingPattern: 'Continuous nasal breathing',
    loadGuidance: {
      beginner: { min: 3, max: 4, unit: 'kg' },
      intermediate: { min: 4, max: 6, unit: 'kg' },
      advanced: { min: 6, max: 8, unit: 'kg' }
    },
    description: 'Shoulder mobility and stability drill with isometric pauses',
    impact: 'low'
  },

  // ==================== MUDGAR (INDIAN CLUBS) ====================
  'MUD-MILL-SINGLE': {
    id: 'MUD-MILL-SINGLE',
    name: 'Mudgar Mill (Single Arm)',
    tool: 'mudgar',
    pattern: 'rotate',
    primary: ['obliques', 'forearms', 'rotator_cuff'],
    secondary: ['shoulders', 'lats'],
    cues: [
      'Classic parikrama path',
      'Elbow tracks close to body',
      'Smooth tempo',
      'Equal work both sides'
    ],
    breathingPattern: 'Rhythmic nasal breathing, exhale on downswing',
    loadGuidance: {
      beginner: { min: 3, max: 4, unit: 'kg' },
      intermediate: { min: 4, max: 6, unit: 'kg' },
      advanced: { min: 6, max: 8, unit: 'kg' }
    },
    description: 'Traditional one-arm mill building rotational control and shoulder health',
    impact: 'moderate'
  },

  'MUD-FRONT-SWING-SINGLE': {
    id: 'MUD-FRONT-SWING-SINGLE',
    name: 'Mudgar Front Swing (Single)',
    tool: 'mudgar',
    pattern: 'anti_rotation',
    primary: ['core', 'shoulders'],
    secondary: ['obliques'],
    cues: [
      'One-arm front swing',
      'Brace to resist rotation',
      'Keep hips square',
      'Controlled arc'
    ],
    breathingPattern: 'Exhale on swing out, inhale on return',
    loadGuidance: {
      beginner: { min: 3, max: 4, unit: 'kg' },
      intermediate: { min: 4, max: 5, unit: 'kg' },
      advanced: { min: 5, max: 7, unit: 'kg' }
    },
    description: 'Anti-rotation challenge with unilateral loading',
    impact: 'moderate'
  },

  'MUD-HALO-SINGLE': {
    id: 'MUD-HALO-SINGLE',
    name: 'Mudgar Halo (Single)',
    tool: 'mudgar',
    pattern: 'mobility',
    primary: ['shoulders', 'rotator_cuff'],
    cues: [
      'Small arc for shoulder hygiene',
      'Smooth continuous movement',
      'Both directions'
    ],
    breathingPattern: 'Continuous nasal breathing',
    loadGuidance: {
      beginner: { min: 2, max: 3, unit: 'kg' },
      intermediate: { min: 3, max: 4, unit: 'kg' },
      advanced: { min: 4, max: 5, unit: 'kg' }
    },
    description: 'Shoulder mobility and health maintenance',
    impact: 'low'
  },

  'MUD-PENDULUM-SINGLE': {
    id: 'MUD-PENDULUM-SINGLE',
    name: 'Mudgar Pendulum (Single)',
    tool: 'mudgar',
    pattern: 'rotate',
    primary: ['obliques', 'core'],
    secondary: ['shoulders'],
    cues: [
      'Side pendulum movement',
      'Hip-oblique linkage',
      'Controlled tempo'
    ],
    breathingPattern: 'Exhale on swing, inhale on return',
    loadGuidance: {
      beginner: { min: 3, max: 4, unit: 'kg' },
      intermediate: { min: 4, max: 5, unit: 'kg' },
      advanced: { min: 5, max: 6, unit: 'kg' }
    },
    description: 'Lateral oblique strengthening with pendulum pattern',
    impact: 'moderate'
  },

  'MUD-MILL-TWOHAND': {
    id: 'MUD-MILL-TWOHAND',
    name: 'Mudgar Mill (Two-Hand)',
    tool: 'mudgar',
    pattern: 'rotate',
    primary: ['lats', 'shoulders', 'core'],
    cues: [
      'Two-hand grip on single club',
      'Parikrama path around head',
      'Even pressure both hands',
      'Great for learning the movement pattern'
    ],
    breathingPattern: 'Exhale on downswing',
    loadGuidance: {
      beginner: { min: 4, max: 5, unit: 'kg' },
      intermediate: { min: 5, max: 6, unit: 'kg' },
      advanced: { min: 6, max: 8, unit: 'kg' }
    },
    description: 'Two-handed mill for stability and learning proper path',
    impact: 'moderate'
  },

  'MUD-FRONT-PRESS-TWOHAND': {
    id: 'MUD-FRONT-PRESS-TWOHAND',
    name: 'Mudgar Front Press (Two-Hand)',
    tool: 'mudgar',
    pattern: 'anti_extension',
    primary: ['core', 'chest'],
    secondary: ['shoulders', 'triceps'],
    cues: [
      'Two-hand horizontal press out',
      'Brace to prevent extension',
      'Controlled return'
    ],
    breathingPattern: 'Exhale on press, inhale on return',
    loadGuidance: {
      beginner: { min: 4, max: 5, unit: 'kg' },
      intermediate: { min: 5, max: 6, unit: 'kg' },
      advanced: { min: 6, max: 8, unit: 'kg' }
    },
    description: 'Anti-extension press for core stability',
    impact: 'moderate'
  },

  'MUD-HALO-TWOHAND': {
    id: 'MUD-HALO-TWOHAND',
    name: 'Mudgar Halo (Two-Hand)',
    tool: 'mudgar',
    pattern: 'mobility',
    primary: ['shoulders'],
    secondary: ['core'],
    cues: [
      'Two-hand halo around head',
      'Pause 2 seconds at lateral extension',
      'Smooth movement'
    ],
    breathingPattern: 'Continuous breathing, pause on hold',
    loadGuidance: {
      beginner: { min: 4, max: 5, unit: 'kg' },
      intermediate: { min: 5, max: 6, unit: 'kg' },
      advanced: { min: 6, max: 8, unit: 'kg' }
    },
    description: 'Shoulder mobility with two-handed stability',
    impact: 'low'
  },

  // ==================== BODYWEIGHT ====================
  'BW-BAITHAK': {
    id: 'BW-BAITHAK',
    name: 'Baithak (Hindu Squat)',
    tool: 'bodyweight',
    pattern: 'squat',
    primary: ['quads', 'glutes'],
    secondary: ['calves', 'core'],
    cues: [
      'Heels can lift or stay flat',
      'Arm swing for momentum',
      'Full range of motion',
      'Rhythmic cadence'
    ],
    breathingPattern: 'Inhale down, exhale up',
    loadGuidance: {
      beginner: { min: 10, max: 20, unit: 'reps' },
      intermediate: { min: 20, max: 50, unit: 'reps' },
      advanced: { min: 50, max: 100, unit: 'reps' }
    },
    description: 'Traditional Hindu squat for leg endurance and mobility',
    impact: 'moderate'
  },

  'BW-DAND': {
    id: 'BW-DAND',
    name: 'Dand (Indian Push-up)',
    tool: 'bodyweight',
    pattern: 'push',
    primary: ['chest', 'triceps', 'lats'],
    secondary: ['shoulders', 'core'],
    cues: [
      'Spinal wave movement',
      'Elbows 45 degrees',
      'Full body integration',
      'Smooth transition'
    ],
    breathingPattern: 'Inhale down, exhale up',
    loadGuidance: {
      beginner: { min: 5, max: 10, unit: 'reps' },
      intermediate: { min: 10, max: 20, unit: 'reps' },
      advanced: { min: 20, max: 50, unit: 'reps' }
    },
    description: 'Flowing push-up with spinal mobility component',
    impact: 'moderate'
  },

  'BW-PUSHUP': {
    id: 'BW-PUSHUP',
    name: 'Push-up',
    tool: 'bodyweight',
    pattern: 'push',
    primary: ['chest', 'triceps'],
    secondary: ['shoulders', 'core'],
    cues: [
      'Hands shoulder-width',
      'Body in straight line',
      'Elbows 45 degrees',
      'Full range of motion'
    ],
    breathingPattern: 'Inhale down, exhale up',
    loadGuidance: {
      beginner: { min: 5, max: 10, unit: 'reps' },
      intermediate: { min: 10, max: 20, unit: 'reps' },
      advanced: { min: 20, max: 40, unit: 'reps' }
    },
    description: 'Classic push-up for upper body strength',
    impact: 'moderate'
  },

  'BW-PLANK': {
    id: 'BW-PLANK',
    name: 'Plank Hold',
    tool: 'bodyweight',
    pattern: 'anti_extension',
    primary: ['core', 'shoulders'],
    secondary: ['glutes', 'quads'],
    cues: [
      'Forearms on ground',
      'Body in straight line',
      'Squeeze glutes',
      'Brace core, no sagging'
    ],
    breathingPattern: 'Continuous nasal breathing',
    loadGuidance: {
      beginner: { min: 20, max: 30, unit: 'reps' },
      intermediate: { min: 30, max: 60, unit: 'reps' },
      advanced: { min: 60, max: 120, unit: 'reps' }
    },
    description: 'Isometric core stability hold',
    impact: 'low'
  },

  'BW-SIDE-PLANK': {
    id: 'BW-SIDE-PLANK',
    name: 'Side Plank',
    tool: 'bodyweight',
    pattern: 'anti_rotation',
    primary: ['obliques', 'core'],
    secondary: ['shoulders'],
    cues: [
      'Forearm on ground',
      'Hips stacked and elevated',
      'Straight line from head to feet',
      'Equal time both sides'
    ],
    breathingPattern: 'Continuous nasal breathing',
    loadGuidance: {
      beginner: { min: 15, max: 20, unit: 'reps' },
      intermediate: { min: 20, max: 45, unit: 'reps' },
      advanced: { min: 45, max: 90, unit: 'reps' }
    },
    description: 'Lateral core stability',
    impact: 'low'
  },

  'BW-GLUTE-BRIDGE': {
    id: 'BW-GLUTE-BRIDGE',
    name: 'Glute Bridge',
    tool: 'bodyweight',
    pattern: 'hinge',
    primary: ['glutes', 'hamstrings'],
    secondary: ['lower_back', 'core'],
    cues: [
      'Feet flat, knees bent',
      'Drive through heels',
      'Squeeze glutes at top',
      'Neutral spine'
    ],
    breathingPattern: 'Exhale on drive up, inhale down',
    loadGuidance: {
      beginner: { min: 10, max: 15, unit: 'reps' },
      intermediate: { min: 15, max: 25, unit: 'reps' },
      advanced: { min: 25, max: 40, unit: 'reps' }
    },
    description: 'Glute activation and hip extension',
    impact: 'low'
  },

  // ==================== KETTLEBELL ====================
  'KB-SWING': {
    id: 'KB-SWING',
    name: 'Kettlebell Swing',
    tool: 'kettlebell',
    pattern: 'hinge',
    primary: ['glutes', 'hamstrings'],
    secondary: ['core', 'shoulders', 'forearms'],
    cues: [
      'Hip hinge, not squat',
      'Snap hips forward',
      'Bell floats to eye level',
      'Arms are ropes',
      'Powerful hip drive'
    ],
    breathingPattern: 'Quick inhale on backswing, explosive exhale on drive',
    contraindications: ['Lower back injury'],
    loadGuidance: {
      beginner: { min: 8, max: 12, unit: 'kg' },
      intermediate: { min: 12, max: 16, unit: 'kg' },
      advanced: { min: 16, max: 24, unit: 'kg' }
    },
    description: 'Ballistic hip power and cardio conditioning',
    impact: 'high'
  },

  'KB-GOBLET-SQUAT': {
    id: 'KB-GOBLET-SQUAT',
    name: 'Kettlebell Goblet Squat',
    tool: 'kettlebell',
    pattern: 'squat',
    primary: ['quads', 'glutes'],
    secondary: ['core'],
    cues: [
      'Hold KB at chest',
      'Knees track over toes',
      'Tall torso',
      'Full depth',
      'Drive through heels'
    ],
    breathingPattern: 'Inhale down, exhale up',
    loadGuidance: {
      beginner: { min: 8, max: 12, unit: 'kg' },
      intermediate: { min: 12, max: 16, unit: 'kg' },
      advanced: { min: 16, max: 24, unit: 'kg' }
    },
    description: 'Front-loaded squat pattern for leg strength',
    impact: 'moderate'
  },

  'KB-CLEAN-PRESS': {
    id: 'KB-CLEAN-PRESS',
    name: 'Kettlebell Clean & Press',
    tool: 'kettlebell',
    pattern: 'push',
    primary: ['shoulders', 'chest'],
    secondary: ['glutes', 'core', 'triceps'],
    cues: [
      'Clean to rack position',
      'Press overhead',
      'Lock out at top',
      'Control descent'
    ],
    breathingPattern: 'Exhale on press, inhale on clean',
    loadGuidance: {
      beginner: { min: 6, max: 10, unit: 'kg' },
      intermediate: { min: 10, max: 14, unit: 'kg' },
      advanced: { min: 14, max: 20, unit: 'kg' }
    },
    description: 'Full body power movement combining clean and overhead press',
    impact: 'high'
  },

  'KB-RDL': {
    id: 'KB-RDL',
    name: 'Kettlebell RDL',
    tool: 'kettlebell',
    pattern: 'hinge',
    primary: ['hamstrings', 'glutes', 'lower_back'],
    cues: [
      'Slight knee bend',
      'Hinge at hips',
      'Neutral spine',
      'Feel hamstring stretch',
      'Drive hips forward to stand'
    ],
    breathingPattern: 'Inhale down, exhale up',
    loadGuidance: {
      beginner: { min: 8, max: 12, unit: 'kg' },
      intermediate: { min: 12, max: 16, unit: 'kg' },
      advanced: { min: 16, max: 24, unit: 'kg' }
    },
    description: 'Posterior chain strength with emphasis on hamstrings',
    impact: 'moderate'
  },

  // ==================== DUMBBELLS ====================
  'DB-GOBLET-SQUAT': {
    id: 'DB-GOBLET-SQUAT',
    name: 'Dumbbell Goblet Squat',
    tool: 'dumbbell',
    pattern: 'squat',
    primary: ['quads', 'glutes'],
    secondary: ['core'],
    cues: [
      'Hold DB vertically at chest',
      'Knees track toes',
      'Tall torso',
      'Full depth'
    ],
    breathingPattern: 'Inhale down, exhale up',
    loadGuidance: {
      beginner: { min: 8, max: 12, unit: 'kg' },
      intermediate: { min: 12, max: 18, unit: 'kg' },
      advanced: { min: 18, max: 25, unit: 'kg' }
    },
    description: 'Front-loaded squat with dumbbell',
    impact: 'moderate'
  },

  'DB-ROW': {
    id: 'DB-ROW',
    name: 'Dumbbell Row',
    tool: 'dumbbell',
    pattern: 'pull',
    primary: ['lats', 'mid_back', 'rear_delts'],
    secondary: ['biceps', 'core'],
    cues: [
      'Neutral spine',
      'Pull elbow to ribs',
      'Squeeze shoulder blade',
      'Control descent'
    ],
    breathingPattern: 'Exhale on pull, inhale on lower',
    loadGuidance: {
      beginner: { min: 8, max: 12, unit: 'kg' },
      intermediate: { min: 12, max: 18, unit: 'kg' },
      advanced: { min: 18, max: 25, unit: 'kg' }
    },
    description: 'Horizontal pulling for back development',
    impact: 'moderate'
  },

  'DB-FLOOR-PRESS': {
    id: 'DB-FLOOR-PRESS',
    name: 'Dumbbell Floor Press',
    tool: 'dumbbell',
    pattern: 'push',
    primary: ['chest', 'triceps'],
    secondary: ['shoulders'],
    cues: [
      'Lie on floor',
      'Shoulders packed',
      'Press to lockout',
      'Elbows touch floor between reps'
    ],
    breathingPattern: 'Inhale down, exhale on press',
    loadGuidance: {
      beginner: { min: 8, max: 12, unit: 'kg' },
      intermediate: { min: 12, max: 18, unit: 'kg' },
      advanced: { min: 18, max: 25, unit: 'kg' }
    },
    description: 'Horizontal push with shoulder-friendly range',
    impact: 'moderate'
  },

  'DB-OVERHEAD-PRESS': {
    id: 'DB-OVERHEAD-PRESS',
    name: 'Dumbbell Overhead Press',
    tool: 'dumbbell',
    pattern: 'push',
    primary: ['shoulders', 'triceps'],
    secondary: ['core'],
    cues: [
      'Start at shoulder height',
      'Press straight up',
      'Lock out overhead',
      'Keep ribs down'
    ],
    breathingPattern: 'Exhale on press, inhale down',
    loadGuidance: {
      beginner: { min: 6, max: 10, unit: 'kg' },
      intermediate: { min: 10, max: 15, unit: 'kg' },
      advanced: { min: 15, max: 22, unit: 'kg' }
    },
    description: 'Vertical pressing for shoulder strength',
    impact: 'moderate'
  },

  'DB-RDL': {
    id: 'DB-RDL',
    name: 'Dumbbell RDL',
    tool: 'dumbbell',
    pattern: 'hinge',
    primary: ['hamstrings', 'glutes', 'lower_back'],
    cues: [
      'DBs in front of thighs',
      'Slight knee bend',
      'Hinge at hips',
      'Feel hamstring stretch'
    ],
    breathingPattern: 'Inhale down, exhale up',
    loadGuidance: {
      beginner: { min: 8, max: 12, unit: 'kg' },
      intermediate: { min: 12, max: 18, unit: 'kg' },
      advanced: { min: 18, max: 25, unit: 'kg' }
    },
    description: 'Posterior chain development with dumbbells',
    impact: 'moderate'
  },

  // ==================== RESISTANCE BANDS ====================
  'BAND-ROW': {
    id: 'BAND-ROW',
    name: 'Band Row',
    tool: 'band',
    pattern: 'pull',
    primary: ['mid_back', 'lats'],
    secondary: ['biceps', 'rear_delts'],
    cues: [
      'Anchor band at chest height',
      'Pull elbows to ribs',
      'Squeeze shoulder blades',
      'Control return'
    ],
    breathingPattern: 'Exhale on pull, inhale on return',
    description: 'Horizontal pull with constant tension',
    impact: 'low'
  },

  'BAND-PULL-APARTS': {
    id: 'BAND-PULL-APARTS',
    name: 'Band Pull-Aparts',
    tool: 'band',
    pattern: 'pull',
    primary: ['rear_delts', 'mid_back'],
    secondary: ['rotator_cuff'],
    cues: [
      'Arms straight at shoulder height',
      'Pull band apart',
      'Squeeze shoulder blades',
      'Slow and controlled'
    ],
    breathingPattern: 'Exhale on pull apart, inhale on return',
    description: 'Posterior shoulder and upper back activation',
    impact: 'low'
  },

  'PALLOF-PRESS': {
    id: 'PALLOF-PRESS',
    name: 'Pallof Press',
    tool: 'band',
    pattern: 'anti_rotation',
    primary: ['core', 'obliques'],
    cues: [
      'Band anchored at chest height',
      'Hold at chest',
      'Press out, resist rotation',
      'No twisting'
    ],
    breathingPattern: 'Exhale on press, inhale on return',
    description: 'Anti-rotation core strength',
    impact: 'low'
  },

  'BAND-PULLOVER': {
    id: 'BAND-PULLOVER',
    name: 'Band Pullover',
    tool: 'band',
    pattern: 'pull',
    primary: ['lats', 'chest'],
    secondary: ['core', 'triceps'],
    cues: [
      'Band anchored overhead',
      'Arms extended',
      'Pull down to thighs',
      'Control return'
    ],
    breathingPattern: 'Exhale on pull, inhale up',
    description: 'Lat activation with chest stretch',
    impact: 'low'
  }
};

// Helper to get exercises by equipment
export const getExercisesByEquipment = (equipment: string[]): Exercise[] => {
  return Object.values(EXERCISES).filter(ex => equipment.includes(ex.tool));
};

// Helper to get exercises by pattern
export const getExercisesByPattern = (pattern: string): Exercise[] => {
  return Object.values(EXERCISES).filter(ex => ex.pattern === pattern);
};

// Helper to get exercises by muscle group
export const getExercisesByMuscle = (muscle: string): Exercise[] => {
  return Object.values(EXERCISES).filter(ex =>
    ex.primary.includes(muscle as any) || ex.secondary?.includes(muscle as any)
  );
};
