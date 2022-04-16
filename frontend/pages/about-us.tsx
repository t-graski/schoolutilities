import Head from "next/head";
import { Navbar } from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import { Headline } from "../components/atoms/Headline";
import { Spacer } from "../components/atoms/Spacer";
import { Separator } from "../components/atoms/Separator";
import { AboutUsItem } from "../components/molecules/AboutUsItem";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="About Us"></Headline>
      <Separator width="small" alignment="center" />
      <AboutUsItem
        imageSrc="/images/tobias_graski.svg"
        imageAlt="tobias"
        name="Tobias"
        position="Chief Executive Officer"
        description=""
        roles={["Management", "Backend Developer", "Network Developer"]}
      />
      <AboutUsItem
        imageSrc="/images/david_woegerbauer.svg"
        imageAlt="david"
        name="David"
        position="Chief Technology Officer"
        description=""
        roles={["Management", "Frontend Developer", "Backend Developer"]}
      />
      <AboutUsItem
        imageSrc="/images/florian_doppler.svg"
        imageAlt="florian"
        name="Florian"
        position="Chief Design Officer"
        description=""
        roles={["Design", "Frontend Developer"]}
      />
      <Footer></Footer>
    </>
  );
}
