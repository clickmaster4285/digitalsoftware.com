"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const tubesRef = useRef<THREE.LineSegments | null>(null);
  const animationRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const colors = useRef(["#ff0080", "#8000ff", "#00ffcc"]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(0x000000, 0.008);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    // Setup renderer
  const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
    renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.domElement.style.position = "absolute";
renderer.domElement.style.inset = "0";
renderer.domElement.style.zIndex = "-1";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create neon tubes effect using torus knots
    const tubeGroup = new THREE.Group();
    
    const geometries = [
      new THREE.TorusKnotGeometry(1.5, 0.08, 200, 32, 3, 4),
      new THREE.TorusKnotGeometry(1.8, 0.06, 180, 32, 5, 3),
      new THREE.TorusKnotGeometry(2.0, 0.1, 220, 32, 2, 5),
      new THREE.TorusGeometry(2.2, 0.07, 64, 200),
      new THREE.TorusGeometry(1.6, 0.09, 64, 200),
    ];

    const tubeColors = ["#ff0080", "#8000ff", "#00ffcc", "#ff6600", "#ff00ff"];
    
    geometries.forEach((geometry, i) => {
      const material = new THREE.MeshBasicMaterial({
        color: tubeColors[i % tubeColors.length],
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const tube = new THREE.Mesh(geometry, material);
      tube.position.x = (Math.random() - 0.5) * 8;
      tube.position.y = (Math.random() - 0.5) * 6;
      tube.position.z = (Math.random() - 0.5) * 10 - 5;
      tube.scale.setScalar(0.8 + Math.random() * 0.7);
      tubeGroup.add(tube);
    });

    scene.add(tubeGroup);
    tubesRef.current = tubeGroup as any;

    // Add particles for extra effect
    const particleCount = 1500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15;
    }
    
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff44aa,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Stars background
    const starCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 50;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse movement effect
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    // Click to change colors
    const handleClick = () => {
      if (!enableClickInteraction) return;
      
      const newColors = [
        `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      ];
      colors.current = newColors;
      
      tubeGroup.children.forEach((child, idx) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.MeshBasicMaterial).color.set(newColors[idx % newColors.length]);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.005;
      
      // Rotate tube group
      tubeGroup.rotation.x = Math.sin(time * 0.2) * 0.3;
      tubeGroup.rotation.y = time * 0.3;
      tubeGroup.rotation.z = Math.cos(time * 0.15) * 0.2;
      
      // Rotate particles
      particles.rotation.x = time * 0.05;
      particles.rotation.y = time * 0.03;
      
      // Follow mouse with slight delay
      const targetX = mousePos.current.x * 2;
      const targetY = mousePos.current.y * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, [enableClickInteraction]);

return (
  <div
    ref={containerRef}
    className={cn(
      "fixed inset-0 -z-50 overflow-hidden bg-black pointer-events-none",
      className
    )}
  >
    {children && (
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    )}
  </div>
);
}

export default TubesBackground;