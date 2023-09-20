import React from 'react';
import Link from 'next/link';
import ThemeMode from '@/components/ThemeMode';
import { GITHUB_URL, TWITTER_URL } from '@/constant';
import GithubIcon from '@/icons/github.svg';
import RssIcon from '@/icons/rss.svg';
import ThemeIcon from '@/icons/theme.svg';
import TwitterIcon from '@/icons/twitter.svg';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface Props {
  active: string;
  setBackground: Function;
}

const NAV_LIST = [
  { name: 'home', path: '/' },
  { name: 'blog', path: '/blog' },
  { name: 'projects', path: '/projects' },
  { name: 'notes', path: '/notes' },
];

const TEXT_COLOR =
  'text-[#808080] hover:text-black dark:text-[#a1a1a1] dark:hover:!text-white';

const NAV_LINK = [
  {
    url: TWITTER_URL,
    Icon: TwitterIcon,
    className: 'hidden sm:flex',
  },
  {
    url: GITHUB_URL,
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
    <header className="t-0 l-0 fixed z-50 box-border flex h-[60px] w-full select-none items-center justify-between bg-[#ffffffb3] px-[30px] backdrop-blur dark:bg-[#141414b3]">
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
                    'text-[18px] capitalize no-underline',
                    TEXT_COLOR,
                    active === navItem.name && '!text-black dark:!text-white'
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
              className={clsx('ml-[30px] flex items-center', className)}
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
          <li className="ml-[30px] flex cursor-pointer items-center">
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
          <li className="ml-[30px] flex cursor-pointer items-center">
            <ThemeMode />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
