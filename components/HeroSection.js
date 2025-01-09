// components/HeroSection.js
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // Ensure proper import for Next.js

export default function HeroSection() {
  // References for DOM elements
  const cloudRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);


    // Fade out text as user scrolls
    gsap.to(textRef.current, {
      opacity: 0,
      y: 0, // Optional: move text upwards as it fades
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });

    // Optional: Pin the hero section during the scroll animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%', // Adjust the end point as needed
      pin: true,
      pinSpacing: false,
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Hero 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpeg"
          alt="Hero Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Hero 텍스트 */}
      <div
        ref={textRef}
        className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 transition-opacity duration-500"
      >
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to My Portfolio</h1>
        <p className="mt-4 text-lg md:text-xl">Scroll down to explore</p>
      </div>
    </section>

    
  );
}
