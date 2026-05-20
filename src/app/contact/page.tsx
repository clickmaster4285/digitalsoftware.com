'use client';

import { lazy, Suspense, useEffect, useRef ,useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GlobeHandle } from "@/components/contact/StippleGlobe";

gsap.registerPlugin(ScrollTrigger);

const StippleGlobe = lazy(() => import("@/components/contact/StippleGlobe"));

const PORTRAITS = [
  {
    x: "20%",
    y: "25%",
    flag: "https://flagcdn.com/w80/pk.png",
    country: "Pakistan",
  },
  {
    x: "75%",
    y: "20%",
    flag: "https://flagcdn.com/w80/us.png",
    country: "USA",
  },
  {
    x: "15%",
    y: "65%",
    flag: "https://flagcdn.com/w80/gb.png",
    country: "United Kingdom",
  },
  {
    x: "82%",
    y: "62%",
    flag: "https://flagcdn.com/w80/ae.png",
    country: "UAE",
  },
  {
    x: "50%",
    y: "12%",
    flag: "https://flagcdn.com/w80/ca.png",
    country: "Canada",
  },
];


interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}


export default function Home() {

    const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
const [isReady, setIsReady] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });


  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const screen1Ref = useRef<HTMLDivElement>(null);
  const screen3Ref = useRef<HTMLDivElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const ovalRef = useRef<SVGEllipseElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<Array<SVGLineElement | null>>([]);
  const portraitsRef = useRef<Array<HTMLDivElement | null>>([]);
  const globeApi = useRef<GlobeHandle>(null);




    const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 5000);
    }
  };



 useEffect(() => {
  const ctx = gsap.context(() => {

    // 🔒 FORCE initial hidden state (prevents flash)
    gsap.set(sectionRef.current, { opacity: 0 });

    gsap.set(globeWrapRef.current, {
      scale: 1,
      yPercent: 50,
      xPercent: 18,
    });

    gsap.set(screen1Ref.current, {
  opacity: 1,
  pointerEvents: "auto",
});

    
    gsap.set(screen3Ref.current, {
      opacity: 0,
      y: 40,
      pointerEvents: "none",
    });

    gsap.set(networkRef.current, { opacity: 0 });

    // lines reset
    linesRef.current.forEach((l) => {
      if (!l) return;
      const len = l.getTotalLength?.() || 400;
      gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
    });

    gsap.set(portraitsRef.current, { opacity: 0, scale: 0.6 });

    // ✨ IMPORTANT: reveal ONLY after everything is set
    requestAnimationFrame(() => {
      gsap.to(sectionRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => setIsReady(true),
      });
    });

    // ---------------- YOUR ANIMATION (UNCHANGED) ----------------

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

tl.to(screen1Ref.current, {
  opacity: 0,
  y: -60,
  duration: 0.4,
  ease: "power2.inOut",
  onComplete: () => {
    if (screen1Ref.current) {
      screen1Ref.current.style.pointerEvents = "none";
    }
  }
}, 0)
      .to(globeWrapRef.current, {
        yPercent: 0,
        scale: 2,
        xPercent: 0,
        duration: 0.6,
        ease: "power2.inOut",
      }, 0.1)
      .to(bgRef.current, {
        backgroundColor: "#111111",
        duration: 0.5,
        ease: "none",
      }, 0.1)
      .to(networkRef.current, { opacity: 1, duration: 0.2 }, 0.5)
      .to(linesRef.current, {
        strokeDashoffset: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
      }, 0.55)
      .to(portraitsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(1.6)",
      }, 0.6)
      .to(networkRef.current, { opacity: 0, duration: 0.15 }, 0.82)
      .to(bgRef.current, {
        backgroundColor: "#FFFFFF",
        duration: 0.2,
        ease: "none",
      }, 0.85)
      .to(globeWrapRef.current, {
        scale: 1.3,
        xPercent: 35,
        yPercent: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onUpdate: () => globeApi.current?.setColor(0x000000),
        onReverseComplete: () => globeApi.current?.setColor(0xffffff),
      }, 0.85)
    .to(screen3Ref.current, {
  opacity: 1,
  y: 0,
  duration: 0.3,
  ease: "power2.out",
  onStart: () => {
    if (screen3Ref.current) {
      screen3Ref.current.style.pointerEvents = "auto";
    }
  }
}, 0.9);
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <main className="w-full">


 
   <section
  ref={sectionRef}
  className={`relative h-screen w-full overflow-hidden transition-opacity duration-300 ${
    isReady ? "opacity-100" : "opacity-0"
  }`}
>
        <div ref={bgRef} className="absolute inset-0 bg-background"  />

        {/* Decorative navy dot accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-[#1B2A4A]" />
          <div className="absolute right-[12%] top-[12%] h-5 w-5 rounded-full bg-[#1B2A4A]" />
          <div className="absolute left-[45%] top-[8%] h-2 w-2 rounded-full bg-[#1B2A4A]" />
          <div className="absolute right-[6%] bottom-[28%] h-4 w-4 rounded-full bg-[#1B2A4A]" />
          <div className="absolute left-[5%] bottom-[35%] h-2.5 w-2.5 rounded-full bg-[#1B2A4A]" />
        </div>

        {/* Globe wrapper */}
        <div ref={globeWrapRef} className="absolute inset-0 will-change-transform">
          <Suspense fallback={null}>
            <StippleGlobe ref={globeApi} />
          </Suspense>
        </div>

        {/* Network graph overlay (Screen 2) */}
        <div ref={networkRef} className="pointer-events-none absolute inset-0">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            {PORTRAITS.map((p, i) => (
              <line
                key={i}
                ref={(el) => { linesRef.current[i] = el; }}
                x1="50%"
                y1="50%"
                x2={p.x}
                y2={p.y}
                stroke="#FF2E86"
                strokeWidth="1.5"
              />
            ))}
          </svg>
          {PORTRAITS.map((p, i) => (
           <div
  key={i}
  ref={(el) => { portraitsRef.current[i] = el; }}
  className="absolute h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-xl -translate-x-1/2 -translate-y-1/2"
  style={{ left: p.x, top: p.y }}
>
  <img
    src={p.flag}
    alt={p.country}
    className="h-full w-full object-cover"
  />
</div>
          ))}
        </div>

        {/* Screen 1 — text */}
      <div
  ref={screen1Ref}
  className="relative z-10 mx-auto flex h-full max-w-[90rem] flex-col justify-center px-8 lg:px-16"
>
          <div className="max-w-[90rem] lg:pr-[28rem]">
            
            <p className="mb-6  text-xs font-semibold uppercase tracking-[0.25em] ">
              Connect
            </p>
            <h1 className="text-5xl leading-[1.05]  sm:text-6xl lg:text-7xl" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              We would love to hear from {" "}
            <br/>
              <span className="relative inline-block italic" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.15em" }}>
                you.
                <svg className="absolute -inset-x-6 -inset-y-3 h-[140%] w-[120%]" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <ellipse
                    ref={ovalRef}
                    cx="100"
                    cy="50"
                    rx="92"
                    ry="42"
                    fill="none"
                    stroke="#FF2E86"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </h1>
            <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-105 hover:bg-[#FF2E86] hover:text-white">
              Get in touch
             
            </button>
          </div>
        </div>



        
        {/* Screen 3 — final state */}
   <div
  ref={screen3Ref}
  className="absolute inset-0 z-10 mx-auto flex h-full max-w-[90rem] flex-col justify-center px-4 sm:px-6 lg:px-16 pt-24 sm:pt-28 overflow-y-auto"
>
          
          <div className="max-w-xl mt-6 sm:mt-14">
            <p className="mb-6 sm:mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              Find an office
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-black">
              Send us a message
            </h2>
          </div>

            {/* ── Form ── */}
   <div className="mt-8 sm:mt-12 w-full max-w-xl mx-auto lg:mx-0">
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                    {/* Name & Email */}
                    <div className="grid gap-6 sm:grid-cols-2">

                      {/* Name */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition
                          focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
                        />

                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Email Address *
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition
                          focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
                        />

                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Company & Phone */}
                    <div className="grid gap-6 sm:grid-cols-2">

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Company
                        </label>

                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Company name"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition
                          focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Phone
                        </label>

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 890"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition
                          focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Message *
                      </label>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your project..."
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition
                        focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-black px-6 py-4 text-white font-medium transition
                      hover:bg-gray-900 active:scale-[0.99] disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    <p className="text-center text-xs text-gray-500">
                      We respect your privacy. Your information is secure and we will get back to you within 24 hours.
                    </p>
                  </form>
         </div>
          
        </div>
      </section>

     
    </main>
  );
}