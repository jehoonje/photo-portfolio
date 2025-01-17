import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // Ensure proper import for Next.js

export default function HeroSection() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create the fade animation and assign its trigger instance
    const fadeTrigger = gsap.to(textRef.current, {
      opacity: 0,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });

    // Create a ScrollTrigger instance for pinning
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%', // Adjust the end point as needed
      pin: true,
      pinSpacing: false,
    });

    // Cleanup only these local triggers on unmount
    return () => {
      fadeTrigger.scrollTrigger && fadeTrigger.scrollTrigger.kill();
      pinTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpeg"
          alt="Hero Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Hero text */}
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
