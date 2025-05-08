import React from "react";
import Head from "next/head";

import { Container } from "@mui/material";
import MainComponent from "./Components/MainComponent";
import NavBar from "./Components/NavBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Peopleblox Frontend task</title>
        <title>PeopleBlox</title>
        <meta
          name="description"
          content="PeopleBlox Powerful, AI-driven, Automated, Workforce Competency Measurement Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.svg" />{" "}
      </Head>
      <NavBar />
      <Container sx={{ mt: "6rem" }}>
        <MainComponent />
      </Container>
    </>
  );
}
