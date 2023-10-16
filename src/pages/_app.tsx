import WishlistProvider from 'context/wishlist';
import { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WishlistProvider>
      <Component {...pageProps} />
    </WishlistProvider>
  );
}

export default MyApp;
