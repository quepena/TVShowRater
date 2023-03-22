import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Home from './home'
import Nav from '../components/Nav'
import { Provider } from 'react-redux'
import { wrapper } from '../store/store'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Nav />
      <Component {...pageProps} />
    </Provider>
  )
}
