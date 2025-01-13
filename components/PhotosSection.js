import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import styles from "./PhotosSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PhotosSection({ onResourceLoad }) {
  const photoRef = useRef(null);
  const images = [
    "/images/photo1.jpeg",
    "/images/photo2.jpeg",
    "/images/photo3.jpeg",
    "/images/photo4.jpeg",
    "/images/photo5.jpeg",
    "/images/photo6.jpeg",
    "/images/photo7.jpeg",
    "/images/photo8.jpeg",
    "/images/photo9.jpeg",
    "/images/photo10.jpeg",
  ];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate image loading
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!photoRef.current) return;

    const photosTrigger = ScrollTrigger.create({
      trigger: photoRef.current,
      start: "top top",
      end: "+=800",
      pin: true,
      pinSpacing: true,
      markers: true,
    });

    return () => {
      photosTrigger.kill();
    };
  }, []);

  return (
    <section
      id="photos"
      ref={photoRef}
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{
        width: "80vw",
        margin: "0 auto",
        height: "140vh",
        paddingBottom: "350px",
        borderTop: "4px solid #111a",
      }}
    >
      <Swiper
        modules={[EffectCoverflow, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        initialSlide={1}
        slidesPerView={3}
        loop={true}
        speed={800}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          1400: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          640: { slidesPerView: 1.5, spaceBetween: 10 },
          0: { slidesPerView: 1.5, spaceBetween: 5 },
        }}
        onImagesReady={() => setIsLoading(false)}
        className={`swiper-container ${isLoading ? "loading" : ""}`}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div className={styles.slideInner}>
              <Image
                src={src}
                alt={`Photo ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className={styles.entityImg}
                // 사진 1장 로딩 완료 시 onResourceLoad 호출
                onLoadingComplete={() => onResourceLoad && onResourceLoad()}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>Photo {index + 1}</h3>
              <span className={styles.caption}>
                This is a caption for photo {index + 1}.
              </span>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </section>
  );
}
