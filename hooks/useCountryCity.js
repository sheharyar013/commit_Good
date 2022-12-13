import { City, Country, State, ICity } from "country-state-city";
import { useEffect, useState } from "react";

/**
 *
 * @param {string} country
 * @returns
 */
export const useCountryCity = (country = "") => {
  const [countries] = useState(
    Country.getAllCountries().map((item) => ({
      name: item.name,
      country_code: item.isoCode,
    }))
  );
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const onCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const onStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const onCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    setSelectedCountry(country);
  }, [country]);

  useEffect(() => {
    const isoCode = countries.find((item) => item.name === selectedCountry);
    if (isoCode) {
      const countryStates = State.getStatesOfCountry(isoCode.country_code).map(
        (item) => ({ name: item.name, isoCode: item.isoCode })
      );
      if (!countryStates.length) {
        setCities([
          ...City.getCitiesOfCountry(
            isoCode.country_code === "PH" ? "ALB" : isoCode.country_code
          ).map((item) => ({ name: item.name, postal_code: item.stateCode })),
        ]);
        setStates([]);
      } else {
        setStates([...countryStates]);
      }
      setSelectedCountryCode(isoCode.country_code);
    } else {
      setCities([]);
    }
    //eslint-disable-next-line
  }, [selectedCountry]);

  useEffect(() => {
    const [countryObj, stateObj] = [
      countries.find((item) => item.name === selectedCountry),
      states.find((item) => item.name === selectedState),
    ];
    if (countryObj && stateObj) {
      const citiesList = City.getCitiesOfState(
        countryObj.country_code,
        countryObj.country_code === "PH" && stateObj.isoCode === "05"
          ? "ALB"
          : stateObj.isoCode
      ).map((item) => ({ name: item.name, postal_code: item.stateCode }));
      setCities([...citiesList]);
    }
    //eslint-disable-next-line
  }, [selectedState, states]);

  return {
    countries,
    cities,
    states,
    selectedCountry,
    selectedCountryCode,
    selectedCity,
    selectedState,
    onCountryChange,
    onCityChange,
    onStateChange,
  };
};
