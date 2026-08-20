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
  Link,
  Settings,
  Share2,
  ShoppingCart,
  Languages,
  Workflow,
  MapPinned,
  KeyRound,
  ShieldAlert,
  Braces,
  Flag,
  BadgeCheck,
  Layers3, Calculator, Video, LineChart, Cloud, GitBranch, MessageSquare, Gauge,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import logoWhite from "@/assets/logo-white.webp";
import logoBlack from "@/assets/logo-black.webp";

type Service = { name: string; desc: string; icon: any; href?: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getServiceHref = (groupTitle: string, serviceHref?: string) => {
  if (!serviceHref || serviceHref.startsWith("#")) {
    return serviceHref ?? "#services";
  }

  // Full paths (e.g. /search-engine-optimization/on-page-seo) are already correct
  if (serviceHref.startsWith("/")) {
    return serviceHref;
  }

  const slug = serviceHref.replace(/^\/+|\/+$/g, "");

  const groupSlug = groupTitle.includes("&")
    ? groupTitle
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    : slugify(groupTitle);

  return `/${groupSlug}/${slug}`;
};

// ─── Location Data ──────────────────────────────────────────────────────────
// ALL 46 US locations with proper slug format matching your location pages
const locations: { name: string; desc: string; icon: any; href: string }[] = [
  // Original 13
  { name: "Atlanta", desc: "Digital marketing in Atlanta, GA", icon: MapPin, href: "/locations/digital-marketing-agency-atlanta" },
  { name: "Austin", desc: "Digital marketing in Austin, TX", icon: MapPin, href: "/locations/digital-marketing-agency-austin" },
  { name: "Boston", desc: "Digital marketing in Boston, MA", icon: MapPin, href: "/locations/digital-marketing-agency-boston" },
  { name: "Chicago", desc: "Digital marketing in Chicago, IL", icon: MapPin, href: "/locations/digital-marketing-agency-chicago" },
  { name: "Cleveland", desc: "Digital marketing in Cleveland, OH", icon: MapPin, href: "/locations/digital-marketing-agency-cleveland" },
  { name: "Dallas", desc: "Digital marketing in Dallas, TX", icon: MapPin, href: "/locations/digital-marketing-agency-dallas" },
  { name: "Denver", desc: "Digital marketing in Denver, OH", icon: MapPin, href: "/locations/digital-marketing-agency-denver" },
  { name: "Houston", desc: "Digital marketing in Houston, TX", icon: MapPin, href: "/locations/digital-marketing-agency-houston" },
  { name: "Huntsville", desc: "Digital marketing in Huntsville, AL", icon: MapPin, href: "/locations/digital-marketing-agency-huntsville" },
  { name: "Indianapolis", desc: "Digital marketing in Indianapolis, IN", icon: MapPin, href: "/locations/digital-marketing-agency-indianapolis" },
  { name: "Jacksonville", desc: "Digital marketing in Jacksonville, FL", icon: MapPin, href: "/locations/digital-marketing-agency-jacksonville" },
  { name: "Kansas City", desc: "Digital marketing in Kansas City, MO", icon: MapPin, href: "/locations/digital-marketing-agency-kansas-city" },
  { name: "New York", desc: "Digital marketing in New York, NY", icon: MapPin, href: "/locations/digital-marketing-agency-new-york" },

  // New 33 locations
  { name: "Albuquerque", desc: "Digital marketing in Albuquerque, NM", icon: MapPin, href: "/locations/digital-marketing-agency-albuquerque" },
  { name: "Baltimore", desc: "Digital marketing in Baltimore, MD", icon: MapPin, href: "/locations/digital-marketing-agency-baltimore" },
  { name: "Birmingham", desc: "Digital marketing in Birmingham, AL", icon: MapPin, href: "/locations/digital-marketing-agency-birmingham" },
  { name: "Boise", desc: "Digital marketing in Boise, ID", icon: MapPin, href: "/locations/digital-marketing-agency-boise" },
  { name: "Charlotte", desc: "Digital marketing in Charlotte, NC", icon: MapPin, href: "/locations/digital-marketing-agency-charlotte" },
  { name: "Cincinnati", desc: "Digital marketing in Cincinnati, OH", icon: MapPin, href: "/locations/digital-marketing-agency-cincinnati" },
  { name: "Des Moines", desc: "Digital marketing in Des Moines, IA", icon: MapPin, href: "/locations/digital-marketing-agency-des-moines" },
  { name: "Knoxville", desc: "Digital marketing in Knoxville, TN", icon: MapPin, href: "/locations/digital-marketing-agency-knoxville" },
  { name: "Las Vegas", desc: "Digital marketing in Las Vegas, NV", icon: MapPin, href: "/locations/digital-marketing-agency-las-vegas" },
  { name: "Los Angeles", desc: "Digital marketing in Los Angeles, CA", icon: MapPin, href: "/locations/digital-marketing-agency-los-angeles" },
  { name: "Louisville", desc: "Digital marketing in Louisville, KY", icon: MapPin, href: "/locations/digital-marketing-agency-louisville" },
  { name: "Memphis", desc: "Digital marketing in Memphis, TN", icon: MapPin, href: "/locations/digital-marketing-agency-memphis" },
  { name: "Miami", desc: "Digital marketing in Miami, FL", icon: MapPin, href: "/locations/digital-marketing-agency-miami" },
  { name: "Minneapolis", desc: "Digital marketing in Minneapolis, MN", icon: MapPin, href: "/locations/digital-marketing-agency-minneapolis" },
  { name: "Nashville", desc: "Digital marketing in Nashville, TN", icon: MapPin, href: "/locations/digital-marketing-agency-nashville" },
  { name: "New Orleans", desc: "Digital marketing in New Orleans, LA", icon: MapPin, href: "/locations/digital-marketing-agency-new-orleans" },
  { name: "Oklahoma City", desc: "Digital marketing in Oklahoma City, OK", icon: MapPin, href: "/locations/digital-marketing-agency-oklahoma-city" },
  { name: "Omaha", desc: "Digital marketing in Omaha, NE", icon: MapPin, href: "/locations/digital-marketing-agency-omaha" },
  { name: "Orlando", desc: "Digital marketing in Orlando, FL", icon: MapPin, href: "/locations/digital-marketing-agency-orlando" },
  { name: "Philadelphia", desc: "Digital marketing in Philadelphia, PA", icon: MapPin, href: "/locations/digital-marketing-agency-philadelphia" },
  { name: "Phoenix", desc: "Digital marketing in Phoenix, AZ", icon: MapPin, href: "/locations/digital-marketing-agency-phoenix" },
  { name: "Pittsburgh", desc: "Digital marketing in Pittsburgh, PA", icon: MapPin, href: "/locations/digital-marketing-agency-pittsburgh" },
  { name: "Portland", desc: "Digital marketing in Portland, OR", icon: MapPin, href: "/locations/digital-marketing-agency-portland" },
  { name: "Richmond", desc: "Digital marketing in Richmond, VA", icon: MapPin, href: "/locations/digital-marketing-agency-richmond" },
  { name: "Sacramento", desc: "Digital marketing in Sacramento, CA", icon: MapPin, href: "/locations/digital-marketing-agency-sacramento" },
  { name: "Salt Lake City", desc: "Digital marketing in Salt Lake City, UT", icon: MapPin, href: "/locations/digital-marketing-agency-salt-lake-city" },
  { name: "San Antonio", desc: "Digital marketing in San Antonio, TX", icon: MapPin, href: "/locations/digital-marketing-agency-san-antonio" },
  { name: "San Diego", desc: "Digital marketing in San Diego, CA", icon: MapPin, href: "/locations/digital-marketing-agency-san-diego" },
  { name: "San Francisco", desc: "Digital marketing in San Francisco, CA", icon: MapPin, href: "/locations/digital-marketing-agency-san-francisco" },
  { name: "Seattle", desc: "Digital marketing in Seattle, WA", icon: MapPin, href: "/locations/digital-marketing-agency-seattle" },
  { name: "St. Louis", desc: "Digital marketing in St. Louis, MO", icon: MapPin, href: "/locations/digital-marketing-agency-st-louis" },
  { name: "Tampa", desc: "Digital marketing in Tampa, FL", icon: MapPin, href: "/locations/digital-marketing-agency-tampa" },
  { name: "Tulsa", desc: "Digital marketing in Tulsa, OK", icon: MapPin, href: "/locations/digital-marketing-agency-tulsa" },
  { name: "Wichita", desc: "Digital marketing in Wichita, KS", icon: MapPin, href: "/locations/digital-marketing-agency-wichita" },
];

// ─── Service Groups ──────────────────────────────────────────────────────────
const groups: { title: string; href?: string; items: Service[] }[] = [
{
  title: "Seo Services",
  href: "/search-engine-optimization",
  items: [
    {
      name: "On-Page SEO",
      desc: "Optimize content & structure",
      icon: FileText,
      href: "/search-engine-optimization/on-page-seo",
    },
    {
      name: "Off-Page SEO & Link Building",
      desc: "Authority-building backlinks",
      icon: Link,
      href: "/search-engine-optimization/off-page-seo-link-building",
    },
    {
      name: "Technical SEO",
      desc: "Improve crawlability & speed",
      icon: Settings,
      href: "/search-engine-optimization/technical-seo",
    },
    {
      name: "Local SEO",
      desc: "Rank higher locally",
      icon: MapPin,
      href: "/search-engine-optimization/local-seo",
    },
    {
      name: "Enterprise SEO",
      desc: "SEO for large websites",
      icon: Building2,
      href: "/search-engine-optimization/enterprise-seo",
    },
    {
      name: "Ecommerce SEO",
      desc: "Drive online store sales",
      icon: ShoppingCart,
      href: "/search-engine-optimization/ecommerce-seo",
    },
    {
      name: "AI SEO",
      desc: "AI-powered optimization",
      icon: Bot,
      href: "/search-engine-optimization/ai-seo",
    },
    {
      name: "YouTube SEO",
      desc: "Grow video rankings",
      icon: Youtube,
      href: "/search-engine-optimization/youtube-seo",
    },
    {
      name: "SEO Audit",
      desc: "Comprehensive SEO analysis",
      icon: Search,
      href: "/search-engine-optimization/seo-audit",
    },
    {
      name: "SEO Automation",
      desc: "Automate SEO workflows",
      icon: Cpu,
      href: "/search-engine-optimization/seo-automation",
    },
    {
      name: "Keyword Research",
      desc: "Find profitable keywords",
      icon: KeyRound,
      href: "/search-engine-optimization/keyword-research",
    },
    {
      name: "Google Penalty Recovery",
      desc: "Recover lost rankings",
      icon: ShieldAlert,
      href: "/search-engine-optimization/google-penalty-recovery",
    },
    {
      name: "Schema Markup",
      desc: "Structured data implementation",
      icon: Braces,
      href: "/search-engine-optimization/schema-markup",
    },
    {
      name: "Voice Search Optimization",
      desc: "Optimize for voice queries",
      icon: Mic,
      href: "/search-engine-optimization/voice-search-optimization",
    },
    {
      name: "White Label SEO",
      desc: "SEO services for agencies",
      icon: BadgeCheck,
      href: "/search-engine-optimization/white-label-seo",
    },
    {
      name: "SEO Glossary",
      desc: "SEO terms & definitions",
      icon: BookOpen,
      href: "/search-engine-optimization/seo-glossary",
    },
    {
      name: "SEO Services USA",
      desc: "SEO solutions across the USA",
      icon: Flag,
      href: "/search-engine-optimization/seo-services-usa",
    },
  ],
},
{
  title: "Pay Per Click",
  href: "/pay-per-click",
  items: [
    { name: "PPC Management", desc: "Full PPC campaigns", icon: TrendingUp, href: "/pay-per-click/ppc-management" },
    { name: "Google Ads Management", desc: "Google Ads experts", icon: Search, href: "/pay-per-click/google-ads-management" },
    { name: "Facebook & Instagram Ads", desc: "Meta advertising", icon: Megaphone, href: "/pay-per-click/facebook-instagram-ads" },
    { name: "LinkedIn Ads Management", desc: "B2B lead generation", icon: Linkedin, href: "/pay-per-click/linkedin-ads-management" },
    { name: "YouTube Ads Management", desc: "Video advertising", icon: Youtube, href: "/pay-per-click/youtube-ads-management" },
    { name: "Remarketing & Retargeting", desc: "Re-engage visitors", icon: Repeat, href: "/pay-per-click/remarketing-retargeting" },
    { name: "Marketing Attribution", desc: "Track conversions", icon: BarChart3, href: "/pay-per-click/marketing-attribution" },
  ],
},
 {
  title: "Social Media Marketing",
  href: "/social-media-marketing",
  items: [
    { name: "Social Media Content", desc: "Content creation", icon: PenTool, href: "/social-media-marketing/social-media-content-creation" },
    { name: "Social Media Strategy", desc: "Growth planning", icon: BarChart3, href: "/social-media-marketing/social-media-strategy-consulting" },
    { name: "TikTok Shop Management", desc: "TikTok commerce", icon: ShoppingBag, href: "/social-media-marketing/tiktok-shop-management" },
    { name: "YouTube SEO", desc: "Video optimization", icon: Youtube, href: "/social-media-marketing/youtube-seo" },
    { name: "Influencer Marketing", desc: "Creator partnerships", icon: Users, href: "/social-media-marketing/influencer-marketing" },
    { name: "Podcast Marketing", desc: "Podcast growth", icon: Mic, href: "/social-media-marketing/podcast-marketing" },
    { name: "Podcast Production", desc: "Podcast creation", icon: Radio, href: "/social-media-marketing/podcast-production" },
  ],
},
  {
  title: "Mobile App Development",
  href: "/mobile-app-development",
  items: [
    { name: "iOS App Development", desc: "Native iPhone apps", icon: Smartphone, href: "/mobile-app-development/ios-app-development" },
    { name: "Android App Development", desc: "Native Android apps", icon: Smartphone, href: "/mobile-app-development/android-app-development" },
    { name: "React Native Development", desc: "Cross-platform apps", icon: Layers, href: "/mobile-app-development/react-native-development" },
    { name: "Flutter App Development", desc: "Flutter applications", icon: Smartphone, href: "/mobile-app-development/flutter-app-development" },
  ],
},
  {
  title: "CRO",
  href: "/conversion-rate-optimization",
  items: [
    { name: "CRO Services", desc: "Increase conversions", icon: TrendingUp, href: "/conversion-rate-optimization/cro-services" },
    { name: "Online Reputation Management", desc: "Protect your brand", icon: Star, href: "/conversion-rate-optimization/online-reputation-management" },
    { name: "Branding & Identity", desc: "Build your brand", icon: Sparkles, href: "/conversion-rate-optimization/branding-identity" },
    { name: "Data Analytics & Reporting", desc: "Actionable insights", icon: Database, href: "/conversion-rate-optimization/data-analytics-reporting" },
    { name: "ROI Calculator", desc: "Measure returns", icon: Calculator, href: "/conversion-rate-optimization/roi-calculator" },
  ],
},
  {
  title: "Content Marketing",
  href: "/content-marketing",
  items: [
    { name: "Email Marketing", desc: "Convert subscribers", icon: Mail, href: "/content-marketing/email-marketing" },
    { name: "Video Marketing", desc: "Engaging video campaigns", icon: Video, href: "/content-marketing/video-marketing" },
    { name: "Infographic Design", desc: "Visual storytelling", icon: ImageIcon, href: "/content-marketing/infographic-design" },
    { name: "White Paper Writing", desc: "Authority content", icon: FileText, href: "/content-marketing/white-paper-writing" },
    { name: "Case Study Writing", desc: "Showcase results", icon: BookOpen, href: "/content-marketing/case-study-writing" },
    { name: "Guest Posting", desc: "Build authority", icon: Link2, href: "/content-marketing/guest-posting" },
    { name: "Newsletter", desc: "Audience engagement", icon: Mail, href: "/content-marketing/newsletter" },
    { name: "PR & Media Outreach", desc: "Earn media coverage", icon: Radio, href: "/content-marketing/pr-media-outreach" },
    { name: "Citation Building", desc: "Local citations", icon: MapPin, href: "/content-marketing/citation-building" },
  ],
},
  {
  title: "Ecommerce",
  href: "/ecommerce-services",
  items: [
    { name: "Ecommerce Development", desc: "Online stores", icon: ShoppingCart, href: "/ecommerce-services/ecommerce-development" },
    { name: "Ecommerce Marketing", desc: "Drive sales", icon: Megaphone, href: "/ecommerce-services/ecommerce-marketing" },
    { name: "Ecommerce Analytics", desc: "Track performance", icon: BarChart3, href: "/ecommerce-services/ecommerce-analytics" },
    { name: "Shopify Development", desc: "Custom Shopify stores", icon: Store, href: "/ecommerce-services/shopify-development" },
    { name: "Shopify Marketing", desc: "Grow Shopify revenue", icon: TrendingUp, href: "/ecommerce-services/shopify-marketing" },
    { name: "Magento Development", desc: "Enterprise ecommerce", icon: Package, href: "/ecommerce-services/magento-development" },
    { name: "WooCommerce Development", desc: "WordPress ecommerce", icon: ShoppingBag, href: "/ecommerce-services/woocommerce-development" },
    { name: "WooCommerce Marketing", desc: "WooCommerce growth", icon: TrendingUp, href: "/ecommerce-services/woocommerce-marketing" },
    { name: "BigCommerce Marketing", desc: "Scale BigCommerce stores", icon: Store, href: "/ecommerce-services/bigcommerce-marketing" },
    { name: "Amazon FBA Marketing", desc: "FBA growth", icon: Package, href: "/ecommerce-services/amazon-fba-marketing" },
    { name: "Amazon Marketing", desc: "Marketplace growth", icon: Package, href: "/ecommerce-services/amazon-marketing" },
  ],
},
  {
  title: "AI Automation",
  href: "/ai-automation",
  items: [
    { name: "AI Content Generation", desc: "Generate content with AI", icon: Bot, href: "/ai-automation/ai-content-generation" },
    { name: "AI Marketing", desc: "AI-powered marketing", icon: Sparkles, href: "/ai-automation/ai-marketing" },
    { name: "AI / ML Development", desc: "Custom AI solutions", icon: Brain, href: "/ai-automation/ai-ml-development" },
    { name: "AI Personalization", desc: "Personalized experiences", icon: Users, href: "/ai-automation/ai-personalization" },
    { name: "Chatbot Development", desc: "AI assistants", icon: MessageSquare, href: "/ai-automation/chatbot-development" },
    { name: "Marketing Automation", desc: "Automated campaigns", icon: Workflow, href: "/ai-automation/marketing-automation" },
    { name: "Predictive Analytics", desc: "Forecast customer behavior", icon: LineChart, href: "/ai-automation/predictive-analytics" },
    { name: "Data Analytics & Reporting", desc: "Business intelligence", icon: Database, href: "/ai-automation/data-analytics-reporting" },
    { name: "API Development & Integration", desc: "Connect systems", icon: Plug, href: "/ai-automation/api-development-integration" },
    { name: "CRM Integration", desc: "Customer data integration", icon: Network, href: "/ai-automation/crm-integration" },
    { name: "Custom Software Development", desc: "Tailored applications", icon: Boxes, href: "/ai-automation/custom-software-development" },
    { name: "DevOps", desc: "CI/CD & automation", icon: GitBranch, href: "/ai-automation/devops" },
    { name: "Cloud Solutions", desc: "Scalable infrastructure", icon: Cloud, href: "/ai-automation/cloud-solutions" },
    { name: "IoT Development", desc: "Connected devices", icon: Cpu, href: "/ai-automation/iot-development" },
    { name: "AR / VR Development", desc: "Immersive experiences", icon: Layers, href: "/ai-automation/ar-vr-development" },
    { name: "Blockchain Development", desc: "Decentralized solutions", icon: ShieldCheck, href: "/ai-automation/blockchain-development" },
  ],
},
  {
  title: "Web Design & Development",
  href: "/web-design-development",
  items: [
    { name: "Web Design", desc: "Modern websites", icon: Palette, href: "/web-design-development/web-design" },
    { name: "Web Development", desc: "Custom websites", icon: Code2, href: "/web-design-development/web-development" },
    { name: "Web Application Development", desc: "Custom web apps", icon: LayoutGrid, href: "/web-design-development/web-application-development" },
    { name: "Landing Page Design", desc: "Conversion-focused pages", icon: PenTool, href: "/web-design-development/landing-page-design" },
    { name: "UI / UX Design", desc: "User-centered design", icon: Layers3, href: "/web-design-development/ui-ux-design" },
    { name: "Logo Design", desc: "Brand identity", icon: Sparkles, href: "/web-design-development/logo-design" },
    { name: "Graphic Design", desc: "Creative assets", icon: ImageIcon, href: "/web-design-development/graphic-design" },
    { name: "PWA Development", desc: "Progressive web apps", icon: Smartphone, href: "/web-design-development/pwa-development" },
    { name: "Headless Commerce", desc: "Modern ecommerce architecture", icon: Store, href: "/web-design-development/headless-commerce-development" },
    { name: "Website Speed Optimization", desc: "Improve performance", icon: Gauge, href: "/web-design-development/website-speed-optimization" },
    { name: "Website Maintenance", desc: "Ongoing support", icon: Wrench, href: "/web-design-development/website-maintenance" },
    { name: "ADA Compliance", desc: "Accessibility compliance", icon: ShieldCheck, href: "/web-design-development/ada-compliance-web-accessibility" },
  ],
},
];

const links = [
  { label: "Services", hasMenu: true, menuType: "services" },
  { label: "Locations", hasMenu: true, menuType: "locations" },
  { label: "Solutions", hasMenu: false , href: "/solutions" },
  { label: "About", hasMenu: false , href: "/about"},
  { label: "Pricing", hasMenu: false , href: "/pricing"},
  { label: "Process", hasMenu: false , href: "/process"},
  { label: "Testimonials", hasMenu: false , href: "/testimonials" },
  { label: "Contact", hasMenu: false, href: "/contact" },
];

// ─── Desktop Mega Menu ───────────────────────────────────────────────────────
const MegaMenu = ({
  open,
  onOpen,
  onClose,
  menuType = "services",
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  menuType?: "services" | "locations";
}) => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const router = useRouter();

  // Use locations data if menuType is "locations", otherwise use groups
  const isLocations = menuType === "locations";
  const menuData = isLocations ? locations : groups;

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
              {/* Category rail for services only */}
              {!isLocations && (
                <div className="col-span-3 rounded-2xl bg-foreground/10 p-3 flex flex-col gap-1">
                  {(menuData as typeof groups).map((g, i) => (
                    <button
                      key={g.title}
                      onMouseEnter={() => setActiveGroup(i)}
                      onClick={() => {
                        setActiveGroup(i);
                        if (g.href) router.push(g.href);
                      }}
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
              )}

              {/* Content grid */}
              <div className={`${isLocations ? "col-span-12" : "col-span-9"} max-h-[68vh] overflow-y-auto pr-1`}>
                {isLocations ? (
                  // Locations grid - 4 columns with enhanced design
                  <div className="grid grid-cols-4 gap-2 p-2">
                    {locations.sort((a, b) => a.name.localeCompare(b.name)).map((loc, index) => {
                      const Icon = loc.icon;
                      const isHovered = hoveredLocation === loc.name;
                      
                      return (
                        <motion.a
                          key={loc.name}
                          href={loc.href}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.015,
                            ease: [0.22, 1, 0.36, 1] 
                          }}
                          whileHover={{ 
                            y: -3,
                            transition: { duration: 0.2 }
                          }}
                          onMouseEnter={() => setHoveredLocation(loc.name)}
                          onMouseLeave={() => setHoveredLocation(null)}
                          className="group relative rounded-xl p-3.5 hover:bg-muted/60 transition-all duration-300 border border-transparent hover:border-border/60 hover:shadow-sm flex flex-col items-start gap-2.5"
                        >
                          {/* Hover glow effect */}
                          {isHovered && (
                            <motion.div
                              layoutId="location-glow"
                              className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/5 to-transparent -z-10"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                          
                          {/* Icon with animated background */}
                          <motion.div 
                            className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300 relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            <Icon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110" />
                            
                            {/* Icon background shine effect on hover */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                            />
                          </motion.div>
                          
                          {/* Location info */}
                          <div className="flex-1 min-w-0">
                            <motion.div 
                              className="text-sm font-medium truncate transition-colors duration-300 group-hover:text-foreground"
                              animate={isHovered ? { color: "var(--foreground)" } : {}}
                            >
                              {loc.name}
                            </motion.div>
                            <motion.div 
                              className="text-xs opacity-60 truncate transition-opacity duration-300"
                              animate={isHovered ? { opacity: 0.8 } : { opacity: 0.6 }}
                            >
                              {loc.desc}
                            </motion.div>
                          </div>

                          {/* Arrow indicator on hover */}
                          <motion.div 
                            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            initial={{ x: -5, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                          >
                            <ChevronRight className="w-4 h-4 opacity-50" />
                          </motion.div>

                          {/* Bottom border accent on hover */}
                          <motion.div 
                            className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-foreground/40 to-foreground/10 rounded-full"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.a>
                      );
                    })}
                  </div>
                ) : (
                  // Services grid
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGroup}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-2 xl:grid-cols-3 gap-2"
                    >
                      {(menuData as typeof groups)[activeGroup]?.items.map((s, i) => {
                        const Icon = s.icon;
                        return (
                          <motion.a
                            key={s.name}
                            href={getServiceHref((menuData as typeof groups)[activeGroup].title, s.href)}
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
                )}
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

// ─── Mobile Drawer ──────────────────────────────────────────────────────────
const MobileDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [expandedLocations, setExpandedLocations] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const router = useRouter();

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

  const toggleLocations = () => {
    setExpandedLocations(prev => !prev);
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

            {/* Drawer body  scrollable */}
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

              {/* Locations accordion */}
              <div className="px-4 pb-2">
                <button
                  onClick={toggleLocations}
                  className="w-full flex items-center justify-between text-sm font-medium px-3 py-3 rounded-xl hover:bg-muted/70 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    Locations
                    <span className="text-[10px] opacity-50 bg-foreground/10 rounded-full px-1.5 py-0.5">{locations.length}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: expandedLocations ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {expandedLocations && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 pl-3 pr-1 pb-2">
                        {locations.sort((a, b) => a.name.localeCompare(b.name)).map(loc => {
                          const Icon = loc.icon;
                          return (
                            <a
                              key={loc.name}
                              href={loc.href}
                              onClick={onClose}
                              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors"
                            >
                              <div className="shrink-0 w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium truncate">{loc.name}</div>
                                <div className="text-xs opacity-50 truncate">{loc.desc}</div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                        <a
                          href={g.href ?? '#'}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (g.href) {
                              router.push(g.href);
                              onClose();
                            }
                          }}
                          className="block"
                        >
                          {g.title}
                        </a>
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
                                  href={getServiceHref(g.title, s.href)}
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
  const [activeMenuType, setActiveMenuType] = useState<"services" | "locations">("services");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isDark, setIsDark] = useState(false);
  

  useEffect(() => {
const updateTheme = () => {
  const theme =
    document.documentElement.getAttribute("data-section-theme") ?? "dark";

  setIsDark(theme === "dark");
};

  updateTheme();

  const observer = new MutationObserver(updateTheme);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-section-theme"],
  });

  return () => observer.disconnect();
  }, []);
  


  const openMega = (type: "services" | "locations" = "services") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenuType(type);
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
           
<Image
  src={isDark ? logoWhite : logoBlack}
  alt="ClickMasters"
  className="w-24 sm:w-28 h-auto"
  priority
/>
            
          
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm">
            {links.map(l =>
              l.hasMenu ? (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => openMega(l.menuType as "services" | "locations")}
                  onMouseLeave={closeMega}
                >
                  <button
                    className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const type = l.menuType as "services" | "locations";
                      if (megaOpen && activeMenuType === type) {
                        setMegaOpen(false);
                      } else {
                        setActiveMenuType(type);
                        setMegaOpen(true);
                      }
                    }}
                  >
                    {l.label}
                    <motion.span animate={{ rotate: megaOpen && activeMenuType === l.menuType ? 180 : 0 }} transition={{ duration: 0.3 }}>
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
            {/* CTA  hidden on very small screens, shown from sm up */}
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Start a project <ExternalLink className="w-4 h-4" />
            </a>

            {/* Hamburger  shown on lg and below */}
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
        <MegaMenu 
          open={megaOpen} 
          onOpen={() => openMega(activeMenuType)} 
          onClose={closeMega} 
          menuType={activeMenuType}
        />
      </div>

      {/* Mobile / tablet drawer - rendered via portal to body */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};