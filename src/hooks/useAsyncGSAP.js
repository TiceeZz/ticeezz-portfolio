import { useState, useEffect, useRef } from 'react';

export default function useAsyncGSAP(enabled = true) {
  const [gst, setGst] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    if (ref.current) {
      setGst(ref.current);
      return undefined;
    }
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
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return enabled ? gst : null;
}
