'use client';

import { useEffect, useRef, useState } from 'react';

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    const initThree = async () => {
      const THREE = await import('three');

      const canvas = canvasRef.current!;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0xf0eeeb, 1);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
      camera.position.set(1, 0.5, 6);

      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', resize);
      resize();

      class SCurve extends THREE.Curve<THREE.Vector3> {
        time: number = 0;
        getPoint(t: number) {
          const time = this.time * 0.45;

          const x = Math.sin(t * Math.PI * 1.45 + time * 0.22) * 2.6 
                  + Math.sin(t * Math.PI * 0.65 + time * 0.11) * 1.1;

          const y = -t * 4.8 
                  + Math.cos(t * Math.PI * 1.25 + time * 0.28) * 1.9
                  + Math.cos(t * Math.PI * 2.0 + time * 0.16) * 0.8;

          const z = Math.sin(t * Math.PI * 0.95 + time * 0.19) * 1.3;

          return new THREE.Vector3(x, y, z);
        }
      }

      const curve = new SCurve();

      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.18,
        metalness: 0.08,
      });

      const tubeMesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 200, 0.48, 20, false),
        material
      );
      scene.add(tubeMesh);

      scene.add(new THREE.AmbientLight(0xffffff, 0.75));

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
      keyLight.position.set(5, 6, 4);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xe0ddd8, 0.7);
      fillLight.position.set(-4, -4, 5);
      scene.add(fillLight);

      let time = 0;
      let animationId: number;

      function animate() {
        animationId = requestAnimationFrame(animate);
        time += 0.01;
        curve.time = time;

        const newGeo = new THREE.TubeGeometry(curve, 200, 0.48, 20, false);
        tubeMesh.geometry.dispose();
        tubeMesh.geometry = newGeo;

        tubeMesh.rotation.z = Math.sin(time * 0.15) * 0.02;

        renderer.render(scene, camera);
      }

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resize);
        tubeMesh.geometry.dispose();
        renderer.dispose();
      };
    };

    initThree();
  }, [isMounted]);

  return (
    <section className="footer">
      <div className="canvas-container">
        <canvas ref={canvasRef} id="bg" />
      </div>

      <div className="content">
        <div className="top-row">
          <div>
            <h1 className="headline">Let’s Talk</h1>
            <div className="contact-info">
              <a href="mailto:hey@clay.global">hey@clay.global</a>
              <a href="tel:+14157966262">+1 415 796 6262</a>
            </div>
          </div>

          <div className="right-column">
            <div className="nav-sections">
              <nav className="nav-links">
                <a href="#">Work</a>
                <a href="#">Services</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
              </nav>

              <nav className="nav-links">
                <a href="#">Clients</a>
                <a href="#">Industries</a>
                <a href="#">Blog</a>
              </nav>
            </div>

            <div className="locations-grid">
              <div className="location-item">
                <h4>San Francisco</h4>
                <p>300 Broadway,<br />San Francisco, CA 94133</p>
              </div>
              <div className="location-item">
                <h4>New York</h4>
                <p>148 Lafayette St,<br />New York, NY 10013</p>
              </div>
              <div className="location-item">
                <h4>Austin</h4>
                <p>600 Congress Ave,<br />Austin, TX 78701</p>
              </div>
              <div className="location-item">
                <h4>Denver</h4>
                <p>1700 Lincoln St 17th fl,<br />Denver, CO 80203</p>
              </div>
              <div className="location-item">
                <h4>Lisbon</h4>
                <p>Av. Alm. Reis 139, 1150-015<br />Lisbon, Portugal</p>
              </div>
              <div className="location-item">
                <h4>Belgrade</h4>
                <p>Nušićeva 15, 11000<br />Belgrade, Serbia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-row">
          <div className="social-icons">
            <a href="#" aria-label="Behance">Bē</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="X">X</a>
            <a href="#" aria-label="Facebook">f</a>
          </div>
          <p className="copyright">
            © 2016–2026 Clay Global, LLC 
            <span className="links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Sitemap</a>
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #f0eeeb;
          display: flex;
          overflow: hidden;
          color: #0f0f0f;
        }

        .canvas-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 48%;
          height: 100%;
          z-index: 1;
        }

        canvas#bg {
          width: 100% !important;
          height: 100% !important;
        }

        .content {
          position: relative;
          z-index: 2;
          flex: 1;
          padding: 60px 80px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .top-row {
          display: flex;
          justify-content: space-between;
          gap: 40px;
        }

        .headline {
          font-size: clamp(56px, 8vw, 96px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 24px;
        }

        .contact-info a {
          display: block;
          font-size: 22px;
          margin-bottom: 8px;
          text-decoration: none;
          color: inherit;
        }

        .right-column {
          display: flex;
          gap: 80px;
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 20px;
        }

        .nav-links a {
          text-decoration: none;
          color: inherit;
          transition: opacity 0.2s;
        }

        .nav-links a:hover {
          opacity: 0.6;
        }

        .locations-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 32px 60px;
          font-size: 14px;
        }

        .location-item h4 {
          font-weight: 700;
          margin-bottom: 6px;
          font-size: 15px;
        }

        .location-item p {
          line-height: 1.5;
          opacity: 0.9;
        }

        .bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 40px;
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        .social-icons {
          display: flex;
          gap: 24px;
          font-size: 18px;
        }

        .social-icons a {
          text-decoration: none;
          color: inherit;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .social-icons a:hover {
          opacity: 1;
        }

        .copyright {
          font-size: 13px;
          opacity: 0.7;
        }

        .copyright .links {
          margin-left: 24px;
        }

        .copyright a {
          margin-left: 16px;
          text-decoration: none;
          color: inherit;
        }

        @media (max-width: 1024px) {
          .canvas-container { width: 40%; }
          .right-column { gap: 50px; }
        }

        @media (max-width: 768px) {
          .top-row { flex-direction: column; }
          .locations-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}