"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Winner {
  id: string;
  gameName: string;
  amount: string;
  image: string;
}

const WINNERS: Winner[] = [
  { id: "1", gameName: "Fortune Tiger", amount: "R$ 453,32", image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=120&h=120&fit=crop" },
  { id: "2", gameName: "Sweet Bonanza", amount: "R$ 1.250,00", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&h=120&fit=crop" },
  { id: "3", gameName: "Gates of Olympus", amount: "R$ 89,50", image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=120&h=120&fit=crop" },
  { id: "4", gameName: "Aviator", amount: "R$ 3.400,10", image: "https://images.unsplash.com/photo-1585465225028-eb69680370d5?w=120&h=120&fit=crop" },
  { id: "5", gameName: "Spaceman", amount: "R$ 215,80", image: "https://images.unsplash.com/photo-1614064005856-df53df6714eb?w=120&h=120&fit=crop" },
  { id: "6", gameName: "Mines", amount: "R$ 540,25", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=120&h=120&fit=crop" },
  { id: "7", gameName: "Roleta Ao Vivo", amount: "R$ 7.800,00", image: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=120&h=120&fit=crop" },
  { id: "8", gameName: "Crazy Time", amount: "R$ 4.320,15", image: "https://images.unsplash.com/photo-1595908906155-728b12f7bb7e?w=120&h=120&fit=crop" },
  { id: "9", gameName: "Fortune Ox", amount: "R$ 134,90", image: "https://images.unsplash.com/photo-1533421821268-87e4242d501d?w=120&h=120&fit=crop" },
  { id: "10", gameName: "Big Bass Splash", amount: "R$ 670,40", image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=120&h=120&fit=crop" },
];

export function WinnersStrip() {
  return (
    <div className="relative mb-8 mt-4 overflow-hidden px-2 md:px-6">
      <style dangerouslySetInnerHTML={{ __html: `
        .winners-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}} />
      
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[var(--color-background)] to-transparent md:w-20" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[var(--color-background)] to-transparent md:w-20" aria-hidden />
      
      <Swiper
        modules={[Autoplay]}
        spaceBetween={12}
        slidesPerView="auto"
        loop={true}
        speed={4000}
        allowTouchMove={true}
        grabCursor={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="winners-swiper"
      >
        {WINNERS.map((winner, index) => (
          <SwiperSlide key={`${winner.id}-${index}`} style={{ width: "auto" }}>
            <div className="flex h-10 items-center gap-3 rounded-full bg-[var(--color-card)] py-1 pl-1 pr-4 shadow-sm transition-shadow hover:shadow-md border border-[var(--color-border)]">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={winner.image}
                  alt={winner.gameName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap text-xs font-medium">
                <span className="text-[var(--color-text)]">
                  {winner.gameName}
                </span>
                <span className="text-[var(--color-text-muted)]">—</span>
                <span className="font-bold text-[var(--color-primary)]">
                  {winner.amount}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
