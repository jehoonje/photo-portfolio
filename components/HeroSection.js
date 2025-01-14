// **개선 사항**: import 순서 조정, 필요 라이브러리를 먼저 명시적으로 불러오도록 했습니다.
import Image from 'next/image';
export default function HeroSection() {

  return (
    <section
      className="relative w-full h-screen bg-black"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpeg"
          alt="Hero Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Hero text */}
      <div
        className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 transition-opacity duration-500"
      >
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to My Portfolio</h1>
        <p className="mt-4 text-lg md:text-xl">Scroll down to explore</p>
      </div>
    </section>
  );
}
