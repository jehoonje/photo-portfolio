import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import styles from "./PhotosSection.module.css";

export default function PhotosSection({ onResourceLoad }) {
  const photoRef = useRef(null);
  const swiperRef = useRef(null); // Swiper를 감싸는 부모 컨테이너
  const [scrollTriggerLoaded, setScrollTriggerLoaded] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const images = [
    `${basePath}/images/photo1.jpeg`,
    `${basePath}/images/photo2.jpeg`,
    `${basePath}/images/photo3.jpeg`,
    `${basePath}/images/photo4.jpeg`,
    `${basePath}/images/photo5.jpeg`,
    `${basePath}/images/photo6.jpeg`,
    `${basePath}/images/photo7.jpeg`,
    `${basePath}/images/photo8.jpeg`,
    `${basePath}/images/photo9.jpeg`,
    `${basePath}/images/photo10.jpeg`,
  ];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        setScrollTriggerLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!scrollTriggerLoaded || !photoRef.current || !swiperRef.current) return;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      console.log("✅ ScrollTrigger loaded in PhotosSection");

      // ✅ 기존 ScrollTrigger 제거
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const photosTrigger = ScrollTrigger.create({
        trigger: swiperRef.current, // ✅ Swiper가 아닌 부모 컨테이너를 `trigger`로 설정
        start: "top top",
        end: "+=800",
        scrub: true,
        pin: true,
        pinSpacing: true, // ✅ Swiper가 포함된 상태에서도 자연스러운 스크롤 유지
        markers: false,
      });

      // ✅ 모든 트리거 최신화
      ScrollTrigger.refresh();

      return () => {
        try {
          photosTrigger.kill();
        } catch (error) {
          console.warn("ScrollTrigger cleanup error:", error);
        }
      };
    });
  }, [scrollTriggerLoaded, isLoading]);

  return (
    <>
      <section
        id="photos"
        ref={photoRef}
        className="relative w-full min-h-screen bg-black flex items-center justify-center"
        style={{
          width: "80vw",
          margin: "0 auto",
          height: "140vh",
          marginBottom: "500px",
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
                {/* <div className={styles.content}>
                <h3 className={styles.title}>Photo {index + 1}</h3>
                <span className={styles.caption}>
                  This is a caption for photo {index + 1}.
                </span>
              </div> */}
              </SwiperSlide>
            ))}

            {/* Navigation Buttons */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Swiper>
        
      </section>
    </>
  );
}
