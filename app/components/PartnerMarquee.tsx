import Image from "next/image";
import ScrollParallax from "./ScrollParallax";

const partners = [
  { src: "/partners/canadian solar.png", alt: "Canadian Solar" },
  { src: "/partners/longi.png", alt: "LONGi" },
  { src: "/partners/trinasolar.png", alt: "Trina Solar" },
  { src: "/partners/seraphim.png", alt: "Seraphim" },
  { src: "/partners/fronius.png", alt: "Fronius" },
  { src: "/partners/deye.png", alt: "Deye" },
  { src: "/partners/luxpower.png", alt: "LuxPower" },
  { src: "/partners/afore.png", alt: "Afore" },
  { src: "/partners/enphase.png", alt: "Enphase" },
];

export default function PartnerMarquee() {
  // Duplicate the list so the loop has no visible seam.
  const loop = [...partners, ...partners];

  return (
    <section aria-label="Trusted hardware partners" className="relative px-gutter pt-12 md:pt-16 pb-section-padding bg-surface overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[80%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-0 select-none opacity-30"
      >
        <ScrollParallax speed={0.18}>
          <div className="bt-anim-float">
            <Image
              src="/solar.png"
              alt=""
              aria-hidden="true"
              width={2048}
              height={2048}
              className="bt-anim-rotate w-[35vw] max-w-[220px] md:w-[22vw] md:max-w-[280px] h-auto"
            />
          </div>
        </ScrollParallax>
      </div>
      <div className="relative max-w-(--container-max) mx-auto">
        <div className="flex flex-col items-center text-center mb-10 fade-up-mid">
          <Image
            src="/Logo.png"
            alt="Blaze Tech Devt OPC logo"
            width={320}
            height={320}
            className="bt-logo-glow h-56 w-56 md:h-72 md:w-72 lg:h-96 lg:w-96 object-contain mt-16 md:mt-24 mb-4"
          />
          <span className="text-sm font-bold uppercase tracking-wider text-primary">Trusted Partners</span>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-on-surface mt-2">
            Powered by world-class hardware
          </h2>
        </div>

        <div className="bt-marquee-mask overflow-hidden">
          <div className="flex animate-bt-marquee gap-12 md:gap-16">
            {loop.map((p, i) => (
              <div
                key={`${p.alt}-${i}`}
                className="flex items-center justify-center shrink-0 h-16 md:h-20 w-40 md:w-48"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={200}
                  height={80}
                  className="max-h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
