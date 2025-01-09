// components/PhotosSection.jsx

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './PhotosSection.module.css'; // CSS Module

export default function PhotosSection() {
  const images = [
    '/images/photo1.jpeg',
    '/images/photo2.jpeg',
    '/images/photo3.jpeg',
    '/images/photo4.jpeg',
    '/images/photo5.jpeg',
    '/images/photo6.jpeg',
    '/images/photo7.jpeg',
    '/images/photo8.jpeg',
    '/images/photo9.jpeg',
    '/images/photo10.jpeg',
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate image loading
    setIsLoading(false);
  }, []);

  return (
    <section
      id="photos"
      className={`relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden`}
      style={{ height: '150vh' }} // Ensures sufficient scroll length
    >
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // Default to 3 slides
        loop={true}
        speed={800}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          1400: { // Extra large screens
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: { // Desktop
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: { // Tablets
            slidesPerView: 2,
            spaceBetween: 15,
          },
          640: { // Small tablets
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          0: { // Mobile
            slidesPerView: 1.5,
            spaceBetween: 5,
          },
        }}
        onImagesReady={() => setIsLoading(false)}
        className={`swiper-container ${isLoading ? 'loading' : ''}`}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div className={styles.slideInner}>
              <Image
                src={src}
                alt={`Photo ${index + 1}`}
                layout="responsive"
                width={500}
                height={500}
                className={styles.entityImg}
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

        {/* Pagination */}
        <div className="swiper-pagination"></div>

        {/* Navigation Buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </section>
  );
}
