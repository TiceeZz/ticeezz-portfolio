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

export const HERO_PLATES = [
  {
    num: '01',
    title: '航旅纵横 · 宠物出行',
    sub: '宠物航空托运全链路体验重构',
    img: '/images/projects/pet-travel/iphone-mockup.webp',
    isDevicePlate: true,
    href: '/v3/work/pettravel',
  },
  {
    num: '02',
    title: 'Veriframe · 澄矩',
    sub: '大健康品牌视觉与合规审核工作台',
    img: '/images/projects/veriframe/hero-showcase.webp',
    href: '/v3/work/veriframe',
  },
  {
    num: '03',
    title: '尊严的具现',
    sub: '东华优秀硕士毕设 · 智慧养老服务系统',
    img: '/images/projects/graduation/cover.webp',
    href: '/v3/work/graduation',
  },
  {
    num: '04',
    title: 'Eclipse · 汉斯格雅',
    sub: '德国汉斯格雅合作 · 智能适老卫浴系统',
    img: '/images/projects/eclipse/cover.webp',
    href: '/v3/work/eclipse',
  },
];

export const KEYNOTE_CASES = [
  {
    key: 'pettravel',
    num: '01',
    badge: 'To C · 10 屏原型',
    title: '航旅纵横 · 宠物出行',
    enSub: 'Pet Travel UX · Film & 10-Screen Prototype',
    metrics: [
      { value: '7 → 5 步', label: '核心预约路径精简' },
      { value: '10 屏原型', label: '完整状态与防错实操' },
      { value: '全程可视', label: '高度 · 温氧 · 节点追踪' },
    ],
    ctaLabel: '观看影片与体验交互原型',
    mobileCtaLabel: '观看演示影片与交互原型',
    href: '/v3/work/pettravel',
    pillars: [
      {
        id: '01',
        title: '流程瘦身与舱位前置',
        summary: '按四阶段重排服务大厅并前置展示有氧舱余量，避免填完长表才知无舱。',
        focusTag: '入口分流',
        stageImg: '/images/projects/pet-travel/page_013.jpg',
        stageKind: 'board',
        stageCaption: '01 / 随机飞舱位联动 · 三种运力状态前置',
      },
      {
        id: '02',
        title: '复杂表单结构化防错',
        summary: '将航司文本规则拆进品种检索、月龄滑块与箱型匹配组件。',
        focusTag: '选择代替记忆',
        stageImg: '/images/projects/pet-travel/page_017.jpg',
        stageKind: 'board',
        stageCaption: '02 / 表单防错 · 品种检索与月龄校验弹窗',
      },
      {
        id: '03',
        title: '在途航迹与节点可视化',
        summary: '补齐实时飞行高度、客舱环境与交接节点追踪，缓解分离焦虑。',
        focusTag: '透明追踪',
        stageImg: '/images/projects/pet-travel/page_020.jpg',
        stageKind: 'board',
        stageCaption: '03 / 过程可视化 · 实时航迹与节点追踪',
      },
    ],
  },
  {
    key: 'veriframe',
    num: '02',
    badge: 'To B · 可运行 MVP',
    title: 'Veriframe · 澄矩',
    enSub: 'Brand-Safe AI Visual & Compliance Workbench',
    metrics: [
      { value: '1–2天 → 15分钟', label: '单套合成审签闭环' },
      { value: '0.00% 形变', label: '核心丝印像素硬锁' },
      { value: 'SHA-256 审签', label: '三端比例 1 分钟直出' },
    ],
    ctaLabel: '体验三栏工作台与 13 页推导',
    mobileCtaLabel: '查看 13 页完整设计推导',
    href: '/v3/work/veriframe',
    pillars: [
      {
        id: '01',
        title: '方案演进与双区像素锁',
        summary: '核心丝印 0.00% 原图像素贴回，瓶肩保留环境光过渡。',
        focusTag: '0.00% 篡改',
        stageImg: '/images/projects/veriframe/page_004.jpg',
        stageKind: 'board',
        stageCaption: '01 / 架构取舍 · 确定性资产零重绘边界',
      },
      {
        id: '02',
        title: '广告法穿透与 SGS 证据链',
        summary: '拦截拆字医疗极限词，实测周期卖点一键挂载 SGS 检测报告放行。',
        focusTag: '分级风控',
        stageImg: '/images/projects/veriframe/page_010.jpg',
        stageKind: 'board',
        stageCaption: '02 / 划线词就地改写 · 挂载 SGS 证据链',
      },
      {
        id: '03',
        title: '指纹绑定审签与三尺寸直出',
        summary: '法务审批绑定 SHA-256 指纹，改字即失效，1 分钟直出三端比例。',
        focusTag: '15 分钟闭环',
        stageImg: '/images/projects/veriframe/page_013.jpg',
        stageKind: 'board',
        stageCaption: '03 / 分渠道校核 · 1:1 / 3:4 / 16:9 直出',
      },
    ],
  },
];

export const KEYNOTE_PILLARS = KEYNOTE_CASES[0].pillars;

export const DISCIPLINES = [
  {
    num: '01',
    title: '用户体验与服务系统',
    items: '服务设计 PSS · 信息架构 · 复杂表单防错 · 组件规范',
  },
  {
    num: '02',
    title: 'AI 原型与前端落地',
    items: 'Claude Code · Cursor · MCP · 0→1 前端原型',
  },
  {
    num: '03',
    title: 'AIGC 管线与三维视觉',
    items: 'ComfyUI / SD 商业管线 · Figma · Rhino / 3ds Max',
  },
];

export const CREDENTIAL_CARDS = [
  {
    label: '教育背景',
    items: [
      '东华大学 · 艺术设计硕士（2022–2025 · 211）',
      '四川农业大学 · 产品设计学士（专业排名 TOP 1 / 121）',
    ],
  },
  {
    label: '科研与著作',
    items: [
      '参编专著《AI 技术赋能居家养老服务实践》（独撰第 4、9 章）',
      '2024 中英 AHRC SEED 种子基金 · 双语报告与工作坊策划',
    ],
  },
  {
    label: '专利与荣誉',
    items: [
      '国家外观设计专利 1 项 · 《美术文献》论文 1 篇 · 全网 2W+ 粉丝',
      '东华大学优秀硕士毕设 · 未来设计师国赛二等奖 · 国家励志奖学金',
    ],
  },
];

export const WORK_EXPERIENCE = [
  {
    period: '2025.07 — 2025.10',
    company: '新瞳眼科',
    role: '品牌体验与数字触点设计',
    badge: '商业落地',
    bullets: [
      { text: '统一会员私域从线下礼盒到线上界面的整套品牌视觉规范' },
      { text: '重构核心小程序预约动线，沉淀可复用的基础 UI 组件库' },
      { text: '搭建本地 ComfyUI / SD 管线，累计产出 200+ 商用素材' },
    ],
    relatedCase: { label: '关联沉淀：02 Veriframe · 澄矩 ↗', href: '/v3/work/veriframe' },
  },
  {
    period: '2025.11 — 至今',
    company: '独立产品与体验设计师',
    role: 'AI 原型工程 / 商业设计协作',
    badge: '上海 · 随时到岗',
    bullets: [
      { text: '独立完成大健康合规工作台 MVP 与航旅 10 屏原型的定义与前端落地' },
      { text: '全栈构建个人数字展厅 v1–v3，承接商业品牌与数字界面协作' },
    ],
    relatedCase: { label: '关联代表作：01 航旅纵横 · 宠物出行 ↗', href: '/v3/work/pettravel' },
  },
];

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
    title: 'Veriframe 澄矩 · 大健康合规工作台',
    desc: '独立定义并实现三栏工作台：双区像素硬锁标签、局部重绘场景、挂载 SGS 证据链与 SHA-256 指纹审签。',
    keywords: ['To B AI SaaS', '广告法合规', '可运行 MVP'],
    caseHref: '/v3/work/veriframe',
  },
  {
    year: '2026',
    title: '航旅纵横 · 宠物托运全链路 UX 重构',
    desc: '按四阶段重排服务大厅并前置有氧舱余量（7 步缩至 5 步），交付 10 屏防错交互原型与实时航迹面板。',
    keywords: ['7 步缩至 5 步', '表单防错', '10 屏原型'],
    caseHref: '/v3/work/pettravel',
  },
  {
    year: '2025',
    title: '东华大学优秀硕士毕设 · 尊严的具现',
    desc: '面向初老人群的智慧养老产品服务系统，独立完成用户研究、PSS 蓝图、人机验证与 AIGC 概念迭代。',
    keywords: ['优秀毕设', '智慧养老 PSS', '软硬件触点'],
    caseHref: '/v3/work/graduation',
  },
  {
    year: '2024',
    title: '汉斯格雅智能卫浴 & 中英 SEED 基金',
    desc: '主导升降智能镜面板与配套 App 交互及 3D 渲染；同年完成中英 SEED 双语报告排版并参编出版专著。',
    keywords: ['汉斯格雅合作', '双语报告', '参编出版专著'],
    caseHref: '/v3/work/eclipse',
  },
  {
    year: '2023',
    title: '医度 · 社区无障碍就医服务系统',
    desc: '梳理长者出行至院内候诊全链路断点，完成双视角适老 App 交互规范与中英双语 2.5D 服务蓝图。',
    keywords: ['PSS 服务系统', '适老 App 交互', '无障碍规范'],
    caseHref: '/v3/work/vcrutch',
  },
  {
    year: '2021',
    title: '省级大创 · 彝族非遗文创与外观专利',
    desc: '本科唯一立项省级大创，带队完成田野调研与器物打样，获国家外观专利 1 项、发表论文 1 篇。',
    keywords: ['省级大创负责人', '国家外观专利', '学术论文'],
    caseHref: '/v3/work/yimoji',
  },
];

export { honors };
