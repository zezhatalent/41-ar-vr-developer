import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed = 70, startDelay = 800) {
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOutput('');
    setDone(false);
    let i = 0;
    let interval: ReturnType<typeof setTimeout> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setOutput(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { output, done };
}
