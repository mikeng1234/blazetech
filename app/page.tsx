import Image from "next/image";
import Header from "./components/Header";
import RevealOnScroll from "./components/RevealOnScroll";
import SmoothScroll from "./components/SmoothScroll";
import MessengerFab from "./components/MessengerFab";
import PartnerMarquee from "./components/PartnerMarquee";
import HeroCover from "./components/HeroCover";
import Estimator from "./components/Estimator";
import QuoteForm from "./components/QuoteForm";
import ScrollParallax from "./components/ScrollParallax";
import ProjectsCarousel from "./components/ProjectsCarousel";
import SafeImage from "./components/SafeImage";
import ClickTracker from "./components/ClickTracker";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-orange-600 focus:text-white focus:font-bold focus:shadow-lg"
      >
        Skip to content
      </a>
      <Header />
      <SmoothScroll />
      <RevealOnScroll />
      <ClickTracker />
      <MessengerFab />

      <main id="main" tabIndex={-1} className="pt-20 outline-none">
        {/* Hero */}
        <section
          id="home"
          className="relative w-full min-h-[560px] md:min-h-[900px] flex items-start px-gutter py-section-padding bg-surface-container-lowest [overflow-x:clip]"
        >
          <div className="absolute inset-0 z-0">
            <HeroCover />
            {/* Stronger left-side scrim so headline/body copy meet WCAG AA contrast over any cover image */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/55 to-transparent lg:from-white/80 lg:via-white/35 lg:to-transparent" />
            {/* Top-to-transparent fade — extends up to the page top so it sits under the fixed header too */}
            <div className="absolute inset-x-0 -top-20 h-72 md:h-80 bg-gradient-to-b from-background/80 via-background/40 to-transparent" />
            {/* Bottom fade so the cover blends softly into the banner */}
            <div className="absolute inset-x-0 bottom-0 h-80 md:h-96 bg-gradient-to-t from-white/80 via-white/35 to-transparent" />
          </div>
          <div className="relative z-10 max-w-(--container-max) mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center w-full">
            <div className="lg:col-span-7 flex flex-col items-start gap-stack-lg">
              <h1 className="text-4xl md:text-[clamp(2.25rem,9vw,4.5rem)] lg:text-7xl font-display font-bold text-on-surface tracking-tight leading-tight break-words [text-shadow:0_0_14px_rgba(255,255,255,1),0_0_30px_rgba(255,255,255,1),0_0_48px_rgba(255,255,255,0.85),0_0_72px_rgba(255,255,255,0.6)]">
                <span className="fade-up block" style={{ transitionDelay: "100ms" }}>You Dream It,</span>
                <span className="fade-up block text-orange-600" style={{ transitionDelay: "350ms" }}>We Build It.</span>
              </h1>
              <p
                className="fade-up text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed [text-shadow:0_0_14px_rgba(255,255,255,1),0_0_30px_rgba(255,255,255,1),0_0_48px_rgba(255,255,255,0.85),0_0_72px_rgba(255,255,255,0.6)]"
                style={{ transitionDelay: "650ms" }}
              >
                Your partner in generating free and clean energy solutions for your future. Save money, save the environment — with affordable
                solar power systems designed, installed, and maintained by <span className="relative inline-block font-bold">
                  <span className="text-orange-600">Blaze Tech</span> <span className="text-secondary">Devt OPC</span>
                  <span aria-hidden="true" className="bt-shine-overlay absolute inset-0 pointer-events-none font-bold">
                    Blaze Tech Devt OPC
                  </span>
                </span>.
              </p>
              <div className="flex flex-wrap gap-stack-md pt-2">
                <a
                  className="inline-flex items-center justify-center px-6 py-3 text-sm md:px-8 md:py-4 md:text-sm bg-orange-600 text-white font-bold uppercase tracking-wider rounded-full hover:bg-orange-500 transition-all duration-200 shadow-xl shadow-orange-600/45 hover:shadow-2xl hover:shadow-orange-600/55 hover:-translate-y-1 active:translate-y-0.5 active:shadow-md"
                  href="#quote"
                >
                  Get a Free Quote
                </a>
                <a
                  className="inline-flex items-center justify-center px-6 py-3 text-sm md:px-8 md:py-4 md:text-sm border-2 border-secondary text-secondary bg-surface hover:bg-surface font-bold uppercase tracking-wider rounded-full transition-all duration-200 shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/35 hover:-translate-y-1 active:translate-y-0.5 active:shadow-md"
                  href="#services"
                >
                  Explore Services
                </a>
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-6 pt-3 text-on-surface-variant [text-shadow:0_0_10px_rgba(255,255,255,0.95),0_0_22px_rgba(255,255,255,0.7),0_0_36px_rgba(255,255,255,0.5)]">
                <Trust icon="verified" label="Licensed installers"   animClass="trust-icon-spin" />
                <Trust icon="savings"  label="Up to 70% bill cut"    animClass="trust-icon-bob" />
                <Trust icon="shield"   label="25-year panel warranty" animClass="trust-icon-pulse" />
              </div>
            </div>
          </div>

          {/* Decorative wave at the bottom of the hero */}
          <Image
            src="/banner7f.png"
            alt=""
            aria-hidden="true"
            width={2752}
            height={1322}
            sizes="100vw"
            className="pointer-events-none absolute -bottom-[100px] md:-bottom-[370px] left-0 w-full h-auto z-20 select-none animate-bt-wipe"
          />
        </section>

        {/* Partners */}
        <PartnerMarquee />

        {/* Savings + Services share a single banner5c parallax background */}
        <div className="relative bg-surface overflow-hidden">
          <ScrollParallax
            speed={0.25}
            className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[url('/banner5c.png')] bg-no-repeat bg-[length:min(100%,1920px)_auto] bg-[position:center_400px] md:bg-[position:center_320px] opacity-30"
          >
            {null}
          </ScrollParallax>

          {/* Savings */}
          <section
            id="savings"
            className="relative px-gutter pt-2 pb-12 md:py-section-padding bg-transparent"
          >
            <div className="relative max-w-(--container-max) mx-auto">
              <SectionHeader float eyebrow="Savings" title="Energy independence, made affordable." subtitle="Solar isn't just clean — it's the smartest investment your roof will ever make." />
              <div className="grid grid-cols-3 gap-3 md:gap-gutter">
                <StatCard delay={0}   big="70%"     title="Lower electricity bills" body="Most homes cut their monthly Meralco bill by half or more after switching." />
                <StatCard delay={150} big="4–6 yrs" title="Payback period"          body="Your system pays for itself in under six years, then runs free for two more decades." />
                <StatCard delay={300} big="25+ yrs" title="Panel lifespan"          body="Tier-1 panels backed by manufacturer warranties of 25 years or more." />
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="relative px-gutter pt-2 pb-12 md:py-section-padding bg-transparent">
          <div className="max-w-(--container-max) mx-auto">
            <SectionHeader eyebrow="Services" title="A full range of solar solutions." subtitle="From design and installation to long-term maintenance — reliable, high-quality service every step of the way." />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-gutter lg:grid-cols-4">
              <ServiceCard delay={0}   theme="primary"   icon="home"                  iconClass="icon-home"    title="Residential Solar"    body="Custom rooftop systems sized to your household's energy needs and budget." />
              <ServiceCard delay={150} theme="secondary" icon="storefront"            iconClass="icon-store"   title="Commercial Solar"     body="Scalable installations for offices, warehouses, and manufacturing sites." />
              <ServiceCard delay={300} theme="tertiary"  icon="battery_charging_full" iconClass="icon-battery" title="Battery Storage"      body="Hybrid and off-grid setups with lithium battery backup for 24/7 power." />
              <ServiceCard delay={450} theme="emerald"   icon="build"                 iconClass="icon-build"   title="Maintenance & Repair" body="Cleaning, performance audits, and inverter servicing to keep yields high." />
            </div>
          </div>
          </section>
        </div>

        {/* Process + Recent Works share a single banner5e parallax background */}
        <div className="relative bg-surface overflow-hidden">
          <ScrollParallax
            speed={0.25}
            className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[url('/banner5e.png')] bg-no-repeat bg-[length:min(100%,1920px)_auto] bg-[position:center_400px] md:bg-[position:center_320px] opacity-30"
          >
            {null}
          </ScrollParallax>

          {/* Process */}
          <section id="process" className="relative px-gutter pt-2 pb-12 md:py-section-padding bg-transparent">
            <div className="max-w-(--container-max) mx-auto">
              <SectionHeader eyebrow="Process" title="From consult to switch-on" subtitle="" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
                <Step n={1} title="Free Consultation" body="We assess your bill, roof, and energy goals at no cost." />
                <Step n={2} title="Custom Design" body="Engineered system layout with projected savings and ROI." />
                <Step n={3} title="Installation" body="Certified crew installs panels, inverter, and wiring in days, not weeks." />
                <Step n={4} title="Activate & Monitor" body="System goes live with remote monitoring and ongoing support." />
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section id="installations" className="relative px-gutter pt-2 pb-12 md:py-section-padding bg-transparent">
            <div className="max-w-(--container-max) mx-auto">
              <SectionHeader
                eyebrow="Recent Works"
                title="Featured Projects"
                subtitle=""
              />
              <ProjectsCarousel>
                {FEATURED_PROJECTS.map((p) => (
                  <ProjectCard key={p.name} project={p} />
                ))}
              </ProjectsCarousel>
            </div>
          </section>
        </div>

        {/* Estimate */}
        <section id="estimate" className="relative px-gutter pt-2 pb-12 md:py-section-padding bg-surface overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-32 md:bottom-48 z-0 select-none opacity-30"
          >
            <ScrollParallax speed={0.18}>
              <div className="bt-anim-float">
                <Image
                  src="/banner5.png"
                  alt=""
                  aria-hidden="true"
                  width={2000}
                  height={547}
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
            </ScrollParallax>
          </div>
          <div className="relative max-w-(--container-max) mx-auto">
            <SectionHeader
              eyebrow="Estimate"
              title="Customize your quote"
              subtitle=""
            />
            <Estimator />
          </div>
        </section>

        {/* Quote / Contact */}
        <section id="quote" className="relative px-gutter pt-2 pb-12 md:py-section-padding bg-surface overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[url('/banner4.png')] bg-no-repeat bg-[length:min(100%,1920px)_auto] bg-[position:center_220px] md:bg-[position:center_320px] opacity-30"
          />
          <div className="relative max-w-(--container-max) mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-margin items-start">
            <div className="fade-up" id="contact">
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-primary">Get a Free Quote</span>
              <h2 className="text-2xl md:text-5xl font-display font-semibold text-on-surface mt-1 md:mt-2">Let&apos;s power your future.</h2>
              <p className="text-sm md:text-lg text-on-surface-variant mt-2 md:mt-4 leading-snug md:leading-relaxed">
                Tell us a bit about your home or business and we&apos;ll get back to you within one business day with a no-obligation estimate.
              </p>
              <div className="mt-3 md:mt-8 flex flex-col gap-2 md:gap-stack-md">
                <ContactRow icon="call" label="Call us" lines={["+63 960 436 5857", "+63 962 773 3258"]} href="tel:+639604365857" />
                <ContactRow icon="mail" label="Email" lines={["blazetech.dev@gmail.com"]} href="mailto:blazetech.dev@gmail.com" />
                <ContactRow icon="location_on" label="Visit" lines={["Sindalan, San Fernando, Pampanga"]} href="https://maps.app.goo.gl/usQJphX8pxcgraCr8" />
              </div>
            </div>
            <QuoteForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-section-padding px-gutter bg-secondary text-on-secondary">
          <div className="max-w-(--container-max) mx-auto grid grid-cols-1 md:grid-cols-4 gap-margin">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <Image src="/Logo.png" alt="" width={48} height={48} className="h-12 w-12 object-contain bg-white rounded-lg p-1" />
                <div>
                  <div className="text-2xl font-display font-semibold">Blaze Tech Devt OPC</div>
                  <div className="opacity-80">You dream it, we build it.</div>
                </div>
              </div>
              <p className="opacity-80 mt-4 max-w-md">
                Your partner in generating free and clean energy solutions for your future. Promoting sustainability and energy independence
                through affordable solar power systems across Pampanga and Central Luzon.
              </p>
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-80">Explore</div>
              <nav className="mt-3 flex flex-col gap-2">
                <a className="hover:text-white opacity-90" href="#savings">Savings</a>
                <a className="hover:text-white opacity-90" href="#services">Services</a>
                <a className="hover:text-white opacity-90" href="#process">Process</a>
                <a className="hover:text-white opacity-90" href="#installations">Installations</a>
                <a className="hover:text-white opacity-90" href="#estimate">Estimate</a>
              </nav>
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-80">Contact</div>
              <ul className="mt-3 flex flex-col gap-2 opacity-90">
                <li><a className="hover:text-white" href="tel:+639604365857">+63 960 436 5857</a></li>
                <li><a className="hover:text-white" href="mailto:blazetech.dev@gmail.com">blazetech.dev@gmail.com</a></li>
                <li>Sindalan, San Fernando, Pampanga</li>
                <li>
                  <a
                    className="inline-flex items-center gap-2 hover:text-white"
                    href="https://www.facebook.com/blazetechdevt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                      <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07C2 17.1 5.66 21.27 10.44 22v-7.02H7.9v-2.91h2.54V9.86c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.27 22 17.1 22 12.07z"/>
                    </svg>
                    facebook.com/blazetechdevt
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-(--container-max) mx-auto mt-12 pt-6 border-t border-white/15 flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-3 opacity-80 text-sm">
            <div>© {new Date().getFullYear()} Blaze Tech Devt OPC. All rights reserved.</div>
            <div className="flex flex-wrap items-center gap-4">
              <a className="hover:text-white" href="#">Privacy</a>
              <a className="hover:text-white" href="#">Terms</a>
              <span className="opacity-75">
                Powered by{" "}
                <a
                  href="https://genxcript.website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 hover:text-white transition-opacity underline-offset-2 hover:underline"
                >
                  GenXcript
                </a>
              </span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

function Trust({ icon, label, animClass }: { icon: string; label: string; animClass?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`material-symbols-outlined text-secondary ${animClass ?? ""}`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  wide,
  float,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  wide?: boolean;
  float?: boolean;
}) {
  return (
    <div className="text-center mb-12 fade-up">
      <span className="text-sm font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <div className={float ? "bt-float-soft" : undefined}>
        <h2
          className={`text-[1.7rem] md:text-5xl font-display font-semibold text-on-surface mt-2 ${
            float ? "[text-shadow:0_2px_4px_rgba(0,0,0,0.18),0_8px_20px_rgba(0,0,0,0.14)]" : ""
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-base md:text-lg text-on-surface-variant mx-auto mt-4 ${wide ? "max-w-none" : "max-w-2xl"} ${
              float ? "[text-shadow:0_1px_3px_rgba(0,0,0,0.16),0_4px_10px_rgba(0,0,0,0.10)]" : ""
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({ big, title, body, delay = 0 }: { big: string; title: string; body: string; delay?: number }) {
  return (
    <div
      className="fade-up bt-stat-card bg-surface-container-lowest rounded-xl p-3 md:p-8 shadow-sm border border-surface-container-high"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <div className="text-2xl md:text-5xl lg:text-6xl font-display font-bold text-emerald-700 leading-none">{big}</div>
      <h3 className="text-xs md:text-2xl font-display font-semibold text-on-surface mt-2 md:mt-3">{title}</h3>
      <p className="text-[10px] md:text-base text-on-surface-variant mt-1 md:mt-2 leading-snug">{body}</p>
    </div>
  );
}

type ServiceTheme = "primary" | "secondary" | "tertiary" | "emerald";

const SERVICE_THEMES: Record<ServiceTheme, {
  iconBg: string;
  iconText: string;
  hoverIconBg: string;
  hoverIconText: string;
  topAccent: string;
  hoverBorder: string;
  hoverShadow: string;
}> = {
  primary: {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    hoverIconBg: "group-hover:bg-primary",
    hoverIconText: "group-hover:text-on-primary",
    topAccent: "bg-primary",
    hoverBorder: "hover:border-primary/40",
    hoverShadow: "hover:shadow-primary/25",
  },
  secondary: {
    iconBg: "bg-secondary/10",
    iconText: "text-secondary",
    hoverIconBg: "group-hover:bg-secondary",
    hoverIconText: "group-hover:text-on-secondary",
    topAccent: "bg-secondary",
    hoverBorder: "hover:border-secondary/40",
    hoverShadow: "hover:shadow-secondary/25",
  },
  tertiary: {
    iconBg: "bg-tertiary/10",
    iconText: "text-tertiary",
    hoverIconBg: "group-hover:bg-tertiary",
    hoverIconText: "group-hover:text-on-tertiary",
    topAccent: "bg-tertiary",
    hoverBorder: "hover:border-tertiary/40",
    hoverShadow: "hover:shadow-tertiary/25",
  },
  emerald: {
    iconBg: "bg-emerald-700/10",
    iconText: "text-emerald-700",
    hoverIconBg: "group-hover:bg-emerald-700",
    hoverIconText: "group-hover:text-white",
    topAccent: "bg-emerald-700",
    hoverBorder: "hover:border-emerald-700/40",
    hoverShadow: "hover:shadow-emerald-700/25",
  },
};

function ServiceCard({
  icon,
  iconClass,
  title,
  body,
  delay = 0,
  theme = "primary",
}: {
  icon: string;
  iconClass?: string;
  title: string;
  body: string;
  delay?: number;
  theme?: ServiceTheme;
}) {
  const t = SERVICE_THEMES[theme];
  return (
    <div
      className={`group fade-up bt-card-lift relative overflow-hidden bg-surface rounded-xl p-3 md:p-6 shadow-sm border border-surface-container-high ${t.hoverBorder}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${t.topAccent}`} />
      <div className={`w-9 h-9 md:w-12 md:h-12 rounded-lg ${t.iconBg} ${t.iconText} flex items-center justify-center mb-2 md:mb-4 ${t.hoverIconBg} ${t.hoverIconText} transition-colors duration-300`}>
        <span className={`material-symbols-outlined service-icon text-lg md:text-2xl ${iconClass ?? ""}`}>{icon}</span>
      </div>
      <h3 className="text-sm md:text-xl font-display font-semibold text-on-surface leading-snug">{title}</h3>
      <p className="text-[11px] md:text-base text-on-surface-variant mt-1 md:mt-2 leading-snug">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  const colors: Record<number, string> = {
    1: "bg-orange-600 text-white shadow-lg shadow-orange-600/40",
    2: "bg-red-700 text-white shadow-lg shadow-red-700/40",
    3: "bg-amber-500 text-white shadow-lg shadow-amber-500/40",
    4: "bg-sky-600 text-white shadow-lg shadow-sky-600/40",
  };
  return (
    <div className="fade-up text-center px-4">
      <div
        className={`step-circle w-16 h-16 mx-auto rounded-full ${colors[n] ?? "bg-primary text-on-primary"} flex items-center justify-center text-2xl font-bold transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 cursor-default`}
        style={{ animationDelay: `${(n - 1) * 450}ms` }}
      >
        {n}
      </div>
      <h3 className="text-xl font-display font-semibold text-on-surface mt-4">{title}</h3>
      <p className="text-on-surface-variant mt-2">{body}</p>
    </div>
  );
}

type Project = {
  name: string;
  image: string;
  systemSize: string;
  systemType: string;
  location: string;
  overview: string;
  panels: string;
  savings: string;
};

const FEATURED_PROJECTS: Project[] = [
  {
    name: "Sindalan Residence",
    image: "/sample1.png",
    systemSize: "8.4kWp",
    systemType: "Grid-tie System",
    location: "San Fernando, Pampanga",
    overview: "Cutting household electricity costs through reliable rooftop solar with net-metering integration.",
    panels: "16 x 540W Solar Panels",
    savings: "₱8,500 – ₱12,000",
  },
  {
    name: "Pampanga Commercial Hub",
    image: "/sample2.png",
    systemSize: "25kWp",
    systemType: "Grid-tie System",
    location: "Angeles City, Pampanga",
    overview: "Powering daytime business operations with substantial savings on monthly Meralco bills.",
    panels: "46 x 550W Solar Panels",
    savings: "₱24,000 – ₱36,000",
  },
  {
    name: "Central Luzon Hybrid Home",
    image: "/sample3.png",
    systemSize: "10.8kWp",
    systemType: "Hybrid System",
    location: "Mexico, Pampanga",
    overview: "Solar plus battery backup keeps essentials running through brownouts day or night.",
    panels: "20 x 540W Solar Panels",
    savings: "₱10,900 – ₱15,800",
  },
  {
    name: "Bacolor Family Home",
    image: "/sample4.png",
    systemSize: "6kWp",
    systemType: "Grid-tie System",
    location: "Bacolor, Pampanga",
    overview: "Smart-sized rooftop system delivering maximum daytime offset for a typical family home.",
    panels: "11 x 550W Solar Panels",
    savings: "₱5,800 – ₱8,400",
  },
  {
    name: "Apalit Warehouse",
    image: "/sample5.png",
    systemSize: "40kWp",
    systemType: "Grid-tie System",
    location: "Apalit, Pampanga",
    overview: "Industrial-scale rooftop array slashing operating costs for a logistics warehouse.",
    panels: "73 x 550W Solar Panels",
    savings: "₱40,000 – ₱58,000",
  },
  {
    name: "Magalang Off-Grid Cabin",
    image: "/sample6.png",
    systemSize: "5kWp",
    systemType: "Off-grid System",
    location: "Magalang, Pampanga",
    overview: "Fully independent system with battery bank powering a remote cabin year-round.",
    panels: "10 x 540W Solar Panels",
    savings: "₱4,800 – ₱6,900",
  },
  {
    name: "Lubao Mixed-Use Building",
    image: "/sample7.png",
    systemSize: "15kWp",
    systemType: "Hybrid System",
    location: "Lubao, Pampanga",
    overview: "Hybrid setup with backup batteries keeping ground-floor shops and upper apartments online during outages.",
    panels: "28 x 550W Solar Panels",
    savings: "₱14,500 – ₱21,000",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="fade-up flex flex-col bg-surface rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-surface-container-high">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={project.image}
          alt={`${project.name} — Blaze Tech installation`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-3 p-6 text-center flex-1">
        <h3 className="text-xl font-display font-semibold text-on-surface">{project.name}</h3>
        <p className="text-on-surface">
          <span className="font-bold">{project.systemSize}</span> {project.systemType}
        </p>
        <p className="text-on-surface-variant">
          Location: <span className="font-bold text-on-surface">{project.location}</span>
        </p>
        <p className="text-on-surface-variant">
          <span className="font-bold text-on-surface">Brief Overview:</span> {project.overview}
        </p>
        <p className="text-on-surface-variant">
          Panels installed: <span className="font-bold text-on-surface">{project.panels}</span>
        </p>
        <p className="text-emerald-700">
          Potential Monthly Savings: <span className="font-bold">{project.savings}</span>
        </p>
      </div>
    </article>
  );
}

function ContactRow({ icon, label, lines, href }: { icon: string; label: string; lines: string[]; href?: string }) {
  const inner = (
    <>
      <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-lg md:text-2xl">{icon}</span>
      </div>
      <div className="min-w-0">
        <div className="text-[10px] md:text-sm font-bold uppercase tracking-wider text-on-surface-variant leading-tight">{label}</div>
        {lines.map((l, i) => (
          <div
            key={l}
            className={`text-xs md:text-base ${i === 0 ? "font-bold text-on-surface" : "text-on-surface-variant"}`}
          >
            {l}
          </div>
        ))}
      </div>
    </>
  );
  const cls =
    "flex items-center gap-2.5 md:gap-4 p-2.5 md:p-4 rounded-xl border border-white/40 bg-white/55 backdrop-blur-md shadow-sm shadow-black/5 " +
    (href ? "hover:border-primary/50 hover:bg-white/75 hover:shadow-md transition-all duration-200" : "");
  return href ? (
    <a
      href={href}
      className={cls}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
