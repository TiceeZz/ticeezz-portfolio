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
    sub: '宠物航空托运全流程体验优化 · 2026',
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
    sub: '初老人群智慧养老硕士毕设 · 2025',
    img: '/images/projects/graduation/cover.webp',
    href: '/v3/work/graduation',
  },
  {
    num: '04',
    title: '医度 · Easygoing',
    sub: '社区无障碍出行就医服务设计 · 2023',
    img: '/images/projects/vcrutch/cover.webp',
    href: '/v3/work/vcrutch',
  },
];

export const KEYNOTE_PILLARS = [
  {
    id: '01',
    title: '舱位状态前置',
    summary: '在入口直接展示有氧舱余量，避免填完一长串资料才发现无法办理。',
    focusTag: '入口分流',
    stageImg: '/images/projects/pet-travel/page_013.jpg',
    stageKind: 'board',
    stageCaption: '01 / 随机飞舱位联动 · 提前透出三种运力状态',
  },
  {
    id: '02',
    title: '简化信息填报',
    summary: '把冗长的航司规则拆成品种检索与年龄校验，用选择代替手动输入。',
    focusTag: '选择代替输入',
    stageImg: '/images/projects/pet-travel/page_017.jpg',
    stageKind: 'board',
    stageCaption: '02 / 表单防错设计 · 品种与月龄半屏校验弹窗',
  },
  {
    id: '03',
    title: '行程节点追踪',
    summary: '加入飞行地图与实时节点反馈，缓解宠物托运途中的未知与焦虑。',
    focusTag: '透明追踪',
    stageImg: '/images/projects/pet-travel/page_020.jpg',
    stageKind: 'board',
    stageCaption: '03 / 过程可视化 · 实时飞行地图与节点追踪',
  },
];

export const DISCIPLINES = [
  {
    num: '01',
    title: '体验与服务设计',
    items: '服务设计 PSS · 信息架构 · 2.5D 旅程图 · 无障碍体验 · 设计规范',
  },
  {
    num: '02',
    title: 'AI 辅助工作流',
    items: 'AI Coding 快速原型 · GitHub 协作部署 · Agent 辅助调研推演 · AIGC 图像与动态概念表达',
  },
  {
    num: '03',
    title: '产品与视觉表达',
    items: 'Figma UI · Rhino / 3Ds Max · 3D 渲染 · 品牌文创 · 手绘与摄影',
  },
];

// Curated edge-to-edge full-bleed photos & sketches (100% inside V3 /v3/beyond/:category)
export const CURATED_FILMSTRIP = [
  { img: '/images/life-seaside.webp', label: '海边切片', cat: 'LIFE', href: '/v3/beyond/life' },
  { img: '/images/photography/ruo_01.jpg', label: '光影人像', cat: 'PHOTO', href: '/v3/beyond/photography' },
  { img: '/images/sketch-tiger.webp', label: '彩铅写实', cat: 'SKETCH', href: '/v3/beyond/sketching' },
  { img: '/images/life/wolf-alice.jpg', label: '演出现场', cat: 'LIFE', href: '/v3/beyond/life' },
  { img: '/images/photography/ruo_03.jpg', label: '胶片人像', cat: 'PHOTO', href: '/v3/beyond/photography' },
  { img: '/images/sketching/marker-1.jpg', label: '马克笔手绘', cat: 'SKETCH', href: '/v3/beyond/sketching' },
  { img: '/images/photography/ruo_05.jpg', label: '人像切片', cat: 'PHOTO', href: '/v3/beyond/photography' },
  { img: '/images/life/samoyed.jpg', label: '萨摩耶', cat: 'LIFE', href: '/v3/beyond/life' },
  { img: '/images/sketching/marker-2.jpg', label: '产品草图', cat: 'SKETCH', href: '/v3/beyond/sketching' },
];

export const COMPACT_TIMELINE = [
  {
    year: '2026',
    title: '航旅纵横 · 宠物出行全流程 UX 体验优化',
    desc: '针对宠物航空托运中舱位不透明、填报繁琐和途中焦虑三个痛点，重新梳理了入口分流、表单校验与行程追踪体验。',
    keywords: ['信息架构', '全流程 UX', '表单防错', '情感化设计'],
    caseHref: '/v3/work/pettravel',
  },
  {
    year: '2025',
    title: '优秀硕士毕业设计 · 尊严的具现',
    desc: '面向初老人群的智慧养老产品服务设计。独立完成前期调研、服务蓝图、硬件交互与测试，并在概念发散与表现阶段引入 SD、Midjourney 与 Runway 提效。',
    keywords: ['智慧养老', 'AIGC 工作流', '服务触点设计'],
    caseHref: '/v3/work/graduation',
  },
  {
    year: '2024',
    title: '中英合作 AHRC SEED 种子基金项目',
    desc: '独立负责中英双语研究报告排版与项目纪录视频剪辑，策划并落地跨文化工作坊全流程，期间使用 AI 工具辅助共创产品概念。',
    keywords: ['跨国研究', '双语报告', '工作坊策划'],
    caseHref: '/v3/work/seed',
  },
  {
    year: '2024',
    title: '学术书籍编撰 & 全网自媒体矩阵运营（2W+ 粉丝）',
    desc: '参与编撰《AI 技术赋能居家养老服务实践》（独立撰写第四、九章）；全网自媒体矩阵累计 2W+ 粉丝，涵盖个人成长 IP 与研究生工作室账号（设计文献带读）。',
    keywords: ['学术出版', '自媒体矩阵', '2W+ 粉丝'],
  },
  {
    year: '2023',
    title: '德国汉斯格雅合作 · Eclipse 智慧养老卫浴',
    desc: '从用户研究与服务蓝图切入，负责智能镜物理界面与配套 App 交互设计，完成 3D 产品渲染、场景图及概念短片。',
    keywords: ['产品交互', 'App UX', '3D 渲染'],
    caseHref: '/v3/work/eclipse',
  },
  {
    year: '2023',
    title: '「医度」无障碍出行就医 PSS 服务系统',
    desc: '面向老龄化社区的无障碍就医服务设计，负责移动端 App 交互与 UI 规范，并绘制 2.5D 服务流程图呈现完整就医动线。',
    keywords: ['PSS 服务设计', 'App 交互', 'UI 规范'],
    caseHref: '/v3/work/vcrutch',
  },
  {
    year: '2021',
    title: '省级大创项目负责人 · 彝族非遗文创研究与专利',
    desc: '专业唯一立项的省级大创项目。带队完成田野调研、设计开发与实体打样，产出学术论文 1 篇、外观专利 1 项及多项省部级奖项。',
    keywords: ['省级立项', '学术论文', '外观专利'],
    caseHref: '/v3/work/yimoji',
  },
];

export { honors };
