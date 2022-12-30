import { Box, Button, Text } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { QuestionData } from 'src/services/questions/type';
import PainterApp from '@/components/painter/painter';

type Props = { question: QuestionData; timeBefore: number; nextRound: () => void };
const MainPlayer: FC<Props> = ({ question, timeBefore, nextRound }) => {
  const [isOpenAnswer, setOpenAnswer] = useState(false);
  return (
    <Box>
      <Box display={'flex'} alignItems='center' justifyContent={'space-evenly'}>
        {!!timeBefore && (
          <Text fontSize={'3xl'} fontWeight='bold' w={'20'}>
            {timeBefore}
          </Text>
        )}
        <Box>
          {question.id && (
            <Text fontSize={'3xl'} fontWeight='bold'>
              {question.attributes.question}
            </Text>
          )}
        </Box>
        {timeBefore === 0 &&
          (isOpenAnswer ? (
            <Box display={'flex'} justifyContent='space-between' alignItems={'center'}>
              <Text color={'green.300'} mr={'2'}>
                {question.attributes.answer}{' '}
              </Text>
              <Button variant={'outline'} onClick={nextRound}>
                Следующий раунд
              </Button>
            </Box>
          ) : (
            <Box>
              <Button variant={'secondary'} onClick={() => setOpenAnswer(true)}>
                Показать ответ
              </Button>
            </Box>
          ))}
      </Box>
      <Box display={'flex'}>
        <PainterApp />
      </Box>
    </Box>
  );
};

export default MainPlayer;
