import React from "react";

import Spinner from "../../assets/spinner.png";

import styles from "./styles.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src={Spinner} alt="spinner" />
    </div>
  );
};

export default Loading;
