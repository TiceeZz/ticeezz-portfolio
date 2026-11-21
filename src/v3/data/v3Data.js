import { allProjects, postgraduateProjects } from '../../data/gallery';
import timeline, { honors } from '../../data/timeline';

export const V3_PROJECTS = allProjects.map((p) => {
  const isLatest = p.num === '000';
  const isPostgrad = postgraduateProjects.some((item) => item.num === p.num);

  const metaMap = {
    '000': {
      year: '2026',
      stageGroup: 'postgrad',
      subtitle: '宠物出行全链路 UX 提案',
      accent: '#3B82FF',
    },
    '001': {
      year: '2023',
      stageGroup: 'postgrad',
      subtitle: '汉斯格雅 · 适老化智能卫浴',
      accent: '#67D5FF',
    },
    '002': {
      year: '2025',
      stageGroup: 'postgrad',
      subtitle: '优秀硕士毕设 · AIGC 智慧养老',
      accent: '#3B82FF',
    },
    '003': {
      year: '2023',
      stageGroup: 'postgrad',
      subtitle: '无障碍出行就医 PSS 服务系统',
      accent: '#67D5FF',
    },
    '004': {
      year: '2023',
      stageGroup: 'postgrad',
      subtitle: '枫泾乡村振兴 · 农产品文创品牌',
      accent: '#FFB24A',
    },
    '005': {
      year: '2024',
      stageGroup: 'postgrad',
      subtitle: '中英合作 AHRC 种子基金工作坊',
      accent: '#818CF8',
    },
    '006': {
      year: '2021',
      stageGroup: 'undergrad',
      subtitle: '凉山彝族非遗文创 · 专利成果',
      accent: '#FFB24A',
    },
    '007': {
      year: '2021',
      stageGroup: 'undergrad',
      subtitle: '巨人餐厅 · 沉浸式室内空间',
      accent: '#67D5FF',
    },
    '008': {
      year: '2020',
      stageGroup: 'undergrad',
      subtitle: '筇竹模块书架 · 竹材家具设计',
      accent: '#3B82FF',
    },
    '009': {
      year: '2020',
      stageGroup: 'undergrad',
      subtitle: '情感化软体沙发 · 形态语义',
      accent: '#818CF8',
    },
    '010': {
      year: '2021',
      stageGroup: 'undergrad',
      subtitle: '中埃文化转译 · 系列家具系统',
      accent: '#67D5FF',
    },
  };

  const extra = metaMap[p.num] || {
    year: isPostgrad ? '2024' : '2021',
    stageGroup: isPostgrad || isLatest ? 'postgrad' : 'undergrad',
    subtitle: p.desc,
    accent: '#3B82FF',
  };

  return { ...p, ...extra };
});

export const HERO_REEL = [
  {
    num: '00',
    title: '航旅纵横 · 宠物出行',
    tag: '2026 · UX',
    img: '/images/projects/pet-travel/cover.webp',
    href: '/pettravel',
  },
  {
    num: '01',
    title: 'Eclipse · 汉斯格雅',
    tag: '2023 · PRODUCT',
    img: '/images/projects/eclipse/cover.webp',
    href: '/eclipse',
  },
  {
    num: '02',
    title: '尊严的具现 · 毕设',
    tag: '2025 · AIGC × PSS',
    img: '/images/projects/graduation/cover.webp',
    href: '/graduation',
  },
  {
    num: '03',
    title: 'Easygoing · 医度',
    tag: '2023 · SERVICE',
    img: '/images/projects/vcrutch/cover.webp',
    href: '/vcrutch',
  },
];

export const KEYNOTE_PILLARS = [
  {
    id: '01',
    title: '前置运力感知',
    summary: '服务大厅实时透出航班活体舱位状态，告别填完表单才无舱位的盲盒体验。',
    metric: '3 → 1 步',
    metricLabel: '舱位确认路径',
  },
  {
    id: '02',
    title: '表单交互降噪',
    summary: '将晦涩航司规则转译为品种检索弹窗与校验滑块，大幅降低填报门槛与误填率。',
    metric: '-62%',
    metricLabel: '阅读认知负荷',
  },
  {
    id: '03',
    title: '飞行状态可视化',
    summary: '融合实时节点追踪与温情品牌 IP，让托运黑盒变为可感知的安心旅程。',
    metric: '100%',
    metricLabel: '核心节点透明',
  },
];

export const CAPABILITY_TRACKS = [
  {
    direction: -1,
    speed: 34,
    tone: 'cobalt',
    items: [
      'Service Design (PSS)',
      'UX Architecture',
      '2.5D Journey Mapping',
      'Accessibility UX',
      'Design Systems',
      'User Research',
    ],
  },
  {
    direction: 1,
    speed: 38,
    tone: 'sky',
    items: [
      'ComfyUI / Stable Diffusion',
      'LLM Agent & Vibe Coding',
      'Midjourney Concepting',
      'Runway / Seedance Video',
      'Prompt Engineering',
      'Interactive Prototyping',
    ],
  },
  {
    direction: -1,
    speed: 30,
    tone: 'amber',
    items: [
      'Figma & UI Craft',
      'Rhino / 3Ds Max',
      'CGI Visual Delivery',
      'Brand & Cultural IP',
      'Procreate Sketching',
      'Portrait Photography',
    ],
  },
];

export const FILMSTRIP_TOP = [
  { img: '/images/photography/photo_01.jpg', label: '人像摄影 · 01', href: '/photography' },
  { img: '/images/sketch-tiger.webp', label: '彩铅手绘', href: '/sketching' },
  { img: '/images/photography/ruo_01.jpg', label: '光影肖像', href: '/photography' },
  { img: '/images/life-seaside.webp', label: '海边切片', href: '/life' },
  { img: '/images/photography/photo_04.jpg', label: '人像摄影 · 04', href: '/photography' },
  { img: '/images/sketching/marker-1.jpg', label: '马克笔草图', href: '/sketching' },
  { img: '/images/photography/ruo_05.jpg', label: '情绪定格', href: '/photography' },
];

export const FILMSTRIP_BOTTOM = [
  { img: '/images/life/wolf-alice.jpg', label: '演出现场', href: '/life' },
  { img: '/images/photography/photo_06.jpg', label: '人像摄影 · 06', href: '/photography' },
  { img: '/images/sketching/marker-2.jpg', label: '工业手绘', href: '/sketching' },
  { img: '/images/photography/ruo_03.jpg', label: '胶片色调', href: '/photography' },
  { img: '/images/life/samoyed.jpg', label: '日常温度', href: '/life' },
  { img: '/images/photography/photo_08.jpg', label: '人像摄影 · 08', href: '/photography' },
  { img: '/images/sketching/gouache.jpg', label: '水粉肌理', href: '/sketching' },
];

export const COMPACT_TIMELINE = timeline.map((t) => ({
  year: t.year,
  tag: t.tag,
  title: t.title,
  desc: t.desc,
  keywords: t.keywords.slice(0, 4),
}));

export { honors };
