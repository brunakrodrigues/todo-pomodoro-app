'use client'

import { useState } from "react"
import { Box, HStack, IconButton, Text } from "@chakra-ui/react"
import { FaRegCircle } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"

interface TaskType {
  id: number;
  text: string;
  isCompleted: boolean;
}

const tasks: TaskType[] = [
  { id: 1, text: "Primeira tarefa", isCompleted: false },
  { id: 2, text: "Segunda tarefa", isCompleted: false },
  { id: 3, text: "Segunda tarefa", isCompleted: false },
  { id: 4, text: "Segunda tarefa", isCompleted: false },
  { id: 5, text: "Segunda tarefa", isCompleted: false },
];

export function TaskCard() {
  const [tasksChecked, setTasksChecked] = useState<{ [key: number]: boolean }>({});

  const toggleChecked = (id: number) => {
    setTasksChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box w="100%" p="0 2rem">
      {tasks.map(task => (
        <Box
          key={task.id}
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
          <HStack spacing='24px' onClick={() => toggleChecked(task.id)} cursor="pointer">
            {
              tasksChecked[task.id]
                ?
                <FaCircleCheck color="#43b678" size={22} />
                :
                <FaRegCircle color="#4ea8de" size={22} />
            }
            <Text textDecoration={tasksChecked[task.id] ? "line-through" : "none"}>ldjowd fiew fiewfj ifj fi ow fofh wfowfwk fiw fwifjif wfj</Text>
          </HStack>
          <IconButton
            bg="none"
            border="none"
            cursor="pointer"
            aria-label="Delete task"
            icon={<MdDelete color="#f34b58" size={22} />}
            variant="ghost"
            onClick={() => console.log("Delete task", task.id)}
            colorScheme="red"
          />
        </Box>
      ))}
    </Box>
  )
}