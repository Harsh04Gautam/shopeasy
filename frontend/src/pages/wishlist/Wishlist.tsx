import { useEffect } from "react";
import { selectWishlist } from "../../features/wishlist/wishlistSlice";
import { useAppSelector, wishlistCss as css, WishlistProduct } from "./index";
import { v4 as uuid } from "uuid";

export const Wishlist = () => {
  const wishlist = useAppSelector(selectWishlist);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={css["wishlist__container"]}>
      {wishlist.items.length ? (
        <>
          <h2 className="heading--medium">Items</h2>
          <div className={css["wishlist__products--container"]}>
            {wishlist.items.map((item) => (
              <WishlistProduct id={item.id} key={uuid()} />
            ))}
          </div>
        </>
      ) : (
        <h2 className={css["wishlist__empty"]}>Wishlist Is Empty</h2>
      )}
    </div>
  );
};
