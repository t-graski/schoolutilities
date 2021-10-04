import { styled } from "../../stitches.config";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Headline } from "../../components/Headline";
import React, { useEffect, useState } from "react";
import { Spacer } from "../../components/Spacer";
import { Separator } from "../../components/Separator";
import { useRouter } from "next/router";
import fetch from "node-fetch";
import { RegisterAuth } from "../../components/RegisterAuth";

const RegisterAuthLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
  minHeight: "80vh",
});

export default function Register() {
  return (
    <>
      <RegisterAuth></RegisterAuth>
    </>
  );
}
