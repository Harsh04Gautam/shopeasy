import {
  displayGridProductsCss as css,
  airpods,
  watch,
  ipad,
  iphone,
} from "../../index";

const DisplayGridProducts = () => {
  return (
    <div className={css["container"]}>
      <div className={css["container__product--iphone"]}>
        <img src={iphone} alt="product image" />
        <div className={css["container__product--icon"]}>
          <h3>IPhone 14</h3>
        </div>
      </div>
      <div className={css["container__product--ipad"]}>
        <img src={ipad} alt="product image" />
      </div>
      <div className={css["container__product--watch"]}>
        <img src={watch} alt="product image" />
      </div>
      <div className={css["container__product--airpods"]}>
        <img src={airpods} alt="product image" />
        <h3>AirPods</h3>
      </div>
    </div>
  );
};

export default DisplayGridProducts;
