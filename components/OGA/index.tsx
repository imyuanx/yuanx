import {
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useState,
} from 'react';
import { Tooltip } from 'react-tooltip';
import OGCard from '../OGCard';

export interface Props {
  children: ReactNode;
  target: string;
}

function OGA({ children, target }: Props) {
  const [eleId, setEleId] = useState('');
  const [_children, setChildren] = useState(children);
  useEffect(() => {
    let eleId = (children as ReactElement)?.props?.id;
    if (!eleId) {
      eleId = Date.now().toString(36) + Math.random().toString(36).slice(2);
      children = cloneElement(children as ReactElement, {
        id: eleId,
      });
      setChildren(children);
    }
    if (eleId) setEleId(eleId);
  }, []);
  return (
    <>
      {_children}
      <Tooltip
        anchorSelect={`#${eleId}`}
        className="bg-[transparent] opacity-100 p-0 pointer-events-auto shadow-[0px_0px_10px_rgba(0,0,0,0.12)]"
      >
        <OGCard target={target} />
      </Tooltip>
    </>
  );
}

export default OGA;
