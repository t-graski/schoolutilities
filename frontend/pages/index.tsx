import Head from "next/head";
import { styled } from "../stitches.config";
import StitchesLogo from "../components/StitchesLogo";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar someProps="someTest"></Navbar>
    </>
  );
}
