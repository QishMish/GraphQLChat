import React, { useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Loading from "../loading/Index";

import useSignIn from '../../hooks/useSignIn'

import styles from "./styles.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = false;

  const [signIn, { data, loading, error }] = useSignIn()

  const signInHandler = async(e)=>{
    e.preventDefault()
    await signIn({
      variables : {
        signInUserInput:{
          username:"mike",
          password:"mike"
        }
      }
    })
    console.log(data);
  }


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.signin}>
          <form className={styles.form} onSubmit={signInHandler}>
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
