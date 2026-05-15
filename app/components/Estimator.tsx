"use client";

import { useMemo, useState } from "react";

const DEFAULT_RATE = 11.5;
const PEAK_SUN_HOURS = 4.5;
const SAVINGS_FACTOR = 0.85;

type Theme = {
  border: string;
  bgTint: string;
  shadow: string;
  iconBg: string;
  iconText: string;
  iconBgActive: string;
  iconTextActive: string;
  check: string;
  hoverBorder: string;
};

const THEMES: Record<string, Theme> = {
  primary: {
    border: "border-primary",
    bgTint: "bg-primary/5",
    shadow: "shadow-primary/20",
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    iconBgActive: "bg-primary",
    iconTextActive: "text-on-primary",
    check: "text-primary",
    hoverBorder: "hover:border-primary/40",
  },
  secondary: {
    border: "border-secondary",
    bgTint: "bg-secondary/5",
    shadow: "shadow-secondary/20",
    iconBg: "bg-secondary/10",
    iconText: "text-secondary",
    iconBgActive: "bg-secondary",
    iconTextActive: "text-on-secondary",
    check: "text-secondary",
    hoverBorder: "hover:border-secondary/40",
  },
  tertiary: {
    border: "border-tertiary",
    bgTint: "bg-tertiary/5",
    shadow: "shadow-tertiary/20",
    iconBg: "bg-tertiary/10",
    iconText: "text-tertiary",
    iconBgActive: "bg-tertiary",
    iconTextActive: "text-on-tertiary",
    check: "text-tertiary",
    hoverBorder: "hover:border-tertiary/40",
  },
  violet: {
    border: "border-violet-600",
    bgTint: "bg-violet-600/5",
    shadow: "shadow-violet-600/20",
    iconBg: "bg-violet-600/10",
    iconText: "text-violet-600",
    iconBgActive: "bg-violet-600",
    iconTextActive: "text-white",
    check: "text-violet-600",
    hoverBorder: "hover:border-violet-600/40",
  },
};

const SYSTEM_TYPES = {
  "grid-tie": {
    label: "Grid-Tie",
    badgeLabel: "Grid-Tie",
    icon: "bolt",
    blurb: "Feeds excess power back to the grid. The most affordable entry into solar.",
    pros: ["Lowest upfront cost", "Net-metering ready", "Simplest install"],
    costLow: 55_000,
    costHigh: 70_000,
    theme: "primary",
  },
  hybrid: {
    label: "Hybrid",
    badgeLabel: "Hybrid",
    icon: "battery_charging_full",
    blurb: "Solar with battery backup. Keeps essentials running when the grid goes out.",
    pros: ["Backup during outages", "Use solar at night", "Net-metering compatible"],
    costLow: 80_000,
    costHigh: 110_000,
    theme: "secondary",
  },
  "off-grid": {
    label: "Off-Grid",
    badgeLabel: "Off-Grid",
    icon: "power",
    blurb: "Fully independent from the grid. No utility connection or monthly bill needed.",
    pros: ["100% energy independence", "Ideal for remote sites", "Zero monthly bill"],
    costLow: 110_000,
    costHigh: 150_000,
    theme: "tertiary",
  },
  "micro-inverter": {
    label: "Micro Inverter",
    badgeLabel: "Micro",
    icon: "hub",
    blurb: "European micro inverters per panel. Maximum yield, 25-year warranty, battery-ready.",
    pros: ["25-year warranty", "Battery ready", "European brand"],
    costLow: 150_000,
    costHigh: 200_000,
    theme: "violet",
  },
} as const;

type SystemType = keyof typeof SYSTEM_TYPES;
type Mode = "bill" | "kwh";

const fmt = (n: number) => Math.round(n).toLocaleString("en-PH");
const fmt1 = (n: number) => (Math.round(n * 10) / 10).toLocaleString("en-PH");
const fmtK = (n: number) => (Math.round(n / 1000) * 1000).toLocaleString("en-PH");

export default function Estimator() {
  const [mode, setMode] = useState<Mode>("bill");
  const [bill, setBill] = useState(8000);
  const [kwh, setKwh] = useState(700);
  // Stored as a string so the user can transiently clear or edit the field
  // without the displayed value desyncing from a NaN number.
  const [rateText, setRateText] = useState<string>(String(DEFAULT_RATE));
  const rate = (() => {
    const n = Number(rateText);
    return Number.isFinite(n) ? n : DEFAULT_RATE;
  })();
  const [system, setSystem] = useState<SystemType>("grid-tie");

  const sys = SYSTEM_TYPES[system];

  const { monthlyBill, monthlyKwh, dailyKwh, systemKwp, costLow, costHigh, monthlySavings, paybackYears } =
    useMemo(() => {
      const safeRate = Math.max(1, rate || DEFAULT_RATE);
      const monthlyBill = mode === "bill" ? bill : kwh * safeRate;
      const monthlyKwh = mode === "bill" ? bill / safeRate : kwh;
      const dailyKwh = monthlyKwh / 30;
      const systemKwp = dailyKwh / PEAK_SUN_HOURS;
      const costLow = systemKwp * sys.costLow;
      const costHigh = systemKwp * sys.costHigh;
      const monthlySavings = monthlyBill * SAVINGS_FACTOR;
      const avgCost = (costLow + costHigh) / 2;
      const paybackYears = monthlySavings > 0 ? avgCost / (monthlySavings * 12) : 0;
      return { monthlyBill, monthlyKwh, dailyKwh, systemKwp, costLow, costHigh, monthlySavings, paybackYears };
    }, [mode, bill, kwh, rate, sys]);

  const tabBase =
    "px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:translate-y-0.5";

  return (
    <div className="flex flex-col gap-4">
      {/* System type selector */}
      <div className="fade-up">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">System Type</span>
          <span className="text-xs text-on-surface-variant">Pricing varies by configuration</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {(Object.keys(SYSTEM_TYPES) as SystemType[]).map((key) => {
            const opt = SYSTEM_TYPES[key];
            const t = THEMES[opt.theme];
            const active = system === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSystem(key)}
                aria-pressed={active}
                className={`text-left rounded-xl p-2 md:p-4 border-2 transition-all duration-200 cursor-pointer active:translate-y-0.5 ${
                  active
                    ? `${t.border} bg-surface shadow-lg ${t.shadow}`
                    : `border-surface-container-high bg-surface ${t.hoverBorder} hover:shadow-md`
                }`}
              >
                <div className="flex items-center gap-2 min-h-[2.25rem]">
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      active ? `${t.iconBgActive} ${t.iconTextActive}` : `${t.iconBg} ${t.iconText}`
                    }`}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{opt.icon}</span>
                  </div>
                  <div className="font-display font-semibold text-on-surface text-xs md:text-sm leading-tight">{opt.label}</div>
                  {active && (
                    <span className={`ml-auto shrink-0 material-symbols-outlined ${t.check}`} style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>
                      check_circle
                    </span>
                  )}
                </div>
                <p className="hidden md:block text-sm text-on-surface-variant mt-2 min-h-[3.5rem]">{opt.blurb}</p>
                <ul className="mt-2 hidden md:flex flex-col gap-1">
                  {opt.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-on-surface">
                      <span className={`material-symbols-outlined text-base mt-0.5 ${t.iconText}`}>check</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Mobile-only description panel for the active system type */}
        <div className="md:hidden mt-2 rounded-lg border border-surface-container-high bg-surface px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${THEMES[sys.theme].iconBgActive} ${THEMES[sys.theme].iconTextActive}`}>
              <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>{sys.icon}</span>
            </div>
            <div className="font-display font-semibold text-on-surface text-xs">{sys.label}</div>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">{sys.blurb}</p>
          <ul className="mt-1.5 flex flex-col gap-0.5">
            {sys.pros.map((pro) => (
              <li key={pro} className="flex items-center gap-1 text-[11px] text-on-surface">
                <span className={`material-symbols-outlined text-xs ${THEMES[sys.theme].iconText}`}>check</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Inputs */}
        <div className="fade-up lg:col-span-3 bg-surface-container-low rounded-xl p-3 md:p-5 border border-surface-container-high shadow-sm">
          <div
            role="group"
            aria-label="Estimator input mode"
            className="relative inline-grid grid-cols-2 items-center p-1 bg-surface-container-high rounded-full mb-3 md:mb-5"
          >
            {/* Sliding indicator */}
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 left-1 right-1/2 rounded-full bg-primary shadow-md shadow-primary/40 transition-transform duration-300 ease-out"
              style={{ transform: mode === "bill" ? "translateX(0%)" : "translateX(100%)" }}
            />
            <button
              type="button"
              aria-pressed={mode === "bill"}
              onClick={() => setMode("bill")}
              className={`${tabBase} relative z-10 ${mode === "bill" ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              By Bill
            </button>
            <button
              type="button"
              aria-pressed={mode === "kwh"}
              onClick={() => setMode("kwh")}
              className={`${tabBase} relative z-10 ${mode === "kwh" ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              By kWh
            </button>
          </div>

          {mode === "bill" ? (
            <div className="flex flex-col gap-2 md:gap-stack-md">
              <div className="flex items-baseline justify-between">
                <label htmlFor="billSlider" className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                  Monthly Electricity Bill
                </label>
                <div className="text-xl md:text-2xl font-display font-semibold text-primary">
                  <span className="text-on-surface-variant text-base font-normal">₱</span>
                  {fmt(monthlyBill)}
                </div>
              </div>
              <input
                id="billSlider"
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={bill}
                aria-valuetext={`₱${fmt(bill)}`}
                aria-describedby="estimatorResults"
                onChange={(e) => setBill(Number(e.target.value))}
                className="bt-fire-slider w-full"
              />
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>₱1,000</span>
                <span>₱50,000</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 md:gap-stack-md">
              <div className="flex items-baseline justify-between">
                <label htmlFor="kwhSlider" className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                  Monthly Consumption
                </label>
                <div className="text-xl md:text-2xl font-display font-semibold text-primary">
                  {fmt(monthlyKwh)}
                  <span className="text-on-surface-variant text-base font-normal ml-1">kWh</span>
                </div>
              </div>
              <input
                id="kwhSlider"
                type="range"
                min={100}
                max={5000}
                step={50}
                value={kwh}
                aria-valuetext={`${fmt(kwh)} kilowatt-hours`}
                aria-describedby="estimatorResults"
                onChange={(e) => setKwh(Number(e.target.value))}
                className="bt-fire-slider w-full"
              />
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>100 kWh</span>
                <span>5,000 kWh</span>
              </div>
            </div>
          )}

          {mode === "bill" && (
          <div className="mt-3 pt-3 md:mt-5 md:pt-4 border-t border-surface-container-high">
            <label htmlFor="rate" className="text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant">
              Price per kWh (PHP)
            </label>
            <div className="mt-2 flex items-center gap-2 md:gap-3">
              <div className="relative w-28">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">₱</span>
                <input
                  id="rate"
                  type="number"
                  min={1}
                  max={30}
                  step={0.01}
                  value={rateText}
                  onChange={(e) => setRateText(e.target.value)}
                  onBlur={(e) => {
                    const n = Number(e.target.value);
                    if (!Number.isFinite(n) || n < 1) setRateText(String(DEFAULT_RATE));
                    else if (n > 30) setRateText("30");
                    else setRateText(String(n));
                  }}
                  className="w-full pl-7 py-2 rounded-lg border-2 border-on-surface-variant/25 bg-surface-container-lowest hover:border-primary/40 hover:bg-surface focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-200"
                />
              </div>
              <button
                type="button"
                onClick={() => setRateText(String(DEFAULT_RATE))}
                className="text-xs md:text-sm font-bold uppercase tracking-wider text-secondary hover:underline"
              >
                Reset default
              </button>
            </div>
            <p className="text-[10px] md:text-xs text-on-surface-variant mt-1.5 md:mt-2 leading-snug">
              Default reflects a typical Meralco residential rate. Adjust to match your latest bill for an accurate estimate.
            </p>
          </div>
          )}
        </div>

        {/* Results */}
        <div
          id="estimatorResults"
          aria-live="polite"
          className="fade-up lg:col-span-2 bg-primary text-on-primary rounded-xl p-3 md:p-5 shadow-md flex flex-col gap-2 md:gap-3"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="text-[11px] md:text-sm font-bold uppercase tracking-wider opacity-80 leading-tight">Estimated Installation Cost</div>
            <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/15 text-[10px] md:text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-xs md:text-sm">{sys.icon}</span>
              {sys.badgeLabel}
            </div>
          </div>
          <div className="text-lg md:text-3xl font-display font-bold leading-tight">
            <span className="whitespace-nowrap">₱{fmtK(costLow)}</span> – <span className="whitespace-nowrap">₱{fmtK(costHigh)}</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 md:gap-3 mt-0.5 md:mt-1 pt-2 md:pt-3 border-t border-white/20">
            <Stat label="System Size" value={`${fmt1(systemKwp)} kWp`} />
            <Stat label="Daily Output" value={`~${fmt(dailyKwh)} kWh`} />
            <Stat label="Monthly Savings" value={`₱${fmt(monthlySavings)}`} />
            <Stat label="Payback" value={`~${fmt1(paybackYears)} yrs`} />
          </div>

          <a
            href="#quote"
            className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs md:px-5 md:py-3 md:text-sm bg-on-primary text-primary font-bold uppercase tracking-wider rounded-full hover:bg-white transition-all duration-200 shadow-xl shadow-black/25 hover:shadow-2xl hover:shadow-black/35 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-md"
          >
            Request a Real Quote
            <span className="material-symbols-outlined text-base md:text-lg">arrow_forward</span>
          </a>
          <p className="text-[10px] md:text-xs opacity-80 leading-snug">Indicative only. Actual cost depends on roof type, hardware tier, and site conditions.</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-80 leading-tight">{label}</div>
      <div className="text-sm md:text-base font-display font-semibold mt-0.5">{value}</div>
    </div>
  );
}
