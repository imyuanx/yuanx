import { useEffect, useState } from 'react';

function useResizeObserver(): [
  ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  sizes: { height?: number; width?: number },
] {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [sizes, setSizes] = useState<{ height?: number; width?: number }>({});
  useEffect(() => {
    if (!ref) return;
    const observer = new ResizeObserver(() => {
      setSizes({ height: ref.offsetHeight, width: ref.offsetWidth });
    });
    observer.observe(ref);
    return () => {
      observer.disconnect();
      setSizes({});
    };
  }, [ref]);
  return [setRef, sizes];
}

export { useResizeObserver };
