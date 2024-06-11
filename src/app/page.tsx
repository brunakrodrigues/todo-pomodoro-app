"use client";

import { Box, Image, Text } from "@chakra-ui/react";

import PomodoroTimer from "@/components/PomodoroTimer/Index";
import { TaskCard } from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { getAccessTokenSilently } = useAuth0();
  const { isLoading, data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      const response = await fetch("http://localhost:8000/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    },
  });

  if (isLoading) {
    return <></>;
  }

  const totalTasks = tasks.length;
  const completedTasks: number = tasks
    .map((task: Task): number => (task.completed ? 1 : 0))
    .reduce((prev: number, curr: number): number => prev + curr, 0);

  return (
    <Box bg="#1a1a1a">
      <Box
        bg="black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        padding="4.5rem 0"
      >
        <Image src="/target.svg" alt="logo" w={60} />
        <Text as="b" fontSize={40}>
          to
          <Text as="span" color="#f34b58">
            do
          </Text>
        </Text>
      </Box>

      <Box
        maxWidth="70rem"
        margin="2rem auto"
        padding="0 1rem"
        display="grid"
        gridTemplateColumns="1fr"
        gap="2rem"
        alignItems="flex-start"
      >
        <TaskForm />

        <Box display="flex" justifyContent="space-between" mt="2rem">
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              p="0 2rem"
              mb="1rem"
            >
              <Text color="#4ea8de" mr="6rem">
                Tarefas criadas{" "}
                <Text as="span" color="white">
                  {totalTasks}
                </Text>
              </Text>
              <Text color="#43b678">
                Concluídas{" "}
                <Text as="span" color="white">
                  {completedTasks} de {totalTasks}
                </Text>
              </Text>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              color="#808080"
            >
              {tasks.length ? (
                tasks.map((todo: Task) => <TaskCard key={todo.id} {...todo} />)
              ) : (
                <>
                  <Image src="/todo.svg" alt="lista ícone" w="3rem" h="3rem" />
                  <br />
                  <Text>Você ainda não tem tarefas cadastradas</Text>
                  <br />
                  <Text>Crie tarefas e organize seus itens a fazer</Text>
                </>
              )}
            </Box>
          </Box>
          <PomodoroTimer />
        </Box>
      </Box>
    </Box>
  );
}
