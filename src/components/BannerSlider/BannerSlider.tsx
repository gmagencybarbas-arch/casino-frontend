"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { api } from "@/services/api";
import "swiper/css";
import "swiper/css/pagination";

interface Banner {
  id: string;
  image: string;
  link: string;
  title: string;
}

const BANNER_ASPECT = 629 / 294;
const BANNER_ASPECT_MOBILE = 16 / 9;

export function BannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const mobileRef = useRef<SwiperType | null>(null);
  const desktopRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    api.getBanners().then(setBanners);
  }, []);

  if (banners.length === 0) return null;

  const desktopBanners = banners.length > 1 ? banners.slice(1) : banners;

  return (
    <>
      {/* Tablet + Celular: 1 slide por vez, altura proporcional à tela (vh) */}
      <section className="relative mb-6 overflow-hidden px-2 lg:hidden" aria-label="Banner promocional">
        <div className="w-full overflow-hidden rounded-[12px] h-[22vh] min-h-[100px] max-h-[200px] sm:h-[26vh] sm:max-h-[240px]">
          <Swiper
            onSwiper={(swiper) => { mobileRef.current = swiper; }}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={0}
            loop={true}
            grabCursor={true}
            speed={600}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".hero-banner-pagination-mobile", bulletClass: "hero-banner-bullet", bulletActiveClass: "hero-banner-bullet-active" }}
            className="!overflow-hidden rounded-[12px] h-full"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id} className="!w-full !h-full">
                <Link
                  href={banner.link}
                  className="relative block w-full h-full overflow-hidden rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)]"
                >
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority
                    unoptimized
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="hero-banner-pagination-mobile mt-2 flex justify-center gap-1.5" />
        </div>
      </section>

      {/* Desktop: apenas a partir de lg */}
      {desktopBanners.length > 0 && (
      <section className="relative mb-10 hidden lg:block">
        <div className="mx-auto flex w-full max-w-[1400px] items-center gap-2 px-2 md:gap-3 md:px-6">
          <button
            type="button"
            onClick={() => desktopRef.current?.slidePrev()}
            aria-label="Banner anterior"
            className="z-50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-text)] shadow-[var(--shadow-card)] ring-1 ring-[var(--color-background)] transition-all hover:scale-105 hover:shadow-[var(--shadow-card-hover)] md:h-9 md:w-9"
          >
            <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent md:w-16"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[var(--color-background)] via-transparent to-transparent md:w-16"
              aria-hidden
            />
            <Swiper
              onSwiper={(swiper) => { desktopRef.current = swiper; }}
              modules={[Autoplay, Pagination]}
              slidesPerView={2}
              centeredSlides={false}
              slidesPerGroup={1}
              spaceBetween={24}
              grabCursor={true}
              loop={true}
              speed={600}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                el: ".hero-banner-pagination-desktop",
                bulletClass: "hero-banner-bullet",
                bulletActiveClass: "hero-banner-bullet-active",
              }}
              className="hero-banner-swiper relative z-0 !pb-2"
            >
              {desktopBanners.map((banner) => (
                <SwiperSlide key={banner.id}>
                  <Link
                    href={banner.link}
                    className="group relative block overflow-hidden rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-all duration-500 hover:shadow-[var(--shadow-card-hover)]"
                    style={{ aspectRatio: String(BANNER_ASPECT) }}
                  >
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="629px"
                      priority
                      unoptimized
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            type="button"
            onClick={() => desktopRef.current?.slideNext()}
            aria-label="Próximo banner"
            className="z-50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-text)] shadow-[var(--shadow-card)] ring-1 ring-[var(--color-background)] transition-all hover:scale-105 hover:shadow-[var(--shadow-card-hover)] md:h-9 md:w-9"
          >
            <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="hero-banner-pagination-desktop mx-auto mt-4 flex max-w-[1400px] justify-center gap-1.5 px-2 md:px-6" />
      </section>
      )}
    </>
  );
}
