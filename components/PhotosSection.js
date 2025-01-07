import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PhotosSection() {
  // 사진 경로들
  const images = [
    '/images/photo1.png',
    '/images/photo2.png',
    '/images/photo3.png',
    '/images/photo4.png',
    '/images/photo5.png',
    '/images/photo6.png',
    '/images/photo7.png',
    '/images/photo8.png',
    '/images/photo9.png',
    '/images/photo10.png',
  ];

  // 겹침 계산 로직
  // box = { left, top, size, right: left+size, bottom: top+size }
  function boxesOverlapMoreThan10Percent(a, b) {
    // 두 박스가 겹치는 너비/높이
    const overlapWidth = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
    const overlapHeight = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    const overlapArea = overlapWidth * overlapHeight;

    if (overlapArea === 0) return false; // 겹치지 않음

    // 각 박스 면적
    const areaA = a.size * a.size;
    const areaB = b.size * b.size;
    // "10% 이상" 겹치지 않으려면, overlapArea가
    // A의 10% or B의 10%보다 작아야 함
    // overlapArea <= 0.1 * areaA AND overlapArea <= 0.1 * areaB
    // → 만약 overlapArea가 이 범위를 초과하면 => 10% 이상 겹침
    if (overlapArea > 0.1 * areaA || overlapArea > 0.1 * areaB) {
      return true; // 10% 이상 겹침
    }
    return false;
  }

  // 랜덤 박스를 하나 생성 (중복검사 포함)
  function generateRandomBox(existing) {
    const size = 150 + Math.random() * 150; // 150 ~ 300
    // 부모 영역 크기를 가정 (가로폭 80vw x 세로폭 120vh 정도로 가정)
    const containerWidth = 0.8 * window.innerWidth;
    const containerHeight = 1.2 * window.innerHeight;

    const left = Math.random() * (containerWidth - size);
    const top = Math.random() * (containerHeight - size);

    const box = {
      left,
      top,
      size,
      right: left + size,
      bottom: top + size,
    };

    // 기존 박스들과 겹침 검사
    for (let e of existing) {
      if (boxesOverlapMoreThan10Percent(box, e)) {
        // 겹치면 실패
        return null;
      }
    }
    return box;
  }

  function generateBoxes() {
    const results = [];
    // 10개
    const total = images.length;
    let attempts = 0;

    for (let i = 0; i < total; i++) {
      let box = null;
      let safeCount = 0;
      // 최대 100번 시도
      while (!box && safeCount < 100) {
        box = generateRandomBox(results);
        safeCount++;
      }
      if (!box) {
        // 100번 시도했는데 못 놓으면, 그냥 포기(또는 다른 로직)
        console.warn(`Cannot place box #${i} without overlap!`);
        continue;
      }
      results.push(box);
    }
    return results;
  }

  const photoBoxes = useMemo(() => {
    // 브라우저 환경에서만 동작하도록 (Next.js SSR 시 window가 없음)
    // 만약 SSR 문제를 피하려면 useEffect로 처리하거나 'dynamic import'로 분기
    if (typeof window === 'undefined') return [];
    return generateBoxes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="photos"
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{ height: '150vh' }} // 세로 길이를 넉넉히 잡아 스크롤 확보
    >
      <h2 className="text-white text-3xl md:text-5xl font-bold text-center absolute top-8 left-1/2 -translate-x-1/2 z-10">
        Photos
      </h2>

      <div className="relative w-[80vw] h-[120vh] bg-black">
        {photoBoxes.map((box, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-lg overflow-hidden cursor-pointer"
            style={{
              width: box.size,
              height: box.size,
              top: box.top,
              left: box.left,
            }}
            whileHover={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Image
              src={images[idx]}
              alt={`photo-${idx}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
