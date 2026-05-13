import { useEffect } from 'react';

export default function useDocumentTitle(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta ? meta.getAttribute('content') : '';

    document.title = title;
    if (meta && description) {
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}
