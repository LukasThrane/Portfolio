import React from "react";
import Boids from "@/components/threejs/boids";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <Boids />
    </main>
  );
}
