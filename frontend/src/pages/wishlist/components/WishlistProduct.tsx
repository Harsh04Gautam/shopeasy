import { Link } from "react-router-dom";
import {
  removeFromWishList,
  useAppDispatch,
  useFetachProductByIdQuery,
  wishlistProductCss as css,
} from "../index";

export const WishlistProduct = ({ id }: { id: string }) => {
  const { data: product } = useFetachProductByIdQuery({ id });
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    if (!product?.id) return;
    dispatch(removeFromWishList({ id: product?.id }));
  };

  return (
    <div>
      <div className={css["product__container"]}>
        <Link to={`/products/${product?.id}`}>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/${product?.image}`}
            alt="product image"
            className={css["product__image"]}
          />
        </Link>
        <div className={css["product__info"]}>
          <h3 className={css["product__info--name"]}>{product?.name}</h3>
          <p className={css["product__info--description"]}>
            {product?.description.slice(0, 120)}
          </p>
          <span className={css["product__info--price"]}>
            $ {product?.price}
          </span>
        </div>
        <div className={css["product__remove"]}>
          <button onClick={handleRemove}>-</button>
        </div>
      </div>
    </div>
  );
};
