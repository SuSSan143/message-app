import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Helmet } from "react-helmet";

// import io from "socket.io-client";
// import { useDispatch } from "react-redux";

import { Flex, HStack, useToast } from "@chakra-ui/react";

import NavBar from "../Components/MainPage/NavBar";
import FriendsList from "../Components/MainPage/FriendsList";

import axios from "../utils/axios/serverAxiosInstance";
import { AxiosError } from "axios";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket", "polling", "flashsocket"],
// });

const UserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useParams();
  const toast = useToast();

  //Authenticating the user
  useEffect(() => {
    setIsLoading(true);
    toast({
      title: "Please Wait...",
      description: "Processing your request",
      position: "top-left",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    try {
      if (localStorage.getItem("token")) {
        axios
          .get("/authenticate-user")
          .then(({ data }) => {
            toast.closeAll();
            if (data) {
              return toast({
                title: "Success",
                description: `Welcome ${data.username}`,
                position: "top-left",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }
          })
          .finally(() => setIsLoading(false));
      } else {
        toast.closeAll();
        toast({
          title: "Error",
          description: `Unauthenticated`,
          position: "top-left",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return navigate("/");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const { error } = err.response?.data;
        toast.closeAll();
        toast({
          title: "Error",
          description: error,
          position: "top-left",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return navigate("/");
      }
    }
  }, []);

  //   const [isConnected, setIsConnected] = useState(socket.connected);

  //   useEffect(() => {
  //     socket.on("connect", () => {
  //       setIsConnected(true);
  //     });

  //     socket.on("disconnect", () => {
  //       setIsConnected(false);
  //     });

  //     return () => {
  //       socket.off("connect");
  //       socket.off("disconnect");
  //     };
  //   }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Welcome {user}</title>
      </Helmet>
      <HStack h="100vh" spacing={0}>
        <Flex alignItems="center" as="nav" h="full" maxW={16} w="full">
          <NavBar />
        </Flex>
        <Flex
          as="aside"
          h="full"
          maxW="sm"
          w="full"
          borderRightColor="gray.100"
          borderRightWidth={1}
        >
          <FriendsList />
        </Flex>
        <Flex as="main" flex={1} h="full" w="full">
          {/* {isConnected} */}
        </Flex>
      </HStack>
    </>
  );
};

export default UserPage;

// https://randomuser.me/api/?results=5/
