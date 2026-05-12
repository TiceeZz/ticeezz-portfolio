const marqueeCards = [
  {
    label: '01 / SKETCHING',
    title: 'Visual Thinking',
    desc: '灵感原点的纸笔记录，通过细腻的彩色铅笔刻画，探索自然形态下的张力与细节美学。',
    img: '/images/ScreenShot_2026-05-12_190035_310.jpg',
    href: '/sketching',
    className: 'cardSketch',
  },
  {
    label: '02 / LIFE FRAGMENTS',
    title: 'Daily Inspiration',
    desc: '设计源于生活，从日常体验与自然风光中提取系统的温度，平衡数字理性与真实感知。',
    img: '/images/微信图片_20251218150315_1_2.jpg',
    href: '/life',
    className: 'cardLife',
  },
  {
    label: '03 / PORTRAIT PHOTOGRAPHY',
    title: 'Capturing Emotion',
    desc: '在每一次快门中捕捉人物的真实情感、戏剧性光影与胶片颗粒质感。',
    img: '/images/image_e25190.jpg',
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
