/* eslint-disable no-unused-vars */
import { Box, Button, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { io } from 'src/config/sockets';
import { Data } from 'src/services/account/type';
import { DataActiveUser } from 'src/services/activeUsers/type';
import { Roles } from '../home';

type Props = {
  users: Data[];
  roomId: string | number;
  handleBack: () => void;
  handleStart: () => void;
  setMinuts: (v: string) => void;
  currentUser: DataActiveUser | undefined;
  isStart: boolean;
  minutes: string;
};

const StartGamePage: FC<Props> = ({
  users,
  roomId,
  handleBack,
  currentUser,
  isStart: isGlobalStart,
  handleStart,
  setMinuts,
  minutes,
}) => {
  const [timeBefore, setTimeBefore] = useState(4);
  const [isStart, setIsStart] = useState(false);

  const onRunTimer = () => {
    let i = 4;

    let id = setInterval(function () {
      i--;

      if (i === 0) {
        handleStart();
        setTimeBefore(i);

        clearInterval(id);
      } else {
        setTimeBefore(i);
      }
    }, 1000);
  };
  //   //   useEffect(() => {
  //   //     let i = 4;

  //   //     let id = setInterval(function () {
  //   //       i--;

  //   //       if (i === 0) {
  //   //         clearInterval(id);
  //   //       } else {
  //   //         setTimeBefore(i);
  //   //       }
  //   //     }, 1000);
  //   //     return () => {
  //   //       clearInterval(interval);
  //   //     };
  //   //   }, [isStart]);
  //   const [hasWindow, setHasWindow] = useState(false);
  //   useEffect(() => {
  //     if (typeof window !== 'undefined') {
  //       setHasWindow(true);
  //     }
  //   }, []);
  useEffect(() => {
    if (!isStart && !isGlobalStart) return;
    onRunTimer();
  }, [isStart, isGlobalStart]);

  return (
    <Box display={'flex'} w='full'>
      <Box display={'flex'} flexDirection='column' justifyContent='space-between' w='20%' h={'full'}>
        <Box>
          <Text fontWeight={'bold'}>Room: {roomId || ''}</Text>
          {users.length &&
            users.map(item => {
              return (
                <Box key={item.id} display='flex'>
                  <Text as='span' color={currentUser?.id === item.id ? 'green.500' : 'white'}>
                    {item.attributes.username}:
                  </Text>
                  <Text color={'GrayText'} ml='1'>
                    {item.attributes.userRoles === Roles.mainPlayer ? 'Объяснить' : 'Угадать'}
                  </Text>
                </Box>
              );
            })}
        </Box>
        <Stack display={'flex'} flexDir='column' spacing={'10'}>
          {currentUser?.attributes.userRoles === Roles.mainPlayer && (
            <Stack display={'flex'} flexDir='column' spacing={'4'}>
              <Text>Количество минут:</Text>
              <RadioGroup onChange={setMinuts} value={minutes.toString()}>
                <VStack direction='row'>
                  <Radio value='1'>1 минута</Radio>
                  <Radio value='2'>2 минуты</Radio>
                </VStack>
              </RadioGroup>
            </Stack>
          )}
          <Button variant={'secondary'} onClick={handleBack}>
            Выйти
          </Button>
        </Stack>
      </Box>
      <Box w='full' display={'flex'} justifyContent='center' alignItems={'center'}>
        {currentUser?.attributes.userRoles === Roles.mainPlayer ? (
          isStart ? (
            <Box
              display={'flex'}
              justifyContent='center'
              alignItems={'center'}
              h={'32'}
              width='32'
              borderRadius={'full'}
              bg={'green.400'}
            >
              <Text fontSize={'3xl'} fontWeight='bold'>
                {timeBefore}
              </Text>
            </Box>
          ) : (
            <Button
              h={'32'}
              width='32'
              borderRadius={'full'}
              bg={'green.400'}
              onClick={() => {
                setIsStart(true);

                io.emit('start', { roomId }, (error: any) => {
                  if (error) return;
                });
              }}
            >
              Начать раунд
            </Button>
          )
        ) : isGlobalStart ? (
          <Box
            display={'flex'}
            justifyContent='center'
            alignItems={'center'}
            h={'32'}
            width='32'
            borderRadius={'full'}
            bg={'green.400'}
          >
            <Text fontSize={'3xl'} fontWeight='bold'>
              {timeBefore}
            </Text>
          </Box>
        ) : (
          <Text fontSize={'3xl'} fontWeight='bold'>
            Ожидаем начала
          </Text>
        )}
      </Box>
      <Box>
        {/* <AudioPlayerControlSprite />
        <Audio src='./GoodDay.mp3' /> */}
        {/* <ReactAudioPlayer src={'./example.ogg'} controls /> */}
        {/* <audio controls src='./GoodDay.mp3'>
          <a href='./GoodDay.mp3'>Download audio</a>
        </audio> */}
        {/* {hasWindow && <ReactPlayer url='./GoodDay.mp3' controls played='0' pip={false} />} */}
      </Box>
    </Box>
  );
};

export default StartGamePage;
