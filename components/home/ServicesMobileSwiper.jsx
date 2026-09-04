"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "@/styles/styles.css";

export default function ServicesMobileSwiper({ services }) {
  return (
    <div className="md:hidden">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {services.map((service, index) => (
          <SwiperSlide key={service.id || index}>
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden bg-card border border-border">
              <div className="relative h-48 w-full">
                <Image
                  src={service.image || `/car${index + 1}.jpg`}
                  alt={service.title}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col justify-between h-[calc(460px-192px)]">
                <div>
                  <h3 className="text-base font-bold uppercase mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center text-xs py-1.5 px-2.5 bg-secondary rounded mb-3">
                    <span className="font-bold text-primary">{service.price}</span>
                    <span className="text-muted-foreground">{service.duration}</span>
                  </div>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    {service.features?.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 size={11} className="text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="w-full text-center bg-primary text-primary-foreground py-2.5 rounded text-xs font-bold uppercase tracking-wider"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

