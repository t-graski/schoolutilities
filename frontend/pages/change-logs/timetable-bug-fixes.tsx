import { Headline } from "@/atoms/Headline";
import { Separator } from "@/atoms/Separator";
import { Spacer } from "@/atoms/Spacer";
import { BackLink } from "@/molecules/BackLink";
import Footer from "@/organisms/Footer";
import Navbar from "@/organisms/Navbar";
import { ArticleDetails } from "components/article/ArticleDetails";
import { ArticleLayout } from "components/article/ArticleLayout";
import { ArticleList } from "components/article/ArticleList";
import { GeneralLayout } from "components/article/GeneralLayout";
import Head from "next/head";

export default function Article() {
    const articleDetails = {
        title: "Timetable & many fixes",
        author: "Tobias Graski",
        date: "11/02/2022",
        readingTime: "5 min read",
    };

    return (
        <>
            <Head>
                <title>Patch Notes - SchoolUtilities</title>
            </Head>
            <Navbar></Navbar>
            <BackLink href={"/change-logs"} label={"Back to help"}></BackLink>
            <Headline label="November 02, 2022 - Patch Notes"></Headline>
            <Separator width="small" alignment="center" />
            <Spacer size="small"></Spacer>
            <ArticleDetails {...articleDetails}></ArticleDetails>
            <Spacer size="verySmall"></Spacer>
            <GeneralLayout>
                <ArticleLayout>
                    <p>
                        Hey,
                        <br />
                        It&apos;s been some time, but we are finally back with one big new feature and dozens of bug fixes.
                        We are eager to release our new timetable feature, which allows you to create your own timetable and custmize it to your needs.
                    </p>
                    <br />
                    <Headline
                        label="Timetable"
                        fontSize="verySmall"
                        alignment="left"
                    />
                    <p>
                        Let&apos;s start with the big one: Timetable.
                        <br />
                        We have already implemented a lot of features into it, but we are planning to add and improve those features even more in the future.
                        By clicking on the little &quot;+&quot; on top of the page you can access the timetable creation page. Of course, you can also add mutliple classes
                        simultaneously, which is very useful for bigger schools.
                        You can customize many things for each element such as:
                        <ArticleList>
                            <li>Subjects</li>
                            <li>Rooms</li>
                            <li>Teachers</li>
                            <li>Classes</li>
                        </ArticleList>
                        <br />
                        There are also some other events shown:
                        <ArticleList>
                            <li>Exams</li>
                            <li>Holidays</li>
                            <li>Substitutions</li>
                            <li>Canceled classes</li>
                        </ArticleList>
                        <br />
                        <Headline
                            label="Exams:"
                            fontSize="verySmall"
                            alignment="left"
                        />
                        You can view all exams by navigating to the left handside of the page and clicking on &quot;exams&quot;. You can either change the description
                        or the room of the exam. It is also possible to delete an exam.
                        <br />
                        <br />
                        <Headline
                            label="Holidays:"
                            fontSize="verySmall"
                            alignment="left"
                        />
                        Holidays are shown school wide in every class. They can be modified in the school settings page.
                        <br />
                        <br />
                        <Headline
                            label="Substitutions:"
                            fontSize="verySmall"
                            alignment="left"
                        />
                        Substitutions can be added by clicking on any element followed by clicking on &quot;Add substitution&quot;. You can customize teachers, classes and the room.
                        <br />
                        <br />
                        <Headline
                            label="Cancelled classes:"
                            fontSize="verySmall"
                            alignment="left"
                        />
                        A class can be cancelled by clicking on any element followed by clicking on &quot;Cancel class&quot;.
                        <br />
                        <br />
                        All of the above events are highlighted within the timetable.
                    </p>
                    <br />
                    <Headline
                        label="School settings overhaul"
                        fontSize="verySmall"
                        alignment="left"
                    />
                    <p>
                        Since last update we have added new settings into the school management page.
                    </p>
                    <ArticleList>
                        <li>Subjects</li>
                        <li>Rooms</li>
                        <li>Holidays</li>
                    </ArticleList>
                    <br />
                    <Headline
                        label="Dark & Light mode"
                        fontSize="verySmall"
                        alignment="left"
                    />
                    <p>
                        We adjusted all colors, which now have enough contrast as well as matching together.
                        Many contrast issues have been solved due to this as well. The theme is changeable in either the user dropdown menu or the
                        profile settings.
                    </p>
                    <br />
                    <Headline
                        label="Advanced profile settings"
                        fontSize="verySmall"
                        alignment="left"
                    />
                    <p>
                        The new profile settings come with a bunch of new settings such as:
                    </p>
                    <ArticleList>
                        <li>Account</li>
                        <li>Public Profile (coming soon)</li>
                        <li>Badges (coming soon)</li>
                        <li>Appearance</li>
                        <li>Security</li>
                        <li>Billing & Plans (coming soon)</li>
                    </ArticleList>
                    <br />
                    <p>
                        It is now possible to change password and email in the security tab. <br />
                        Every feature marked as &quot;coming soon&quot; are currenly being planned, but unfortunately not yet ready to be released.
                    </p>
                    <br />
                    <Headline
                        label="Improved list"
                        fontSize="verySmall"
                        alignment="left"
                    />
                    <p>
                        We have greatly improved the list item, which are used in pages like the school settings. It now shows
                        a lot more data on each page. Furthermore, it is now possible to select all items in a list at once.
                    </p>
                    <br />
                    <Headline
                        label="Ads"
                        fontSize="verySmall"
                        alignment="left"
                    />
                    <p>
                        Now to the more inconvenient part, ads. Yes, we also have to pay our bills. Thanks to ads we will provide you
                        with even more features in the future. And you don&apos;t have to worry, we only put ads on the bottom of every non login page.
                    </p>
                    <br />
                    <Headline
                        label="New featues & Changes"
                        fontSize="verySmall"
                        alignment="left"
                    />
                    <ArticleList>
                        <li>Improve skeleton loading</li>
                        <li>Improve registration error handling</li>
                        <li>Remove the language selection menu from profile dropdown</li>
                    </ArticleList>
                    <br />
                    <Headline
                        label="Bug fixes"
                        fontSize="verySmall"
                        alignment="left"
                    />
                    <ArticleList>
                        <li>Fix FAQ color highlighting</li>
                        <li>Fix bug causing pop-ups being behind skeleton loading elements</li>
                        <li>Fix bug casuing site being inaccessible due to not being in a school</li>
                    </ArticleList>
                    <br />
                    <p>
                        Last but not least I want to welcome our new member Maximilian, who is responsible to futher develop
                        our backend.
                    </p>
                </ArticleLayout>
            </GeneralLayout>
            <Spacer size="verySmall"></Spacer>
            <Footer></Footer>
        </>
    );
}
