import React from "react";
import Boids from "@/components/threejs/boids";

export default function Home() {
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen w-full overflow-hidden">
      <Boids />
    </div>
  );
}
