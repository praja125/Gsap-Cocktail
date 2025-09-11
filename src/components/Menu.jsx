"use client";

import React, { useRef, useState } from "react";
import { sliderLists } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCocktails = sliderLists.length;

  // ✅ Animate on slide change
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Title
        gsap.fromTo(
          "#title",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );

        // Cocktail image
        gsap.fromTo(
          ".cocktail img",
          { opacity: 0, xPercent: -100 },
          { xPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
        );

        // Details
        gsap.fromTo(
          ".details h2",
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
        );
        gsap.fromTo(
          ".details p",
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
        );
      }, contentRef);

      return () => ctx.revert(); // ✅ cleanup animations
    },
    [currentIndex] // ✅ re-run when slide changes
  );

  // Helpers
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };
  const getCocktailAt = (indexOffset) =>
    sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails];

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(+1);

  return (
    <section id="menu" aria-labelledby="menu-heading" className="relative">
      {/* Decorative leaves */}
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      {/* Cocktail Navigation Tabs */}
      <nav
        className="cocktail-tabs flex justify-center gap-6 mb-8"
        aria-label="Cocktail Navigation"
      >
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              onClick={() => goToSlide(index)}
              className={`px-4 py-2 border-b-2 transition-colors ${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-transparent hover:text-white hover:border-white/50"
              }`}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <div className="content" ref={contentRef}>
        <div className="arrows flex justify-between mb-6">
          <button onClick={() => goToSlide(currentIndex - 1)} className="flex items-center gap-2">
            <img src="/images/right-arrow.png" alt="left-arrow" aria-hidden="true" />
            <span>{prevCocktail.name}</span>
          </button>
          <button onClick={() => goToSlide(currentIndex + 1)} className="flex items-center gap-2">
            <span>{nextCocktail.name}</span>
            <img src="/images/left-arrow.png" alt="right-arrow" aria-hidden="true" />
          </button>
        </div>

        <div className="cocktail flex justify-center mb-6">
          <img src={currentCocktail.image} alt={currentCocktail.name} className="object-contain" />
        </div>

        <div className="recipe text-center">
          <div className="info mb-4">
            <p>Recipe for:</p>
            <p id="title" className="text-2xl font-bold">
              {currentCocktail.name}
            </p>
          </div>
          <div className="details">
            <h2 className="text-xl font-semibold">{currentCocktail.title}</h2>
            <p className="text-white/80">{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
