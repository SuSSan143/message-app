import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet";

// import io from "socket.io-client";
// import { useDispatch } from "react-redux";

import { Flex, HStack, useToast } from "@chakra-ui/react";

import NavBar from "../Components/MainPage/NavBar";
import FriendsList from "../Components/MainPage/FriendsList";

import axios from "../utils/axios/serverAxiosInstance";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket", "polling", "flashsocket"],
// });

const UserPage = () => {
  const { user } = useParams();
  console.log(user);

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
        <title>Hello word</title>
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
