// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

import { BiSearchAlt } from "react-icons/bi";

const scrollbar = {
  "&::-webkit-scrollbar": {
    width: "6px",
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
};

const FriendsList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(
        "https://random-data-api.com/api/v2/users?size=20"
      );
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <VStack w="full" spacing={0}>
      <Box w="full" py="7" px="4" bg="rgba(225,238,248,255)">
        <InputGroup w="full">
          <InputLeftAddon
            rounded="full"
            bg="white"
            children={<BiSearchAlt size={16} />}
          />
          <Input
            focusBorderColor="transparent"
            rounded="full"
            bg="white"
            w="full"
            type="text"
            placeholder="Search..."
          />
        </InputGroup>
      </Box>
      <VStack
        w="full"
        h="full"
        bg="rgba(235,244,251,255)"
        overflowY="scroll"
        sx={scrollbar}
      >
        {data.map((user) => (
          <Box key={user.uid} px="5" w="full" color="black">
            <HStack py="5" w="full" spacing={4}>
              <Avatar size="lg" src={user.avatar}>
                <AvatarBadge boxSize="0.9em" bg="green.500" />
              </Avatar>
              <VStack w="full" spacing={1}>
                <HStack
                  w="full"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontWeight="bold">{`${user.first_name} ${user.last_name}`}</Text>
                  <Text color="gray.500">12:10pm</Text>
                </HStack>
                <Box pr="3">
                  <Text noOfLines={1}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla vitae dolor eos consectetur omnis tempora possimus,
                    rerum consequuntur repellendus! Aspernatur quidem error
                    fugit iure impedit, distinctio similique! Eius, adipisci
                    optio.
                  </Text>
                </Box>
              </VStack>
            </HStack>
            <Box height="1px" bg="gray.400" />
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default FriendsList;
