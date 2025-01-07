// pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
// import PhotosSection from '../components/PhotosSection'; // 이건 주석 처리
import FixedFooter from '../components/FixedFooter';
import dynamic from 'next/dynamic';

const PhotosSection = dynamic(() => import('../components/PhotosSection'), {
  ssr: false, // 클라이언트에서만 렌더
});

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
      </Head>
      <Header />
      <HeroSection />
      <AboutSection />
      {/* 동적 로드된 PhotosSection */}
      <PhotosSection />
      <section
        id="articles"
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold">Articles (Coming Soon)</h2>
      </section>
      <FixedFooter />
    </>
  );
}
