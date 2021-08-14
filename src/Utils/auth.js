import React, { useEffect, useState } from "react";
import { LOGGEDIN_USER, ROUTES } from "./constants";
import { loadLocalStorage } from "./Storage";

const AuthorityControl = (Components, option, authLevel) => {
  const CheckAuthority = ({ history }) => {
    const [render, setRender] = useState(false);
    const { HOME, LOGIN } = ROUTES;
    const isLoggedIn = loadLocalStorage(LOGGEDIN_USER);

    const checkLoggedIn = (isLoggedIn, option) => {
      if (option === null) return;
      if (!isLoggedIn && option) {
        alert("로그인 해주세요.");
        return history.push(LOGIN);
      } else if (isLoggedIn && !option) {
        alert("이미 로그인 한 유저입니다.");
        return history.push(HOME);
      }
    };

    const checkAdmin = (isLoggedIn, authLevel) => {
      const { authority } = isLoggedIn;
      if (authLevel < authority) {
        alert("권한이 없습니다.");
        return history.push(HOME);
      }
    };

    useEffect(() => {
      if (!!isLoggedIn !== option) {
        checkLoggedIn(isLoggedIn, option);
      } else if (isLoggedIn) {
        checkAdmin(isLoggedIn, authLevel);
      }
      setRender(true);
    }, []);

    return render ? <Components /> : null;
  };
  return CheckAuthority;
};

export default AuthorityControl;
