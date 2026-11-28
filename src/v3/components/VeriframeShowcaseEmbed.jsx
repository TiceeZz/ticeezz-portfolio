import { useCallback, useEffect, useRef, useState } from 'react';
import { LuExternalLink } from 'react-icons/lu';

const NATIVE_WIDTH = 1440;
const NATIVE_HEIGHT = 760;
const COMPACT_BREAKPOINT = 760;

const STEPS = [
  {
    step: 'blocked',
    num: '01',
    shortLabel: '违规拦截',
    title: '违规拦截与证据链',
    desc: '4 处禁用词划线拦截，「28天」可绑 SGS 报告放行',
    mobilePreview: '/images/projects/veriframe/page_010.jpg',
  },
  {
    step: 'diff',
    num: '02',
    shortLabel: '局部重绘',
    title: '异常背景局部重绘',
    desc: '仅重绘方案 C 背景，核验包装标签 0.00% 像素变化',
    mobilePreview: '/images/projects/veriframe/page_008.jpg',
  },
  {
    step: 'review',
    num: '03',
    shortLabel: '法务只读',
    title: '法务只读版本审阅',
    desc: '锁定内容指纹，法务只读核验声明与功效引证',
    mobilePreview: '/images/projects/veriframe/page_012.jpg',
  },
  {
    step: 'approved',
    num: '04',
    shortLabel: '签发导出',
    title: '签署放行与三尺寸导出',
    desc: '签发合规放行单，一次解锁 1:1 / 3:4 / 16:9 成片',
    mobilePreview: '/images/projects/veriframe/page_013.jpg',
  },
];

export default function VeriframeShowcaseEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState('blocked');
  const [boxWidth, setBoxWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : NATIVE_WIDTH
  );
  const [winHeight, setWinHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 900
  );
  const rootRef = useRef(null);
  const stepsRef = useRef(null);
  const iframeRef = useRef(null);
  const pendingPresetRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const updateDims = () => {
      setBoxWidth(el.clientWidth || window.innerWidth || NATIVE_WIDTH);
      setWinHeight(window.innerHeight || 900);
    };
    updateDims();
    const ro = new ResizeObserver(updateDims);
    ro.observe(el);
    window.addEventListener('resize', updateDims, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDims);
    };
  }, []);

  useEffect(() => {
    const onMessage = (event) => {
      const data = event.data;
      if (data && typeof data === 'object' && data.type === 'vf:preset-applied' && data.step) {
        setActiveStep(data.step);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const sendPresetToIframe = useCallback((stepKey) => {
    setActiveStep(stepKey);
    if (boxWidth < COMPACT_BREAKPOINT) {
      return;
    }
    const stepsEl = stepsRef.current;
    if (stepsEl) {
      const rect = stepsEl.getBoundingClientRect();
      if (rect.top < 110 || rect.top > 180) {
        window.scrollTo({
          top: Math.max(0, rect.top + window.scrollY - 122),
          behavior: 'smooth',
        });
      }
    }
    const win = iframeRef.current?.contentWindow;
    if (win) {
      win.postMessage({ type: 'vf:preset', step: stepKey }, '*');
    } else {
      pendingPresetRef.current = stepKey;
    }
  }, [boxWidth]);

  const handleIframeLoad = () => {
    setLoaded(true);
    if (pendingPresetRef.current && iframeRef.current?.contentWindow) {
      const stepKey = pendingPresetRef.current;
      pendingPresetRef.current = null;
      window.setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage({ type: 'vf:preset', step: stepKey }, '*');
      }, 180);
    }
  };

  const isCompactFallback = boxWidth < COMPACT_BREAKPOINT;
  // Fit sticky bars (~114px) + window chrome (44px) + breathing room (24px) cleanly inside 100vh
  const availHeight = Math.max(480, winHeight - 182);
  const scale = Math.min(1, boxWidth / NATIVE_WIDTH, availHeight / NATIVE_HEIGHT);
  const scaledWidth = Math.round(NATIVE_WIDTH * scale);
  const scaledHeight = Math.round(NATIVE_HEIGHT * scale);
  const currentStepMeta = STEPS.find((s) => s.step === activeStep) || STEPS[0];

  return (
    <div ref={rootRef} className="vf-embed" aria-label="Veriframe 澄矩 可操作的工作台">
      <div
        ref={stepsRef}
        className="vf-embed__window"
        style={!isCompactFallback ? { maxWidth: `${scaledWidth}px`, margin: '0 auto', width: '100%' } : undefined}
      >
        <div className="vf-embed__chrome">
          <div className="vf-embed__chrome-left" aria-hidden="true">
            <span className="vf-embed__dots">
              <i />
              <i />
              <i />
            </span>
            <span className="vf-embed__url">veriframe.workspace</span>
          </div>

          <div className="vf-embed__presets" role="tablist" aria-label="快速切换工作台预设状态">
            {STEPS.map(({ step, num, shortLabel }) => {
              const isActive = activeStep === step;
              return (
                <button
                  key={step}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`vf-embed__preset-pill${isActive ? ' is-active' : ''}`}
                  onClick={() => sendPresetToIframe(step)}
                >
                  <em>{num}</em>
                  <span>{shortLabel}</span>
                </button>
              );
            })}
          </div>

          <a
            href="/veriframe/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="vf-embed__chrome-open"
          >
            <span>全屏打开</span>
            <LuExternalLink aria-hidden="true" />
          </a>
        </div>

        {isCompactFallback ? (
          <div className="vf-embed__mobile">
            <img
              src={currentStepMeta.mobilePreview}
              alt={`Veriframe 澄矩 — ${currentStepMeta.title}`}
              loading="lazy"
            />
            <div className="vf-embed__mobile-bar">
              <p>
                <strong>{currentStepMeta.title}：</strong>
                {currentStepMeta.desc}。建议在桌面端宽屏窗口打开以体验完整三栏交互工作台。
              </p>
            </div>
          </div>
        ) : (
          <div
            className="vf-embed__viewport"
            style={{ height: `${scaledHeight}px` }}
            onScroll={(e) => {
              e.currentTarget.scrollTop = 0;
              e.currentTarget.scrollLeft = 0;
            }}
          >
            {!loaded && <div className="vf-embed__loading">正在载入工作台…</div>}
            <iframe
              ref={iframeRef}
              src="/veriframe/index.html?preset=blocked"
              title="Veriframe 澄矩 — 大健康品牌视觉生产与合规审核工作台"
              onLoad={handleIframeLoad}
              style={{
                width: `${NATIVE_WIDTH}px`,
                height: `${NATIVE_HEIGHT}px`,
                transform: `scale(${scale})`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
