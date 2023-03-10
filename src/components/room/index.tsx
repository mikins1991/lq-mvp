import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { NextRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { io } from 'src/config/sockets';
import { Data } from 'src/services/account/type';
import { ActiveUsersService } from 'src/services/activeUsers/activeUsers.service';
import { DataActiveUser } from 'src/services/activeUsers/type';
import { QuestionData } from 'src/services/questions/type';
import { Roles } from '../home';
import MainPlayer from './game/main-player';
import Player from './game/player';
import StartGamePage from './startGamePage';

type Props = {
  user: Data;
  roomId: string | number;
  router: NextRouter;
};

type PropsGames = {
  question: QuestionData | undefined;
  timeBefore: number;
  handleNextRound: () => void;
  currentUser: DataActiveUser | undefined;
};

const Game: FC<PropsGames> = ({ currentUser, question, timeBefore, handleNextRound }) => {
  if (!question) return <>No questions</>;

  return currentUser?.attributes.userRoles === Roles.mainPlayer ? (
    <MainPlayer question={question} timeBefore={timeBefore} nextRound={handleNextRound} />
  ) : (
    <Player timeBefore={timeBefore} />
  );
};

const RoomPage: FC<Props> = ({ user, roomId, router }) => {
  const username = user?.attributes?.username;
  const userRoles = user?.attributes?.userRoles;

  const [users, setUsers] = useState<Data[]>([]);
  const [currentUser, setCurrentUser] = useState<DataActiveUser>();
  const [question, setQuestion] = useState<QuestionData>();
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isGame, setIsGame] = useState<boolean>(false);
  const [minuts, setMinuts] = useState<string>('1');
  const [timeBefore, setTimeBefore] = useState(Number(minuts) * 60);

  const onRunTimer = () => {
    let i = Number(minuts) * 60;

    let id = setInterval(() => {
      i--;

      if (i === 0) {
        clearInterval(id);
        setTimeBefore(i);

        return;
      } else {
        setTimeBefore(i);
      }
    }, 1000);
  };
  const { data: activeUsers, refetch: refetchUsers } = useQuery(
    ['active-users', roomId],
    () => ActiveUsersService.getAUByRoomId(roomId),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const { refetch: deleteUser } = useQuery(
    ['delete-active-users', currentUser?.id],
    () => ActiveUsersService.deleteAUById(currentUser?.id || ''),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    if (!activeUsers || !activeUsers.data.length || !user || !user.attributes || !user.attributes.userId)
      return;
    setCurrentUser(activeUsers.data.find(item => item.attributes.userId === user.attributes.userId));
    setUsers(activeUsers.data);
  }, [activeUsers, user]);

  useEffect(() => {
    if (!user.id) return;
    io.on('disconnect', () => {
      // io.off();
      router.push('/');
      refetchUsers();
      // eslint-disable-next-line no-console
      console.log('disconnected');
    });

    io.emit('join', { username, roomId, userId: user.attributes.userId, userRoles }, (error: any) => {
      if (error) return alert(error);
    });

    io.on('welcome', async () => {
      refetchUsers();
    });
    io.on('roomData', async () => {
      refetchUsers();
    });

    io.on('allStart', async data => {
      if (!data && !data.isStart) return;
      setIsStart(data.isStart);
    });
    io.on('question', async data => {
      if (!data) return;
      setQuestion(data);
    });
  }, [user]);

  const handleBack = useCallback(() => {
    deleteUser()
      .then(async () => {
        io.emit('kick', { socketid: currentUser?.attributes.socketid }, (error: any) => {
          if (error) return alert(error);
        });
        router.push('/');
        // eslint-disable-next-line no-restricted-globals
      })
      .catch();
  }, []);

  const handleStart = useCallback(() => {
    setIsGame(true);
    onRunTimer();
  }, []);

  const handleNextRound = useCallback(() => {
    setIsGame(false);
  }, []);

  return (
    <Box background={'background'} display={'flex'} p='4' w={['full', null, null, '3xl']} h='100vh'>
      {isGame ? (
        <Game
          currentUser={currentUser}
          question={question}
          timeBefore={timeBefore}
          handleNextRound={handleNextRound}
        />
      ) : (
        <StartGamePage
          handleBack={handleBack}
          users={users}
          currentUser={currentUser}
          roomId={roomId}
          isStart={isStart}
          handleStart={handleStart}
          setMinuts={setMinuts}
          minutes={minuts}
        />
      )}
    </Box>
  );
};

export default RoomPage;
