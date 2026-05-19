"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";

import type { AnimationControls } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export type SubmitStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

/* -------------------------------------------------------------------------- */
/*                                INPUT STYLES                                */
/* -------------------------------------------------------------------------- */

const inputBase =
  "w-full px-4 py-3 rounded-xl border bg-white/10 text-white placeholder:text-white/40 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-[#FF2E86] outline-none";

const inputNormal =
  "border-white/20 focus:border-[#FF2E86]";

const inputError =
  "border-red-500 focus:ring-red-500";

/* -------------------------------------------------------------------------- */
/*                              FLIP CONTACT CARD                             */
/* -------------------------------------------------------------------------- */

export const FlipContactCard = ({
  icon: Icon,
  title,
  details,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  details: string[];
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <div
      ref={ref}
      className="w-full"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        className="relative w-full h-[110px]"
        initial={{ rotateY: 0 }}
        animate={isInView ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.23, 0.84, 0.32, 1],
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
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

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF2E86]/15 to-[#FF2E86]/5 backdrop-blur-sm border border-[#FF2E86]/30 p-4 flex items-start gap-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="p-3 rounded-full bg-white text-[#FF2E86] shadow-md shrink-0">
            <Icon size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-[#FF2E86] text-base">
              {title}
            </h3>

            {details.map((line, idx) => (
              <p
                key={idx}
                className="text-white/70 text-sm mt-0.5"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               ANIMATED FORM                                */
/* -------------------------------------------------------------------------- */

interface AnimatedFormProps {
  formData: FormData;
  errors: FormErrors;
  touched: Record<keyof FormData, boolean>;
  submitStatus: SubmitStatus;

  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;

  handleBlur: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;

  handleSubmit: (e: React.FormEvent) => void;

  successControls: AnimationControls;

formRef: React.RefObject<HTMLFormElement>;
}

export const AnimatedForm = ({
  formData,
  errors,
  touched,
  submitStatus,
  handleChange,
  handleBlur,
  handleSubmit,
  successControls,
  formRef,
}: AnimatedFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [showContent, setShowContent] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px",
  });

  useEffect(() => {
    if (isInView) {
      const expandTimer = setTimeout(
        () => setIsExpanded(true),
        100
      );

      const contentTimer = setTimeout(
        () => setShowContent(true),
        800
      );

      return () => {
        clearTimeout(expandTimer);
        clearTimeout(contentTimer);
      };
    }
  }, [isInView]);

  return (
<motion.div
  ref={containerRef}
  className="relative z-20 pointer-events-auto bg-black/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
  initial={{ scale: 0, opacity: 0 }}
  animate={isExpanded ? { scale: 1, opacity: 1 } : {}}
>
      {/* BORDER */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <motion.rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx="16"
          fill="none"
          stroke="#FF2E86"
          strokeWidth="2"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                  pathLength: 1,
                  opacity: 1,
                }
              : {}
          }
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
        />
      </svg>

      {/* FORM */}
      <motion.div
        className="p-6 sm:p-8"
        initial={{ opacity: 0 }}
        animate={
          showContent
            ? { opacity: 1 }
            : { opacity: 0 }
        }
      >
        <h2 className="text-2xl font-semibold text-white mb-6">
          Send a Message
        </h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${
              touched.name && errors.name
                ? inputError
                : inputNormal
            }`}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${
              touched.email && errors.email
                ? inputError
                : inputNormal
            }`}
          />

          {/* SUBJECT */}
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${
              touched.subject && errors.subject
                ? inputError
                : inputNormal
            }`}
          />

          {/* MESSAGE */}
          <textarea
            rows={4}
            name="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} resize-none ${
              touched.message && errors.message
                ? inputError
                : inputNormal
            }`}
          />

          {/* ERROR */}
          <AnimatePresence>
            {Object.values(errors).some(Boolean) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle size={16} />
                Please fix form errors
              </motion.div>
            )}
          </AnimatePresence>

          {/* BUTTON */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={submitStatus === "loading"}
            className="w-full py-3 rounded-xl bg-[#FF2E86] hover:bg-[#e02878] transition-all text-white font-semibold flex items-center justify-center gap-2"
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
                  className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                />
                Sending...
              </>
            ) : submitStatus === "success" ? (
              <motion.div
                animate={successControls}
                className="flex items-center gap-2"
              >
                <CheckCircle size={18} />
                Sent Successfully
              </motion.div>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};