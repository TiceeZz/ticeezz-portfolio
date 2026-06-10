import { createContext, useContext, useReducer, useCallback, useRef } from 'react';
import { sfx } from './sound';

const WMContext = createContext(null);

let uid = 1;

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      const { app, props } = action;
      // singleton apps: focus existing instance instead of opening a new one
      const existing = state.windows.find((w) => w.appId === app.id && !app.multi);
      if (existing) {
        return {
          ...state,
          topZ: state.topZ + 1,
          windows: state.windows.map((w) =>
            w.id === existing.id ? { ...w, minimized: false, z: state.topZ + 1 } : w
          ),
        };
      }
      const id = uid++;
      const offset = (state.windows.length % 6) * 28;
      const win = {
        id,
        appId: app.id,
        title: props?.title || app.title,
        icon: app.icon,
        accent: app.accent,
        props: props || {},
        x: (app.x ?? 120) + offset,
        y: (app.y ?? 80) + offset,
        w: app.w ?? 640,
        h: app.h ?? 480,
        minimized: false,
        maximized: false,
        z: state.topZ + 1,
      };
      return { ...state, topZ: state.topZ + 1, windows: [...state.windows, win] };
    }
    case 'CLOSE':
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) };
    case 'FOCUS': {
      const target = state.windows.find((w) => w.id === action.id);
      if (!target || target.z === state.topZ) return state;
      return {
        ...state,
        topZ: state.topZ + 1,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, z: state.topZ + 1 } : w)),
      };
    }
    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, minimized: true } : w)),
      };
    case 'RESTORE':
      return {
        ...state,
        topZ: state.topZ + 1,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: false, z: state.topZ + 1 } : w
        ),
      };
    case 'TOGGLE_MAX':
      return {
        ...state,
        topZ: state.topZ + 1,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, maximized: !w.maximized, z: state.topZ + 1 } : w
        ),
      };
    case 'MOVE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, x: action.x, y: action.y } : w
        ),
      };
    case 'RESIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, w: action.w, h: action.h } : w
        ),
      };
    case 'CLOSE_ALL':
      return { ...state, windows: [] };
    default:
      return state;
  }
}

export function WindowManagerProvider({ apps, children }) {
  const [state, dispatch] = useReducer(reducer, { windows: [], topZ: 10 });
  const appsRef = useRef(apps);
  appsRef.current = apps;

  const openApp = useCallback((appId, props) => {
    const app = appsRef.current.find((a) => a.id === appId);
    if (!app) return;
    sfx.open();
    dispatch({ type: 'OPEN', app, props });
  }, []);

  const closeWindow = useCallback((id) => {
    sfx.close();
    dispatch({ type: 'CLOSE', id });
  }, []);
  const focusWindow = useCallback((id) => dispatch({ type: 'FOCUS', id }), []);
  const minimizeWindow = useCallback((id) => {
    sfx.minimize();
    dispatch({ type: 'MINIMIZE', id });
  }, []);
  const restoreWindow = useCallback((id) => {
    sfx.open();
    dispatch({ type: 'RESTORE', id });
  }, []);
  const toggleMaximize = useCallback((id) => dispatch({ type: 'TOGGLE_MAX', id }), []);
  const moveWindow = useCallback((id, x, y) => dispatch({ type: 'MOVE', id, x, y }), []);
  const resizeWindow = useCallback((id, w, h) => dispatch({ type: 'RESIZE', id, w, h }), []);
  const closeAll = useCallback(() => dispatch({ type: 'CLOSE_ALL' }), []);

  const value = {
    apps,
    windows: state.windows,
    topZ: state.topZ,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    closeAll,
  };

  return <WMContext.Provider value={value}>{children}</WMContext.Provider>;
}

export function useWM() {
  return useContext(WMContext);
}
