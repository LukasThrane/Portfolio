"use client";
import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface BoidProps {
  initialPosition: [number, number, number];
  initialVelocity: [number, number, number];
}

export default function Boid({ initialPosition, initialVelocity }: BoidProps) {
  const boidRef = useRef<THREE.Mesh>(null);
  const [velocity, setVelocity] =
    useState<[number, number, number]>(initialVelocity);

  // Get viewport dimensions from useThree
  const { width, height } = useThree((state) => state.viewport);

  // Animate the boid
  useFrame(() => {
    if (boidRef.current) {
      // Update the rotation based on velocity
      boidRef.current.rotation.z = Math.atan2(-velocity[0], velocity[1]);

      // Move the boid
      boidRef.current.position.x += velocity[0];
      boidRef.current.position.y += velocity[1];

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