"use client";
import React, { useEffect, useState } from "react";
import Boid from "@/components/threejs/Boid";
import { BoidData } from "@/components/threejs/boidBehaviors";
import * as THREE from "three";

interface BoidsInCanvasProps {
  separationRadius: number;
  alignmentRadius: number;
  cohesionRadius: number;
}

export default function BoidsInCanvas({
  separationRadius,
  alignmentRadius,
  cohesionRadius,
}: BoidsInCanvasProps) {
  const [boidData, setBoidData] = useState<BoidData[]>([]);

  // Generate the initial positions and velocities
  useEffect(() => {
    const newBoidData: BoidData[] = [...Array(10)].map(() => {
      const position = new THREE.Vector3(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        0
      );
      const velocity = new THREE.Vector3(
        Math.random() * 0.02 - 0.01,
        Math.random() * 0.02 - 0.01,
        0
      );
      return { position, velocity };
    });
    setBoidData(newBoidData);
  }, []);

  return (
    <>
      {boidData.map((data, index) => (
        <Boid
          key={index}
          initialPosition={data.position.toArray() as [number, number, number]}
          initialVelocity={data.velocity.toArray() as [number, number, number]}
          boidData={boidData}
          isGreen={index === 0}
          separationRadius={separationRadius}
          alignmentRadius={alignmentRadius}
          cohesionRadius={cohesionRadius}
        />
      ))}
    </>
  );
}
