import create from "zustand";
import * as THREE from "three";

interface BoidState {
  boids: { position: THREE.Vector3; velocity: THREE.Vector3 }[];
  setBoids: (
    newBoids: { position: THREE.Vector3; velocity: THREE.Vector3 }[],
  ) => void;
  updateBoid: (
    index: number,
    position: THREE.Vector3,
    velocity: THREE.Vector3,
  ) => void;
}

export const useBoidStore = create<BoidState>((set) => ({
  boids: [],

  // Set all boids at once
  setBoids: (newBoids) => set(() => ({ boids: newBoids })),

  // Update a specific boid
  updateBoid: (index, position, velocity) =>
    set((state) => {
      const updatedBoids = [...state.boids];
      updatedBoids[index] = { position, velocity };
      return { boids: updatedBoids };
    }),
}));
