import { useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useV3Theme from './useV3Theme';
import './v3.css';

const PHOTO_SERIES = [
  {
    id: 'ifexist',
    title: '假如存在',
    en: 'Experimental Visual Poetry',
    desc: '以实验性视觉语言探讨身体、光影、空间与情绪张力。',
    images: Array.from({ length: 9 }, (_, i) => `/images/photography/ruo_${String(i + 1).padStart(2, '0')}.jpg`),
  },
  {
    id: 'xiaohu',
    title: '小胡的写真',
    en: 'Natural Light Portraits',
    desc: '以自然光捕捉真实情绪，定格胶片颗粒与日常温度。',
    images: Array.from({ length: 8 }, (_, i) => `/images/photography/photo_${String(i + 1).padStart(2, '0')}.jpg`),
  },
];

const SKETCH_WORKS = [
  { src: '/images/sketching/colored-pencil.jpg', title: '彩铅写实', medium: 'COLORED PENCIL', desc: '细腻超写实彩铅技法，刻画自然形态下的细节张力。' },
  { src: '/images/sketching/marker-1.jpg', title: '马克笔表现 · 一', medium: 'MARKER STUDY', desc: '快速捕捉形体结构与空间关系的设计推演。' },
  { src: '/images/sketching/marker-2.jpg', title: '马克笔表现 · 二', medium: 'INDUSTRIAL SKETCH', desc: '以线条疏密与笔触方向建构产品体量感。' },
  { src: '/images/sketching/gouache.jpg', title: '水粉静物', medium: 'GOUACHE', desc: '在色彩层叠中探索光线与材质肌理的平衡。' },
];

const LIFE_CHAPTERS = [
  {
    num: '01',
    title: '狗狗伙伴',
    en: 'Canine Companions',
    desc: '我的德牧与偶遇的萨摩耶——它们教会我耐心与细腻观察。',
    images: [
      { src: '/images/life/border-collie.jpg', alt: '德牧' },
      { src: '/images/life/samoyed.jpg', alt: '萨摩耶' },
    ],
  },
  {
    num: '02',
    title: '演出现场',
    en: 'Live Music',
    desc: 'Katy Perry、Wolf Alice 现场声光张力，持续滋养我对节奏与氛围的感知。',
    images: [
      { src: '/images/life/wolf-alice.jpg', alt: 'Wolf Alice Live' },
      { src: '/images/life/katy-perry.jpg', alt: 'Katy Perry Live' },
    ],
  },
  {
    num: '03',
    title: 'COS 表达',
    en: 'Character & Craft',
    desc: '享受二次元文化中角色塑造与视觉演绎的创造力。',
    images: [
      { src: '/images/life/wuyang.jpg', alt: '无漾' },
      { src: '/images/life/cos-wuyang.jpg', alt: 'COS 无漾' },
    ],
  },
  {
    num: '04',
    title: '桌面玩伴',
    en: 'Collectibles',
    desc: '绝区零邦布、崩铁奇美拉、洛克王国——触手可及的日常灵感小物件。',
    images: [
      { src: '/images/life/bangboo.jpg', alt: '绝区零邦布' },
      { src: '/images/life/chimera.jpg', alt: '崩铁奇美拉' },
      { src: '/images/life/luoke.jpg', alt: '洛克王国' },
    ],
  },
];

const CATEGORY_TABS = [
  { id: 'photography', label: '人像摄影', en: 'Photography' },
  { id: 'sketching', label: '手绘草图', en: 'Sketching' },
  { id: 'life', label: '生活切片', en: 'Daily Life' },
];

export default function V3BeyondPage() {
  const { category = 'photography' } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useV3Theme();
  const [photoSeriesIdx, setPhotoSeriesIdx] = useState(0);
  const [lightbox, setLightbox] = useState(null); // { images: string[], index: number, title: string }

  const activeCat = CATEGORY_TABS.some((t) => t.id === category) ? category : 'photography';
  const currentMeta = CATEGORY_TABS.find((t) => t.id === activeCat);

  useDocumentTitle(`${currentMeta.label} — TiceeZz v3`, `TiceeZz 设计之外 · ${currentMeta.label}`);

  useLayoutEffect(() => {
    setLightbox(null);
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [activeCat]);

  const closeLb = useCallback(() => setLightbox(null), []);
  const prevLb = useCallback(
    () =>
      setLightbox((lb) =>
        lb ? { ...lb, index: lb.index > 0 ? lb.index - 1 : lb.images.length - 1 } : null
      ),
    []
  );
  const nextLb = useCallback(
    () =>
      setLightbox((lb) =>
        lb ? { ...lb, index: lb.index < lb.images.length - 1 ? lb.index + 1 : 0 } : null
      ),
    []
  );

  useEffect(() => {
    if (!lightbox) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') prevLb();
      if (e.key === 'ArrowRight') nextLb();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, closeLb, prevLb, nextLb]);

  return (
    <div className="v3-root" data-v3-theme={theme}>
      <header className="v3-header is-scrolled">
        <div className="v3-header__inner">
          <Link to="/v3" className="v3-work-back">
            <span>←</span>
            <span>返回首页</span>
          </Link>

          <div className="v3-beyond-nav" role="tablist" aria-label="设计之外分类">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeCat === tab.id}
                className={`v3-beyond-nav__btn${activeCat === tab.id ? ' is-active' : ''}`}
                onClick={() => navigate(`/v3/beyond/${tab.id}`)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="v3-header__right">
            <div className="v3-theme-switch" role="group" aria-label="切换主题">
              <button
                className={`v3-theme-btn${theme === 'light' ? ' is-active' : ''}`}
                onClick={() => setTheme('light')}
              >
                浅色
              </button>
              <button
                className={`v3-theme-btn${theme === 'dark' ? ' is-active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                深色
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="v3-work">
        <div className="v3-container v3-work__hero">
          <div className="v3-work__meta-bar">
            <span className="v3-kicker">BEYOND DESIGN / {currentMeta.en.toUpperCase()}</span>
            <span className="v3-mono-tag">TICEEZZ ARCHIVE</span>
          </div>

          <div className="v3-beyond-hero-row">
            <div>
              <h1 className="v3-work__title">{currentMeta.label}</h1>
              <div className="v3-work__en">{currentMeta.en}</div>
            </div>

            <div className="v3-beyond-mobile-tabs">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`v3-filter-tab${activeCat === tab.id ? ' is-active' : ''}`}
                  onClick={() => navigate(`/v3/beyond/${tab.id}`)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* PHOTOGRAPHY */}
          {activeCat === 'photography' && (
            <div className="v3-beyond-body">
              <div className="v3-photo-series-bar">
                {PHOTO_SERIES.map((ser, idx) => (
                  <button
                    key={ser.id}
                    className={`v3-filter-tab${photoSeriesIdx === idx ? ' is-active' : ''}`}
                    onClick={() => setPhotoSeriesIdx(idx)}
                  >
                    <span>{ser.title}</span>
                    <sup>{String(ser.images.length).padStart(2, '0')}</sup>
                  </button>
                ))}
                <p className="v3-photo-series-desc">{PHOTO_SERIES[photoSeriesIdx].desc}</p>
              </div>

              <div className="v3-work__gallery is-grid">
                {PHOTO_SERIES[photoSeriesIdx].images.map((src, i) => (
                  <button
                    key={src}
                    className="v3-work__slide"
                    onClick={() =>
                      setLightbox({
                        images: PHOTO_SERIES[photoSeriesIdx].images,
                        index: i,
                        title: PHOTO_SERIES[photoSeriesIdx].title,
                      })
                    }
                  >
                    <img src={src} alt={`${PHOTO_SERIES[photoSeriesIdx].title} ${i + 1}`} loading={i < 4 ? 'eager' : 'lazy'} />
                    <span className="v3-work__slide-idx">{String(i + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SKETCHING */}
          {activeCat === 'sketching' && (
            <div className="v3-beyond-body">
              <div className="v3-sketch-grid">
                {SKETCH_WORKS.map((w, i) => (
                  <article key={w.src} className="v3-sketch-card">
                    <button
                      className="v3-work__slide"
                      onClick={() =>
                        setLightbox({
                          images: SKETCH_WORKS.map((x) => x.src),
                          index: i,
                          title: w.title,
                        })
                      }
                    >
                      <img src={w.src} alt={w.title} loading={i < 2 ? 'eager' : 'lazy'} />
                    </button>
                    <div className="v3-sketch-card__meta">
                      <div>
                        <h3>{w.title}</h3>
                        <p>{w.desc}</p>
                      </div>
                      <span>{w.medium}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* LIFE */}
          {activeCat === 'life' && (
            <div className="v3-beyond-body v3-life-chapters">
              {LIFE_CHAPTERS.map((chap) => (
                <section key={chap.num} className="v3-life-chapter">
                  <div className="v3-life-chapter__head">
                    <div>
                      <span className="v3-kicker">{chap.num} / {chap.en.toUpperCase()}</span>
                      <h2>{chap.title}</h2>
                    </div>
                    <p>{chap.desc}</p>
                  </div>
                  <div className={`v3-life-grid cols-${chap.images.length}`}>
                    {chap.images.map((img, i) => (
                      <button
                        key={img.src}
                        className="v3-work__slide v3-life-slide"
                        onClick={() =>
                          setLightbox({
                            images: chap.images.map((x) => x.src),
                            index: i,
                            title: chap.title,
                          })
                        }
                      >
                        <img src={img.src} alt={img.alt} loading="lazy" />
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      {lightbox && (
        <div className="v3-lightbox" onClick={closeLb} role="dialog" aria-modal="true">
          <div className="v3-lightbox__top" onClick={(e) => e.stopPropagation()}>
            <span>
              {lightbox.title} · {String(lightbox.index + 1).padStart(2, '0')} / {String(lightbox.images.length).padStart(2, '0')}
            </span>
            <button onClick={closeLb} aria-label="关闭灯箱">✕</button>
          </div>
          <div className="v3-lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <button className="v3-lightbox__nav" onClick={prevLb} aria-label="上一张">←</button>
            <img src={lightbox.images[lightbox.index]} alt={lightbox.title} />
            <button className="v3-lightbox__nav" onClick={nextLb} aria-label="下一张">→</button>
          </div>
        </div>
      )}
    </div>
  );
}
