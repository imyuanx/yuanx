import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useDarkMode } from '../../common/useTheme';

interface Props {
  active: string;
}

const NAV_LIST = [
  { name: 'home', path: '/' },
  { name: 'blog', path: '/blog' },
];

const TEXT_COLOR = 'text-#808080 hover:text-black dark:text-#a1a1a1 dark:hover:!text-white';

function Nav(props: Props) {
  const { active } = props;
  const [isDark, toggleDark] = useDarkMode();

  return (
    <header className="flex justify-between items-center fixed box-border bg-white w-full h-60px pl-30px pr-30px t-0 l-0 dark:bg-#141414">
      <div></div>
      <nav>
        <ul className="flex list-none">
          {NAV_LIST.map((navItem) => {
            return (
              <li
                className={`ml-30px`}
                key={navItem.path}
              >
                <Link href={navItem.path}>
                  <a
                    className={`text-18px no-underline capitalize ${TEXT_COLOR} ${active === navItem.name && '!text-black dark:!text-white'}`}
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
              className={`flex items-center ${TEXT_COLOR}`}
            >
              <Icon icon="iconoir:twitter" className="text-18px" />
            </a>
          </li>
          <li className="flex items-center ml-30px">
            <a
              href="https://www.github.com/yunying1"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center ${TEXT_COLOR}`}
            >
              <Icon icon="iconoir:github" className="text-18px" />
            </a>
          </li>
          {
            !isDark ? <li className="flex items-center ml-30px cursor-pointer">
              <a
                onClick={() => toggleDark()}
                className={`flex items-center ${TEXT_COLOR}`}
              >
                <Icon icon="ph:sun-dim" className="text-18px" />
              </a>
            </li> : (<li className="flex items-center ml-30px cursor-pointer">
              <a
                onClick={() => toggleDark()}
                className={`flex items-center ${TEXT_COLOR}`}
              >
                <Icon icon="carbon:moon" className="text-18px" />
              </a>
            </li>)
          }
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
