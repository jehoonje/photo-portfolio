// components/HeroSection.js
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Hero 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Hero Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
          onLoad={() => console.log('Hero image loaded')}
        />
      </div>

      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Hero 텍스트 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to My Portfolio</h1>
        <p className="mt-4 text-lg md:text-xl">Scroll down to explore</p>
      </div>
    </section>
  );
}
