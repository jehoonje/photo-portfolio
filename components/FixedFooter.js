import Image from 'next/image';

export default function FixedFooter() {
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
      "
    >
      {/* 배경 이미지 */}
      <div
        className="
          absolute
          inset-0
          flex
          md:bg-contain
          justify-center
          items-center
        "
      >
        <div
          className="
            relative
            w-[90%]                /* 너비 90% */
            h-full
            bg-fixed
            bg-center
            bg-cover
            bg-no-repeat
            bg-[url('/images/footer.jpg')] /* 실제 이미지 경로 */
          "
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
          w-[90%]
          mx-auto
          bg-black
          bg-opacity-40
        "
      ></div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Get in Touch
        </h2>
        <p className="mb-8">Follow me on social media</p>
        <div className="flex space-x-4">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <span className="underline">Instagram</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <span className="underline">Twitter</span>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
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
