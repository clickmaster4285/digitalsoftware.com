"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
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
  Sparkles,
} from "lucide-react";
import { TubesBackground } from "@/components/ui/neon-flow";
// ============================================================================
// Types
// ============================================================================
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

// ============================================================================
// Animated Card Component (Reusable)
// ============================================================================
const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
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
};

// ============================================================================
// Contact Info Item
// ============================================================================
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
}) => {
  return (
    
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
    >
      
      <div className="p-3 rounded-full bg-[#FF2E86] text-white shadow-md group-hover:scale-110 transition-transform duration-300">
        <Icon size={22} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
          {title}
        </h3>
        {details.map((line, idx) => (
          <p
            key={idx}
            className="text-gray-600 dark:text-gray-300 text-sm mt-1"
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================================
// Floating Background Shapes (Animated)
// ============================================================================
const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-[#FF2E86]/20 dark:bg-[#FF2E86]/10 rounded-full blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF2E86]/20 dark:bg-[#FF2E86]/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#FF2E86]/15 dark:bg-[#FF2E86]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// ============================================================================
// Main Component: AnimatedContactPage
// ============================================================================
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

  // Real-time validation
  const validateField = (name: keyof FormData, value: string): string => {
    if (!value.trim()) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    if (name === "email") {
      const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
    }
    if (name === "name" && value.trim().length < 2) return "Name must be at least 2 characters";
    if (name === "message" && value.trim().length < 10) return "Message must be at least 10 characters";
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
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!validateForm()) return;

    setSubmitStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTouched({ name: false, email: false, subject: false, message: false });
    setErrors({});

    setTimeout(() => {
      setSubmitStatus("idle");
    }, 4000);
  };

  const successControls = useAnimation();
  useEffect(() => {
    if (submitStatus === "success") {
      successControls.start({
        scale: [0.8, 1.2, 1],
        transition: { duration: 0.4 },
      });
    }
  }, [submitStatus, successControls]);

  // Split text for animation
  const contactText = "Contact Us";
  const contactWords = contactText.split(" ");

  return (
    <>
      <TubesBackground>
      <FloatingShapes />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FF2E86]/5 dark:from-gray-950 dark:via-gray-900 dark:to-[#FF2E86]/5 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header with animated text like Hero component */}
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
         

            {/* Animated heading matching Hero style */}
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
                          delay: 0.2 + (wordIndex * 0.1) + (charIndex * 0.03),
                          duration: 0.6,
                          ease: [0.65, 0, 0.35, 1],
                        }}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </span>
                  {wordIndex < contactWords.length - 1 && " "}
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
              className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              Have a project in mind or just want to say hello? We&apos;d love to
              hear from you. Fill out the form and our team will get back within
              24 hours.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* LEFT SIDE: Contact Info Cards */}
            <div className="space-y-6">
              <AnimatedCard delay={0.1} className="space-y-4">
                <div className="bg-white/40 dark:bg-gray-800/30 rounded-2xl p-1 backdrop-blur-sm">
                  <ContactInfoItem
                    icon={Mail}
                    title="Email Us"
                    details={["hello@clickmasters.com", "support@clickmasters.com"]}
                    delay={0.15}
                  />
                  <ContactInfoItem
                    icon={Phone}
                    title="Call Us"
                    details={["+1 (555) 123-4567", "+1 (555) 987-6543"]}
                    delay={0.25}
                  />
                  <ContactInfoItem
                    icon={MapPin}
                    title="Visit Us"
                    details={["123 Innovation Drive, Suite 100", "San Francisco, CA 94103"]}
                    delay={0.35}
                  />
                  <ContactInfoItem
                    icon={Clock}
                    title="Working Hours"
                    details={["Mon - Fri: 9:00 AM - 6:00 PM PST", "Sat - Sun: Closed"]}
                    delay={0.45}
                  />
                </div>
              </AnimatedCard>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-4"
              >
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 font-medium">
                  Connect with us on socials
                </p>
                <div className="flex gap-5">
                  {[
                    { icon: Twitter, label: "Twitter", color: "hover:text-[#FF2E86]" },
                    { icon: Linkedin, label: "LinkedIn", color: "hover:text-[#FF2E86]" },
                    { icon: Github, label: "GitHub", color: "hover:text-[#FF2E86]" },
                  ].map((social, idx) => (
                    <motion.a
                      key={social.label}
                      href="#"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className={`p-3 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-md transition-all duration-200 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon size={22} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: Animated Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white flex items-center gap-2">
                  Send a Message
                
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  We&apos;ll respond as soon as possible
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium tracking-wide text-gray-700 dark:text-gray-200 mb-1">
                    Full Name *
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-[#FF2E86] outline-none ${
                        touched.name && errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-700 focus:border-[#FF2E86]"
                      }`}
                      placeholder="John Carter"
                    />
                  </motion.div>
                  <AnimatePresence>
                    {touched.name && errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle size={12} /> {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium tracking-wide text-gray-700 dark:text-gray-200 mb-1">
                    Email Address *
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-[#FF2E86] outline-none ${
                        touched.email && errors.email
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                      placeholder="hello@example.com"
                    />
                  </motion.div>
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium tracking-wide text-gray-700 dark:text-gray-200 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-[#FF2E86] outline-none ${
                      touched.subject && errors.subject
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                    placeholder="Project inquiry / Support"
                  />
                  <AnimatePresence>
                    {touched.subject && errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.subject}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium tracking-wide text-gray-700 dark:text-gray-200 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-[#FF2E86] outline-none resize-none ${
                      touched.message && errors.message
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                    placeholder="Tell us about your project..."
                  />
                  <AnimatePresence>
                    {touched.message && errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-xs mt-1"
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full mt-4 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    submitStatus === "loading"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#FF2E86] hover:bg-[#e6287a] hover:shadow-[#FF2E86]/25"
                  }`}
                >
                  {submitStatus === "loading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
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

                {/* Success / error banner */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm flex items-center gap-2 border border-green-200 dark:border-green-800"
                    >
                      <CheckCircle size={16} /> Thanks for reaching out! We'll be in touch shortly.
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm"
                    >
                      Something went wrong. Please try again later.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-gray-400 dark:text-gray-500 mt-12"
          >
            © 2025 Clickmasters Digital Marketing — All rights reserved. We respect your privacy.
          </motion.div>
        </div>
      </div>
   </TubesBackground>
    </>
  );
}