import "../styles/globals.css";
import { AuthUserProvider } from "../utils/firebase/useUser";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
