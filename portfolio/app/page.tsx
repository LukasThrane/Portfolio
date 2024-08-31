import React from "react";
import Boids from "@/components/threejs/boids";

export default function Home() {
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen w-full">
      <Boids />

      <div className="relative z-10 p-8 md:p-12 text-center md:text-left max-w-xl bg-opacity-50 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold text-foreground mb-4">
          Lukas Thrane
        </h1>
        <p className="text-2xl text-muted-foreground mb-6">
          Software Developer
        </p>
        <p className="text-lg text-foreground leading-relaxed">
          I specialize in building high-quality web applications with modern
          technologies. My expertise lies in front-end and back-end development,
          creating seamless user experiences with clean, maintainable code.
        </p>
        <p className="text-lg text-foreground leading-relaxed mt-4">
          I'm passionate about learning new technologies, solving complex
          problems, and continuously improving my skills. Let's connect and
          discuss how we can work together on your next project!
        </p>
        <div className="mt-8 flex justify-center md:justify-start space-x-4">
          <a
            href="/projects"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold shadow hover:bg-primary-dark transition"
          >
            View My Projects
          </a>
          <a
            href="/contact"
            className="px-6 py-2 border border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}
