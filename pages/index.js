// **개선 사항**: import 순서를 조금 정리했고, 주석 위치 및 불필요한 여백을 정돈했습니다.
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
// import PhotosSection from '../components/PhotosSection'; // 이건 주석 처리
import FixedFooter from '../components/FixedFooter';

// **개선 사항**: 주석으로 설명을 좀 더 명확하게 덧붙였습니다.
// PhotosSection과 MixSection을 클라이언트 사이드에서만 로드하기 위해 Next.js의 dynamic import 활용
const PhotosSection = dynamic(() => import('../components/PhotosSection'), {
  ssr: false,
});

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
