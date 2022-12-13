import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import {
  getAllRegisteredEmails,
  registerUser,
} from "../../utils/services/actions";

import AuthWizard from "../../components/auth/authWizard.jsx";
import { ErrorsWrapper } from "../../shared/ErrorsWrapper";
import { GlobalId } from "../../layouts/GlobalID";
import { Home } from "../../routes/routes";
import { Logo } from "../../utils/images";
import UserInfoStep from "../../components/auth/userInfoStep";
import UserRegionStep from "../../components/auth/userRegionStep";
import { convertToFormData } from "../../utils/convert-to-form-data";
import { getGlobalIdUserDetails } from "../../utils/functions";
import { getSessionUser } from "../../utils/auth";
import { toast } from "react-toastify";
import { toasterMessages } from "../../constants/messages";
import { useCountryCity } from "../../hooks/useCountryCity";
import { validateObject } from "../../utils/validate-object";
import { validateZipCode } from "../../constants/postal-code-validations";
import { ERole } from "../../interfaces/user";
import { createEscrow } from "../artCreate/calls";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";

export default function SignUp() {
  const [regId, setregId] = useState(0);
  const { push } = useHistory();
  const { state } = useLocation();
  const wallet = useWallet();
  const { publicKey } = wallet;
  const conn = new Connection(clusterApiUrl("devnet"), "confirmed");
  const [errors, setErrors] = useState({});
  const [connected, setConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [escrowCreated, setEscrowCreated] = useState(false);
  const [values, setValues] = useState({
    user: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "" ?? "N/A",
      member_type: "",
      address_line1: "",
      address_line2: "",
      address_city: "",
      address_state: "",
      address_country: "",
      address_zip: "",
      wallet_address: "",
      terms_accepted: false,
    },
    alliance: [
      {
        name: "",
        contact_email: "",
        description: "",
        logo: "",
        area_of_interest_id: 0,
        website_url: "",
        facebook_url: "",
        twitter_url: "",
        gplus_url: "",
        verification_doc: "",
        region_id: "",
        campaign_coordinator_id: "",
      },
    ],
    license_photo: null,
    identification_photo: null,
  });
  const cityCountries = useCountryCity(values.user.address_country);
  const { selectedCountry, states, selectedState, cities, selectedCity } =
    cityCountries;

  const fetchAllRegisteredEmails = useCallback(async (fetching) => {
    if (fetching) {
      setRegisteredEmails(await getAllRegisteredEmails());
    }
  }, []);

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        address_state: "",
        address_city: "",
      },
    }));
  }, [selectedCountry]);

  useEffect(() => {
    let fetching = true;
    fetchAllRegisteredEmails(fetching);
    return () => {
      fetching = false;
    };
  }, []);

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} e
   * @param {string | undefined} objKey
   */
  const onValueChange = (e, objKey) => {
    const { name: elemName, value, type: elemType, checked } = e.target;
    if (elemName === "address_zip" && value.length > 8) {
      toast.error("Zip code cannot have more than 8 characters", {
        toastId: "validation",
      });
      return;
    }
    if (objKey) {
      setValues((prev) => ({
        ...prev,
        [objKey]: {
          ...prev[objKey],
          [elemName]: elemType === "checkbox" ? checked : value,
        },
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [elemName]: elemType === "checkbox" ? checked : value,
      }));
    }
  };

  const getUserDetailsFromGlobalId = async () => {
    try {
      const {
        data: { data, access_token, logged_in, user },
      } = await getGlobalIdUserDetails(state);
      setConnected(true);
      if (logged_in) {
        setIsSubmitting(true);
        window.localStorage.setItem("access_token", access_token);
        window.localStorage.setItem("userInfo", JSON.stringify(user));
        toast.success("Logged in successfully");
        push(Home);
      } else {
        setValues((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            uuid: data.gid_uuid,
            name: data.gid_name,
            address_city: data.region_name,
            address_state: data.state_name,
            address_country: data.country_name,
            terms_accepted: true,
            provider: "globalid",
          },
        }));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error?.response);
    }
  };

  useEffect(() => {
    if (state) {
      getUserDetailsFromGlobalId();
    }
    //eslint-disable-next-line
  }, [state]);

  const onAllianceChange = (e, index) => {
    const { name: elemName, value, type: elemType, checked } = e.target;
    const currentValues = values.alliance.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [elemName]: elemType === "checkbox" ? checked : value,
        };
      }
      return item;
    });
    setValues((prev) => ({
      ...prev,
      alliance: currentValues,
    }));
  };

  const onFileChange = (e, status, name, index) => {
    const { file } = e;
    const currentValues = values.alliance.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [name]: status === "removed" ? "" : file,
        };
      }
      return item;
    });
    setValues((prev) => ({
      ...prev,
      alliance: currentValues,
    }));
  };

  const validateAllianceFiles = () => {
    let valid = true;
    let message = "";
    values.alliance.map((item) => {
      if (!item.logo || !item.verification_doc) {
        valid = false;
        message = !item.verification_doc
          ? "Please select charity verification document"
          : !item.logo
          ? "Please select charity logo"
          : "";
      }
      return item;
    });
    return { valid, message };
  };

  const onRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    let validate;
    // handle first step validation
    if (regId === 0) {
      validate = validateObject(
        values.user,
        connected
          ? [
              "email",
              "member_type",
              values.user.member_type === ERole.charity
                ? "wallet_address"
                : undefined,
            ]
          : [
              "email",
              "password",
              "password_confirmation",
              "name",
              "member_type",
              values.user.member_type === ERole.charity
                ? "wallet_address"
                : undefined,
            ]
      );

      if (validate.hasErrors || registeredEmails.includes(values.user.email)) {
        setErrors(validate.errors);
        return toast.error(toasterMessages.validation, {
          toastId: "validation",
        });
      }
      // validate passwords
      if (values.user.password !== values.user.password_confirmation) {
        setErrors({
          password: toasterMessages.password_mismatch,
        });
        return;
      }

      setErrors({});

      // validate alliances files
      if (values.user.member_type === ERole.charity) {
        const fileValidation = validateAllianceFiles();
        if (!fileValidation.valid)
          return toast.error(fileValidation.message, { toastId: "validation" });
      }
      return setregId(1);
    }

    const objectKeys = [
      "address_line1",
      "address_country",
      states.length > 0 && !selectedState ? "address_state" : undefined,
      cities.length > 0 && !selectedCity ? "address_city" : undefined,
    ];

    validate = validateObject(values.user, objectKeys);
    if (validate.hasErrors) {
      setErrors(validate.errors);
      return toast.error(toasterMessages.validation, { toastId: "validation" });
    }

    if (values.user.address_zip && values.user.address_zip.length < 2) {
      toast.error("Zip code cannot be less than 2 characters", {
        toastId: "validation",
      });
      return;
    }
    setErrors({});

    if (
      values.user.address_zip &&
      !validateZipCode(
        cityCountries.selectedCountryCode,
        values.user.address_zip
      )
    )
      return toast.error(toasterMessages.invalid_zip, {
        toastId: "invalid-zip",
      });

    try {
      setIsSubmitting(true);
      await registerUser(convertToFormData(values)).finally(() => {
        setIsSubmitting(false);
      });
      toast.info(
        "Welcome onboard! registered successfully, please sign in to continue"
      );
      push("/login");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  if (window.localStorage.getItem("access_token")) {
    return <Redirect to={"/"} />;
  }

  return (
    <section className="login-section">
      <div className="header-login">
        <div className="logo">
          <Link to={Home}>
            <img src={Logo} alt="" />
          </Link>
        </div>
        <GlobalId
          user={getSessionUser()}
          globalId={connected}
          btnText="Register"
          showConnectWallet
        />
      </div>

      <div className="auth-form">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <AuthWizard regId={regId} setregId={setregId} />
              <ErrorsWrapper errors={errors} />
              <UserInfoStep
                values={values}
                onValueChange={onValueChange}
                regId={regId}
                setregId={setregId}
                onAllianceChange={onAllianceChange}
                onPdfChange={onFileChange}
                onRegister={onRegister}
                registeredEmails={registeredEmails}
                isGlobalIdConnected={connected}
              />

              <UserRegionStep
                regId={regId}
                setregId={setregId}
                values={values}
                onValueChange={onValueChange}
                onRegister={onRegister}
                cityCountries={cityCountries}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
