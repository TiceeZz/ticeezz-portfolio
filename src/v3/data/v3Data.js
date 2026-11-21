import { honors } from '../../data/timeline';
import { V3_CASE_STUDIES } from './v3CaseStudies';

export const V3_PROJECTS = V3_CASE_STUDIES.map((c) => ({
  num: c.num,
  slug: c.slug,
  title: c.title,
  enTitle: c.enTitle,
  subtitle: c.subtitle,
  year: c.year,
  stageGroup: Number(c.num) <= 6 ? 'postgrad' : 'undergrad',
  href: `/v3/work/${c.slug}`,
  displayImg: c.cover,
  isDevicePlate: Boolean(c.isDevicePlate),
}));

// Pure cinematic plates for Hero (flagship 2026 Umetrip project first, matching 01–04 order)
export const HERO_PLATES = [
  {
    num: '01',
    title: '航旅纵横 · 宠物出行',
    sub: '打破活体托运黑盒的 UX 提案 · 2026',
    img: '/images/projects/pet-travel/iphone-mockup.webp',
    isDevicePlate: true,
    href: '/v3/work/pettravel',
  },
  {
    num: '02',
    title: 'Eclipse · 汉斯格雅',
    sub: '适老化智能卫浴系统 · 2023',
    img: '/images/projects/eclipse/cover.webp',
    href: '/v3/work/eclipse',
  },
  {
    num: '03',
    title: '尊严的具现',
    sub: 'AIGC × 智慧养老硕士毕设 · 2025',
    img: '/images/projects/graduation/cover.webp',
    href: '/v3/work/graduation',
  },
  {
    num: '04',
    title: '医度 · Easygoing',
    sub: '无障碍出行就医 PSS 服务系统 · 2023',
    img: '/images/projects/vcrutch/cover.webp',
    href: '/v3/work/vcrutch',
  },
];

export const KEYNOTE_PILLARS = [
  {
    id: '01',
    title: '前置运力感知',
    summary: '在入口大厅直接呈现活体舱位实时状态，消除填完长表单才被拒的资源盲盒。',
    focusTag: '入口分流',
    stageImg: '/images/projects/pet-travel/page_013.jpg',
    stageKind: 'board',
    stageCaption: '01 / 随机飞舱位联动 · 三种运力状态前置透出',
  },
  {
    id: '02',
    title: '结构化表单降噪',
    summary: '将复杂航司条款转译为品种检索与联动校验组件，大幅降低首次托运的认知负担。',
    focusTag: '选择代替输入',
    stageImg: '/images/projects/pet-travel/page_017.jpg',
    stageKind: 'board',
    stageCaption: '02 / 表单防错设计 · 品种与月龄半屏校验弹窗',
  },
  {
    id: '03',
    title: '全链路飞行可视化',
    summary: '以节点追踪与温情品牌 IP 替代物流黑盒，建立可感知的数字生命运输信任。',
    focusTag: '透明追踪',
    stageImg: '/images/projects/pet-travel/page_020.jpg',
    stageKind: 'board',
    stageCaption: '03 / 黑盒可视化 · 实时飞行地图沙盘与节点追踪',
  },
];

export const DISCIPLINES = [
  {
    num: '01',
    title: '体验架构',
    items: '服务设计 PSS · 信息架构 · 2.5D 旅程映射 · 无障碍体验 · 设计系统',
  },
  {
    num: '02',
    title: 'AI 驱动工作流',
    items: 'ComfyUI / SD 节点流 · LLM Agent 协作 · Midjourney · Runway / Seedance',
  },
  {
    num: '03',
    title: '视觉与空间表达',
    items: 'Figma UI · Rhino / 3Ds Max · CGI 视觉渲染 · 品牌文创 · 手绘与摄影',
  },
];

// Curated edge-to-edge full-bleed photos & sketches (100% inside V3 /v3/beyond/:category)
export const CURATED_FILMSTRIP = [
  { img: '/images/life-seaside.webp', label: '海边切片', cat: 'LIFE', href: '/v3/beyond/life' },
  { img: '/images/photography/ruo_01.jpg', label: '光影肖像', cat: 'PHOTO', href: '/v3/beyond/photography' },
  { img: '/images/sketch-tiger.webp', label: '彩铅刻画', cat: 'SKETCH', href: '/v3/beyond/sketching' },
  { img: '/images/life/wolf-alice.jpg', label: '蓝调现场', cat: 'LIFE', href: '/v3/beyond/life' },
  { img: '/images/photography/ruo_03.jpg', label: '胶片人像', cat: 'PHOTO', href: '/v3/beyond/photography' },
  { img: '/images/sketching/marker-1.jpg', label: '马克笔推演', cat: 'SKETCH', href: '/v3/beyond/sketching' },
  { img: '/images/photography/ruo_05.jpg', label: '情绪定格', cat: 'PHOTO', href: '/v3/beyond/photography' },
  { img: '/images/life/samoyed.jpg', label: '日常温度', cat: 'LIFE', href: '/v3/beyond/life' },
  { img: '/images/sketching/marker-2.jpg', label: '产品草图', cat: 'SKETCH', href: '/v3/beyond/sketching' },
];

// Polished, publication-grade timeline (proper Chinese punctuation, no filler meta rows, linked directly to /v3/work/:slug)
export const COMPACT_TIMELINE = [
  {
    year: '2026',
    title: '航旅纵横 · 宠物出行全链路 UX 体验重构',
    desc: '重构活体托运服务大厅的运力前置感知、结构化防错表单与飞行状态全链路追踪面板，将高焦虑物流黑盒转化为有温度的数字化服务体验。',
    keywords: ['信息架构', '全链路 UX', '表单防错', '情感化设计'],
    caseHref: '/v3/work/pettravel',
  },
  {
    year: '2025',
    title: '优秀硕士毕业设计 · 尊严的具现',
    desc: '面向初老人群的智慧养老产品服务系统设计。独立完成服务蓝图、硬件交互与用户测试，系统融合 Stable Diffusion、Midjourney 与 Runway 赋能设计全流程。',
    keywords: ['智慧养老', 'AIGC 工作流', '服务触点设计'],
    caseHref: '/v3/work/graduation',
  },
  {
    year: '2024',
    title: '中英合作 AHRC SEED 种子基金项目',
    desc: '独立完成中英双语研究报告排版、主导项目影像剪辑与视觉制作，策划落地跨文化工作坊全流程并运用 AI 辅助产品概念共创。',
    keywords: ['跨国研究', '双语报告', '工作坊策划'],
    caseHref: '/v3/work/seed',
  },
  {
    year: '2024',
    title: '学术书籍编撰 & 设计自媒体矩阵（2W+ 读者）',
    desc: '参与编撰《AI 技术赋能居家养老服务实践》（独立撰写第四、九章）；运营个人成长与设计文献带读自媒体矩阵，全网累计 2W+ 粉丝。',
    keywords: ['学术出版', '内容影响力', '2W+ 粉丝'],
  },
  {
    year: '2023',
    title: '德国汉斯格雅合作 · Eclipse 智慧养老卫浴',
    desc: '从用户研究与服务蓝图出发，主导智能镜物理界面与移动端 App 交互设计，完成高精度 3D 产品渲染、场景可视化与概念影片制作。',
    keywords: ['产品交互', 'App UX', '3D 可视化'],
    caseHref: '/v3/work/eclipse',
  },
  {
    year: '2023',
    title: '「医度」无障碍出行就医 PSS 服务系统',
    desc: '面向老龄化社区的服务系统设计，主导移动端 App 全链路交互与 UI 规范制定，输出 2.5D 服务流线图呈现完整就医闭环。',
    keywords: ['PSS 服务设计', '全链路交互', 'UI 规范'],
    caseHref: '/v3/work/vcrutch',
  },
  {
    year: '2021',
    title: '省级大创项目负责人 · 彝族非遗文创研究与专利',
    desc: '专业唯一立项通过项目。发表学术论文 1 篇、获外观专利 1 项与多项国家级/省级设计大奖，统筹完成从田野调研到实体打样的完整交付。',
    keywords: ['省级立项', '学术论文', '外观专利'],
    caseHref: '/v3/work/yimoji',
  },
];

export { honors };
