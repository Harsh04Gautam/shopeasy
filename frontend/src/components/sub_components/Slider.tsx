import { useState } from "react";
import {
  SliderComponent,
  sliderCss as css,
  arrowLeft,
  arrowRight,
  useSlider,
  useFetchSearchedProductsQuery,
} from "../index";

const maxSlide = 5;

const Slider = () => {
  const [setCurrentSlide, slideContainer, dotContainer] = useSlider(maxSlide);

  const [page, _setPage] = useState(1);
  const { data } = useFetchSearchedProductsQuery({ page, limit: maxSlide });

  return (
    <div className={css["container"]}>
      <section ref={slideContainer} className={css["featured"]}>
        {data &&
          data.map((product, i) => (
            <SliderComponent key={i} product={product} />
          ))}
      </section>

      <div className={css["dots"]} ref={dotContainer}>
        {Array(maxSlide)
          .fill(1)
          .map((_, i) => {
            return (
              <span key={i} className={css["dot"]}>
                {i + 1}/{maxSlide}
              </span>
            );
          })}
      </div>
      <div className={css["featured__btn--container"]}>
        <button
          className={`${css["featured__btn"]} ${css["featured__btn--left"]}`}
          onClick={() => setCurrentSlide((prev) => prev + 1)}
        >
          <img src={arrowLeft} alt="arrow left" />
        </button>
        <button
          className={`${css["featured__btn"]} ${css["featured__btn--right"]}`}
          onClick={() => setCurrentSlide((prev) => prev - 1)}
        >
          <img src={arrowRight} alt="arrow right" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
