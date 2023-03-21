import { useEffect, useState } from "react";
import {
  DisplayProducts,
  Filter,
  search,
  SearchParams,
  searchCss as css,
} from "./index";

const Search = () => {
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") || "";
  });

  const [searchParams, setSearchParams] = useState<SearchParams>({
    limit: 6,
    name,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams((prev) => ({
      ...prev,
      name,
    }));
  };

  useEffect(() => {
    localStorage.setItem("name", name || "");
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={css["container"]}>
      <Filter searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className={css["product__container"]}>
        <div className={css["search"]}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              className={css["search__input"]}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button className={css["search__btn"]}>
              <img src={search} alt="search button" />
            </button>
          </form>
        </div>
        <DisplayProducts
          searchParams={searchParams}
          heading={false}
          columns={3}
        />
      </div>
    </div>
  );
};

export default Search;
