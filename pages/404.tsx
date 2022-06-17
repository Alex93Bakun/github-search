import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import s from "../styles/404.module.scss";

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <div className={s.wrapper}>
      <Head>
        <title>Error</title>
      </Head>
      <div>
        <h1>404</h1>
        <h2>Something went wrong...</h2>
      </div>
    </div>
  );
};

export default Error;
