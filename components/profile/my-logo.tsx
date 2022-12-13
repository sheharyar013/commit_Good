import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Home } from "../../routes/routes";
import { Logo } from "../../utils/images";

export const MyLogo = () => {
  return (
    <div className="header-login justify-content-center">
      <Link to={Home}>
        <img src={Logo} alt="" />
      </Link>
    </div>
  );
};

export default memo(MyLogo);
