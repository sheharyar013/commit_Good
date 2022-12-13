import {
  AuthBannerImg,
  EmailIcon,
  Logo,
  PasswordIcon,
} from "../../utils/images";
import { ForgetPasswordRoute, Home, SignUp } from "../../routes/routes";
import { Link, Redirect, useHistory } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";

import { GlobalId } from "../../layouts/GlobalID";
import { loginUser } from "../../utils/services/actions";
import { toast } from "react-toastify";
import { CheckIfGetParamExistsInUrl } from "../../utils/check-get-param-exists";
import { getGlobalIdUserDetails } from "../../utils/functions";
import { toasterMessages } from "../../constants/messages";
import { IUser } from "../../interfaces/user";

export default function Login(): React.ReactElement {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [connectGlobalId, setConnectGlobalId] = useState<boolean>(false);

  const globalBtnRef = React.createRef<HTMLButtonElement>();

  const setUserCredentials = (data: { access_token: string; user: IUser }) => {
    const { access_token, user } = data;
    window.localStorage.setItem("access_token", access_token);
    window.localStorage.setItem("userInfo", JSON.stringify(user));
    toast.success("Logged in successfully");
    history.push(Home);
  };

  function submitLoginForm(
    data: { email: string; password: string } | { uuid: string }
  ) {
    setLoading(true);
    loginUser(data)
      .then((resp: any) => {
        if (resp.logged_in) {
          setUserCredentials(resp);
        } else {
          toast.error(resp.message);
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  }

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    submitLoginForm({ email, password });
  };

  const connectViaGlobalId = useCallback(async (fetch: boolean) => {
    if (fetch) {
      const getGlobalIdCode = CheckIfGetParamExistsInUrl("code");
      if (getGlobalIdCode) {
        setConnectGlobalId(true);
        setLoading(true);
        try {
          const { data } = await getGlobalIdUserDetails(getGlobalIdCode, true);
          if (data.logged_in) {
            setUserCredentials(data);
            return;
          }
          submitLoginForm({ uuid: data.data.gid_uuid });
        } catch (e) {
          toast.error(toasterMessages.globalIdLoginFailed, {
            toastId: "globalIdLoginFailed",
          });
        } finally {
          setConnectGlobalId(false);
          setLoading(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    let fetch = true;
    connectViaGlobalId(fetch);
    return () => {
      fetch = false;
    };
  }, []);

  useEffect(() => {
    if (globalBtnRef.current) {
      globalBtnRef.current!.disabled = connectGlobalId;
    }
  }, [connectGlobalId]);

  if (window.localStorage.getItem("access_token")) {
    return <Redirect to={"/"} />;
  }

  return (
    <section className="login-section login-fix">
      <div className="header-login">
        <div className="logo">
          <Link to={Home}>
            <img src={Logo} alt="" />
          </Link>
        </div>
        <GlobalId
          url={process.env.NEXT_PUBLIC_GLOBAL_LOGIN_REDIRECT}
          btnText={"Login"}
          globalId={connectGlobalId}
          ref={globalBtnRef}
        />
      </div>

      <div className="auth-form">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-6 d-flex align-items-center justify-content-center">
              <div className="text-center auth-content">
                <h2>Log in</h2>

                <form onSubmit={login}>
                  <div className="mb-3 input-container position-relative">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>
                      <img src={EmailIcon} alt="" />
                    </span>
                  </div>

                  <div className="mb-3 input-container position-relative">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>
                      <img src={PasswordIcon} alt="" />
                    </span>
                  </div>
                  <div className="mt-0 mb-3 text-right auth-link">
                    <span>
                      Forget your password?{" "}
                      <Link to={ForgetPasswordRoute}>Reset</Link>
                    </span>
                  </div>

                  <div className="mb-3 auth-btn">
                    <button disabled={loading} type="submit">
                      {loading ? "Loading..." : "Log in"}
                    </button>
                  </div>
                </form>

                <div className="auth-link">
                  <span>
                    Don’t Have an Account ? <Link to={SignUp}>Register</Link>
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
