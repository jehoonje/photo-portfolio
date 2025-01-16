import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MixSection() {
  const sectionRef = useRef(null); // 섹션 전체
  const containerRef = useRef(null); // 실제 고정·애니메이션 대상
  const [isPinned, setIsPinned] = useState(false);

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
          className="w-[80%] mx-auto bg-black flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-5"
        >
          <iframe
            className="md:w-[40%] w-[100%] h-[15px] md:h-[120px]"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1831342242&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            className="md:w-[40%] w-[100%] h-[15px] md:h-[120px]"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1926103367&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            className="md:w-[40%] w-[100%] h-[15px] md:h-[120px]"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1418699092&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            className="md:w-[40%] w-[100%] h-[15px] md:h-[120px]"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1629740511&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            className="md:w-[40%] w-[100%] h-[15px] md:h-[120px]"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1655524542&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
          <iframe
            className="md:w-[40%] w-[100%] h-[15px] md:h-[120px]"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1705728921&color=%23ff5500&inverse=true&auto_play=false&show_user=true"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
