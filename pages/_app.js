import "../styles/globals.css";
import { AuthUserProvider } from "../utils/firebase/useUser";
import Navbar from "components/Navbar";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Head>
        <link rel="shortcut icon" href="/Logo.png" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
