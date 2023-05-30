import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function SystemIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        data-tooltip-id="system-theme-tips"
        data-tooltip-content="Follow System Theme"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm6 14h8"
        />
      </svg>
      <Tooltip id="system-theme-tips" className="rounded-[5px]" />
    </>
  );
}

export default SystemIcon;
