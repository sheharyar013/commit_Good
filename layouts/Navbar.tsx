import {
  About,
  Chat,
  CreateProject,
  GoodEconomy,
  Home,
  Login,
  ProfileRoute,
  Projects,
  SignUp,
  VolunteerTaskRoute,
} from "../routes/routes";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { ERole, IUser } from "../interfaces/user";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { getSessionUser, isLoggedIn, logoutSessionUser } from "../utils/auth";
import { CommitGoodNFTDOCS } from "../utils/docs";
import { FaUserAlt } from "react-icons/fa";
import { Logo } from "../utils/images";
import UserVerifiedModal from "../components/modal/user-unverified";
import { chatUnreadCountApi } from "../utils/services/actions/chat";
import { scrollToDiv } from "../utils/shared";
import { PROFILE_UPDATE } from "../constants/constants";
import ConnectModal from "../components/modal/connectModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { notify } from "../shared/notify";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useGoodTokenPrice } from "../hooks/useGoodPrice";
import { toast } from "react-toastify";
import useMetaWallet from "../hooks/useMetaWallet";
import { Button } from "antd";
import { RootStateOrAny, useSelector } from "react-redux";

function Register({ signup }: { signup: () => void }) {
  return (
    <button type="button" onClick={signup} className="btn-register">
      Register
    </button>
  );
}

export default function NavbarTop() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const { disconnect } = useWallet();
  const { defaultAccount, connectwalletHandler } = useMetaWallet();
  const [toggleButton, setToggleButton] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const todos = useSelector(
    (state: RootStateOrAny) => state.wallet.defaultAccount
  );

  const { price } = useGoodTokenPrice(30_000);
  const onButtonToggle = () => {
    setToggleButton((prev) => !prev);
  };

  const logoutUser = () => {
    logoutSessionUser();
    setUserInfo(getSessionUser());
    history.push("/");
  };

  const redirectToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    history.push(Home);
    setTimeout(() => {
      scrollToDiv("how_it_works");
    }, 100);
  };

  const redirectToOtherPage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { url } = e.currentTarget.dataset;
    history.push(url as string);
  };

  const signup = () => {
    history.push(SignUp);
  };

  const setUserDetails = () => {
    setUserInfo(getSessionUser());
  };

  useEffect(() => {
    setUserDetails();
    window.addEventListener(PROFILE_UPDATE, setUserDetails);
    return () => {
      window.removeEventListener(PROFILE_UPDATE, setUserDetails);
    };
  }, []);

  const unreadCountFetch = useCallback(
    async (fetching: boolean) => {
      if (fetching && userInfo) {
        if (pathname === Chat) {
          setUnreadCount(0);
        } else {
          const data = (await chatUnreadCountApi()) as unknown as {
            unread_messages: number;
          };
          setUnreadCount(data.unread_messages);
        }
      }
    },
    [pathname]
  );

  const walletDisconnect = () => {
    disconnect().then(() => {
      notify({
        message: "Wallet Disconnected",
      });
    });
  };

  useEffect(() => {
    let fetching = true;
    unreadCountFetch(fetching);
    return () => {
      fetching = false;
    };
  }, [unreadCountFetch]);

  return (
    <>
      <Navbar
        collapseOnSelect
        bg="light"
        variant="light"
        fixed="top"
        expand="xl"
      >
        <Container fluid>
          <NavLink className="navbar-brand logo" to={Home}>
            <img src={Logo} alt="" />
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <a className="nav-link" href={"/"} onClick={redirectToSection}>
                How it Works
              </a>
              {userInfo?.role !== ERole.charity ? (
                <Nav.Link
                  as={Link}
                  className="nav-link"
                  to={About}
                  eventKey={1}
                  active={pathname === About}
                >
                  About Us
                </Nav.Link>
              ) : null}
              {userInfo?.role === ERole.charity ? (
                <Nav.Link
                  as={Link}
                  className="nav-link"
                  to={CreateProject}
                  eventKey={2}
                  active={pathname === CreateProject}
                  onClick={(e) => {
                    if (!getSessionUser()?.wallet_address) {
                      e.preventDefault();
                      toast.info("please enter your wallet address first");
                      history.replace("/profile");
                    }
                  }}
                >
                  Create Project
                </Nav.Link>
              ) : null}
              {userInfo?.role === ERole.charity_coordinator ? (
                <Nav.Link
                  as={Link}
                  className="nav-link"
                  to={Projects}
                  eventKey={3}
                  active={pathname === Projects}
                >
                  Manage Projects
                </Nav.Link>
              ) : null}
              {userInfo?.role === ERole.volunteer ? (
                <Nav.Link
                  as={Link}
                  className="nav-link"
                  to={VolunteerTaskRoute}
                  eventKey={44}
                  active={pathname === VolunteerTaskRoute}
                >
                  Tasks
                </Nav.Link>
              ) : null}
              <Nav.Link
                as={Link}
                className="nav-link"
                to={GoodEconomy}
                eventKey={4}
                active={pathname === GoodEconomy}
              >
                $GOOD Economy
              </Nav.Link>
              {[ERole.charity, ERole.volunteer].includes(
                userInfo?.role as any
              ) ? (
                <Nav.Link
                  as={Link}
                  className="nav-link"
                  to={Chat}
                  eventKey={5}
                  active={pathname === Chat}
                >
                  Chat
                  {unreadCount ? (
                    <span className="unread_count">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  ) : null}
                </Nav.Link>
              ) : null}
              {userInfo?.role !== ERole.charity ? (
                <a
                  href={CommitGoodNFTDOCS}
                  className="mr-3 nav-link"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Whitepaper
                </a>
              ) : null}
              {isLoggedIn() ? (
                <AuthMenu
                  userInfo={userInfo}
                  redirectToOtherPage={redirectToOtherPage}
                  logoutUser={logoutUser}
                />
              ) : (
                <>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    exact={true}
                    to={Login}
                  >
                    Sign in
                  </NavLink>

                  <div>
                    <Register signup={signup} />
                  </div>
                </>
              )}
              <div>
                {/* <WalletMultiButton />
                 */}
                <Button
                  className="wallet-adapter-button-trigger"
                  onClick={() => {
                    if (todos) {
                      return;
                    } else {
                      connectwalletHandler();
                    }
                    
                  }}
                >
                  {todos ? "Connected" : "Connect Wallet"}
                </Button>
              </div>
              <div>
                <button
                  className="btn-buy-good"
                  onClick={onButtonToggle}
                  type="button"
                >
                  Buy $GOOD
                </button>
              </div>

              <div className="mr-3 nav-link text-center">
                <p className={"text-dark"}>$GOOD</p>
                {price?.toFixed?.(4) ?? "N/A"}
              </div>
            </Nav>
          </Navbar.Collapse>
          {toggleButton ? (
            <div className="mb-3 btns-show">
              <a
                href="https://biconomy.com"
                target="_blank"
                rel="noreferrer noopener"
                className="btn-buy-good"
                onClick={onButtonToggle}
              >
                Buy $GOOD on Biconomy
              </a>
            </div>
          ) : null}
        </Container>
      </Navbar>
      <UserVerifiedModal
        userVerified={userInfo?.wallet_status}
        role={userInfo?.role}
      />
      <ConnectModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

function AuthMenu({
  userInfo,
  redirectToOtherPage,
  logoutUser,
}: {
  userInfo: IUser | null;
  redirectToOtherPage: (e: React.MouseEvent<HTMLDivElement>) => void;
  logoutUser: () => void;
}): React.ReactElement {
  return (
    <Dropdown className="header-dropdown">
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {userInfo?.profile_image ? (
          <img
            src={userInfo?.profile_image}
            alt=""
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png";
            }}
          />
        ) : (
          <FaUserAlt />
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu key="3e">
        <>
          <Dropdown.Item>
            <div
              onClick={redirectToOtherPage}
              data-url={ProfileRoute}
              className="dropdown-item"
            >
              My Profile
            </div>
          </Dropdown.Item>
          {userInfo?.role !== ERole.charity && (
            <Dropdown.Item>
              <div
                onClick={redirectToOtherPage}
                data-url={"/artworks"}
                className="dropdown-item"
              >
                My Art Works
              </div>
            </Dropdown.Item>
          )}
          <Dropdown.Item>
            <div onClick={logoutUser} className="dropdown-item">
              Logout
            </div>
          </Dropdown.Item>
        </>
      </Dropdown.Menu>
    </Dropdown>
  );
}
