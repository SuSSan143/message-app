import { useState, ChangeEvent } from "react";
import {useNavigate} from 'react-router-dom'
import { AxiosError } from "axios";

import {
  Box,
  chakra,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { isValidMotionProp, motion } from "framer-motion";
import { BsArrowRight, BsFillPersonCheckFill } from "react-icons/bs";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

import {
  flexMotion,
  iconOpacityMotion,
  inputContainerMotion,
  signInOpacityMotion,
} from "../../constants/signinPage";

import axios from "../../utils/axios/serverAxiosInstance";

const ChakraSignIn = chakra(motion(VStack), {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const toast = useToast();
  const navigate = useNavigate()

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
      const { data } = await axios.post(`/signin`, {
        username: userData.username,
        password: userData.password,
      });
      toast.closeAll();
      toast({
        title: "Success",
        description: "Please wait, we will log you in.",
        position: "top-left",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/${data.user}`)
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
      }
    }
    setIsLoading(false);
  };

  return (
    <ChakraSignIn
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={flexMotion}
      flex={1}
      bgColor="rgba(158,115,247,0.95)"
      alignItems="center"
      justifyContent="center"
      h="600px"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        as={motion.div}
        variants={iconOpacityMotion}
      >
        <BsFillPersonCheckFill size={40} color="white" />
        <Text as={motion.span} my="4" color="white" fontSize="2xl">
          SIGN IN
        </Text>
      </Box>
      <Box
        onSubmit={handleSubmit}
        autoComplete="off"
        as={motion.form}
        variants={signInOpacityMotion}
      >
        <Input
          mb="6"
          name="username"
          value={userData.username}
          onChange={handleUserInput}
          variant="flushed"
          placeholder="USERNAME"
          _placeholder={{ color: "white" }}
        />
        <Input
          mb="6"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleUserInput}
          variant="flushed"
          placeholder="PASSWORD"
          _placeholder={{ color: "white" }}
        />
        <HStack my="5" justifyContent="space-between" w="full">
          <HStack
            as={motion.div}
            variants={inputContainerMotion}
            justifyContent="space-between"
            spacing={6}
          >
            <IconButton
              backgroundColor="transparent"
              aria-label="Login using Facebook"
              icon={<FaFacebookF size={30} color="white" />}
            />
            <IconButton
              backgroundColor="transparent"
              aria-label="Login using Twitter"
              icon={<FaTwitter size={30} color="white" />}
            />
            <IconButton
              backgroundColor="transparent"
              aria-label="Login using Google"
              icon={<FaGoogle size={30} color="white" />}
            />
          </HStack>
          <IconButton
            isLoading={isLoading}
            disabled={isLoading}
            spinner={<Spinner />}
            variant="outline"
            _hover={{ bg: "rgba(158,115,247,0.95)", color: " white" }}
            type="submit"
            w="24"
            aria-label="Sign In"
            icon={<BsArrowRight size={30} color="white" />}
          />
        </HStack>
      </Box>
    </ChakraSignIn>
  );
};

export default SignIn;
