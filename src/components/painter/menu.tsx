/* eslint-disable no-unused-vars */
import { Box, Button, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = {
  setLineColor: (value: string) => void;
  setLineWidth: (value: any) => void;
  clearCanvas: () => void;
};
const Menu: FC<Props> = ({ setLineColor, setLineWidth, clearCanvas }) => {
  return (
    <Box
      width={'full'}
      h='30px'
      display={'flex'}
      justifyContent='space-evenly'
      alignItems='center'
      bg={'background'}
    >
      <label>Цвет</label>
      <input
        type='color'
        onChange={e => {
          setLineColor(e.target.value);
        }}
      />
      <label>Ширина кисти </label>
      <Slider
        aria-label='slider-ex-3'
        defaultValue={5}
        orientation='horizontal'
        minW='100'
        maxW={100}
        onChange={e => setLineWidth(e)}
        min={3}
        max={30}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Button h='18' color={'black'} onClick={clearCanvas}>
        Очистить
      </Button>
    </Box>
  );
};

export default Menu;
