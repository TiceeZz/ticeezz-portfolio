import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { FIGMA_SCREENS, SCENES } from './petFigmaData';
import './petTravelProto.css';

export default function PetTravelPrototype() {
  const [screenId, setScreenId] = useState('splash');
  const [showHotspots, setShowHotspots] = useState(false);
  const [flashHints, setFlashHints] = useState(false);
  const [toast, setToast] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const flashTimerRef = useRef(null);
  const toastTimerRef = useRef(null);
  const wheelLockRef = useRef(0);

  const current = FIGMA_SCREENS[screenId] || FIGMA_SCREENS.splash;
  const activeScene = useMemo(
    () => SCENES.find((s) => s.id === current.sceneKey) || SCENES[0],
    [current.sceneKey]
  );

  // Preload all 1:1 Figma screens quietly so transitions are instantaneous (0ms flicker)
  useEffect(() => {
    Object.values(FIGMA_SCREENS).forEach((s) => {
      const img = new Image();
      img.src = s.img;
    });
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = useCallback((msg) => {
    if (!msg) return;
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const goTo = useCallback((nextId, toastMsg) => {
    if (!nextId || !FIGMA_SCREENS[nextId]) return;
    if (nextId !== screenId) {
      setScreenId(nextId);
      setAnimKey((k) => k + 1);
    }
    if (toastMsg) showToast(toastMsg);
  }, [screenId, showToast]);

  // Figma Prototype signature behavior: clicking empty canvas flashes all interactive hotspots briefly
  const handleCanvasMiss = useCallback(() => {
    if (current.hotspots?.length === 1 && current.hotspots[0].w === 100) {
      goTo(current.hotspots[0].to, current.hotspots[0].toast);
      return;
    }
    setFlashHints(true);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setFlashHints(false), 700);
  }, [current, goTo]);

  // Natural mouse-wheel scrolling between top & bottom halves of long Figma pages (Detail / Form)
  const handlePhoneWheel = useCallback((e) => {
    const now = Date.now();
    if (now - wheelLockRef.current < 420) return;
    if (e.deltaY > 24 && current.scrollDownTo) {
      e.preventDefault();
      wheelLockRef.current = now;
      goTo(current.scrollDownTo);
    } else if (e.deltaY < -24 && current.scrollUpTo) {
      e.preventDefault();
      wheelLockRef.current = now;
      goTo(current.scrollUpTo);
    }
  }, [current, goTo]);

  const handleNextScene = () => {
    const idx = SCENES.findIndex((s) => s.id === activeScene.id);
    const next = SCENES[(idx + 1) % SCENES.length];
    goTo(next.targetScreen);
  };

  return (
    <div className="ptp-stage">
      {/* ════════════ LEFT: 1:1 RETINA FIGMA IPHONE 15 PRO PLAYER ════════════ */}
      <div className="ptp-phone-col">
        <div
          className="ptp-chassis"
          role="region"
          aria-label="航旅纵横宠物出行 1:1 Figma 可交互演示原型"
          onWheel={handlePhoneWheel}
        >
          <div className="ptp-screen ptp-figma-screen" onClick={handleCanvasMiss}>
            {toast && <div className="ptp-toast">{toast}</div>}

            <div
              key={`${screenId}-${animKey}`}
              className={`ptp-figma-frame is-${current.transition || 'fade'}`}
            >
              <img
                src={current.img}
                alt={current.alt}
                className="ptp-figma-img"
                draggable={false}
              />

              {/* Precision Interactive Hotspots */}
              {current.hotspots.map((hs, idx) => (
                <button
                  key={`${screenId}-hs-${idx}`}
                  type="button"
                  aria-label={hs.label}
                  title={hs.label}
                  className={`ptp-hotspot${
                    (showHotspots || flashHints) && !hs.silentHint ? ' is-hinted' : ''
                  }`}
                  style={{
                    left: `${hs.x}%`,
                    top: `${hs.y}%`,
                    width: `${hs.w}%`,
                    height: `${hs.h}%`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(hs.to, hs.toast);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Subtle bottom toolbar directly under iPhone */}
        <div className="ptp-phone-toolbar">
          <button
            type="button"
            className={`ptp-tool-pill${showHotspots ? ' is-on' : ''}`}
            onClick={() => setShowHotspots((v) => !v)}
          >
            <span className="ptp-tool-dot" />
            {showHotspots ? '隐藏热区提示' : '显示可点热区'}
          </button>
          <button
            type="button"
            className="ptp-tool-pill"
            onClick={() => goTo('splash', '已回到开屏起点')}
          >
            回到开屏 ↺
          </button>
        </div>
      </div>

      {/* ════════════ RIGHT: UX STORYBOARD & DIRECTOR PANEL ════════════ */}
      <aside className="ptp-director">
        <div className="ptp-dir-card">
          <div className="ptp-dir-kicker">
            <span className="ptp-dir-step">SCREEN {activeScene.step}</span>
            <span className="ptp-dir-tag">{activeScene.tag}</span>
          </div>
          <h2 className="ptp-dir-title">{activeScene.title}</h2>
          <p className="ptp-dir-insight">{activeScene.insight}</p>
          <div className="ptp-dir-tip">{activeScene.tip}</div>

          {/* Contextual State Switchers Matching Exact Figma Artboards */}
          <div className="ptp-dir-actions">
            {current.sceneKey === 'random' && (
              <>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'randomEmpty' ? ' is-primary' : ''}`}
                  onClick={() => goTo('randomEmpty')}
                >
                  态 1：无票空态
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'randomOk' ? ' is-primary' : ''}`}
                  onClick={() => goTo('randomOk')}
                >
                  态 2：名额充足
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'randomFull' ? ' is-primary' : ''}`}
                  onClick={() => goTo('randomFull')}
                >
                  态 3：名额已满兜底
                </button>
              </>
            )}

            {current.sceneKey === 'detail' && (
              <>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'detailTop' ? ' is-primary' : ''}`}
                  onClick={() => goTo('detailTop')}
                >
                  上半屏：权益图解
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'detailBottom' ? ' is-primary' : ''}`}
                  onClick={() => goTo('detailBottom')}
                >
                  下半屏：明细与禁飞限制
                </button>
              </>
            )}

            {current.sceneKey === 'form' && (
              <>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'formTop' ? ' is-primary' : ''}`}
                  onClick={() => goTo('formTop')}
                >
                  基础信息
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'formBreed' ? ' is-primary' : ''}`}
                  onClick={() => goTo('formBreed')}
                >
                  品种弹窗
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'formAge' ? ' is-primary' : ''}`}
                  onClick={() => goTo('formAge')}
                >
                  年龄弹窗
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'formAddr' ? ' is-primary' : ''}`}
                  onClick={() => goTo('formAddr')}
                >
                  地址弹窗
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'formBottomErr' ? ' is-primary' : ''}`}
                  onClick={() => goTo('formBottomErr')}
                >
                  缺漏拦截态
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'formBottomOk' ? ' is-primary' : ''}`}
                  onClick={() => goTo('formBottomOk')}
                >
                  可提交态
                </button>
              </>
            )}

            {current.sceneKey === 'success' && (
              <>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'success' ? ' is-primary' : ''}`}
                  onClick={() => goTo('success')}
                >
                  订单提交成功
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'ordersEmpty' ? ' is-primary' : ''}`}
                  onClick={() => goTo('ordersEmpty')}
                >
                  我的订单 · 空态
                </button>
              </>
            )}

            {current.sceneKey === 'tracking' && (
              <>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'trackingFly' ? ' is-primary' : ''}`}
                  onClick={() => goTo('trackingFly')}
                >
                  运输中
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'trackingPrice' ? ' is-primary' : ''}`}
                  onClick={() => goTo('trackingPrice')}
                >
                  价格明细抽屉
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'trackingTimeline' ? ' is-primary' : ''}`}
                  onClick={() => goTo('trackingTimeline')}
                >
                  全流程时间轴
                </button>
                <button
                  type="button"
                  className={`ptp-dir-btn${screenId === 'trackingArrived' ? ' is-primary' : ''}`}
                  onClick={() => goTo('trackingArrived')}
                >
                  已到达 · 落地页
                </button>
              </>
            )}

            {!['random', 'detail', 'form', 'success', 'tracking'].includes(current.sceneKey) && (
              <button
                type="button"
                className="ptp-dir-btn is-primary"
                onClick={handleNextScene}
              >
                下一步演示 →
              </button>
            )}
          </div>
        </div>

        {/* 10-Screen Quick-Jump Storyboard */}
        <div className="ptp-dir-card">
          <div className="ptp-storyboard-head">
            <span>QUICK JUMP · 10 CORE FLOWS (20 FIGMA SCREENS)</span>
            <span>点击直达关键节点</span>
          </div>
          <div className="ptp-scene-grid">
            {SCENES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`ptp-scene-btn${activeScene.id === s.id ? ' is-active' : ''}`}
                onClick={() => goTo(s.targetScreen)}
              >
                <em>{s.step}</em>
                <strong>{s.short}</strong>
              </button>
            ))}
          </div>
        </div>

        <p className="ptp-dir-footnote">
          采用 1:1 Figma 原稿 2x Retina 画面与热区状态机构建，完整保留原稿字重、品牌标识、3D「云吞机长」主视觉与高德航线地图细节。点击手机画面任意非热区将短暂高亮可交互区域（类似 Figma Prototype 模式），在「方案详情」和「防错表单」支持直接滚轮上下切屏。
        </p>
      </aside>
    </div>
  );
}
