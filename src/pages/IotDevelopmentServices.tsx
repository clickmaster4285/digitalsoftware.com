import { ServicePage, type ServicePageData } from "@/components/site/ServicePage";
import {
  Search, Cpu, Code2, Cloud, ShieldCheck, Plug,
  Activity, Briefcase, Rocket, Radio, Gauge, Wifi, Layers,
} from "lucide-react";

const data: ServicePageData = {
  meta: {
    title: "IoT Development Services | Clickmasters Digital Marketing",
    description:
      "End-to-end IoT development — firmware, gateways, cloud, dashboards and mobile. From connected product MVP to industrial-scale fleets on AWS IoT, Azure IoT and GCP IoT Core. USA · UK · UAE · Pakistan.",
  },
  hero: {
    eyebrow: "[ Service · 09 ] — IoT Development",
    title: (
      <>
        Connected Devices Are <br />
        Easy to Demo. <br />
        <span className="text-[#FF2E86]">Hard to Operate at Scale.</span>
      </>
    ),
    subtitle:
      "A working prototype on a desk and a fleet of 50,000 devices in the field are different products. We build IoT systems engineered for the second one — firmware, connectivity, cloud, dashboards and the operations layer that keeps it all alive at 3am.",
    primaryCta: "Scope my IoT build",
    secondaryCta: "See what we build",
    stats: [
      { k: "30B+", v: "Connected devices by 2030" },
      { k: "−42%", v: "Avg field-service cost" },
      { k: "16-32 wk", v: "MVP to pilot fleet" },
      { k: "100%", v: "Code, firmware & data owned" },
    ],
  },
  intro: {
    lead: (
      <>
        Most IoT projects make it to the demo. <em className="text-[#FF2E86] not-italic">Far fewer make it to a fleet of 10,000 devices in the field</em> —
        because the second one is a different engineering discipline entirely.
      </>
    ),
    paragraphs: [
      "An IoT product is five products stacked on top of each other: the embedded firmware on the device, the connectivity layer that gets data off it, the cloud that ingests and stores that data, the dashboards and APIs that turn it into decisions, and the operational tooling — OTA updates, fleet provisioning, device monitoring — that keeps the whole thing alive once it leaves the lab. Get any one of those wrong and the project stalls.",
      "At Clickmasters Digital Marketing, we build IoT systems end-to-end — embedded firmware on ESP32, STM32, nRF and Linux-class boards; gateways and edge compute; AWS IoT Core, Azure IoT Hub and GCP IoT Core back ends; time-series data on InfluxDB and Timescale; and the operator dashboards, mobile apps and integrations that turn a connected device into a connected product.",
    ],
  },
  services: {
    heading: (
      <>
        Our IoT<br />
        <span className="text-[#FF2E86]">development services.</span>
      </>
    ),
    items: [
      {
        n: "01",
        icon: Search,
        tag: "Discovery",
        title: "IoT Strategy, Architecture & Feasibility",
        intro:
          "The most expensive IoT mistake is choosing the wrong connectivity, the wrong cloud or the wrong protocol in week one — and finding out at fleet scale.",
        blocks: [
          { h: "Use-case & feasibility", p: "What problem the connected product actually solves, who pays for it, and whether the unit economics — device BOM, connectivity cost per month, cloud cost per device — actually pencil out at the target fleet size." },
          { h: "Architecture decisions", p: "Connectivity (Wi-Fi, BLE, LoRaWAN, Cellular LTE-M/NB-IoT, Zigbee, Matter, satellite), protocol (MQTT, CoAP, HTTPS), cloud platform (AWS, Azure, GCP, private), and edge-vs-cloud compute split — chosen for your environment, range, power budget and data profile." },
          { h: "Pilot scoping", p: "A written, fixed-price proposal for a pilot of 10–500 devices — the only honest way to find out what really happens before you commit to a 50,000-device run." },
        ],
      },
      {
        n: "02",
        icon: Cpu,
        tag: "Embedded",
        title: "Embedded Firmware Development",
        intro:
          "Firmware is the layer your customer never sees and the one that determines whether the product is reliable, secure and updatable for a decade.",
        blocks: [
          { h: "MCU firmware", p: "ESP32, STM32, Nordic nRF, Renesas, NXP — bare-metal, FreeRTOS or Zephyr RTOS depending on the determinism, footprint and power profile the product needs." },
          { h: "Linux-class & gateway", p: "Yocto and Buildroot custom Linux images on Raspberry Pi, BeagleBone, Variscite and i.MX boards — when the product needs a richer runtime, container support or local edge compute." },
          { h: "Power, security & reliability", p: "Sub-mA average current designs for battery products, secure boot, signed firmware, encrypted storage, watchdogs and recovery partitions — the engineering that turns a 'works on my desk' device into one that survives 3 years in the field." },
        ],
      },
      {
        n: "03",
        icon: Wifi,
        tag: "Connectivity",
        title: "Connectivity & Protocol Engineering",
        intro:
          "Connectivity is where most fleet-scale IoT problems quietly originate. We design it as a first-class part of the product, not as an afterthought.",
        blocks: [
          { h: "Cellular IoT", p: "LTE-M and NB-IoT modems, eUICC and global SIM strategies, Soracom/Hologram/1NCE/Twilio Super SIM integration — sized for the data profile and the markets the product will ship into." },
          { h: "Wi-Fi, BLE, Thread & Matter", p: "Wi-Fi provisioning that doesn't make a customer hate the unboxing, BLE pairing flows, Thread/Matter for the smart home, Zigbee where the ecosystem demands it." },
          { h: "Long range & industrial", p: "LoRaWAN gateways and end devices, sub-GHz radio links, MQTT-SN over constrained links — the radio and protocol stacks for industrial, agricultural and remote-asset deployments." },
        ],
      },
      {
        n: "04",
        icon: Cloud,
        tag: "Cloud & Data",
        title: "IoT Cloud Platforms & Data Pipelines",
        intro:
          "An IoT cloud isn't a normal back end. The ingest profile, the time-series volume and the device-management surface area need to be designed for, not improvised.",
        blocks: [
          { h: "Managed IoT clouds", p: "AWS IoT Core (plus Greengrass, Device Defender, Device Management), Azure IoT Hub (plus IoT Edge, Device Provisioning Service), GCP IoT and ClearBlade — chosen for your fleet size, region footprint and existing cloud commitments." },
          { h: "Time-series & analytics", p: "InfluxDB, Timescale, AWS Timestream and Azure Data Explorer for telemetry; Kafka or Kinesis for ingest; Spark, Athena or BigQuery for analytics — sized to the data volume your fleet will actually generate at year three." },
          { h: "Digital twin & rules", p: "Device shadows, digital twins and rules engines that turn raw telemetry into states, alerts and downstream actions — the layer that makes the data operationally useful, not just stored." },
        ],
      },
      {
        n: "05",
        icon: Activity,
        tag: "Dashboards & Apps",
        title: "Operator Dashboards, Mobile & APIs",
        intro:
          "The dashboard is where the IoT product earns its keep — by collapsing a fleet of devices into the small set of decisions a human actually needs to make.",
        blocks: [
          { h: "Web dashboards", p: "React or Next.js operator consoles with live telemetry, fleet heat maps, device drill-down, alert workflows and role-based access — designed around the actual job the operator is doing, not around the data model." },
          { h: "End-user mobile apps", p: "Native iOS, native Android or React Native companion apps with BLE/Wi-Fi provisioning, OTA updates, push notifications and the smart-home or industrial UX patterns the category expects." },
          { h: "APIs & integrations", p: "REST and GraphQL APIs for partners and integrators, webhooks, plus integrations with ERPs (SAP, NetSuite), CMMS (UpKeep, Fiix), SCADA systems and the BI tools your customer is already standardised on." },
        ],
      },
      {
        n: "06",
        icon: ShieldCheck,
        tag: "Security & Ops",
        title: "Device Security, OTA & Fleet Operations",
        intro:
          "An IoT fleet is a security surface. We engineer the device, the cloud and the lifecycle so that surface stays defensible for the life of the product.",
        blocks: [
          { h: "Security by design", p: "Hardware root of trust, secure element / TPM where the BOM allows, signed firmware, certificate-based device identity (X.509 mutual TLS), least-privilege cloud policies — and the OWASP IoT Top 10 baked in, not bolted on." },
          { h: "OTA & device lifecycle", p: "Robust over-the-air firmware update with staged rollout, A/B partitions, automatic rollback on failure, plus the provisioning, decommissioning and re-keying flows that keep a 50,000-device fleet manageable." },
          { h: "Observability & alerting", p: "Per-device health metrics, fleet-wide aggregate dashboards (uptime, signal, battery, firmware version distribution), and alerting that distinguishes a single bad device from a regional connectivity incident." },
        ],
      },
      {
        n: "07",
        icon: Layers,
        tag: "Industry IoT",
        title: "Industrial IoT, Smart Home & Vertical IoT",
        intro:
          "We work across industrial, consumer and vertical IoT — and the engineering trade-offs are different in each.",
        blocks: [
          { h: "Industrial IoT (IIoT)", p: "Modbus, OPC UA, BACnet and CAN bus integration, edge gateways for legacy machinery, predictive-maintenance models — for manufacturing, energy, logistics and facilities operators." },
          { h: "Smart home & consumer", p: "Matter and Thread native devices, Alexa and Google Home Works-With certifications, BLE-and-Wi-Fi commissioning UX, and the consumer-grade reliability that survives a non-technical end user." },
          { h: "Asset tracking & wearables", p: "GPS + cellular asset trackers with multi-week battery life, BLE-based indoor location, and wearable form factors — for logistics, healthcare and field-service operators." },
        ],
      },
    ],
  },
  advantage: {
    bigWord: "FIELD",
    heading: (
      <>
        Why our IoT systems<br />
        <span className="text-[#FF2E86]">survive in the field.</span>
      </>
    ),
    items: [
      { icon: Cpu, title: "Engineered for fleet, not for demo", body: "The architecture decisions that don't matter at 10 devices break the project at 10,000. We design for the second number — power budget, OTA reliability, certificate rotation, regional connectivity, cloud cost per device — from the first whiteboard." },
      { icon: ShieldCheck, title: "Security as a product property", body: "Hardware root of trust, signed firmware, mutual TLS, least-privilege cloud policies and OTA pipelines built to actually rotate keys. An IoT fleet that can't securely update itself is a recall waiting to happen." },
      { icon: Radio, title: "Connectivity chosen on physics, not fashion", body: "Cellular, LoRa, Wi-Fi, BLE, Matter, satellite — selected for the range, power, data profile and economics your product actually has. We're stack-agnostic because reality is." },
    ],
  },
  cases: {
    heading: (
      <>
        Connected products<br />
        <span className="text-[#FF2E86]">in the field.</span>
      </>
    ),
    items: [
      {
        tag: "USA Industrial · Predictive maintenance",
        metric: "−42%",
        sub: "Field service cost",
        title: "Built a predictive-maintenance IoT platform for 8,400 industrial pumps across 12 US states.",
        body: "A US industrial-equipment OEM was running break-fix maintenance on a fleet of pumps. We designed an LTE-M-connected vibration and temperature sensor (STM32 + NB-IoT modem, 5-year battery) feeding AWS IoT Core, Timestream and a custom anomaly-detection model. Field-service cost per asset fell 42%, unplanned downtime dropped 31%, and the OEM monetised the data as a paid 'uptime guarantee' service tier.",
      },
      {
        tag: "UK Smart Home · Matter-native devices",
        metric: "4.8★",
        sub: "Amazon launch rating",
        title: "Took a UK smart-home startup from prototype to a Matter-certified product on shelves in 11 months.",
        body: "A UK smart-home startup had a working ESP32 prototype and no path to certification, OTA, or apps. We rearchitected on a Matter + Thread stack, designed manufacturing test fixtures, built the iOS and Android companion apps with proper commissioning UX, and shipped a hardened OTA pipeline. Hit Matter and Works-With certifications, launched on Amazon to a 4.8★ rating in the first 60 days, and shipped 14,000 units in the first quarter.",
      },
      {
        tag: "UAE Logistics · Cellular asset trackers",
        metric: "+19%",
        sub: "On-time delivery",
        title: "Deployed 12,000 cellular asset trackers across a UAE-and-KSA cold-chain logistics fleet.",
        body: "A GCC cold-chain operator was losing visibility on cross-border shipments and absorbing the temperature-excursion claims. We built a low-power cellular GPS + temperature tracker (nRF + LTE-M), a multi-region AWS IoT back end, an Arabic-and-English operator dashboard and a customer-facing track-and-trace portal. On-time delivery rose 19 points, temperature-excursion claims fell 64%, and the operator launched a paid premium-visibility tier for enterprise clients.",
      },
    ],
  },
  why: {
    heading: (
      <>
        Why teams choose us<br />
        <span className="text-[#FF2E86]">for IoT.</span>
      </>
    ),
    items: [
      { icon: Cpu, h: "Full-stack from silicon to cloud", p: "We don't hand off between firmware, cloud and app teams — the same architects own the decisions that span those boundaries, which is where most IoT projects quietly fail." },
      { icon: Gauge, h: "Honest unit economics", p: "We model device BOM, connectivity cost per month, cloud cost per device and field-service cost before we commit to a stack. If the unit economics don't work, we'll tell you in week one — not in year two." },
      { icon: Plug, h: "Stack-agnostic by policy", p: "AWS, Azure, GCP, ClearBlade, private MQTT — chosen on fit, not on partner kickbacks. Same for connectivity (Soracom, Hologram, 1NCE, Twilio, Onomondo) and silicon vendors. We optimise for your build, not our preference." },
      { icon: Rocket, h: "Designed for a 5–10 year product life", p: "Connected hardware is a long-lived product. Documented firmware, signed OTA, key-rotation strategy, cloud cost controls, end-of-life planning — engineered so the product is still healthy three CTOs from now." },
    ],
  },
  faqs: {
    heading: (
      <>
        IoT development <span className="text-[#FF2E86]">FAQs.</span>
      </>
    ),
    items: [
      { q: "Which IoT cloud platform should I choose — AWS, Azure or GCP?", a: "It usually comes down to three things: where the rest of your engineering team already lives, the regions you need devices to operate in (China, GCC and India each have their wrinkles), and the device-management surface you need (AWS IoT Device Management is the most mature, Azure IoT Hub plays best with Microsoft estates, GCP IoT Core has been deprecated and we now route GCP-first customers via ClearBlade or third-party brokers). Discovery produces the written recommendation, with a cost-per-device-per-month projection at your target fleet size." },
      { q: "What connectivity should my device use?", a: "It depends on power budget, range, data volume and where the device will operate. Battery-powered, low-data, wide-area: NB-IoT or LTE-M (with LoRaWAN where private networks are viable). Mains-powered, high-data, indoors: Wi-Fi, often with BLE for commissioning. Smart home: Matter over Thread or Wi-Fi. Industrial machinery: usually cellular for the gateway, with Modbus/OPC UA wired into local equipment. We design connectivity as a first-class architectural decision, not a tick-box." },
      { q: "How long does an IoT project take?", a: "A focused MVP — single firmware, one connectivity path, basic cloud and a simple dashboard — typically launches as a 50–500-device pilot in 16–28 weeks. A production-ready system with hardened OTA, multi-region cloud, mobile companion app and integrations usually runs 28–48 weeks. Industrial and regulated builds (medical IoT, automotive, energy) can run 40–80 weeks. We always ship a working pilot before we commit to fleet-scale production." },
      { q: "What does IoT development cost?", a: "Discovery and architecture engagements are typically $8,000–$25,000. A pilot-ready MVP (firmware + cloud + dashboard) usually falls in the $80,000–$250,000 range. A production-grade system with mobile app, OTA, multi-region cloud and integrations typically runs $200,000–$600,000. Industrial and regulated builds can exceed $1M. Hardware BOM, certification (FCC, CE, Matter, Works-With) and connectivity contracts are quoted separately and transparently." },
      { q: "Do we own the firmware, the cloud and the data?", a: "Yes — completely. Firmware source, cloud infrastructure as code, dashboards, mobile apps and the time-series data live in your accounts and your repositories from day one. Device certificates are minted under your root CA. There is no vendor lock-in to us, and any competent embedded or cloud team can pick up what we built and continue." },
    ],
  },
  cta: {
    bigWord: "CONNECT",
    heading: (
      <>
        Got a connected product <br />
        idea — or a pilot that <em className="text-[#FF2E86] not-italic">needs to scale?</em>
      </>
    ),
    body: "Whether you're scoping the first prototype, recovering a stalled pilot, or planning a 50,000-unit production run — let's put numbers on the architecture and a plan on the table. One call, no pitch deck.",
    primary: { label: "Book a discovery call", href: "https://clickmastersdigitalmarketing.com/contact-us/" },
    secondary: [
      { label: "Custom Software Development", href: "/custom-software-development" },
      { label: "Mobile App Development", href: "/mobile-app-development" },
    ],
  },
};

const IotDevelopmentServices = () => <ServicePage data={data} />;
export default IotDevelopmentServices;
