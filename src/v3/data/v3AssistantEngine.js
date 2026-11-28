/**
 * V3 Prism Assistant Knowledge Engine
 * 同步 2026.11 最新履历、案例与高频面试问答
 * 支持：页面上下文感知、引用案例卡片直达、页面交互指令（切换浅/深色主题、跳转区块、一键复制）
 */

export const QUICK_PROMPTS_HOME = [
  '30 秒速览：核心优势与经历',
  '拆解「Veriframe 澄矩」To B 工作台',
  '拆解「航旅纵横」C 端体验重构',
  '生成 3 句话推荐语发给老板',
];

const CASE_CARDS = {
  pettravel: {
    num: '01',
    title: '航旅纵横 · 宠物出行',
    meta: '全流程 UX 重构 · 2026',
    href: '/v3/work/pettravel',
  },
  veriframe: {
    num: '02',
    title: 'Veriframe · 澄矩',
    meta: 'To B 大健康品牌视觉与合规工作台 · 2026',
    href: '/v3/work/veriframe',
  },
  graduation: {
    num: '03',
    title: '尊严的具现',
    meta: '智慧养老服务系统 · 硕士毕设',
    href: '/v3/work/graduation',
  },
  seed: {
    num: '04',
    title: 'AHRC SEED 工作坊',
    meta: '中英合作 · 双语报告与共创',
    href: '/v3/work/seed',
  },
  eclipse: {
    num: '05',
    title: 'Eclipse · 汉斯格雅',
    meta: '智能硬件面板 + App 交互',
    href: '/v3/work/eclipse',
  },
  vcrutch: {
    num: '06',
    title: '医度 · Easygoing',
    meta: '无障碍就医 PSS 服务系统',
    href: '/v3/work/vcrutch',
  },
  fengjing: {
    num: '07',
    title: '枫泾小院',
    meta: '品牌视觉与文创包装',
    href: '/v3/work/fengjing',
  },
  yimoji: {
    num: '08',
    title: '彝 MOJI · 非遗文创',
    meta: '省级大创 · 论文与外观专利',
    href: '/v3/work/yimoji',
  },
};

const REFERRAL_PITCH =
  '推荐一位兼具 C 端体验功底与 B 端 AI 产品落地能力的设计师童宗震（东华大学艺术设计硕士，现居上海随时到岗）：既做过航旅纵横全链路 UX 重构与 10 屏交互原型、新瞳眼科小程序改版与德国汉斯格雅软硬件协同，又基于 200+ 张商业出图经验独立定义并实现了大健康品牌 AI 视觉生产与合规工作台「Veriframe · 澄矩」（这个双主题作品集网站与两个完整可操作原型均由他独立设计并工程化落地）。作品集链接：https://ticeezz-portfolio.pages.dev';

export function getWelcomePayload(pathname, isMobile = false) {
  if (pathname.startsWith('/v3/work/veriframe')) {
    return {
      text: isMobile
        ? '你好，我是 **Prism**。\n\n你正在看 02 号案例 **Veriframe 澄矩**：面向大健康品牌的 AI 视觉生产与合规审核工作台，脱胎于前公司用 ComfyUI 落地 200+ 张商用素材的经验。当前手机端已直接展开 **13 页完整设计推导**（三栏桌面工作台建议在电脑端打开体验）。'
        : '你好，我是 **Prism**。\n\n你正在看 02 号案例 **Veriframe 澄矩**：给大健康品牌用的 AI 视觉生产与合规审核工作台，来自前公司用 ComfyUI 做商用素材的经验。上方可以直接操作：点画面上的红色下划线替换违规用语，修复方案 C 的背景，提交后切到法务点通过，再导出 PNG。',
      suggestions: [
        '拆解「Veriframe 澄矩」解决了什么问题',
        '30 秒速览：核心优势与经历',
        '他的 AI 工作流具体怎么落地？',
      ],
    };
  }
  if (pathname.startsWith('/v3/work/pettravel')) {
    return {
      text: '你好，我是 **Prism**。\n\n你正在看 **「航旅纵横 · 宠物出行」** 的流程重构案例——页面上方可以直接操作完整交互原型（包括随机飞三态、短鼻犬禁飞校验、体重匹配箱型和实时追踪）。想了解其中的设计判断或他的经历，直接问我就好。',
      suggestions: [
        '拆解「航旅纵横」的设计判断',
        '30 秒速览：核心优势与经历',
        '他的 AI 工作流具体怎么落地？',
      ],
    };
  }
  if (pathname.startsWith('/v3/work/eclipse')) {
    return {
      text: '你好，我是 **Prism**。\n\n你正在看德国汉斯格雅校企合作项目 **「Eclipse · 月食」**。他在里面主导了硬件操作面板与配套 App 协同交互以及 3D 渲染演示。想了解项目细节或他的其他经历都可以直接问我。',
      suggestions: [
        '聊聊汉斯格雅软硬件协同设计',
        '30 秒速览：核心优势与经历',
        '如何联系童宗震？',
      ],
    };
  }
  if (pathname.startsWith('/v3/work/')) {
    return {
      text: '你好，我是 **Prism**，TiceeZz 的作品集导览助手。\n\n你可以随时问我他的项目背景、AI 工作流实践、过往经历，或者让我带你切回首页展厅与履历。',
      suggestions: QUICK_PROMPTS_HOME,
    };
  }
  return {
    text: '你好，我是 **Prism**，童宗震（TiceeZz）的作品集导览助手。\n\n不用翻完整站，你可以直接按招聘视角挑下面的问题，或者直接输入想了解的经历、案例、AI 实践，甚至让我帮你**切换浅/深主题**或**直达某块内容**。',
    suggestions: QUICK_PROMPTS_HOME,
  };
}

function hasAny(q, words) {
  return words.some((w) => q.includes(w));
}

export function generateV3Response(rawQuery, { theme = 'light' } = {}) {
  const query = (rawQuery || '').trim();
  const q = query.toLowerCase();

  if (!q) {
    return {
      text: '可以直接输入你想了解的内容，或者点下方快捷问题开始。',
      suggestions: QUICK_PROMPTS_HOME,
    };
  }

  /* ════ 1. 页面控制指令：切换浅/深色主题 ════ */
  if (
    hasAny(q, ['深色', '暗色', '暗黑', '黑夜', '夜间', 'dark mode', 'dark']) &&
    hasAny(q, ['切', '换', '开', '转', '变', '模式', '主题', '试'])
  ) {
    return {
      text:
        theme === 'dark'
          ? '当前已经是**深色（暗夜蓝）主题**了。如果想看更偏画廊阅读感的「冰白 · 克莱因蓝」浅色版，也可以随时让我切回去。'
          : '好，已经帮你切到**深色 · 暗夜蓝**主题（采用 View Transition 圆形扩散过渡）。深色版更适合沉浸看作品细节和光学棱镜质感。',
      autoAction: theme === 'dark' ? null : { type: 'theme', value: 'dark' },
      actions:
        theme === 'dark'
          ? [{ type: 'theme', value: 'light', label: '切换到浅色主题' }]
          : [{ type: 'theme', value: 'light', label: '切回浅色主题' }],
      suggestions: ['这个网站是怎么做出来的？', '30 秒速览：核心优势与经历'],
    };
  }

  if (
    hasAny(q, ['浅色', '亮色', '白色', '白天', 'light mode', 'light']) &&
    hasAny(q, ['切', '换', '开', '转', '变', '模式', '主题', '试'])
  ) {
    return {
      text:
        theme === 'light'
          ? '当前已经是**浅色（冰白 · 克莱因蓝）主题**了。想体验沉浸感更强的深海暗夜蓝版本，点下面就能切。'
          : '已为你切到**浅色 · 冰白克莱因蓝**主题，文字阅读和案例排版会更轻盈通透。',
      autoAction: theme === 'light' ? null : { type: 'theme', value: 'light' },
      actions:
        theme === 'light'
          ? [{ type: 'theme', value: 'dark', label: '切换到深色主题' }]
          : [{ type: 'theme', value: 'dark', label: '切回深色主题' }],
      suggestions: ['这个网站是怎么做出来的？', '看看他的代表作品'],
    };
  }

  if (hasAny(q, ['切换主题', '换主题', '换个颜色', '主题切换'])) {
    const next = theme === 'light' ? 'dark' : 'light';
    return {
      text: `已帮你切换为**${next === 'dark' ? '深色 · 暗夜蓝' : '浅色 · 冰白克莱因蓝'}**主题。这套双主题和棱镜折射细节都是他在 v3 里重新梳理的。`,
      autoAction: { type: 'theme', value: next },
      suggestions: ['这个网站是怎么做出来的？', '30 秒速览：核心优势与经历'],
    };
  }

  /* ════ 2. 实用彩蛋：3 句话推荐语发给老板/同事 ════ */
  if (hasAny(q, ['推荐语', '转给老板', '发给老板', '推荐信', '转发', '一句话介绍', '总结一下给'])) {
    return {
      text: `可以直接复制下面这段发给业务负责人或团队：\n\n「${REFERRAL_PITCH}」`,
      actions: [
        { type: 'copy', value: REFERRAL_PITCH, label: '一键复制推荐语' },
        { type: 'copy', value: '1027208320@qq.com', label: '复制邮箱' },
      ],
      suggestions: ['看看他的联系方式', '拆解「航旅纵横」的设计判断'],
    };
  }

  /* ════ 3.5 Veriframe 澄矩 To B AI SaaS 案例拆解 ════ */
  if (
    hasAny(q, [
      'veriframe',
      '澄矩',
      '大健康',
      '三层解耦',
      '三层',
      '广告法',
      '合规',
      'to b',
      'tob',
      'saas',
      '工作台',
    ])
  ) {
    return {
      text:
        '**Veriframe · 澄矩（02 号案例）** 是童宗震基于前公司大健康品牌用 ComfyUI 做 200 多张商用素材的经验，独立定义并实现的桌面端 AI 工作台（可运行 MVP）。\n\n' +
        '• **解决的问题**：AI 出图本身不难，难的是包装和中文被改坏、文案触犯《广告法》、多个角色反复确认版本。它要让强监管行业的品牌敢用、敢发、交付快。\n' +
        '• **怎么做的**：一张主图拆成三层，文案单独排版，产品标签区域保持原图像素（浏览器内计算 SHA-256 校验），AI 只生成背景；有问题的方案只重新生成背景，并能拖动中线对比前后。\n' +
        '• **审核闭环**：违规用语能识别变体写法，并按类目检查必填声明，在画面上直接替换；法务审核绑定具体版本，改任何内容都会失效；未审核导出带样稿水印，通过后一次导出三个尺寸。',
      sources: [CASE_CARDS.veriframe, CASE_CARDS.pettravel],
      suggestions: ['30 秒速览：核心优势与经历', '他的 AI 工作流具体怎么落地？', '生成 3 句话推荐语发给老板'],
    };
  }

  /* ════ 3. 30 秒速览 / 核心优势 / 为什么值得约面 ════ */
  if (
    hasAny(q, [
      '30 秒',
      '30秒',
      '速览',
      '核心优势',
      '为什么',
      '值得约面',
      '自我介绍',
      '个人简介',
      '介绍一下',
      '童宗震',
      '你是谁',
      '履历',
      '背景',
      '总体',
    ])
  ) {
    return {
      text:
        '**童宗震（TiceeZz）· 30 秒速览**\n\n' +
        '• **教育底子**：东华大学（211）艺术设计硕士（2022–2025），四川农业大学（211）产品设计本科专业第 1/121。\n' +
        '• **商业与双代表作**：在新瞳眼科负责会员私域视觉、核心小程序改版与组件规范，并搭起本地 ComfyUI 工作流产出 **200+ 可用素材**；C 端完成**航旅纵横 · 宠物出行**全链路 UX 重构（含 10 屏交互原型），B 端独立定义并实现大健康 AI 视觉生产与合规工作台 **Veriframe · 澄矩**，另做过**德国汉斯格雅**软硬件交互与出版著作（独立撰写第 4、9 章）。\n' +
        '• **稀缺差异化**：不止停留在静态稿——习惯把 Figma 与 **Antigravity、Claude Code、Codex、Cursor、MCP** 结合，能把复杂交互直接做到可运行原型甚至上线产品。\n' +
        '• **当前状态**：现居上海，随时到岗，主看 **UX/产品设计** 及 **0–1 体验型 AI 产品/Builder** 机会。',
      sources: [CASE_CARDS.veriframe, CASE_CARDS.pettravel, CASE_CARDS.eclipse],
      actions: [
        { type: 'scroll', value: 'v3-index', label: '跳到完整履历区 ↓' },
        { type: 'copy', value: '1027208320@qq.com', label: '复制邮箱' },
      ],
      suggestions: ['拆解「Veriframe 澄矩」To B 工作台', '拆解「航旅纵横」C 端体验重构', '新瞳眼科和近期空窗怎么回事？'],
    };
  }

  /* ════ 4. 航旅纵横 UX 深度拆解 ════ */
  if (hasAny(q, ['航旅', '宠物', '托运', 'pettravel', '表单', '防错', '设计判断', '取舍'])) {
    return {
      text:
        '**航旅纵横 · 宠物出行全链路 UX 重构（2026）**\n\n' +
        '针对宠物航空托运里最真实的三个断点做了系统重构：\n' +
        '1. **流程瘦身与舱位前置**：用服务蓝图拆解后发现，用户经常填完大半资料才发现航班没名额。重构后按四阶段重组服务大厅并前置展示有氧舱余量，核心预约路径从 **7 步缩到 5 步**。\n' +
        '2. **复杂表单防错**：把原先一大段纯文字航司规则拆成可检索的品种弹窗和年龄校验滑块，折叠非必填项，用“选择和系统校验”替代用户死记规则。\n' +
        '3. **过程可视化追踪**：针对托运后看不见宠物的焦虑，设计带飞行高度与物流节点的追踪面板，配合温和提示让等待过程透明可控。\n\n' +
        '*注：这是他基于真实业务痛点独立推演并按上线标准完成的深度体验重构，且已在案例页内直接做成可点击体验的 10 屏前端交互原型。*',
      sources: [CASE_CARDS.pettravel],
      actions: [{ type: 'scroll', value: 'v3-keynote', label: '看首页提案拆解 ↓' }],
      suggestions: ['他的 AI 工作流具体怎么落地？', '聊聊汉斯格雅软硬件项目', '生成 3 句话推荐语发给老板'],
    };
  }

  /* ════ 5. AI 工作流 / 网站开发 / 人机分工 / 复盘 ════ */
  if (
    hasAny(q, [
      'ai',
      '工作流',
      'claude',
      'codex',
      'cursor',
      'antigravity',
      'mcp',
      'comfyui',
      'agent',
      'vibe',
      '网站',
      '怎么做的',
      '写代码',
      '前端',
      '原型',
      '大模型',
      'llm',
      'aigc',
      'sd',
      'midjourney',
    ])
  ) {
    return {
      text:
        '**他的 AI 辅助设计与工程工作流**\n\n' +
        '• **日常工具栈**：Figma + Antigravity / Claude Code / Codex / Cursor / MCP，以及本地 ComfyUI / Stable Diffusion、Midjourney、Runway。\n' +
        '• **落地实绩**：\n' +
        '  1. **商业出图管线**：在新瞳眼科本地搭建 ComfyUI / SD 工作流，累计产出 **200+ 张商业概念与延展素材**；\n' +
        '  2. **0→1 AI 工作台落地（Veriframe · 澄矩）**：把商业出图后最耗时的包装防变形、广告法变体用语拦截与法务版本签署沉淀为可运行的桌面端 MVP；\n' +
        '  3. **独立网站与双原型工程化**：本站 v1→v3 以及内置的两套完整交互原型，均由他自己定设计系统、交互细节和验收标准并驱动实现上线。\n' +
        '• **产品反思**：v1/v2 时一度偏重动效和炫技，v3 主动收敛成了高阅读效率的画廊结构——技术表现永远服务于核心任务。',
      sources: [CASE_CARDS.veriframe, CASE_CARDS.pettravel, CASE_CARDS.graduation],
      actions: [
        { type: 'theme', value: theme === 'light' ? 'dark' : 'light', label: `体验${theme === 'light' ? '深色' : '浅色'}主题切换` },
      ],
      suggestions: ['如果网站重做一次会改什么？', '他更适合做设计还是 AI 产品？', '30 秒速览：核心优势与经历'],
    };
  }

  /* ════ 6. 新瞳眼科 / 离职原因 / 空窗期 ════ */
  if (hasAny(q, ['新瞳', '眼科', '工作经历', '离职', '空窗', '几个月', '3个月', '三个月', '全职', '经验少', '年限'])) {
    return {
      text:
        '**商业经历与近期节奏说明**\n\n' +
        '• **新瞳眼科（2025.07–2025.10 · 体验与视觉设计）**：负责会员私域从线下礼盒到线上界面的整套视觉统一，参与核心小程序界面改版与基础组件规范整理，并在本地搭建 ComfyUI / SD 出图流程产出 **200+ 可用素材**。\n' +
        '• **独立设计师（自由协作 · 2025.11–至今）**：阶段性交付完成后转向更契合长期方向的「产品体验设计 + AI 工具落地」，期间保持独立商业设计协作，并系统完成了航旅纵横 10 屏可交互原型与作品集网站 v1–v3 工程化迭代。\n' +
        '• **当前状态**：现居上海，**随时可全职稳定到岗**。',
      sources: [CASE_CARDS.pettravel],
      actions: [{ type: 'scroll', value: 'v3-index', label: '查看履历时间线 ↓' }],
      suggestions: ['他更适合做设计还是 AI 产品？', '他的 AI 工作流具体怎么落地？'],
    };
  }

  /* ════ 7. 设计 vs AI 产品定位 ════ */
  if (hasAny(q, ['产品经理', '设计岗', '适合', '定位', '职业规划', 'pm', 'builder', '转产品'])) {
    return {
      text:
        '**关于「设计 vs AI 产品」的定位**\n\n' +
        '他的核心底色是**产品与用户体验设计科班**，但工作方式天然偏 **Product Designer / AI Builder**：\n' +
        '• 在 **UX / AI 产品设计岗**，他有扎实的审美、交互架构、软硬件协同功底，同时能自己用 AI 做出可交互原型，极大降低和研发的沟通损耗；\n' +
        '• 在 **0–1 早期 AI 团队 / AI Builder 岗**，他习惯从真实业务痛点拆解问题并亲手做出可运行 MVP（如 **Veriframe · 澄矩**），不靠空谈文档推动方案。',
      sources: [CASE_CARDS.veriframe, CASE_CARDS.pettravel, CASE_CARDS.eclipse],
      suggestions: ['30 秒速览：核心优势与经历', '如何联系童宗震？'],
    };
  }

  /* ════ 8. 汉斯格雅 / 硬件与 App 协同 ════ */
  if (hasAny(q, ['汉斯格雅', 'eclipse', '月食', '硬件', '卫浴', '智能镜', '3d', 'rhino', '渲染'])) {
    return {
      text:
        '**德国汉斯格雅校企合作 · Eclipse 月食（适老化智能卫浴）**\n\n' +
        '面向半失能老人家庭的通用智能洗漱方案。他从用户研究与服务蓝图切入，核心负责：\n' +
        '• **软硬件协同交互**：智能镜物理操作面板 + 配套移动端 App 交互设计；\n' +
        '• **空间与视觉表现**：用 Rhino / 3Ds Max 完成高精度 3D 产品渲染、场景图及演示视频制作。',
      sources: [CASE_CARDS.eclipse, CASE_CARDS.graduation],
      suggestions: ['硕士毕设做了什么？', '看看他的其他作品'],
    };
  }

  /* ════ 9. 硕士毕设 / 养老 / 医度 ════ */
  if (hasAny(q, ['毕设', '毕业设计', '尊严', '养老', '初老', '医度', 'easygoing', '服务设计', 'pss'])) {
    return {
      text:
        '**服务设计与适老化代表项目**\n\n' +
        '• **《尊严的具现》（东华硕士毕设 · 2025）**：面向初老人群的智慧养老产品服务系统，独立完成前期研究、触点规划、人机验证到用户测试，并用 Stable Diffusion、Midjourney、Runway 加速方案发散与测试反馈。\n' +
        '• **「医度 · Easygoing」（2023）**：老龄化社区无障碍出行就医 PSS 服务系统，负责移动端 App 全链路交互、UI 规范与 2.5D 服务流程图。',
      sources: [CASE_CARDS.graduation, CASE_CARDS.vcrutch],
      suggestions: ['聊聊中英 AHRC SEED 和出版著作', '看看他的教育背景'],
    };
  }

  /* ════ 10. 教育 / 英语 / AHRC SEED / 出版 / 奖项 ════ */
  if (hasAny(q, ['教育', '学历', '学校', '东华', '川农', '硕士', '本科', '排名', '英语', '英文', 'ahrc', 'seed', '书', '出版', '论文', '奖', '荣誉'])) {
    return {
      text:
        '**教育背景、学术与国际协作**\n\n' +
        '• **东华大学（211）** · 艺术设计硕士（2022–2025）\n' +
        '• **四川农业大学（211）** · 产品设计学士（2018–2022），**专业成绩第 1 / 121**，多次国家励志奖学金，曾任学生会执行主席。\n' +
        '• **跨国与出版**：参与中英合作智慧养老种子基金（**AHRC SEED**），独立完成中英双语报告与线下工作坊策划，英语可用于文献阅读与日常工作沟通；参编出版图书《AI 技术赋能居家养老服务实践》（**独立撰写第 4、9 章**）；本科持有外观专利 1 项并发表论文 1 篇。\n' +
        '• **核心竞赛**：华灿奖二等奖、米兰设计周三等奖、NCDA 一/二等奖、包豪斯国际设计大赛、中华设计奖优秀奖。',
      sources: [CASE_CARDS.seed, CASE_CARDS.yimoji],
      suggestions: ['30 秒速览：核心优势与经历', '如何联系童宗震？'],
    };
  }

  /* ════ 11. 全部作品集 / 展厅导航 ════ */
  if (hasAny(q, ['作品', '案例', '展厅', '项目', '看什么', '推荐看', 'portfolio', 'gallery'])) {
    return {
      text:
        '建议按时间紧迫度优先看这 **3 个代表作**：\n\n' +
        '1. **航旅纵横 · 宠物出行（01）** — 看复杂业务拆解、表单防错与 C 端全流程 UX；\n' +
        '2. **Veriframe · 澄矩（02）** — 看 0→1 To B AI 工作台定义、广告法合规闭环与桌面端实现；\n' +
        '3. **Eclipse · 汉斯格雅（03）** — 看软硬件协同交互、产品思维与 3D 表达。',
      sources: [CASE_CARDS.pettravel, CASE_CARDS.veriframe, CASE_CARDS.eclipse],
      actions: [{ type: 'scroll', value: 'v3-lineup', label: '跳到全部作品展厅 ↓' }],
      suggestions: ['拆解「Veriframe 澄矩」To B 工作台', '拆解「航旅纵横」C 端体验重构'],
    };
  }

  /* ════ 12. 设计之外：摄影 / 手绘 / 生活 ════ */
  if (hasAny(q, ['摄影', '手绘', '生活', '爱好', '兴趣', '设计之外', '狗', '演唱会', 'cos', '手办', '彩铅', '马克笔'])) {
    return {
      text:
        '**设计之外的 TiceeZz**\n\n' +
        '• **人像摄影**：喜欢自然光与胶片颗粒感，站内收有《假如存在》和《小胡的写真》两组系列；\n' +
        '• **手绘基本功**：彩铅写实、马克笔产品快题、水粉静物；\n' +
        '• **日常灵感**：养德牧、喜欢欧美 Live 现场（Katy Perry / Wolf Alice）、偶尔玩 COS，桌边摆着绝区零邦布和崩铁奇美拉。',
      actions: [
        { type: 'navigate', value: '/v3/beyond/photography', label: '看人像摄影 ↗' },
        { type: 'navigate', value: '/v3/beyond/sketching', label: '看手绘作品 ↗' },
      ],
      suggestions: ['30 秒速览：核心优势与经历', '如何联系童宗震？'],
    };
  }

  /* ════ 13. 联系方式 / 约面试 / 地点 ════ */
  if (hasAny(q, ['联系', '邮箱', '电话', '手机', '微信', '坐标', '上海', '到岗', '面试', '约面', '薪资', '期望'])) {
    return {
      text:
        '**联系方式与求职状态**\n\n' +
        '• **邮箱**：`1027208320@qq.com`\n' +
        '• **电话**：`+86 199 7467 7449`\n' +
        '• **现居**：上海（支持线下面试，随时到岗）\n' +
        '• **意向方向**：UX / 产品设计师、AI 产品设计师、0–1 体验型 AI 产品 / AI Builder。',
      actions: [
        { type: 'copy', value: '1027208320@qq.com', label: '复制邮箱' },
        { type: 'copy', value: '19974677449', label: '复制电话' },
      ],
      suggestions: ['生成 3 句话推荐语发给老板', '30 秒速览：核心优势与经历'],
    };
  }

  /* ════ 14. 网站重做反思（面试常考题） ════ */
  if (hasAny(q, ['重做', '改进', '反思', '不足', '短板', '缺点'])) {
    return {
      text:
        '**他自己对作品集和现阶段的坦诚复盘**\n\n' +
        '• **关于作品集迭代**：v1/v2 时太想证明技术实现（3D、桌面系统），让只有 30 秒看案例的面试官找重点不够快；所以 v3 专门做减法，把阅读效率和案例直达放在第一位。\n' +
        '• **关于现阶段短板**：25 年硕士毕业，论全职年限和大型 C 端线上数据复盘确实不如 3–5 年资深设计师；但他能用扎实的设计基本功 + AI 快速做出可交互原型的能力，帮中小创新团队更快把方案跑通落地。',
      sources: [CASE_CARDS.pettravel],
      suggestions: ['他的 AI 工作流具体怎么落地？', '如何联系童宗震？'],
    };
  }

  /* ════ 15. 边界礼貌收敛（防跑题） ════ */
  return {
    text:
      '我是专注于 **童宗震（TiceeZz）作品集与履历** 的轻量导览助手，其他闲聊就不乱编啦。\n\n你可以问我关于他的**项目拆解、AI 工作流、商业经历、教育与奖项、联系方式**，或者直接让我帮你**切换浅/深色主题**。',
    suggestions: QUICK_PROMPTS_HOME,
  };
}
