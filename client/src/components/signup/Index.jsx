import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.signin}>
      <form className={styles.form} >
        <h1>Sign Up</h1>

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
