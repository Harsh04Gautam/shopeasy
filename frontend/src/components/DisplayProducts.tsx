import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  displayProductCss as css,
  TProduct,
  ProductCard,
  Loader,
  useFetchSearchedProductsQuery,
  SearchParams,
} from "./index";

const DisplayProducts = ({
  searchParams,
  heading = true,
  columns = 4,
}: {
  searchParams?: SearchParams;
  heading?: boolean;
  columns?: 3 | 4;
}) => {
  const { data, isLoading, isSuccess } = useFetchSearchedProductsQuery(
    searchParams || {}
  );
  const [products, setProducts] = useState<TProduct[] | null>(null);

  useEffect(() => {
    if (isSuccess) setProducts(data);
  }, [data]);

  return (
    <Loader isLoading={isLoading}>
      <section className={css["section"]}>
        {heading && (
          <div className={css["section__heading--container"]}>
            <h3 className={"heading--medium"}>Special products</h3>
            <Link to={"/search"} className={css["section__heading--link"]}>
              See more
            </Link>
          </div>
        )}
        <div
          className={`${
            columns === 4
              ? css["section__products--grid-4"]
              : css["section__products--grid-3"]
          }`}
        >
          {products &&
            products?.map((product) => (
              <ProductCard product={product} key={uuid()} />
            ))}
        </div>
      </section>
    </Loader>
  );
};

export default DisplayProducts;
