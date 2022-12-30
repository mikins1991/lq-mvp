import { Box, Button, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import PainterApp from '@/components/painter/painter';

type Props = { timeBefore: number; nextRound: () => void };
const Player: FC<Props> = ({ timeBefore, nextRound }) => {
  return (
    <Box>
      <Box display={'flex'} alignItems='center' justifyContent={'space-evenly'}>
        <Text fontSize={'3xl'} fontWeight='bold' w={'20'}>
          {timeBefore}
        </Text>
        {timeBefore === 0 && (
          <Button variant={'outline'} onClick={nextRound}>
            Следующий раунд
          </Button>
        )}
      </Box>
      <Box display={'flex'}>
        <PainterApp />
      </Box>
    </Box>
  );
};

export default Player;
