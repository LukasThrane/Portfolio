"use client";
import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Boid from "./boid";
import * as THREE from "three";
import { BoidData } from "./boidBehaviors";

// Helper component to render boids inside the canvas
function BoidsInCanvas() {
  const { width, height } = useThree((state) => state.viewport);

  // Store boid positions and velocities in state so they aren't reset on re-render
  const [boidData, setBoidData] = useState<BoidData[]>([]);

  useEffect(() => {
    // Function to generate random boid positions and velocities based on the viewport size
    const generateBoidData = () => {
      const speed = 0.02;

      const data = Array.from({ length: 10 }).map(() => {
        const x = Math.random() * width - width / 2;
        const y = Math.random() * height - height / 2;
        const position = new THREE.Vector3(x, y, 0);

        // Generate a random angle between 0 and 2 * Math.PI (full circle)
        const angle = Math.random() * 2 * Math.PI;

        // Calculate velocity components based on the random angle
        const velocityX = speed * Math.cos(angle);
        const velocityY = speed * Math.sin(angle);
        const velocity = new THREE.Vector3(velocityX, velocityY, 0);

        return { position, velocity };
      });
      setBoidData(data);
    };

    // Only generate data on the first render
    if (boidData.length === 0) {
      generateBoidData();
    }
  }, [width, height]);

  return (
    <>
      {boidData.map((data, index) => (
        <Boid
          key={index}
          initialPosition={data.position.toArray() as [number, number, number]}
          initialVelocity={data.velocity.toArray() as [number, number, number]}
          boidData={boidData}
        />
      ))}
    </>
  );
}

export default function Boids() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 5], zoom: 100 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Add ambient light */}
        <ambientLight />
        {/* Render Boids inside the canvas */}
        <BoidsInCanvas />
      </Canvas>
    </div>
  );
}
