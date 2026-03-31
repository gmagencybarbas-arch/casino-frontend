"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import coinmachinegaming from "@/components/ProviderLogo/logos_provedor/coinmachinegaming.svg";
import microgaming from "@/components/ProviderLogo/logos_provedor/microgaming.svg";
import nekogames from "@/components/ProviderLogo/logos_provedor/nekogames.svg";
import popokgaming from "@/components/ProviderLogo/logos_provedor/popokgaming.svg";
import publicLogo from "@/components/ProviderLogo/logos_provedor/public.svg";
import public1 from "@/components/ProviderLogo/logos_provedor/public (1).svg";
import public2 from "@/components/ProviderLogo/logos_provedor/public (2).svg";

const PROVIDER_LOGOS = [
  { src: coinmachinegaming, alt: "Coin Machine Gaming" },
  { src: microgaming, alt: "Microgaming" },
  { src: nekogames, alt: "Neko Games" },
  { src: popokgaming, alt: "PopOK Gaming" },
  { src: publicLogo, alt: "Provedor" },
  { src: public1, alt: "Provedor" },
  { src: public2, alt: "Provedor" },
] as const;

/** Repetição para loop infinito estável no Swiper */
const MARQUEE_LOGOS = [...PROVIDER_LOGOS, ...PROVIDER_LOGOS, ...PROVIDER_LOGOS, ...PROVIDER_LOGOS];

export function ProvidersBlock() {
  return (
    <section className="mb-12" aria-label="Provedores">
      <div className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
        <h3 className="border-b border-[var(--color-border)] px-4 py-4 text-base font-bold text-[var(--color-text)] md:px-6 md:text-lg">
          Provedores
        </h3>
        <div className="relative overflow-hidden px-2 py-5 md:px-4 md:py-6">
          <style dangerouslySetInnerHTML={{ __html: `
            .providers-marquee-swiper .swiper-wrapper {
              transition-timing-function: linear !important;
            }
          `}} />
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-[var(--color-card)] to-transparent md:w-12"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-[var(--color-card)] to-transparent md:w-12"
            aria-hidden
          />

          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView="auto"
            loop
            speed={14000}
            allowTouchMove
            grabCursor
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="providers-marquee-swiper"
            breakpoints={{
              0: { spaceBetween: 16 },
              768: { spaceBetween: 28 },
            }}
          >
            {MARQUEE_LOGOS.map((logo, index) => (
              <SwiperSlide
                key={`${logo.alt}-${index}`}
                className="!flex !w-auto items-center justify-center"
                style={{ width: "auto" }}
              >
                <div
                  className="flex h-11 w-[100px] shrink-0 items-center justify-center px-2 sm:h-12 sm:w-[120px] md:h-14 md:w-[140px] lg:w-[152px]"
                  title={logo.alt}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={152}
                    height={56}
                    className="max-h-11 max-w-full object-contain sm:max-h-12 md:max-h-14"
                    unoptimized
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
