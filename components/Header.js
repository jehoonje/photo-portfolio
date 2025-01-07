// components/Header.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // 애니메이션 효과(선택)

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 50px 이상 내려가면 검정색 배경
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "about", href: "#about" },
    { label: "photos", href: "#photos" },
    { label: "articles", href: "#articles" },
    { label: "contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{
        backgroundColor: isScrolled ? "rgba(0,0,0,1)" : "rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full h-[100px] flex items-center justify-center z-50"
      style={{ backdropFilter: isScrolled ? "blur(5px)" : "none" }}
    >
      <nav className="max-w-7xl w-full px-6 flex justify-end space-x-8">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="text-white uppercase hover:text-gray-400 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
