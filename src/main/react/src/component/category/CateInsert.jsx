import { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./CateInsert.scss";

const CateInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue("");
      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <form className="CateInsert" onSubmit={onSubmit}>
      <input
        placeholder="카테고리 목록 입력"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default CateInsert;
