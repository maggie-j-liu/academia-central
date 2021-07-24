import React from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../firebase/setup";

initFirebase();

const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  React.useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      cancelAuthListener();
    };
  }, []);

  return { user, logout };
};

const AuthUserContext = React.createContext({
  user: null,
  logout: () => {},
});

export const AuthUserProvider = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

const useUser = () => React.useContext(AuthUserContext);

export default useUser;
