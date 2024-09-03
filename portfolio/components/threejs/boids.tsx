"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function Boids() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;

    /*
    const camera = new THREE.OrthographicCamera(
      -1 * aspectRatio,
      1 * aspectRatio,
      1,
      -1,
      0.1,
      100,
    );
    */
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable smooth motion
    controls.dampingFactor = 0.05; // Inertia factor
    controls.enableZoom = true; // Allow zooming
    controls.enablePan = true; // Allow panning

    // Create a simple cube mesh with a light-reactive material
    const cubeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xff0000 }), // Use MeshStandardMaterial
    );
    scene.add(cubeMesh);

    // Create a simple icosahedron mesh with a light-reactive material
    const icosahedronMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // Use MeshStandardMaterial
    );
    scene.add(icosahedronMesh);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Initialize fog
    const fogColor = new THREE.Color(0x060612);
    const fog = new THREE.Fog(fogColor, 1, 20);
    scene.fog = fog;
    scene.background = new THREE.Color(fogColor);

    // Initialize light
    const light = new THREE.PointLight(0xffffff, 10);
    light.position.set(3, 3, 3);
    scene.add(light);

    // Initialize the clock
    const clock = new THREE.Clock();
    let previousTime = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls for smooth animation
      controls.update();

      // Update the clock
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;

      // Rotate the cube for some animation
      cubeMesh.rotation.x += THREE.MathUtils.degToRad(1) * deltaTime * 20;
      cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * deltaTime * 20;

      // Move the cubeMesh
      cubeMesh.position.x = Math.sin(clock.getElapsedTime()) * 2;
      cubeMesh.position.z = Math.cos(clock.getElapsedTime()) * 2;

      // Render the scene
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      /*
      const newAspectRatio = window.innerWidth / window.innerHeight;
      camera.left = -1 * newAspectRatio;
      camera.right = 1 * newAspectRatio;
      */
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
