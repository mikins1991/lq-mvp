export const useRooms = () => {
  // const { data, isLoading } = useQuery(['checkRoom', roomId], () => RoomService.getRoomById(roomId));
  // const { data, isLoading, refetch } = useQuery(['accaunts'], (id: string) =>
  //   AccountService.getAllByRoomId(id)
  // );

  // const { mutateAsync, data, isLoading } = useMutation(
  //   ['update'],
  //   (id: string, data: any) => RoomService.updateRoom(id, data),
  //   {
  //     onSuccess() {
  //       // eslint-disable-next-line no-console
  //       console.log('saved');
  //     },
  //   }
  // );

  // const onSubmitPlayer = async (id: string, data: any) => {
  //   await mutateAsync(id, data);
  // };
  return { refetch, data };
};
