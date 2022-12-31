import React, { memo, useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Menu from './menu';

const PainterApp = () => {
  const canvasRef: { current: any } = useRef(null);
  const ctxRef: { current: any } = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState('black');

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current as any;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
    // setCtx(ctx);
  }, [lineColor, lineWidth]);

  // Function for starting the drawing
  const startDrawing = (e: any) => {
    if (!ctxRef.current) return;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e: any) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <Box
      w='full'
      h='full'
      display={'flex'}
      flexDirection='column'
      justifyContent={'flex-start'}
      alignItems='center'
      background={'white'}
    >
      <Box w='full' h='full' border='1pxsolid #808080' position={'relative'} background='white'>
        <Menu setLineColor={setLineColor} setLineWidth={setLineWidth} clearCanvas={clearCanvas} />
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={'770'}
          height={`300px`}
        />
      </Box>
    </Box>
  );
};

export default memo(PainterApp);
