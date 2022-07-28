import React, { useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Loading from "../loading/Index";

import styles from "./styles.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = false;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.signin}>
          <form className={styles.form}>
            <h1>Sign In</h1>
            <div className={styles.input}>
              <label>
                Username
                <input type="text" placeholder="username" />
              </label>
            </div>
            <div className={styles.input}>
              <label>
                Password
                <input type="password" placeholder="******************" />
              </label>
            </div>
            <input type="submit" value="Sign In" />
            <p>
              Not a member yet?
              <Link to="/signup"> Sign Up</Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignIn;
