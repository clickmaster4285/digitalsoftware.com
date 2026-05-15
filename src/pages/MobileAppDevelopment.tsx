import { ServicePage, type ServicePageData } from "@/components/site/ServicePage";
import {
  Search, Palette, Code2, Smartphone, ShieldCheck, Plug,
  Rocket, Briefcase, Bell, Cpu, Layers, Gauge, TrendingUp,
} from "lucide-react";

const data: ServicePageData = {
  meta: {
    title: "Mobile App Development Services | Clickmasters Digital Marketing",
    description:
      "iOS, Android, cross-platform and React Native mobile app development. Strategy, UX, build, App Store launch and post-launch growth — engineered for retention, not just downloads. USA · UK · UAE · Pakistan.",
  },
  hero: {
    eyebrow: "[ Service · 08 ] — Mobile App Development",
    title: (
      <>
        Mobile Apps People <br />
        <span className="text-[#FF2E86]">Open on Day 30</span> — <br />
        Not Just on Day One.
      </>
    ),
    subtitle:
      "Most apps die in the App Store. Ours don't. We design and build iOS, Android and cross-platform mobile apps engineered for the retention curve that actually justifies the build — not for the demo that wins the pitch and loses the user.",
    primaryCta: "Plan my app",
    secondaryCta: "See what we build",
    stats: [
      { k: "22.2K/mo", v: "Search demand for the topic" },
      { k: "+41%", v: "Avg D30 retention lift" },
      { k: "12-22 wk", v: "Typical launch window" },
      { k: "100%", v: "Code & IP owned" },
    ],
  },
  intro: {
    lead: (
      <>
        Most mobile apps fail at the same place: <em className="text-[#FF2E86] not-italic">somewhere between download and day seven</em>.
        Not because the design was wrong. Because no one engineered the loop
        that keeps people coming back.
      </>
    ),
    paragraphs: [
      "A mobile app is a different commercial product to a website. It lives on a device people unlock 80 times a day, it competes for a square inch of homescreen, and it has to earn its push-notification permission inside the first two minutes — or it never gets it. That is a product engineering problem, not a UI styling problem.",
      "At Clickmasters Digital Marketing, we build native iOS (Swift, SwiftUI), native Android (Kotlin, Jetpack Compose) and cross-platform (React Native, Flutter) mobile applications — for startups going from idea to App Store, for scale-ups replatforming off a brittle MVP, and for established businesses extending into mobile because their customers are already there.",
    ],
  },
  services: {
    heading: (
      <>
        Our mobile app<br />
        <span className="text-[#FF2E86]">development services.</span>
      </>
    ),
    items: [
      {
        n: "01",
        icon: Search,
        tag: "Strategy",
        title: "Product Strategy & App Discovery",
        intro:
          "The most expensive mobile app is the one that ships the wrong feature in the right framework. Discovery is where we kill that scenario.",
        blocks: [
          { h: "Market & user research", p: "Who actually opens this app on a Tuesday at 9pm — and why? Competitor teardown, App Store review mining, and a small set of structured interviews so the build is anchored in real behaviour, not a brief." },
          { h: "Retention & monetisation model", p: "Before we choose a stack, we choose a number — the D7/D30 retention target, the in-app event that defines an active user, the revenue model (paid, subscription, in-app, ad-supported, freemium) and the unit economics that justify the build." },
          { h: "Scoped MVP", p: "A written, fixed-price proposal for a launchable MVP that proves the loop — not a 47-feature roadmap that ships in a year and pleases nobody." },
        ],
      },
      {
        n: "02",
        icon: Palette,
        tag: "UX & Design",
        title: "Mobile UX & UI Design",
        intro:
          "Mobile UX is its own discipline. Thumb reach, one-handed use, network drop-off, dark patterns to avoid, and the platform-specific behaviour iOS and Android users already expect.",
        blocks: [
          { h: "Native-feeling design", p: "We design to the platform — Material 3 on Android, Apple HIG on iOS — so the app feels like it belongs on the device, not like a website squeezed through a phone." },
          { h: "Onboarding that earns the next tap", p: "First-run flows engineered against the activation event, permission prompts (notifications, location, contacts) timed to value, and an empty state that teaches without lecturing." },
          { h: "Design system + Figma library", p: "A documented component library and Figma kit so future features ship in days, not weeks — and so your in-house design team can own it after launch." },
        ],
      },
      {
        n: "03",
        icon: Smartphone,
        tag: "Native iOS",
        title: "Native iOS Development",
        intro:
          "When the use case demands platform-native performance, hardware access, or the cleanest possible Apple experience — we build native.",
        blocks: [
          { h: "Swift & SwiftUI", p: "Modern Swift codebases using SwiftUI for new builds and UIKit interop where the project requires it. Combine, async/await, and Swift Package Manager as standard." },
          { h: "Apple ecosystem features", p: "Sign in with Apple, Apple Pay, Live Activities, Widgets, App Clips, HealthKit, HomeKit, ARKit and CoreML where the product calls for them — not as gimmicks." },
          { h: "App Store readiness", p: "App Store Connect setup, privacy manifest, ATT prompt strategy, TestFlight beta, screenshots and metadata — the boring 30% of an iOS launch we get right so review doesn't bounce you." },
        ],
      },
      {
        n: "04",
        icon: Cpu,
        tag: "Native Android",
        title: "Native Android Development",
        intro:
          "Android is not 'iOS but cheaper'. It's a different ecosystem with its own retention dynamics, payment economics and device fragmentation reality.",
        blocks: [
          { h: "Kotlin & Jetpack Compose", p: "Modern Kotlin with Jetpack Compose for new UI, MVVM/Clean architecture, Coroutines and Flow — the stack Google itself ships against." },
          { h: "Device-class engineering", p: "Designed and tested across the Android device curve that matters in your markets — not just the latest Pixel. Mid-tier Android in India, the GCC and Pakistan is a different performance budget than a Pixel 9 in California." },
          { h: "Play Store launch", p: "Play Console setup, Data Safety form, Play Billing, internal/closed/open testing tracks, staged rollouts and Play Vitals monitoring — set up so a bad release can be rolled back in minutes, not days." },
        ],
      },
      {
        n: "05",
        icon: Layers,
        tag: "Cross-platform",
        title: "React Native & Flutter Development",
        intro:
          "When the use case is largely UI-and-API and the business needs one team shipping iOS and Android together, cross-platform is the right answer — and we ship it like a senior engineer would.",
        blocks: [
          { h: "React Native (Expo & bare)", p: "TypeScript, Expo Router or React Navigation, OTA updates via EAS, native modules where needed — the production discipline that stops a React Native app from feeling like a web view." },
          { h: "Flutter", p: "Dart and Flutter for projects where pixel-identical iOS/Android UI and 60fps custom animations matter — with the platform-channel work to integrate any native capability the product needs." },
          { h: "Shared back end", p: "One Node, Python or Go API powering both platforms, with the auth, push, deep-link and analytics infrastructure designed once and consumed twice." },
        ],
      },
      {
        n: "06",
        icon: Plug,
        tag: "Back end & APIs",
        title: "App Back End, APIs & Cloud Infrastructure",
        intro:
          "A mobile app is the visible 30% of a product. The other 70% is the back end, the APIs and the cloud that keep it fast at scale.",
        blocks: [
          { h: "API & data layer", p: "REST or GraphQL APIs, PostgreSQL/MySQL/MongoDB, Redis caching, background workers — engineered for the request profile a mobile app actually generates (lots of small calls, intermittent connectivity, retry needs)." },
          { h: "Auth, push & deep links", p: "Email, social and Sign in with Apple auth, Firebase Cloud Messaging and APNs, OneSignal where appropriate, branded deep links via Branch or AppsFlyer — the plumbing that makes growth possible." },
          { h: "Cloud & DevOps", p: "AWS, GCP, Azure or Firebase — chosen on cost and operational fit. CI/CD via Bitrise, GitHub Actions or Codemagic so every PR can be built, tested and shipped to internal testers automatically." },
        ],
      },
      {
        n: "07",
        icon: TrendingUp,
        tag: "Launch & Growth",
        title: "ASO, Analytics & Post-Launch Growth",
        intro:
          "Shipping the app is the start. The compounding value comes from the discipline of measure, ship, measure — built into the product from week one.",
        blocks: [
          { h: "App Store Optimisation", p: "Keyword research for App Store and Play Store, screenshot and preview-video creative, A/B testing via App Store Connect Experiments and Play Console — so your acquisition cost stops being inflated by a poor listing." },
          { h: "Mobile analytics", p: "Mixpanel, Amplitude, Firebase Analytics or PostHog — instrumented around the activation, retention and revenue events that actually matter, with a Looker Studio or Metabase dashboard the founder can read in 90 seconds." },
          { h: "Crash, performance & engagement", p: "Crashlytics or Sentry for stability, Firebase Performance for cold-start and network metrics, push and in-app messaging via Braze, Iterable or CleverTap — the loop that turns a launched app into a retained one." },
        ],
      },
    ],
  },
  advantage: {
    bigWord: "OPEN",
    heading: (
      <>
        Why our apps<br />
        <span className="text-[#FF2E86]">survive day 30.</span>
      </>
    ),
    items: [
      { icon: Bell, title: "Built around the retention loop", body: "We pick the activation event before we pick the framework. Onboarding, push, in-app messaging and the core loop are engineered against a measurable D7 and D30 target — so growth marketing isn't pouring water into a leaking bucket." },
      { icon: Gauge, title: "Performance is a feature, not a phase", body: "Cold-start under 2s on a mid-tier Android, network calls batched and cached, image pipelines tuned, motion respected (Reduce Motion, prefers-reduced-data) — because slow apps don't get a second chance on a phone." },
      { icon: ShieldCheck, title: "Stack chosen on commercial honesty", body: "Native when the use case demands it, cross-platform when it doesn't, and we'll tell you which before you commit. We refuse projects where the chosen stack will quietly cap the product 18 months in." },
    ],
  },
  cases: {
    heading: (
      <>
        Mobile apps<br />
        <span className="text-[#FF2E86]">in the App Store.</span>
      </>
    ),
    items: [
      {
        tag: "USA Fitness · iOS + Android consumer app",
        metric: "+58%",
        sub: "D30 retention vs MVP",
        title: "Rebuilt a US fitness startup's app from a fragile React Native MVP into a retention machine.",
        body: "A US fitness brand had a working MVP — and a retention curve that fell off a cliff at D7. We rearchitected the app on React Native with native modules for HealthKit and Google Fit, redesigned onboarding around the first-workout activation event, and instrumented Mixpanel against the retention model. D30 retention rose 58%, paid trial-to-subscriber conversion improved 31%, and CAC payback shortened by a full quarter.",
      },
      {
        tag: "UK Fintech · Native iOS + Android",
        metric: "4.8★",
        sub: "App Store rating at launch",
        title: "Shipped a UK challenger-fintech's debut app on iOS and Android in 16 weeks — to a 4.8★ launch rating.",
        body: "A UK fintech needed to launch an FCA-regulated mobile banking experience on both platforms simultaneously. We built native iOS (Swift, SwiftUI) and native Android (Kotlin, Jetpack Compose) against a shared GraphQL back end on AWS, with Sign in with Apple, biometric auth, Plaid integration and a hardened security review. Launched in 16 weeks, hit a 4.8★ store average inside the first 30 days, and crossed 50,000 active users in the first quarter.",
      },
      {
        tag: "UAE Logistics · Cross-platform driver app",
        metric: "−37%",
        sub: "Driver onboarding time",
        title: "Built a Flutter driver-and-dispatch app for a Dubai last-mile logistics operator running 600+ vehicles.",
        body: "A UAE logistics company was running its driver fleet on WhatsApp groups and a desktop dispatch screen. We built a Flutter app for drivers (offline-first, route playback, proof-of-delivery photo, signature, fuel and odometer capture) wired to a Node.js dispatch back end. Driver onboarding time dropped 37%, on-time delivery rose 14 points, and the dispatch team cut headcount per 100 vehicles by a third.",
      },
    ],
  },
  why: {
    heading: (
      <>
        Why founders choose us<br />
        <span className="text-[#FF2E86]">for mobile.</span>
      </>
    ),
    items: [
      { icon: Bell, h: "Retention before features", p: "Every engagement starts with a retention model and an activation event. Feature decisions are then made in service of those numbers — not the other way around." },
      { icon: Smartphone, h: "Native quality, regardless of stack", p: "Whether we ship Swift, Kotlin, React Native or Flutter, the product feels native to the platform. Animations, gestures, transitions and platform conventions — respected, not approximated." },
      { icon: Briefcase, h: "Founder-grade product partnership", p: "We work the way an in-house product team works — weekly demo, written decisions, a Linear board you actually live in. Not a Gantt chart you check once a month." },
      { icon: Rocket, h: "Built for evolution", p: "Documented codebase, modular architecture, CI/CD from day one, OTA updates where the platform allows. The app you launch is the v1 of a product, not the deliverable on an invoice." },
    ],
  },
  faqs: {
    heading: (
      <>
        Mobile app development <span className="text-[#FF2E86]">FAQs.</span>
      </>
    ),
    items: [
      { q: "Should I build native iOS/Android or cross-platform (React Native / Flutter)?", a: "Native (Swift on iOS, Kotlin on Android) is the right answer when the product depends heavily on platform-specific hardware (camera, AR, ML, sensors), when raw performance and low-level control matter, or when your team is already organised by platform. Cross-platform (React Native or Flutter) is the right answer for product-led businesses where a single feature roadmap shipping to both platforms simultaneously is more valuable than the marginal performance gains of going fully native. Discovery produces the written recommendation — and we have shipped both." },
      { q: "How long does it take to build a mobile app?", a: "A scoped MVP launching on iOS and Android via React Native or Flutter typically launches in 12–18 weeks. A native iOS + native Android v1 with a custom back end typically takes 16–24 weeks. A complex regulated app (fintech, healthtech) with full security review can run 24–36 weeks. We always ship in 2-week sprints with a working build at the end of each." },
      { q: "What does mobile app development cost?", a: "Discovery engagements are typically $5,000–$15,000. A cross-platform MVP usually falls in the $40,000–$120,000 range. A native iOS + native Android v1 with custom back end typically runs $80,000–$250,000. Regulated and enterprise builds can exceed $400,000. Every quote is written and fixed-price after discovery." },
      { q: "Do we own the code, the App Store accounts and the data?", a: "Yes — completely. Source code lives in your Git repository from day one. App Store Connect and Google Play Console are registered in your company name (we never publish under our own developer account). All data, analytics workspaces and cloud infrastructure are under your accounts. There is no vendor lock-in to us." },
      { q: "What about ongoing maintenance, updates and growth?", a: "Most mobile clients stay on a care + growth retainer — covering OS-version compatibility (iOS and Android both ship a major release every year), security and dependency updates, crash and performance monitoring, ASO experimentation and a budget of feature development each month. You can also take the codebase fully in-house at any time — we do the handover properly." },
    ],
  },
  cta: {
    bigWord: "SHIP",
    heading: (
      <>
        Got an idea — or a v1 that <br />
        deserves <em className="text-[#FF2E86] not-italic">a real v2?</em>
      </>
    ),
    body: "Whether you're going from concept to App Store, replatforming off an MVP that's bursting at the seams, or extending an existing product into mobile — let's put a number on the opportunity and a plan on the table. One call.",
    primary: { label: "Book a discovery call", href: "https://clickmastersdigitalmarketing.com/contact-us/" },
    secondary: [
      { label: "Web App Development", href: "/web-application-development" },
      { label: "Custom Software Development", href: "/custom-software-development" },
    ],
  },
};

const MobileAppDevelopment = () => <ServicePage data={data} />;
export default MobileAppDevelopment;
