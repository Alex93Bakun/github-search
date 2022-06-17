import React, { FC } from "react";

import s from "../styles/Home.module.scss";

const Footer: FC = () => {
  return (
    <footer className={s.footer}>
      <a
        href="https://github.com/Alex93Bakun"
        target="_blank"
        rel="noopener noreferrer"
      >
        Implemented by Alex93Bakun
      </a>
    </footer>
  );
};

export default Footer;
