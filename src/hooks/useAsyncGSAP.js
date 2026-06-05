import { useState, useEffect, useRef } from 'react';

export default function useAsyncGSAP() {
  const [gst, setGst] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      if (!cancelled) {
        ref.current = { gsap, ScrollTrigger };
        setGst(ref.current);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return gst;
}
