import { styled } from "../../stitches.config";
import Head from "next/head";
import StartPageBox from "../../components/molecules/StartPageBox";
import dynamic from "next/dynamic";
import { FeatureList } from "../../components/organisms/FeatureList";
import { Spacer } from "../../components/atoms/Spacer";
import { TutorialList } from "../../components/organisms/TutorialList";
import { Button } from "../../components/atoms/Button";
import SvgDiscordLogo from "../../components/atoms/svg/SvgDiscordLogo";

const Footer = dynamic(() => import("../../components/organisms/Footer"));
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));

const FirstBoxLayout = styled("div", {
    display: "flex",
    width: "100vw",
    marginTop: "100px",
    paddingBottom: "13vw",
});

const ArtworkLayout = styled("div", {
    position: "absolute",
    top: "0",
    right: "0",

    display: "block",
    width: "55vw",
    height: "calc(55vw/731*526)",
});

const SubHeadline = styled("h2", {
    fontSize: "2.5rem",
    width: "100%",
    textAlign: "center",
});

const TutorialDescription = styled("p", {
    fontSize: "1.2rem",
    width: "100%",
    textAlign: "center",
});

export const InnerContentLayout = styled("div", {
    padding: "0 10vw",
});

const ButtonLayout = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
});

const ButtonText = styled("span", {
    fontSize: "1.2rem",
});

const IconLayout = styled("div", {
    width: "44px",
    height: "44px",
});

const ButtonContentLayout = styled("div", {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    justifyContent: "center",
    alignItems: "center",
});

export default function Home() {
    return (
        <>
            <Head>
                <title>SchoolUtilities</title>
                <meta property="og:type" content="SchoolUtilities"></meta>
                <meta property="og:url" content="https://schoolutilities.net/"></meta>
                <meta property="og:title" content="SchoolUtilities"></meta>
                <meta name="description" content="LET’S MAKE SCHOOL EASY."></meta>
                <meta
                    property="og:description"
                    content="LET’S MAKE SCHOOL EASY."
                ></meta>
                <meta
                    property="og:image"
                    content="https://i.imgur.com/KJ63K3r.png"
                ></meta>
            </Head>
            <Navbar />
            <FirstBoxLayout>
                <StartPageBox
                    title={["DISCORD BOT"]}
                    description="We think it is extremely important to bring joy into the daily
                    School-Routine of students and teachers. With incredible features and
                    the right design, we make this possible."
                    highlightedButtonText="SEE FEATURES"
                    highlightedButtonLink="/features"
                    buttonText="ADD TO DISCORD"
                    buttonLink="/bot/invite"
                />
            </FirstBoxLayout>
            <InnerContentLayout>
                <FeatureList
                    features={[
                        {
                            title: "Timetable",
                            description: `Construct your timetable depending on your
                        personal needs. Easily set up your timetable
                        with just a few simple steps on our dashboard.`,
                            buttonText: "CONFIGURE",
                            buttonLink: "/",
                            textPosition: 'right',
                        },
                        {
                            title: "Calculation",
                            description: `Having the need to quickly solve your
                        math problems? No problem, we’ve got you
                        covered! Just use our new calculation feature!`,
                            buttonText: "LET'S GO",
                            buttonLink: "/",
                            textPosition: 'left',
                        },
                        {
                            title: "Attendance",
                            description: `Easier than ever before to check the
                        attendance of the students on your server.
                        This feature also comes with a lot of
                        customizable time and roles to check.`,
                            buttonText: "LET'S DO IT!",
                            buttonLink: "/",
                            textPosition: 'right',
                        },
                        {
                            title: "Alerts",
                            description: `You want to send a message to all of
                        your students? This is now easily possible
                        through the use of our alert feature.`,
                            buttonText: "GET ALERTED!",
                            buttonLink: "/",
                            textPosition: 'left',
                        }
                    ]}
                />
                <Spacer size="small" />
                <SubHeadline>Tutorials</SubHeadline>
                <TutorialDescription>Lorem ipsum dolor med lorem ipsum dolor med lorem ipsum dolor med lorem ipsum dolor med!</TutorialDescription>
                <Spacer size="small" />
                <TutorialList tutorials={[
                    {
                        title: "How to use the bot",
                        previewImageAlt: "How to use the bot",
                        previewImageSrc: "https://i.imgur.com/KJ63K3r.png",
                        tutorialHref: "/bot/how-to-use",
                    },
                    {
                        title: "How to set up the bot",
                        previewImageAlt: "How to set up the bot",
                        previewImageSrc: "https://i.imgur.com/KJ63K3r.png",
                        tutorialHref: "/bot/how-to-setup",
                    },
                    {
                        title: "How to use the bot",
                        previewImageAlt: "How to use the bot",
                        previewImageSrc: "https://i.imgur.com/KJ63K3r.png",
                        tutorialHref: "/bot/how-to-use",
                    },
                ]}></TutorialList>
                <Spacer size="medium" />
                <SubHeadline>Got your like?</SubHeadline>
                <TutorialDescription>You can easily add our services to your server on Discord with the button down below! <br />
                    We always love to see new members joining the community!</TutorialDescription>
                <Spacer size="small" />
                <ButtonLayout>
                    <Button
                        backgroundColor="primary"
                        color="primary"
                        fontWeight="medium"
                    >
                        <ButtonContentLayout>
                            <IconLayout>
                                <SvgDiscordLogo />
                            </IconLayout>
                            <ButtonText>
                                ADD TO DISCORD
                            </ButtonText>
                        </ButtonContentLayout>
                    </Button>
                </ButtonLayout>
                <Spacer size="medium" />
            </InnerContentLayout>
            <Footer />
        </>
    );
}
