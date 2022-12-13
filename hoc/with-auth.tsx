import { Login, SignUp } from "../routes/routes";
import { useHistory, useLocation } from "react-router-dom";

import React from "react";

interface ComponentProps {
  [key: string | number]: any;
}

//new () => React.Component<any, any>
const withAuth = <T extends ComponentProps>(
  WrappedComponent: React.ComponentType
) => {
  // eslint-disable-next-line react/display-name
  return (props: Omit<T, keyof ComponentProps>): React.ReactElement | null => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const { replace } = useHistory();
      const { pathname } = useLocation();

      const accessToken = localStorage.getItem("access_token");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        replace(Login);
        return null;
      } else if (accessToken && [Login, SignUp].includes(pathname)) {
        replace("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
