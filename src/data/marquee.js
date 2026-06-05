const marqueeCards = [
  {
    label: '01 / SKETCHING',
    title: 'Visual Thinking',
    desc: '灵感原点的纸笔记录，以细腻的彩色铅笔刻画，探索自然形态下的张力与细节美学。',
    img: '/images/sketch-tiger.webp',
    href: '/sketching',
    className: 'cardSketch',
  },
  {
    label: '02 / LIFE FRAGMENTS',
    title: 'Daily Inspiration',
    desc: '设计源于生活，从日常体验与自然风光中汲取灵感，为系统注入温度，平衡数字理性与真实感知。',
    img: '/images/life-seaside.webp',
    href: '/life',
    className: 'cardLife',
  },
  {
    label: '03 / PORTRAIT PHOTOGRAPHY',
    title: 'Capturing Emotion',
    desc: '在每一次快门中捕捉人物的真实情感、戏剧性光影与胶片颗粒质感，定格瞬间的情绪张力。',
    img: '/images/portrait-photography.jpg',
    href: '/photography',
    className: 'cardPhoto',
  },
];

export const labelColors = {
  cardSketch: 'var(--ray-red)',
  cardLife: 'var(--ray-yellow)',
  cardPhoto: 'var(--ray-cyan)',
};

export default marqueeCards;
