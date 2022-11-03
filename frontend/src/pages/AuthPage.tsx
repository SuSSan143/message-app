import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

import SideBar from "../Components/LoginPage/SideBar";
import SignIn from "../Components/LoginPage/SignIn";
import SignUp from "../Components/LoginPage/SignUp";

import axios from "../utils/axios/serverAxiosInstance";
import { AxiosError } from "axios";

//const URL = "https://randomuser.me/api/?results=20";

const AuthPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      try {
        axios.get("/authenticate-user").then(({ data }) => {
          if (data) {
            navigate(`/${data.username}`);
          }
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          const { error } = err.response?.data;
          console.log(error);
        }
      }
    }
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Authentication Page</title>
        <link rel="icon" href="/assets/login-favicon.png" />
      </Helmet>

      <Stack
        direction={["column", "column", "row"]}
        backgroundImage="url('/assets/login-bg.webp')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        spacing={0}
      >
        <SideBar />

        <AnimatePresence>
          <Stack direction={["column", "column", "row"]} spacing={0}>
            <SignIn key="signin" />

            <SignUp key="signup" />
          </Stack>
        </AnimatePresence>
      </Stack>
    </>
  );
};

export default AuthPage;
