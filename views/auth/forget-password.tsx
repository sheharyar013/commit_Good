import { AuthBannerImg, EmailIcon, Logo } from "../../utils/images";
import { Home, Login } from "../../routes/routes";
import { Link, Redirect } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";

import { getAllRegisteredEmails } from "../../utils/services/actions";
import { toasterMessages } from "../../constants/messages";
import { validateObject } from "../../utils/validate-object";
import { ErrorsWrapper } from "../../shared/ErrorsWrapper";
import { checkIfEmailIsValid } from "../../constants/regular-expressions";
import { forgetPasswordRequest } from "../../utils/services/actions/auth";

export default function ForgetPassword(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [registeredEmails, setRegisteredEmails] = useState<string[]>([]);
  const [errors, setErrors] = useState({});

  const fetchAllRegisteredEmails = useCallback(async (fetching) => {
    if (fetching) {
      setRegisteredEmails(
        (await getAllRegisteredEmails()) as unknown as string[]
      );
    }
  }, []);

  useEffect(() => {
    let fetching = true;
    fetchAllRegisteredEmails(fetching);
    return () => {
      fetching = false;
    };
  }, []);

  if (window.localStorage.getItem("access_token")) {
    return <Redirect to={"/"} />;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    const { hasErrors, errors: validationErrors } = validateObject({ email });
    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    forgetPasswordRequest(email)
      .then(() => {
        setSuccess(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="login-section">
      <div className="header-login">
        <div className="logo">
          <Link to={Home}>
            <img src={Logo} alt="" />
          </Link>
        </div>
      </div>

      <div className="auth-form">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-6 d-flex align-items-center justify-content-center">
              <div className="auth-content text-center">
                <h2>Get Your Account Back</h2>
                {!success ? (
                  <>
                    <form onSubmit={onSubmit}>
                      <ErrorsWrapper errors={errors} />
                      <div className="input-container position-relative mb-3">
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          value={email}
                          onChange={(e) => {
                            setErrors({});
                            setEmail(e.target.value);
                          }}
                        />
                        <span>
                          <img src={EmailIcon} alt="" />
                        </span>
                        {!registeredEmails.includes(email) &&
                        checkIfEmailIsValid(email) ? (
                          <small className="text-danger d-inline-block mt-2">
                            {toasterMessages.invalidEmail}
                          </small>
                        ) : null}
                      </div>

                      <div className="auth-btn mb-3">
                        <button
                          disabled={
                            loading ||
                            (!registeredEmails.includes(email) &&
                              checkIfEmailIsValid(email))
                          }
                          type="submit"
                        >
                          {loading ? "Loading..." : "Submit"}
                        </button>
                      </div>
                    </form>

                    <div className="auth-link">
                      <span>
                        Remember your password ? <Link to={Login}>Login</Link>
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-justify">
                    An email with a reset link has been sent to your inbox, if
                    you are unable to find it in your inbox please check your
                    spam folder
                  </p>
                )}
              </div>
            </div>
            <div className="d-none d-lg-block col-lg-6 auth-img-bg">
              <div className="auth-img">
                <img src={AuthBannerImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
