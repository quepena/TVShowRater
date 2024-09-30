import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { wrapper } from "@/store/store";
import { apiSlice } from "@/store/slices/apiSlice";
import Wrapper from "@/components/Wrapper";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ApiProvider api={apiSlice}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ApiProvider>
    </Provider>
  );
}
