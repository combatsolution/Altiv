import { useScroll } from 'framer-motion';
import { useState, useEffect, useMemo, useCallback } from 'react';

// ----------------------------------------------------------------------

export function useOffSetTop(top = 0, options) {
  const { scrollY } = useScroll(options);

  const [value, setValue] = useState(false);

  // const onOffSetTop = useCallback(() => {
  //   scrollY.on('change', (scrollHeight) => {
  //     if (scrollHeight > 10) {
  //       setValue(true);
  //     } else {
  //       setValue(false);
  //     }
  //   });
  // }, [scrollY, top]);

  const onOffSetTop = useCallback(() => {
  scrollY.on('change', (scrollHeight) => {
    setValue(scrollHeight > top);
  });
}, [scrollY, top]);

  useEffect(() => {
    onOffSetTop();
  }, [onOffSetTop]);

  const memoizedValue = useMemo(() => value, [value]);

  return memoizedValue;
}

// Usage
// const offset = useOffSetTop(100);

// Or
// const offset = useOffSetTop(100, {
//   container: ref,
// });
