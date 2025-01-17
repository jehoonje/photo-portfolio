import { useEffect, useState } from "react";

const BootScreen = ({ onLoaded }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // ✅ BootScreen이 보이는 동안 스크롤 차단
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    const timer = setTimeout(() => {
      setFadeOut(true); // 5초 후 페이드 아웃
      setTimeout(() => {
        onLoaded();
        // ✅ BootScreen이 사라지면 스크롤 가능하게 변경
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
      }, 500);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // 컴포넌트 언마운트 시 스크롤 복구
      document.body.style.height = "auto";
    };
  }, [onLoaded]);

  return (
    <div className={`boot-screen ${fadeOut ? "fade-out" : ""}`}>
      <h1>Loading...</h1>
      <style jsx>{`
        .boot-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          z-index: 9999;
          transition: opacity 0.5s ease-out;
        }
        .fade-out {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
