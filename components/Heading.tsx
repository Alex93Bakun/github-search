import { useRouter } from "next/router";
import React, { FC } from "react";

const Heading: FC = () => {
  const router = useRouter();

  return <h1 onClick={() => router.push("/")}>GitHub Searcher</h1>;
};

export default Heading;
