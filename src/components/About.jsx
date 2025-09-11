import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // Club GSAP only
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  useGSAP(() => {
    // ✅ Animate title words
    const titleSplit = new SplitText("#about h2", { type: "words" });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: "expo.out",
        stagger: 0.05,
      })
      .from(
        ".top-grid > div",
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.5"
      );
  });

  return (
    <div id="about" className="py-20">
      {/* Top content */}
      <div className="mb-16 md:px-0 px-5 max-w-5xl mx-auto">
        <div className="content grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-snug">
              Where every detail matters
              <span className="text-white"> - </span>
              from muddle to garnish
            </h2>
          </div>
          <div className="sub-content md:col-span-4 space-y-4">
            <p>
              Every cocktail we serve is a reflection of our obsession with
              detail – from the first muddle to the final garnish. That care is
              what turns a simple drink into an experience.
            </p>
            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">
                More Than +12,000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image grid */}
      <div className="top-grid grid grid-cols-12 gap-4 max-w-6xl mx-auto">
        {/* First row */}
        <div className="col-span-12 md:col-span-3 relative">
          <div className="noisy absolute inset-0" />
          <img
            src="/images/abt1.png"
            alt="grid-img-1"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-12 md:col-span-6 relative">
          <div className="noisy absolute inset-0" />
          <img
            src="/images/abt2.png"
            alt="grid-img-2"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-12 md:col-span-3 relative">
          <div className="noisy absolute inset-0" />
          <img
            src="/images/abt5.png"
            alt="grid-img-5"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Second row */}
        <div className="col-span-12 md:col-span-8 relative">
          <div className="noisy absolute inset-0" />
          <img
            src="/images/abt3.png"
            alt="grid-img-3"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-12 md:col-span-4 relative">
          <div className="noisy absolute inset-0" />
          <img
            src="/images/abt4.png"
            alt="grid-img-4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
