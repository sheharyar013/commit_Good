import { CharityInfo } from "./CharityInfo";
import { ERole } from "../../interfaces/user";
import { FormInput } from "../../shared/FormInput";
import PropTypes from "prop-types";
import React from "react";
import { toasterMessages } from "../../constants/messages";
import { Wallet } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSelector } from "react-redux";

export default function UserInfoStep(props) {
  const {
    values,
    onValueChange,
    onRegister,
    onAllianceChange,
    onPdfChange,
    regId,
    registeredEmails,
    isGlobalIdConnected,
  } = props;
  const { user } = values;
  const walletAddress = useSelector((state) => state.wallet.defaultAccount);
  const onUserInfoChange = (e) => {
    onValueChange(e, "user");
  };

  return (
    <>
      {regId === 0 ? (
        <section>
          <form onSubmit={onRegister} className={"needs-validation"}>
            <div className="container">
              <div className="wizard-form">
                <div className="mb-3 wizard-form-group">
                  <FormInput
                    placeholder="Your Name"
                    label="Name"
                    name="name"
                    onChange={onUserInfoChange}
                    value={user.name}
                    type="text"
                    readOnly={isGlobalIdConnected}
                  />
                  <FormInput
                    placeholder="Enter Email"
                    label="Email"
                    name="email"
                    onChange={onUserInfoChange}
                    value={user.email}
                    type="email"
                    hasError={registeredEmails.includes(user.email)}
                    errorMessage={toasterMessages.emailNotAvailable}
                  />
                  {isGlobalIdConnected ? null : (
                    <>
                      <FormInput
                        placeholder="Enter Password"
                        label="Password"
                        name="password"
                        onChange={onUserInfoChange}
                        value={user.password}
                        minLength={8}
                        maxLength={25}
                        type="password"
                      />
                      <FormInput
                        placeholder="Enter Password"
                        label="Confirm Password"
                        name="password_confirmation"
                        onChange={onUserInfoChange}
                        value={user.password_confirmation}
                        minLength={8}
                        maxLength={25}
                        type="password"
                      />
                    </>
                  )}

                  <FormInput
                    placeholder="Enter Your Wallet Address"
                    label="Wallet Address"
                    name="wallet_address"
                    onChange={onUserInfoChange}
                    value={user.wallet_address}
                    //user.wallet_address}
                    type="text"
                    wrapperClassName="flex-basis-100"
                    required={user.member_type === ERole.charity}
                  />

                  <div className="mb-4 register-role w-100">
                    <p>
                      I am a{" "}
                      <span className="required-attribute text-danger">*</span>
                    </p>
                    <div className="register-role-wrapper">
                      <div className="register-role-col">
                        <input
                          type="radio"
                          value={ERole.volunteer}
                          name="member_type"
                          id="volunteer"
                          onChange={onUserInfoChange}
                          checked={user.member_type === "volunteer"}
                        />
                        <label htmlFor="volunteer" className="ml-1">
                          Volunteer
                        </label>
                      </div>
                      <div className="register-role-col">
                        <input
                          type="radio"
                          value={ERole.charity}
                          required
                          name="member_type"
                          id={"charity"}
                          onChange={onUserInfoChange}
                          checked={user.member_type === ERole.charity}
                        />
                        <label htmlFor="charity" className="ml-1">
                          Charity
                        </label>
                      </div>
                      <div className="register-role-col">
                        <input
                          type="radio"
                          value={ERole.charity_coordinator}
                          required
                          id={"charity_coordinator"}
                          name="member_type"
                          onChange={onUserInfoChange}
                          checked={user.member_type === "charity_coordinator"}
                        />
                        <label htmlFor="charity_coordinator" className="ml-1">
                          Charity Coordinator
                        </label>
                      </div>
                      <div className="register-role-col">
                        <input
                          type="radio"
                          value={ERole.donor}
                          required
                          id={"donor"}
                          name="member_type"
                          onChange={onUserInfoChange}
                          checked={user.member_type === "donor"}
                        />
                        <label htmlFor="donor" className="ml-1">
                          Patron
                        </label>
                      </div>
                      <div className="register-role-col">
                        <input
                          type="radio"
                          value={ERole.nft}
                          required
                          id={"nft"}
                          name="member_type"
                          onChange={onUserInfoChange}
                          checked={user.member_type === "nft"}
                        />
                        <label htmlFor="nft" className="ml-1">
                          NFT Creator
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CharityInfo
                values={values}
                onAllianceChange={onAllianceChange}
                onPdfChange={onPdfChange}
              />

              <div className="mt-1 mb-5 step-buttons">
                <button
                  type="submit"
                  disabled={registeredEmails.includes(user.email)}
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </section>
      ) : null}
    </>
  );
}

UserInfoStep.propTypes = {
  onAllianceChange: PropTypes.func.isRequired,
  onPdfChange: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  regId: PropTypes.number,
  registeredEmails: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      member_type: PropTypes.string,
      name: PropTypes.string,
      password: PropTypes.string,
      password_confirmation: PropTypes.string,
      wallet_address: PropTypes.string,
    }).isRequired,
    alliance: PropTypes.arrayOf(
      PropTypes.shape({
        verification_doc: PropTypes.any,
        logo: PropTypes.any,
      })
    ),
  }).isRequired,
  isGlobalIdConnected: PropTypes.bool,
};
