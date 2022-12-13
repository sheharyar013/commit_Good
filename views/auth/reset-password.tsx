import { AuthBannerImg, Logo, PasswordIcon } from "../../utils/images";
import { Home, Login } from "../../routes/routes";
import { Link, Redirect } from "react-router-dom";
import React, { useState } from "react";

import { toasterMessages } from "../../constants/messages";
import { validateObject } from "../../utils/validate-object";
import { ErrorsWrapper } from "../../shared/ErrorsWrapper";
import { CheckIfGetParamExistsInUrl } from "../../utils/check-get-param-exists";
import { resetPasswordRequest } from "../../utils/services/actions/auth";
import { toast } from "react-toastify";

export default function ResetPassword(): React.ReactElement {
  const [values, setValues] = useState({
    password: "",
    password_confirmation: "",
    token: CheckIfGetParamExistsInUrl("token") as string,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState<boolean>(false);

  const onValueChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
  };

  if (window.localStorage.getItem("access_token")) {
    return <Redirect to={"/"} />;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    const { password, password_confirmation } = values;
    const { hasErrors, errors: validationErrors } = validateObject(
      { ...values },
      ["password"]
    );
    if (hasErrors) {
      setErrors(validationErrors);
      return;
    } else if (password !== password_confirmation) {
      setErrors({
        password: toasterMessages.password_mismatch,
      });
      return;
    }
    setErrors({});
    setLoading(true);
    resetPasswordRequest(values)
      .then(() => {
        toast.success(toasterMessages.passwordResetSuccess, {
          toastId: "reset-password-success",
        });
        setSuccess(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (success) {
    return <Redirect to={Login} />;
  }

  return (
    <section className="login-section login-fix">
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

                <form onSubmit={onSubmit}>
                  <ErrorsWrapper errors={errors} />
                  <div className="input-container position-relative mb-3">
                    <input
                      type="password"
                      placeholder="*********"
                      required
                      name="password"
                      value={values.password}
                      onChange={onValueChange}
                    />
                    <span>
                      <img src={PasswordIcon} alt="" />
                    </span>
                  </div>
                  <div className="input-container position-relative mb-3">
                    <input
                      type="password"
                      placeholder="*********"
                      required
                      name="password_confirmation"
                      value={values.password_confirmation}
                      onChange={onValueChange}
                    />
                    <span>
                      <img src={PasswordIcon} alt="" />
                    </span>
                  </div>

                  <div className="auth-btn mb-3">
                    <button disabled={loading} type="submit">
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </form>

                <div className="auth-link">
                  <span>
                    Remember your password ? <Link to={Login}>Login</Link>
                  </span>
                </div>
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
