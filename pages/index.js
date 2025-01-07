// pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PhotosSection from '../components/PhotosSection';
import FixedFooter from '../components/FixedFooter';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="A Next.js + Tailwind CSS portfolio" />
      </Head>

      {/* 헤더 */}
      <Header />

      {/* 히어로 섹션 */}
      <HeroSection />

      {/* About 섹션 */}
      <AboutSection />

      {/* Photos 섹션 */}
      <PhotosSection />

      {/* Articles 구간(선택) */}
      <section
        id="articles"
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold">Articles (Coming Soon)</h2>
      </section>

      {/* 푸터 섹션 */}
      <FixedFooter />
    </>
  );
}
