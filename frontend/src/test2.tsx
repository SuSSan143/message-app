import React, { useEffect, useState } from "react";

// import io from "socket.io-client";

import axios from "axios";

// import { useDispatch } from "react-redux";

import { Flex, HStack, useToast } from "@chakra-ui/react";

import NavBar from "./Components/MainPage/NavBar";
import FriendsList from "./Components/MainPage/FriendsList";
// import { setIsLoading } from "../redux/slices/authSlice";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket", "polling", "flashsocket"],
// });

const Index = () => {
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
  );
};

export default Index;

// https://randomuser.me/api/?results=5/
