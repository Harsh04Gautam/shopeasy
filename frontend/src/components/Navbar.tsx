import { Link, NavLink } from "react-router-dom";
import { navbarCss as css } from "./index";

const Navbar = () => {
  return (
    <nav className={css.navbar}>
      <Link to={"/"} className={css.logo}>
        Shop<span>easy</span>
      </Link>
      <div className={css.links}>
        <NavLink to="/" className={`${css["links--group"]}`}>
          Home
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className={css["links--group"]}>
          Search
          <span>Search</span>
        </NavLink>
        <NavLink to="/wishlist" className={css["links--group"]}>
          Wishlist
          <span>Wishlist</span>
        </NavLink>
        <NavLink to="/cart" className={css["links--group"]}>
          Cart
          <span>Cart</span>
        </NavLink>
      </div>
      <div className={css.links}>
        <NavLink to="orders" className={css["links--group"]}>
          Orders
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="signup"
          className={`${css["links--group"]} ${css["main"]}`}
        >
          Sign up
          <span>Sign up</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
