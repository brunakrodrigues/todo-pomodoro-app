"use client";

import { Box } from "@chakra-ui/react";
import Task from "./Task";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

export function TaskCard(task: Task) {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const { mutate: toggleTask } = useMutation({
    mutationFn: async (id: string) => {
      const token = await getAccessTokenSilently();
      return fetch(`http://localhost:8000/todo/${id}/toggle`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: async (id: string) => {
      const token = await getAccessTokenSilently();
      return fetch(`http://localhost:8000/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return (
    <Box w="100%" p="0 2rem">
      <Task {...task} toggleTask={toggleTask} deleteTask={deleteTask} />
    </Box>
  );
}
