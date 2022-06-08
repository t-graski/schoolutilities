import { useEffect } from "react";
import { getAccessToken } from "../../utils/authHelper";
import { appRoutes } from "../../utils/parameterConstants";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }) => {
  useEffect(() => {
    checkIfUserIsLoggedIn();

    async function checkIfUserIsLoggedIn() {
      //   Identify authenticated user
      const accessToken = await getAccessToken();

      let unprotectedRoutes = [
        appRoutes.HOME,
        appRoutes.NOT_FOUND,
        appRoutes.ABOUT_US,
        appRoutes.AUTH,
        appRoutes.AUTH_EMAIL_CHANGE,
        appRoutes.AUTH_PASSWORD_RESET,
        appRoutes.AUTH_REGISTER_APPROVED,
        appRoutes.AUTH_RESET_PASSWORD,
        appRoutes.BRANDING,
        appRoutes.CHANGE_LOGS,
        appRoutes.CHANGE_LOGS_COURSES_BUG_FIXES,
        appRoutes.CHANGE_LOGS_COURSES_ELEMENT_CREATION,
        appRoutes.CHANGE_LOGS_LOGIN_REGISTRATION_SCHOOL_CREATE,
        appRoutes.CHANGE_LOGS_NEW_COURSE_ELEMENTS_BUG_FIXES,
        appRoutes.CONTACT_US,
        appRoutes.DATA_POLICY,
        appRoutes.FEATURES,
        appRoutes.HELP,
        appRoutes.HELP_ARTICLES_DETAILS,
        appRoutes.HELP_ARTICLES_WHAT_IS_SCHOOLUTILITIES,
        appRoutes.HELP_FAQ,
        appRoutes.LOGIN_REDIRECT,
        appRoutes.PREMIUM_PLANS,
      ];

      /**
       * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
       */
      let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

      if (isBrowser() && !accessToken && pathIsProtected) {
        router.push(appRoutes.AUTH_LOGIN);
      }
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;
