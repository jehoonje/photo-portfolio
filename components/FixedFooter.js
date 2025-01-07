// components/FixedFooter.js
import Image from 'next/image';

export default function FixedFooter() {
  return (
    <section
      id="contact"
      className="relative w-full h-screen flex items-center justify-center"
    >
      {/* Footer 배경 이미지 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/footer.jpg" // 실제 footer 이미지 파일명으로 변경
          alt="Footer Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
          onLoad={() => console.log('Footer image loaded')}
        />
      </div>

      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* 콘텐츠 (소셜 링크 등) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Get in Touch
        </h2>
        <p className="mb-8">
          Follow me on social media
        </p>
        
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

        <p className="mt-8">© 2025 Your Name</p>
      </div>
    </section>
  );
}
