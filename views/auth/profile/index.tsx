import { ERole, IUserDetails } from "../../../interfaces/user";
import React, { useCallback, useEffect, useState } from "react";
import {
  getUserDetails,
  updateUserDetails,
} from "../../../utils/services/actions";

import { ProfileWrapper } from "./wrapper";
import { convertToFormData } from "../../../utils/convert-to-form-data";
import { toast } from "react-toastify";
import { toasterMessages } from "../../../constants/messages";
import { useToggle } from "../../../hooks/useToggle";
import { validateObject } from "../../../utils/validate-object";
import withAuth from "../../../hoc/with-auth";

export const Profile = () => {
  const [userDetails, setUserDetails] = useState<IUserDetails>({
    email: "N/A",
    name: "N/A",
    id: 0,
    role: ERole.volunteer,
    address_line1: "N/A",
    address_line2: "N/A",
    city: "N/A",
    county: "N/A",
    facebook_url: "N/A",
    image_url: "",
    linkedin_url: "N/A",
    state: "N/A",
    website_url: "N/A",
    zip: "N/A",
    wallet_address: "",
    wallet_status: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState({});

  const getDetails = useCallback(async (isMounted: boolean) => {
    if (!isMounted) return;
    const data = (await getUserDetails()) as unknown as IUserDetails;
    setUserDetails({ ...data, hasWalletAddress: !!data?.wallet_address });
  }, []);
  const [isEditable, setIsEditable] = useToggle();

  useEffect(() => {
    let isMounted = true;
    getDetails(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  function validate_fb_url(url) {
    // /^((?:https?\:\/\/|www\.)(?:facebook)(?:.com\/)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*?)$/i
    if (/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(url))
      return "facebook";

    return "unknown";
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    // if (name === "facebook_url") {
    //   console.log(name, "facebook url");
    //   if (/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(value)) {
    //     setValidationErrors({
    //       faceBook: "link is not correct",
    //     });
    //   }
    // }

    console.log(validate_fb_url(name), "hello jds");

    // alert("This link is " + validate_fb_url(name));

    if (files?.length) {
      setUserDetails((prev) => ({
        ...prev,
        identification_photo: files[0],
      }));
      return;
    }
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = (e: React.FormEvent | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    const { hasErrors, errors } = validateObject(
      userDetails,
      userDetails?.password
        ? ["name", "address_line1", "city", "county", "state", "password"]
        : ["name", "address_line1", "city", "county", "state"]
    );

    if (hasErrors) {
      setValidationErrors(errors);
      toast.error(toasterMessages.validation, {
        toastId: "validation",
      });
      return;
    }

    if (
      userDetails?.password &&
      userDetails?.password !== userDetails?.password_confirmation
    ) {
      setValidationErrors({
        password: toasterMessages.password_mismatch,
      });
      toast.error(toasterMessages.password_mismatch, {
        toastId: "validation",
      });
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({});
    updateUserDetails(
      convertToFormData({
        name: userDetails.name,
        email: userDetails.email,

        address_line1: userDetails.address_line1,
        address_line2: userDetails.address_line2,
        address_city: userDetails.city,
        address_state: userDetails.state,
        address_country: userDetails.county,
        address_zip: userDetails.zip,
        password: userDetails?.password ?? undefined,
        password_confirmation: userDetails?.password_confirmation ?? undefined,
        identification_photo: userDetails?.identification_photo,
        wallet_address: userDetails?.wallet_address,
        facebook_url: userDetails?.facebook_url,
        website_url: userDetails?.website_url,
        linkedin_url: userDetails?.linkedin_url,
      })
    )
      .then(() => {
        setIsEditable();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={onSave} autoComplete="off">
      <ProfileWrapper
        userDetails={userDetails}
        onChange={onChange}
        onSave={onSave}
        errors={validationErrors}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
      />
    </form>
  );
};

export default withAuth(Profile);
