'use client';

import { useEffect, useRef, lazy, Suspense, useState } from "react";
import { gsap } from "gsap";
import { Navbar } from "@/components/site/Navbar";

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

const StippleGlobe = lazy(() => import("@/components/contact/StippleGlobe"));

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const globeWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(globeWrapRef.current, {
        xPercent: -45,
        opacity: 0.25,
        scale: 0.95,
        transformOrigin: "50% 50%",
      });
      gsap.set(textRef.current, { x: -60, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(globeWrapRef.current, {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 2.2,
      })
        .to(textRef.current, { x: 0, opacity: 1, duration: 1.4 }, "-=1.8")
        .to(globeWrapRef.current, {
          xPercent: 6,
          duration: 6,
          ease: "sine.inOut",
        });
    });

    return () => ctx.revert();
  }, []);

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

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen w-full overflow-x-hidden"
        style={{ backgroundColor: "#0b0f1a" }}
      >
        <div className="mx-auto w-full max-w-[95rem] px-4 sm:px-6 lg:px-8">
          {/*
           * Layout:
           *  mobile  → single column, form only (globe hidden)
           *  lg+     → two-column grid with globe on the right
           */}
          <section className="relative mx-auto flex min-h-screen flex-col items-center justify-center py-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:py-20">

            {/* ── LEFT — heading + form ── */}
            <div className="relative w-full">
              {/* Decorative blurs — toned down on mobile */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl sm:h-96 sm:w-96" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl sm:h-96 sm:w-96" />

              <div className="relative z-10">
                <div ref={textRef} className="relative z-10 will-change-transform">
                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                      Find an office
                    </p>
                  </div>

                  {/* Heading — smaller on mobile, large on desktop */}
                  <h1
                    className="mb-8 text-center text-3xl font-black leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-left lg:text-6xl xl:text-7xl"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    We would love to
                    <span className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                      hear from you
                    </span>
                  </h1>
                </div>

                {/* ── Form ── */}
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                  {/* Name & Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="group">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-white/70 transition-colors group-focus-within:text-white"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        /*
                         * text-base (16 px) prevents iOS Safari from auto-zooming
                         * min-h-[48px] ensures comfortable touch targets
                         */
                        className="min-h-[48px] w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base text-white transition-all duration-200 placeholder:text-white/25 focus:border-white/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1.5 flex items-center gap-1 text-sm text-red-400">
                          <span className="text-xs">⚠️</span> {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-white/70 transition-colors group-focus-within:text-white"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        inputMode="email"
                        className="min-h-[48px] w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base text-white transition-all duration-200 placeholder:text-white/25 focus:border-white/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1.5 flex items-center gap-1 text-sm text-red-400">
                          <span className="text-xs">⚠️</span> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="group">
                      <label
                        htmlFor="company"
                        className="mb-2 block text-sm font-medium text-white/70 transition-colors group-focus-within:text-white"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        autoComplete="organization"
                        className="min-h-[48px] w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base text-white transition-all duration-200 placeholder:text-white/25 focus:border-white/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-white/70 transition-colors group-focus-within:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        inputMode="tel"
                        className="min-h-[48px] w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base text-white transition-all duration-200 placeholder:text-white/25 focus:border-white/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-white/70 transition-colors group-focus-within:text-white"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      /* 4 rows on mobile, 5 on larger screens */
                      rows={4}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base text-white transition-all duration-200 placeholder:text-white/25 focus:border-white/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 sm:rows-5"
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && (
                      <p className="mt-1.5 flex items-center gap-1 text-sm text-red-400">
                        <span className="text-xs">⚠️</span> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Status Message */}
                  {submitStatus.type && (
                    <div
                      className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
                        submitStatus.type === "success"
                          ? "border border-green-500/30 bg-green-500/10 text-green-400"
                          : "border border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="flex-1">{submitStatus.message}</span>
                    </div>
                  )}

                  {/* Submit — full-width on all sizes, min 56 px tall for thumbs */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-white to-white/90 px-6 py-4 text-base font-semibold text-[#0b0f1a] transition-all duration-300 hover:shadow-lg hover:shadow-white/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 min-h-[52px]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-xs text-white/40 lg:text-left">
                    We'll never share your information with third parties
                  </p>
                </form>
              </div>
            </div>

            {/* ── RIGHT — globe (desktop only) ── */}
            {/*
             * Hidden on mobile with `hidden lg:block` so it doesn't consume
             * layout space or render unnecessarily on small screens.
             */}
            <div className="hidden lg:relative lg:block lg:h-[700px] lg:w-auto">
              <div
                ref={globeWrapRef}
                className="absolute inset-0 will-change-transform"
              >
                <Suspense fallback={null}>
                  <StippleGlobe />
                </Suspense>
              </div>
            </div>

          </section>
        </div>
      </main>
    </>
  );
}