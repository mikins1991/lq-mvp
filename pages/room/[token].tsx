import RoomPage from '../../src/components/room';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AccountService } from 'src/services/account/account.service';
import jwt from 'jsonwebtoken';
import { Data } from 'src/services/account/type';
import PageLayout from '@/components/page-layout';

const Room = () => {
  const router = useRouter();
  const SECRET = 'eeesddsd';
  const [done, setDone] = useState('');
  const [id, setId] = useState('');
  const [user, setUser] = useState<Data>({} as Data);
  const [roomId, setRoomId] = useState('');

  const token = router.query.token as string; // Getting the token from the URL

  const { data, refetch } = useQuery(['active accaunts', id], () => AccountService.getUserById(id), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (!data || !data.data.length) return;
    setUser(data.data[0]);
  }, [data]);

  useEffect(() => {
    if (!router.isReady) return; // Checking if the token has been fetched from the URL.
    try {
      const payload = jwt.verify(token, SECRET) as { room: string; id: string }; // Verifying the token using the secret
      setRoomId(payload.room);
      setId(payload.id);
      refetch();
      setDone('done'); // granting access to the chat page
    } catch (error) {
      // eslint-disable-next-line no-console
      router.push('/'); // redirecting the user to the home page if an error occured
    }
  }, [token, done]);

  return (
    <PageLayout>
      <RoomPage user={user} router={router} roomId={roomId} />
    </PageLayout>
  );
};

export default Room;
