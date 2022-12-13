import React from "react";
import { BiSearch } from "react-icons/bi";

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchChat: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
      <BiSearch />
    </div>
  );
};
