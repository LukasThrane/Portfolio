"use client";
import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { alignment, BoidData, cohesion, separation } from "./boidBehaviors";

interface BoidProps {
  initialPosition: [number, number, number];
  initialVelocity: [number, number, number];
  boidData: BoidData[];
}

export default function Boid({
  initialPosition,
  initialVelocity,
  boidData,
}: BoidProps) {
  const boidRef = useRef<THREE.Mesh>(null);
  const [velocity] = useState<THREE.Vector3>(
    new THREE.Vector3(...initialVelocity),
  );
  const [acceleration, setAcceleration] = useState<THREE.Vector3>(
    new THREE.Vector3(),
  );

  // Get viewport dimensions from useThree
  const { width, height } = useThree((state) => state.viewport);
  const maxSpeed = 0.02; // Control max speed
  const maxForce = 0.0001; // Control max force applied per frame

  // Animate the boid
  useFrame(() => {
    if (boidRef.current) {
      const boid = { position: boidRef.current.position, velocity };

      // Apply boid behaviors (separation, alignment, cohesion)
      const separationForce = separation(boid, boidData, 2, maxForce);
      const alignmentForce = alignment(boid, boidData, 2, maxForce, maxSpeed);
      const cohesionForce = cohesion(boid, boidData, 2, maxForce);

      // Sum the forces to get total acceleration
      const totalAcceleration = new THREE.Vector3();
      totalAcceleration
        .add(separationForce)
        .add(alignmentForce)
        .add(cohesionForce);
      setAcceleration(totalAcceleration);

      // Update velocity by adding acceleration
      velocity.add(acceleration);
      velocity.clampLength(0, maxSpeed);

      // Update position
      boidRef.current.position.add(velocity);

      // Update the rotation based on velocity
      boidRef.current.rotation.z = Math.atan2(-velocity.x, velocity.y);

      // Screen wrapping: Check if the boid has moved outside the bounds of the screen
      if (boidRef.current.position.x > width / 2) {
        boidRef.current.position.x = -width / 2; // Move to the left
      } else if (boidRef.current.position.x < -width / 2) {
        boidRef.current.position.x = width / 2; // Move to the right
      }

      if (boidRef.current.position.y > height / 2) {
        boidRef.current.position.y = -height / 2; // Move to the bottom
      } else if (boidRef.current.position.y < -height / 2) {
        boidRef.current.position.y = height / 2; // Move to the top
      }
    }
  });

  return (
    <mesh ref={boidRef} position={initialPosition}>
      <coneGeometry args={[0.1, 0.3, 8]} />
      <meshStandardMaterial color={0xff0000} />
    </mesh>
  );
}
