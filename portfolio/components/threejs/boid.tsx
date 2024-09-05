"use client";
import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { alignment, BoidData, cohesion, separation } from "./boidBehaviors";

interface BoidProps {
  initialPosition: [number, number, number];
  initialVelocity: [number, number, number];
  boidData: BoidData[];
  isGreen?: boolean;
  separationDistance: number;
  perceptionRadius: number;
  maxForce: number;
  maxSpeed: number;
}

export default function Boid({
  initialPosition,
  initialVelocity,
  boidData,
  isGreen = false,
  separationDistance,
  perceptionRadius,
  maxForce,
  maxSpeed,
}: BoidProps) {
  const boidRef = useRef<THREE.Mesh>(null);
  const perceptionRef = useRef<THREE.Mesh>(null);
  const separationRef = useRef<THREE.Mesh>(null);
  const [velocity] = useState<THREE.Vector3>(
    new THREE.Vector3(...initialVelocity),
  );
  const [acceleration, setAcceleration] = useState<THREE.Vector3>(
    new THREE.Vector3(),
  );

  const { width, height } = useThree((state) => state.viewport);

  useFrame(() => {
    if (boidRef.current) {
      const boid = { position: boidRef.current.position, velocity };

      const separationForce = separation(
        boid,
        boidData,
        separationDistance,
        maxForce,
      );
      const alignmentForce = alignment(
        boid,
        boidData,
        perceptionRadius,
        maxForce,
        maxSpeed,
      );
      const cohesionForce = cohesion(
        boid,
        boidData,
        perceptionRadius,
        maxForce,
      );

      const totalAcceleration = new THREE.Vector3();
      totalAcceleration
        .add(separationForce)
        .add(alignmentForce)
        .add(cohesionForce);
      setAcceleration(totalAcceleration);

      velocity.add(acceleration);
      velocity.clampLength(0, maxSpeed);
      boidRef.current.position.add(velocity);

      boidRef.current.rotation.z = Math.atan2(-velocity.x, velocity.y);

      if (boidRef.current.position.x > width / 2) {
        boidRef.current.position.x = -width / 2;
      } else if (boidRef.current.position.x < -width / 2) {
        boidRef.current.position.x = width / 2;
      }
      if (boidRef.current.position.y > height / 2) {
        boidRef.current.position.y = -height / 2;
      } else if (boidRef.current.position.y < -height / 2) {
        boidRef.current.position.y = height / 2;
      }

      // Update the position of the perception and separation radius helpers
      if (perceptionRef.current) {
        perceptionRef.current.position.copy(boidRef.current.position);
      }
      if (separationRef.current) {
        separationRef.current.position.copy(boidRef.current.position);
      }
    }
  });

  return (
    <>
      {/* Boid */}
      <mesh ref={boidRef} position={initialPosition}>
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshStandardMaterial color={isGreen ? 0x00ff00 : 0xff0000} />
      </mesh>

      {/* Perception radius (green circle around the boid for alignment/cohesion) */}
      {isGreen && (
        <mesh ref={perceptionRef}>
          <ringGeometry
            args={[perceptionRadius - 0.01, perceptionRadius, 32]} // Perception radius for alignment/cohesion
          />
          <meshBasicMaterial color={0x00ff00} opacity={0.3} transparent />
        </mesh>
      )}

      {/* Separation distance (red circle around the boid for separation) */}
      {isGreen && (
        <mesh ref={separationRef}>
          <ringGeometry
            args={[separationDistance - 0.01, separationDistance, 32]} // Separation distance circle
          />
          <meshBasicMaterial color={0xff0000} opacity={0.5} transparent />
        </mesh>
      )}
    </>
  );
}
