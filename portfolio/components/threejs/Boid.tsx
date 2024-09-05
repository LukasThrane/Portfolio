"use client";
import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  alignment,
  BoidData,
  cohesion,
  separation,
} from "@/components/threejs/boidBehaviors";

interface BoidProps {
  initialPosition: [number, number, number];
  initialVelocity: [number, number, number];
  boidData: BoidData[];
  isGreen?: boolean;
  separationRadius: number;
  alignmentRadius: number;
  cohesionRadius: number;
}

export default function Boid({
  initialPosition,
  initialVelocity,
  boidData,
  isGreen = false,
  separationRadius,
  alignmentRadius,
  cohesionRadius,
}: BoidProps) {
  const boidRef = useRef<THREE.Mesh>(null);
  const separationRef = useRef<THREE.Mesh>(null);
  const alignmentRef = useRef<THREE.Mesh>(null);
  const cohesionRef = useRef<THREE.Mesh>(null);
  const [velocity] = useState<THREE.Vector3>(
    new THREE.Vector3(...initialVelocity),
  );
  const [acceleration, setAcceleration] = useState<THREE.Vector3>(
    new THREE.Vector3(),
  );
  const [lines, setLines] = useState<THREE.Line[]>([]);

  const { width, height } = useThree((state) => state.viewport);

  useFrame(() => {
    if (boidRef.current) {
      const boid = { position: boidRef.current.position, velocity };

      const { steer: separationForce, neighbors: nearbyBoids } = separation(
        boid,
        boidData,
        separationRadius,
      );
      const alignmentForce = alignment(boid, boidData, alignmentRadius);
      const cohesionForce = cohesion(boid, boidData, cohesionRadius);

      const totalAcceleration = new THREE.Vector3();
      totalAcceleration
        .add(separationForce)
        .add(alignmentForce)
        .add(cohesionForce);
      setAcceleration(totalAcceleration);

      velocity.add(acceleration);
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
      if (separationRef.current) {
        separationRef.current.position.copy(boidRef.current.position);
      }
      if (alignmentRef.current) {
        alignmentRef.current.position.copy(boidRef.current.position);
      }
      if (cohesionRef.current) {
        cohesionRef.current.position.copy(boidRef.current.position);
      }

      // Visualize lines between green boid and nearby boids in separation radius
      if (isGreen) {
        const newLines = nearbyBoids.map((neighborPos) => {
          const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
          const points = [
            boidRef.current!.position.clone(), // Non-null assertion here
            neighborPos.clone(),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return new THREE.Line(geometry, lineMaterial);
        });

        setLines(newLines); // Set the lines state
      }
    }
  });

  return (
    <>
      <mesh ref={boidRef} position={initialPosition}>
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshStandardMaterial color={isGreen ? 0x00ff00 : 0xff0000} />
      </mesh>

      {isGreen && (
        <mesh ref={separationRef}>
          <ringGeometry
            args={[separationRadius - 0.01, separationRadius, 64]}
          />
          <meshBasicMaterial color={0xff0000} opacity={0.7} transparent />
        </mesh>
      )}

      {isGreen && (
        <mesh ref={alignmentRef}>
          <ringGeometry args={[alignmentRadius - 0.01, alignmentRadius, 64]} />
          <meshBasicMaterial color={0x00ff00} opacity={0.6} transparent />
        </mesh>
      )}

      {isGreen && (
        <mesh ref={cohesionRef}>
          <ringGeometry args={[cohesionRadius - 0.01, cohesionRadius, 64]} />
          <meshBasicMaterial color={0x0000ff} opacity={0.6} transparent />
        </mesh>
      )}

      {/* Render the lines */}
      {isGreen &&
        lines.map((line, index) => <primitive key={index} object={line} />)}
    </>
  );
}
