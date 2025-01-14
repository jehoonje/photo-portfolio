import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MixSection() {
  const sectionRef = useRef(null); // 섹션 전체
  const containerRef = useRef(null); // 실제 고정·애니메이션 대상
  const [isPinned, setIsPinned] = useState(false);

  // GSAP 타임라인 (paused: true → 수동으로 progress 조절)
  const tl = useRef(null);

  useEffect(() => {
    // 섹션 안의 containerRef에 간단한 애니메이션 예시 (scale 1 → 1.1)
    // 실제로는 opactiy, translate 등 원하는 만큼 .to()를 체인으로 연결해도 됨
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(containerRef.current, {
      scale: 1.1,
      duration: 1,
      ease: "none",
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current || !containerRef.current) return;

      // 전체 섹션의 위치 & 높이
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      // 현재 스크롤 y
      const scrollY = window.scrollY || window.pageYOffset;
      // 뷰포트 높이
      const windowH = window.innerHeight;

      /* 
        기존 코드에서 
          const startPin = sectionTop - windowH + 1800;
          const endPin = startPin + 1200;
        와 같은 식으로 인위적인 값을 더해줬기 때문에
        포토 섹션 이후 ‘바로’ 시작되지 않았습니다.

        원하는 구현:
        "포토 섹션의 scrolltrigger가 끝나고 스크롤을 내리다가,
         MixSection의 '최상단이 뷰포트 맨 위'에 닿는 순간 pin이 시작."
        → startPin = sectionTop
        → 일정 구간(예: 1200px) 동안 pin을 유지하려면 endPin = startPin + 1200
      */

      const startPin = sectionTop - 20;
      const endPin = startPin + 2000; // 고정 구간 길이 예시

      if (scrollY >= startPin && scrollY <= endPin) {
        // 고정 상태
        setIsPinned(true);

        // 고정 구간 내 스크롤 비율 (0 ~ 1)
        const progress = (scrollY - startPin) / (endPin - startPin);
        // 타임라인 진행도도 동일 비율로
        if (tl.current) {
          tl.current.progress(progress);
        }
      } else {
        setIsPinned(false);
        // 범위를 벗어나면 맨 앞(0) 또는 맨 끝(1)에 고정
        if (scrollY < startPin && tl.current) {
          tl.current.progress(0);
        } else if (scrollY > endPin && tl.current) {
          tl.current.progress(1);
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="articles"
      className="relative w-full min-h-screen bg-black flex items-center justify-center"
      style={{
        minHeight: "2000px",
        height: "140vh",
        margin: "0 auto",
        marginBottom: "400px",
        borderTop: "4px solid #111a",
      }}
    >
      {/* 
        고정 대상(containerRef)에 대해 
        isPinned가 true면 position: fixed (top:0), 
        false면 원래 흐름대로 relative 
      */}
      <div
        ref={containerRef}
        style={{
          width: "80%",
          margin: "0 auto",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          position: isPinned ? "fixed" : "relative",
          top: isPinned ? "30%" : "auto",
          left: isPinned ? "10%" : "auto",
        }}
      >
        <>
          <iframe
            width="40%"
            height="120"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            width="40%"
            height="120"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            width="40%"
            height="120"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            width="40%"
            height="120"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            width="40%"
            height="120"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            width="40%"
            height="120"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
        </>
      </div>
    </section>
  );
}
