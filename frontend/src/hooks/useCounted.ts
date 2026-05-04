import { useState, useEffect, useRef } from 'react';

export const useCounted = (fetchFn: () => Promise<number>, duration = 1500) => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const hasAnimated = useRef(false);

  useEffect(() => {
    fetchFn()
      .then(target => {
        const start = 0;
        const startTime = performance.now();

        const step = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.floor(start + (target - start) * eased));

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
      })
      .finally(() => {
        setLoading(false);
        hasAnimated.current = true;
      });
  }, [fetchFn, duration]);

  return { value, loading };
};
