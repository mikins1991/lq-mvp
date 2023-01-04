import { Box, Text, Textarea } from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = { timeBefore: number };
const Player: FC<Props> = ({ timeBefore }) => {
  return (
    <Box w='full'>
      <Box display={'flex'} alignItems='center' justifyContent={'space-evenly'}>
        <Text fontSize={'3xl'} fontWeight='bold' w={'20'}>
          {timeBefore}
        </Text>
      </Box>
      <Box display={'flex'} h='full'>
        <Textarea h='80%' fontSize={'4xl'} />
        {/* <PainterApp /> */}
      </Box>
    </Box>
  );
};

export default Player;
