// components/AboutSection.js
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function AboutSection() {
  const aboutRef = useRef(null);

  // 소개 글을 "한 줄씩" 분리해, 각 줄에 애니메이션을 따로 적용
  const lines = [
    `Hello, I'm a passionate developer with a love for creating interactive
     web applications that combine style and functionality.`,
    `As you scroll, this text transitions from gray to white, symbolizing
     the brightening of new ideas and experiences in my journey.`,
    `Once the text is fully white, you can continue exploring the rest
     of my portfolio below.`,
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      // pin이 필요한 경우 설정. (pin으로 인해 다른 섹션 이동 시 약간 멈춤 현상 발생 가능)
      // pin을 유지하지만, start/end를 약간 조정하면 덜 끊길 수 있음.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top top',
          end: '+=800', // 스크롤 800px 동안 고정
          pin: true,    // pin 유지
          scrub: true, 
          markers: false, 
        },
      });

      lines.forEach((_, i) => {
        tl.to(`.about-line-${i}`, { color: '#fff', duration: 2 }, '+=0.3');
      });
    });
  }, [lines]);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">about</h2>

      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto">
        {/* 왼쪽 이미지 */}
        <div className="w-full md:w-1/2 h-full p-4 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <Image
              src="/images/about.jpg"
              alt="About Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* 오른쪽 소개 글: 각 문단을 <p>로 나눈 뒤, .about-line-N 클래스명 부여 */}
        <div className="w-full md:w-1/2 p-4 text-lg leading-relaxed text-gray-500">
          {lines.map((text, idx) => (
            <p key={idx} className={`about-line-${idx} mb-4`}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
