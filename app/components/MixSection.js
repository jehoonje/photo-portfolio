"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MixSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let tl;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const iframes = containerRef.current.querySelectorAll("iframe");

      // 초기 opacity 0 설정
      gsap.set(iframes, { opacity: 0 });

      // 타임라인 및 ScrollTrigger 설정
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500",
          scrub: true,
          pin: true,
        },
      });

      // iframe들을 순차적으로 페이드 인
      tl.to(iframes, {
        opacity: 1,
        duration: 1,
        stagger: 0.3,
      });

      ScrollTrigger.refresh();
    });

    return () => {
      if (tl) {
        tl.kill();
      }

      // pinned 상태로 남은 DOM 스타일 복원 (clearProps)
      if (sectionRef.current) {
        gsap.set(sectionRef.current, { clearProps: "all" });
      }

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="articles"
      className="relative w-4/5 min-h-screen bg-black flex items-center justify-center"
      style={{
        height: "100vh",
        margin: "0 auto",
        marginBottom: "200px",
        borderTop: "4px solid #111a",
      }}
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Sets</h2>
        {/* 모바일: flex-col, md 이상: flex-row + flex-wrap */}
        <div
          ref={containerRef}
          className="w-[100%] mx-auto bg-black flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-5"
        >
          {[
            "1831342242",
            "1926103367",
            "1418699092",
            "1629740511",
            "1655524542",
            "1705728921",
            "1726012296",
            "1953712599",
          ].map((trackId) => (
            <iframe
              key={trackId}
              className="md:w-[40%] w-[100%] h-[20px] md:h-[120px]"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&inverse=true&auto_play=false&show_user=true`}
            ></iframe>
          ))}
        </div>
      </div>
    </section>
  );
}
