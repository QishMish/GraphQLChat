import React from "react";

import { SIGN_UP_USER } from '../../graphql/auth.js'

import { useMutation } from '@apollo/client';


import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import styles from "./styles.module.css";
import { isValidEmail } from "../../utils/helper.js";
import Loading from "../loading/Index.jsx";
import { useAuthContext } from "../../context";



const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { onSignUp } = useAuthContext()

  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_USER, {
    onCompleted: (data) => {
      localStorage.setItem("access_token", data.signUpUser.access_token)
      localStorage.setItem("refresh_token", data.signUpUser.refresh_token)
      onSignUp(data.signUpUser.access_token)
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
    }
  });

  const signUpHandler = async (data) => {
    await signUp({
      variables: {
        signUpUserInput: data
      }
    })
  }
  const handleEmailValidation = email => {
    const isValid = isValidEmail(email);
    const validityChanged =
      (errors?.email && isValid) || (!errors?.email && !isValid);

    if (validityChanged) console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
    return isValid;
  };

  return (

    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.signin}>
          <form className={styles.form} onSubmit={handleSubmit(signUpHandler)}>
            <h1>Sign Up</h1>
            <div className={styles.input}>
              <label>
                <input
                  type="text"
                  placeholder="firstname"
                  {...register("firstname", { required: "Firstname is required", minLength: 3, maxLength: 30 })}
                />
              </label>
            </div>
            <div className={styles.input}>
              <label>
                <input
                  type="text"
                  placeholder="lastname"
                  {...register("lastname", { required: "Lastname is required", minLength: 3, maxLength: 30 })}
                />
              </label>
            </div>
            <div className={styles.input}>
              <label>
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  {...register("email", { required: "Email address is required", })}
                />
              </label>
            </div>
            <div className={styles.input}>
              <label>
                <input
                  type="text"
                  placeholder="username"
                  {...register("username", { required: "Username is required", minLength: 3, maxLength: 30 })}
                />
              </label>
            </div>
            <div className={styles.input}>
              <label>
                <input
                  type="password"
                  placeholder="******************"
                  {...register("password", { required: "Password is required", minLength: 3 })}
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
      )
      }
    </>


  );
};

export default SignUp;
