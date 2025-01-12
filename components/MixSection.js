import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MixSection() {
  const containerRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    console.log("containerRef.current:", containerRef.current); // 디버깅 로그 추가
    if (typeof window !== "undefined" && containerRef.current && hasMounted) {
      try { // try-catch 블록 추가
        const MixTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top+=50 top",
          end: "top",
          pin: true,
        });

        return () => {
          MixTrigger.kill();
        };
      } catch (error) {
        console.error("ScrollTrigger Error:", error); // 에러 로깅
      }
    }
  }, [hasMounted]);

  const attributionStyle = { // 스타일 객체 분리
    fontSize: "10px",
    color: "#cccccc",
    lineBreak: "anywhere",
    wordBreak: "normal",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
    fontWeight: 100,
  };

  const linkStyle = { color: "#cccccc", textDecoration: "none" };

  return (
    <section
      id="mixes"
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{
        margin: "0 auto",
        paddingBottom: "200px",
        borderTop: "4px solid #111a",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "70%",
          aspectRatio: "16/9",
          backgroundColor: "#000",
        }}
      >
        {hasMounted && (
          <>
            <iframe
              width="100%"
              height="166px"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
            ></iframe>
            <div style={attributionStyle}> {/* 스타일 객체 사용 */}
              <a href="https://soundcloud.com/tr5javbc1mqw" title="zehoon" target="_blank" style={linkStyle}>
                zehoon
              </a>{" "}
              ·{" "}
              <a href="https://soundcloud.com/tr5javbc1mqw/01-ximxim-bar-set-250523" title="01 Ximxim Bar Set 24.05.25" target="_blank" style={linkStyle}>
                01 Ximxim Bar Set 24.05.25
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}