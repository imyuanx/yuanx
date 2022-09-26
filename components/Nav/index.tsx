import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface Props {
  active: string;
}

const NAV_LIST = [
  { name: 'home', path: '/' },
  { name: 'blog', path: '/blog' },
];

function Nav(props: Props) {
  const { active } = props;
  return (
    <header className="flex justify-between items-center fixed box-border bg-white w-full h-60px pl-30px pr-30px t-0 l-0">
      <div></div>
      <nav>
        <ul className="flex list-none">
          {NAV_LIST.map((navItem) => {
            return (
              <li
                className={`ml-30px ${
                  active === navItem.name ? 'text-black' : ''
                }`}
                key={navItem.path}
              >
                <Link href={navItem.path}>
                  <a
                    className={`text-18px no-underline capitalize ${
                      active === navItem.name
                        ? 'hover:text-#000000'
                        : 'hover:text-#303030'
                    } ${
                      active === navItem.name ? 'text-black' : 'text-#808080'
                    }`}
                  >
                    {navItem.name}
                  </a>
                </Link>
              </li>
            );
          })}
          <li className="flex items-center ml-30px">
            <a
              href="https://twitter.com/yyuan_x"
              target="_blank"
              rel="noreferrer"
              className="text-black flex items-center"
            >
              <Icon icon="iconoir:twitter" className="text-18px" />
            </a>
          </li>
          <li className="flex items-center ml-30px">
            <a
              href="https://www.github.com/yunying1"
              target="_blank"
              rel="noreferrer"
              className="text-black flex items-center"
            >
              <Icon icon="iconoir:github" className="text-18px" />
            </a>
          </li>
          {/* // TODO: dark mode */}
          {/* <li className="flex items-center ml-30px">
            <Icon icon="ph:sun-dim" className="text-18px" />
          </li>
          <li className="flex items-center ml-30px">
            <Icon icon="carbon:moon" className="text-18px" />
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
