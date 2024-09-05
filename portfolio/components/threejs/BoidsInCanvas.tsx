"use client";
import React, { useEffect, useState } from "react";
import Boid from "./Boid";
import { BoidData } from "./boidBehaviors";
import * as THREE from "three";

interface BoidsInCanvasProps {
  separationDistance: number;
  perceptionRadius: number;
  maxForce: number;
  maxSpeed: number;
}

export default function BoidsInCanvas({
  separationDistance,
  perceptionRadius,
  maxForce,
  maxSpeed,
}: BoidsInCanvasProps) {
  const [boidData, setBoidData] = useState<BoidData[]>([]);

  // This effect only runs once to generate the initial positions and velocities
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
  }, []); // Empty dependency array ensures this only runs on the first render

  return (
    <>
      {boidData.map((data, index) => (
        <Boid
          key={index}
          initialPosition={data.position.toArray() as [number, number, number]}
          initialVelocity={data.velocity.toArray() as [number, number, number]}
          boidData={boidData}
          separationDistance={separationDistance}
          perceptionRadius={perceptionRadius}
          maxForce={maxForce}
          maxSpeed={maxSpeed}
          isGreen={index === 0} // Make the first boid green
        />
      ))}
    </>
  );
}
