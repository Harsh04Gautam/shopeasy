import { DisplayGridProducts, DisplayProducts, mainCss as css } from "../index";

const Main = () => {
  return (
    <div className={css["container"]} id="main">
      <DisplayProducts searchParams={{ limit: 4 }} />
      <DisplayGridProducts />
      <DisplayProducts searchParams={{ limit: 4 }} />
    </div>
  );
};

export default Main;
