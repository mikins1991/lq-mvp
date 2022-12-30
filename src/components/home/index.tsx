import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PinInput,
  PinInputField,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RoomService } from '../../services/room/room.service';
import { useAccounts } from './useAccounts';

type Props = {};

export enum Roles {
  'mainPlayer' = 'mainPlayer',
  'player' = 'player',
}

const HomePage = (props: Props) => {
  const [username, setName] = useState('');
  const [role, setRole] = useState('mainPlayer');
  const [roomCode, setCode] = useState('');

  const router = useRouter();
  const { onSubmit, onSubmitAddPlayer, isLoading, data, dataPlayer } = useAccounts();

  useEffect(() => {
    if (!data || !data?.attributes) return;

    router.push(`room/${data.attributes.token}`);
  }, [data]);

  useEffect(() => {
    if (!dataPlayer || !dataPlayer?.attributes) return;

    router.push(`room/${dataPlayer.attributes.token}`);
  }, [dataPlayer]);

  const {
    data: dataRoom,
    isLoading: isLoadingRoom,
    refetch,
  } = useQuery(['checkRoom', roomCode], () => RoomService.getRoomById(roomCode), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleConnect = () => {
    refetch();
    if (dataRoom && dataRoom.data.length) {
      const roomId = dataRoom.data[0].attributes.roomId;
      const id = uuidv4();
      let account = {
        id,
        room: roomId,
      };
      const SECRET = process.env.NEXT_PUBLIC_SECRET_JWT || 'eeesddsd'; //JWT secret
      const token = jwt.sign(account, SECRET); // Creates the Token

      const data = {
        data: {
          token,
          username,
          userId: id,
          roomId,
          userRoles: 'player',
        },
      };

      onSubmitAddPlayer(data);
      // onSocketConnect(username, roomId.toString());
    }
  };

  const handleNewGame = () => {
    const roomId = Math.trunc(Math.random() * 100000);
    const id = uuidv4();
    let account = {
      room: roomId,
      id,
    };
    const SECRET = process.env.SECRET_JWT || 'eeesddsd'; //JWT secret
    const token = jwt.sign(account, SECRET); // Creates the Token

    const data = {
      data: {
        token,
        username,
        userId: id,
        roomId,
        userRoles: role,
      },
    };

    onSubmit(data);
    // onSocketConnect(username, roomId.toString());
  };

  // const onSocketConnect = (username: string, room: string) => {
  //   if (username && room) {
  //     socket.emit('join', { username, room }, (error: any) => {
  //       if (error) {
  //         // setError(error)
  //         alert(error);
  //       } else {
  //         socket.on('welcome', data => {
  //           // props.onJoinSuccess(data);
  //           console.log('file: index.tsx:138  socket.on  welcome', data);
  //         });
  //       }
  //     });
  //   }
  // };

  return (
    <VStack spacing={'10'} background={'background'} p='4' w={['full', null, null, '3xl']}>
      <Heading>Начни игру</Heading>
      <Tabs>
        <TabList>
          <Tab>Новая игра</Tab>
          <Tab>Подключиться</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={'4'}>
              <FormControl isRequired>
                <FormLabel>Имя</FormLabel>
                <Input placeholder='name' value={username} onChange={i => setName(i.target.value)} />
              </FormControl>

              {/* <FormControl>
                <FormLabel>Роль</FormLabel>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        as={Button}
                        background={'background'}
                        borderColor='white'
                        borderWidth={'1px'}
                        isActive={isOpen}
                        w={'full'}
                        rightIcon={<ChevronDownIcon />}
                      >
                        {role === 'mainPlayer' ? 'Объяснять' : 'Понимать'}
                      </MenuButton>
                      <MenuList background={'black'}>
                        <MenuItem background={'black'} onClick={() => setRole(Roles.mainPlayer)}>
                          Объяснять
                        </MenuItem>
                        <MenuItem background={'black'} onClick={() => setRole(Roles.player)}>
                          Понимать
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </FormControl> */}
              <Button isLoading={isLoading} variant={'secondary'} onClick={handleNewGame}>
                Начать новую игру
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={'4'}>
              <FormControl isRequired>
                <FormLabel>Имя</FormLabel>
                <Input placeholder='name' value={username} onChange={i => setName(i.target.value)} />
              </FormControl>

              <HStack w={'full'}>
                <PinInput type='number' onChange={i => setCode(i)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <Button variant={'secondary'} onClick={handleConnect}>
                Подключиться
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default HomePage;