import { Link } from "react-router-dom";
import { sliderComponentCss as css, TProduct } from "../index";

const SliderComponent = ({ product }: { product: TProduct }) => {
  return (
    <div className={css["featured__product"]}>
      <Link to={`products/${product.id}`}>
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/${product?.image}`}
          alt="image of product"
          className={css["featured__product--image"]}
        />
        <h3>
          {product?.name}
          <span></span>
        </h3>
      </Link>
    </div>
  );
};

export default SliderComponent;
