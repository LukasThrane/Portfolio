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
  desiredSeparation: number,
  maxForce: number,
): THREE.Vector3 {
  let steer = new THREE.Vector3();
  let count = 0;

  boids.forEach((otherBoid) => {
    let distance = boid.position.distanceTo(otherBoid.position);
    if (distance > 0 && distance < desiredSeparation) {
      // Calculate vector pointing away from the neighbor
      let diff = new THREE.Vector3().subVectors(
        boid.position,
        otherBoid.position,
      );
      diff.normalize();
      diff.divideScalar(distance); // Weight by distance (closer = stronger repulsion)
      steer.add(diff);
      count++;
    }
  });

  if (count > 0) {
    steer.divideScalar(count); // Average
    if (steer.length() > 0) {
      steer.setLength(maxForce); // Limit to max force
    }
  }

  return steer;
}

// Alignment: Steer towards the average heading of neighbors
export function alignment(
  boid: BoidData,
  boids: BoidData[],
  perceptionRadius: number,
  maxForce: number,
  maxSpeed: number,
): THREE.Vector3 {
  let averageVelocity = new THREE.Vector3();
  let count = 0;

  boids.forEach((otherBoid) => {
    let distance = boid.position.distanceTo(otherBoid.position);
    if (distance > 0 && distance < perceptionRadius) {
      averageVelocity.add(otherBoid.velocity);
      count++;
    }
  });

  if (count > 0) {
    averageVelocity.divideScalar(count);
    averageVelocity.setLength(maxSpeed); // Set velocity to max speed
    let steering = new THREE.Vector3().subVectors(
      averageVelocity,
      boid.velocity,
    );
    steering.clampLength(0, maxForce); // Limit to max force
    return steering;
  }

  return new THREE.Vector3(); // Return zero vector if no neighbors
}

// Cohesion: Steer towards the average position of neighbors
export function cohesion(
  boid: BoidData,
  boids: BoidData[],
  perceptionRadius: number,
  maxForce: number,
): THREE.Vector3 {
  let centerOfMass = new THREE.Vector3();
  let count = 0;

  boids.forEach((otherBoid) => {
    let distance = boid.position.distanceTo(otherBoid.position);
    if (distance > 0 && distance < perceptionRadius) {
      centerOfMass.add(otherBoid.position);
      count++;
    }
  });

  if (count > 0) {
    centerOfMass.divideScalar(count); // Average position
    let desired = new THREE.Vector3().subVectors(centerOfMass, boid.position);
    desired.setLength(maxForce); // Steer towards the center
    return desired;
  }

  return new THREE.Vector3(); // Return zero vector if no neighbors
}
