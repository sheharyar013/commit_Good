import React, { memo, useEffect } from "react";
import { useCountryCity } from "../../hooks/useCountryCity";
import { IUserDetails } from "../../interfaces/user";

type RegionProps = {
  isEditable: boolean;
  user: Pick<
    IUserDetails,
    "address_line1" | "address_line2" | "county" | "city" | "state" | "zip"
  >;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const MyRegion: React.FC<RegionProps> = ({
  isEditable,
  user,
  onChange,
}) => {
  const {
    countries,
    states,
    cities,
    onCountryChange,
    onStateChange,
    onCityChange,
  } = useCountryCity(user.county);

  useEffect(() => {
    onCountryChange({
      target: {
        value: user.county,
      },
    });
    onCityChange({
      target: {
        value: user.city,
      },
    });
    onStateChange({
      target: {
        value: user.state,
      },
    });
  }, [user.county, user.city, user.state]);

  return (
    <div className="offset-md-1 col-md-10 pt-5 pb-5 border-bottom">
      <div className="profile-heading">Region</div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="input-form">
            <label htmlFor="">Address Line 1</label>
            <input
              type="text"
              placeholder="123 street , canal Lake, USA"
              name="address_line1"
              value={user.address_line1}
              required
              disabled={!isEditable}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="input-form">
            <label htmlFor="">Address Line 2</label>
            <input
              type="text"
              placeholder="562 street , canal Lake, USA"
              name="address_line2"
              value={user.address_line2}
              disabled={!isEditable}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="input-form">
            <label htmlFor="country-list">Country</label>
            <select
              title="select country"
              name="county"
              id="country-list"
              value={user.county}
              required
              onChange={onChange}
              disabled={!isEditable}
            >
              <RenderList list={countries} />
            </select>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="input-form">
            <label htmlFor="states">State / Province</label>
            <select
              title="select state"
              name="state"
              id="states"
              value={user.state}
              required
              onChange={onChange}
              disabled={!isEditable}
            >
              <RenderList list={states} />
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-form">
            <label htmlFor="cities">City</label>
            <select
              title="select city"
              name="city"
              id="cities"
              value={user.city}
              required
              onChange={onChange}
              disabled={!isEditable}
            >
              <RenderList list={cities} />
            </select>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="input-form">
            <label htmlFor="zip_code">Zip Code</label>
            <input
              type="text"
              id="zip_code"
              name="zip"
              value={user.zip}
              placeholder="ABC 123"
              disabled={!isEditable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderList = ({ list }: { list: any[] }) => {
  return (
    <>
      {list.map(({ name }) => (
        <option value={name} key={name}>
          {name}
        </option>
      ))}
    </>
  );
};

export default memo(MyRegion);
