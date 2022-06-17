import "normalize.css/normalize.css";
import "../styles/globals.scss";

import type { AppProps } from "next/app";
import React from "react";

import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
