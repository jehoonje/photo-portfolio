// app/page.js
"use client";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import gsap from "gsap";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import FixedFooter from "./components/FixedFooter";
import BootScreen from "./components/BootScreen";

// 클라이언트 사이드에서만 로드되는 컴포넌트
const PhotosSection = dynamic(() => import("./components/PhotosSection"), {
  ssr: false,
});
const MixSection = dynamic(() => import("./components/MixSection"), {
  ssr: false,
});

export default function Home() {
  const aboutRef = useRef(null);
  const photosRef = useRef(null);
  const mixRef = useRef(null);
  const footerRef = useRef(null);
  const footerTextRef = useRef(null);
  const [scrollTriggerLoaded, setScrollTriggerLoaded] = useState(false);
  const [isGsapReady, setIsGsapReady] = useState(false);
  const [isBootScreenVisible, setIsBootScreenVisible] = useState(true);

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
    if (
      !scrollTriggerLoaded ||
      !aboutRef.current ||
      !photosRef.current ||
      !mixRef.current ||
      !footerRef.current ||
      !footerTextRef.current
    )
      return;

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
            end: "+=1200",
            pin: true,
            scrub: 1.5, // 🎯 자연스러운 애니메이션 속도 조정
            anticipatePin: 1,
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
        scrub: 1.5, // 🎯 자연스럽게 따라오도록 설정
        anticipatePin: 1,
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

      // 🎯 **FixedFooter - Get in Touch 자연스럽게 페이드인**
      gsap.set(footerTextRef.current, { opacity: 0, y: 30 });

      gsap.to(footerTextRef.current, {
        opacity: 1,
        y: -20,
        duration: 2, // 서서히 나타나는 효과 추가
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", // 🔹 화면의 85%에 도달하면 트리거 시작
          toggleActions: "play none none none", // 🔹 한 번만 실행되도록 설정
        },
      });

      // 모든 트리거 최신화
      ScrollTrigger.refresh();

      // ✅ gsap 로딩 완료 후 BootScreen 제거 (5초 후)
      setIsGsapReady(true);
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

      {/* ✅ BootScreen 추가 - GSAP 로딩 후 5초 후에 페이드아웃 */}
      {isBootScreenVisible && (
        <BootScreen onLoaded={() => setIsBootScreenVisible(false)} />
      )}

      <Header />
      <HeroSection />

      {/* 🔴 About Section */}
      <div ref={aboutRef}>
        <AboutSection aboutRef={aboutRef} />
      </div>

      {/* 🔵 Photos Section */}
      <div ref={photosRef}>
        <PhotosSection photosRef={photosRef} />
      </div>

      {/* 🟢 Mix Section */}
      <div ref={mixRef}>
        <MixSection mixRef={mixRef} />
      </div>

      {/* 🎯 FixedFooter */}
      <div ref={footerRef}>
        <FixedFooter footerTextRef={footerTextRef} />
      </div>
    </>
  );
}