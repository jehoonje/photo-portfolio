import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import gsap from "gsap";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FixedFooter from "../components/FixedFooter";

// 클라이언트 사이드에서만 로드되는 컴포넌트
const PhotosSection = dynamic(() => import("../components/PhotosSection"), { ssr: false });
const MixSection = dynamic(() => import("../components/MixSection"), { ssr: false });

export default function Home() {
  const aboutRef = useRef(null);
  const photosRef = useRef(null);
  const mixRef = useRef(null);
  const [scrollTriggerLoaded, setScrollTriggerLoaded] = useState(false);

  // 📌 `ScrollTrigger`를 동적으로 import하고 등록
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        setScrollTriggerLoaded(true);
      });
    }
  }, []);

  // 📌 `scrollTriggerLoaded`가 true일 때만 실행
  useEffect(() => {
    if (!scrollTriggerLoaded || !aboutRef.current || !photosRef.current || !mixRef.current) return;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      // 기존 ScrollTrigger 제거
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      console.log("✅ ScrollTrigger initialized");

      // 🔴 **AboutSection - 텍스트 색상 애니메이션**
      const aboutLines = aboutRef.current?.querySelectorAll(".about-line");
      if (aboutLines) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top top",
            end: "+=800",
            pin: true,
            scrub: true,
          },
        });

        aboutLines.forEach((line, index) => {
          aboutTl.to(line, { color: "#fff", duration: 1 }, `+=${index * 0.3}`);
        });
      }

      // 🔵 **PhotosSection - Swiper 포함**
      ScrollTrigger.create({
        trigger: photosRef.current,
        start: "top top",
        end: "+=800",
        pin: true,
        pinSpacing: true,
        scrub: true,
      });

      // 🟢 **MixSection - iframe 페이드 인**
      const mixIframes = mixRef.current?.querySelectorAll("iframe");
      if (mixIframes) {
        const mixTl = gsap.timeline({
          scrollTrigger: {
            trigger: mixRef.current,
            start: "top top",
            end: "+=1500",
            pin: true,
            scrub: true,
          },
        });

        mixTl.to(mixIframes, { opacity: 1, duration: 1, stagger: 0.5 });
      }

      // 모든 트리거 최신화
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [scrollTriggerLoaded]);

  return (
    <>
      <Head>
        <title>My Portfolio</title>
      </Head>
      <Header />
      <HeroSection />

      {/* 🔴 About Section */}
      <div ref={aboutRef}>
        <AboutSection aboutRef={aboutRef}  />
      </div>

      {/* 🔵 Photos Section */}
      <div ref={photosRef}>
        <PhotosSection photosRef={photosRef}  />
      </div>

      {/* 🟢 Mix Section */}
      <div ref={mixRef}>
        <MixSection mixRef={mixRef} />
      </div>

      <FixedFooter />
    </>
  );
}
