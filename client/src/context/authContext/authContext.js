import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { authReducer } from "./authReducer";
import jwtDecode from "jwt-decode";
import { signIn, signOut, signUp } from "./authActions";
import { SIGN_IN, SIGN_OUT, SIGN_UP } from "./authConstants";

const authContext = createContext();

const USER_INITIAL_STATE = {
  user: null,
};

const accessToken = localStorage.getItem("access_token");

if (accessToken) {
  const decoded = jwtDecode(accessToken);

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("access_token");
  } else {
    USER_INITIAL_STATE.user = decoded;
  }
}

export default function AuthProvider(props) {
  const [userState, dispatchUser] = useReducer(authReducer, USER_INITIAL_STATE);

  const onSignUp = (accessToken) => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      dispatchUser(
        signUp(decoded)
      );
    }
  };

  const onSignIn = (accessToken) => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      dispatchUser(signIn(decoded));
    }
  };
  const onLogOut = () => {
    dispatchUser(
      signOut({
        type: SIGN_OUT,
      })
    );
  };
  return (
    <authContext.Provider
      value={{
        userState: userState,
        dispatchUser: dispatchUser,
        onSignIn: onSignIn,
        onSignUp: onSignUp,
        onLogOut: onLogOut,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(authContext);
};
