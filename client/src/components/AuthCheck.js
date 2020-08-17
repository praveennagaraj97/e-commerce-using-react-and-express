import React, { useEffect } from "react";
// import axios from "axios";
import { useCookies } from "../utils/useCookies";

const { getCookie } = useCookies;

const AuthCheck = () => {
  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/api/v1/test")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //   });

    const cookie = getCookie("auth_token");

    console.log(cookie);
  }, []);

  return <h3 style={{ color: "white" }}>AUTH</h3>;
};

export default AuthCheck;
