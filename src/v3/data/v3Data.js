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
    sub: '宠物航空托运全链路 UX 重构 · 核心路径 7 步缩至 5 步',
    img: '/images/projects/pet-travel/iphone-mockup.webp',
    isDevicePlate: true,
    href: '/v3/work/pettravel',
  },
  {
    num: '02',
    title: 'Veriframe · 澄矩',
    sub: 'To B 大健康品牌视觉生产与合规审核工作台 · 可运行 MVP',
    img: '/images/projects/veriframe/hero-showcase.webp',
    href: '/v3/work/veriframe',
  },
  {
    num: '03',
    title: '尊严的具现',
    sub: '东华大学优秀硕士毕设 · 初老人群智慧养老产品服务系统',
    img: '/images/projects/graduation/cover.webp',
    href: '/v3/work/graduation',
  },
  {
    num: '04',
    title: 'Eclipse · 汉斯格雅',
    sub: '德国汉斯格雅校企合作 · 适老化通用智能洗漱系统',
    img: '/images/projects/eclipse/cover.webp',
    href: '/v3/work/eclipse',
  },
];

export const KEYNOTE_CASES = [
  {
    key: 'pettravel',
    num: '01',
    badge: 'To C 复杂服务流程 · 10 屏原型',
    title: '航旅纵横 · 宠物出行',
    enSub: 'Pet Travel UX · Film & 10-Screen Prototype',
    cardBrief: '按四阶段重排服务大厅并前置有氧舱余量，将民航规则拆进表单防错，补齐实时航迹追踪',
    metrics: [
      { value: '7 → 5 步', label: '核心预约路径精简' },
      { value: '10 屏原型', label: '完整状态与防错实操' },
      { value: '全程可视', label: '高度/温氧/节点追踪' },
    ],
    ctaLabel: '观看影片与体验交互原型',
    mobileCtaLabel: '观看 48s 演示影片与提案',
    href: '/v3/work/pettravel',
    pillars: [
      {
        id: '01',
        title: '流程瘦身与舱位前置',
        summary: '按出行四阶段重排大厅并前置展示有氧舱余量，避免填完长表单才发现无舱位。',
        focusTag: '入口分流',
        stageImg: '/images/projects/pet-travel/page_013.jpg',
        stageKind: 'board',
        stageCaption: '01 / 随机飞舱位联动 · 提前透出三种运力状态',
      },
      {
        id: '02',
        title: '复杂表单结构化防错',
        summary: '折叠非必填项，将冗长纯文本航司规则转化为品种检索弹窗、月龄滑块与箱型匹配组件。',
        focusTag: '选择代替记忆',
        stageImg: '/images/projects/pet-travel/page_017.jpg',
        stageKind: 'board',
        stageCaption: '02 / 表单防错设计 · 品种与月龄半屏校验弹窗',
      },
      {
        id: '03',
        title: '在途航迹与节点可视化',
        summary: '加入实时飞行高度、客舱环境与物流交接追踪面板，配合温和提示缓解分离焦虑。',
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
    title: 'Veriframe · 澄矩',
    enSub: 'Brand-Safe AI Visual & Compliance Workbench',
    cardBrief: '源自新瞳眼科 200+ 商用出图复盘：双区像素硬锁、广告法证据链与指纹审签三端直出',
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

export const MANIFESTO_WORKFLOW = [
  {
    num: '01',
    head: 'DESIGN · 体验与系统拆解',
    body: '服务设计蓝图 PSS、信息架构重排与极端状态防错，沉淀可复用基础组件规范',
  },
  {
    num: '02',
    head: 'PROTOTYPE · AI 原型工程化',
    body: '日常结合 Figma 与 Claude Code、Cursor、Codex、Antigravity、MCP 按天跑通真实交互逻辑',
  },
  {
    num: '03',
    head: 'SHIP · AIGC 管线与落地',
    body: '本地搭建 ComfyUI / SD / Runway 商业管线（产出 200+ 素材），以清晰边界高效协同研发',
  },
];

export const DISCIPLINES = [
  {
    num: '01',
    title: '用户体验与服务系统',
    items: '服务设计 PSS · 信息架构 · 复杂表单防错 · 旅程映射 · 双端组件规范',
  },
  {
    num: '02',
    title: 'AI Agent 与原型工程',
    items: 'Claude Code / Cursor / Codex / Antigravity / MCP · 0→1 可运行前端 MVP',
  },
  {
    num: '03',
    title: 'AIGC 管线与三维视觉',
    items: '本地 ComfyUI / SD / Runway · Figma UI · Rhino / 3ds Max 渲染 · 品牌体系',
  },
];

export const CREDENTIAL_CARDS = [
  {
    label: '教育背景',
    items: [
      '东华大学 · 艺术设计硕士（2022–2025 · 211）',
      '四川农业大学 · 产品设计学士（2018–2022 · 专业排名 TOP 1 / 121）',
    ],
  },
  {
    label: '出版著作与跨国科研',
    items: [
      '参编已出版专著《AI 技术赋能居家养老服务实践》（独立撰写第 4、9 章）',
      '2024 中英种子基金（AHRC SEED）：独立完成双语报告排版、工作坊策划与纪录片剪辑',
    ],
  },
  {
    label: '专利、影响力与荣誉',
    items: [
      '授权国家外观设计专利 1 项 · 《美术文献》学术论文 1 篇 · 全网自媒体矩阵 2W+ 粉丝',
      `${honors.join(' · ')} · 多次国家励志奖学金`,
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
      {
        lead: '品牌触点视觉：',
        text: '负责会员私域从线下礼盒到线上界面的整套视觉设计，统一原本零散的品牌风格。',
      },
      {
        lead: '小程序界面改版：',
        text: '重新理顺核心业务小程序的信息层级与预约操作动线，整理出一套可复用的基础 UI 组件规范。',
      },
      {
        lead: 'AIGC 出图工作流：',
        text: '在本地搭建 ComfyUI / SD 工作流用于前期概念与日常延展素材制作，累计产出 200+ 张可用素材（该段交付瓶颈复盘直接催生 02 号案例 Veriframe 澄矩）。',
      },
    ],
    relatedCase: { label: '关联沉淀：02 Veriframe · 澄矩 ↗', href: '/v3/work/veriframe' },
  },
  {
    period: '2025.11 — 至今',
    company: '独立产品与体验设计师',
    role: 'AI 产品原型工程 / 商业设计协作',
    badge: '现居上海 · 随时到岗',
    bullets: [
      {
        lead: '产品定义与工程化落地：',
        text: '聚焦「复杂业务体验重构 + AI 辅助前端原型落地」，独立完成 To B 大健康合规工作台 MVP、To C 航旅托运 10 屏交互原型及个人网站 v1–v3 响应式全栈迭代，同时承接商业品牌与数字界面协作。',
      },
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
    title: 'Veriframe 澄矩 · 大健康视觉生产与合规审核工作台',
    desc: '复盘前司 200+ 商用出图瓶颈，推翻表格盲盒抽卡与静态黑名单一刀切，独立定义并实现三栏桌面工作台：L1 双区硬锁原图标签、L2 局部重绘背景、L3 矢量排版挂载 SGS 证据链，法务指纹审签后直出三端比例。',
    keywords: ['To B AI SaaS', '桌面工作台', '广告法合规', '可运行 MVP'],
    caseHref: '/v3/work/veriframe',
  },
  {
    year: '2026',
    title: '航旅纵横 · 宠物托运全链路 UX 重构',
    desc: '针对宠物航空托运舱位不透明、规则难读易填错和在途分离焦虑三个痛点，按四阶段重排服务大厅并前置展示机舱额度（核心预约路径从 7 步缩至 5 步），完成 10 屏前端防错原型与航迹追踪面板。',
    keywords: ['信息架构', '7 步缩至 5 步', '表单防错', '10 屏交互原型'],
    caseHref: '/v3/work/pettravel',
  },
  {
    year: '2025',
    title: '东华大学优秀硕士毕设 · 尊严的具现',
    desc: '面向初老人群的智慧养老产品服务系统。独立完成前期调研、服务蓝图、人机工程验证与用户测试，并在方案探索阶段结合 Stable Diffusion、Midjourney 与 Runway 提效测试反馈。',
    keywords: ['优秀毕设', '智慧养老 PSS', 'AIGC 工作流', '软硬件触点'],
    caseHref: '/v3/work/graduation',
  },
  {
    year: '2024',
    title: '汉斯格雅智能适老卫浴 & 中英 AHRC SEED 基金',
    desc: '在德国汉斯格雅校企合作课题中主导升降智能镜硬件操作面板与配套 App 交互及 3D 渲染视频；同年独立完成中英 AHRC SEED 双语研究报告排版与工作坊全流程策划，并参编出版专著撰写第 4、9 章。',
    keywords: ['汉斯格雅合作', '软硬件交互', '双语研究报告', '参编出版专著'],
    caseHref: '/v3/work/eclipse',
  },
  {
    year: '2023',
    title: '医度 Easygoing · 老龄化社区无障碍就医服务系统',
    desc: '从 PSS 服务系统切入梳理长者出门、接驳到院内候诊全链路断点，负责移动端 App 双视角交互流程、适老 UI 规范及中英双语 2.5D 全景服务蓝图。',
    keywords: ['PSS 服务系统', '适老 App 交互', '无障碍 UI 规范'],
    caseHref: '/v3/work/vcrutch',
  },
  {
    year: '2021',
    title: '省级大创负责人 · 彝族非遗文创开发与外观专利',
    desc: '本科专业唯一立项的省级大创项目。带队完成凉山彝族纹样田野调研、现代器物开发与打样，获授权国家外观设计专利 1 项、发表《美术文献》论文 1 篇。',
    keywords: ['省级大创负责人', '国家外观专利', '学术论文'],
    caseHref: '/v3/work/yimoji',
  },
];

export { honors };
