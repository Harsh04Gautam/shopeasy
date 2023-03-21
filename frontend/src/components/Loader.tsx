import { ReactNode } from "react";
import { loaderCss as css } from "./index";

const Loader = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) => {
  return (
    <div className={`${isLoading ? css["loading__container"] : ""}`}>
      {isLoading && (
        <>
          <div className={css["loading__spinner"]}></div>
          <div className={css["loading__back-blur"]}></div>
        </>
      )}
      {children}
    </div>
  );
};

export default Loader;
