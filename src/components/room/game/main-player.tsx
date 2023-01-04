import { Box, Button, Text, Textarea } from '@chakra-ui/react';
import React, { FC, useCallback, useState } from 'react';
import { QuestionData } from 'src/services/questions/type';

type Props = { question: QuestionData; timeBefore: number; nextRound: () => void };
const MainPlayer: FC<Props> = ({ question, timeBefore, nextRound }) => {
  const [isOpenAnswer, setOpenAnswer] = useState(false);

  const handleClick = useCallback(() => setOpenAnswer(true), []);

  return (
    <Box w='full'>
      <Box display={'flex'} alignItems='center' justifyContent={'space-evenly'}>
        {!!timeBefore && (
          <Text fontSize={'3xl'} fontWeight='bold' w={'20'}>
            {timeBefore}
          </Text>
        )}
        <Box>
          {!!question.id && (
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
              <Button variant={'secondary'} onClick={handleClick}>
                Показать ответ
              </Button>
            </Box>
          ))}
      </Box>
      <Box display={'flex'} h='full'>
        <Textarea h='80%' fontSize={'4xl'} />
        {/* <PainterApp /> */}
      </Box>
    </Box>
  );
};

export default MainPlayer;
