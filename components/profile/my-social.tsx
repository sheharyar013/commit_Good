import React, { memo } from "react";
import { IUserDetails } from "../../interfaces/user";
import { ErrorsWrapper } from "../../shared/ErrorsWrapper";

type SocialProps = {
  isEditable: boolean;
  user: Pick<IUserDetails, "facebook_url" | "website_url" | "linkedin_url">;
  errors: Record<string, string>;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const MySocial: React.FC<SocialProps> = ({
  isEditable,
  user,
  onChange,
  errors,
}) => {
  console.log(errors);

  return (
    <div className="offset-md-1 col-md-10 pt-5 pb-5">
      <div className="profile-heading">Social</div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="input-form">
            <label htmlFor="">Facebook URL</label>
            <input
              type="url"
              placeholder="https://facebook.com/abc"
              name="facebook_url"
              disabled={!isEditable}
              value={user.facebook_url}
              onChange={onChange}
            />
            {errors.faceBook ? <h1>{errors.faceBook}</h1> : ""}
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="input-form">
            <label htmlFor="">Linkedin URL</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/xyz"
              name="linkedin_url"
              disabled={!isEditable}
              value={user.linkedin_url}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="input-form">
            <label htmlFor="">Website Link</label>
            <input
              type="url"
              placeholder="http://www.nft.com"
              name="website_url"
              disabled={!isEditable}
              value={user.website_url}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MySocial);
