import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Auth from "@/components/Auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
    </Provider>
  );
}

export default MyApp;

