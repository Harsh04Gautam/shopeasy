import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Form,
  Home,
  Navbar,
  Product,
  Footer,
  Wishlist,
  Cart,
  Search,
  useAppDispatch,
  useRefreshTokenQuery,
  setAccessToken,
} from "./index";

function App() {
  const { data, isSuccess } = useRefreshTokenQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess) dispatch(setAccessToken(data));
  }, [isSuccess]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/signup" element={<Form />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<></>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
