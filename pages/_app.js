import "../styles/globals.css";
import StoreProvider from "../store/store-context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
      <footer>
        <p>2022 Tasos</p>
      </footer>
    </>
  );
}

export default MyApp;
