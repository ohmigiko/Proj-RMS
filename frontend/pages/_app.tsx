import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Layout from "../components/templates/Layout";
import { Provider } from "react-redux";
import configureStore from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Home from "pages";

const { store, persistor } = configureStore();

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  // let allowed = true;
  // if (!router.pathname.startsWith("/login")) {
  //   const user = useSelector((state) => state.user);
  //   const role = user.role;
  //   const router = useRouter();
  //   if (router.pathname.startsWith("/admin") && role !== "user") {
  //     allowed = false;
  //   }
  // }
  // const ComponentToRender = allowed ? Component : Home;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
