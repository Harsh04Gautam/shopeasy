import { headerCss as css, callToAction, Slider } from "../index";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css["header__info"]}>
        <h1 className="heading--large">
          Shop best deals on your favorite brands
        </h1>
        <p className={css["header__para"]}>
          Discover over 9000 products to choose from and find exactly what you
          need at our store. Shop with confidence and find the perfect product
          for you today.
        </p>
        <a href="#main">
          <img
            src={callToAction}
            alt="call to action"
            className={css["header__call-to-action"]}
          />
        </a>
      </div>
      <div className={css["header__slider"]}>
        <Slider />
      </div>
    </header>
  );
};

export default Header;
