import { useHistory } from "react-router-dom";

import React from "react";
import { toast } from "react-toastify";
import { ERole } from "../interfaces/user";
import { getSessionUser } from "../utils/auth";

interface ComponentProps {}

//new () => React.Component<any, any>
const withVolunteerRole = <T extends ComponentProps>(
  WrappedComponent: React.ComponentType
) => {
  // eslint-disable-next-line react/display-name
  return (props: Omit<T, keyof ComponentProps>): React.ReactElement | null => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const { replace } = useHistory();

      // If there is no access token we redirect to "/" page.
      if (getSessionUser()?.role !== ERole.volunteer) {
        toast.info("Not Authorized", {
          toastId: "not-authorized",
        });
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

export default withVolunteerRole;
