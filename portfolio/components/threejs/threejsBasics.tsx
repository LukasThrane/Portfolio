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

    // Enable shadow mapping in the renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Create a simple cube mesh with a light-reactive material
    const cubeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xff0000 }),
    );
    cubeMesh.receiveShadow = true;
    scene.add(cubeMesh);

    // Create a simple icosahedron mesh with a light-reactive material
    const icosahedronMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.MeshStandardMaterial({ color: 0xffffff }),
    );
    icosahedronMesh.castShadow = true;
    scene.add(icosahedronMesh);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Initialize fog
    const fogColor = new THREE.Color(0x060612);
    const fog = new THREE.Fog(fogColor, 1, 20);
    scene.fog = fog;
    scene.background = new THREE.Color(fogColor);

    // Initialize light
    const light = new THREE.PointLight(0xffffff, 5);
    light.position.set(3, 1, 3);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 10;
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
