import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import Nav from "@/components/Nav";
import { wrapper } from "@/store/store";
import { apiSlice } from "@/store/slices/apiSlice";

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;
    return (
        <Provider store={store}>
            <ApiProvider api={apiSlice}>
                <div className="bg-white w-full">
                    <Nav />
                    <div className="my-0 mx-auto max-w-7xl text-center">
                        <Component {...pageProps} />
                    </div>
                </div>
            </ApiProvider>
        </Provider>
    );
}