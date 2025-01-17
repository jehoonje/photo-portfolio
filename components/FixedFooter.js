import Image from "next/image";

export default function FixedFooter({ footerTextRef }) {
  return (
    <section
      id="contact"
      className="
        relative
        w-full
        min-h-[90vh]
        flex
        items-center
        justify-center
        bg-black
        px-4
      "
    >
      {/* 배경 이미지 */}
      <div
        className="
          absolute
          inset-0
          flex
          justify-center
          items-center
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            w-full
            h-full
            bg-center
            bg-cover
            bg-no-repeat
            bg-fixed md:bg-fixed
          "
          style={{
            backgroundImage: "url('/images/footer.jpg')",
            backgroundSize: "auto 100%",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      {/* 반투명 오버레이 */}
      <div
        className="
          absolute
          inset-0
          flex
          justify-center
          items-center
          w-full
          bg-black
          bg-opacity-40
        "
      ></div>

      {/* 🎯 콘텐츠 (페이드인 적용 + 가운데 정렬) */}
      <div
        ref={footerTextRef} // ✅ `ref`를 props로 연결
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          text-white
          text-center
          px-4
          opacity-0
          transform
          translate-y-12
        "
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Get in Touch</h2>
        <p className="mb-8">Follow me on social media</p>
        <div className="flex space-x-4">
          <a href="https://instagram.com/jehoon2001" target="_blank" rel="noreferrer">
            <span className="underline">Instagram</span>
          </a>
          <a href="https://bluebellybird.bearblog.dev" target="_blank" rel="noreferrer">
            <span className="underline">Blog</span>
          </a>
          <a href="https://github.com/jehoonje" target="_blank" rel="noreferrer">
            <span className="underline">GitHub</span>
          </a>
        </div>
        <p className="mt-8">© 2025 Jehoon Lim</p>
      </div>

      {/* 하단 여유 공간 */}
      <div className="absolute bottom-0 w-full h-[10vh] bg-black"></div>
    </section>
  );
}