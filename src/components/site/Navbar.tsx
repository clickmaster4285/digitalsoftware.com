"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Youtube, Code2, Wrench, Palette, Search, Smartphone,
  LayoutGrid, PenTool, Megaphone, TrendingUp, Globe, ChevronDown,
  FileText, Mail, MapPin, Star, Link2, Mic, Radio, Building2,
  UtensilsCrossed, Hotel, Stethoscope, Scale, Sparkles, Users,
  BarChart3, Bot, Image as ImageIcon, Cpu, Tag, Store, Briefcase,
  Linkedin, Repeat, ScrollText, BookOpen, Brain, Headset, GraduationCap,
  DollarSign, Landmark, Car, Plug, ShieldCheck, Database, Boxes, Network,
  Rss, Info, Briefcase as BriefcaseIcon, Plane, Quote, Trophy, Heart,
  Package, Layers, Map, ExternalLink, Menu, X, ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";

type Service = { name: string; desc: string; icon: any; href?: string };

const groups: { title: string; items: Service[] }[] = [
  {
    title: "Web & Development",
    items: [
      { name: "Website Development", desc: "Fast, scalable sites", icon: Code2, href: "/website-development-services" },
      { name: "Web App Development", desc: "Powerful web apps", icon: LayoutGrid, href: "/web-application-development" },
      { name: "Website Maintenance", desc: "24/7 care & updates", icon: Wrench, href: "/website-maintenance-services" },
      { name: "Custom Software Development", desc: "Tailored systems", icon: Boxes, href: "/custom-software-development" },
      { name: "WooCommerce Development", desc: "Stores that convert", icon: ShoppingBag, href: "/woocommerce-development-services" },
      { name: "Shopify Development", desc: "High-converting Shopify", icon: Store, href: "/shopify-development-services" },
      { name: "Ecommerce Development", desc: "Full ecommerce builds", icon: Package, href: "/ecommerce-development-services" },
      { name: "Mobile App Development", desc: "iOS & Android", icon: Smartphone, href: "/mobile-app-development" },
      { name: "IoT Development", desc: "Connected devices", icon: Cpu, href: "/iot-development-services" },
      { name: "API Development & Integration", desc: "Connect everything", icon: Plug, href: "/api-development-integration-services" },
      { name: "CRM Integration", desc: "Sales-ready data", icon: Network, href: "/crm-integration-services" },
      { name: "ADA Compliance & Accessibility", desc: "Inclusive web", icon: ShieldCheck, href: "/ada-compliance-web-accessibility" },
      { name: "AR / VR Development", desc: "Immersive experiences", icon: Layers, href: "/ar-vr-development-services" },
    ],
  },
  {
    title: "AI & Data",
    items: [
      { name: "AI / ML Development", desc: "Custom AI models", icon: Brain, href: "/ai-ml-development-services" },
      { name: "AI Automation", desc: "Automate workflows", icon: Bot, href: "/ai-automation-services" },
      { name: "AI Personalization", desc: "1:1 experiences", icon: Sparkles, href: "/ai-personalization-services" },
      { name: "Data Analytics & Reporting", desc: "Insights that ship", icon: Database, href: "/data-analytics-reporting" },
      { name: "Marketing Attribution", desc: "Measure what matters", icon: BarChart3, href: "/marketing-attribution-services" },
      { name: "Marketing Automation", desc: "Always-on funnels", icon: Bot, href: "/marketing-automation-services" },
    ],
  },
  {
    title: "Design",
    items: [
      { name: "Web Design", desc: "Modern web design", icon: Palette, href: "/web-design-services" },
      { name: "UI / UX Design", desc: "Pixel-perfect UX", icon: LayoutGrid, href: "/ui-ux-design-services" },
      { name: "Graphic Design", desc: "On-brand visuals", icon: ImageIcon, href: "/graphic-design-services" },
      { name: "Logo Design", desc: "Memorable brand marks", icon: Sparkles, href: "/logo-design-services" },
      { name: "Landing Page Design", desc: "High-converting pages", icon: PenTool, href: "/landing-page-design-services" },
      { name: "Infographic Design", desc: "Visual storytelling", icon: ImageIcon, href: "/infographic-design-services" },
    ],
  },
  {
    title: "SEO",
    items: [
      { name: "SEO Services", desc: "Rank higher", icon: Search, href: "/seo-services-usa" },
      { name: "Ecommerce SEO", desc: "Product-page rankings", icon: ShoppingBag, href: "/ecommerce-seo-services" },
      { name: "YouTube SEO", desc: "Boost video reach", icon: Youtube, href: "/youtube-seo-services" },
      { name: "Off-Page SEO & Linkbuilding", desc: "Authority backlinks", icon: Link2, href: "/off-page-seo-link-building" },
      { name: "White Label SEO", desc: "Agency-ready SEO", icon: Tag, href: "/white-label-seo" },
      { name: "Schema Markup", desc: "Structured data", icon: ScrollText, href: "/schema-markup-services" },
      { name: "Voice Search Optimization", desc: "Voice-first SEO", icon: Mic, href: "/voice-search-optimization" },
      { name: "SEO Automation", desc: "Scale workflows", icon: Bot, href: "/seo-automation-services" },
      { name: "Citation Building", desc: "Local listings", icon: MapPin, href: "/citation-building-services" },
      { name: "Local SEO", desc: "Map-pack rankings", icon: Map, href: "/local-seo-services" },
      { name: "Guest Posting", desc: "Editorial placements", icon: FileText, href: "/guest-posting-services" },
      { name: "SEO Glossary", desc: "Learn the terms", icon: BookOpen, href: "/seo-glossary" },
    ],
  },
  {
    title: "Marketing & Ads",
    items: [
      { name: "Social Media Marketing", desc: "Brand campaigns", icon: Megaphone, href: "/social-media-marketing-services" },
      { name: "Social Media Strategy", desc: "Consulting & planning", icon: BarChart3, href: "/social-media-strategy-consulting" },
      { name: "Social Media Content", desc: "Daily creative", icon: PenTool, href: "/social-media-content-services" },
      { name: "PPC Management", desc: "Profitable paid ads", icon: TrendingUp, href: "/ppc-management" },
      { name: "LinkedIn Ads", desc: "B2B at scale", icon: Linkedin, href: "/linkedin-ads" },
      { name: "Email Marketing", desc: "Convert your list", icon: Mail, href: "/email-marketing" },
      { name: "Content Marketing", desc: "Stories that sell", icon: PenTool, href: "/content-marketing" },
      { name: "Ecommerce Marketing", desc: "Scale online stores", icon: ShoppingBag, href: "/ecommerce-marketing" },
      { name: "Amazon Marketing", desc: "Win on Amazon", icon: Package, href: "/amazon-marketing" },
      { name: "Amazon FBA Marketing", desc: "FBA growth", icon: Package, href: "/amazon-fba-marketing" },
      { name: "Remarketing & Retargeting", desc: "Win back visitors", icon: Repeat, href: "/remarketing-retargeting" },
      { name: "Online Reputation Mgmt", desc: "Protect your brand", icon: Star, href: "/online-reputation-mgmt" },
      { name: "PR & Media Outreach", desc: "Press coverage", icon: Radio, href: "/pr-media-outreach" },
      { name: "Podcast Marketing", desc: "Audio reach", icon: Mic, href: "/podcast-marketing" },
      { name: "Newsletter", desc: "Owned audience", icon: Mail, href: "/newsletter" },
    ],
  },
  {
    title: "Industry Solutions",
    items: [
      { name: "SaaS Digital Marketing", desc: "Growth for SaaS", icon: BriefcaseIcon , href: "/industries-saas/" },
      { name: "Real Estate Marketing", desc: "Listings & leads", icon: Building2, href: "/real-estate-marketing-services" },
      { name: "Real Estate Digital", desc: "Full-funnel realty", icon: Building2 },
      { name: "Restaurant Marketing", desc: "Drive bookings", icon: UtensilsCrossed },
      { name: "Hospitality & Hotels", desc: "Guest growth", icon: Hotel },
      { name: "Healthcare Digital", desc: "Patient acquisition", icon: Stethoscope },
      { name: "Dental Marketing", desc: "Fill the chair", icon: Heart },
      { name: "MedSpa Marketing", desc: "Treatment funnels", icon: Sparkles },
      { name: "Legal Digital Marketing", desc: "Cases that close", icon: Scale },
      { name: "Finance Digital Marketing", desc: "FinServ growth", icon: DollarSign },
      { name: "Financial Services Marketing", desc: "Trusted finance brands", icon: Landmark },
      { name: "Education Marketing", desc: "Enrollments & leads", icon: GraduationCap },
      { name: "Education Services Marketing", desc: "EdTech growth", icon: GraduationCap },
      { name: "Automotive Digital", desc: "Drive showroom traffic", icon: Car },
    ],
  },
  {
    title: "Locations",
    items: [
      { name: "Agency · San Francisco", desc: "Bay Area team", icon: MapPin },
      { name: "Agency · Los Angeles", desc: "LA studio", icon: MapPin },
      { name: "Agency · Seattle", desc: "PNW HQ", icon: MapPin },
      { name: "Agency · Portland", desc: "Portland office", icon: MapPin },
      { name: "Agency · Phoenix", desc: "Arizona team", icon: MapPin },
      { name: "Agency · Denver", desc: "Mile-high crew", icon: MapPin },
      { name: "Agency · Austin", desc: "Texas talent", icon: MapPin },
      { name: "Agency · Chicago", desc: "Midwest reach", icon: MapPin },
      { name: "Agency · Minneapolis", desc: "Twin Cities", icon: MapPin },
      { name: "Agency · Atlanta", desc: "Southeast hub", icon: MapPin },
      { name: "Agency · Boston", desc: "Northeast team", icon: MapPin },
      { name: "Agency · Miami", desc: "Florida studio", icon: MapPin },
      { name: "Agency · Canada", desc: "Coast to coast", icon: MapPin },
      { name: "Agency · Dubai", desc: "MENA region", icon: Plane },
      { name: "Agency · Australia", desc: "APAC team", icon: Plane },
    ],
  },
  {
    title: "Products",
    items: [
      { name: "CLICK Growth System", desc: "Our growth OS", icon: TrendingUp, href: "/click-growth-system" },
      { name: "ClickPOS", desc: "Point of sale", icon: Store, href: "/clickpos" },
      { name: "ClickCare HMS", desc: "Hospital mgmt", icon: Headset, href: "/clickcare-hms" },
    ],
  },
  {
    title: "Company & Resources",
    items: [
      { name: "About Us", desc: "Who we are", icon: Info, href: "/about-us" },
      { name: "Our Team", desc: "Meet the studio", icon: Users, href: "/our-team" },
      { name: "Careers", desc: "Join the team", icon: BriefcaseIcon, href: "/careers" },
      { name: "Case Studies", desc: "Proven results", icon: Trophy, href: "/case-studies" },
      { name: "Blog & Resources", desc: "Latest insights", icon: Rss, href: "/blog" },
      { name: "White Paper Writing", desc: "Authority content", icon: FileText, href: "/white-paper-writing" },
      { name: "Digital Marketing Glossary", desc: "Learn the terms", icon: BookOpen, href: "/digital-marketing-glossary" },
      { name: "Testimonials", desc: "What clients say", icon: Quote, href: "/testimonials" },
    ],
  },
];

const links = [
  { label: "Services", hasMenu: true },
  { label: "Solutions", hasMenu: false },
   { label: "About", hasMenu: false },
  { label: "Pricing", hasMenu: false },
  { label: "Process", hasMenu: false },
  { label: "Testimonials", hasMenu: false },
  { label: "Contact", hasMenu: false, href: "/contact" },
];

// ─── Desktop Mega Menu ───────────────────────────────────────────────────────
const MegaMenu = ({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const menuContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "-50%", y: -10, scale: 0.98 }}
          animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
          exit={{ opacity: 0, x: "-50%", y: -10, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          className="fixed left-1/2 top-[5.15rem] z-50 hidden w-[min(96vw,72rem)] pt-3 lg:block"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-background/95 backdrop-blur-2xl shadow-2xl max-w-6xl mx-auto">
            <div className="grid grid-cols-12 gap-4 p-5">
              {/* Category rail */}
              <div className="col-span-3 rounded-2xl bg-foreground/10 p-3 flex flex-col gap-1">
                {groups.map((g, i) => (
                  <button
                    key={g.title}
                    onMouseEnter={() => setActiveGroup(i)}
                    onClick={() => setActiveGroup(i)}
                    className={`relative text-left text-sm px-3 py-2.5 rounded-xl transition-colors ${
                      activeGroup === i ? "bg-foreground text-background" : "hover:bg-background"
                    }`}
                  >
                    {activeGroup === i && (
                      <motion.span
                        layoutId="menu-pill"
                        className="absolute inset-0 rounded-xl bg-foreground -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative flex items-center justify-between">
                      {g.title}
                      <span className="text-[10px] opacity-60">{g.items.length}</span>
                    </span>
                  </button>
                ))}
                <a
                  href="/contact"
                  className="mt-auto inline-flex items-center justify-between gap-2 text-sm font-medium px-3 py-3 rounded-xl bg-foreground text-background group"
                >
                  Get a quote
                  <span className="transition-transform group-hover:translate-x-1">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </a>
              </div>

              {/* Services grid */}
              <div className="col-span-9 max-h-[68vh] overflow-y-auto pr-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeGroup}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-2 xl:grid-cols-3 gap-2"
                  >
                    {groups[activeGroup].items.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.a
                          key={s.name}
                          href={s.href ?? "#services"}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.03 + i * 0.025, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ y: -2 }}
                          className="group relative rounded-xl p-3 hover:bg-muted/60 transition-colors flex items-start gap-3 border border-transparent hover:border-border"
                        >
                          <div className="shrink-0 w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">{s.name}</div>
                            <div className="text-xs opacity-60 truncate">{s.desc}</div>
                          </div>
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sm">
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </motion.a>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(menuContent, document.body);
};

// ─── Mobile Drawer (FIXED - Using Portal) ────────────────────────────────────────────
const MobileDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    return () => { 
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [open]);

  const toggleGroup = (i: number) => {
    setExpandedGroup(prev => (prev === i ? null : i));
  };

  const drawerContent = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[10000] w-[85vw] max-w-[400px] bg-background border-l border-border flex flex-col shadow-2xl"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <a href="/" className="flex items-center gap-2 font-display text-lg" onClick={onClose}>
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image src="/favicon.ico" alt="icon" width={24} height={24} className="object-cover" />
                </div>
                ClickMasters
              </a>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer body — scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Top-level links */}
              <div className="px-4 pt-4 pb-2 flex flex-col gap-1">
                {links.filter(l => !l.hasMenu).map(l => (
                  <a
                    key={l.label}
                    href={l.href ?? `/#${l.label.toLowerCase()}`}
                    onClick={onClose}
                    className="flex items-center justify-between text-sm font-medium px-3 py-3 rounded-xl hover:bg-muted/70 transition-colors"
                  >
                    {l.label}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="mx-4 my-2 border-t border-border" />

              {/* Services accordion */}
              <div className="px-4 pb-4 flex flex-col gap-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest opacity-40 px-3 py-1">Services</p>
                {groups.map((g, i) => (
                  <div key={g.title}>
                    <button
                      onClick={() => toggleGroup(i)}
                      className="w-full flex items-center justify-between text-sm font-medium px-3 py-3 rounded-xl hover:bg-muted/70 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {g.title}
                        <span className="text-[10px] opacity-50 bg-foreground/10 rounded-full px-1.5 py-0.5">{g.items.length}</span>
                      </span>
                      <motion.span
                        animate={{ rotate: expandedGroup === i ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-4 h-4 opacity-50" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedGroup === i && (
                        <motion.div
                          key="items"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-0.5 pl-3 pr-1 pb-2">
                            {g.items.map(s => {
                              const Icon = s.icon;
                              return (
                                <a
                                  key={s.name}
                                  href={s.href ?? "#services"}
                                  onClick={onClose}
                                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors"
                                >
                                  <div className="shrink-0 w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                                    <Icon className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium truncate">{s.name}</div>
                                    <div className="text-xs opacity-50 truncate">{s.desc}</div>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer footer CTA */}
            <div className="px-4 py-4 border-t border-border shrink-0">
              <a
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-foreground text-background px-4 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                Start a project <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Use portal to render drawer at the root level
  if (!mounted) return null;
  return createPortal(drawerContent, document.body);
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export const Navbar = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="fixed inset-x-0 top-4 z-50 px-3 sm:px-4"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4 rounded-full bg-background/80 backdrop-blur-xl border border-border px-3 sm:px-4 py-3 shadow-sm">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 font-display text-base sm:text-xl shrink-0">
            <div className="w-7 h-7 rounded-full overflow-hidden">
              <Image src="/favicon.ico" alt="icon" width={28} height={28} className="object-cover" />
            </div>
            ClickMasters
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm">
            {links.map(l =>
              l.hasMenu ? (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <button
                    className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => setMegaOpen(o => !o)}
                  >
                    {l.label}
                    <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.span>
                  </button>
                </div>
              ) : (
                <a
                  key={l.label}
                  href={l.href ?? `/#${l.label.toLowerCase()}`}
                  onMouseEnter={() => setMegaOpen(false)}
                  className="opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  {l.label}
                </a>
              ),
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            {/* CTA — hidden on very small screens, shown from sm up */}
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Start a project <ExternalLink className="w-4 h-4" />
            </a>

            {/* Hamburger — shown on lg and below */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

      </motion.header>

      {/* Desktop mega menu - rendered through a portal so it aligns to the viewport */}
      <div className="hidden lg:block">
        <MegaMenu open={megaOpen} onOpen={openMega} onClose={closeMega} />
      </div>

      {/* Mobile / tablet drawer - rendered via portal to body */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
