"use client";

import { Box, Button, FormControl, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

export default function TaskForm() {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (text: string) => {
      const token = await getAccessTokenSilently();
      return fetch("http://localhost:8000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Box padding="0 2rem" display="flex" flexDirection="column" gap="4rem">
      <form
        method="POST"
        ref={formRef}
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const text = formData.get("text");
          mutate(text as string);
          formRef?.current?.reset();
        }}
      >
        <FormControl
          display="flex"
          justifyContent="center"
          width="100%"
          marginTop="-4rem"
          gap="0.625rem"
        >
          <Input
            name="text"
            placeholder="Adicione uma nova tarefa"
            background="#262626"
            color="#808080"
            padding="2rem"
            width="100%"
            height="3.375rem"
            fontSize="1rem"
            resize="none"
            border="none"
            borderRadius="8px"
          />
          <Button
            background="#1e6f9f"
            border="none"
            padding="2rem 1rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="0.875rem"
            color="#fff"
            fontWeight="700"
            gap="0.5rem"
            cursor="pointer"
            height="3.375rem"
            borderRadius="8px"
            transition="color 0.1s, background-color 0.1s"
            type="submit"
            _hover={{ background: "#105176" }}
          >
            Criar
            <FiPlusCircle size={20} />
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
