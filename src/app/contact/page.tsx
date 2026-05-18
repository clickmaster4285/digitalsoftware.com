"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { TubesBackground } from "@/components/ui/neon-flow";
import { Navbar } from "@/components/site/Navbar";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Animated Card ────────────────────────────────────────────────────────────
const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── Contact Info Item ────────────────────────────────────────────────────────
const ContactInfoItem = ({
  icon: Icon,
  title,
  details,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  details: string[];
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 group mb-3"
  >
    <div className="p-3 rounded-full bg-[#FF2E86] text-white shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <h3 className="font-semibold text-white text-base">{title}</h3>
      {details.map((line, idx) => (
        <p key={idx} className="text-white/60 text-sm mt-0.5">
          {line}
        </p>
      ))}
    </div>
  </motion.div>
);

// ─── Floating Background Shapes ───────────────────────────────────────────────
const FloatingShapes = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-20 left-10 w-72 h-72 bg-[#FF2E86]/20 rounded-full blur-3xl"
      animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF2E86]/20 rounded-full blur-3xl"
      animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
    <motion.div
      className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#FF2E86]/15 rounded-full blur-3xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// ─── Input wrapper ────────────────────────────────────────────────────────────
const inputBase =
  "w-full px-4 py-3 rounded-xl border bg-white/10 text-white placeholder:text-white/40 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-[#FF2E86] outline-none";
const inputNormal = "border-white/20 focus:border-[#FF2E86]";
const inputError = "border-red-500 focus:ring-red-500";


// ─── Flip Card Component for Contact Info ─────────────────────────────────────

const FlipContactCard = ({
  icon: Icon,
  title,
  details,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  details: string[];
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="w-full" style={{ perspective: "1400px" }}>
      <motion.div
        className="relative w-full h-[110px]"
        initial={{ rotateY: 0 }}
        animate={isInView ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.23, 0.84, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
  <div
          className="absolute inset-0 rounded-xl bg-black/80 backdrop-blur-sm border border-white/10 p-4 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-2">
            <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            {title}
          </p>
          <p className="text-[8px] tracking-[0.2em] text-white/20 mt-1">
            scroll to reveal →
          </p>
        </div>

        {/* Back - SAME CONTENT, different style */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF2E86]/15 to-[#FF2E86]/5 backdrop-blur-sm border border-[#FF2E86]/30 p-4 flex items-start gap-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="p-3 rounded-full bg-white text-[#FF2E86] shadow-md shrink-0">
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-[#FF2E86] text-base">{title}</h3>
            {details.map((line, idx) => (
              <p key={idx} className="text-white/70 text-sm mt-0.5">
                {line}
              </p>
            ))}
          </div>
          <div className="absolute bottom-2 right-3 text-[8px] tracking-[0.2em] opacity-40 text-white/50">
            flip back
          </div>
        </div>
      </motion.div>
    </div>
  );
};


// ─── Animated Form Component with Draw Border + Expand from Center ───────────
// ─── Animated Form Component - Same style as left side flip cards ───────────
const AnimatedForm = ({
  formData,
  errors,
  touched,
  submitStatus,
  handleChange,
  handleBlur,
  handleSubmit,
  successControls,
  formRef,
}: {
  formData: FormData;
  errors: FormErrors;
  touched: Record<keyof FormData, boolean>;
  submitStatus: SubmitStatus;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  successControls: any;
  formRef: React.RefObject<HTMLFormElement>;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const expandTimer = setTimeout(() => setIsExpanded(true), 100);
      const contentTimer = setTimeout(() => setShowContent(true), 800);
      return () => {
        clearTimeout(expandTimer);
        clearTimeout(contentTimer);
      };
    }
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={isExpanded ? { scale: 1, opacity: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      }}
      className="relative bg-black/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {/* Animated Border - draws itself like the cards */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <motion.rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx="16"
          fill="none"
          stroke="#FF2E86"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Front - Black/Hidden state (like left cards front) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
        initial={{ opacity: 1 }}
        animate={showContent ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-4">
          <motion.div 
            className="w-4 h-4 rounded-full bg-white/20"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          Contact Form
        </p>
        <p className="text-[8px] tracking-[0.2em] text-white/20 mt-2">
          scroll to reveal →
        </p>
      </motion.div>

      {/* Back - Actual Form Content (like left cards back) */}
      <motion.div
        className="p-6 sm:p-8"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-6">
          <h2 className="font-semibold text-white text-2xl">Send a Message</h2>
          <p className="text-white/50 text-sm mt-1">
            We'll respond as soon as possible
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${
                touched.name && errors.name ? inputError : inputNormal
              }`}
              placeholder="John Carter"
            />
            <AnimatePresence>
              {touched.name && errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} /> {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${
                touched.email && errors.email ? inputError : inputNormal
              }`}
              placeholder="hello@example.com"
            />
            <AnimatePresence>
              {touched.email && errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${
                touched.subject && errors.subject ? inputError : inputNormal
              }`}
              placeholder="Project inquiry / Support"
            />
            <AnimatePresence>
              {touched.subject && errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.subject}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Message *
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} resize-none ${
                touched.message && errors.message ? inputError : inputNormal
              }`}
              placeholder="Tell us about your project..."
            />
            <AnimatePresence>
              {touched.message && errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={submitStatus === "loading"}
            whileHover={{ scale: submitStatus === "loading" ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full mt-4 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              submitStatus === "loading"
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#FF2E86] hover:bg-[#e6287a]"
            }`}
          >
            {submitStatus === "loading" ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Sending…
              </>
            ) : submitStatus === "success" ? (
              <motion.div
                animate={successControls}
                className="flex items-center gap-2"
              >
                <CheckCircle size={20} /> Message Sent!
              </motion.div>
            ) : submitStatus === "error" ? (
              <>Error! Try again</>
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 p-3 rounded-xl bg-green-500/20 text-green-300 text-sm flex items-center gap-2 border border-green-500/30"
              >
                <CheckCircle size={16} /> Thanks for reaching out!
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 p-3 rounded-xl bg-red-500/20 text-red-300 text-sm border border-red-500/30"
              >
                Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* Pink glow during expansion (matches left cards style) */}
      <motion.div
        initial={{ opacity: 0.6, scale: 1 }}
        animate={isExpanded ? { opacity: 0, scale: 3 } : {}}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[#FF2E86] rounded-full pointer-events-none"
        style={{ filter: "blur(40px)" }}
      />
      
      {/* Flip back hint */}
      <motion.div
        className="absolute bottom-2 right-3 text-[8px] tracking-[0.2em] opacity-40 text-white/50"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 0.4 } : { opacity: 0 }}
      >
        flip back
      </motion.div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AnimatedContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const successControls = useAnimation();

  const validateField = (name: keyof FormData, value: string): string => {
    if (!value.trim())
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    if (name === "email") {
      const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
    }
    if (name === "name" && value.trim().length < 2)
      return "Name must be at least 2 characters";
    if (name === "message" && value.trim().length < 10)
      return "Message must be at least 10 characters";
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name as keyof FormData, value),
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as keyof FormData, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!validateForm()) return;

    setSubmitStatus("loading");
    await new Promise((r) => setTimeout(r, 1600));
    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTouched({ name: false, email: false, subject: false, message: false });
    setErrors({});
    setTimeout(() => setSubmitStatus("idle"), 4000);
  };

  useEffect(() => {
    if (submitStatus === "success") {
      successControls.start({ scale: [0.8, 1.2, 1], transition: { duration: 0.4 } });
    }
  }, [submitStatus, successControls]);

  const contactWords = "Contact Us".split(" ");

  return (
    <>
    <Navbar/>
    <TubesBackground className="min-h-screen">
      <FloatingShapes />
      <div className="min-h-screen py-16 mt-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight">
              {contactWords.map((word, wordIndex) => (
                <React.Fragment key={wordIndex}>
                  <span className="inline-flex overflow-hidden">
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.2 + wordIndex * 0.1 + charIndex * 0.03,
                          duration: 0.6,
                          ease: [0.65, 0, 0.35, 1],
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  {wordIndex < contactWords.length - 1 && "\u00A0"}
                </React.Fragment>
              ))}
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-1 bg-[#FF2E86] rounded-full mx-auto mt-5"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 text-white/60 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              Have a project in mind or just want to say hello? We&apos;d love to
              hear from you. Fill out the form and our team will get back within
              24 hours.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
{/* ── Left: Flip Cards (same content both sides) ── */}
<div className="space-y-3">
  <FlipContactCard
    icon={Mail}
    title="Email Us"
    details={["hello@clickmasters.com", "support@clickmasters.com"]}
    delay={0.1}
  />
  <FlipContactCard
    icon={Phone}
    title="Call Us"
    details={["+1 (555) 123-4567", "+1 (555) 987-6543"]}
    delay={0.2}
  />
  <FlipContactCard
    icon={MapPin}
    title="Visit Us"
    details={[
      "123 Innovation Drive, Suite 100",
      "San Francisco, CA 94103",
    ]}
    delay={0.3}
  />
  <FlipContactCard
    icon={Clock}
    title="Working Hours"
    details={[
      "Mon – Fri: 9:00 AM – 6:00 PM PST",
      "Sat – Sun: Closed",
    ]}
    delay={0.4}
  />
</div>
            {/* ── Right: Form ── */}
       
<AnimatedForm
  formData={formData}
  errors={errors}
  touched={touched}
  submitStatus={submitStatus}
  handleChange={handleChange}
  handleBlur={handleBlur}
  handleSubmit={handleSubmit}
  successControls={successControls}
  formRef={formRef}
/>
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-white/30 mt-12"
          >
            © 2025 Clickmasters Digital Marketing — All rights reserved. We
            respect your privacy.
          </motion.div>
        </div>
      </div>
    </TubesBackground>
</>

);
}