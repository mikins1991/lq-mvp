import PageLayout from '@/components/page-layout';
import { Box, Button, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { QuestionsService } from 'src/services/questions/questions.service';

const NewQuestion = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const data = {
    data: {
      question,
      answer,
      isPlayed: false,
    },
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => QuestionsService.createQuestion(data),
  });

  const onSave = () => {
    mutate();
  };

  return (
    <PageLayout>
      <VStack spacing={'10'} background={'background'} p='4' w={['full', null, null, '3xl']}>
        <Heading>Внеси вопрос и ответ</Heading>
        <Box display={'flex'} justifyContent='center' alignItems={'center'} h='full' w={'300px'}>
          <VStack spacing={'4'} w='full'>
            <FormControl isRequired>
              <FormLabel>Вопросик</FormLabel>
              <Input
                placeholder='Простой вопрос'
                value={question}
                onChange={i => setQuestion(i.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Ответик</FormLabel>
              <Input placeholder='Простой ответ' value={answer} onChange={i => setAnswer(i.target.value)} />
            </FormControl>
            <Button isLoading={isLoading} variant={'outline'} onClick={onSave}>
              Отправить
            </Button>
          </VStack>
        </Box>
      </VStack>
    </PageLayout>
  );
};

export default NewQuestion;
