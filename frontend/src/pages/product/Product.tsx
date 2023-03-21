import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Loader,
  user,
  productCss as css,
  useFetachProductByIdQuery,
  ratings,
  ratingsQuentity,
  TProduct,
  useAppDispatch,
  addToCart,
  useAppSelector,
  selectCart,
  addToWishList,
  removeFromWishList,
  selectWishlist,
} from "./index";

const Reviews = ({ data }: { data: TProduct | undefined }) => {
  return (
    <div className={css["reviews__group"]}>
      <div>
        <div className={css["reviews__user"]}>
          <img src={user} alt="user icon" /> Aashay
        </div>
        <div className={css["reviews__ratings"]}>
          <img src={ratings} alt="ratings icon" />
          {data?.averageRating || 4.5}
        </div>
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
        reprehenderit quisquam amet dignissimos perferendis, maxime nam fugiat
        tempore repellendus omnis tempora? Deserunt dolore cum iusto similique
        earum error obcaecati possimus.
      </p>
    </div>
  );
};

const Product = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCart);
  const wishlist = useAppSelector(selectWishlist);
  const navigate = useNavigate();

  const { id } = useParams();

  const [count, setCount] = useState(1);
  const [checkout, setCheckout] = useState(false);
  const [wish, setWish] = useState(false);

  const { data, isLoading } = useFetachProductByIdQuery({ id: id || "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleAddToWishList = () => {
    if (!data) return;
    if (!wish) dispatch(addToWishList({ id: data.id }));
    else dispatch(removeFromWishList({ id: data.id }));
  };

  const handleAddToCart = () => {
    if (!data || !count) return;
    setCheckout(true);
    dispatch(addToCart({ product: data, count }));
  };

  const onIncrement = () => {
    if (count >= (data?.stock || 1)) return;
    setCount((prev) => prev + 1);
  };

  const onDecrement = () => {
    if (count <= 0) return;
    setCount((prev) => prev - 1);
  };

  useEffect(() => {
    const cartCount = cartItems.items.find(
      (item) => item.id === data?.id
    )?.count;

    if (cartCount) setCheckout(true);
    else setCheckout(false);
  }, [cartItems]);

  useEffect(() => {
    setWish(!!wishlist.items.find((item) => item.id === data?.id));
  }, [wishlist]);

  return (
    <div>
      <Loader isLoading={isLoading}>
        <div className={css["product__container"]}>
          <div className={css["product__image"]}>
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${data?.image}`}
              alt="product image"
            />
          </div>
          <div className={css["product__details"]}>
            <h1 className={css["product__name"]}>{data?.name}</h1>
            <div className={css["product__ratings"]}>
              <div className={css["product__ratings--group"]}>
                <img src={ratings} alt="ratings icon" />
                {data?.averageRating || 4.5} Ratings
              </div>
              <div className={css["product__ratings--group"]}>
                <img src={ratingsQuentity} alt="average rating icon" />
                {data?.ratingsQuentity || 3.2}K Reviews
              </div>
            </div>
            <h3 className={css["product__price"]}>$ {data?.price}</h3>
            <div className={css["product__info"]}>
              <h3 className="heading--small">Product info</h3>
              <div className={css["product__info--group"]}>
                <div className={css["product__info--pair"]}>
                  <span className={css["product__info--key"]}>Brand :</span>
                  <span className={css["product__info--value"]}>
                    {data?.brand}
                  </span>
                </div>
                <div className={css["product__info--pair"]}>
                  <span className={css["product__info--key"]}>Color :</span>
                  <span className={css["product__info--value"]}>
                    {data?.color}
                  </span>
                </div>
              </div>
              <div className={css["product__info--group"]}>
                <div className={css["product__info--pair"]}>
                  <span className={css["product__info--key"]}>Category :</span>
                  <span className={css["product__info--value"]}>
                    {data?.category}
                  </span>
                </div>
                <div className={css["product__info--pair"]}>
                  <span className={css["product__info--key"]}>Stock :</span>
                  <span className={css["product__info--value"]}>
                    {data?.stock}
                  </span>
                </div>
              </div>
            </div>
            <h3 className="heading--small">Description</h3>
            <p className={css["product__description"]}>
              {data?.description.slice(0, 150)}
            </p>
          </div>
          <div className={css["order__container"]}>
            <div className={css["order__details"]}>
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/${data?.image}`}
                alt="product image"
              />
              <div>
                <h4 className={css["order__name"]}>{data?.name}</h4>
                <p className={css["order__price"]}>$ {data?.price}</p>
              </div>
            </div>
            <div className={css["order__calc"]}>
              <div>
                <button
                  onClick={onIncrement}
                  className={css["order__btn--increment"]}
                >
                  +
                </button>
                <span className={css["order__count"]}>{count}</span>
                <button
                  onClick={onDecrement}
                  className={css["order__btn--decrement"]}
                >
                  -
                </button>
              </div>
              <div>
                <div className={css["order__pair"]}>
                  <span className={css["order__pair--key"]}>Stock :</span>
                  <span className={css["order__pait--value"]}>
                    {(data?.stock || 0) - count}
                  </span>
                </div>
              </div>
            </div>
            <div className={css["order__total"]}>
              <span className={css["order__total--key"]}>Total :</span>
              <span className={css["order__total--value"]}>
                $ {count * (data?.price || 0)}
              </span>
            </div>
            {!checkout ? (
              <button
                onClick={handleAddToCart}
                className={css["order__add-to-bag"]}
              >
                Add To Cart
              </button>
            ) : (
              <button
                onClick={() => navigate("/cart")}
                className={css["order__checkout"]}
              >
                Go to Cart
              </button>
            )}

            {!wish ? (
              <button
                className={css["order__add-to-whishlist"]}
                onClick={handleAddToWishList}
              >
                Add To Wishlist
              </button>
            ) : (
              <button
                className={css["order__add-to-whishlist"]}
                onClick={() => navigate("/wishlist")}
              >
                Go to Wishlist
              </button>
            )}
          </div>
          <div className={css["reviews__container"]}>
            <h3>Reviews</h3>
            <Reviews data={data} />
            <Reviews data={data} />
          </div>
        </div>
      </Loader>
    </div>
  );
};

export default Product;
