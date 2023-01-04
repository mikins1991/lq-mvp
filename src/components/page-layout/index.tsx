import { Container, ContainerProps, VStack } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';

const variants: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: -40,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -0,
    y: 40,
    transition: { duration: 0.4, type: 'easeOut' },
  },
};

type PageProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const MotionContainer = motion<ContainerProps>(Container);

const titleDefault = 'Loud Question';
const descriptionDefault = 'Game';

const PageLayout = ({ title = titleDefault, description = descriptionDefault, children }: PageProps) => {
  return (
    <>
      <NextSeo
        title={title + ''}
        description={description}
        openGraph={{
          url: 'https://',
          title: title + '',
          description: description,
          locale: 'en_US',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: 'https://blum-technology-website.s3.eu-west-2.amazonaws.com/favicon.ico',
          },
        ]}
      />
      <MotionContainer
        display='flex'
        w='full'
        maxW='full'
        minH={['auto', '100vh']}
        px={[0]}
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={variants}
        centerContent
      >
        <VStack
          spacing={[8, null, null, null, 14]}
          px={[0, 0, null, null, null, 0]}
          py={[0, null, null, null, 14]}
          maxW='82rem'
          w='full'
        >
          {children}
        </VStack>
      </MotionContainer>
    </>
  );
};

export default PageLayout;
