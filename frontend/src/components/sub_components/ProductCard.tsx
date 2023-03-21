import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  productCardCss as css,
  likeProductEmptyIcon,
  likeProductfilledIcon,
  addProduct,
  addedProduct,
  addToWishList,
  removeFromWishList,
  TProduct,
  useAppDispatch,
  addToCart,
  removeFromCart,
  useAppSelector,
  selectCart,
  selectWishlist,
} from "../index";

const ProductCard = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCart);
  const wishList = useAppSelector(selectWishlist);

  const [cartQuantity, setCartQuantity] = useState(0);
  const [wish, setWish] = useState(false);

  const handleAddToCart = () => {
    if (!cartQuantity) dispatch(addToCart({ product: { ...product } }));
    else dispatch(removeFromCart({ product: { ...product } }));
  };

  const handleAddToWishList = () => {
    if (!wish) dispatch(addToWishList({ id: product.id }));
    else dispatch(removeFromWishList({ id: product.id }));
  };

  useEffect(() => {
    setWish(!!wishList.items.find((item) => item.id === product.id));
  }, [wishList]);

  useEffect(() => {
    setCartQuantity(
      cartItems.items.find((item) => item.id === product.id)?.count || 0
    );
  }, [cartItems]);

  return (
    <div className={css.card}>
      <div className={css["card__container--top"]}>
        <Link to={`/products/${product?.id}`}>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/${product.image}`}
            alt="product image"
            className={css["card__image"]}
          />
        </Link>
        <button
          onClick={handleAddToWishList}
          className={`${css["card__btn"]} ${css["card__btn--like"]} `}
        >
          <img
            src={wish ? likeProductfilledIcon : likeProductEmptyIcon}
            alt="like icon"
          />
        </button>
        <span className={css["card__free-shipping"]}>Free Shipping</span>
      </div>
      <div className={css["card__container--bottom"]}>
        <div className={css["card__info"]}>
          <span className={css["card__info--name"]}>{product.name}</span>
          <span className={css["card__info--price"]}>$ {product.price}</span>
        </div>
        <div className={css["card__info"]}>
          <p className={css["card__info--description"]}>
            {product.description.slice(0, 50)}
          </p>
          <button
            onClick={handleAddToCart}
            className={`${css["card__btn"]} ${css["card__btn--add"]} `}
          >
            <img
              src={cartQuantity ? addedProduct : addProduct}
              alt="add icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
