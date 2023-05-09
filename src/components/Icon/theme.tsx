import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function ThemeIcon() {
  return (
    <>
      <svg
        className="outline-0"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-tooltip-id="tips"
        data-tooltip-content="Show / Hide Background"
      >
        <circle cx="5" cy="5" r="2.75" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="5" cy="13" r="2.75" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="13" cy="5" r="2.75" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="13" cy="13" r="2.75" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <Tooltip id="tips" className="rounded-[5px]" />
    </>
  );
}

export default ThemeIcon;
