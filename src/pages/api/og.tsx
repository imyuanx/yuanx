import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  const origin = req.nextUrl.origin;

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
          // filter: 'invert(.92)', // TODO: dark mode
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 60,
              gap: 12,
            }}
          >
            <img
              src={`${origin}/avatar.jpg`}
              alt="avatar"
              style={{
                borderRadius: '50%',
                width: 60,
                height: 60,
                filter: 'invert(0)',
              }}
            />
            <b style={{ fontSize: 40 }}>yuanx</b>
          </div>
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
