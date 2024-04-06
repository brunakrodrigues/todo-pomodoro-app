'use client'

import React, { useState, useEffect } from 'react';
import { Button, Text, VStack, Progress, HStack, Box, Image } from '@chakra-ui/react';
import { FaRegCirclePlay, FaRegCirclePause } from 'react-icons/fa6';
import { GrPowerReset } from 'react-icons/gr';

const PomodoroTimer = () => {
  // Tempos para diferentes intervalos em segundos
  const timeOptions = {
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    pomodoro: 25 * 60,
  };

  // Estado inicial do tempo, usando o tempo do Pomodoro
  const [selectedTime, setSelectedTime] = useState(timeOptions.pomodoro);
  const [secondsLeft, setSecondsLeft] = useState(selectedTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setSecondsLeft(selectedTime); // Atualiza o tempo quando o usuário seleciona uma nova duração
  }, [selectedTime]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      alert('Time’s up!');
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(selectedTime);
  };

  const selectTime = (time: any) => {
    setIsActive(false);
    setSelectedTime(time);
  };

  return (
    <Box background="#262626" margin="0 2rem" maxH="21rem" padding="1rem" w="50%" borderRadius="8px">
      <VStack spacing={20}>

        <HStack spacing={50}>
          <Button bg="#f34b58" border="none" p={6} borderRadius="5px" cursor="pointer" onClick={() => selectTime(timeOptions.pomodoro)}>
            Pomodoro
          </Button>
          <Button bg="#43b678" border="none" p={6} borderRadius="5px" cursor="pointer" onClick={() => selectTime(timeOptions.shortBreak)}>
            Short Break
          </Button>
          <Button bg="#4ea8de" border="none" p={6} borderRadius="5px" cursor="pointer" onClick={() => selectTime(timeOptions.longBreak)}>
            Long Break
          </Button>
        </HStack>
        <Image src="/tomato.svg" alt="pomodoro icon" w="70px"/>
        <Text fontSize="4rem">{formatTime()}</Text>
        <Progress
          value={(1 - secondsLeft / selectedTime) * 100}
          width="100%"
          size="lg"
          colorScheme="pink"
        />
        <HStack spacing={20}>
          <Button border="none" p={6} borderRadius="5px" cursor="pointer" onClick={startTimer} isDisabled={isActive}>
            <FaRegCirclePlay size={30} />
          </Button>
          <Button border="none" p={6} borderRadius="5px" cursor="pointer" onClick={pauseTimer} isDisabled={!isActive}>
            <FaRegCirclePause size={30} />
          </Button>
          <Button border="none" p={6} borderRadius="5px" cursor="pointer" onClick={resetTimer}>
            <GrPowerReset size={30} />
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default PomodoroTimer;
