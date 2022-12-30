import { useMutation } from '@tanstack/react-query';
import { AccountService } from '../../services/account/account.service';
import { RoomService } from '../../services/room/room.service';

export const useAccounts = () => {
  // const { data, isLoading } = useQuery(['accaunts'], () => AccountService.getAll(''));

  const { mutateAsync, data, isLoading } = useMutation(
    ['createAccaunt'],
    (dataA: any) => AccountService.createAccount(dataA),
    {
      async onSuccess(acc) {
        const { data } = acc;
        const dataRoom = {
          data: {
            token: data.attributes.token,
            roomId: data.attributes.roomId,
            user_ids: data.attributes.userId,
          },
        };
        await postRoom(dataRoom);
      },
    }
  );

  const {
    mutateAsync: addPlayer,
    data: dataPlayer,
    isLoading: isLoadingPlayer,
  } = useMutation(['createAccaunt'], (dataA: any) => AccountService.createAccount(dataA), {});

  const {
    mutateAsync: postRoom,
    data: dataRoom,
    isLoading: isLoadingRoom,
  } = useMutation(['createRoom'], (data: any) => RoomService.createRoom(data), {
    onSuccess() {},
  });

  const onSubmit = async (dataAcc: any) => {
    await mutateAsync(dataAcc);
  };
  const onSubmitAddPlayer = async (dataAcc: any) => {
    await addPlayer(dataAcc);
  };
  return {
    onSubmit,
    onSubmitAddPlayer,
    isLoading,
    data: data?.data,
    dataRoom,
    isLoadingRoom,
    dataPlayer: dataPlayer?.data,
    isLoadingPlayer,
  };
};
