import React, { useState } from "react";

const AuthSelector = ({ handleOptionChange, authTitle }) => {
  const [seletedAuth, setSeletedAuth] = useState(-1);

  const handleAuthChange = (e) => {
    setSeletedAuth(e.target.value);
    handleOptionChange(authTitle.indexOf(e.target.value) - 1);
  };
  return (
    <>
      <select value={seletedAuth} onChange={handleAuthChange}>
        {authTitle.map((auth, idx) => (
          <option key={idx} defaultValue={auth === authTitle[0]}>
            {auth}
          </option>
        ))}
      </select>
    </>
  );
};

export default React.memo(AuthSelector);
