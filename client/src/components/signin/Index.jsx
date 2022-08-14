import React, { useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Loading from "../loading/Index";

import { useAuthContext } from "../../context";

import { SIGN_IN_USER } from '../../graphql/auth.js'

import { useMutation } from '@apollo/client';
import { useForm } from "react-hook-form";


import styles from "./styles.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const { onSignIn } = useAuthContext()

  const [signIn, { data, loading, error }] = useMutation(SIGN_IN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("access_token", data.signInUser.access_token)
      localStorage.setItem("refresh_token", data.signInUser.refresh_token)
      onSignIn(data.signInUser.access_token)
      navigate("/chat");
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const signInHandler = async (data) => {
    console.log(errors);
    await signIn({
      variables: {
        signInUserInput: data
      }
    })
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.signin}>
          <form className={styles.form} onSubmit={handleSubmit(signInHandler)}>
            <h1>Sign In</h1>
            <div className={styles.input}>
              <label>
                <input
                  type="text"
                  placeholder="username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required"
                    }, minLength: 3, maxLength: 30
                  })}
                />
              </label>
            </div>
            <div className={styles.input}>
              <label>
                <input
                  type="password"
                  placeholder="******************"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required"
                    }, minLength: 3
                  })}
                />
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
