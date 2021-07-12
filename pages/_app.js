import Head from "next/head";
import "@material-tailwind/react/tailwind.css";
import "tailwindcss/tailwind.css";
import "../styles.css";

import { Provider, session } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
