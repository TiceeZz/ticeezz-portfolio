import { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext({ x: 0, y: 0 });

export function CursorProvider({ children }) {
  const [pos, setPos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });

  const handleMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <CursorContext.Provider value={pos}>
      <div onMouseMove={handleMove} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
