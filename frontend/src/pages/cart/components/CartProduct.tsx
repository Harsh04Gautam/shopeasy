import { Link } from "react-router-dom";
import {
  addToCart,
  cartProductCss as css,
  decreseFromCart,
  useAppDispatch,
  useFetachProductByIdQuery,
} from "../index";

const CartProduct = ({ data }: { data: { id: string; count: number } }) => {
  const dispatch = useAppDispatch();

  const { data: product } = useFetachProductByIdQuery({ id: data.id });

  const handleIncrement = () => {
    if (!product || data.count >= product.stock) return;
    dispatch(addToCart({ product: { ...product } }));
  };

  const handleDecrement = () => {
    if (!product) return;
    dispatch(decreseFromCart({ product: { ...product } }));
  };

  return (
    <div className={css["product__container"]}>
      <Link to={`/products/${product?.id}`}>
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/${product?.image}`}
          alt="product image"
        />
      </Link>
      <div className={css["product__info"]}>
        <h3 className={css["product__info--name"]}>{product?.name}</h3>
        <p className={css["product__info--description"]}>
          {product?.description.slice(0, 120)}
        </p>
        <span className={css["product__info--price"]}>$ {product?.price}</span>
      </div>
      <div className={css["product__count"]}>
        <button
          className={css["product__count--increment"]}
          onClick={handleIncrement}
        >
          +
        </button>
        <span className={css["product__count--value"]}>{data.count}</span>
        <button
          className={css["product__count--decrement"]}
          onClick={handleDecrement}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
