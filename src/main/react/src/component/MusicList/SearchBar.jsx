import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";

const searchBarStyle = {
  position: "relative",
  display: "flex",
  marginTop: "2rem;",
};

const inputStyle = {
  // paddingLeft: "10px",
  marginBottom: "1rem",
  fontWeight: "bold",
  width: "25rem",
  height: "4rem",
  border: "0.2rem solid #ffcdd2",
  borderRadius: "0.5rem",
  outline: "none",
};

const buttonStyle = {
  position: "absolute",

  fontSize: "2rem",
};

interface SearchBarPropsType {
  placeholder: string;
  purpose: string;
}

function SearchBar(props: SearchBarPropsType) {
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(e.target.value);
  };

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!searchKeyWord) {
      setSearchParams({ keyword: searchKeyWord });
    } else {
      navigate(`${props.purpose === "lecture" ? "/lecture" : "/qa"}`);
    }
  };

  return (
    <form style={searchBarStyle} onSubmit={searchSubmitHandler}>
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
        onChange={onChangeHandler}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        <BsSearch />
      </button>
    </form>
  );
}

export default SearchBar;

