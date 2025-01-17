import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function AboutSection({ aboutRef }) {
  const lines = [
    `Hello, I'm a passionate developer with a love for creating interactive web applications that combine style and functionality.`,
    `As you scroll, this text transitions from gray to white, symbolizing the brightening of new ideas and experiences in my journey.`,
    `Once the text is fully white, you can continue exploring the rest of my portfolio below.`,
  ];

  useEffect(() => {
    if (typeof window === "undefined" || !aboutRef?.current) return;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const aboutLines = aboutRef.current.querySelectorAll(".about-line");

      if (aboutLines.length === 0) {
        console.warn("❌ No elements found with class `.about-line`");
        return;
      }

      console.log("✅ Found about-line elements:", aboutLines);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top center",
          end: "bottom center",
          pin: true,
          scrub: true,
        },
      });

      // ✅ 모든 `.about-line` 요소를 한 번에 애니메이션 적용
      tl.to(aboutLines, {
        color: "#fff",
        duration: 1.5,
        stagger: 0.3,
      });

      ScrollTrigger.refresh();
    });

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      });
    };
  }, [aboutRef]);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">About</h2>

      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto">
        {/* Left-side image */}
        <div className="w-full md:w-1/2 h-full p-4 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/about.jpg`}
              alt="About Image"
              layout="fill"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right-side text */}
        <div className="w-full md:w-1/2 p-6 text-lg leading-relaxed text-gray-500">
          {lines.map((text, idx) => (
            <p key={idx} className="about-line mb-4">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
