import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/Nav'
import { Provider } from 'react-redux'
import { wrapper } from '../store/store'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <ApiProvider api={ apiSlice } >
        <Nav />
        <Component {...pageProps} />
      </ApiProvider>
    </Provider>
  )
}
