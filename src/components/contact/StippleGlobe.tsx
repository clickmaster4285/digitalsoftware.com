'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

export type GlobeHandle = {
  setRotationSpeed: (s: number) => void;
  setColor: (hex: number) => void;
};

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

const StippleGlobe = forwardRef<GlobeHandle>((_, ref) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(0.0015);
  const matRef = useRef<THREE.PointsMaterial | null>(null);

  useImperativeHandle(ref, () => ({
    setRotationSpeed: (s: number) => { speedRef.current = s; },
    setColor: (hex: number) => { matRef.current?.color.setHex(hex); },
  }));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const radius = 2;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);



    const NAVY = new THREE.Color(0xffffff);
    const mat = new THREE.PointsMaterial({ color: NAVY, size: 0.028, sizeAttenuation: true });
    matRef.current = mat;

    // Distribute ~1500 dots evenly on sphere (Fibonacci)
    const N = 1500;
    const positions: number[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      positions.push(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    globeGroup.add(new THREE.Points(geom, mat));
    globeGroup.rotation.x = 0.3;

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      globeGroup.rotation.y += speedRef.current;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
});

StippleGlobe.displayName = "StippleGlobe";
export default StippleGlobe;