import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "./redux/productSlice";
import { useCookies } from "react-cookie";
import axios from "axios";
import { loginRedux } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  const [cookies] = useCookies(["loginToken"]);
  const loginToken = cookies["loginToken"];

  useEffect(() => {
    if (loginToken) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/loginWithCookies`,
          {
            loginToken,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(loginRedux(res.data));
        });
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/product`
        );
        const resData = await res.json();
        dispatch(setDataProduct(resData)); // Dispatching the setDataProduct action with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <div>
      <Toaster />
      <div>
        <Header />
        <main className="pt-20 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
