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


import { FlipContactCard, AnimatedForm } from "@/components/contact/contactForm";
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

  setTouched({
    name: true,
    email: true,
    subject: true,
    message: true,
  });

  if (!validateForm()) return;

  try {
    setSubmitStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitStatus("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } else {
      setSubmitStatus("error");
    }
  } catch (err) {
    console.error(err);
    setSubmitStatus("error");
  }

  setTimeout(() => {
    setSubmitStatus("idle");
  }, 4000);
  };
  
  
  useEffect(() => {
    if (submitStatus === "success") {
      successControls.start({ scale: [0.8, 1.2, 1], transition: { duration: 0.4 } });
    }
  }, [submitStatus, successControls]);

  const contactWords = "Contact Us".split(" ");

  return (
    <>
       <TubesBackground >
    <Navbar/>
   
      {/* <FloatingShapes /> */}
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
       </TubesBackground >
</>

);
}