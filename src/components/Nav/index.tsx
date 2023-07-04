import React from 'react';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import clsx from 'clsx';
import GithubIcon from '@/icons/github.svg';
import TwitterIcon from '@/icons/twitter.svg';
import RssIcon from '@/icons/rss.svg';
import ThemeIcon from '@/icons/theme.svg';
import ThemeMode from '@/components/ThemeMode';
import 'react-tooltip/dist/react-tooltip.css';

interface Props {
  active: string;
  setBackground: Function;
}

const NAV_LIST = [
  { name: 'home', path: '/' },
  { name: 'blog', path: '/blog' },
  { name: 'projects', path: '/projects' },
];

const TEXT_COLOR =
  'text-[#808080] hover:text-black dark:text-[#a1a1a1] dark:hover:!text-white';

const NAV_LINK = [
  {
    url: 'https://twitter.com/imyuanx',
    Icon: TwitterIcon,
    className: 'hidden sm:flex',
  },
  {
    url: 'https://www.github.com/imyuanx',
    Icon: GithubIcon,
    className: 'hidden sm:flex',
  },
  {
    url: `/feed.xml`,
    Icon: RssIcon,
  },
];

function Nav(props: Props) {
  const { active, setBackground } = props;

  /**
   * @desc Change global background
   */
  const toggleBackground = () => {
    setBackground();
  };

  return (
    <header className="flex justify-between items-center fixed box-border bg-[#ffffffb3] w-full h-[60px] pl-[30px] pr-[30px] t-0 l-0 dark:bg-[#141414b3] z-10 backdrop-blur select-none">
      <div></div>
      <nav>
        <ul className="flex list-none pl-0">
          {NAV_LIST.map((navItem, index) => {
            return (
              <li
                className={clsx(index !== 0 && 'ml-[30px]')}
                key={navItem.path}
              >
                <Link
                  href={navItem.path}
                  className={clsx(
                    'text-[18px] no-underline capitalize',
                    TEXT_COLOR,
                    active === navItem.name && '!text-black dark:!text-white',
                  )}
                >
                  {navItem.name}
                </Link>
              </li>
            );
          })}
          {NAV_LINK.map(({ url, Icon, className }, index) => (
            <li
              key={url}
              className={clsx('flex items-center ml-[30px]', className)}
            >
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className={clsx('flex items-center', TEXT_COLOR)}
              >
                <Icon />
              </a>
            </li>
          ))}
          <li className="flex items-center ml-[30px] cursor-pointer">
            <a
              onClick={toggleBackground}
              className={clsx('flex items-center', TEXT_COLOR)}
              data-tooltip-id="tips"
              data-tooltip-content="Show / Hide Background"
            >
              <ThemeIcon />
              <Tooltip id="tips" className="rounded-[5px]" />
            </a>
          </li>
          <li className="flex items-center ml-[30px] cursor-pointer">
            <ThemeMode />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
