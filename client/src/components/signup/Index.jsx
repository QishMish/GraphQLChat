import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import useSignUp from '../../hooks/useSignIn'

import styles from "./styles.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [signUp, { data, loading, error }] = useSignUp()

  const signUpHandler = async(e)=>{
    e.preventDefault()
    await signUp({
      variables : {
        signUpUserInput:{
          email:"misho@gmail.com",
          username:"mike",
          password:"mike"
        }
      }
    })
    console.log(data);
  }
  return (
    <div className={styles.signin}>
      <form className={styles.form} onSubmit={signUpHandler}>
        <h1>Sign Up</h1>
        <div className={styles.input}>
          <label>
            <input
              type="text"
              placeholder="firstname"
            />
          </label>
        </div>
        <div className={styles.input}>
          <label>
            <input
              type="text"
              placeholder="lastname"
            />
          </label>
        </div>
        <div className={styles.input}>
          <label>
            <input
              type="email"
              placeholder="email@gmail.com"
            />
          </label>
        </div>
        <div className={styles.input}>
          <label>
            <input
              type="text"
              placeholder="username"
            />
          </label>
        </div>
        <div className={styles.input}>
          <label>
            <input
              type="password"
              placeholder="******************"
            />
          </label>
        </div>
        <input type="submit" value="Sign Up" />
        <p>
          Not a member yet?
          <Link to="/signin"> Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
