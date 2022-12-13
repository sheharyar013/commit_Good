import React, { FC } from "react";

import { IUserDetails } from "../../../interfaces/user";
import MyProfile from "../../../components/profile/my-profile";
import MyRegion from "../../../components/profile/my-region";
import MySocial from "../../../components/profile/my-social";

type WrapperProps = {
  userDetails: IUserDetails;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSave: (e: React.FormEvent | React.MouseEvent<HTMLButtonElement>) => void;
  errors: Record<string, string>;
  isEditable: boolean;
  setIsEditable: () => void;
};

export const ProfileWrapper: FC<WrapperProps> = ({
  userDetails,
  onChange,
  onSave,
  errors,
  isEditable,
  setIsEditable,
}) => {
  console.log(errors, "error");

  return (
    <section className="login-section">
      <div className="auth-form">
        <div className="container">
          <div className="row">
            <MyProfile
              onEditProfileClick={setIsEditable}
              isEditable={isEditable}
              user={{
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails?.password,
                password_confirmation: userDetails?.password_confirmation,
                identification_photo: userDetails?.identification_photo,
                role: userDetails?.role,
                hasWalletAddress: userDetails?.hasWalletAddress,
                wallet_address: userDetails?.wallet_address,
                image_url: userDetails?.image_url,
              }}
              onChange={onChange}
              onSave={onSave}
              errors={errors}
            />
            <MyRegion
              isEditable={isEditable}
              user={{
                city: userDetails.city,
                county: userDetails.county,
                state: userDetails.state,
                address_line1: userDetails.address_line1,
                address_line2: userDetails.address_line2,
                zip: userDetails.zip,
              }}
              onChange={onChange}
            />
            <MySocial
              isEditable={isEditable}
              user={{
                facebook_url: userDetails.facebook_url,
                website_url: userDetails.website_url,
                linkedin_url: userDetails.linkedin_url,
              }}
              onChange={onChange}
              errors={errors}
            />
          </div>
        </div>
      </div>
      {/* <SuccessModal show={modalShow} onHide={() => setModalShow(false)} /> */}
    </section>
  );
};
