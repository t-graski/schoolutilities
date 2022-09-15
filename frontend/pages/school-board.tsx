import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isSSR } from "../utils/isSSR";
import { keyframes, styled } from "@stitches/react";

const Footer = dynamic(() => import("../components/organisms/Footer"));
const Navbar = dynamic(() => import("../components/organisms/Navbar"));

const times = [
  {
    hour: 8,
    minute: 0,
  },
  {
    hour: 8,
    minute: 50,
    end: true,
  },
  {
    hour: 8,
    minute: 55,
  },
  {
    hour: 9,
    minute: 45,
    end: true,
  },
  {
    hour: 10,
    minute: 0,
  },
  {
    hour: 10,
    minute: 50,
    end: true,
  },
  {
    hour: 10,
    minute: 55,
  },
  {
    hour: 11,
    minute: 45,
    end: true,
  },
  {
    hour: 11,
    minute: 50,
  },
  {
    hour: 12,
    minute: 40,
    end: true,
  },
  {
    hour: 12,
    minute: 45,
  },
  {
    hour: 13,
    minute: 35,
    end: true,
  },
  {
    hour: 13,
    minute: 40,
  },
  {
    hour: 14,
    minute: 30,
    end: true,
  },
  {
    hour: 14,
    minute: 35,
  },
  {
    hour: 15,
    minute: 25,
    end: true,
  },
  {
    hour: 15,
    minute: 30,
  },
  {
    hour: 16,
    minute: 20,
    end: true,
  },
  {
    hour: 16,
    minute: 25,
  },
  {
    hour: 20,
    minute: 13,
    end: true,
  },
];

const StyledTimer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "200px",
  height: "100px",
  fontSize: "3rem",
});

const SchoolBoardLayout = styled("div", {
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

const scaleUp = keyframes({
  "0%": { fontSize: "0rem" },
  "15%": { fontSize: "9rem" },
  "85%": { fontSize: "15rem", opacity: 1 },
  "95%": { fontSize: "40rem" },
  "100%": { fontSize: "40rem", opacity: 0 },
});

const AnimatedTimer = styled("div", {
  height: "100px",
  fontSize: "3rem",

  variants: {
    animation: {
      true: {
        animation: `${scaleUp} 1s infinite`,
      },
    },
  },
});

export default function Home() {
  useEffect(() => {
    let startInterval = setInterval(() => {
      setTimeString(getTimeString());

      times.forEach((time) => {
        if (
          new Date().getHours() === time.hour &&
          new Date().getMinutes() === time.minute &&
          new Date().getSeconds() === 0
        ) {
          let interval = setInterval(() => {
            setShowHighlight(!showHighlight);
          }, 500);

          setTimeout(() => {
            clearInterval(interval);
            setShowHighlight(false);
          }, 5000);
        }
        // if (
        //   addSeconds(10).getHours() === time.hour &&
        //   addSeconds(10).getMinutes() === time.minute
        // ) {
        //   if (new Date().getSeconds() > 49) {
        //     setCounterString(60 - new Date().getSeconds() + "");
        //   } else if (new Date().getSeconds() == 0) {
        //     setCounterString(time?.end ? "Pause!" : "Start!");
        //   } else {
        //     setCounterString("");
        //   }
        // }
      });
      if (new Date().getSeconds() > 49) {
        setCounterString(60 - new Date().getSeconds() + "");
      } else if (new Date().getSeconds() == 0) {
        setCounterString("Pause!");
      } else {
        setCounterString("");
      }
    }, 1000);

    return () => {
      clearInterval(startInterval);
    };
  }, []);

  setInterval(() => {
    if (!isSSR()) {
      window.location.reload();
    }
  }, 2000 * 60);

  const [showHighlight, setShowHighlight] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [counterString, setCounterString] = useState("");

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
      <SchoolBoardLayout>
        <StyledTimer>{timeString}</StyledTimer>
        <AnimatedTimer animation={!!counterString}>
          {counterString}
        </AnimatedTimer>
      </SchoolBoardLayout>
      <Footer />
    </>
  );
}

function getFormattedTime(time) {
  return time < 10 ? "0" + time : time;
}

function getTimeString() {
  return (
    getFormattedTime(new Date().getHours()) +
    ":" +
    getFormattedTime(new Date().getMinutes()) +
    ":" +
    getFormattedTime(new Date().getSeconds())
  );
}

function addSeconds(numOfSeconds, date = new Date()) {
  date.setSeconds(date.getSeconds() + numOfSeconds);

  return date;
}
