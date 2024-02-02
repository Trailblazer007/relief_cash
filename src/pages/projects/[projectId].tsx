import Head from "next/head";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";

export default function Project() {
  const params = useParams();

  console.log(params);
  return (
    <Fragment>
      <Head>
        <title>Project</title>
      </Head>

      <h1 className="">{params.projectId}</h1>
    </Fragment>
  );
}
