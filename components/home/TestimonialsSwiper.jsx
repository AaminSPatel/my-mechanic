"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/styles.css";

export default function TestimonialsSwiper({ reviews }) {
  return (
    <div className="mb-12">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="pb-12"
      >
        {reviews.map((item, i) => (
          <SwiperSlide key={i} className="h-auto">
            <div className="bg-card border border-border/80 rounded-2xl p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={14} className="fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                    {item.service}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground">
                    {item.vehicle} · {item.location}
                  </p>
                </div>
                <CheckCircle2 size={16} className="text-emerald-500" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

