import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundColor: 'white',
          backgroundImage: 'radial-gradient(#bfbfbf 0.5px,transparent 0%)',
          backgroundSize: '11px 11px',
          fontSize: 24,
          fontStyle: 'normal',
          color: 'black',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '60%',
          }}
        >
          <b style={{ fontSize: 40 }}>yuanx</b>
          <p>
            {/*
              // TODO: https://github.com/vercel/satori/issues/470
              Hey, my name is yuanx / 袁先, I'm a front-end engineer and amateur
            */}
            {
              "Hey, my name is yuanx, I'm a front-end engineer and amateur designer. I like open source and building anything."
            }
          </p>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
    },
  );
}
