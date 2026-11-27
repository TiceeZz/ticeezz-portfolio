import { useCallback, useEffect, useRef, useState } from 'react';
import { LuExternalLink } from 'react-icons/lu';
import { VfIcon, VfMark } from './VfIcon';

const NATIVE_WIDTH = 1440;
const NATIVE_HEIGHT = 740;
const COMPACT_BREAKPOINT = 820;
const ACCENT = 'var(--vf-accent, #1e4d45)';

const STEPS = [
  {
    step: 'blocked',
    icon: 'check',
    title: '违规拦截与证据链',
    desc: '4 处禁用词划线拦截，「28天」可绑 SGS 报告放行',
    mobilePreview: '/images/projects/veriframe/page_009.jpg',
  },
  {
    step: 'diff',
    icon: 'diff',
    title: '异常背景局部重绘',
    desc: '仅重绘方案 C 背景，核验包装标签 0.00% 像素变化',
    mobilePreview: '/images/projects/veriframe/page_007.jpg',
  },
  {
    step: 'review',
    icon: 'legal',
    title: '法务只读版本审阅',
    desc: '锁定内容指纹，法务只读核验声明与功效引证',
    mobilePreview: '/images/projects/veriframe/page_011.jpg',
  },
  {
    step: 'approved',
    icon: 'export',
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
  // Fit sticky bars (~122px) + 4-step strip (~76px) + gap (14px) + chrome (36px) + 10px bottom margin inside 100vh
  const availHeight = Math.max(420, winHeight - 258);
  const scale = Math.min(1, boxWidth / NATIVE_WIDTH, availHeight / NATIVE_HEIGHT);
  const scaledWidth = Math.round(NATIVE_WIDTH * scale);
  const scaledHeight = Math.round(NATIVE_HEIGHT * scale);
  const currentStepMeta = STEPS.find((s) => s.step === activeStep) || STEPS[0];

  return (
    <div ref={rootRef} className="vf-embed" aria-label="Veriframe 澄矩 可操作的工作台">
      <div className="vf-embed__head">
        <div className="vf-embed__title">
          <span className="vf-embed__live">
            <span className="ptp-live-dot" aria-hidden="true" />
            实时交互工作台 · 点击下方步骤可一键跳转状态
          </span>
          <strong>
            <VfMark size={26} ink="currentColor" accent={ACCENT} />
            四步跑通「像素锁定 → 证据链合规 → 法务签发」闭环
          </strong>
        </div>
        <a
          href="/veriframe/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="vf-embed__open"
        >
          <span>在新窗口全屏打开</span>
          <LuExternalLink aria-hidden="true" />
        </a>
      </div>

      <ol ref={stepsRef} className="vf-embed__steps" role="tablist" aria-label="快速切换工作台预设节点">
        {STEPS.map(({ step, icon, title, desc }, i) => {
          const isActive = activeStep === step;
          return (
            <li key={step} className={isActive ? 'is-active' : ''}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`vf-embed__step-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => sendPresetToIframe(step)}
              >
                <span className="vf-embed__step-icon">
                  <VfIcon name={icon} size={22} strokeWidth={1.6} accent={ACCENT} />
                </span>
                <span className="vf-embed__step-text">
                  <em>{String(i + 1).padStart(2, '0')}</em>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div
        className="vf-embed__window"
        style={!isCompactFallback ? { maxWidth: `${scaledWidth}px`, margin: '0 auto', width: '100%' } : undefined}
      >
        <div className="vf-embed__chrome" aria-hidden="true">
          <span className="vf-embed__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="vf-embed__url">veriframe.workspace · 清眸生物 / 2026 护眼焕新季</span>
          <span className="vf-embed__chrome-tag">支持画布就地改写与角色切换</span>
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
                {currentStepMeta.desc}。点击上方四步卡片可切换节点图解，或打开响应式独立工作台直接体验交互。
              </p>
              <div className="vf-embed__mobile-actions">
                <a
                  href={`/veriframe/index.html?preset=${activeStep}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vf-embed__mobile-btn is-primary"
                >
                  <span>打开独立工作台体验</span>
                  <LuExternalLink aria-hidden="true" />
                </a>
              </div>
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
