import React from "react";

import logo from "../../assets/images/logo.svg";

import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.header}>
      <img className={logo} alt="logo" src={logo} />
    </div>
  );
}

export default Header;
