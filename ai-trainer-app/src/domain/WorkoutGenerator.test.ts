import { describe, it, expect } from 'vitest';
import { generateWorkoutPlan } from '../domain/WorkoutGenerator';
import type { UserProfile, Equipment } from '../domain/types';

const mockUser: UserProfile = {
  name: 'Test User',
  available_equipment: ['gada', 'mudgar', 'bodyweight', 'band'] as Equipment[],
  experience_level: 'intermediate',
  goals: ['fat_burn', 'strength'],
  injuries: []
};

describe('WorkoutGenerator', () => {
  it('generates a "micro" session for 15 minutes', () => {
    const plan = generateWorkoutPlan(mockUser, 15, 'morning', 5, {});

    expect(plan.duration_minutes).toBe(15);
    expect(plan.session_type).toBe('micro');
    expect(plan.blocks.length).toBeGreaterThanOrEqual(3); // Warmup/Mobility, Circuit, Breathwork
    
    // Check for breathwork at the end
    const lastBlock = plan.blocks[plan.blocks.length - 1];
    expect(lastBlock.type).toBe('breathwork');
  });

  it('generates a "strength_burn" session for 30 minutes', () => {
    const plan = generateWorkoutPlan(mockUser, 30, 'evening', 4, {});

    expect(plan.duration_minutes).toBe(30);
    expect(plan.session_type).toBe('strength_burn');
    // Should have main workout block
    expect(plan.blocks.some(b => b.type === 'main' || b.type === 'circuit')).toBe(true);
  });

  it('respects equipment constraints', () => {
    const noGadaUser = { ...mockUser, available_equipment: ['bodyweight'] as Equipment[] };
    const plan = generateWorkoutPlan(noGadaUser, 20, 'morning', 5, {});

    plan.blocks.forEach(block => {
      block.exercises.forEach(ex => {
        expect(['bodyweight', 'none']).toContain(ex.exercise.tool);
      });
    });
  });
});
