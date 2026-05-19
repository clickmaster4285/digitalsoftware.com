"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type City = {
  name: string;
  lat: number;
  lon: number;
  initials: string;
  // angle (deg) and length (px) for the leader line on screen
  angle: number;
  length: number;
};

const CITIES: City[] = [
  { name: "Tokyo", lat: 35.68, lon: 139.69, initials: "PK", angle: -35, length: 140 },
  { name: "Sydney", lat: -33.86, lon: 151.2, initials: "UK", angle: 25, length: 160 },
  { name: "Auckland", lat: -36.85, lon: 174.76, initials: "US", angle: 180, length: 80 },
  { name: "Singapore", lat: 1.35, lon: 103.82, initials: "USA", angle: -90, length: 130 },
];

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export default function StippleGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinsRef = useRef<Array<HTMLDivElement | null>>([]);
  const linesRef = useRef<Array<SVGLineElement | null>>([]);
  const avatarsRef = useRef<Array<HTMLDivElement | null>>([]);

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

    // Build stipple dots by sampling an equirectangular world map image.
    const NAVY = new THREE.Color(0xdfe6f2);
    const dotsGeom = new THREE.BufferGeometry();
    const positions: number[] = [];

    const buildDotsFromImage = (img: HTMLImageElement) => {
      const cw = 400;
      const ch = 200;
      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, cw, ch);
      const data = ctx.getImageData(0, 0, cw, ch).data;

      const step = 1;
      for (let y = 0; y < ch; y += step) {
        for (let x = 0; x < cw; x += step) {
          const i = (y * cw + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          // land = non-transparent and not blue/white ocean. Use luminance threshold.
          const lum = (r + g + b) / 3;
          if (a > 128 && lum < 200) {
            const lon = (x / cw) * 360 - 180;
            const lat = 90 - (y / ch) * 180;
            // poisson-ish jitter
            if (Math.random() > 0.55) continue;
            const v = latLonToVec3(lat, lon, radius);
            positions.push(v.x, v.y, v.z);
          }
        }
      }
      dotsGeom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      const mat = new THREE.PointsMaterial({
        color: NAVY,
        size: 0.022,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(dotsGeom, mat);
      globeGroup.add(points);
    };

    // Fallback: procedural lat/lon "noise" continents if image fails.
    const buildProcedural = () => {
      // simple distribution covering sphere with random density variation
      for (let i = 0; i < 9000; i++) {
        const lat = Math.acos(2 * Math.random() - 1) * (180 / Math.PI) - 90;
        const lon = Math.random() * 360 - 180;
        // crude land mask: a few sinus blobs
        const n =
          Math.sin((lat * Math.PI) / 90) * Math.cos((lon * Math.PI) / 180) +
          Math.cos((lat * Math.PI) / 60 + 1.2) * Math.sin((lon * Math.PI) / 90 + 0.3);
        if (n > 0.15) {
          const v = latLonToVec3(lat, lon, radius);
          positions.push(v.x, v.y, v.z);
        }
      }
      dotsGeom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      const mat = new THREE.PointsMaterial({
        color: NAVY,
        size: 0.022,
        sizeAttenuation: true,
      });
      globeGroup.add(new THREE.Points(dotsGeom, mat));
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => buildDotsFromImage(img);
    img.onerror = () => buildProcedural();
    // World map silhouette (black land, transparent oceans).
    img.src =
      "https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png";

    // city pin markers in 3D (small spheres) to compute screen pos
    const pinMarkers: THREE.Object3D[] = CITIES.map((c) => {
      const obj = new THREE.Object3D();
      obj.position.copy(latLonToVec3(c.lat, c.lon, radius * 1.01));
      globeGroup.add(obj);
      // visible dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 12),
        new THREE.MeshBasicMaterial({ color: NAVY }),
      );
      dot.position.copy(obj.position);
      globeGroup.add(dot);
      return obj;
    });

    globeGroup.rotation.x = 0.35;

    const tmp = new THREE.Vector3();
    const updatePins = () => {
      const rect = renderer.domElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      pinMarkers.forEach((obj, idx) => {
        obj.getWorldPosition(tmp);
        const camDir = new THREE.Vector3();
        camera.getWorldDirection(camDir);
        const toPoint = tmp.clone().sub(camera.position).normalize();
        const facing = toPoint.dot(camDir) > 0; // in front of camera
        // back-face culling: hide if pin is on far side
        const normal = tmp.clone().sub(globeGroup.position).normalize();
        const camToCenter = camera.position.clone().sub(globeGroup.position).normalize();
        const visible = normal.dot(camToCenter) > 0.05 && facing;

        const proj = tmp.clone().project(camera);
        const sx = (proj.x * 0.5 + 0.5) * w;
        const sy = (-proj.y * 0.5 + 0.5) * h;

        const pin = pinsRef.current[idx];
        const line = linesRef.current[idx];
        const av = avatarsRef.current[idx];
        if (pin) {
          pin.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, -50%)`;
          pin.style.opacity = visible ? "1" : "0";
        }
        const city = CITIES[idx];
        const rad = (city.angle * Math.PI) / 180;
        const ex = sx + Math.cos(rad) * city.length;
        const ey = sy + Math.sin(rad) * city.length;
        if (line && Number.isFinite(sx) && Number.isFinite(sy) && Number.isFinite(ex) && Number.isFinite(ey)) {
          line.setAttribute("x1", String(Math.round(sx)));
          line.setAttribute("y1", String(Math.round(sy)));
          line.setAttribute("x2", String(Math.round(ex)));
          line.setAttribute("y2", String(Math.round(ey)));
          line.style.opacity = visible ? "1" : "0";
        }
        if (av) {
          av.style.transform = `translate(${ex}px, ${ey}px) translate(-50%, -50%)`;
          av.style.opacity = visible ? "1" : "0";
        }
      });
    };

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.0008;
      renderer.render(scene, camera);
      updatePins();
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

    // Entrance fade-in for pins/lines/avatars only — the wrapper-level
    // scroll choreography (half-visible → full → slide-right) lives in
    // src/routes/index.tsx so it can stay in sync with the text column.
    const ctx = gsap.context(() => {
      gsap.set(pinsRef.current, { scale: 0, opacity: 0, transformOrigin: "center" });
      gsap.set(linesRef.current, { opacity: 0 });
      gsap.set(avatarsRef.current, { scale: 0, opacity: 0 });

      const intro = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      });
      intro
        .to(pinsRef.current, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" })
        .to(linesRef.current, { opacity: 1, duration: 0.4, stagger: 0.08 }, "-=0.2")
        .to(avatarsRef.current, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.8)" }, "-=0.2");
    }, containerRef);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ctx.revert();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <div ref={mountRef} className="absolute inset-0" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {CITIES.map((_, i) => (
          <line
            key={i}
            ref={(el) => { linesRef.current[i] = el; }}
            stroke="#dfe6f2"
            strokeWidth="1"
          />
        ))}
      </svg>
      {CITIES.map((c, i) => (
        <div
          key={`pin-${i}`}
          ref={(el) => { pinsRef.current[i] = el; }}
          className="pointer-events-none absolute left-0 top-0 h-2 w-2 rounded-full"
          style={{ backgroundColor: "#dfe6f2" }}
        />
      ))}
      {CITIES.map((c, i) => (
        <div
          key={`av-${i}`}
          ref={(el) => { avatarsRef.current[i] = el; }}
          className="pointer-events-none absolute left-0 top-0 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-white bg-[#c9c3b6] text-xs font-semibold text-[#1a1f2e] shadow-md"
        >
          {c.initials}
        </div>
      ))}
    </div>
  );
}
