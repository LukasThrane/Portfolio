import * as THREE from "three";

// Types for Boid and its neighbors
export interface BoidData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

// Separation: Avoid crowding neighbors (repulsion)
export function separation(
  boid: BoidData,
  boids: BoidData[],
  separationRadius: number,
): THREE.Vector3 {
  let steer = new THREE.Vector3();
  let count = 0;

  boids.forEach((otherBoid) => {
    let distance = boid.position.distanceTo(otherBoid.position);
    if (distance > 0 && distance < separationRadius) {
      count++;
    }
  });

  return steer;
}

// Alignment: Steer towards the average heading of neighbors
export function alignment(
  boid: BoidData,
  boids: BoidData[],
  alignmentRadius: number,
): THREE.Vector3 {
  let averageVelocity = new THREE.Vector3();
  let count = 0;

  boids.forEach((otherBoid) => {
    let distance = boid.position.distanceTo(otherBoid.position);
    if (distance > 0 && distance < alignmentRadius) {
      count++;
    }
  });

  return averageVelocity;
}

// Cohesion: Steer towards the average position of neighbors
export function cohesion(
  boid: BoidData,
  boids: BoidData[],
  cohesionRadius: number,
): THREE.Vector3 {
  let centerOfMass = new THREE.Vector3();
  let count = 0;

  boids.forEach((otherBoid) => {
    let distance = boid.position.distanceTo(otherBoid.position);
    if (distance > 0 && distance < cohesionRadius) {
      count++;
    }
  });

  return centerOfMass;
}
