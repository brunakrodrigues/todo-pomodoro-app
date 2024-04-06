import React from 'react';
import { Box, Image, Input, Button, Text } from '@chakra-ui/react';
import { FiPlusCircle } from 'react-icons/fi';
import { TaskCard } from '@/components/TaskCard';
import PomodoroTimer from '@/components/PomodoroTimer/Index';

export default function Home() {
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
        <Text as='b' fontSize={40}>
          to
          <Text as="span" color="#f34b58">do</Text>
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
        <Box
          padding="0 2rem"
          display="flex"
          flexDirection="column"
          gap="4rem"
        >
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            marginTop="-4rem"
            gap="0.625rem"
          >
            <Input
              placeholder="Adicione uma nova tarefa"
              background="#262626"
              color="#808080"
              padding="2rem"
              width="100%"
              height="3.375rem"
              fontSize="1rem"
              resize="none"
              border="none"
              borderRadius="8px"></Input>
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
              _hover={{ background: "#105176" }}
            >
              Criar
              <FiPlusCircle size={20} />
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2rem">
          <Box>
            <Box display="flex" justifyContent="space-between" p="0 2rem" mb="1rem">
              <Text color="#4ea8de">Tarefas criadas <Text as="span" color="white">0</Text></Text>
              <Text color="#43b678">Concluídas <Text as="span" color="white">2 de 5</Text></Text>
            </Box>
            <Box display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              color="#808080"
            >
              {/* <Image src="/todo.svg" alt="lista icone" w="3rem" h="3rem"/>
          <br/>
          <Text>Você ainda não tem tarefas cadastradas</Text>
          <br />
          <Text>Crie tarefas e organize seus itens a fazer</Text> */}
              <TaskCard />
            </Box>
          </Box>
          <PomodoroTimer />
        </Box>
      </Box>
    </Box>
  );
}
