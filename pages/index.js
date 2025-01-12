// pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
// import PhotosSection from '../components/PhotosSection'; // 이건 주석 처리
import FixedFooter from '../components/FixedFooter';
import dynamic from 'next/dynamic';

// PhotosSection을 클라이언트 사이드에서만 로드
const PhotosSection = dynamic(() => import('../components/PhotosSection'), {
  ssr: false,
});

// PhotosSection을 클라이언트 사이드에서만 로드
const MixSection = dynamic(() => import('../components/MixSection'), {
  ssr: false,
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
      <MixSection />
      <FixedFooter />
    </>
  );
}
