"use client";
import React from "react";

export default function Home() {
  const [state, useState] = React.useState([0]);
  console.log(state);
  return (
    <>
      <h1>Welcld a Next Js app.</h1>
    </>
  );
}
