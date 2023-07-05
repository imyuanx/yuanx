import { NextRequest } from 'next/server';
import { ogData } from '@/config/og.mjs';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Make sure the font exists in the specified path:
const font = fetch(
  new URL('../../../public/font/SmileySans-Oblique-Reduce.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            filter: 'blur(88px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              opacity: 0.5,
              background:
                'linear-gradient(128deg, #0bd1ff 0%, #ffa3ff 50%, #ffd34e 100%)',
            }}
          ></div>
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
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
              <b style={{ fontSize: 40 }}>{ogData.name}</b>
            </div>
            <p
              style={{
                letterSpacing: 2,
                lineHeight: '32px',
              }}
            >
              {ogData.bio}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: 'SmileySans',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
