import { useEffect, useState } from "react";
import {
  filterCss as css,
  select,
  unselect,
  useRangeSlider,
  SearchParams,
} from "../index";

const ratingRange = { min: 0, max: 5 } as const;
const priceRange = { min: 0, max: 500 } as const;

const Filter = ({
  setSearchParams,
}: {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}) => {
  const [filters, setFilters] = useState({
    rating: true,
    price: true,
    freeShipping: true,
    onSale: true,
    getItByTowDays: true,
  });

  const {
    handleChangeMin: handleChangeMinRating,
    handleChangeMax: handleChangeMaxRating,
    filledSlider: filledSliderRating,
    value: rating,
  } = useRangeSlider(ratingRange);

  const {
    handleChangeMin: handleChangeMinPrice,
    handleChangeMax: handleChangeMaxPrice,
    filledSlider: filledSliderPrice,
    value: price,
  } = useRangeSlider(priceRange);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      ["price[gte]"]: filters.price ? price.min : undefined,
      ["price[lte]"]: filters.price ? price.max : undefined,
    }));
  }, [filters.price, price]);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      ["rating[gte]"]: rating.min,
      ["rating[lte]"]: rating.max,
    }));
  }, [rating]);

  return (
    <div className={css["filter__container"]}>
      <div className={css["filter__group"]}>
        <div className={css["filter__name"]}>
          <img
            className={
              filters.rating ? css["filter__checked"] : css["filter__unchecked"]
            }
            onClick={() =>
              setFilters((prev) => ({ ...prev, rating: !prev.rating }))
            }
            src={filters.rating ? select : unselect}
            alt=""
          />
          Rating
        </div>
        <div className={css["filter__min-max"]}>
          <div>
            <span className={css["filter__key"]}>Min</span>
            <span className={css["filter__value"]}>{rating.min}</span>
            <span className={css["filter__key"]}>Max</span>
            <span className={css["filter__value"]}>{rating.max}</span>
          </div>
          <div className={css["filter__slider--container"]}>
            <input
              type="range"
              min={ratingRange.min}
              max={ratingRange.max}
              value={rating.min ?? 0}
              onChange={handleChangeMinRating}
              className={css["filter__slider"]}
            />
            <input
              type="range"
              min={ratingRange.min}
              max={ratingRange.max}
              value={rating.max ?? 5}
              onChange={handleChangeMaxRating}
              className={css["filter__slider"]}
            />
            <div className={css["filter__slider--empty"]}></div>
            <div
              ref={filledSliderRating}
              className={css["filter__slider--filled"]}
            ></div>
          </div>
        </div>
      </div>
      <div className={css["filter__group"]}>
        <div className={css["filter__name"]}>
          <img
            className={
              filters.price ? css["filter__checked"] : css["filter__unchecked"]
            }
            onClick={() =>
              setFilters((prev) => ({ ...prev, price: !prev.price }))
            }
            src={filters.price ? select : unselect}
            alt=""
          />
          Price Range
        </div>
        <div className={css["filter__min-max"]}>
          <div>
            <span className={css["filter__key"]}>Min</span>
            <span className={css["filter__value"]}>{price.min}</span>
            <span className={css["filter__key"]}>Max</span>
            <span className={css["filter__value"]}>{price.max}</span>
          </div>
          <div className={css["filter__slider--container"]}>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={price.min ?? priceRange.min}
              onChange={handleChangeMinPrice}
              className={css["filter__slider"]}
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={price.max ?? priceRange.max}
              onChange={handleChangeMaxPrice}
              className={css["filter__slider"]}
            />
            <div className={css["filter__slider--empty"]}></div>
            <div
              ref={filledSliderPrice}
              className={css["filter__slider--filled"]}
            ></div>
          </div>
        </div>
      </div>
      <div className={css["filter__group"]}>
        <div className={css["filter__name"]}>
          <img
            className={
              filters.freeShipping
                ? css["filter__checked"]
                : css["filter__unchecked"]
            }
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                freeShipping: !prev.freeShipping,
              }))
            }
            src={filters.freeShipping ? select : unselect}
            alt=""
          />
          Free Shipping
        </div>
      </div>
      <div className={css["filter__group"]}>
        <div className={css["filter__name"]}>
          <img
            className={
              filters.onSale ? css["filter__checked"] : css["filter__unchecked"]
            }
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                onSale: !prev.onSale,
              }))
            }
            src={filters.onSale ? select : unselect}
            alt=""
          />
          On Sale
        </div>
      </div>
      <div className={css["filter__group"]}>
        <div className={css["filter__name"]}>
          <img
            className={
              filters.getItByTowDays
                ? css["filter__checked"]
                : css["filter__unchecked"]
            }
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                getItByTowDays: !prev.getItByTowDays,
              }))
            }
            src={filters.getItByTowDays ? select : unselect}
            alt=""
          />
          Get it by 2 Days
        </div>
      </div>
    </div>
  );
};

export default Filter;
