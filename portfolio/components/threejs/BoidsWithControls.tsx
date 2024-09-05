"use client";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import BoidsInCanvas from "@/components/threejs/BoidsInCanvas";

export default function BoidsWithControls() {
  // State for behavior inputs
  const [separationRadius, setSeparationRadius] = useState(1);
  const [alignmentRadius, setAlignmentRadius] = useState(2);
  const [cohesionRadius, setCohesionRadius] = useState(3);

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
            Separation Radius: {separationRadius.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={separationRadius}
            onChange={(e) => setSeparationRadius(parseFloat(e.target.value))}
            style={{ width: "120px", height: "1.2rem" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#fff", fontSize: "0.8rem" }}>
            Alignment Radius: {alignmentRadius.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={alignmentRadius}
            onChange={(e) => setAlignmentRadius(parseFloat(e.target.value))}
            style={{ width: "120px", height: "1.2rem" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#fff", fontSize: "0.8rem" }}>
            Cohesion Radius: {cohesionRadius.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={cohesionRadius}
            onChange={(e) => setCohesionRadius(parseFloat(e.target.value))}
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
          <ambientLight intensity={1} />

          {/* Pass behavior values to the boid system */}
          <BoidsInCanvas
            separationRadius={separationRadius}
            alignmentRadius={alignmentRadius}
            cohesionRadius={cohesionRadius}
          />
        </Canvas>
      </div>
    </div>
  );
}
