import { useEffect, useRef, useState } from "react";
import { sliderComponentCss as css } from "../components/index";

export const useSlider = (maxSlide: number) => {
  maxSlide--;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideContainer = useRef<HTMLDivElement>(null);
  const dotContainer = useRef<HTMLDivElement>(null);

  dotContainer.current?.addEventListener("click", (e) => {
    if (!dotContainer.current) return;
    const dots = dotContainer.current.childNodes;
    dots.forEach((dot, i) => {
      if (dot instanceof HTMLElement && dot === e.target) {
        setCurrentSlide(-i);
      }
    });
  });

  let increment = 6;
  // useEffect(() => {
  //   const slideInterval = setInterval(() => {
  //     setCurrentSlide((prev) => prev - 1);
  //   }, 2000);
  //
  //   return () => clearInterval(slideInterval);
  // });

  useEffect(() => {
    if (slideContainer.current) {
      const slides = slideContainer.current?.childNodes;
      if (slides) {
        slides.forEach((slide) => {
          if (!(slide instanceof HTMLElement)) return;
          if (currentSlide > 0) {
            setCurrentSlide(-maxSlide);
            slide.style.transform = `translateX(calc(${100 * -maxSlide}% + ${
              increment * currentSlide
            }rem ))`;
          } else if (currentSlide < -maxSlide) {
            setCurrentSlide(0);
            slide.style.transform = `translateX(calc(${100 * 0}% + ${
              increment * currentSlide
            }rem))`;
          } else {
            slide.style.transform = `translateX(calc(${
              100 * currentSlide
            }%  + ${increment * currentSlide}rem))`;
          }
        });
      }
    }

    if (dotContainer.current) {
      const dots = dotContainer.current.childNodes;
      dots.forEach((dot, i) => {
        if (dot instanceof HTMLElement) {
          dot.classList.remove(css["dot--active"]);
          if (i === Math.abs(currentSlide)) {
            dot.classList.add(css["dot--active"]);
          }
        }
      });
    }
  }, [currentSlide]);

  return [setCurrentSlide, slideContainer, dotContainer] as const;
};
