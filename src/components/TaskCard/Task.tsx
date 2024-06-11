"use client";

import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function Task({
  id,
  text,
  completed,
  toggleTask,
  deleteTask,
}: {
  id: number;
  text: string;
  completed: boolean;
  toggleTask: Function;
  deleteTask: Function;
}) {
  return (
    <Box
      key={id}
      mb="2rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="2rem"
      background="#262626"
      borderRadius="8px"
      width="100%"
      height="4.375rem"
      fontSize="1rem"
    >
      <HStack spacing="24px" onClick={() => toggleTask(id)} cursor="pointer">
        {completed ? (
          <FaCircleCheck color="#43b678" size={22} />
        ) : (
          <FaRegCircle color="#4ea8de" size={22} />
        )}
        <Text textDecoration={completed ? "line-through" : "none"}>{text}</Text>
      </HStack>
      <IconButton
        bg="none"
        border="none"
        cursor="pointer"
        aria-label="Delete task"
        icon={<MdDelete color="#f34b58" size={22} />}
        variant="ghost"
        onClick={() => deleteTask(id)}
        colorScheme="red"
      />
    </Box>
  );
}
