// tailwind.config.js

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // 추가적인 파일 경로
  ],
  theme: {
    extend: {
      // 커스텀 회전 추가 (Tailwind 기본 회전은 rotate만 가능)
      rotate: {
        '45': '45deg',
        '-45': '-45deg',
      },
      scale: {
        '0.8': '0.8',
        '1.2': '1.2',
      },
      zIndex: {
        '10': '10',
        '20': '20',
        '30': '30',
        '999': '999',
        '1000': '1000',
      },
      // 폰트 패밀리 추가
      fontFamily: {
        'archivo': ['Archivo', 'sans-serif'],
        'clash-display': ['Clash Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
