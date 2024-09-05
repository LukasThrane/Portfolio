"use client";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import BoidsInCanvas from "./BoidsInCanvas";

export default function BoidsWithControls() {
  // State for behavior inputs
  const [separationDistance, setSeparationDistance] = useState(1);
  const [perceptionRadius, setPerceptionRadius] = useState(2);
  const [maxForce, setMaxForce] = useState(0.0001);
  const [maxSpeed, setMaxSpeed] = useState(0.02);

  return (
    <div className="w-full h-screen relative">
      {/* Sliders for controlling the boid behaviors */}
      <div
        className="controls"
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.5rem",
          padding: "0.5rem",
          zIndex: 10,
        }}
      >
        {/* Flex container for label and slider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#fff", fontSize: "0.8rem" }}>
            Separation Distance: {separationDistance.toFixed(2)}
          </span>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={separationDistance}
            onChange={(e) =>
              setSeparationDistance(parseFloat(e.target.value))
            }
            style={{ width: "120px", height: "1.2rem" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#fff", fontSize: "0.8rem" }}>
            Perception Radius: {perceptionRadius.toFixed(2)}
          </span>
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={perceptionRadius}
            onChange={(e) =>
              setPerceptionRadius(parseFloat(e.target.value))
            }
            style={{ width: "120px", height: "1.2rem" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#fff", fontSize: "0.8rem" }}>
            Max Force: {maxForce.toFixed(6)}
          </span>
          <input
            type="range"
            min="0.00001"
            max="0.001"
            step="0.00001"
            value={maxForce}
            onChange={(e) => setMaxForce(parseFloat(e.target.value))}
            style={{ width: "120px", height: "1.2rem" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#fff", fontSize: "0.8rem" }}>
            Max Speed: {maxSpeed.toFixed(2)}
          </span>
          <input
            type="range"
            min="0.01"
            max="0.1"
            step="0.01"
            value={maxSpeed}
            onChange={(e) => setMaxSpeed(parseFloat(e.target.value))}
            style={{ width: "120px", height: "1.2rem" }}
          />
        </div>
      </div>

      {/* Boid Canvas */}
      <div className="boid-canvas w-full h-screen">
        <Canvas
          orthographic
          camera={{ position: [0, 0, 5], zoom: 100 }}
          style={{ width: "100%", height: "100%" }}
          onCreated={(state) => state.gl.setClearColor("transparent", 0)}
        >
          {/* Add ambient light */}
          <ambientLight intensity={0.5} />

          {/* Pass behavior values to the boid system */}
          <BoidsInCanvas
            separationDistance={separationDistance}
            perceptionRadius={perceptionRadius}
            maxForce={maxForce}
            maxSpeed={maxSpeed}
          />
        </Canvas>
      </div>
    </div>
  );
}
