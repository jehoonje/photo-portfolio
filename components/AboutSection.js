import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function AboutSection() {
  const aboutRef = useRef(null);
  const lines = [
    `Hello, I'm a passionate developer with a love for creating interactive web applications that combine style and functionality.`,
    `As you scroll, this text transitions from gray to white, symbolizing the brightening of new ideas and experiences in my journey.`,
    `Once the text is fully white, you can continue exploring the rest of my portfolio below.`,
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamically import the ScrollTrigger plugin
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      // Create a timeline with a local reference to the trigger instance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top top',
          end: '+=1500', // Adjust as needed
          pin: true,
          scrub: true,
          // markers: { startColor: 'blue', endColor: 'purple', fontSize: '12px' },
        },
      });

      // Animate each line's color change with a small delay between them
      lines.forEach((_, i) => {
        tl.to(`.about-line-${i}`, { color: '#fff', duration: 2 }, '+=0.3');
      });

      // Cleanup: kill only the timeline's trigger
      return () => {
        tl.scrollTrigger && tl.scrollTrigger.kill();
      };
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
        {/* Left-side image */}
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

        {/* Right-side text */}
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
