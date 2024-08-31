import React from "react";
import Boids from "@/components/threejs/boids";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <Boids />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl text-foreground">Welcome to My Portfolio</h1>
        <p className="mt-4 text-lg text-foreground">
          Here is some introductory text about my portfolio.
        </p>
      </div>
    </main>
  );
}
