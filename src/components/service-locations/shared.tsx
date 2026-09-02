"use client";

// src/components/service-locations/shared.tsx
// Building blocks shared by the Service Locations hub and the per-city pages.
// Design tokens intentionally mirror src/app/[services]/page.tsx so the whole
// service section of the site feels like one system.

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Search,
  TrendingUp,
  Palette,
  PenTool,
  Mail,
  Bot,
  ShoppingCart,
  Share2,
  Globe,
  Code2,
  BarChart3,
  Smartphone,
  Target,
  Sparkles,
  Settings2,
  Users,
  MessageSquare,
  Clock,
  KeyRound,
  LineChart,
  UserPlus,
  Wallet,
  Building2,
  Scale,
  Wrench,
  Home,
  Utensils,
  Stethoscope,
  Bug,
  Eye,
  Radar,
  KeySquare,
  Check,
  type LucideIcon,
} from "lucide-react";

/* ---------------- Motion helpers ---------------- */

export const Reveal = ({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionLabel = ({ n, t }: { n: string; t: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">
      [ {n} ]
    </span>
    <span className="h-px w-10 bg-foreground/30" />
    <span className="text-[10px] uppercase tracking-[0.4em] opacity-60">{t}</span>
  </div>
);

/* ---------------- Icon lookup (location data stores icon names as strings) ---------------- */

const ICONS: Record<string, LucideIcon> = {
  Search,
  TrendingUp,
  Palette,
  PenTool,
  Mail,
  Bot,
  ShoppingCart,
  Share2,
  Globe,
  Code2,
  BarChart3,
  Smartphone,
  Target,
  MapPin,
  Settings2,
  Users,
  MessageSquare,
  Clock,
  KeyRound,
  LineChart,
  UserPlus,
  Wallet,
  Building2,
  Scale,
  Wrench,
  Home,
  Utensils,
  Stethoscope,
  Bug,
  Eye,
  Radar,
  KeySquare,
  Check,
};

export const iconFor = (name?: string): LucideIcon => ICONS[name ?? ""] ?? Sparkles;

/* ---------------- Latest Locations cards ---------------- */

export interface SubLocationCard {
  href: string;
  city: string;
  state: string;
  title: string;
  description: string;
}

/**
 * Card grid that lists the newest service-location sub pages.
 * Used with 9 cards on the hub page and 6 on each city page.
 */
export const LatestLocationsGrid = ({ items }: { items: SubLocationCard[] }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {items.map((item, idx) => (
      <Reveal key={item.href} delay={idx * 0.06}>
        <Link
          href={item.href}
          className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-[#FF2E86]/50 hover:bg-white/[0.05] hover:-translate-y-1.5"
        >
          {/* soft glow on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#FF2E86]/20 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="relative flex items-center justify-between mb-7">
            <span className="grid place-items-center w-11 h-11 rounded-full bg-[#FF2E86]/10 text-[#FF2E86] transition-transform duration-300 group-hover:scale-110">
              <MapPin className="w-5 h-5" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 border border-white/10 rounded-full px-3 py-1.5">
              {item.state}
            </span>
          </div>

          <div className="relative flex-1">
            <h3 className="font-display text-3xl leading-tight mb-3">
              {item.title}
            </h3>
            <p className="text-sm opacity-70 leading-relaxed line-clamp-3">
              {item.description}
            </p>
          </div>

          <div className="relative mt-7 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF2E86]">
              Explore {item.city}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">
              New
            </span>
          </div>
        </Link>
      </Reveal>
    ))}
  </div>
);
