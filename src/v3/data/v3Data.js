import { allProjects, postgraduateProjects, undergraduateProjects } from '../../data/gallery';
import timeline, { honors, otherHonors, leadership } from '../../data/timeline';

export const V3_PROJECTS = allProjects.map((p) => {
  const isLatest = p.num === '000';
  const isPostgrad = postgraduateProjects.some((item) => item.num === p.num);

  const metaMap = {
    '000': {
      year: '2026',
      stage: 'FEATURED',
      stageGroup: 'postgrad',
      category: 'UX ARCHITECTURE · SERVICE',
      role: 'UX 主导 · 信息架构 · 情感化体验',
      summary: '打破宠物活体托运的资源盲盒与分离焦虑，重构航旅数字生命运输线。',
      accent: '#D6FF00',
    },
    '001': {
      year: '2023',
      stage: 'POSTGRAD',
      stageGroup: 'postgrad',
      category: 'SMART HARDWARE · HANSGROHE',
      role: '物理界面 & App 交互 · 3D 可视化',
      summary: '汉斯格雅合作适老化智能卫浴，以“月食”天体隐喻重塑半失能老人洗漱尊严。',
      accent: '#78E8FF',
    },
    '002': {
      year: '2025',
      stage: 'POSTGRAD',
      stageGroup: 'postgrad',
      category: 'AIGC · SERVICE SYSTEM',
      role: '独立全流程 · AIGC 赋能设计',
      summary: '优秀硕士毕业设计：融合 SD、Midjourney、Runway 的初老人群智慧养老服务系统。',
      accent: '#D6FF00',
    },
    '003': {
      year: '2023',
      stage: 'POSTGRAD',
      stageGroup: 'postgrad',
      category: 'PSS · ACCESSIBLE UX',
      role: '全链路交互 · UI 规范 · 2.5D 服务流',
      summary: '面向老龄化社区的无障碍出行就医服务闭环，从 PSS 系统架构到移动端落地。',
      accent: '#5CFFB1',
    },
    '004': {
      year: '2023',
      stage: 'POSTGRAD',
      stageGroup: 'postgrad',
      category: 'BRANDING · RURAL REVITALIZATION',
      role: '品牌体系 · 包装视觉 · 体验策展',
      summary: '枫泾古镇乡村振兴农产品文创品牌重塑，以在地文化叙事激活乡村体验经济。',
      accent: '#FFB84D',
    },
    '005': {
      year: '2024',
      stage: 'POSTGRAD',
      stageGroup: 'postgrad',
      category: 'UK-CHINA · WORKSHOP & FILM',
      role: '双语报告 · 视觉视频 · 工作坊策划',
      summary: '中英合作 AHRC SEED 种子基金智慧养老子项目，跨文化研究与 AI 概念共创。',
      accent: '#A99BFF',
    },
    '006': {
      year: '2021',
      stage: 'UNDERGRAD',
      stageGroup: 'undergrad',
      category: 'CULTURAL IP · PATENT',
      role: '省级大创负责人 · 外观专利 · 论文发表',
      summary: '凉山彝族非遗文创产品系统开发，获外观专利、期刊论文与多项设计大赛奖项。',
      accent: '#FF6B57',
    },
    '007': {
      year: '2021',
      stage: 'UNDERGRAD',
      stageGroup: 'undergrad',
      category: 'SPATIAL DESIGN',
      role: '空间叙事 · 动线规划 · 渲染表现',
      summary: '“巨人餐厅”主题沉浸式室内空间，通过尺度反差构建戏剧化餐饮体验。',
      accent: '#FFD166',
    },
    '008': {
      year: '2020',
      stage: 'UNDERGRAD',
      stageGroup: 'undergrad',
      category: 'FURNITURE · CRAFT',
      role: '材料实验 · 结构设计 · 实体打样',
      summary: '以四川本土筇竹为媒介的现代模块书架，探索传统竹艺的轻量化与结构张力。',
      accent: '#8CE99A',
    },
    '009': {
      year: '2020',
      stage: 'UNDERGRAD',
      stageGroup: 'undergrad',
      category: 'EMOTIONAL PRODUCT',
      role: '形态语义 · 软体工程 · CMF',
      summary: '探索触感与包裹感的情感化软体沙发，回应都市独居青年的心理疗愈需求。',
      accent: '#FF9EBB',
    },
    '010': {
      year: '2021',
      stage: 'UNDERGRAD',
      stageGroup: 'undergrad',
      category: 'CROSS-CULTURAL FURNITURE',
      role: '文化转译 · 系列家具架构',
      summary: '从长江到尼罗河：中埃文明符号的当代转译与系列化家居系统。',
      accent: '#74C0FC',
    },
  };

  const extra = metaMap[p.num] || {
    year: isPostgrad ? '2024' : '2021',
    stage: isLatest ? 'FEATURED' : isPostgrad ? 'POSTGRAD' : 'UNDERGRAD',
    stageGroup: isPostgrad || isLatest ? 'postgrad' : 'undergrad',
    category: 'DESIGN ARCHIVE',
    role: 'Design Practice',
    summary: p.desc,
    accent: '#D6FF00',
  };

  return { ...p, ...extra };
});

export const HERO_REEL = [
  {
    num: '00',
    title: '航旅纵横 · 宠物出行',
    tag: '2026 · UX ARCHITECTURE',
    img: '/images/projects/pet-travel/cover.webp',
    href: '/pettravel',
  },
  {
    num: '01',
    title: 'Eclipse · 汉斯格雅',
    tag: '2023 · SMART HARDWARE',
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
    tag: '2023 · ACCESSIBLE SERVICE',
    img: '/images/projects/vcrutch/cover.webp',
    href: '/vcrutch',
  },
];

export const KEYNOTE_PILLARS = [
  {
    id: '01',
    code: 'PRE-CHECK VISIBILITY',
    title: '前置运力感知',
    headline: '告别“填完表才告知无舱位”的资源盲盒',
    body: '重新梳理入口分流逻辑，构建状态感知型服务大厅。在用户进入冗长托运流程前，直观暴露各航班活体舱位“充足 / 紧张 / 满额”实时信号，将无效跳出率前置化解。',
    metric: '3 → 1 步',
    metricLabel: '舱位确认路径压缩',
  },
  {
    id: '02',
    code: 'STRUCTURED FORM UX',
    title: '结构化表单降噪',
    headline: '把晦涩航司条款转译为防错交互组件',
    body: '针对高门槛的活体检疫与航空箱规则，抛弃大段说明文案，拆解为“品种智能检索弹窗 + 体重/月龄联动校验滑块 + 证件图例对照”，让首次托运者零误填通过审核。',
    metric: '-62%',
    metricLabel: '规则阅读认知负荷',
  },
  {
    id: '03',
    code: 'EMOTIONAL TELEMETRY',
    title: '全链路飞行可视化',
    headline: '以实时数据与温情 IP 抚平分离焦虑',
    body: '将黑盒化的托运物流转化为可感知的生命追踪面板：整合安检入舱、货舱温压提示、飞行高度曲线与到达接领提醒，并融入专属宠物 IP 视觉，建立品牌信任基建。',
    metric: '100%',
    metricLabel: '核心节点状态透明化',
  },
];

export const CAPABILITY_TRACKS = [
  {
    label: '01 // EXPERIENCE ARCHITECTURE',
    direction: -1,
    speed: 36,
    items: [
      { name: 'Service Design (PSS)', note: '系统级服务蓝图' },
      { name: 'Information Architecture', note: '复杂链路重构' },
      { name: '2.5D Journey Mapping', note: '多触点流线可视化' },
      { name: 'Accessibility UX', note: '适老化与包容性体验' },
      { name: 'User Research & Persona', note: '田野调研与洞察提炼' },
      { name: 'Design System', note: '组件规范与跨端一致' },
    ],
  },
  {
    label: '02 // AI ENGINEERING & WORKFLOW',
    direction: 1,
    speed: 42,
    items: [
      { name: 'ComfyUI / Stable Diffusion', note: '可控生成节点工作流' },
      { name: 'LLM Agent & Vibe Coding', note: '人机协同设计工程' },
      { name: 'Midjourney Concepting', note: '高密度视觉概念探索' },
      { name: 'Seedance / Runway', note: 'AIGC 动态影像制作' },
      { name: 'Prompt Architecture', note: '结构化提示词系统' },
      { name: 'Interactive Prototyping', note: '可运行代码级原型' },
    ],
  },
  {
    label: '03 // VISUAL & SPATIAL CRAFT',
    direction: -1,
    speed: 32,
    items: [
      { name: 'Figma / UI Systems', note: '像素级界面交付' },
      { name: 'Rhino / 3Ds Max', note: '工业造型与空间建模' },
      { name: 'CGI & Motion Delivery', note: '产品级渲染与剪辑' },
      { name: 'Brand & Cultural IP', note: '品牌叙事与文创转译' },
      { name: 'Procreate Sketching', note: '手绘草图与推演' },
      { name: 'Portrait Photography', note: '光影构图与情绪捕捉' },
    ],
  },
];

export const FILMSTRIP_TOP = [
  { img: '/images/photography/photo_01.jpg', label: 'PORTRAIT · 01', category: 'PHOTOGRAPHY', href: '/photography' },
  { img: '/images/sketch-tiger.webp', label: 'COLORED PENCIL', category: 'SKETCHING', href: '/sketching' },
  { img: '/images/photography/ruo_01.jpg', label: 'LIGHT & SHADOW', category: 'PHOTOGRAPHY', href: '/photography' },
  { img: '/images/life-seaside.webp', label: 'SEASIDE HORIZON', category: 'LIFE', href: '/life' },
  { img: '/images/photography/photo_04.jpg', label: 'PORTRAIT · 04', category: 'PHOTOGRAPHY', href: '/photography' },
  { img: '/images/sketching/marker-1.jpg', label: 'MARKER STUDY', category: 'SKETCHING', href: '/sketching' },
  { img: '/images/photography/ruo_05.jpg', label: 'EMOTION FRAME', category: 'PHOTOGRAPHY', href: '/photography' },
];

export const FILMSTRIP_BOTTOM = [
  { img: '/images/life/wolf-alice.jpg', label: 'LIVE MUSIC', category: 'LIFE', href: '/life' },
  { img: '/images/photography/photo_06.jpg', label: 'PORTRAIT · 06', category: 'PHOTOGRAPHY', href: '/photography' },
  { img: '/images/sketching/marker-2.jpg', label: 'INDUSTRIAL MARKER', category: 'SKETCHING', href: '/sketching' },
  { img: '/images/photography/ruo_03.jpg', label: 'CINEMATIC TONE', category: 'PHOTOGRAPHY', href: '/photography' },
  { img: '/images/life/samoyed.jpg', label: 'DAILY WARMTH', category: 'LIFE', href: '/life' },
  { img: '/images/photography/photo_08.jpg', label: 'PORTRAIT · 08', category: 'PHOTOGRAPHY', href: '/photography' },
  { img: '/images/sketching/gouache.jpg', label: 'GOUACHE TEXTURE', category: 'SKETCHING', href: '/sketching' },
];

export { timeline, honors, otherHonors, leadership };
