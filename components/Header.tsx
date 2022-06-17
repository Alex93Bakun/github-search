import React, { FC } from "react";

import s from "../styles/Home.module.scss";
import Heading from "./Heading";

const Header: FC = () => {
  return (
    <header className={s.header}>
      <Heading />
    </header>
  );
};

export default Header;
