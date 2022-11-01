import { ChangeEvent, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {
  Box,
  chakra,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { BsArrowRight, BsFillPersonPlusFill } from "react-icons/bs";
import { AxiosError } from "axios";

import axios from "../../utils/axios/serverAxiosInstance";
import {
  flexMotion,
  iconOpacityMotion,
  signUpOpacityMotion,
} from "../../constants/signupPage";

const ChakraSignUp = chakra(motion(VStack), {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    toast({
      title: "Please Wait...",
      description: "Processing your request",
      position: "top-right",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    try {
      await axios.post("/signup", {
        username: userData.username,
        password: userData.password,
      });
      toast.closeAll();
      toast({
        title: "Success",
        description: "Please wait, we will log you in.",
        position: "top-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      const { data } = await axios.post("/signin", {
        username: userData.username,
        password: userData.password,
      });
      navigate(`/${data.user}`)
    } catch (err) {
      if (err instanceof AxiosError) {
        const { error } = err.response?.data;
        toast.closeAll();
        toast({
          title: "Error",
          description: error,
          position: "top-right",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setIsLoading(false);
  };

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <ChakraSignUp
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={flexMotion}
      flex={1}
      bgColor="rgba(49,56,75,0.95)"
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
        <BsFillPersonPlusFill size={40} color="white" />
        <Text as={motion.span} my="4" color="white" fontSize="2xl">
          SIGN UP
        </Text>
      </Box>
      <Box
        onSubmit={handleSubmit}
        autoComplete="off"
        as={motion.form}
        variants={signUpOpacityMotion}
      >
        <Input
          mb="6"
          value={userData.username}
          onChange={handleUserInput}
          name="username"
          variant="flushed"
          placeholder="USERNAME"
          _placeholder={{ color: "white" }}
          color="white"
        />
        <Input
          mb="6"
          value={userData.password}
          onChange={handleUserInput}
          name="password"
          variant="flushed"
          type="password"
          placeholder="PASSWORD"
          _placeholder={{ color: "white" }}
          color="white"
        />
        <HStack my="5" justifyContent="flex-end" w="full">
          <IconButton
            isLoading={isLoading}
            disabled={isLoading}
            spinner={<Spinner />}
            variant="outline"
            type="submit"
            _hover={{ bg: "rgba(49,56,75,0.95)", color: "white" }}
            w="24"
            aria-label="Sign Up"
            icon={<BsArrowRight size={30} color="white" />}
          />
        </HStack>
      </Box>
    </ChakraSignUp>
  );
};

export default SignUp;
