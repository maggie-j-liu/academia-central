import "../styles/globals.css";
import { AuthUserProvider } from "../utils/firebase/useUser";
import Navbar from "components/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
