import React from "react";
import BoidsWithControls from "@/components/threejs/BoidsWithControls";

export default function Home() {
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen w-full overflow-hidden">
      <BoidsWithControls />
    </div>
  );
}
