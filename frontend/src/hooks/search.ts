import { useState, useRef, useEffect } from "react";

export const useRangeSlider = ({ min, max }: { min: number; max: number }) => {
  const [value, setValue] = useState({
    min,
    max,
  });

  const filledSlider = useRef<HTMLDivElement | null>(null);

  const handleChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > value.max) return;
    setValue((prev) => ({ ...prev, min: Number(e.target.value) }));
    if (filledSlider.current) {
      filledSlider.current.style.left =
        (Number(e.target.value) / Number(max)) * 100 + "%";
      filledSlider.current.style.right =
        100 - (Number(value.max) / Number(max)) * 100 + "%";
    }
  };

  const handleChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < value.min) return;
    setValue((prev) => ({ ...prev, max: Number(e.target.value) }));
    if (filledSlider.current) {
      filledSlider.current.style.left =
        (Number(value.min) / Number(max)) * 100 + "%";
      filledSlider.current.style.right =
        100 - (Number(e.target.value) / Number(max)) * 100 + "%";
    }
  };

  useEffect(() => {
    if (filledSlider.current) {
      filledSlider.current.style.left =
        (Number(value.min) / Number(max)) * 100 + "%";
      filledSlider.current.style.right =
        100 - (Number(value.max) / Number(max)) * 100 + "%";
    }
  }, []);
  return { handleChangeMin, handleChangeMax, filledSlider, value };
};
