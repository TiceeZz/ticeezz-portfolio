import { honors } from '../../data/timeline';
import { V3_CASE_STUDIES } from './v3CaseStudies';

export const RESUME_PDF_HREF = '/pdf/童宗震-AI复合型设计师-简历.pdf';
export const RESUME_DOWNLOAD_NAME = '童宗震-AI复合型设计师-简历.pdf';

export const V3_PROJECTS = V3_CASE_STUDIES.map((c) => ({
  num: c.num,
  slug: c.slug,
  title: c.title,
  enTitle: c.enTitle,
  subtitle: c.subtitle,
  year: c.year,
  categoryGroup: c.categoryGroup || 'core',
  stageGroup: Number(c.num) <= 7 ? 'postgrad' : 'undergrad',
  href: `/v3/work/${c.slug}`,
  displayImg: c.cover,
  previewVideo: c.previewVideo || null,
  previewPoster: c.previewPoster || null,
  isDevicePlate: Boolean(c.isDevicePlate),
}));

// Pure cinematic plates for Hero (01 Mobile To C + 02 Desktop To B AI SaaS twin flagships)
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
    title: 'Veriframe · 澄矩',
    sub: '大健康品牌视觉生产与合规审核 · 2026',
    img: '/images/projects/veriframe/hero-showcase.webp',
    href: '/v3/work/veriframe',
  },
  {
    num: '03',
    title: '尊严的具现',
    sub: '初老人群智慧养老硕士毕设 · 2025',
    img: '/images/projects/graduation/cover.webp',
    href: '/v3/work/graduation',
  },
  {
    num: '05',
    title: 'Eclipse · 汉斯格雅',
    sub: '适老化智能卫浴系统 · 2023',
    img: '/images/projects/eclipse/cover.webp',
    href: '/v3/work/eclipse',
  },
];

export const KEYNOTE_CASES = [
  {
    key: 'pettravel',
    num: '01',
    badge: 'To C 复杂服务流程 · 10 屏原型',
    kicker: '01 / FLAGSHIP CASE · TO C SERVICE UX',
    title: '航旅纵横 · 宠物出行',
    enSub: 'Pet Travel UX · Film & 10-Screen Prototype',
    cardBrief: '前置有氧舱余量、将民航规则拆进表单防错，补齐全程航迹与落地海报',
    ctaLabel: '观看影片与体验交互原型',
    mobileCtaLabel: '观看 48s 演示影片与提案',
    href: '/v3/work/pettravel',
    pillars: [
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
    ],
  },
  {
    key: 'veriframe',
    num: '02',
    badge: 'To B AI SaaS 工作台 · 可运行 MVP',
    kicker: '02 / FLAGSHIP CASE · TO B AI WORKBENCH',
    title: 'Veriframe · 澄矩',
    enSub: 'Brand-Safe AI Visual & Compliance Workbench',
    cardBrief: '源自 200+ 商用出图复盘：双区像素硬锁、广告法证据链与指纹签发三端直出',
    ctaLabel: '体验三栏工作台与 13 页推导',
    mobileCtaLabel: '查看 13 页完整设计推导',
    href: '/v3/work/veriframe',
    pillars: [
      {
        id: '01',
        title: '方案演进与双区像素锁',
        summary: '推翻飞书表格盲盒抽卡与整瓶死抠捷径：核心标签 0.00% 原图像素贴回，瓶肩保留环境光过渡。',
        focusTag: '0.00% 篡改',
        stageImg: '/images/projects/veriframe/page_004.jpg',
        stageKind: 'board',
        stageCaption: '01 / 三项关键架构取舍 · 确定性资产零重绘边界',
      },
      {
        id: '02',
        title: '广告法穿透与 SGS 证据链',
        summary: '识别全半角拆字变体拦截医疗极限词；实测周期卖点一键挂载 SGS 报告编号合规放行。',
        focusTag: '分级风控',
        stageImg: '/images/projects/veriframe/page_010.jpg',
        stageKind: 'board',
        stageCaption: '02 / 画布划线词就地改写 · 兼顾法规底线与商业转化',
      },
      {
        id: '03',
        title: '指纹绑定审签与三尺寸直出',
        summary: '法务审批强绑定 SHA-256 内容指纹，改一字即吊销；签发后 <1 分钟直出天猫/小红书/官网成片。',
        focusTag: '15 分钟闭环',
        stageImg: '/images/projects/veriframe/page_013.jpg',
        stageKind: 'board',
        stageCaption: '03 / 分渠道独立校核口径 · 1:1 / 3:4 / 16:9 同屏导出',
      },
    ],
  },
];

export const KEYNOTE_PILLARS = KEYNOTE_CASES[0].pillars;

export const DISCIPLINES = [
  {
    num: '01',
    title: '体验与服务设计',
    items: '服务设计 PSS · 信息架构 · 复杂表单防错 · 无障碍体验 · 双端设计规范',
  },
  {
    num: '02',
    title: 'AI 产品与工程落地',
    items: '0→1 AI 工作台定义 · Claude Code / Codex 可运行原型开发 · 本地 ComfyUI 商业管线',
  },
  {
    num: '03',
    title: '产品与视觉表达',
    items: 'Figma UI · Rhino / 3Ds Max · 3D 渲染 · 品牌体系 · 手绘与摄影',
  },
];

export const WORK_EXPERIENCE = [
  {
    period: '2025.07 — 2025.10',
    company: '新瞳眼科',
    role: '品牌体验与数字触点设计',
    badge: '大健康商业落地',
    bullets: [
      '参与核心业务小程序界面改版，重梳预约分流信息层级、操作动线与基础 UI 组件规范，统一线下礼盒至线上私域界面的全链路触点。',
      '针对高频投放用图需求搭建本地 ComfyUI / Stable Diffusion 商业管线并嵌入日常生产，累计交付 200+ 张可用素材（该段痛点复盘直接催生 02 号案例 Veriframe）。',
    ],
    relatedCase: { label: '关联沉淀：02 Veriframe · 澄矩 ↗', href: '/v3/work/veriframe' },
  },
  {
    period: '2025.11 — 至今',
    company: '独立产品与体验设计师',
    role: 'AI 产品原型工程 / 商业设计协作',
    badge: '现居上海 · 随时到岗',
    bullets: [
      '聚焦「复杂业务体验重构 + AI 辅助前端工程化」，承接商业品牌与数字界面设计协作，并独立完成 To B 大健康合规工作台 MVP 与 To C 航旅托运 10 屏交互原型。',
    ],
    relatedCase: { label: '关联代表作：01 航旅纵横 · 宠物出行 ↗', href: '/v3/work/pettravel' },
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
    title: 'Veriframe 澄矩 · 大健康品牌视觉生产与合规审核工作台（0→1 MVP）',
    desc: '复盘前司 200+ 商用出图瓶颈，推翻表格盲盒抽卡与静态黑名单一刀切，独立定义并实现三栏桌面工作台：L1 双区硬锁原图标签、L2 局部重绘背景、L3 矢量排版挂载 SGS 证据链，法务指纹审签后直出三端比例。',
    keywords: ['To B AI SaaS', '桌面工作台', '广告法合规', '设计到代码'],
    caseHref: '/v3/work/veriframe',
  },
  {
    year: '2026',
    title: '航旅纵横 · 宠物出行全流程 UX 体验优化（含 10 屏原型）',
    desc: '针对宠物航空托运中舱位不透明、填报繁琐和途中焦虑三个痛点，重新梳理入口分流、短鼻犬/年龄防错表单与全程实时航迹追踪体验。',
    keywords: ['信息架构', '全流程 UX', '表单防错', '10 屏交互原型'],
    caseHref: '/v3/work/pettravel',
  },
  {
    year: '2025',
    title: '东华大学优秀硕士毕业设计 · 尊严的具现',
    desc: '面向初老人群的智慧养老产品服务设计。独立完成前期调研、服务蓝图、硬件交互与测试，并在概念发散与表现阶段引入 SD、Midjourney 与 Runway 提效。',
    keywords: ['优秀毕设', '智慧养老', 'AIGC 工作流', '服务触点设计'],
    caseHref: '/v3/work/graduation',
  },
  {
    year: '2024',
    title: '中英合作 AHRC SEED 种子基金项目 & 出版著作参编',
    desc: '独立负责中英双语研究报告排版与线下工作坊全流程策划；参编已出版著作《AI 技术赋能居家养老服务实践》（独立撰写第四、九章）；全网自媒体矩阵累计 2W+ 粉丝。',
    keywords: ['跨国研究', '独立撰写两章专著', '2W+ 粉丝矩阵'],
    caseHref: '/v3/work/seed',
  },
  {
    year: '2023',
    title: '德国汉斯格雅合作 · Eclipse 智慧卫浴 & 「医度」无障碍就医系统',
    desc: '主导汉斯格雅升降智能镜物理面板与移动端 App 协同交互及 3D 渲染；在「医度」项目中完成老龄化社区就医 PSS 服务蓝图、App 交互与 UI 规范。',
    keywords: ['软硬件协同', 'App UX', 'PSS 服务系统'],
    caseHref: '/v3/work/eclipse',
  },
  {
    year: '2021',
    title: '省级大创项目负责人 · 彝族非遗文创研究与外观专利',
    desc: '专业唯一立项的省级大创项目。带队完成田野调研、设计开发与实体打样，产出《美术文献》学术论文 1 篇、外观专利 1 项及多项省部级竞赛奖项。',
    keywords: ['省级立项', '学术论文', '外观专利'],
    caseHref: '/v3/work/yimoji',
  },
];

export { honors };
