import React from "react";

import { Avatar, Box, VStack, IconButton, Tooltip } from "@chakra-ui/react";

import axios, { AxiosError } from "axios";

import { BsPerson, BsSun, BsMoon } from "react-icons/bs";
import { BiMessageAltDetail } from "react-icons/bi";
import { AiOutlinePhone } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

const NavBar = () => {
  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete("/api/logout");
      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  return (
    <VStack h="full" w="full" bg="rgba(24,31,47,255)">
      <Box px="2" py="4" bg="rgba(15,29,40,235)">
        <Avatar
          size="md"
          name="Ryan Florence"
          src="https://bit.ly/ryan-florence"
        />
      </Box>
      <VStack
        justifyContent="space-between"
        py="3"
        alignItems="center"
        h="full"
      >
        <VStack spacing={3}>
          <Tooltip placement="right" label="Message">
            <IconButton
              _hover={{ bg: "rgba(15,29,40,235)" }}
              bg="transparent"
              icon={<BiMessageAltDetail size={23} color="white" />}
              aria-label="Message"
            />
          </Tooltip>
          <Tooltip placement="right" label="Call logs">
            <IconButton
              _hover={{ bg: "rgba(15,29,40,255)" }}
              bg="transparent"
              icon={<AiOutlinePhone size={23} color="white" />}
              aria-label="Call Logs"
            />
          </Tooltip>
          <Tooltip placement="right" label="Friends">
            <IconButton
              _hover={{ bg: "rgba(15,29,40,255)" }}
              bg="transparent"
              icon={<BsPerson size={23} color="white" />}
              aria-label="Friends"
            />
          </Tooltip>
          <Tooltip placement="right" label="Notification">
            <IconButton
              _hover={{ bg: "rgba(15,29,40,255)" }}
              bg="transparent"
              icon={<IoMdNotificationsOutline size={23} color="white" />}
              aria-label="Notification"
            />
          </Tooltip>
          <Tooltip placement="right" label="Toggle Theme">
            <IconButton
              _hover={{ bg: "rgba(15,29,40,255)" }}
              bg="transparent"
              icon={<BsPerson size={23} color="white" />}
              aria-label="Theme"
            />
          </Tooltip>
        </VStack>
        <VStack spacing={3}>
          <Tooltip placement="right" label="Settings">
            <IconButton
              _hover={{ bg: "rgba(15,29,40,255)" }}
              bg="transparent"
              icon={<IoSettingsOutline size={23} color="white" />}
              aria-label="Settings"
            />
          </Tooltip>
          <Tooltip placement="right" label="Logout">
            <IconButton
              onClick={handleLogout}
              _hover={{ bg: "rgba(15,29,40,255)" }}
              bg="transparent"
              icon={<IoLogOutOutline size={23} color="white" />}
              aria-label="Logout"
            />
          </Tooltip>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default NavBar;
