import axios from "axios";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  cartCss as css,
  CartProduct,
  selectCart,
  useAppSelector,
} from "./index";

const Cart = () => {
  const cart = useAppSelector(selectCart);

  const handleCheckout = async () => {
    if (!cart) return;

    const items = cart.items.map((item) => ({
      id: item.id,
      quantity: item.count,
    }));

    const response = await axios.post("http://localhost:3500/api/v1/checkout", {
      items,
    });

    if (response.status !== 200) return;

    window.location = response?.data?.url;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={css["cart__container"]}>
      {!cart.checkout.totalItems ? (
        <h2 className={css["cart__empty"]}>Cart is Empty</h2>
      ) : (
        <>
          <div>
            <h2 className="heading--medium">Items</h2>
            {cart.items.map((item) => (
              <CartProduct key={uuid()} data={item} />
            ))}
          </div>
          <div className={css["cart__checkout--container"]}>
            <h2 className="heading--medium">Checkout</h2>
            <div className={css["cart__checkout--group"]}>
              <span className={css["cart__checkout--key"]}>Total items :</span>{" "}
              <span className={css["cart__checkout--value"]}>
                {cart.checkout.totalItems}
              </span>
            </div>
            <div className={css["cart__checkout--group"]}>
              <span className={css["cart__checkout--key"]}>Subtotal :</span>{" "}
              <span className={css["cart__checkout--value"]}>
                $ {cart.checkout.subtotal.toFixed(2)}
              </span>
            </div>
            <div className={css["cart__checkout--group"]}>
              <span className={css["cart__checkout--key"]}>Devilery Fee :</span>{" "}
              <span className={css["cart__checkout--value"]}>
                $ {cart.checkout.diliveryFee.toFixed(2)}
              </span>
            </div>
            <div className={css["cart__checkout--group"]}>
              <span className={css["cart__checkout--key"]}>Discount :</span>{" "}
              <span className={css["cart__checkout--value"]}>
                % {cart.checkout.discount}
              </span>
            </div>
            <div className={css["cart__checkout--group"]}>
              <span className={css["cart__checkout--key"]}>Total :</span>{" "}
              <span className={css["cart__checkout--final-price"]}>
                $ {cart.checkout.total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className={css["cart__checkout--btn"]}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
