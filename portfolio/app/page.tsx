import React from "react";
import BoidsWithControls from "@/components/threejs/BoidsWithControls"; // Import the component that has the sliders

export default function Home() {
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen w-full overflow-hidden">
      {/* Include the boids with controls here */}
      <BoidsWithControls />
    </div>
  );
}
