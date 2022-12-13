import { FaPlus, FaRegUser } from "react-icons/fa";
import React, { memo, useEffect, useState } from "react";

import { ErrorsWrapper } from "../../shared/ErrorsWrapper";
import { IUserDetails } from "../../interfaces/user";
import { capitalizeFirstLetterAndSplitByUnderscore } from "../../utils/functions";
import { FormInput } from "../../shared/FormInput";

type ProfileProps = {
  onEditProfileClick: () => void;
  isEditable: boolean;
  user: Pick<
    IUserDetails,
    | "name"
    | "email"
    | "password"
    | "password_confirmation"
    | "identification_photo"
    | "role"
    | "hasWalletAddress"
    | "wallet_address"
    | "image_url"
  >;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSave: (e: React.FormEvent | React.MouseEvent<HTMLButtonElement>) => void;
  errors: Record<string, string>;
};

function ProfileImage({
  onChange,
  user,
  isEditable,
}: Pick<ProfileProps, "onChange" | "user" | "isEditable">) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user?.identification_photo instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(user.identification_photo);
    } else {
      setPreview(user?.image_url ?? null);
    }
  }, [user?.identification_photo, user?.image_url]);

  return (
    <div className="gap-4 mb-4 upload-profile d-flex mb-sm-0">
      <div className="upload-user-icon">
        {preview ? <img src={preview} alt="" /> : <FaRegUser />}
      </div>
      <div className="ml-3 cursor-pointer file-upload-input position-relative align-items-center">
        <input
          type="file"
          onChange={onChange}
          name="identification_photo"
          disabled={!isEditable}
          title="file"
          placeholder="Select File"
        />
        <label>
          <span>
            <FaPlus />
          </span>
          <span> {preview ? "Change Image" : "Add Image"}</span>
        </label>
      </div>
    </div>
  );
}

export const MyProfile: React.FC<ProfileProps> = ({
  onEditProfileClick,
  isEditable,
  user,
  onChange,
  onSave,
  errors,
}) => {
  return (
    <div className="pt-5 offset-md-1 col-md-10">
      <div className="profile-heading">
        My Profile (
        {capitalizeFirstLetterAndSplitByUnderscore(user.role) ?? "N/A"})
      </div>
      {!errors.faceBook && <ErrorsWrapper errors={errors} />}
      <div className="mb-4 upload-wrapper d-flex justify-content-between flex-column flex-sm-row align-items-center">
        <ProfileImage onChange={onChange} user={user} isEditable={isEditable} />
        <div className="edit-btn-wrapper">
          <button
            type="button"
            title="Edit Profile"
            onClick={onEditProfileClick}
          >
            Edit Profile
          </button>
          {/* TODO:  onClick={() => setModalShow(true)}*/}
          <button
            type="submit"
            title="Save Profile"
            disabled={!isEditable}
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
      <div className="px-4 pb-5 row border-bottom border-radius-0 px-sm-0">
        <div className="mb-4 col-md-6">
          <FormInput
            type="text"
            placeholder="Your Name"
            name="name"
            label="Name"
            value={user.name ?? ""}
            onChange={onChange}
            disabled={!isEditable}
            minLength={2}
            maxLength={50}
          />
        </div>
        <div className="mb-4 col-md-6">
          <FormInput
            type="email"
            placeholder="demo@gmail.com"
            value={user.email ?? ""}
            label={"Email"}
            readOnly
            disabled
          />
        </div>
        <div className="mb-4 col-12">
          <FormInput
            type="text"
            placeholder="************"
            name="wallet_address"
            label={"Wallet Address"}
            value={user?.wallet_address ?? ""}
            onChange={onChange}
            // disabled={!isEditable || user?.hasWalletAddress}
            autoComplete="off"
            wrapperClassName={"flex-basis-100"}
            required={false}
          />
        </div>
        <div className="mb-4 col-md-6">
          <FormInput
            type="password"
            placeholder="************"
            name="password"
            label={"Password"}
            value={user?.password ?? ""}
            onChange={onChange}
            disabled={!isEditable}
            autoComplete="off"
            minLength={8}
            maxLength={25}
          />
        </div>
        <div className="mb-4 col-md-6">
          <FormInput
            type="password"
            placeholder="************"
            name="password_confirmation"
            value={user?.password_confirmation ?? ""}
            onChange={onChange}
            disabled={!isEditable}
            autoComplete="off"
            minLength={8}
            maxLength={25}
            label="Confirm Password"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(MyProfile);
