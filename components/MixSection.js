import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MixSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("containerRef.current:", containerRef.current);
    if (!containerRef.current) return; 
      
        const MixTrigger = ScrollTrigger.create({
          trigger: containerRef.current,          
          start: "top-=300 top'",
          end: "+=800",
          pin: true,
          pinSpacing: true,
          markers: true, // 디버그 용
        });
        return () => {
          MixTrigger.kill();
        };
  }, []);

  return (
    // 기존 id="mixes" -> articles 연동한다면 id="articles" 로
    <section
      id="articles"
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{
        margin: "0 auto",
        paddingTop: "250px",
        paddingBottom: "400px",
        borderTop: "4px solid #111a",
      }}
    >
      <div
        ref={containerRef}
        style={{
          // minHeight: "50vh",
          width: "100%",
          margin: "0 auto",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        
          <>
            <iframe
              width="40%"
              height="120"
              scrolling="no"
              frameBorder="no" // JSX에서는 속성명을 camelCase나 소문자로 맞춰줘야 함
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
            ></iframe>
            <iframe
              width="40%"
              height="120"
              scrolling="no"
              frameBorder="no" // JSX에서는 속성명을 camelCase나 소문자로 맞춰줘야 함
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
            ></iframe>
            <iframe
              width="40%"
              height="120"
              scrolling="no"
              frameBorder="no" // JSX에서는 속성명을 camelCase나 소문자로 맞춰줘야 함
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
            ></iframe>
            <iframe
              width="40%"
              height="120"
              scrolling="no"
              frameBorder="no" // JSX에서는 속성명을 camelCase나 소문자로 맞춰줘야 함
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
            ></iframe>
            <iframe
              width="40%"
              height="120"
              scrolling="no"
              frameBorder="no" // JSX에서는 속성명을 camelCase나 소문자로 맞춰줘야 함
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
            ></iframe>
            <iframe
              width="40%"
              height="120"
              scrolling="no"
              frameBorder="no" // JSX에서는 속성명을 camelCase나 소문자로 맞춰줘야 함
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
            ></iframe>
          </>
      
      </div>
    </section>
  );
}
